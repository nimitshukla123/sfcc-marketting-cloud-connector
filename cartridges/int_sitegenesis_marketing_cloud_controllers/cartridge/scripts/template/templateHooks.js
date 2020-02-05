'use strict';

var ISML = require('dw/template/ISML');
var Logger = require('dw/system/Logger');

/**
 * Example template-based hook
 * Should be executed in page head
 * Renders a template result. No value return is expected.
 * Platform hook execution results in all registered hooks being executed, regardless of any return value.
 * For this to execute, a cartridge's hooks.json must register app.template.htmlHead hook.
 * @param {Object} params Parameters from the template
 */
function htmlHead(params) {
    // see example implementation in afterFooter
}

/**
 * Example template-based hook
 * Should be executed after page footer
 * Renders a template result. No value return is expected.
 * Platform hook execution results in all registered hooks being executed, regardless of any return value.
 * For this to execute, a cartridge's hooks.json must register app.template.afterFooter hook.
 * @param {Object} params Parameters from the template
 */
function afterFooter(params) {
    // NOTE: Template naming is still important, ensure your template is unique
    // Otherwise, an unexpected template may be rendered based on cartridge path
    var templateName = 'hooks/afterFooter';
    try {
        ISML.renderTemplate(templateName, params);
        // Another option is to render using Velocity templates
        /*
         var velocity = require('dw/template/Velocity');
         params.message = params.message || 'world';
         velocity.render('Hello $message', params);
         */
    } catch (e) {
        Logger.error('Error while rendering template ' + templateName);
    }
}

/**
 * Example template-based hook
 * Should be executed when responding to an ajax request (only recommended when the returned result is HTML, rather than JSON response).
 * Renders a template result. No value return is expected.
 * Platform hook execution results in all registered hooks being executed, regardless of any return value.
 * For this to execute, a cartridge's hooks.json must register app.template.ajaxPartial hook.
 * @param {Object} params Parameters from the template
 */
function ajaxPartial(params) {
    // see example implementation in afterFooter
}

exports.htmlHead = htmlHead;
exports.afterFooter = afterFooter;
exports.ajaxPartial = ajaxPartial;
