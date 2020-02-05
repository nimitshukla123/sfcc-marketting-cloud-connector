'use strict';

/**
 * Detect controller/method. Returns empty object if nothing detected.
 * @returns {{controller: string, method: string}}
 */
function detectController() {
    var controllerMatch = {
        controller: '',
        method: ''
    };
    var httpPath = request.httpPath.slice((request.httpPath.lastIndexOf('/') - 1 >>> 0) + 2);
    var controllerMatches = httpPath.split('-');
    if (!empty(controllerMatches[0])) {
        controllerMatch.controller = controllerMatches[0] || '';
        controllerMatch.method = controllerMatches[1] || '';
    } else {
        var stack;
        // Can't simply access `new Error().stack`, only exists when thrown
        try { throw new Error(); }catch(e) { stack = e.stack; }
        // finds last (first) controller occurrence in the stack, to ensure a controller helper function isn't being detected
        if (stack) {
            controllerMatches = stack.match(/\/controllers\/([^\s]+)\.[dj]s\:\d+\s\((\w+)\)(?!\s*.*\/controllers\/)/);
            if (controllerMatches) {
                controllerMatch.controller = controllerMatches[1];
                controllerMatch.method = controllerMatches[2];
            }
        }
    }

    return controllerMatch;
}

/**
 * Returns whether current request is an Ajax request
 * @return {boolean}
 */
function isAjaxRequest() {
    var isAjax = false;
    var params = request.httpParameterMap;

    if (params.isParameterSubmitted('isAjax') && params.get('isAjax').getBooleanValue(false)) {
        /**
         * isAjax param is set by templateProxy for ajax partials
         * isAjax param may also be set by SG for ajax requests
         */
        isAjax = true;
    } else if (request.httpHeaders.get('x-requested-with') === 'XMLHttpRequest') {
        isAjax = true;
    }

    return isAjax;
}

exports.detectController = detectController;
exports.isAjaxRequest = isAjaxRequest;
