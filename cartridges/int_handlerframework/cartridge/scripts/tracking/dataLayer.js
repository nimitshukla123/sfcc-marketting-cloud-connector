'use strict';

/**
 * Generic object to hold information for the life of the request
 * @type {Object}
 */
var requestDataLayer = {};
/**
 * Whether init has already occurred
 * @type {boolean}
 */
var initExecuted = false;
/**
 * Whether the base data layer has been built out
 * @type {boolean}
 */
var dataLayerExpanded = false;
/**
 * RegEx used to identify system-generated requests that can be ignored
 * @type {RegExp}
 */
var systemRegEx = /__Analytics|__SYSTEM__/;

/**
 * Returns true if system request (Analytics, SYSTEM, etc)
 * @returns {boolean}
 */
function isSystemRequest() {
    return request.httpRequest
        && systemRegEx.test(request.httpURL.toString());
}

/**
 * Returns true if script executing in Business Manager context (Sites-Site)
 * @returns {boolean}
 */
function isBM() {
    // if Sites-Site, we're in Business Manager
    return require('dw/system/Site').current.ID === 'Sites-Site';
}

/**
 * Returns whether basket has updated since request start
 * @returns {boolean}
 */
function hasBasketUpdated() {
    // ensure init has executed
    init();

    var currentBasket = session.customer && require('dw/order/BasketMgr').currentBasket;
    return (currentBasket && requestDataLayer && requestDataLayer.origBasketState !== currentBasket.etag) || false;
}

/**
 * onRequest hook that executes init() and sets session origBasketState if necessary
 */
function onRequest() {
    init(true);
}

/**
 * This init method runs onRequest, so it needs to remain light.
 * The onRequest hook doesn't execute for server includes, so init() is also executed by getDataLayer() (if not already executed)
 * No value returned, to ensure other onRequest hooks are executed.
 *
 * Limited usage of session.custom for sharing data across separate threads within same request
 * @param {boolean} isOnRequest
 */
function init(isOnRequest) {
    // Only run true init when executed by ONREQUEST thread (real start of request)
    if (!initExecuted && !isBM() && !isSystemRequest()) {
        if (isOnRequest === true && !request.isIncludeRequest()) {
            // We need to track basket ID, so we can know if it has changed since request start
            var currentBasket = session.customer && require('dw/order/BasketMgr').currentBasket;
            var origBasketState = '';
            if (currentBasket) {
                origBasketState = currentBasket.etag;
            }
            requestDataLayer.origBasketState = origBasketState;
            session.custom.origBasketState = origBasketState;
        } else {
            requestDataLayer.origBasketState = session.custom.origBasketState;
        }
    }
    initExecuted = true;
}

/**
 * Expands on data layer. This is not executed in init(), to keep onRequest light.
 */
function expandDataLayer() {
    if (!dataLayerExpanded) {
        requestDataLayer.request = buildCurrentRequest();
        requestDataLayer.events = buildEvents();
        //dw.system.Logger.debug('request data layer: \n{0}', JSON.stringify(requestDataLayer, null, 2));
    }
    dataLayerExpanded = true;
}

/**
 * Builds an array of events. Each event is an array, where first value is the event, following values are pertinent args
 * @returns {Array}
 */
