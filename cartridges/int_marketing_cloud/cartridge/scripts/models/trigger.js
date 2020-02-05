'use strict';

/**
 * @module models/trigger
 */

/**
 * Custom object name
 * @const {string}
 * @private
 */
const customObjectName = 'MarketingCloudTriggers';
const helpers = require('../util/helpers');

/**
 * Returns trigger definition for a hook
 * @param {string} hookID
 * @param {Object} attributes
 * @returns {{description: string, attributes: {}}}
 */
function getTriggerDefinition(hookID, attributes) {
    var splitHookID = hookID.split('.').slice(-2);
    var hookFile = splitHookID[0];
    var hookFunction = splitHookID[1];

    var description = '';
    var hookAttributes = {};
    //require('dw/system/Logger').debug('hookFile: {0}', hookFile);
    var triggerDefinitions = require('../communication/'+ hookFile).triggerDefinitions();
    if (triggerDefinitions && triggerDefinitions.hasOwnProperty(hookFunction)) {
        if (triggerDefinitions[hookFunction].hasOwnProperty('description')) {
            description = triggerDefinitions[hookFunction]['description'];
        }
        // build object from array
        if (triggerDefinitions[hookFunction].hasOwnProperty('attributes')) {
            // force SiteID into all defined attributes
            triggerDefinitions[hookFunction]['attributes'].unshift('SiteID');
            triggerDefinitions[hookFunction]['attributes'].unshift('StoreHomeLink');

            triggerDefinitions[hookFunction]['attributes'].forEach(function (k) {
                hookAttributes[k] = '';
            });
        }
    }
    helpers.mergeAttributes(hookAttributes, attributes);

    return {
        description: description,
        attributes: hookAttributes
    };
}

/**
 * Rebuilds trigger definition in Custom Object
 * @alias module:models/trigger~Trigger#rebuild
 */
function rebuildTriggerDefinition() {
    var tx = require('dw/system/Transaction');
    // ensure a custom object is created automatically, necessary for rebuild
    this.definition = helpers.getCustomObject(customObjectName, this.hookID, true);

    var definition = getTriggerDefinition(this.hookID, this.attributes);
    this.attributes = definition.attributes;

    //trace('hookID: {0} ;; description: {1} ;; attributes: {2}', this.hookID, definition.description, JSON.stringify(this.attributes, null, 4));
    tx.begin();
    try {
        if (empty(this.definition.description)) {
            this.definition.description = definition.description;
        }
        this.definition.subscriberAttributes = JSON.stringify(this.attributes, null, 4);
        tx.commit();
    } catch (e) {
        tx.rollback();
    }
}

/**
 * Returns a new Message instance
 * @param {module:communication/util/send~CustomerNotification} data Data to populate the Message with.
 * @returns {module:models/message~Message}
 * @alias module:models/trigger~Trigger#newMessage
 */
function newMessage(data){
    var messageModel = require('./message');
    var msg = new messageModel(this.definition.customerKey);
    var _self = this;
    var toEmail = Array.isArray(data.toEmail) ? data.toEmail[0] : data.toEmail;
    msg.setFrom(data.fromEmail).setTo(toEmail);

    helpers.mapValues(this.attributes, data, function(key, val){
        if (helpers.isObject(key)) {
            if ('format' in key) {
                val = require('dw/util/StringUtils').format(key.format, val);
            } else {
                val = helpers.dwValue(val);
            }
            if ('type' in key) {
                switch (key.type) {
                    case 'array':
                        // mappedValue can be a string or an object
                        // if an object, it's similar to the standard attribute mapping definition
                        var mapDef = key.mappedValue;
                        if (typeof(mapDef) === 'string') {
                            val = helpers.buildSimpleArrayFromIterable(mapDef, val, data);
                        } else {
                            val = helpers.buildMappedArrayFromIterable(mapDef, val, data);
                        }
                        break;
                    case 'transform':
                        val = helpers.initiateTransform(_self.hookID, key, val);
                        key = key.label;
                        break;
                    default:
                        // no change
                        break;
                }
            }
        } else {
            val = helpers.dwValue(val);
        }
        msg.setSubscriberAttribute(key, val);
    });
    this.message = msg;

    return this.message;
}

/**
 * Sends a trigger message
 * @returns {dw.svc.Result}
 * @alias module:models/trigger~Trigger#send
 */
function sendMessage() {
    if (!this.isEnabled()) {
        throw new Error('Marketing Cloud trigger {0} for hook {1} is not enabled.',
            this.definition.customerKey,
            this.hookID
        );
    }
    if (empty(this.message)) {
        throw new Error('A new message needs to be created first, using newMessage()');
    }

    /**
     * @type {dw.svc.Service}
     */
    var msgSvc = require('int_marketing_cloud').restService('messagingSend');
    var message = this.message;
    return msgSvc.call(this.message);
}

/**
 * Trigger constructor
 * @param {string} hookID
 * @constructor
 * @alias module:models/trigger~Trigger
 */
function Trigger(hookID) {
    /**
     * The instance hook ID
     * @type {string}
     */
    this.hookID = hookID;
    /**
     * Definition object
     * @type {dw.object.CustomAttributes}
     */
    this.definition = helpers.getCustomObject(customObjectName, hookID) || {enabled: false, subscriberAttributes: ''};
    /**
     * Expanded attributes from trigger definition
     * @type {Object}
     */
    this.attributes = helpers.expandAttributes(this.definition.subscriberAttributes);
    /**
     * The current Message instance
     * @type {module:models/message~Message}
     */
    this.message = null;
}

/**
 * @alias module:models/trigger~Trigger#prototype
 */
Trigger.prototype = {
    /**
     * Returns whether this trigger is enabled
     * @returns {boolean}
     */
    isEnabled: function isEnabled(){
        return this.definition.enabled === true;
    },

    rebuild: function rebuild(){
        return rebuildTriggerDefinition.apply(this, arguments);
    },

    newMessage: function newMsg(data){
        return newMessage.apply(this, arguments);
    },

    send: function send(){
        return sendMessage.apply(this, arguments);
    }
};

module.exports = Trigger;
