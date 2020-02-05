'use strict';

/**
 * @type {dw.system.HookMgr}
 */
const HookMgr = require('dw/system/HookMgr');
/**
 * @type {dw.system.Site}
 */
const Site = require('dw/system/Site');
/**
 * @type {dw.template.Velocity}
 */
const velocity = require('dw/template/Velocity');

var analyticsEnabled = false;

var dataLayer = {
    setOrgId: null,
    setUserInfo: null,
    trackPageView: null,
    trackCart: null,
    trackConversion: null,
    trackEvents: [],
    updateItems: []
};

(function mcDataLayerInit(){
    var curSite = Site.current;
    analyticsEnabled = !!(curSite.getCustomPreferenceValue('mcEnableAnalytics'));
    if (analyticsEnabled) {
        if (empty(dataLayer.setOrgId)) {
            dataLayer.setOrgId = curSite.getCustomPreferenceValue('mcMID');
        }
        // disable analytics if MID not configured
        analyticsEnabled = !empty(dataLayer.setOrgId);
    }
})();

/**
 * Build customer data for setUserInfo
 * @param {Object} requestData
 * @returns {{email: string}}
 */
function buildCustomer(requestData) {
    var customerInfo = {
        email: customer.ID
        //, details: {}
    };
    if (!empty(customer.profile)) {
        customerInfo.email = customer.profile.email;
        var customDetails = buildCustomEvent('setUserInfo', {
            RequestData: requestData,
            Customer: customer,
            Profile: customer.profile,
            Session: session
        }).details;
        if (!empty(customDetails)) {
            customerInfo.details = customDetails;
        }
    }
    return customerInfo;
}

/**
 * Builds basket object
 * @returns {{cart: object}|{clear_cart: boolean}}
 */
function buildBasket() {
    /**
     * @type {dw.order.Basket}
     */
    var basket = session.customer && require('dw/order/BasketMgr').currentBasket;
    var basketInfo = {};
    if (basket && basket.allProductLineItems.length > 0) {
        basketInfo.cart = buildCartItems(basket.allProductLineItems);
    } else {
        basketInfo.clear_cart = true;
    }
    return basketInfo;
}

/**
 * Builds order object
 * @param {string} orderID
 * @returns {{cart, order_number: *, discount: number, shipping: number}}
 */
function buildOrder(orderID) {
    /**
     * @type {dw.order.Order}
     */
    var order = require('dw/order/OrderMgr').getOrder(orderID);
    var merchTotalExclOrderDiscounts = order.getAdjustedMerchandizeTotalPrice(false);
    var merchTotalInclOrderDiscounts = order.getAdjustedMerchandizeTotalPrice(true);
    var orderDiscount = merchTotalExclOrderDiscounts.subtract( merchTotalInclOrderDiscounts );
    var orderInfo = {
        cart: buildCartItems(order.allProductLineItems),
        order_number: orderID,
        discount: orderDiscount.valueOrNull,
        shipping: order.adjustedShippingTotalPrice.valueOrNull
    };
    var customDetails = buildCustomEvent('trackConversion', {Order: order}).details;
    if (!empty(customDetails)) {
        orderInfo.details = customDetails;
    }
    return orderInfo;
}

/**
 * Build cart items, used by both buildBasket and buildOrder
 * @param {dw.util.Collection} lineItems
 * @returns {Array<Object>}
 */
function buildCartItems(lineItems) {
    var cart = [];
    var pli;
    for (var item in lineItems) {
        pli = lineItems[item];
        cart.push(buildLineItem(pli));
    }
    return cart;
}

/**
 * Build product line items
 * @param {dw.order.ProductLineItem} pli
 * @returns {Object}
 */
function buildLineItem(pli) {
    var URLUtils = require('dw/web/URLUtils');
    var groupID = pli.product && pli.product.variant ? pli.product.masterProduct.ID : pli.productID;
    return {
        item: groupID,
        unique_id: pli.productID,
        name: pli.lineItemText,
        url: URLUtils.abs('Product-Show', 'pid', pli.productID).toString(),
        // image_url: '',
        // available: true,
        price: pli.basePrice.valueOrNull,
        sale_price: pli.proratedPrice.valueOrNull,
        // review_count: '',
        item_type: 'product'
    };
}

