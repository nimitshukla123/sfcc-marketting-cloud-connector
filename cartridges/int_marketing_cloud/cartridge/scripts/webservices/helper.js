'use strict';

/**
 * @module webservices/helper
 */

/**
 * @return {Object|boolean} Token object or false
 * @throws {Error} Throws error when no valid auth token is available (i.e.- service error, service down)
 */
function getValidToken() {
    /**
     * @type {module:models/authToken~AuthToken}
     */
    var authToken = require('int_marketing_cloud').authToken();
    var token = authToken.getValidToken();

    if (empty(token) || !token.accessToken) {
        throw new Error('No auth token available!');
    }

    return token;
}

module.exports = {
    getValidToken: getValidToken
};
