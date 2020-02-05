'use strict';

var sendEmail = require('./util/email').sendEmail;
var Logger = require('dw/system/Logger');

/**
 * Sends account created notification
 * @param {SynchronousPromise} promise
 * @param {CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function created(promise, data) {
    Logger.debug('Handler hook {0} executed', 'account.created');
    return sendEmail(promise, data);
}

/**
 * Sends account updated notification
 * @param {SynchronousPromise} promise
 * @param {CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function updated(promise, data) {
    Logger.debug('Handler hook {0} executed', 'account.updated');
    return sendEmail(promise, data);
}

/**
 * Sends password changed notification
 * @param {SynchronousPromise} promise
 * @param {CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function passwordChanged(promise, data) {
    Logger.debug('Handler hook {0} executed', 'account.passwordChanged');
    return sendEmail(promise, data);
}

/**
 * Sends password reset notification
 * @param {SynchronousPromise} promise
 * @param {CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function passwordReset(promise, data) {
    Logger.debug('Handler hook {0} executed', 'account.passwordReset');
    return sendEmail(promise, data);
}

/**
 * Sends account locked out notification
 * @param {SynchronousPromise} promise
 * @param {CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function lockedOut(promise, data) {
    Logger.debug('Handler hook {0} executed', 'account.lockedOut');
    return sendEmail(promise, data);
}

module.exports = require('dw/system/HookMgr').callHook(
    'app.communication.handler.initialize',
    'initialize',
    require('./handler').handlerID,
    'app.communication.account',
    {
        created: created,
        updated: updated,
        passwordChanged: passwordChanged,
        passwordReset: passwordReset,
        lockedOut: lockedOut
    }
);
