'use strict';

/**
 * @module feeds/content
 */

/**
 * @type {dw.content.ContentSearchModel}
 */
const ContentSearchModel = require('dw/content/ContentSearchModel');
/**
 * @type {dw.content.ContentMgr}
 */
const ContentMgr = require('dw/content/ContentMgr');

/**
 * @type {module:models/export~Export}
 */
const Export = require('../models/export');

/**
 * @type {module:models/export~Export}
 */
var exportModel;

/**
 * @type {dw.content.ContentSearchModel}
 */
var CSM;

function beforeStep(parameters, stepExecution) {
    exportModel = new Export(parameters, function(em){
        CSM = new ContentSearchModel();
        CSM.setFolderID(ContentMgr.siteLibrary.root.ID);
        CSM.setRecursiveFolderSearch(true);
        CSM.search();
        return CSM.getContent();
    });
    exportModel.writeHeader();
}

function getTotalCount(parameters, stepExecution) {
    return CSM.getCount();
}

function read(parameters, stepExecution) {
    return exportModel.readNext();
}

/**
 * @param {dw.content.Content} content
 * @param parameters
 * @param stepExecution
 * @returns {void|Array}
 */
function process(content, parameters, stepExecution) {
    var skip = false;
    if (exportModel.isIncremental) {
        if (content.lastModified < exportModel.lastExported) {
            skip = true;
        }
    }
    if (!skip) {
        var data = {
            Content: content,
            ContentLink: require('dw/web/URLUtils').abs('Page-Show','cid', content.getID())
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