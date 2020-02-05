'use strict';

/**
 * @type {dw.system.HookMgr}
 */
const HookMgr = require('dw/system/HookMgr');
/**
 * @type {dw.system.Logger}
 */
const Logger = require('dw/system/Logger');

/**
 * Hook proxy for app.tracking.trackNonCached
 * Executes hooks:
 * - app.tracking.getDataLayer
 * - app.tracking.preEvents
 * - app.tracking.event
 * - app.tracking.postEvents
 * @param {Function} cb Optional callback
 */
function trackNonCached(cb) {
    var hookID = 'app.tracking.getDataLayer';
    var requestData;
    HookMgr.callHook(
        hookID,
        hookID.slice(hookID.lastIndexOf('.') + 1),
        function(output) {
            requestData = output;
            if (cb) {
                cb('app.tracking.getDataLayer', output);
            }
        }
    );

    hookID = 'app.tracking.preEvents';
    if (HookMgr.hasHook(hookID)) {
        HookMgr.callHook(
            hookID,
            hookID.slice(hookID.lastIndexOf('.') + 1),
            requestData,
            cb ? function(output) {
                cb('app.tracking.preEvents', output);
            } : null
        );
    } else {
        Logger.debug('no hook registered for {0}', hookID);
    }

    hookID = 'app.tracking.event';
    if (HookMgr.hasHook(hookID)) {
        if ('events' in requestData && Array.isArray(requestData.events)) {
            requestData.events.forEach(function (eventDetail) {
                var eventName = eventDetail[0];
                var eventValue = eventDetail[1];

                HookMgr.callHook(
                    hookID,
                    hookID.slice(hookID.lastIndexOf('.') + 1),
                    eventName,
                    eventValue,
                    requestData,
                    cb ? function (output) {
                        cb('app.tracking.event', output);
                    } : null
                );
            });
        }
    } else {
        Logger.debug('no hook registered for {0}', hookID);
    }

    hookID = 'app.tracking.postEvents';
    if (HookMgr.hasHook(hookID)) {
        HookMgr.callHook(
            hookID,
            hookID.slice(hookID.lastIndexOf('.') + 1),
            requestData,
            cb ? function(output) {
                cb('app.tracking.postEvents', output);
            } : null
        );
    } else {
        Logger.debug('no hook registered for {0}', hookID);
    }
}

exports.trackNonCached = trackNonCached;
