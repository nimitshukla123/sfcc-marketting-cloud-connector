'use strict';

function subscribe(contactFirstName, contactLastName, contactEmail, contactTopic, contactComment) {
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
    var Site = require('dw/system/Site');
    var Resource = require('dw/web/Resource');

    var topic = '';
    switch (contactTopic) {
        case 'GI':
            topic = Resource.msg('label.input.contact-topic-general-information', 'contactUs', null);
            break;
        case 'OS':
            topic = Resource.msg('label.input.contact-topic-order-status', 'contactUs', null);
            break;
        case 'MA':
            topic = Resource.msg('label.input.contact-topic-my-account', 'contactUs', null);
            break;
        case 'O':
            topic = Resource.msg('label.input.contact-topic-other', 'contactUs', null);
            break;
    }

    var context = {
        topic: topic,
        firstname: contactFirstName,
        lastname: contactLastName,
        email: contactEmail,
        comment: contactComment
    };

    var emailObj = {
        to: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',
        subject: contactTopic,
        from: contactEmail,
        type: emailHelpers.emailTypes.contactUs
    };

    emailHelpers.sendEmail(emailObj, null, context);
}

module.exports = {
    subscribe: subscribe
};
