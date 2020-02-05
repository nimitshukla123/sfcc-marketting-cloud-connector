'use strict';

/**
 * @module controllers/MCSubscription
 */

// TODO: Content asset account-nav-unregistered and account-nav-registered should be updated to add endpoints to nav

const curSite = require('dw/system/Site').current;
const ArrayList = require('dw/util/ArrayList');
const HookMgr = require('dw/system/HookMgr');
const ISML = require('dw/template/ISML');
const Logger = require('dw/system/Logger');

function manage() {
    var subscriber = require('int_marketing_cloud').subscriber(customer);
    var subscribedLists = subscriber.currentSubscriptions;
    var whitelist = (new ArrayList(curSite.getCustomPreferenceValue('mcMailingListsWhitelist'))).toArray();
    var availableLists = subscriber.fetchAvailableLists().filter(function(list){
        return whitelist.length <= 0 || whitelist.indexOf(list.ID) !== -1;
    });

    var form = session.forms.mcpreferences;
    form.clearFormElement();
    form.lists.copyFrom(new (require('dw/util/ArrayList'))(availableLists));

    render('marketingcloud/preferences', {
        ContinueURL: require('dw/web/URLUtils').https('MCSubscription-SavePreferences'),
        subscribedLists: subscribedLists,
        availableLists: availableLists
    });
}

function savePreferences() {
    var form = session.forms.mcpreferences;

    var formResult = formHandleAction(form, {
        save: function (formgroup) {
            var subscriber = require('int_marketing_cloud').subscriber(customer);
            for each (var list in formgroup.lists) {
            	if (list.enabled.checked) {
            		//if already on list, update to Active status instead creating new record
                	if (subscriber.currentSubscriptions.containsKey(list.listID.value)) {
                		subscriber.resubscribeLists(list.listID.value);
                	} else {
                    	subscriber.assignLists(list.listID.value);
                	}
                } //can only unassign from lists they are on or it will fail 
            	else if (subscriber.currentSubscriptions.containsKey(list.listID.value)) {
                	//if unsubscribe flag is true, update to Unsubscribed status instead of full record deletion
                	if (curSite.getCustomPreferenceValue('mcUnsubscribeAllowed')) {
                		subscriber.unsubscribeLists(list.listID.value);
                	} else {
                		subscriber.unassignLists(list.listID.value);
                	}
                }
            }
            return subscriber.commit();
        },
        error: function (formgroup) {
            return null;
        }
    });

    response.redirect(require('dw/web/URLUtils').https('MCSubscription-Manage'));
}

function showSubscribe() {
    var form = session.forms.mcsubscribe;
    if (form.isValid()) {
        // we're not clearing if invalid, so errors can be reflected to the user.
        form.clearFormElement();
    }

    render('marketingcloud/subscribe', {
        ContinueURL: require('dw/web/URLUtils').https('MCSubscription-Submit'),
        formAction: 'subscribe'
    });
}

function showSubscribeFooter() {
    var form = session.forms.mcsubscribe;
    if (form.isValid()) {
        // we're not clearing if invalid, so errors can be reflected to the user.
        form.clearFormElement();
    }

    render('marketingcloud/subscribe', {
        nodecorator: true,
        ContinueURL: require('dw/web/URLUtils').https('MCSubscription-Submit'),
        formAction: 'subscribeFooter'
    });
}

function showUnsubscribe() {
    var form = session.forms.mcsubscribe;
    if (form.isValid()) {
        // we're not clearing if invalid, so errors can be reflected to the user.
        form.clearFormElement();
    }

    render('marketingcloud/subscribe', {
        ContinueURL: require('dw/web/URLUtils').https('MCSubscription-Submit'),
        formAction: 'unsubscribe'
    });
}

/**
 * The form handler for the sub/unsub forms.
 */
