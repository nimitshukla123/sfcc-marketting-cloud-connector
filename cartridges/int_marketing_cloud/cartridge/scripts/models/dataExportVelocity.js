'use strict';

/**
 * @module models/dataExport
 */

/**
 * @type {dw.system.HookMgr}
 */
const HookMgr = require('dw/system/HookMgr');
/**
 * @type {dw.system.Logger}
 */
const Logger = require('dw/system/Logger');
/**
 * @type {dw.io.StringWriter}
 */
const StringWriter = require('dw/io/StringWriter');
/**
 * @type {dw.template.Velocity}
 */
const velocity = require('dw/template/Velocity');

/**
 * Custom object name
 * @const {string}
 * @private
 */
const customObjectName = 'MarketingCloudDataExport';
const helpers = require('../util/helpers');
const baseFolder = 'mcc';

/**
 * DataExport constructor
 * @todo This is intended as an alternative to dataExport.js (which uses runtime mapping). Needs full parity before it can act as replacement
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

    var hookID;
    var filters = [];

    hookID = 'app.objectMapper.filters';
    if (HookMgr.hasHook(hookID)) {
        filters = HookMgr.callHook(
            hookID,
            hookID.slice(hookID.lastIndexOf('.') + 1)
        );
    } else {
        Logger.error('no hook registered for {0}', hookID);
    }

    filters.push({
        id: '*',
        description: 'Handle CSV formatting specifics for Marketing Cloud.',
        callback: function csvFormatting(config, key, value, data){
            if (config.type === 'bool') {
                value = value === true ? 'Y' : 'N';
            }
            if (typeof(value) === 'string') {
                // remove line breaks, otherwise MC complains, despite correct quoting.
                value = value.replace(/(\r\n|\n|\r)/gm, ' ');
            } else if (Array.isArray(value)) {
                value = JSON.stringify(value);
            }

            if (empty(value)) {
                // ensure empty string, rather than empty array, undefined, null, etc
                value = '';
            }

            return value;
        },
        priority: 99
    });

    var mapFilter;
    hookID = 'app.objectMapper.newMapFilter';
    if (HookMgr.hasHook(hookID)) {
        mapFilter = HookMgr.callHook(
            hookID,
            hookID.slice(hookID.lastIndexOf('.') + 1),
            filters
        );
    } else {
        Logger.error('no hook registered for {0}', hookID);
    }

    var callbacks;
    hookID = 'app.objectMapper.csvCallbacks';
    if (HookMgr.hasHook(hookID)) {
        callbacks = HookMgr.callHook(
            hookID,
            hookID.slice(hookID.lastIndexOf('.') + 1),
            function filter(config, key, value, data){
                return mapFilter.applyFilters(config, key, value, data);
            }
        );
    } else {
        Logger.error('no hook registered for {0}', hookID);
    }

    this.mapFilter = mapFilter;
    this.callbacks = callbacks;

    this.template = require('dw/util/StringUtils').format('{0}{1}{2}_{3}.vs', baseFolder, require('dw/io/File').SEPARATOR, customObjectName, exportID);

    this._buildHeader();
}

/**
 * @alias module:models/dataExport~DataExport#prototype
 */
DataExport.prototype = {
    _renderTemplate: function _renderTemplate(args) {
        var jsonOut = new StringWriter();

        args.velocity = velocity;
        velocity.renderTemplate(this.template, args, jsonOut);

        return jsonOut.toString();
    },

    _buildHeader: function _buildHeader() {
        // reset the header
        this.header = [];

        var jsonStr = this._renderTemplate({
            data: {},
            outputColumns: true,
            output: this.callbacks
        });

        this.header = JSON.parse(jsonStr);
    },

    buildRow: function buildRow(data) {
        data.SiteID = require('dw/system/Site').current.ID;

        try {
            var jsonStr = this._renderTemplate({
                data: data,
                outputColumns: false,
                output: this.callbacks
            });

            try {
                return JSON.parse(jsonStr);
            } catch (e) {
                Logger.error('Error parsing JSON: {0}', e.message);
            }
        }catch(e) {
            if (this.mapFilter.isRequiredException(e)) {
                Logger.debug(e.message);
            } else {
                throw e;
            }
        }
    },

    markExported: function markExported() {
        this.lastExportStatus.markExported();
    }
};

module.exports = DataExport;
