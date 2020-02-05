'use strict';

/**
 * initCommHandlers is handling [re]building of communication handler configuration.
 * Old configuration (if any) is merged with new configuration.
 * Result is stored to a custom object.
 */
function initCommHandlers() {
    var HookMgr = require('dw/system/HookMgr');
    var handlerConfig = require('./util/handlerConfig');

    var config = handlerConfig.getConfig();
    var commHandlers = config.configJson;

    try {
        commHandlers = commHandlers ? JSON.parse(commHandlers) : {};
    } catch(e) {
        // Catch exception from invalid JSON
        commHandlers = {};
    }

    /* hooks.json current cartridge must list all registerHandler hooks, otherwise this logic fails */
    var regHandlerHook = 'app.communication.handler.registerHandler';
    var registeredHandlers = {};
    if (HookMgr.hasHook(regHandlerHook)) {
        HookMgr.callHook(
            regHandlerHook,
            regHandlerHook.slice(regHandlerHook.lastIndexOf('.')+1),
            registeredHandlers
        );

        handlerConfig.mergeConfigs(registeredHandlers, commHandlers);
    }

    require('dw/system/Transaction').wrap(function() {
        config.configJson = JSON.stringify(registeredHandlers, null, 4);
    });
}

exports.initCommHandlers = initCommHandlers;
