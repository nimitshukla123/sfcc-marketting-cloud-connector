'use strict';
var base = module.superModule;

module.exports = {
    emailTypes: {
        registration: 1,
        passwordReset: 2,
        passwordChanged: 3,
        orderConfirmation: 4,
        accountLocked: 5,
        accountEdited: 6,
        accountNameChanged: 7,
        accountAddressChanged: 8,
        accountPaymentChanged: 9,
        accountEmailChanged: 10,
        contactUs: 11
    }
};
Object.keys(base).forEach(function (prop) {
    // eslint-disable-next-line no-prototype-builtins
    if (!module.exports.hasOwnProperty(prop)) {
        module.exports[prop] = base[prop];
    }
});
