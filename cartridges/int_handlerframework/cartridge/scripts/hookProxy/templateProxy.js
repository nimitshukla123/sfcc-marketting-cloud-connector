'use strict';

/**
 * @type {dw.template.Velocity}
 */
const velocity = require('dw/template/Velocity');
/**
 * @type {dw.system.HookMgr}
 */
const HookMgr = require('dw/system/HookMgr');
/**
 * @type {dw.system.Logger}
 */
const Logger = require('dw/system/Logger');

/**
 * Executes app.tracking.trackNonCached hook via remote include
 * @param {boolean} isAjax
 * @param {object} ismlParams
 */
function trackNonCached(isAjax, ismlParams) {
    const helper = require('~/cartridge/scripts/util/helper');

    var hookID = 'app.tracking.trackNonCached';
    if (HookMgr.hasHook(hookID)) {
        Logger.debug('requesting {0}', hookID);
        var params = [];
        var pdict;

        params.push('\'isAjax\', $isAjax');
        params.push('\'currentController\', $currentController.controller');
        params.push('\'currentControllerMethod\', $currentController.method');
        if (!empty(request.triggeredForm)) {
            params.push('\'formID\', $request.triggeredForm.formId');
            params.push('\'formActionID\', $request.triggeredFormAction.formId');
        }
        if (ismlParams && 'pdict' in ismlParams) {
            pdict = ismlParams.pdict;
            if (!empty(pdict) && 'Order' in pdict && !empty(pdict.Order)) {
                params.push('\'orderNo\', $pdict.Order.orderNo');
            }
        }
        request.httpParameterMap.parameterNames.toArray().forEach(function(param){
            request.httpParameterMap.get(param).values.toArray().forEach(function(v, i){
                params.push('\'param_'+ param +'\', $request.httpParameterMap.get(\''+ param +'\').values['+ i +']');
            });
        });
        var paramStr = params.length > 0 ? ', ' + params.join(', ') : '';
        velocity.render('$velocity.remoteInclude(\'HandlerInclude-NonCachedHook\', \'hookID\', $hookID'+ paramStr +')', {
            velocity: velocity,
            hookID: hookID,
            request: request,
            currentController: helper.detectController(),
            isAjax: isAjax,
            pdict: pdict
        });
    } else {
        Logger.debug('no hook registered for {0}', hookID);
    }
}

/**
 * Hook proxy for htmlHead hook
 * Executes remote include for app.tracking.cachedTrackingLink
 */
function htmlHead(/*ismlParams*/) {
    var hookID;

    // insert tracking link
    hookID = 'app.tracking.cachedTrackingLink';
    if (HookMgr.hasHook(hookID)) {
        Logger.debug('requesting {0}', hookID);
        velocity.render('$velocity.remoteInclude(\'HandlerInclude-CachedHook\', \'hookID\', $hookID)', {velocity: velocity, hookID: hookID});
    } else {
        Logger.debug('no hook registered for {0}', hookID);
    }
}

/**
 * Hook proxy for afterFooter hook
 * Executes remote includes for app.tracking.trackCached, app.tracking.trackNonCached
 * @param {object} ismlParams
 */
function afterFooter(ismlParams) {
    var hookID;

    // insert cached tracking information
    hookID = 'app.tracking.trackCached';
    if (HookMgr.hasHook(hookID)) {
        Logger.debug('requesting {0}', hookID);
        velocity.render('$velocity.remoteInclude(\'HandlerInclude-CachedHook\', \'hookID\', $hookID)', {velocity: velocity, hookID: hookID});
    } else {
        Logger.debug('no hook registered for {0}', hookID);
    }

    // insert dynamic/uncached tracking information
    trackNonCached(false, ismlParams);
}

/**
 * Hook proxy for ajaxPartial hook
 * Executes remote includes for app.tracking.trackNonCached
 * @param {object} ismlParams
 */
function ajaxPartial(ismlParams) {
    // insert dynamic/uncached tracking information
    trackNonCached(true, ismlParams);
}

exports.htmlHead = htmlHead;
exports.afterFooter = afterFooter;
exports.ajaxPartial = ajaxPartial;
