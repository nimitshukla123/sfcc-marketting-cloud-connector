'use strict';

/**
 * @module communication/oms
 */

const sendTrigger = require('./util/send').sendTrigger;
const hookPath = 'app.communication.oms.';

/**
 * Trigger a shipment notification
 * @param {SynchronousPromise} promise
 * @param {module:communication/util/trigger~CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function shipment(promise, data) {
    return sendTrigger(hookPath + 'shipment', promise, data);
}

/**
 * Trigger a return order created notification
 * @param {SynchronousPromise} promise
 * @param {module:communication/util/trigger~CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function returnOrderCreated(promise, data) {
    return sendTrigger(hookPath + 'returnOrderCreated', promise, data);
}

/**
 * Trigger a invoice notification
 * @param {SynchronousPromise} promise
 * @param {module:communication/util/trigger~CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function invoiceProcessed(promise, data) {
    return sendTrigger(hookPath + 'invoiceProcessed', promise, data);
}

/**
 * Declares attributes available for data mapping configuration
 * @returns {Object} Map of hook function to an array of strings
 */
function triggerDefinitions() {
    return {
        shipment: {
            description: 'See API doc for dw.om.shipments.ShipmentDetail to determine available fields for mapping.\n' +
            'https://documentation.demandware.com/API1/index.jsp',
            attributes: [
                'Shipment'
            ]
        },
        returnOrderCreated: {
            description: 'See API doc for dw.om.returnorders.ReturnOrderDetail to determine available fields for mapping.\n' +
            'https://documentation.demandware.com/API1/index.jsp',
            attributes: [
                'ReturnOrder'
            ]
        },
        invoiceProcessed: {
            description: 'See API doc for dw.om.invoices.InvoiceDetail to determine available fields for mapping.\n' +
            'https://documentation.demandware.com/API1/index.jsp',
            attributes: [
                'Invoice'
            ]
        }
    };
}

module.exports = require('dw/system/HookMgr').callHook(
    'app.communication.handler.initialize',
    'initialize',
    require('./handler').handlerID,
    'app.communication.oms',
    {
        shipment: shipment,
        returnOrderCreated: returnOrderCreated,
        invoiceProcessed: invoiceProcessed
    }
);

// non-hook exports
module.exports.triggerDefinitions = triggerDefinitions;
