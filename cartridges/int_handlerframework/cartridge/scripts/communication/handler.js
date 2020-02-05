'use strict';

// handlerID can be any unique identifier
exports.handlerID = 'standard_email';

/**
 * Register communication handler
 * @param {object} registerHandler
 */
exports.registerHandler = function(registerHandler) {
    registerHandler[this.handlerID] = {
        name: 'Standard email',
        cartridge: module.cartridge,
        id: this.handlerID,
        hooks: require('~/hooks.json').hooks
    };
};

/**
 * Checks if hook is enabled
 * @param {string} handlerID
 * @param {string} hookID
 * @returns {boolean}
 */
exports.hookEnabled = function(handlerID, hookID) {
    return require(module.cartridge).commConfig.isHookEnabled(handlerID, hookID);
};

/**
 * Initializes hook functions, whitelisting the hook functions that should be enabled based on config
 * @param {string} handlerID
 * @param {string} hookPath
 * @param {Object} hookFunctions Object map of properties -> functions
 * @returns {Object} Returns the sanitized function definitions
 */
exports.initialize = function(handlerID, hookPath, hookFunctions) {
    for (var hook in hookFunctions) {
        if (hookFunctions.hasOwnProperty(hook)) {
            if (!this.hookEnabled(handlerID, hookPath +'.'+ hook)) {
                // Set to empty function if hook not enabled
                hookFunctions[hook] = function(){};
            }
        }
    }

    return hookFunctions;
};
