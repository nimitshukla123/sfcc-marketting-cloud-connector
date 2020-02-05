'use strict';

var sendEmail = require('./util/email').sendEmail;
var Logger = require('dw/system/Logger');

/**
 * Send a customer service notification
 * @param {SynchronousPromise} promise
 * @param {CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function contactUs(promise, data) {
    Logger.debug('Handler hook {0} executed', 'customerService.contactUs');
    return sendEmail(promise, data);
}

module.exports = require('dw/system/HookMgr').callHook(
    'app.communication.handler.initialize',
    'initialize',
    require('./handler').handlerID,
    'app.communication.customerService',
    {
        contactUs: contactUs
    }
);
