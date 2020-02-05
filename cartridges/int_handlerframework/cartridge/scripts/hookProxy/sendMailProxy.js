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
 * Hook proxy for mail send action
 * Determines which mail send to execute based on keywords from template name
 * @param args
 * @returns {dw.system.Status}
 */
function sendMail(args) {
    var result;
    if (args.template || args.communicationHookID) {
        var tpl = args.template;
        var hookPath = 'app.communication.';
        var hookID = hookPath;

        if (args.communicationHookID) {
            // Allow an explicit hook identifier, rather than auto-detecting
            hookID += args.communicationHookID;
        } else {
            if (/account.*created|created.*account/i.test(tpl)) {
                hookID += 'account.created';
            } else if (/account.*updated|updated.*account/i.test(tpl)) {
                hookID += 'account.updated';
            } else if (/changed.*password|password.*changed/i.test(tpl)) {
                hookID += 'account.passwordChanged';
            } else if (/reset.*password|password.*reset/i.test(tpl)) {
                hookID += 'account.passwordReset';
            } else if (/lockout|lockedout/i.test(tpl)) {
                hookID += 'account.lockedOut';
            } else if (/contactus/i.test(tpl)) {
                hookID += 'customerService.contactUs';
            } else if (/gift.*cert/i.test(tpl)) {
                hookID += 'giftCertificate.sendCertificate';
            } else if (/order.*confirmation|checkout.*confirmation/i.test(tpl)) {
                hookID += 'order.confirmation';
            } else {
                Logger.warn('Mail send hook called, but correct action undetermined, mail not sent as a result. Email template: {0}', tpl);
            }
        }

        if (hookID !== hookPath && HookMgr.hasHook(hookID)) {
            if (!args.params) {
                args.params = new (require('dw/util/HashMap'))();
            }
            if (!args.params.containsKey('CurrentForms')) {
                args.params.CurrentForms = session && session.forms;
            }
            if (!args.params.containsKey('CurrentHttpParameterMap')) {
                args.params.CurrentHttpParameterMap = request && request.httpParameterMap;
            }
            if (!args.params.containsKey('CurrentCustomer')) {
                args.params.CurrentCustomer = customer;
            }

            var promise = SynchronousPromise.unresolved()
                .then(function(data){
                    result = data;
                })
                .catch(function(data){
                    result = data;
                });

            HookMgr.callHook(
                hookID,
                hookID.slice(hookID.lastIndexOf('.')+1),
                promise,
                args
            );
        }
    }

    var success = result && (result.status === 'OK');
    return new Status( success ? Status.OK : Status.ERROR );
}

exports.sendMail = sendMail;
