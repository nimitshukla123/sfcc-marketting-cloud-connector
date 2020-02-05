'use strict';

/**
 * Model for email functionality. Creates an EmailModel class with methods to prepare and get email.
 *
 * @module models/EmailModel
 */

var AbstractModel = require('*/cartridge/scripts/models/AbstractModel');
var HookMgr = require('dw/system/HookMgr');
var Logger = require('dw/system/Logger');
var Site = require('dw/system/Site');
var Status = require('dw/system/Status');
var Template = require('dw/util/Template');

/**
 * Email helper providing enhanced email functionality
 * @class module:models/EmailModel~EmailModel
 *
 * @extends module:models/AbstractModel
 * @extends dw.net.Mail
 * @example
 * require/models/EmailModel').get('mail/resetpasswordemail', Customer.profile.email)
 *     .setSubject(dw.web.Resource.msg('email.passwordassistance', 'email', null)).send({
 *          Customer : Customer,
 *          ResetPasswordToken : ResetPasswordToken
 *     });
 *
 * @param {String} template The template that is rendered and then sent as email.
 * @param {String} recipient The email address where the text of the rendered template is sent.
 */
var EmailModel = AbstractModel.extend({
    template: null,
    subject: '',
    from: '',
    to: null,
    
    init: function (template, recipient) {
        // Ensure class variables are re-instantiated, otherwise values can carry across "new" instances
        this.template = template;
        this.subject = '';
        this.from = '';
        this.to = [];

        // prepare the email object
        this.addTo(recipient);
        this.setFrom(Site.getCurrent().getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com');
    },

    addTo: function(to) {
        this.to.push(to);
        return this;
    },

    setFrom: function(from) {
        this.from = from;
        return this;
    },

    setSubject: function(subject) {
        this.subject = subject;
        return this;
    },

    /**
     * Prepares the email that is queued to the internal mail system for delivery.
     *
     * @alias module:models/EmailModel~EmailModel/send
     * @param {Object} args object added to the HashMap used when rendering the email template.
     * @returns {dw.system.Status} Status tells whether the mail was successfully queued ( Status.OK) or not ( Status.ERROR).
     * If an error is thrown, more information about the reason for the failure can be found within the log files.
     * If the mandatory fields from, content, and subject are empty an IllegalArgumentException is thrown. An
     * llegalArgumentException is thrown if neither to, cc, nor bcc are set.
     */
    send: function (args) {
        // Add some default keys
        var params = require('*/cartridge/scripts/object').toHashMap(args);
        params.CurrentForms = session.forms;
        params.CurrentHttpParameterMap = request.httpParameterMap;
        params.CurrentCustomer = customer;

        // Creates a body template. Renders the template using the params HashMap.
        var contentTemplate = new Template(this.template);
        params.put('MainContent', contentTemplate.render(params).text);

        // @TODO Enable this to allow for a shared pt_email which creates consistent header/footer
        // integrate the body in the global content
        //var template = new dw.util.Template('mail/pt_email');
        //var content = template.render(params);

        // Sets the content and sends it.
        var result;
        var hookID = 'app.mail.sendMail';
        if (HookMgr.hasHook(hookID)) {
            // expects a Status object returned from the hook call
            result = HookMgr.callHook(
                hookID,
                'sendMail',
                {
                    template: this.template,
                    fromEmail: this.from,
                    toEmail: this.to,
                    subject: this.subject,
                    messageBody: params.MainContent,
                    params: params
                }
            );
        } else {
            Logger.error('No hook registered for {0}', hookID);
            result = new Status(Status.ERROR);
        }
        return result;
    },

    __noSuchMethod__: function (methodName, methodArgs) {
        var result = this._super(methodName, methodArgs);
        return result === this.object ? this : result;
    }
});

/**
 * Gets a wrapped email instance.
 *
 * @alias module:models/EmailModel~EmailModel/get
 * @param {String} template The template that is rendered and sent as email.
 * @param {String} recipient The email address where the text of the rendered template is sent.
 * @returns {module:models/EmailModel~EmailModel}
 */
EmailModel.get = function (template, recipient) {
    return new EmailModel(template, recipient);
};

/**
 * Send an email
 * @example
 * ```
 * require('~/cartridge/scripts/models/EmailModel').sendMail({
 *     recipient: 'customer@email.com',
 *     template: 'mail/templatename',
 *     subject: 'Your order was placed successfully',
 *     from: 'no-reply@salesforce.com',
 *     context: {
 *         Order: order
 *     }
 * });
 * ````
 * @param {Object} options
 * @param {String} options.recipient
 * @param {String} options.template
 * @param {String} options.subject
 * @param {String} options.from
 * @param {Object} options.context
 * @return {dw.system.Status} whether the mail was successfully queued (Status.OK) or not (Status.ERROR).
 */
EmailModel.sendMail = function (options) {
    if (!options.template || !options.recipient || !options.subject) {
        return;
    }
    var mail = new EmailModel(options.template, options.recipient);
    mail.setSubject(options.subject);
    if (options.from) mail.setFrom(options.from);
    return mail.send(options.context);
};

/** The Email Model class */
module.exports = EmailModel;

