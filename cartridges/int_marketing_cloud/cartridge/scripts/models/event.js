'use strict';

/**
 * @module models/event
 */

const helpers = require('../util/helpers');

/**
 * Recursive method to handle Event during JSON.stringify().
 * Used to ensure exported JSON is webservice compatible
 * @param {module:models/event~Event|Object} obj
 * @returns {Object}
 */
function messageToJson(obj) {
    var newObject = {};
    var ucprop;
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            switch (prop) {
                /*case '_private':
                    continue;*/
                default:
                    ucprop = helpers.ucfirst(prop);
                    break;
            }

            if (obj[prop] && helpers.isObject(obj[prop]) && prop !== 'data') {
                newObject[ucprop] = messageToJson(obj[prop]);
            } else {
                newObject[ucprop] = obj[prop];
            }
        }
    }
    return newObject;
}

/**
 * Event class
 * @param {string} contactKey The ID that uniquely identifies a subscriber/contact
 * @param {string} eventKey The EventDefinitionKey in Event Administration after the event is created and saved
 * @constructor
 * @alias module:models/event~Event
 */
function Event(contactKey, eventKey) {
    if (empty(contactKey) || empty(eventKey)) {
        throw new Error('contactKey and eventKey are both required to create an Event instance.');
    }

    /**
     * Contact key
     * @type {string}
     */
    this.contactKey = contactKey;
    /**
     * Event definition key
     * @type {string}
     */
    this.eventDefinitionKey = eventKey;
    /**
     * Whether to add contact key to contact model
     * @type {boolean}
     */
    this.establishContactKey = true;

    /**
     * Data object
     * Properties of the event. Only required if defined in a custom event or by the event.
     * @type {Object}
     */
    this.data = {};
}

/**
 * @alias module:models/event~Event#prototype
 */
Event.prototype = {
    /**
     * If true, the contact key is automatically added to the contact model if it isn't already included, making
     * it available to be injected into the journey. Default is true.
     * @param {boolean} enabled
     * @returns {module:models/event~Event}
     */
    setEstablishContactKey: function(enabled) {
        this.establishContactKey = enabled;
        return this;
    },
    /**
     * Set a data attribute
     * @param {string} key
     * @param {*} value
     * @returns {module:models/event~Event}
     */
    setDataAttribute: function(key, value) {
        this.data[key] = value;
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

module.exports = Event;
