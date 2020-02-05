'use strict';

/**
 * @module models/dataExport
 */

/**
 * Custom object name
 * @const {string}
 * @private
 */
const customObjectName = 'MarketingCloudDataExport';
const helpers = require('../util/helpers');

/**
 * DataExport constructor
 * @param {string} exportID
 * @constructor
 * @alias module:models/dataExport~DataExport
 */
function DataExport(exportID) {
    /**
     * The export ID
     * @type {string}
     */
    this.exportID = exportID;
    /**
     * Definition object
     * @type {dw.object.CustomAttributes}
     */
    this.definition = helpers.getCustomObject(customObjectName, exportID);
    /**
     * Expanded attributes from dataExport definition
     * @type {Object}
     */
    this.attributes = helpers.expandAttributes(this.definition.exportAttributes);
    /**
     * Array header (attributes object values)
     * @type {Array}
     */
    this.header = null;

    var DataExportStatus = require('./dataExportStatus');
    /**
     * @type {DataExportStatus}
     */
    this.lastExportStatus = new DataExportStatus(exportID);

    this._buildHeader();
}

/**
 * @alias module:models/dataExport~DataExport#prototype
 */
DataExport.prototype = {
    _buildHeader: function _buildHeader() {
        var objToStr = function (obj) {
            if (helpers.isObject(obj) && obj.hasOwnProperty('label')) {
                return obj.label;
            }
            return obj;
        };
        // reset the header
        this.header = [];
        // convert the mapped attributes to a writable array
        helpers.objValues(this.attributes).forEach(function convertAttributesToHeader(v) {
            if (Array.isArray(v)) {
                // push contents of second array onto first
                Array.prototype.push.apply(this.header, v.map(objToStr).filter(helpers.isNonEmptyString));
            } else {
                v = objToStr(v);
                if (helpers.isNonEmptyString(v)) {
                    this.header.push(v);
                }
            }
        }, this);
    },

    buildRow: function buildRow(data) {
        var missingRequired = false;
        var rowVal = [];
        data.SiteID = require('dw/system/Site').current.ID;
        helpers.mapValues(this.attributes, data,
            /**
             * Output callback, called by helpers.mapValues()
             * @param {string|Object} key The data map definition. Object = complex definition
             * @param {*} val The value mapped by helpers.getParamValue()
             */
            function outputCallback(key, val) {
                try {
                    rowVal.push(helpers.mappingFilter(key, val, data));
                } catch(e) {
                    if (e instanceof helpers.RequiredAttributeException) {
                        missingRequired = true;
                        require('dw/system/Logger').debug(e.message);
                    } else {
                        // unhandled exception
                        throw e;
                    }
                }
            });
        // Row is not returned if any single required field was missing
        if (!missingRequired) {
            return rowVal;
        }
    },

    markExported: function markExported() {
        this.lastExportStatus.markExported();
    }
};

module.exports = DataExport;
