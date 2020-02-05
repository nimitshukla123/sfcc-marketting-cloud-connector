'use strict';

/**
 * @type {dw.system.Site}
 */
const Site = require('dw/system/Site');
const ArrayList = require('dw/util/ArrayList');

var mailingListsEnabled = false;

(function mcMailingListsInit(){
    mailingListsEnabled = !!(Site.current.getCustomPreferenceValue('mcEnableMailingLists'));
})();

function subscribe(subscriberData) {
    var defaultLists = (new ArrayList(Site.current.getCustomPreferenceValue('mcDefaultMailingLists'))).toArray();
    var subscriber = require('int_marketing_cloud').subscriber(subscriberData);
    var lists = empty(subscriberData.lists) ? defaultLists : subscriberData.lists;
    if (lists instanceof ArrayList) {
        lists = lists.toArray();
    }
    
    //make new lists based on current subscriptions compared to lists array
    var resubLists = lists.filter(function(list){
    	return subscriber.currentSubscriptions.containsKey(list);
    });
    var createLists = lists.filter(function(list){
    	return !subscriber.currentSubscriptions.containsKey(list);
    });    

    //"create" subscriber to new lists
    if (!empty(createLists)) {
    	subscriber.assignLists(createLists);
    }
   
    //"update" subscriber status to Active on current lists
    if (!empty(resubLists)) {
    	subscriber.resubscribeLists(resubLists);
    }
     
    return subscriber.commit();
}

function unsubscribe(subscriberData) {
    var defaultLists = (new ArrayList(Site.current.getCustomPreferenceValue('mcDefaultMailingLists'))).toArray();
    var subscriber = require('int_marketing_cloud').subscriber(subscriberData);
    var lists = empty(subscriberData.lists) ? defaultLists : subscriberData.lists;
    if (lists instanceof ArrayList) {
        lists = lists.toArray();
    }
    
    //filter lists to only contain lists they are on
    lists = lists.filter(function(list){
    	return subscriber.currentSubscriptions.containsKey(list);
    });
    
    //if lists is now empty, stop process
    if (empty(lists))
    	return;
    
    //"update" subscriber status to Unsubscribed on current lists 
    if (Site.current.getCustomPreferenceValue('mcUnsubscribeAllowed')) {    	
    	subscriber.unsubscribeLists(lists);
    }//"delete" subscriber record from lists -- legacy
    else {
    	subscriber.unassignLists(lists);
    }
    
    return subscriber.commit();
}

// Ensure hooks only fire if enabled
if (mailingListsEnabled) {
    exports.subscribe = subscribe;
    exports.unsubscribe = unsubscribe;
} else {
    exports.subscribe = function(){};
    exports.unsubscribe = function(){};
}
