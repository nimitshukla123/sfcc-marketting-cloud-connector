'use strict';

var HookMgr = require('dw/system/HookMgr');
var Logger = require('dw/system/Logger');

function stringifyError(key, value) {
    if (value instanceof Error) {
        var error = {};
        Object.getOwnPropertyNames(value).forEach(function (k) {
            error[k] = value[k];
        });
        return error;
    }

    return value;
}

/**
 * @param {string} hookname Registered hook
 * @param {string} [hookfunction] Optional hook function, if empty, function is deduced from hookname
 * @param {Object} [params] Optional params object to pass to the called hook
 */
function callHook(hookname, hookfunction, params) {
    if (hookname) {
        if (empty(hookfunction)) {
            hookfunction = hookname.slice(hookname.lastIndexOf('.') + 1);
        }
        if (HookMgr.hasHook(hookname)) {
            try {
                HookMgr.callHook(
                    hookname,
                    hookfunction,
                    params || {}
                );
            } catch (e) {
                Logger.error(
                    'Exception thrown while executing template hooks. Hook: {0} ;; Function: {1} ;; Error: {2}',
                    hookname,
                    hookfunction,
                    JSON.stringify(e, stringifyError, 4)
                );
            }
        }
    }
}

exports.stringifyError = stringifyError;
exports.callHook = callHook;
