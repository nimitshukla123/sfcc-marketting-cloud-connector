'use strict';

/**
 * @type {dw.web.HttpParameterMap}
 */
var params = request.httpParameterMap;
/**
 * @type {dw.system.HookMgr}
 */
var HookMgr = require('dw/system/HookMgr');

/**
 * Executes a hook
 * @param {string} hookID
 */
function executeHook(hookID) {
    if (HookMgr.hasHook(hookID)) {
        HookMgr.callHook(
            hookID,
            hookID.slice(hookID.lastIndexOf('.') + 1)
        );
    }
}

/**
 * Executes a hook, with the response set to cache for 24 hours
 */
function cachedHook() {
    response.setExpires(Date.now() + (3600 * 24) * 1000); // 24 hours
    executeHook(params.hookID.stringValue);
}

/**
 * Executes a hook without any caching explicitly set
 */
function nonCachedHook() {
    executeHook(params.hookID.stringValue);
}

/**
 * Security to ensure this controller is only executed via remote includes
 * @param {Function} cbFunc
 * @returns {Function} Wrapper that implements the security check
 */
function ensureRemoteInclude(cbFunc) {
    var ret = function expose() {
        // ensure only accessed as a remote include
        if (request.isIncludeRequest()) {
            return cbFunc();
        } else {
            throw new Error('Invalid request! Module: ' + module.id + ' ;; Method: ' + cbFunc.toString());
        }
    };
    ret.public = true;
    return ret;
}

exports.CachedHook = ensureRemoteInclude(cachedHook);
exports.NonCachedHook = ensureRemoteInclude(nonCachedHook);
