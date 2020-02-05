'use strict';

/**
 * @type {dw.system.HookMgr}
 */
var HookMgr = require('dw/system/HookMgr');

/**
 * @type {dw.system.Status}
 */
var Status = require('dw/system/Status');

/**
 * @type {dw.system.Logger}
 */
var Logger = require('dw/system/Logger');

/**
 * @type {SynchronousPromise}
 */
var SynchronousPromise = require('synchronous-promise');

/**
 * Hook proxy to be used with MC Email Connector send action
 * @param {Object} emailObj Generic Email Object with Type, this is passed in from SFRA base classes
 * Examples can be
 *    emailObj.to,emailObj.subject,emailObj.from,emailObj.type.
 *  emailObj.type example emailHelpers.emailTypes.registration
 * @param {string} template Template name
 * @param {Object} context Contains the actual customer context.
 * @returns {dw.system.Status}
 * This function is tested and compatible with SFRA Release v3.3.0
 */
function sendEmail(emailObj, template, context) {
    var result;
    var params = new (require('dw/util/HashMap'))();
    var emailTypes = require('*/cartridge/scripts/helpers/emailHelpers').emailTypes;
    var emailData = {};

    // Pass all provided context forward as params
    for (var p in context) {
        params[p] = context[p];
    }

    params.put('CurrentForms', session && session.forms);
    params.put('CurrentHttpParameterMap', request && request.httpParameterMap);
    params.put('CurrentCustomer', customer);

    emailData.toEmail = emailObj.to;
    emailData.fromEmail = emailObj.from;

    var hookPath = 'app.communication.';
    var hookID = hookPath;

    if (emailObj) {
        switch(emailObj.type) {
            case emailTypes.registration:
                hookID += 'account.created';
                break;
            case emailTypes.passwordReset:
                params.put('CurrentCustomer', context.resettingCustomer);
                params.put('ResetPasswordToken', context.passwordResetToken);
                hookID += 'account.passwordReset';
                break;
            case emailTypes.passwordChanged:
                params.put('CurrentCustomer', context.resettingCustomer);
                hookID += 'account.passwordChanged';
                break;
            case emailTypes.orderConfirmation:
                const OrderMgr = require('dw/order/OrderMgr');
                var orderId = context.order.orderNumber;
                params.put('Order', OrderMgr.getOrder(orderId));
                hookID += 'order.confirmation';
                break;
            case emailTypes.accountLocked:
                hookID += 'account.lockedOut';
                break;
            case emailTypes.accountEdited:
            case emailTypes.accountNameChanged:
            case emailTypes.accountAddressChanged:
            case emailTypes.accountPaymentChanged:
            case emailTypes.accountEmailChanged:
                params.put('EmailType', emailObj.type);
                hookID += 'account.updated';
                break;
            case emailTypes.contactUs:
                context.myquestion = context.topic;
                params.put('ContactUs', context);
                hookID += 'customerService.contactUs';
                break;
            default:
                Logger.warn('Mail send hook called, but correct action undetermined, mail not sent as a result.');
                break;
        }
    }

    emailData.params = params;

    if (hookID !== hookPath && HookMgr.hasHook(hookID)) {
        var promise = SynchronousPromise.unresolved()
            .then(function (data) {
                result = data;
            })
            .catch(function (data) {
                result = data;
            });

        HookMgr.callHook(
            hookID,
            hookID.slice(hookID.lastIndexOf('.') + 1),
            promise,
            emailData
        );

        var success = result && (result.status === 'OK');
        return new Status(success ? Status.OK : Status.ERROR);
    }
}

exports.sendEmail = sendEmail;