function submit() {
    var form = session.forms.mcsubscribe;
    var subscribed = false;
    var noDecorator = false;
    var submittedAction;

    var hookID;
    var formResult = formHandleAction(form, {
        subscribe: function (formgroup) {
            subscribed = true;
            let optionalAttributes = getOptionalAttributesFromForm(formgroup);
            hookID = 'app.mailingList.subscribe';
            if (HookMgr.hasHook(hookID)) {
                return HookMgr.callHook(
                    hookID,
                    hookID.slice(hookID.lastIndexOf('.') + 1),
                    {
                        email: formgroup.email.value,
                        optionalAttributes : optionalAttributes
                    }
                );
            }
        },
        subscribeFooter: function (formgroup) {
            subscribed = true;
            //noDecorator = true;
			let optionalAttributes = getOptionalAttributesFromForm(formgroup);
            hookID = 'app.mailingList.subscribe';
            if (HookMgr.hasHook(hookID)) {
                return HookMgr.callHook(
                    hookID,
                    hookID.slice(hookID.lastIndexOf('.') + 1),
                    {
                        email: formgroup.email.value,
						optionalAttributes : optionalAttributes
                    }
                );
            }
        },
        unsubscribe: function (formgroup) {
            hookID = 'app.mailingList.unsubscribe';
            if (HookMgr.hasHook(hookID)) {
                return HookMgr.callHook(
                    hookID,
                    hookID.slice(hookID.lastIndexOf('.') + 1),
                    {
                        email: formgroup.email.value
                    }
                );
            }
        },
        error: function (formgroup) {
            submittedAction = formgroup.submittedAction.htmlName;
            return null;
        }
    });

    if (formResult === true) {
        render('marketingcloud/subscribe', {
            nodecorator: noDecorator,
            formSubmitted: true,
            subscribed: subscribed
        });
        return;
    }

    switch(submittedAction.split('_').pop()) {
        case 'subscribe':
            showSubscribe();
            break;
        case 'subscribeFooter':
            showSubscribeFooter();
            break;
        case 'unsubscribe':
            showUnsubscribe();
            break;
    }
}

function getOptionalAttributesFromForm(formgroup){
	let optionalattributes = new dw.util.HashMap();
	
	for(var x in formgroup){
		if(formgroup[x] instanceof dw.web.FormField && !empty(formgroup[x]))
			optionalattributes.put(x, formgroup[x].value);
	}
	
	return optionalattributes;
}

/**
 * This method contains the login to handle a not logged in customer
 *
 * @param {Object} params Parameters passed along by by ensure
 */
function requireLogin(params) {
    if (customer.authenticated) {
        return true;
    }
    var redirectUrl = dw.web.URLUtils.https('Login-Show','original', lastUrl());

    if (params && params.scope) {
        redirectUrl.append('scope', params.scope);
    }

    response.redirect(redirectUrl);
    return false;
}

function lastUrl() {
    var location = dw.web.URLUtils.url('Home-Show');
    var click = session.clickStream.last;
    if (click) {
        location = dw.web.URLUtils.url(click.pipelineName);
        if (!empty(click.queryString) && click.queryString.indexOf('=') !== -1) {
            var params = click.queryString.split('&');
            params.forEach(function (param) {
                location.append.apply(location,param.split('='));
            });
        }
    }
    return location;
};

/**
 * Performs a protocol switch for the URL of the current request to HTTPS. Responds with a redirect to the client.
 *
 * @return false, if switching is not possible (for example, because its a POST request)
 */
function switchToHttps() {
    if (request.httpMethod !== 'GET') {
        // switching is not possible, send error 403 (forbidden)
        response.sendError(403);
        return false;
    }

    var url = 'https://' + request.httpHost + request.httpPath;

    if (!empty(request.httpQueryString)) {
        url += '?' + request.httpQueryString;
    }

    response.redirect(url);
    return true;
}

var Filters = {
    /** Action must be accessed via HTTPS */
    https: function () {return request.isHttpSecure();},
    /** Action must be accessed via HTTP */
    http: function () {return !this.https();},
    /** Action must be accessed via a GET request */
    get: function () {return request.httpMethod === 'GET';},
    /** Action must be accessed via a POST request */
    post: function () {return request.httpMethod === 'POST';},
    /** Action must only be accessed authenticated customers */
    loggedIn: function () {return customer.authenticated;},
    /** Action must only be used as remote include */
    include: function () {return request.isIncludeRequest();}
};