function buildEvents() {
    const format = require('dw/util/StringUtils').format;
    var params = request.httpParameterMap;
    var paramMap = request.includeRequest ? params.getParameterMap('param_') : params;

    var controller = requestDataLayer.request.detectedController.controller || '';
    var method = requestDataLayer.request.detectedController.method || '';
    var controllerAndMethod;
    if (controller !== '') {
        controllerAndMethod = format('{0}-{1}', controller, method).toLowerCase();
    } else {
        // only fall back to clickstream in worst-case scenario
        controllerAndMethod = (requestDataLayer.request.clickstreamPipeline || '').toLowerCase();
    }

    var paramPojo = {};
    for each (var param in params.parameterNames) {
        paramPojo[param] = params.get(param).stringValue;
    }

    var triggeredForm = requestDataLayer.request.triggeredForm;
    var events = [];

    switch (controllerAndMethod) {
        case 'search-show':
        case 'search-content':
            if (paramMap.isParameterSubmitted('q')) {
                events.push(['search', paramMap.get('q').stringValue]);
            }
            if (paramMap.isParameterSubmitted('cgid')) {
                events.push(['category', paramMap.get('cgid').stringValue]);
            }
            break;
        case 'page-show':
            if (paramMap.isParameterSubmitted('cid')) {
                events.push(['content', paramMap.get('cid').stringValue]);
            }
            break;
        case 'product-show':
        case 'product-showincategory':
        case 'product-variation':
        case 'product-showquickview':
            if (paramMap.isParameterSubmitted('pid')) {
                events.push(['product', paramMap.get('pid').stringValue]);
            }
            break;
        case 'cart-addproduct':
            if (paramMap.isParameterSubmitted('pid')) {
                events.push(['cartAddProduct', paramMap.get('pid').stringValue]);
            }
            break;
        case 'cart-show':
        case 'cart-minicart':
        case 'cart-get':
        case 'cart-minicartshow':
            events.push(['viewCart']);
            break;
        case 'cart-addcoupon':
            if (paramMap.isParameterSubmitted('couponCode')) {
                events.push(['cartAddCoupon', paramMap.get('couponCode').stringValue]);
            }
            break;
        case 'cart-submitform':
            if (triggeredForm) {
                if (triggeredForm.formID === 'cart' && triggeredForm.actionID === 'addCoupon') {
                    try {
                        var coupon = session.forms.cart.couponCode.htmlValue;
                        if (coupon) {
                            events.push(['cartAddCoupon', coupon]);
                        }
                    }catch (e) {
                        // log error?
                    }
                }
            }
            break;
        case 'wishlist-add':
            if (paramMap.isParameterSubmitted('pid')) {
                events.push(['wishlistAddProduct', paramMap.get('pid').stringValue]);
            }
            break;
        case 'giftregistry-addproduct':
            if (paramMap.isParameterSubmitted('pid')) {
                events.push(['registryAddProduct', paramMap.get('pid').stringValue]);
            }
            break;
        // SFRA checkout
        case 'checkout-login':
        case 'checkout-begin':
            var stage = paramMap.get('stage').stringValue;
            switch (stage) {
                case 'shipping':
                    events.push(['checkout', 'step1']);
                    break;
                case 'payment':
                    events.push(['checkout', 'step2']);
                    break;
                case 'placeOrder':
                    events.push(['checkout', 'step3']);
                    break;
                default:
                    if (params.isParameterSubmitted('ID')) {
                        var orderID = params.get('ID').stringValue;
                        events.push(['orderConfirmation', orderID]);
                    } else {
                        events.push(['checkout', 'step0']);
                    }
                    break;
            }
            break;
        case 'checkoutshippingservices-submitshipping':
            events.push(['checkout', 'step1']);
            break;
        case 'checkoutservices-submitpayment':
            events.push(['checkout', 'step2']);
            break;
        case 'checkoutservices-placeorder':
            events.push(['checkout', 'step3']);
            break;
        case 'order-confirm':
            events.push(['orderConfirmation', paramMap.get('ID').stringValue]);
            break;
        // SG checkout
        case 'cocustomer-start':
            events.push(['checkout', 'step0']);
            break;
        case 'coshipping-start':
            events.push(['checkout', 'step1']);
            break;
        case 'coshipping-singleshipping':
            if (triggeredForm && triggeredForm.formID) {
                if (triggeredForm.formID === 'singleshipping' && triggeredForm.actionID === 'save') {
                    events.push(['coShipping', 'submitted']);
                }
            }
            break;
        case 'cobilling-start':
        case 'cobilling-publicstart':
            events.push(['checkout', 'step2']);
            break;
        case 'cobilling-billing':
            if (triggeredForm && triggeredForm.formID) {
                if (triggeredForm.formID === 'billing' && triggeredForm.actionID === 'save') {
                    events.push(['coBilling', 'submitted']);
                    try {
                        if (session.forms.billing.billingAddress.addToEmailList.isChecked() === true) {
                            var email = session.forms.billing.billingAddress.email.emailAddress.htmlValue;
                            events.push(['mailingListSubscribed', email]);
                        }
                    }catch (e) {
                        // log error?
                    }
                }
            }
            break;
        case 'cosummary-start':
            events.push(['checkout', 'step3']);
            break;
        case 'cosummary-submit':
            events.push(['coSummary', 'submitted']);
            if (params.isParameterSubmitted('orderNo')) {
                var orderID = params.get('orderNo').stringValue;
                events.push(['orderConfirmation', orderID]);
            }
            break;
        // end checkout
        default:
            break;
    }

    if (hasBasketUpdated()) {
        events.push(['basketUpdated']);
    }

    if (requestDataLayer.request.isAjaxRequest) {
        events.push(['ajaxRequest']);
    }

    return events;
}

/**
 * Builds out a custom request object definition, considering whether there was a proxied request
 * @returns {Object}
 */
function buildCurrentRequest() {
    const helper = require('~/cartridge/scripts/util/helper');

    var lastClick = session.clickStream.last || {};
    var params = request.httpParameterMap;
    var paramMap = request.includeRequest ? params.getParameterMap('param_') : params;

    var controllerAndMethod = helper.detectController();

    return {
        requestID: request.requestID.replace(/-\d+-\d+$/, ''),
        referer: lastClick.referer,
        urlPath: lastClick.path,
        queryString: lastClick.queryString,
        triggeredForm: !empty(request.triggeredForm) || params.isParameterSubmitted('formID') ? buildTriggeredForm() : {},
        params: buildParams(paramMap),
        clickstreamPipeline: lastClick.pipelineName,
        detectedController: {
            controller: request.includeRequest ? params.get('currentController').stringValue : controllerAndMethod.controller,
            method: request.includeRequest ? params.get('currentControllerMethod').stringValue : controllerAndMethod.method
        },
        isAjaxRequest: helper.isAjaxRequest()
    };
}

/**
 * Returns triggered form/action IDs from the proxied request
 * @returns {{formID: string, actionID: string}}
 */
function buildTriggeredForm() {
    var params = request.httpParameterMap;
    return {
        formID: params.isParameterSubmitted('formID') ? params.get('formID').stringValue : request.triggeredForm.formId,
        actionID: params.isParameterSubmitted('formActionID') ? params.get('formActionID').stringValue : request.triggeredFormAction.formId
    }
}

/**
 * Converts a parameter map to a plain object
 * @param {dw.web.HttpParameterMap} parameterMap
 * @returns {Object}
 */
function buildParams(parameterMap) {
    var params = {};
    parameterMap.parameterNames.toArray().forEach(function(param){
        if (parameterMap.get(param).values.length > 1) {
            params[param] = parameterMap.get(param).values.toArray();
        } else {
            params[param] = parameterMap.get(param).value;
        }
    });
    return params;
}

/**
 * Returns the current data layer object, false if not defined.
 * @param {Function} cb Optional callback
 * @returns {Object|boolean}
 */
function getDataLayer(cb) {
    init();
    if (!dataLayerExpanded) {
        expandDataLayer();
    }
    if (cb) {
        cb(requestDataLayer);
    }
    return requestDataLayer || false;
}

exports.onRequest = onRequest;
exports.getDataLayer = getDataLayer;
exports.hasBasketUpdated = hasBasketUpdated;
