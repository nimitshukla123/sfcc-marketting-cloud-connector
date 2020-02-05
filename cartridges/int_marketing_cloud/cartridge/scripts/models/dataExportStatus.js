'use strict';

/**
 * @module models/dataExportStatus
 */

/**
 * Custom object name
 * @const {string}
 * @private
 */
const customObjectName = 'MarketingCloudDataExportStatus';
const helpers = require('../util/helpers');

/**
 * DataExportStatus constructor
 * @param {string} exportID
 * @constructor
 * @alias module:models/dataExportStatus~DataExportStatus
 */
function DataExportStatus(exportID) {
    /**
     * The site ID + export ID
     * @type {string}
     */
    this.siteID_exportID = require('dw/system/Site').current.ID + '_' + exportID;
    /**
     * Definition object
     * @type {dw.object.CustomAttributes}
     */
    this._definition = helpers.getCustomObject(customObjectName, this.siteID_exportID, true);
    /**
     * Date last exported
     * @type {Date}
     */
    this.lastExported = this._definition.lastExportRun;
    /**
     * Current export date
     * @type {Date}
     */
    this.currentExport = new Date();
}

/**
 * @alias module:models/dataExportStatus~DataExportStatus#prototype
 */
DataExportStatus.prototype = {
    markExported: function markExported() {
        var that = this;
        require('dw/system/Transaction').wrap(function() {
            that.lastExported = that.currentExport;
            that._definition.lastExportRun = that.lastExported;
        });
    }
};

module.exports = DataExportStatus;
