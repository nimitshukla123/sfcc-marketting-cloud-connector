'use strict';

var customObjectName = 'CommunicationHandlers';

/**
 * Use with array filter, to filter hooks not matching the communication handler pattern
 * @param {string} hook The hook path/ID
 * @returns {boolean} Whether hook is comm handler
 */
function hookFilter(hook) {
    var match = 'app.communication.';
    var exclude = match +'handler.';
    return hook.name.slice(0, match.length) === match &&
        hook.name.slice(0, exclude.length) !== exclude;
}

/**
 * Use with array filter, to filter objects that are not enabled.
 * @param {Object} obj A plain JS object that may have an "enabled" boolean property
 * @returns {boolean} Whether object is enabled
 */
function enabledFilter(obj) {
    return obj.hasOwnProperty('enabled') && obj.enabled === true;
}

/**
 * Recursively merge plain JS objects in place, preserving "enabled" property
 * @param {Object} newHandlers
 * @param {Object} oldHandlers
 */
function mergeHandlers(newHandlers, oldHandlers) {
    // TODO: Additionally support a sites array property, for fine-grained configuration
    for (var handler in newHandlers) {
        if (newHandlers.hasOwnProperty(handler)) {
            var isEnabled = oldHandlers.hasOwnProperty(handler) && oldHandlers[handler].hasOwnProperty('enabled') && oldHandlers[handler].enabled === true;
            newHandlers[handler].enabled = isEnabled;

            if (newHandlers[handler].hasOwnProperty('hooks')) {
                newHandlers[handler].hooks = newHandlers[handler].hooks.filter(hookFilter);
                mergeHandlers(newHandlers[handler].hooks, (oldHandlers.hasOwnProperty(handler) && oldHandlers[handler].hasOwnProperty('hooks')) ? oldHandlers[handler].hooks : {})
            }
        }
    }
}

/**
 * Returns current instance type as a string
 * @returns {string} development|staging|production
 */
function getInstanceType() {
    var System = require('dw/system/System');
    var instanceType;
    switch(System.instanceType){
        case System.PRODUCTION_SYSTEM:
            instanceType = 'production';
            break;
        case System.STAGING_SYSTEM:
            instanceType = 'staging';
            break;
        case System.DEVELOPMENT_SYSTEM:
        default:
            instanceType = 'development';
            break;
    }
    return instanceType;
}

/**
 * Fetches handler config custom object
 * @returns {dw/object/CustomAttributes}
 */
function getConfig() {
    var com = require('dw/object/CustomObjectMgr'),
        instanceType = getInstanceType(),
        config = com.getCustomObject(customObjectName, instanceType);
    if (empty(config) && getInstanceType() != 'production') {
        require('dw/system/Transaction').wrap(function(){
            config = com.createCustomObject(customObjectName, instanceType);
        });
    }
    return config.getCustom();
}

/**
 * Filter handler config down to include only enabled properties
 * @param {string} [filterByHandlerID] Optional handler ID to specify, to further reduce the returned object
 * @returns {Object}
 */
function filteredConfig(filterByHandlerID) {
    var result = {};
    try {
        var config = JSON.parse(getConfig().configJson);
        for (var handler in config) {
            if (!empty(filterByHandlerID) && handler !== filterByHandlerID) {
                continue;
            }
            if (config.hasOwnProperty(handler) && enabledFilter(config[handler])) {
                result[handler] = config[handler];
                if (result[handler].hasOwnProperty('hooks')) {
                    result[handler].hooks = result[handler].hooks.filter(enabledFilter);
                }
            }
        }
    } catch(e) {}
    return result;
}

/**
 * Checks whether a handler and it's hook is enabled
 * @param {string} handlerID
 * @param {string} hookID
 * @returns {boolean} Whether hook is enabled
 */
function isHookEnabled(handlerID, hookID) {
    var config = filteredConfig(handlerID);
    var handlerConfig = config && config.hasOwnProperty(handlerID) && config[handlerID];
    //dw.system.Logger.error('filtered config: {0}', JSON.stringify(handlerConfig, null, 4));
    if (handlerConfig && handlerConfig.hasOwnProperty('hooks')) {
        return 0 < handlerConfig.hooks.filter(function(hook){return hook.name === hookID;}).length;
    }
    return false;
}

module.exports = {
    getConfig: getConfig,
    getFilteredConfig: filteredConfig,
    mergeConfigs: mergeHandlers,
    isHookEnabled: isHookEnabled
};
