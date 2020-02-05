'use strict';

/**
 * @module models/subscriber
 */

const webRef = require('int_marketing_cloud').soapReference();

/**
 * Subscriber class
 * @param customerOrData {dw.customer.Customer|Object} Customer instance or custom data
 * @constructor
 * @alias module:models/subscriber~Subscriber
 */
function Subscriber(customerOrData) {
    if (customerOrData instanceof dw.customer.Customer) {
    	this.customer = customerOrData;
        this.email = customerOrData.profile && customerOrData.profile.email;
    } else {
        this.customer = null;
        this.email = customerOrData.email;
        this.setOptionalAttributes(customerOrData.optionalAttributes);
    }

    if (!this.email) {
        throw new Error('A valid customer email is required to create a Subscriber instance.');
    }

    this.instance = new webRef.Subscriber();
    this.instance.emailAddress = this.email;
    this.instance.subscriberKey = this.email;
    let count = 0;
    for(var x in this.getOptionalAttributes()){
    	this.instance.attributes[count] = new webRef.Attribute();
    	this.instance.attributes[count].name = x;
    	this.instance.attributes[count].value = this._optionalAttributes[x];
    	count++;
    }
    this._fetchSubscriber();
    this.currentSubscriptions = new dw.util.HashMap();
    this._fetchLists();

    trace(JSON.stringify(this._currentSubscriber));
}

/**
 * @alias module:models/subscriber~Subscriber#prototype
 */
Subscriber.prototype = {
	_optionalAttributes : new dw.util.HashMap(),
	_addOptionalAttribute : function(key, value){
		this._optionalAttributes.put(key, value);
	},
	setOptionalAttributes : function(objmap){
		this._optionalAttributes = objmap;
	},
	getOptionalAttributes : function(){
		return this._optionalAttributes;
	},
    _fetchSubscriber : function() {
        var filter = webRef.SimpleFilterPart();
        filter.property = 'SubscriberKey';
        filter.simpleOperator = webRef.SimpleOperators.EQUALS;
        filter.value.add(this.email);

        var req = webRef.RetrieveRequest();
        req.objectType = 'Subscriber';
        req.properties.add(['ID', 'CreatedDate', 'Client.ID', 'SubscriberKey', 'UnsubscribedDate', 'Status', 'EmailTypePreference']);
        req.filter = filter;

        var retSvc = require('int_marketing_cloud').soapService('retrieve');
        var response = retSvc.call(req);
        this._currentSubscriber = null;
        if (response.ok) {
            for each (var subscriber in response.object.results) {
                //NOTE - if subscriber is on multiple lists, all data (e.g. status) here pertains to the first list result
            	this._currentSubscriber = {
                    id: subscriber.ID,
                    status: subscriber.status.value(),
                    subscriberKey: subscriber.subscriberKey,
                    unsubscribedDate: subscriber.unsubscribedDate,
                    emailTypePreference: subscriber.emailTypePreference.value(),
                    lists: subscriber.lists.toArray(), //this will never return properly as it's not retrieved from Subscriber object
                    attributes: subscriber.attributes.toArray().map(function(attr){
                        return {
                            name: attr.name,
                            value: attr.value,
                            compression: attr.compression
                        };
                    })
                };
                break;
            }
        }
    },

    _fetchLists : function() {
        this.currentSubscriptions = new dw.util.HashMap();

        if (this._currentSubscriber) {
            var filter = webRef.SimpleFilterPart();
            filter.property = 'SubscriberKey';
            filter.simpleOperator = webRef.SimpleOperators.EQUALS;
            filter.value.add(this.email);

            var req = webRef.RetrieveRequest();
            req.objectType = 'ListSubscriber';
            req.properties.add(['ListID', 'SubscriberKey', 'Status']);
            req.filter = filter;

            var retSvc = require('int_marketing_cloud').soapService('retrieve');
            var response = retSvc.call(req);
            if (response.ok) {
                for each (var list in response.object.results) {
                    this.currentSubscriptions.put(list.listID, list.status.toString()); //place status alongside list into hashmap for more detailed results
                }
            }
        }
    },

    /**
     * @param listIDs {number|Array} One or more list IDs to update for subscriber. Array or number
     * @param action {string} Whether the subscriber on the list should be created, deleted, updated in action
     * @param status {string} Determining subscriber's status on the list as ACTIVE or UNSUBSCRIBED
     * @returns {module:models/subscriber~Subscriber}
     */
    _updateLists : function(listIDs, action, status) {
        if (typeof(listIDs) === 'number') {
            listIDs = [listIDs];
        }

        var subList, list;
        var instance = this.instance;
        listIDs.forEach(function(listID){
            subList = new webRef.SubscriberList();
            subList.ID = listID;
            subList.action = action;
            subList.status = webRef.SubscriberStatus[status];
            instance.lists.add(subList);
        });

        return this;
    },

    isExistingSubscriber : function() {
        return !!this._currentSubscriber; //checking for Active status here gives false results
    },

    fetchAvailableLists : function() {
        var lists = new Array();
        var req = webRef.RetrieveRequest();
        req.objectType = 'List';
        req.properties.add(['ID', 'ListName', 'Description']);

        var retSvc = require('int_marketing_cloud').soapService('retrieve');
        var response = retSvc.call(req);
        if (response.ok) {
            var i=0;
            for each (var list in response.object.results) {
                if (i>0) { // skip first list, which is the "all subscribers" list
                    lists.push({
                        ID: list.ID,
                        name: list.listName,
                        description: list.description
                    });
                }
                i++;
            }
        }

        return lists;
    },

    /**
     * @param listIDs {number|Array} One or more list IDs to assign to subscriber. Array or number
     * @returns {module:models/subscriber~Subscriber}
     */
    assignLists : function(listIDs) {
        return this._updateLists(listIDs, 'create', 'ACTIVE');
    },

    /**
     *
     * @param listIDs {number|Array} One or more list IDs to remove from subscriber. Array or number
     * @returns {module:models/subscriber~Subscriber}
     */
    unassignLists : function(listIDs) {
        return this._updateLists(listIDs, 'delete', 'UNSUBSCRIBED');
    },

    /**
     *
     * @param listIDs {number|Array} One or more list IDs to resubscribe an unsubscribed subscriber. Array or number
     * @returns {module:models/subscriber~Subscriber}
     */
    resubscribeLists : function(listIDs) {
       return this._updateLists(listIDs, 'update', 'ACTIVE');
    },

    /**
     *
     * @param listIDs {number|Array} One or more list IDs to unsubscribe an active subscriber. Array or number
     * @returns {module:models/subscriber~Subscriber}
     */
    unsubscribeLists : function(listIDs) {
       return this._updateLists(listIDs, 'update', 'UNSUBSCRIBED');
    },

    commit : function() {
        var options = new webRef.CreateOptions();
        if (this.isExistingSubscriber()) {
            var saveOption = new webRef.SaveOption();
            saveOption.propertyName = '*';
            saveOption.saveAction = webRef.SaveAction.UPDATE_ADD;
            options.saveOptions = new webRef.Options.SaveOptions();
            options.saveOptions.saveOption.add(saveOption);
        }

        var createSvc = require('int_marketing_cloud').soapService('create');
        var response = createSvc.call(this.instance, options);
        if (!(response && response.ok && response.object && response.object.overallStatus!=='Error')) {
            require('dw/system/Logger').error('Error subscribing user "{0}" with result: {1}', this.email, response && response.object && response.object.overallStatus);
        }
        return response.ok;
    }
};

module.exports = Subscriber;
