'use strict';

/**
 * @module communication/customerService
 */

const sendTrigger = require('./util/send').sendTrigger;
const hookPath = 'app.communication.customerService.';

/**
 * Trigger a customer service notification
 * @param {SynchronousPromise} promise
 * @param {module:communication/util/trigger~CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function contactUs(promise, data) {
    return sendTrigger(hookPath + 'contactUs', promise, data, customFromTo);
}

/**
 * Override the trigger message from/to values
 * @param {module:models/trigger~Trigger} trigger
 * @param {module:communication/util/trigger~CustomerNotification} data
 */
function customFromTo(trigger, data) {
    var sfraInstalled = require('int_marketing_cloud').sfraInstalled();
    if (sfraInstalled) {
        trigger.message.from.name = data.params.ContactUs.firstname +' '+ data.params.ContactUs.lastname;
    } else {
        trigger.message.from.name = data.params.CurrentForms.contactus.firstname.value +' '+ data.params.CurrentForms.contactus.lastname.value;
    }
}

/**
 * Declares attributes available for data mapping configuration
 * @returns {Object} Map of hook function to an array of strings
 */
function triggerDefinitions() {
    var sfraInstalled = require('int_marketing_cloud').sfraInstalled();

    if (sfraInstalled) {
        return {
            contactUs: {
                description: 'Contact Us trigger',
                attributes: [
                    'ContactUs.myquestion',
                    'ContactUs.firstname',
                    'ContactUs.lastname',
                    'ContactUs.email',
                    'ContactUs.comment'
                ]
            }
        };
    } else {
        return {
            contactUs: {
                description: 'Contact Us trigger',
                attributes: [
                    'CurrentForms.contactus.myquestion',
                    'CurrentForms.contactus.firstname',
                    'CurrentForms.contactus.lastname',
                    'CurrentForms.contactus.email',
                    'CurrentForms.contactus.phone',
                    'CurrentForms.contactus.ordernumber',
                    'CurrentForms.contactus.comment'
                ]
            }
        };
    }
}

module.exports = require('dw/system/HookMgr').callHook(
    'app.communication.handler.initialize',
    'initialize',
    require('./handler').handlerID,
    'app.communication.customerService',
    {
        contactUs: contactUs
    }
);

// non-hook exports
module.exports.triggerDefinitions = triggerDefinitions;
