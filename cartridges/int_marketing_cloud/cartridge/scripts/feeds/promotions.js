'use strict';

/**
 * @module feeds/promotions
 */

/**
 * @type {dw.campaign.PromotionMgr}
 */
const PromotionMgr = require('dw/campaign/PromotionMgr');

/**
 * @type {module:models/export~Export}
 */
const Export = require('../models/export');

/**
 * @type {module:models/export~Export}
 */
var exportModel;

/**
 * Collection of promotions
 * @type {dw.util.Collection}
 */
var PMS;

function beforeStep(parameters, stepExecution) {
    exportModel = new Export(parameters, function(em){
        PMS = PromotionMgr.getPromotions();
        return PMS.iterator();
    });
    exportModel.writeHeader();
}

function getTotalCount(parameters, stepExecution) {
    return PMS.size();
}

function read(parameters, stepExecution) {
    return exportModel.readNext();
}

/**
 * @param {dw.campaign.Promotion} promotion
 * @param parameters
 * @param stepExecution
 * @returns {void|Array}
 */
function process(promotion, parameters, stepExecution) {
    var skip = false;
    if (exportModel.isIncremental) {
        if (promotion.lastModified < exportModel.lastExported) {
            skip = true;
        }
    }
    if (!skip) {
        var data = {
            Promotion: promotion,
            Campaign: promotion.campaign
        };
        return exportModel.buildRow(data);
    }
}

function write(lines, parameters, stepExecution) {
    for (var i = 0; i < lines.size(); i++) {
        exportModel.writeRow(lines.get(i));
    }
}

function afterStep(success, parameters, stepExecution) {
    exportModel.close();
}

module.exports = {
    beforeStep: beforeStep,
    getTotalCount: getTotalCount,
    read: read,
    process: process,
    write: write,
    afterStep: afterStep
};