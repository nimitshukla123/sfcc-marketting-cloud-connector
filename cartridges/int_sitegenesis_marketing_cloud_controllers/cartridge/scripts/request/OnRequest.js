'use strict';

/**
 * The onRequest hook is called with every top-level request in a site. This happens both for requests to cached and non-cached pages.
 * For performance reasons the hook function should be kept short.
 *
 * @module  request/OnRequest
 */

var Status = require('dw/system/Status');

/**
 * The onRequest hook function.
 */
exports.onRequest = function () {
    // only return a value if anything is done here, otherwise it may block other onRequest hooks from executing
    //return new Status(Status.OK);
};
