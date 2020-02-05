'use strict';

/**
 * @module webservices/soap
 */

/**
 * Marketing Cloud Connector
 * SOAP API webservice
 * Documentation:
 *  https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-apis.meta/mc-apis/getting_started_developers_and_the_exacttarget_api.htm
 *
 * Production API: https://YOUR_SUBDOMAIN.soap.marketingcloudapis.com/Service.asmx
 */

const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
const WSUtil = require('dw/ws/WSUtil');
const Logger = require('dw/system/Logger');

const defaultHeaders = {
    'Content-Type': 'text/xml'
};

function initServiceClient(svc, action) {
    this.action = action;
    this.webReference = require('int_marketing_cloud').soapReference();
    return this.webReference.getDefaultService();
}

function initRequest(svc) {
    this.setAuthHeader(svc);

    for (var prop in defaultHeaders) {
        if (defaultHeaders.hasOwnProperty(prop)) {
            WSUtil.setHTTPRequestHeader(svc.serviceClient, prop, defaultHeaders[prop]);
        }
    }
}

function SoapService() {
    this.token = false;
}

SoapService.prototype = {
    /**
     * Inserts auth token into request header
     * @param {dw.svc.SOAPService} svc
     * @throws {Error} Throws error when no valid auth token is available (i.e.- service error, service down)
     */
    setAuthHeader: function setAuthHeader(svc) {
        var helper = require('./helper');
        if (!this.token) {
            this.token = helper.getValidToken();
        }

        svc.setAuthentication('NONE');

        var header = <fueloauth xmlns="https://www.marketingcloud.com/">{this.token.accessToken}</fueloauth>;
        WSUtil.addSOAPHeader(svc.serviceClient, header, false, null);
    },

    create: function soapCreate() {
        var soapSvc = this;
        return LocalServiceRegistry.createService('marketingcloud.soap.create', {
            initServiceClient: function(svc) {
                return initServiceClient.call(this, svc, 'create');
            },
            createRequest: function(svc, createObjects, createOptions) {
                initRequest.call(soapSvc, svc);

                var request = new this.webReference.CreateRequest();
                request.options = createOptions ? createOptions : new this.webReference.CreateOptions();
                request.objects.add(createObjects); // APIObject

                return request;
            },
            execute: function(svc, requestObject) {
                return svc.serviceClient.create(requestObject);
            },
            parseResponse : function(svc, responseObject){
                return responseObject;
            },
            mockCall: function (/*svc, requestBody*/) {
                var obj = {
                    "requestId": "f04952b5-49ae-4d66-90a4-c65be553db1f",
                    "responses": [
                        {
                            "recipientSendId": "f04952b5-49ae-4d66-90a4-c65be553db1f",
                            "hasErrors": false,
                            "messages": [
                                "Queued"
                            ]
                        }
                    ]
                };
                return {
                    statusCode: 202,
                    statusMessage: 'Accepted',
                    text: JSON.stringify(obj)
                };
            }
        });
    },

    retrieve: function soapRetrieve() {
        var soapSvc = this;
        return LocalServiceRegistry.createService('marketingcloud.soap.retrieve', {
            initServiceClient: function(svc) {
                return initServiceClient.call(this, svc, 'retrieve');
            },
            createRequest: function(svc, retrieveRequest) {
                initRequest.call(soapSvc, svc);

                var request = new this.webReference.RetrieveRequestMsg();
                request.retrieveRequest = retrieveRequest;

                return request;
            },
            execute: function(svc, requestObject) {
                return svc.serviceClient.retrieve(requestObject);
            },
            parseResponse : function(svc, responseObject){
                return responseObject;
            },
            mockCall: function (/*svc, requestBody*/) {
                var obj = {
                };
                return {
                    statusCode: 202,
                    statusMessage: 'Accepted',
                    text: JSON.stringify(obj)
                };
            }
        });
    },

    update: function soapUpdate() {
        var soapSvc = this;
        return LocalServiceRegistry.createService('marketingcloud.soap.update', {
            initServiceClient: function(svc) {
                return initServiceClient.call(this, svc, 'update');
            },
            createRequest: function(svc, message) {
                initRequest.call(soapSvc, svc);

                var request = new this.webReference.UpdateRequest();
                request.options = new this.webReference.UpdateOptions();
                request.objects = new Array(); // APIObject

                return request;
            },
            execute: function(svc, requestObject) {
                return svc.serviceClient.update(requestObject);
            },
            parseResponse : function(svc, responseObject){
                return responseObject;
            },
            mockCall: function (/*svc, requestBody*/) {
                var obj = {
                };
                return {
                    statusCode: 202,
                    statusMessage: 'Accepted',
                    text: JSON.stringify(obj)
                };
            }
        });
    },

    delete: function soapDelete() {
        var soapSvc = this;
        return LocalServiceRegistry.createService('marketingcloud.soap.delete', {
            initServiceClient: function(svc) {
                return initServiceClient.call(this, svc, 'delete');
            },
            createRequest: function(svc, message) {
                initRequest.call(soapSvc, svc);

                var request = new this.webReference.DeleteRequest();
                request.options = new this.webReference.DeleteOptions();
                request.objects = new Array(); // APIObject

                return request;
            },
            execute: function(svc, requestObject) {
                return svc.serviceClient.delete(requestObject);
            },
            parseResponse : function(svc, responseObject){
                return responseObject;
            },
            mockCall: function (/*svc, requestBody*/) {
                var obj = {
                };
                return {
                    statusCode: 202,
                    statusMessage: 'Accepted',
                    text: JSON.stringify(obj)
                };
            }
        });
    },

    describe: function soapDescribe() {
        var soapSvc = this;
        return LocalServiceRegistry.createService('marketingcloud.soap.describe', {
            initServiceClient: function(svc) {
                return initServiceClient.call(this, svc, 'describe');
            },
            createRequest: function(svc, message) {
                initRequest.call(soapSvc, svc);

                var request = new this.webReference.DefinitionRequestMsg();
                request.describeRequests = new this.webReference.ArrayOfObjectDefinitionRequest();

                return request;
            },
            execute: function(svc, requestObject) {
                return svc.serviceClient.describe(requestObject);
            },
            parseResponse : function(svc, responseObject){
                return responseObject;
            },
            mockCall: function (/*svc, requestBody*/) {
                var obj = {
                };
                return {
                    statusCode: 202,
                    statusMessage: 'Accepted',
                    text: JSON.stringify(obj)
                };
            }
        });
    },

    execute: function soapExecute() {
        var soapSvc = this;
        return LocalServiceRegistry.createService('marketingcloud.soap.execute', {
            initServiceClient: function(svc) {
                return initServiceClient.call(this, svc, 'execute');
            },
            createRequest: function(svc, message) {
                initRequest.call(soapSvc, svc);

                var request = new this.webReference.ExecuteRequestMsg();
                request.requests = new Array(); // ExecuteRequest

                return request;
            },
            execute: function(svc, requestObject) {
                return svc.serviceClient.execute(requestObject);
            },
            parseResponse : function(svc, responseObject){
                return responseObject;
            },
            mockCall: function (/*svc, requestBody*/) {
                var obj = {
                };
                return {
                    statusCode: 202,
                    statusMessage: 'Accepted',
                    text: JSON.stringify(obj)
                };
            }
        });
    },

    perform: function soapPerform() {
        var soapSvc = this;
        return LocalServiceRegistry.createService('marketingcloud.soap.perform', {
            initServiceClient: function(svc) {
                return initServiceClient.call(this, svc, 'perform');
            },
            createRequest: function(svc, message) {
                initRequest.call(soapSvc, svc);

                var request = new this.webReference.PerformRequestMsg();
                request.options = new this.webReference.PerformOptions();
                request.action = '';
                request.definitions = new this.webReference.PerformRequestMsg.Definitions();

                return request;
            },
            execute: function(svc, requestObject) {
                return svc.serviceClient.perform(requestObject);
            },
            parseResponse : function(svc, responseObject){
                return responseObject;
            },
            mockCall: function (/*svc, requestBody*/) {
                var obj = {
                };
                return {
                    statusCode: 202,
                    statusMessage: 'Accepted',
                    text: JSON.stringify(obj)
                };
            }
        });
    }
};

