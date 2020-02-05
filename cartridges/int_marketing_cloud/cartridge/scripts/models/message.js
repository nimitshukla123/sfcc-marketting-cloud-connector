'use strict';

/**
 * @module models/message
 */

const helpers = require('../util/helpers');

/**
 * Recursive method to handle Message during JSON.stringify().
 * Used to ensure exported JSON is webservice compatible
 * @param {module:models/message~Message|Object} obj
 * @returns {Object}
 */
function messageToJson(obj) {
    var newObject = {};
    var ucprop;
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            switch (prop) {
                case '_private':
                    continue;
                case 'options':
                    ucprop = 'OPTIONS';
                    break;
                default:
                    ucprop = helpers.ucfirst(prop);
                    break;
            }

            if (obj[prop] && helpers.isObject(obj[prop])) {
                if (prop === 'subscriberAttributes') {
                    newObject[ucprop] = convertValues(obj[prop]);
                } else {
                    newObject[ucprop] = messageToJson(obj[prop]);
                }
            } else {
                newObject[ucprop] = obj[prop];
            }
        }
    }
    return newObject;
}

/**
 * Handle value type conversion for Message
 * @param {Object} obj
 * @returns {Object}
 */
function convertValues(obj) {
    var newObject = {};
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            switch(typeof(obj[prop])) {
                case 'boolean':
                    newObject[prop] = obj[prop] ? 1 : 0;
                    break;
                default:
                    if (obj[prop] && helpers.isObject(obj[prop])) {
                        newObject[prop] = convertValues(obj[prop]);
                    } else {
                        newObject[prop] = obj[prop];
                    }
                    break;
            }
        }
    }
    return newObject;
}

/**
 * Message class
 * @param {string} customerKey CustomerKey of the entry event send definition. Either this or the SendID is required.
 * @param {string} [sendID] ID of the entry event send definition. Either this or the customer key is required.
 * @constructor
 * @alias module:models/message~Message
 */
function Message(customerKey, sendID) {
    if (empty(sendID) && empty(customerKey)) {
        throw new Error('sendID or customerKey is required to create a new message.');
    }

    /**
     * Private instance properties
     * @type {{sendKey: string, sendID: string}}
     * @property {string} sendKey The key provided to the instance
     * @property {string} sendID The ID provided to the instance
     * @private
     */
    this._private = {
        sendKey: customerKey,
        sendID: sendID
    };
    /**
     * From object
     * @type {{address: string, name: string}}
     * @property {string} address The sender's email address
     * @property {string} name The sender's name
     */
    this.from = {
        address: '',
        name: ''
    };
    /**
     * To object
     * @type {{address: string, subscriberKey: string, contactAttributes: {subscriberAttributes: {}}}}
     * @property {string} address The recipient's email address
     * @property {string} subscriberKey The recipient's unique subscriber key (typically email)
     * @property {Object} contactAttributes Contact attributes
     * @property {Object} contactAttributes.subscriberAttributes Subscriber attributes
     */
    this.to = {
        address: '',
        subscriberKey: '',
        contactAttributes: {
            subscriberAttributes: {
            }
        }
    };
    /**
     * Available options
     * @type {{requestType: string}}
     * @property {string} requestType The request type. Value can be SYNC or ASYNC (default)
     */
    this.options = {
        requestType: 'ASYNC'
        /* There are multiple possible options available, but not exposing until we have use cases
         * https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/options.htm
         */
        /*callsInConversation: 0,
        client: '',
        conversationID: '',
        priority: 'Low', // Low, Medium, High
        queuePriority: 'Low', // Low, Medium, High
        saveOptions: '',
        scheduledTime: '',
        sendResponseTo: '',
        sequenceCode: ''*/
    };
}

/**
 * @alias module:models/message~Message#prototype
 */
Message.prototype = {
    /**
     * Set FROM details
     * @param {string} address Sender email address
     * @param {string} [name] Sender name
     * @returns {module:models/message~Message}
     */
    setFrom: function(address, name) {
        this.from.address = address;
        this.from.name = name;
        return this;
    },
    /**
     * Set TO details
     * @param {string} address Recipient email address
     * @returns {module:models/message~Message}
     */
    setTo: function(address) {
        this.to.address = address;
        this.to.subscriberKey = address;
        return this;
    },
    /**
     * Set ASYNC on/off
     * @param {boolean} isAsync Set true if message should send async
     * @returns {module:models/message~Message}
     */
    setAsync: function(isAsync) {
        this.options.requestType = (isAsync ? 'A' : '') + 'SYNC';
        return this;
    },
    /**
     * Set a custom subscriber attribute
     * @param {string} key
     * @param {*} value
     * @returns {module:models/message~Message}
     */
    setSubscriberAttribute: function(key, value) {
        this.to.contactAttributes.subscriberAttributes[key] = value;
        return this;
    },
    /**
     * Builds up a formatted object for JSON.stringify()
     * @returns {Object}
     */
    toJSON: function() {
        return messageToJson(this);
    }
};

module.exports = Message;
