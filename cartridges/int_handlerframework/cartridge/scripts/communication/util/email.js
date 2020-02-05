'use strict';

var Mail = require('dw/net/Mail');
var ArrayList = require('dw/util/ArrayList');

/**
 * @typedef {Object} CustomerNotification
 * @property {string} fromEmail The email address the communication is sent from
 * @property {string|array} toEmail The email address the communication is sent to
 * @property {string} subject The communication subject
 * @property {string} messageBody The body of the communication to send
 * @property {dw.util.HashMap} params Object containing additional parameters for usage by the hook
 * @property {dw.web.Forms} params.CurrentForms The forms available in current session
 * @property {dw.web.HttpParameterMap} params.CurrentHttpParameterMap The parameters in current request
 * @property {dw.customer.Customer} params.CurrentCustomer The current customer
 */

/**
 * Send a customer notification email
 * Resolves promise with a {{status: string}} Response object. At a minimum it should contain a status string: OK= indicates success, ERROR= indicates failure, anything else also indicates failure
 * @param {SynchronousPromise} promise
 * @param {CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function sendEmail(promise, data){
    if (promise.isPending()) {
        var email = new Mail();
        if (Array.isArray(data.toEmail)) {
            email.setTo(new ArrayList(data.toEmail));
        } else {
            email.addTo(data.toEmail);
        }
        email.setFrom(data.fromEmail);
        email.setSubject(data.subject);
        email.setContent(data.messageBody, 'text/html', 'UTF-8');
        var status = email.send();

        var obj = {
            status: !status.isError() ? 'OK' : 'ERROR'
        };

        promise.resolve(obj);
    }
    return promise;
}

exports.sendEmail = sendEmail;