/*
To possibly be implemented:
configure
extract
getSystemStatus
query
schedule
versionInfo

        case 'extract':
            request = new this.webReference.ExtractRequestMsg();
            request.requests = new Array();
            // ExtractRequest
            break;
        case 'query':
            request = new this.webReference.QueryRequestMsg();
            request.queryRequest = new this.webReference.QueryRequest();
            break;
        case 'schedule':
            request = new this.webReference.ScheduleRequestMsg();
            request.options = new this.webReference.ScheduleOptions();
            request.action = '';
            request.schedule = new this.webReference.ScheduleDefinition();
            request.interactions = new this.webReference.ScheduleRequestMsg.Interactions();
            break;
        case 'configure':
            request = new this.webReference.ConfigureRequestMsg();
            request.options = new this.webReference.ConfigureOptions();
            request.actions = '';
            request.configurations = new this.webReference.ConfigureRequestMsg.Configurations();
            break;
        case 'status':
        case 'systemStatus':
            request = new this.webReference.SystemStatusRequestMsg();
            request.options = new this.webReference.SystemStatusOptions();
            break;
        case 'version':
        case 'versionInfo':
            request = new this.webReference.VersionInfoRequestMsg();
            request.includeVersionHistory = true;
            break;

 */

module.exports = new SoapService();
