'use strict';

var sendEmail = require('./util/email').sendEmail;
var Logger = require('dw/system/Logger');

/**
 * Send an order confirmation notification
 * @param {SynchronousPromise} promise
 * @param {CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function confirmation(promise, data) {
    Logger.debug('Handler hook {0} executed', 'order.confirmation');
    return sendEmail(promise, data);
}

module.exports = require('dw/system/HookMgr').callHook(
    'app.communication.handler.initialize',
    'initialize',
    require('./handler').handlerID,
    'app.communication.order',
    {
        confirmation: confirmation
    }
);
