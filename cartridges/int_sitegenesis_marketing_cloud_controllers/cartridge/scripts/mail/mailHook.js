'use strict';

var ArrayList = require('dw/util/ArrayList');
var Mail = require('dw/net/Mail');

/**
 * @typedef {Object} CustomerNotification
 * @property {string} fromEmail The email address the communication is sent from
 * @property {string|array} toEmail The email address the communication is sent to
 * @property {string} subject The communication subject
 * @property {string} messageBody The body of the communication to send
 * @property {dw/util/HashMap|dw.util.HashMap} params Object containing additional parameters for usage by the hook
 * @property {dw/web/Forms|dw.web.Forms} params.CurrentForms The forms available in current session
 * @property {dw/web/HttpParameterMap|dw.web.HttpParameterMap} params.CurrentHttpParameterMap The parameters in current request
 * @property {dw/customer/Customer|dw.customer.Customer} params.CurrentCustomer The current customer
 */

/**
 * Hook for mail send action
 * @param {CustomerNotification} args
 * @returns {dw/system/Status|dw.system.Status}
 */
function sendMail(args) {
    var email = new Mail();
    if (Array.isArray(args.toEmail)) {
        email.setTo(new ArrayList(args.toEmail));
    } else {
        email.addTo(args.toEmail);
    }
    email.setFrom(args.fromEmail);
    email.setSubject(args.subject);
    email.setContent(args.messageBody, 'text/html', 'UTF-8');
    return email.send();
}

exports.sendMail = sendMail;