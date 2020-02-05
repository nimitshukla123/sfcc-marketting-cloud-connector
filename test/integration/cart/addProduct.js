var assert = require('chai').assert;
var request = require('request-promise');
var config = require('../it.config');
var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);

describe('Add Product to cart', function () {
    this.timeout(5000);

    it('analytic should track add-to-cart action', function () {
        var cookieJar = request.jar();

        // The myRequest object will be reused through out this file. The 'jar' property will be set once.
        // The 'url' property will be updated on every request to set the product ID (pid) and quantity.
        // All other properties remained unchanged.
        var myRequest = {
            url: '',
            method: 'POST',
            rejectUnauthorized: false,
            resolveWithFullResponse: true,
            jar: cookieJar,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        };

        var addProd = '/Cart-AddProduct';
        var action = 'Cart-AddProduct';
        var message = 'Product added to cart';
        var product = {
            masterId: '25519318M',
            variantId: '701643421084M',
            name: '3/4 Sleeve V-Neck Top',
            qty: 2,
            price: 24,
            itemType: 'product'
        };
        product.url = '/' + product.name.toLowerCase().replace(/\s/g, '-') + '/' + product.variantId + '.html?lang=en_US';

        // ----- adding product(s):
        myRequest.url = config.baseUrl + addProd;
        myRequest.form = {
            pid: product.variantId,
            quantity: product.qty
        };

        return request(myRequest)
            // Handle response
            .then(function (response) {
                assert.equal(response.statusCode, 200);

                var cookieString = cookieJar.getCookieString(myRequest.url);
                var dwSid = cookieString.match(/dwanonymous_[^=]+=([^;]+);/)[1];

                var expectedResBody = {
                    'quantityTotal': product.qty,
                    'action': action,
                    'message': message,
                    '__mccEvents': [
                        [
                            'setUserInfo',
                            {
                                'email': dwSid
                            }
                        ],
                        [
                            'trackCart',
                            {
                                'cart': [
                                    {
                                        'item': product.masterId,
                                        'unique_id': product.variantId,
                                        'name': product.name,
                                        'price': product.price,
                                        'sale_price': 48,
                                        'item_type': product.itemType,
                                        'url': product.url
                                    }
                                ]
                            }
                        ]
                    ]
                };

                var bodyAsJson = JSON.parse(response.body);
                assert.equal(bodyAsJson.quantityTotal, expectedResBody.quantityTotal);
                assert.isArray(bodyAsJson.__mccEvents, 'MCC events array exists');

                expectedResBody.__mccEvents.forEach(function(expectedEvent){
                    var event;
                    for (var i in bodyAsJson.__mccEvents) {
                        event = bodyAsJson.__mccEvents[i];
                        if (event[0] === expectedEvent[0]) {
                            break;
                        }
                    }
                    assert.equal(event[0], expectedEvent[0], 'event name matches');

                    if (expectedEvent.length>1) {
                        // exception for trackCart, storefront URL configuration might have different SEO structure
                        if (expectedEvent[0] === 'trackCart') {
                            expectedEvent[1].cart.forEach(function(expectedProduct, index){
                                var product = event[1].cart[index];
                                assert.include(product.url, expectedProduct.url, 'trackCart product URL matches');

                                // we've validated URL, set event's URL so deep matching doesn't fail on SEO difference
                                event[1].cart[index].url = expectedProduct.url;
                            });
                        }
                        assert.deepEqual(event[1], expectedEvent[1], 'event object details match');
                    }
                });
            });
    });
});
