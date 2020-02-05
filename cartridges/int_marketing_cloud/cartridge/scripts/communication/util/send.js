'use strict';

/**
 * @module communication/util/send
 */

var Logger = require('dw/system/Logger');

/**
 * @typedef {Object} CustomerNotification
 * @property {string} fromEmail The email address the communication is sent from
 * @property {string|Array} toEmail The email address the communication is sent to
 * @property {string} subject The communication subject
 * @property {string} messageBody The body of the communication to send
 * @property {Object} params Object containing additional parameters for usage by the hook
 * @property {dw.web.Forms} params.CurrentForms The forms available in current session
 * @property {dw.web.HttpParameterMap} params.CurrentHttpParameterMap The parameters in current request
 * @property {dw.customer.Customer} params.CurrentCustomer The current customer
 */

/**
 * Trigger a customer notification
 * Resolves promise with a {{status: string}} Response object. At a minimum it should contain a status string: OK= indicates success, ERROR= indicates failure, anything else also indicates failure
 * @param {string} hookID
 * @param {SynchronousPromise} promise
 * @param {module:communication/util/send~CustomerNotification} data
 * @param {Function} [cb] Optional callback, is called with the created trigger instance and the data object
 * @returns {SynchronousPromise}
 */
function sendTrigger(hookID, promise, data, cb){
    if (promise.isPending()) {
        // Ensure SiteID is provided
        data.SiteID = require('dw/system/Site').current.ID;
        data.StoreHomeLink = require('dw/web/URLUtils').httpHome().toString();

        Logger.debug('MC hook {0} executed', hookID);
        var trigger = require(module.cartridge).trigger(hookID);
        trigger.newMessage(data);

        if (cb && typeof(cb) === 'function') {
            cb(trigger, data);
        }

        var result = trigger.send();

        var obj = {
            status: result.ok ? 'OK' : 'ERROR'
        };
        promise.resolve(obj);
    }
    return promise;
}

exports.sendTrigger = sendTrigger;
