'use strict';

var sendEmail = require('./util/email').sendEmail;
var Logger = require('dw/system/Logger');

/**
 * Send a gift certificate notification
 * @param {SynchronousPromise} promise
 * @param {CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function sendCertificate(promise, data) {
    Logger.debug('Handler hook {0} executed', 'giftCertificate.sendCertificate');
    return sendEmail(promise, data);
}

module.exports = require('dw/system/HookMgr').callHook(
    'app.communication.handler.initialize',
    'initialize',
    require('./handler').handlerID,
    'app.communication.giftCertificate',
    {
        sendCertificate: sendCertificate
    }
);
