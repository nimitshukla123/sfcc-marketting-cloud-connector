'use strict';

/**
 * @module jobs/compileMappingTemplates
 */

/**
 * @type {dw.object.CustomObjectMgr}
 */
const CustomObjectMgr = require('dw/object/CustomObjectMgr');
/**
 * @type {dw.system.HookMgr}
 */
const HookMgr = require('dw/system/HookMgr');
/**
 * @type {dw.system.Logger}
 */
const Logger = require('dw/system/Logger');

const helpers = require('../util/helpers');

/**
 * @type {dw.util.SeekableIterator}
 */
var mappingObjects;

var primaryKey = '';
var objectType = '';
var attributesId = '';
const baseFolder = 'mcc';

function beforeStep(parameters, stepExecution) {
    switch(parameters.ObjectType) {
        case 'Triggers':
            objectType = 'MarketingCloudTriggers';
            attributesId = 'subscriberAttributes';
            break;
        case 'DataFeeds':
            objectType = 'MarketingCloudDataExport';
            attributesId = 'exportAttributes';
            break;
        case 'Analytics':
            objectType = 'MarketingCloudAnalytics';
            attributesId = 'analyticAttributes';
            break;
        default:
            throw new Error('Expecting a valid ObjectType. Unknown value submitted: '+ parameters.ObjectType);
            break;
    }

    mappingObjects = CustomObjectMgr.getAllCustomObjects(objectType);
    CustomObjectMgr.describe(objectType).attributeDefinitions.toArray().forEach(
        /**
         * @param {dw.object.ObjectAttributeDefinition} definition
         */
        function findPrimaryKey(definition){
            if (!definition.system && definition.key) {
                primaryKey = definition.ID;
            }
        }
    );
}

function getTotalCount(parameters, stepExecution) {
    return mappingObjects.getCount();
}

function read(parameters, stepExecution) {
    if (mappingObjects.hasNext()) {
        return mappingObjects.next();
    }
}

/**
 * @param {dw.object.CustomObject} customObject
 * @param parameters
 * @param stepExecution
 * @returns {Object}
 */
function process(customObject, parameters, stepExecution) {
    return {
        fileName: require('dw/util/StringUtils').format('{0}{1}{2}_{3}.vs', baseFolder, require('dw/io/File').SEPARATOR, objectType, customObject.custom[primaryKey]),
        attributeMap: helpers.expandAttributes(customObject.custom[attributesId])
    };
}

function write(mapConfigs, parameters, stepExecution) {
    var mapConfig;
    var tplOutput;
    var tplHookID = 'app.objectMapper.buildTplFromJson';
    var writerHookID = 'app.velocity.writeTemplate';
    if (HookMgr.hasHook(tplHookID) && HookMgr.hasHook(writerHookID)) {
        for (var i = 0; i < mapConfigs.length; i++) {
            mapConfig = mapConfigs.get(i);
            tplOutput = HookMgr.callHook(
                tplHookID,
                tplHookID.slice(tplHookID.lastIndexOf('.') + 1),
                mapConfig.attributeMap
            );
            HookMgr.callHook(
                writerHookID,
                writerHookID.slice(writerHookID.lastIndexOf('.') + 1),
                mapConfig.fileName,
                tplOutput
            );
        }
    } else {
        Logger.debug('no hooks registered for {0} or {1}', tplHookID, writerHookID);
    }
}

function afterStep(success, parameters, stepExecution) {
    mappingObjects.close();
}

module.exports = {
    beforeStep: beforeStep,
    getTotalCount: getTotalCount,
    read: read,
    process: process,
    write: write,
    afterStep: afterStep
};