/**
 * Builds event details using custom mapping
 * @param {string} eventID
 * @param {Object} dataObject
 * @returns {{name: string, details: Object|null}}
 */
function buildCustomEvent(eventID, dataObject) {
    /**
     * @type {module:models/analytic~AnalyticEvent}
     */
    const AnalyticEvent = require('../models/analytic');
    var event = new AnalyticEvent(eventID);

    if (event.isEnabled()) {
        return {
            name: event.customEventName || eventID,
            details: event.trackEvent(dataObject)
        };
    } else {
        return {
            name: eventID,
            details: null
        }
    }
}

/**
 * Hook executed for SFRA-only
 * Registers SFRA route listeners
 * @param route
 */
function registerRoute(route) {
    var onCompleteListeners = route.listeners('route:Complete');
    // deregister existing Complete listeners
    route.off('route:Complete');

    // ensuring our listener executes first
    route.on('route:Complete', function onRouteCompleteHandler(req, res) {
        var hookID = 'app.tracking.trackNonCached';
        if (HookMgr.hasHook(hookID)) {
            var isJson = false;
            if (res.renderings.length) {
                for (var i = res.renderings.length - 1; i >= 0; i--) {
                    if (res.renderings[i].type === 'render' && res.renderings[i].subType === 'json') {
                        isJson = true;
                        break;
                    }
                }
            }

            if (isJson) {
                HookMgr.callHook(
                    hookID,
                    hookID.slice(hookID.lastIndexOf('.') + 1),
                    function (id, output) {
                        if (id === 'app.tracking.postEvents' && !empty(output)) {
                            res.viewData.__mccEvents = output;
                        }
                    }
                );
            }
        } else {
            dw.system.Logger.debug('no hook registered for {0}', hookID);
        }
    });

    // re-register Complete listeners
    onCompleteListeners.forEach(function(listener){
        route.on('route:Complete', listener);
    });
}

/**
 * Registered hook for app.tracking.trackCached
 */
function trackCached() {
    var mcInject = "<!-- Marketing Cloud Analytics - cached -->\n" +
        "<script type=\"text/javascript\">\n" +
        "try {\n" +
        "\t_etmc.push(['setOrgId', $dataLayer.setOrgId ]);\n" +
        "} catch (e) { console.error(e); }\n" +
        /**
         * the 'try' block below is hooking into ajax success responses globally
         * it looks for an '__mccEvents' property in JSON responses, and passes as SFMC events
         */
        "function mccEventLoader() {\n" +
            "\ttry {\n" +
            "\t\t$( document ).ajaxSuccess(function(event, request, settings, data) {\n" +
            "\t\t\tif (settings.dataTypes.indexOf('json') > -1) {\n" +
            "\t\t\t\tif (data && '__mccEvents' in data && Array.isArray(data.__mccEvents)) {\n" +
            "\t\t\t\t\tdata.__mccEvents.forEach(function mccEvent(mccEvent){_etmc.push(mccEvent);});\n" +
            "\t\t\t\t}\n" +
            "\t\t\t}\n" +
            "\t\t});\n" +
            "\t\tdocument.removeEventListener('DOMContentLoaded', mccEventLoader);\n" +
            "\t} catch (e) { console.error(e); }\n" +
        "};\n" +
        "if (document.readyState === 'complete') {\n" +
        "\tmccEventLoader();\n" +
        "} else {\n" +
        "\tdocument.addEventListener('DOMContentLoaded', mccEventLoader);\n" +
        "}\n" +
        "</script>\n" +
        "<!-- End Marketing Cloud Analytics - cached -->\n";

    var jsonLayer = {};
    for (var i in dataLayer) {
        if (dataLayer.hasOwnProperty(i) && dataLayer[i]) {
            jsonLayer[i] = JSON.stringify(dataLayer[i]);
        }
    }

    velocity.render(mcInject, {dataLayer: jsonLayer});
}

/**
 * Registered hook for app.tracking.preEvents
 * @param {Object} requestData
 * @param {Function} cb Optional callback for the output (unused)
 */