/**
 * Security to ensure this controller is only executed via remote includes
 * @param {string[]} filters
 * @param {function} action
 * @param {Object} params
 * @returns {function} Wrapper that implements the security check
 */
function ensure (filters, action, params) {
    return expose(function (args) {
        var error;
        var filtersPassed = true;
        var errors = [];
        params = extend(params,args);

        for (var i = 0; i < filters.length; i++) {

            filtersPassed = Filters[filters[i]].apply(Filters);
            if (!filtersPassed) {
                errors.push(filters[i]);
                if (filters[i] === 'https') {
                    error = switchToHttps;
                } else if (filters[i] === 'loggedIn') {
                    error = requireLogin;
                }
                break;
            }
        }

        if (!error) {
            error = function () {
                throw new Error('Filter(s) ' + errors.join('|') + ' did not match the incoming request.');
            };
        }

        if (filtersPassed) {
            return action(params);
        } else {
            return error(params);
        }
    });
}

function expose(action) {
    action.public = true;
    return action;
}

function extend(target, source) {
    var _source;

    if (!target) {
        return source;
    }

    for (var i = 1; i < arguments.length; i++) {
        _source = arguments[i];
        for (var prop in _source) {
            // recurse for non-API objects
            if (_source[prop] && 'object' === typeof _source[prop] && !_source[prop].class) {
                target[prop] = extend(target[prop], _source[prop]);
            } else {
                target[prop] = _source[prop];
            }
        }
    }

    return target;
}

function formHandleAction(form, formHandler) {
    // Checks whether an action is defined and if the form is invalid.
    var action = request.triggeredFormAction;
    if (!action || !action.formId) {
        // Checks whether there is an explicit error handler defined.
        if ('error' in formHandler) {
            return formHandler.error.apply(formHandler, [form, action]);
        }
        // Logs a warning and returns null if no explicit error handler is defined.
        else {
            Logger.warn('Action handler called without action ' + form.formId);
            return null;
        }
    } else {
        if (formHandler[action.formId]) {
            return formHandler[action.formId].apply(formHandler, [form, action]);
        } else {
            Logger.error('Action handler for action "{0}"" not defined.', action.formId);
            // Throws an error as this is an implementation bug.
            throw new Error('Form handler undefined');
        }
    }
}

function render(tpl, tplArgs) {
    try {
        var sfraInstalled = require('int_marketing_cloud').sfraInstalled();
        if (!empty(tplArgs.nodecorator) && tplArgs.nodecorator === true) {
            tplArgs.DecoratorTemplate = 'marketingcloud/empty';
        } else {
            tplArgs.DecoratorTemplate = sfraInstalled === true ? 'common/layout/page' : 'account/pt_account';
        }
        ISML.renderTemplate(tpl, tplArgs);
    } catch (e) {
        Logger.error('Error while rendering template ' + tpl);
        throw e;
    }
}

/* Web exposed methods */

/** Renders the case overview.
 * @see {@link module:controllers/MCSubscription~manage} */
exports.Manage = ensure(['https', 'loggedIn'], manage);
/** @see {@link module:controllers/MCSubscription~savePreferences} */
exports.SavePreferences = ensure(['post', 'https', 'loggedIn'], savePreferences);
/** @see {@link module:controllers/MCSubscription~showSubscribe} */
exports.Subscribe = ensure(['https'], showSubscribe);
/** @see {@link module:controllers/MCSubscription~showSubscribeFooter} */
exports.SubscribeFooter = ensure(['https'], showSubscribeFooter);
/** @see {@link module:controllers/MCSubscription~showUnsubscribe} */
exports.Unsubscribe = ensure(['https'], showUnsubscribe);
/** @see {@link module:controllers/MCSubscription~submit} */
exports.Submit = ensure(['post', 'https'], submit);