function eventsInit(requestData, cb) {
    dataLayer.setUserInfo = buildCustomer(requestData);
}

/**
 * Registered hook for app.tracking.event
 * @param {string} eventName
 * @param {*} eventValue
 * @param {Object} requestData
 * @param {Function} cb Optional callback for the output (unused)
 */
function requestEvent(eventName, eventValue, requestData, cb) {
    var customDetails;
    switch(eventName) {
        case 'search':
            if (empty(dataLayer.trackPageView)) {
                dataLayer.trackPageView = {
                    search: eventValue
                };
            }
            break;
        case 'category':
            if (empty(dataLayer.trackPageView)) {
                dataLayer.trackPageView = {
                    category: eventValue
                };
            }
            break;
        case 'content':
            if (empty(dataLayer.trackPageView)) {
                dataLayer.trackPageView = {
                    item: eventValue
                };
                var contentAsset = require('dw/content/ContentMgr').getContent(eventValue);
                if (!empty(contentAsset)) {
                customDetails = buildCustomEvent('updateContent', {
                        RequestData: requestData,
                        Content: contentAsset
                    }).details;
                    if (!empty(customDetails)) {
                        dataLayer.updateItems.push(customDetails);
                    }
                }
            }
            break;
        case 'product':
            if (empty(dataLayer.trackPageView)) {
                dataLayer.trackPageView = {
                    item: eventValue
                };
                var product = require('dw/catalog/ProductMgr').getProduct(eventValue);
                if (!empty(product)) {
                    var defProduct;
                    if (product.isMaster() || product.isVariationGroup()) {
                        defProduct = product.getVariationModel().getDefaultVariant();
                    } else if (product.isVariant()) {
                        defProduct = product.getMasterProduct();
                    }
                    customDetails = buildCustomEvent('updateProduct', {
                        RequestData: requestData,
                        Product: product,
                        DefaultProduct: defProduct, // master, variation group, or default variant
                        ProductLink: require('dw/web/URLUtils').abs('Product-Show', 'pid', product.ID).https(),
                        ImageLink: function imageLink(cfg, data) {
                            if (cfg.hasOwnProperty('imageType')) {
                                var img = data.Product.getImage(cfg.imageType);
                                if (img) {
                                    return img.absURL.https().toString();
                                }
                            }
                        },
                        StandardPrice: function standardPrice(cfg, data) {
                            var stdPrice;
                            var priceModel;

                            if (!empty(data.Product.getPriceModel())) {
                                priceModel = data.Product.getPriceModel();
                            }
                            if (empty(priceModel) || !priceModel.price.available) {
                                if (!data.Product.isMaster() && data.Product.getMasterProduct() && !empty(data.Product.masterProduct.getPriceModel())) {
                                    priceModel = data.Product.masterProduct.getPriceModel();
                                } else if (data.Product.isMaster() || data.Product.isVariationGroup()) {
                                    priceModel = data.Product.getVariationModel().getDefaultVariant().getPriceModel();
                                }
                            }

                            if (!empty(priceModel) && priceModel.price.available) {
                                var priceBook = priceModel.priceInfo.priceBook;

                                while (priceBook.parentPriceBook) {
                                    priceBook = priceBook.parentPriceBook ? priceBook.parentPriceBook : priceBook;
                                }

                                stdPrice = priceModel.getPriceBookPrice(priceBook.ID);
                                return stdPrice.decimalValue;
                            }
                            // ensuring not sending "undefined" to velocity
                            return null;
                        },
                        SalePrice: function salePrice(cfg, data) {
                            var priceModel;

                            if (!empty(data.Product.getPriceModel())) {
                                priceModel = data.Product.getPriceModel();
                            }
                            if (empty(priceModel) || !priceModel.price.available) {
                                if (!data.Product.isMaster() && data.Product.getMasterProduct() && !empty(data.Product.masterProduct.getPriceModel())) {
                                    priceModel = data.Product.masterProduct.getPriceModel();
                                } else if (data.Product.isMaster() || data.Product.isVariationGroup()) {
                                    priceModel = data.Product.getVariationModel().getDefaultVariant().getPriceModel();
                                }
                            }

                            if (!empty(priceModel) && priceModel.price.available) {
                                return priceModel.price.decimalValue;
                            }
                            // ensuring not sending "undefined" to velocity
                            return null;
                        }
                    }).details;
                    if (!empty(customDetails)) {
                        dataLayer.updateItems.push(customDetails);
                    }
                }
            }
            break;
        case 'viewCart':
        case 'basketUpdated':
            if (empty(dataLayer.trackCart)) {
                dataLayer.trackCart = buildBasket();
            }
            break;
        case 'orderConfirmation':
            if (empty(dataLayer.trackConversion)) {
                dataLayer.trackConversion = buildOrder(eventValue);
            }
            break;
    }

    var customEvent = buildCustomEvent(eventName, {
        EventName: eventName,
        EventValue: eventValue,
        RequestData: requestData,
        Session: session,
        Customer: customer,
        Basket: customer && require('dw/order/BasketMgr').currentBasket
    });
    if (!empty(customEvent.details)) {
        dataLayer.trackEvents.push(customEvent);

        // copy mapped custom event into customer details as well
        // this is a workaround for trackEvents not being fully fleshed out on MC side
        if (!empty(dataLayer.setUserInfo.details)) {
            for (var ev in customEvent.details) {
                if (customEvent.details.hasOwnProperty(ev)) {
                    if (!(ev in dataLayer.setUserInfo.details)) {
                        dataLayer.setUserInfo.details[ev] = customEvent.details[ev];
                    }
                }
            }
        } else {
            dataLayer.setUserInfo.details = customEvent.details;
        }
    }
}

/**
 * Registered hook for app.tracking.postEvents
 * @param {Object} requestData
 * @param {Function} cb Optional callback for the output
 */
function eventsOutput(requestData, cb) {
    var eventsArray = [];

    if (!empty(dataLayer.setUserInfo)) {
        eventsArray.push(['setUserInfo', dataLayer.setUserInfo ]);
    }
    if (!requestData.request.isAjaxRequest) {
        if (!empty(dataLayer.updateItems)) {
            eventsArray.push(['updateItem', dataLayer.updateItems ]);
        }
    }
    if (!empty(dataLayer.trackConversion)) {
        eventsArray.push(['trackConversion', dataLayer.trackConversion ]);
    } else if (!empty(dataLayer.trackCart)) {
        eventsArray.push(['trackCart', dataLayer.trackCart ]);
    }
    if (!empty(dataLayer.trackEvents)) {
        for each(var event in dataLayer.trackEvents) {
            eventsArray.push(['trackEvent', event]);
        }
    }
    if (!requestData.request.isAjaxRequest) {
        if (!empty(dataLayer.trackPageView)) {
            eventsArray.push(['trackPageView', dataLayer.trackPageView]);
        } else {
            eventsArray.push(['trackPageView']);
        }
    }

    if (cb) {
        cb(eventsArray);
        return;
    }

    var mcInject = "<!-- Marketing Cloud Analytics - noncached -->\n" +
        "<script type=\"text/javascript\">\n" +
        "try {\n";

    for (var i in eventsArray) {
        eventsArray[i] = JSON.stringify(eventsArray[i]);
    }
    mcInject += "#foreach($event in $eventsArray)\n\t_etmc.push($event);\n#end\n";

    mcInject += "} catch (e) { console.error(e); }\n" +
        //"console.log(_etmc);\n" +
        "</script>\n" +
        "<!-- End Marketing Cloud Analytics - noncached -->\n";

    velocity.render(mcInject, {eventsArray: eventsArray});
}

// Ensure MC Analytics hooks only fire if analytics are enabled
if (analyticsEnabled) {
    exports.trackCached = trackCached;
    exports.preEvents = eventsInit;
    exports.event = requestEvent;
    exports.postEvents = eventsOutput;
    exports.registerRoute = registerRoute;
} else {
    exports.trackCached = function(){};
    exports.preEvents = function(){};
    exports.event = function(){};
    exports.postEvents = function(){};
    exports.registerRoute = function(){};
}
