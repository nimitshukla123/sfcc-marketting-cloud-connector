<a name="Top"></a>
# marketing-cloud-connector  

### Navigation
1. [Project Overview](1_0_Project_Overview.md#navlink)
2. [Install B2C Commerce Components](2_0_Commerce_Cloud_Component_Installation.md#navlink)
	
	2.1 [Handler Framework Installation](2_1_Handler-Installation.md#navlink)
	
	2.2 [Marketing Cloud Cartridge Installation](2_2_MarketingCloudCart.md#navlink)
	
	2.3 [SFRA Modification Instructions](2_3_Modification-Instructions-for-SFRA.md#navlink)
	
	2.4 [SiteGenesis Modification Instructions](2_4_Modification-Instructions-for-SiteGenesis.md#navlink)
	
	2.5 [Manual Modification Instructions](2_5_ManualModifications.md#navlink)

7. [Install Marketing Cloud Components](3_0_ModifyMarketingCloud.md#navlink)

	3.1 [Triggered Send and Transactional Emails](3_1_0_TriggeredSendTransactionalEmails.md#navlink)
	
	3.1.1 [**Triggered Send Configuration**](3_1_1_MCConnectorInstallation-TriggeredSendConfiguration.md#navlink)
	
	3.2 [Realtime Analytics Configuration](3_2_MCConnectorInstallation-RealtimeAnalyticsConfiguration.md#navlink)
	
11. [Additional Features](4_0_AdditionalFeatures.md#navlink)
12. [Debugging](5_0_Debugging.md#navlink)

<a name="navlink"></a>
## 3.1.1 Triggered Send Configuration

Work with your Marketing Cloud representative to address any questions or concerns that arise.
These recommendations are intended to help you configure your account.

- Data extension data retention is entirely up to you.  
- At minimum, mata extensions as sendable.  
- Create all data extension fields as nullable.  

For email creation, it's recommended to use Content Builder, which you might need to opt-in to before you can see it.

If you created your email as a Content Builder email, select the email on the Content Builder tab.  

For triggers that heavily overlap in the fields that are defined or used, you can create a single data extension to be shared across multiple triggers. This approach is recommended for account triggers, such as Created, Updated, Locked, or Password Changed. We recommend storing the Reset Password trigger in its own data extension.

<a name="Created"></a>
## Account - Created

### Data Extension

Minimum fields recommended:

* FirstName — Text, 50
* LastName — Text, 50
* AccountHomeLink — Text, 250
* SiteID — Text, 50

### Email Template

Email name — Account Created  
Subject — Your New Account  
Paste into a content block as HTML  

```
%%[
var @fn, @ln, @acctlink

SET @fn = AttributeValue("FirstName")
SET @ln = AttributeValue("LastName")
SET @acctlink = AttributeValue("AccountHomeLink")
]%%

<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" style="background:#e0e0e0;padding:50px 0;">
            <center>
                <table style="background:#ffffff;border:1px solid #999999;width:680px;">
                    <tr>
                        <td style="font-size:12px;font-family:arial;padding:20px 10px;vertical-align:top;">

                            <p style="font-family:georgia;font-size:20px;">
                                Dear&nbsp;%%=v(@fn)=%% %%=v(@ln)=%%,
                            </p>

                            <p>You have successfully created a new account.</p>

                            <p>You can visit your account at <a href="%%=v(@acctlink)=%%">%%=v(@acctlink)=%%</a>.</p>

                            <p>This is an automatically generated email, please do not reply.</p>

                        </td>
                    </tr>
                </table>
            </center>
        </td>
    </tr>
</table>
```

### Triggered Send Definition

Name — Account Created  
External Key — account.created  
Send Classification — Default Transactional  
Email — Account Created  
List — Any list of your choice  
Data Extension — Account or Account Created  
Disable API Calls (on error) — Enabled  

### Custom Object Field Mapping (Business Manager)

Hook ID — app.communication.account.created  
Trigger External Key — account.created  
Description — Account Created trigger  
Subscriber Attributes:  

```
{
    "StoreHomeLink": "StoreHomeLink",
    "SiteID": "SiteID",
    "AccountHomeLink": "AccountHomeLink",
    "Customer.anonymous": "Anonymous",
    "Customer.ID": "CustomerID",
    "Customer.note": "Note",
    "Customer.registered": "Registered",
    "Profile.birthday": "Birthday",
    "Profile.companyName": "CompanyName",
    "Profile.customerNo": "CustomerNumber",
    "Profile.email": "EmailAddress",
    "Profile.fax": "Fax",
    "Profile.female": "Female",
    "Profile.firstName": "FirstName",
    "Profile.gender.displayValue": "GenderDisplay",
    "Profile.gender.value": "GenderValue",
    "Profile.jobTitle": "JobTitle",
    "Profile.lastLoginTime": "LastLogin",
    "Profile.lastName": "LastName",
    "Profile.lastVisitTime": "LastVisit",
    "Profile.male": "Male",
    "Profile.nextBirthday": "NextBirthday",
    "Profile.phoneBusiness": "PhoneBusiness",
    "Profile.phoneHome": "PhoneHome",
    "Profile.phoneMobile": "PhoneMobile",
    "Profile.preferredLocale": "PreferredLocale",
    "Profile.previousLoginTime": "PreviousLogin",
    "Profile.previousVisitTime": "PreviousVisit",
    "Profile.salutation": "Salutation",
    "Profile.secondName": "SecondName",
    "Profile.suffix": "Suffix",
    "Profile.taxIDMasked": "TaxIDMasked",
    "Profile.taxIDType.displayValue": "TaxIDTypeDisplay",
    "Profile.taxIDType.value": "TaxIDTypeValue",
    "Profile.title": "Title"
}
```
<a name="Updated"></a>
## Account - Updated

### Data Extension

Minimum fields recommended:

* FirstName — Text, 50
* LastName — Text, 50
* AccountHomeLink — Text, 250
* SiteID — Text, 50

### Email Template

Email name — Account Updated  
Subject — Your Account  
Paste into a content block as HTML  

```
%%[
var @fn, @ln, @acctlink

SET @fn = AttributeValue("FirstName")
SET @ln = AttributeValue("LastName")
SET @acctlink = AttributeValue("AccountHomeLink")
]%%

<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" style="background:#e0e0e0;padding:50px 0;">
            <center>
                <table style="background:#ffffff;border:1px solid #999999;width:680px;">
                    <tr>
                        <td style="font-size:12px;font-family:arial;padding:20px 10px;vertical-align:top;">

                            <p style="font-family:georgia;font-size:20px;">
                                Dear&nbsp;%%=v(@fn)=%% %%=v(@ln)=%%,
                            </p>

                            <p>You have successfully updated your account.</p>

                            <p>You can visit your account at <a href="%%=v(@acctlink)=%%">%%=v(@acctlink)=%%</a>.</p>

                            <p>This is an automatically generated email, please do not reply.</p>

                        </td>
                    </tr>
                </table>
            </center>
        </td>
    </tr>
</table>
```

### Triggered Send Definition

Name — Account Updated  
External Key — account.updated  
Send Classification — Default Transactional  
Email — Account Updated  
List — Any list of your choice  
Data Extension — Account or Account Updated  
Disable API Calls (on error) — Enabled  

### Custom Object Field Mapping (Business Manager)

Hook ID — app.communication.account.updated  
Trigger External Key — account.updated  
Description — Account Updated trigger  
Subscriber Attributes:  

```
{
    "StoreHomeLink": "StoreHomeLink",
    "SiteID": "SiteID",
    "AccountHomeLink": "AccountHomeLink",
    "Customer.anonymous": "Anonymous",
    "Customer.ID": "CustomerID",
    "Customer.note": "Note",
    "Customer.registered": "Registered",
    "Profile.birthday": "Birthday",
    "Profile.companyName": "CompanyName",
    "Profile.customerNo": "CustomerNumber",
    "Profile.email": "EmailAddress",
    "Profile.fax": "Fax",
    "Profile.female": "Female",
    "Profile.firstName": "FirstName",
    "Profile.gender.displayValue": "GenderDisplay",
    "Profile.gender.value": "GenderValue",
    "Profile.jobTitle": "JobTitle",
    "Profile.lastLoginTime": "LastLogin",
    "Profile.lastName": "LastName",
    "Profile.lastVisitTime": "LastVisit",
    "Profile.male": "Male",
    "Profile.nextBirthday": "NextBirthday",
    "Profile.phoneBusiness": "PhoneBusiness",
    "Profile.phoneHome": "PhoneHome",
    "Profile.phoneMobile": "PhoneMobile",
    "Profile.preferredLocale": "PreferredLocale",
    "Profile.previousLoginTime": "PreviousLogin",
    "Profile.previousVisitTime": "PreviousVisit",
    "Profile.salutation": "Salutation",
    "Profile.secondName": "SecondName",
    "Profile.suffix": "Suffix",
    "Profile.taxIDMasked": "TaxIDMasked",
    "Profile.taxIDType.displayValue": "TaxIDTypeDisplay",
    "Profile.taxIDType.value": "TaxIDTypeValue",
    "Profile.title": "Title",
    "Customer.authenticated": "Authenticated"
}
```
<a name="Locked"></a>
## Account - Locked

### Data Extension

Minimum fields recommended

* FirstName — Text, 50
* LastName — Text, 50
* SiteID — Text, 50

### Email Template

Email name — Account Locked  
Subject — Your Account  
Paste into a content block as HTML  

```
%%[
var @fn, @ln

SET @fn = AttributeValue("FirstName")
SET @ln = AttributeValue("LastName")
]%%

<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" style="background:#e0e0e0;padding:50px 0;">
            <center>
                <table style="background:#ffffff;border:1px solid #999999;width:680px;">
                    <tr>
                        <td style="font-size:12px;font-family:arial;padding:20px 10px;vertical-align:top;">

                            <h1 style="font-size:20px;font-family:georgia;font-weight:normal;">
                                Dear %%=v(@fn)=%% %%=v(@ln)=%%,
                            </h1>

                            <p>Your account has been temporarily locked because the maximum number of invalid logins has been exceeded.</p>

                            <p>Please try logging in again later.</p>

                            <p>If you feel you have received this email in error, please contact customer service.</p>

                            <p>This is an automatically generated email, please do not reply.</p>

                        </td>
                    </tr>
                </table>
            </center>
        </td>
    </tr>
</table>
```

### Triggered Send Definition

Name — Account Locked  
External Key — account.locked  
Send Classification — Default Transactional  
Email — Account Locked  
List — Any list of your choice  
Data Extension — Account or Account Locked  
Disable API Calls (on error) — Enabled  

### Custom Object Field Mapping (Business Manager)

Hook ID — app.communication.account.lockedOut  
Trigger External Key — account.lockedOut  
Description — Account Locked trigger  
Subscriber Attributes:  

```
{
    "StoreHomeLink": "StoreHomeLink",
    "SiteID": "SiteID",
    "AccountHomeLink": "AccountHomeLink",
    "Customer.anonymous": "Anonymous",
    "Customer.ID": "CustomerID",
    "Customer.note": "Note",
    "Customer.registered": "Registered",
    "Profile.birthday": "Birthday",
    "Profile.companyName": "CompanyName",
    "Profile.customerNo": "CustomerNumber",
    "Profile.email": "EmailAddress",
    "Profile.fax": "Fax",
    "Profile.female": "Female",
    "Profile.firstName": "FirstName",
    "Profile.gender.displayValue": "GenderDisplay",
    "Profile.gender.value": "GenderValue",
    "Profile.jobTitle": "JobTitle",
    "Profile.lastLoginTime": "LastLogin",
    "Profile.lastName": "LastName",
    "Profile.lastVisitTime": "LastVisit",
    "Profile.male": "Male",
    "Profile.nextBirthday": "NextBirthday",
    "Profile.phoneBusiness": "PhoneBusiness",
    "Profile.phoneHome": "PhoneHome",
    "Profile.phoneMobile": "PhoneMobile",
    "Profile.preferredLocale": "PreferredLocale",
    "Profile.previousLoginTime": "PreviousLogin",
    "Profile.previousVisitTime": "PreviousVisit",
    "Profile.salutation": "Salutation",
    "Profile.secondName": "SecondName",
    "Profile.suffix": "Suffix",
    "Profile.taxIDMasked": "TaxIDMasked",
    "Profile.taxIDType.displayValue": "TaxIDTypeDisplay",
    "Profile.taxIDType.value": "TaxIDTypeValue",
    "Profile.title": "Title",
    "Customer.authenticated": "Authenticated"
}
```
<a name="PasswordChanged"></a>
## Account - Password Changed

### Data Extension

Minimum fields recommended:

* FirstName — Text, 50
* LastName — Text, 50
* AccountHomeLink — Text, 250
* SiteID — Text, 50

### Email Template

Email name — Password Changed  
Subject — Your New Password  
Paste into a content block as HTML  

```
%%[
var @fn, @ln, @acctlink

SET @fn = AttributeValue("FirstName")
SET @ln = AttributeValue("LastName")
SET @acctlink = AttributeValue("AccountHomeLink")
]%%

<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" style="background:#e0e0e0;padding:50px 0;">
            <center>
                <table style="background:#ffffff;border:1px solid #999999;width:680px;">
                    <tr>
                        <td style="font-size:12px;font-family:arial;padding:20px 10px;vertical-align:top;">

                            <p style="font-family:georgia;font-size:20px;">
                                Dear&nbsp;%%=v(@fn)=%% %%=v(@ln)=%%,
                            </p>

                            <p>You have successfully created a new password for your account.</p>

                            <p>You can visit your account at <a href="%%=v(@acctlink)=%%">%%=v(@acctlink)=%%</a>.</p>

                            <p>This is an automatically generated email, please do not reply.</p>

                        </td>
                    </tr>
                </table>
            </center>
        </td>
    </tr>
</table>
```

### Triggered Send Definition

Name — Account Password Changed  
External Key — account.passwordChanged  
Send Classification — Default Transactional  
Email — Account Password Changed  
List — Any list of your choice  
Data Extension — Account or Account Password Changed  
Disable API Calls (on error) — Enabled  

### Custom Object Field Mapping (Business Manager)

Hook ID — app.communication.account.passwordChanged  
Trigger External Key — account.passwordChanged  
Description — Password Changed trigger  
Subscriber Attributes:  

```
{
    "StoreHomeLink": "StoreHomeLink",
    "SiteID": "SiteID",
    "AccountHomeLink": "AccountHomeLink",
    "Customer.anonymous": "Anonymous",
    "Customer.ID": "CustomerID",
    "Customer.note": "Note",
    "Customer.registered": "Registered",
    "Profile.birthday": "Birthday",
    "Profile.companyName": "CompanyName",
    "Profile.customerNo": "CustomerNumber",
    "Profile.email": "EmailAddress",
    "Profile.fax": "Fax",
    "Profile.female": "Female",
    "Profile.firstName": "FirstName",
    "Profile.gender.displayValue": "GenderDisplay",
    "Profile.gender.value": "GenderValue",
    "Profile.jobTitle": "JobTitle",
    "Profile.lastLoginTime": "LastLogin",
    "Profile.lastName": "LastName",
    "Profile.lastVisitTime": "LastVisit",
    "Profile.male": "Male",
    "Profile.nextBirthday": "NextBirthday",
    "Profile.phoneBusiness": "PhoneBusiness",
    "Profile.phoneHome": "PhoneHome",
    "Profile.phoneMobile": "PhoneMobile",
    "Profile.preferredLocale": "PreferredLocale",
    "Profile.previousLoginTime": "PreviousLogin",
    "Profile.previousVisitTime": "PreviousVisit",
    "Profile.salutation": "Salutation",
    "Profile.secondName": "SecondName",
    "Profile.suffix": "Suffix",
    "Profile.taxIDMasked": "TaxIDMasked",
    "Profile.taxIDType.displayValue": "TaxIDTypeDisplay",
    "Profile.taxIDType.value": "TaxIDTypeValue",
    "Profile.title": "Title",
    "Customer.authenticated": "Authenticated"
}
```
<a name="PasswordReset"></a>
## Account - Password Reset

### Data Extension

Minimum fields recommended

* FirstName — Text, 50
* LastName — Text, 50
* ResetPasswordLink — Text, 250
* SiteID — Text, 50

### Email Template

Email name — Account Password Reset  
Subject — Your New Password  
Paste into a content block as HTML  

```
%%[
var @pwlink, @fn, @ln

SET @pwlink = AttributeValue("ResetPasswordLink")
SET @fn = AttributeValue("FirstName")
SET @ln = AttributeValue("LastName")
]%%

<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" style="background:#e0e0e0;padding:50px 0;">
            <center>
                <table style="background:#ffffff;border:1px solid #999999;width:680px;">
                    <tr>
                        <td style="font-size:12px;font-family:arial;padding:20px 10px;vertical-align:top;">

                            <p style="font-family:georgia;font-size:20px;">
                                Dear %%=v(@fn)=%% %%=v(@ln)=%%,
                            </p>

                            <p>We received a request to reset the password associated with this email address. If you made this request, please follow the instructions below.</p>

                            <p>If you did not request to have your password reset you can safely ignore this email. Rest assured your customer account is safe.</p>

                            <p>Click the link below to reset your password:</p>

                            <p><a href="%%=v(@pwlink)=%%" title="Your Password">%%=v(@pwlink)=%%</a></p>

                            <p>If clicking doesn't seem to work, you can copy and paste the link into your browser's address window, or retype it there. We will give instructions for resetting your password. Note that this link is only active for a short period of time.</p>

                            <p>For security purposes, this link will expire in 30 minutes or after you reset your password.</p>

                            <p>This is an automatically generated email, please do not reply.</p>

                        </td>
                    </tr>
                </table>
            </center>
        </td>
    </tr>
</table>
```

### Triggered Send Definition

Name — Account Password Reset  
External Key — account.passwordReset  
Send Classification — Default Transactional  
Email — Account Password Reset  
List — Any list of your choice  
Data Extension — Account Password Reset  
Disable API Calls (on error) — Enabled  

### Custom Object Field Mapping (Business Manager)

Hook ID — app.communication.account.passwordReset  
Trigger External Key — account.passwordReset  
Description — Password Reset trigger  
Subscriber Attributes:  

```
{
    "StoreHomeLink": "StoreHomeLink",
    "SiteID": "SiteID",
    "ResetPasswordToken": "ResetPasswordToken",
    "ResetPasswordLink": "ResetPasswordLink",
    "AccountHomeLink": "AccountHomeLink",
    "Customer.anonymous": "Anonymous",
    "Customer.ID": "CustomerID",
    "Customer.note": "Note",
    "Customer.registered": "Registered",
    "Profile.birthday": "Birthday",
    "Profile.companyName": "CompanyName",
    "Profile.customerNo": "CustomerNumber",
    "Profile.email": "EmailAddress",
    "Profile.fax": "Fax",
    "Profile.female": "Female",
    "Profile.firstName": "FirstName",
    "Profile.gender.displayValue": "GenderDisplay",
    "Profile.gender.value": "GenderValue",
    "Profile.jobTitle": "JobTitle",
    "Profile.lastLoginTime": "LastLogin",
    "Profile.lastName": "LastName",
    "Profile.lastVisitTime": "LastVisit",
    "Profile.male": "Male",
    "Profile.nextBirthday": "NextBirthday",
    "Profile.phoneBusiness": "PhoneBusiness",
    "Profile.phoneHome": "PhoneHome",
    "Profile.phoneMobile": "PhoneMobile",
    "Profile.preferredLocale": "PreferredLocale",
    "Profile.previousLoginTime": "PreviousLogin",
    "Profile.previousVisitTime": "PreviousVisit",
    "Profile.salutation": "Salutation",
    "Profile.secondName": "SecondName",
    "Profile.suffix": "Suffix",
    "Profile.taxIDMasked": "TaxIDMasked",
    "Profile.taxIDType.displayValue": "TaxIDTypeDisplay",
    "Profile.taxIDType.value": "TaxIDTypeValue",
    "Profile.title": "Title",
    "Customer.authenticated": "Authenticated"
}
```
<a name="ContactUs"></a>
## Customer Service - Contact Us

### Data Extension

Minimum fields recommended

* FirstName — Text, 50
* LastName — Text, 50
* Phone — Phone
* OrderNumber — Text, 50
* MyQuestion — Text, 50
* Comment — Text, 50
* CustomerEmailAddress — Email
* SiteID — Text, 50

### Email Template

Email name — Contact Us  
Subject — `Contact Us: %%=AttributeValue("MyQuestion")=%%`  
Paste into a content block as HTML:  

```
%%[
var @fn, @ln, @phn, @odn, @myq, @com, @email

SET @fn = AttributeValue("FirstName")
SET @ln = AttributeValue("LastName")
SET @phn = AttributeValue("Phone")
SET @odn = AttributeValue("OrderNumber")
SET @myq = AttributeValue("MyQuestion")
SET @com = AttributeValue("Comment")
SET @email = AttributeValue("CustomerEmailAddress")
]%%

<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" style="background:#e0e0e0;padding:50px 0;">
            <center>
                <table style="background:#ffffff;border:1px solid #999999;width:680px;">
                    <tr>
                        <td style="font-size:12px;font-family:arial;padding:20px 10px;vertical-align:top;">

                            <p style="font-family:georgia;font-size:20px;">Salesforce B2C Commerce</p>

                            <p>Name:
                                %%=v(@fn)=%%
                                %%=v(@ln)=%%
                            </p>

                            <p>Email:
                                %%=v(@email)=%%
                            </p>

                            <p>Phone:
                                %%=v(@phn)=%%
                            </p>

                            <p>Order Number:
                                %%=v(@odn)=%%
                            </p>

                            <p>My Question:
                                %%=v(@myq)=%%
                            </p>

                            <p>Comment:
                                %%=v(@com)=%%
                            </p>

                        </td>
                    </tr>
                </table>
            </center>
        </td>
    </tr>
</table>
```

### Triggered Send Definition

Name — Contact Us  
External Key — customerService.contactUs  
Send Classification — Default Transactional  
Email — Contact Us  
List — Any list of your choice  
Data Extension — Contact Us  
Disable API Calls (on error) — Enabled  

### Custom Object Field Mapping (Business Manager)

Hook ID — app.communication.customerService.contactUs  
Trigger External Key — customerService.contactUs  
Description — Contact Us trigger  
Subscriber Attributes:  

```
{
    "StoreHomeLink": "StoreHomeLink",
    "SiteID": "SiteID",
    "CurrentForms.contactus.myquestion": "MyQuestion",
    "CurrentForms.contactus.firstname": "FirstName",
    "CurrentForms.contactus.lastname": "LastName",
    "CurrentForms.contactus.email": "CustomerEmailAddress",
    "CurrentForms.contactus.phone": "Phone",
    "CurrentForms.contactus.ordernumber": "OrderNumber",
    "CurrentForms.contactus.comment": "Comment"
}
```
<a name="GiftCertSend"></a>
## Gift Certificate - Send

### Data Extension

Minimum fields recommended:

* Amount — Text, 50
* AmountCurrencyCode — Text, 50
* AmountDecimalValue — Decimal, 18,0
* GiftCertificateCode — Text, 50
* RecipientName — Text, 50
* SenderName — Text, 50
* Message — Text, 50
* StoreHomeLink — Text, 250
* SiteID — Text, 50

### Email Template

Email name — Send Gift Certificate  
Subject — `A gift certificate from %%=AttributeValue("SenderName")=%%`  
Paste into a content block as HTML  

```
%%[
var @amount, @amtcurcode, @amtdecval, @gccode
var @recname, @sendname, @gcmsg, @storelink, @culture

SET @amount = AttributeValue("Amount")
SET @amtcurcode = AttributeValue("AmountCurrencyCode")
SET @amtdecval = AttributeValue("AmountDecimalValue")
SET @gccode = AttributeValue("GiftCertificateCode")
SET @recname = AttributeValue("RecipientName")
SET @sendname = AttributeValue("SenderName")
SET @gcmsg = AttributeValue("Message")
SET @storelink = AttributeValue("StoreHomeLink")
]%%

<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" style="background:#e0e0e0;padding:50px 0;">
            <center>
                <table style="background:#ffffff;border:1px solid #999999;width:680px;">
                    <tr>
                        <td style="font-size:12px;font-family:arial;padding:20px 10px;vertical-align:top;">

                            <h1 style="font-size:20px;font-family:georgia;font-weight:normal;">
                                Dear %%=IIF(EMPTY(@recname),"customer",@recname)=%%,</h1>

                            <p>
                                %%=IIF(EMPTY(@sendname),"Someone",@sendname)=%%
                                pays attention to you and has sent you a %%=v(@amount)=%% gift certificate for the <a href="%%=v(@storelink)=%%">Salesforce B2C Commerce Online Store</a>.
                            </p>

                            %%[IF NOT EMPTY(@gcmsg) THEN]%%
                                <p>
                                    %%=IIF(EMPTY(@sendname),"",@sendname)=%%
                                    The following message has been left for you:
                                </p>

                                <p>
                                    %%=v(@gcmsg)=%%
                                </p>
                            %%[ENDIF]%%

                            <p>
                                To redeem your gift certificate, use the following code within the billing step of the checkout:
                                %%=v(@gccode)=%%
                            </p>

                        </td>
                    </tr>
                </table>
            </center>
        </td>
    </tr>
</table>
```

### Triggered Send Definition

Name — Send Gift Certificate  
External Key — giftCertificate.sendCertificate  
Send Classification — Default Transactional  
Email — Send Gift Certificate  
List — Any list of your choice  
Data Extension — Send Gift Certificate  
Disable API Calls (on error) — Enabled  

### Custom Object Field Mapping (Business Manager)

Hook ID — app.communication.giftCertificate.sendCertificate  
Trigger External Key — giftCertificate.sendCertificate  
Description — Send Gift Certificate trigger, used for newly purchased gift certificates  
Subscriber Attributes  

```
{
    "StoreHomeLink": "StoreHomeLink",
    "SiteID": "SiteID",
    "GiftCertificate.amount": "Amount",
    "GiftCertificate.amount.currencyCode": "AmountCurrencyCode",
    "GiftCertificate.amount.decimalValue": "AmountDecimalValue",
    "GiftCertificate.balance": "Balance",
    "GiftCertificate.balance.currencyCode": "BalanceCurrencyCode",
    "GiftCertificate.balance.decimalValue": "BalanceDecimalValue",
    "GiftCertificate.description": "Description",
    "GiftCertificate.giftCertificateCode": "GiftCertificateCode",
    "GiftCertificate.recipientName": "RecipientName",
    "GiftCertificate.recipientEmail": "RecipientEmail",
    "GiftCertificate.senderName": "SenderName",
    "GiftCertificate.message": "Message",
    "GiftCertificate.maskedGiftCertificateCode": "MaskedGiftCertificateCode",
    "GiftCertificate.merchantID": "MerchantID",
    "GiftCertificate.orderNo": "OrderNumber"
}
```
<a name="OrderConf"></a>
## Order Confirmation

### Data Extension

Minimum fields recommended:

* SiteID — Text, 50
* OrderNumber — Text, 50
* OrderAsXML — Text, delete the character limit

### Supplemental Data Extension

The Order Confirmation email uses a Shipping Method data extension to look up the label and description for shipping methods.
Each locale that is supported, results in adding two columns for that locale: `Label_en_US`, `Description_en_US`.
Replace `en_US` with the locale that you're supporting.

Name the data extension `ShippingMethods`.  
If you give it a different name, locate the `Lookup("ShippingMethods"`
references in the template and adjust them to match.

* Method_ID — Text (make the length greater than your longest shipping ID)
* Label_en_US — Text (make the length greater than your longest shipping name or label)
* Description_en_US — Text (make the length greater than your longest description)

### Email Template

Paste into a content block as HTML.

```
%%[
var @storename, @storedisplayurl, @storelogo, @storehomepage
var @storeaddress, @storelocation, @storephone
var @confthankyou, @confmessage, @confcontact
var @orderxml, @orderdate, @ordernumber, @order
var @orderTotalSubtotal, @orderTotalTax, @orderTotalGross
SET @storename = "Salesforce B2C Commerce SiteGenesis"
SET @storedisplayurl = "salesforce.com"
SET @storelogo = "http://www.demandware.com/img/logos/img-demandware-logo.svg"
SET @storelink = "http://www.salesforce.com/"
SET @storeaddress = "5 Wall Street"
SET @storelocation = "Burlington, MA 01803"
SET @storephone = "Phone: +1.800.555.0199"
SET @confthankyou = "Thank you for your order."
SET @confmessage = "If you have questions about your order, we're happy to take your call"
SET @confcontact = "1 (800) 555-0199, Monday - Friday 8AM - 8PM"
SET @orderxml = AttributeValue("OrderAsXML")

SET @bAddrId = BuildRowSetFromXML(@orderxml, "/order/customer/billing-address/id", 0)
SET @bAddrId = Iif(RowCount(@bAddrId), Field(Row(@bAddrId, 1), "Value"), "")
SET @bAddrFirst = Field(Row(BuildRowSetFromXML(@orderxml, "/order/customer/billing-address/first-name", 0), 1), "Value")
SET @bAddrLast = Field(Row(BuildRowSetFromXML(@orderxml, "/order/customer/billing-address/last-name", 0), 1), "Value")
SET @bAddr1 = Field(Row(BuildRowSetFromXML(@orderxml, "/order/customer/billing-address/address1", 0), 1), "Value")
SET @bAddr2 = BuildRowSetFromXML(@orderxml, "/order/customer/billing-address/address2", 0)
SET @bAddr2 = Iif(RowCount(@bAddr2), Field(Row(@bAddr2, 1), "Value"), "")
SET @bAddrCity = BuildRowSetFromXML(@orderxml, "/order/customer/billing-address/city", 0)
SET @bAddrCity = Iif(RowCount(@bAddrCity), Field(Row(@bAddrCity, 1), "Value"), "")
SET @bAddrPostal = Field(Row(BuildRowSetFromXML(@orderxml, "/order/customer/billing-address/postal-code", 0), 1), "Value")
SET @bAddrState = Field(Row(BuildRowSetFromXML(@orderxml, "/order/customer/billing-address/state-code", 0), 1), "Value")
SET @bAddrCountry = Field(Row(BuildRowSetFromXML(@orderxml, "/order/customer/billing-address/country-code", 0), 1), "Value")
SET @bAddrPhone = BuildRowSetFromXML(@orderxml, "/order/customer/billing-address/phone", 0)
SET @bAddrPhone = Iif(RowCount(@bAddrPhone), Field(Row(@bAddrPhone, 1), "Value"), "")
SET @paymentRows = BuildRowSetFromXML(@orderxml, "/order/payments/payment", 0)
SET @shipmentRows = BuildRowSetFromXML(@orderxml, "/order/shipments/shipment", 0)
SET @productRows = BuildRowSetFromXML(@orderxml, "/order/product-lineitems/product-lineitem", 0)
SET @merchTotalRow = BuildRowSetFromXML(@orderxml, "/order/totals/merchandize-total", 0)
SET @adjMerchTotalRow = BuildRowSetFromXML(@orderxml, "/order/totals/adjusted-merchandize-total", 0)
SET @shippingTotalRow = BuildRowSetFromXML(@orderxml, "/order/totals/shipping-total", 0)
SET @adjShippingTotalRow = BuildRowSetFromXML(@orderxml, "/order/totals/adjusted-shipping-total", 0)
SET @orderTotalRow = BuildRowSetFromXML(@orderxml, "/order/totals/order-total", 0)
SET @ordernumber = Field(Row(BuildRowSetFromXML(@orderxml, "/order/original-order-no", 0), 1), "Value")

SET @orderTotalSubtotal = Field(Row(BuildRowSetFromXML(@orderxml, "/order/totals/adjusted-merchandize-total/net-price", 0), 1), "Value")
SET @orderTotalTax = Field(Row(BuildRowSetFromXML(@orderxml, "/order/totals/order-total/tax", 0), 1), "Value")
SET @orderTotalGross = Field(Row(BuildRowSetFromXML(@orderxml, "/order/totals/order-total/gross-price", 0), 1), "Value")
SET @shippingTotalGross = Field(Row(BuildRowSetFromXML(@orderxml, "/order/totals/shipping-total/gross-price", 0), 1), "Value")
SET @orderdate = Format(Field(Row(BuildRowSetFromXML(@orderxml, "/order/order-date", 0), 1), "Value"), "MMMM d, yyyy")

SET @locale = Field(Row(BuildRowSetFromXML(@orderxml, "/order/customer-locale", 0), 1), "Value")

if empty(@locale) then
SET @locale = "en_US"
endif
]%%
<div class="main-content" style="font-size:12px; font-family:arial; width:680px;">
    <table class="store-info-content" style="width:100%;">
        <tr>
            <td style="padding:5px 10px;vertical-align:top;">
                <a href="%%=v(@storelink)=%%" title="%%=v(@storename)=%%">
                    <img src="%%=v(@storelogo)=%%" alt="%%=v(@storename)=%%" style="border:none;">
                </a>
            </td>
            <td style="padding:5px 10px;vertical-align:top;">
                <strong>%%=v(@storename)=%%</strong>
                <br>%%=v(@storeaddress)=%%
                <br>%%=v(@storelocation)=%%
                <br>
                <a href="%%=v(@storelink)=%%" title="Go to Our Store">%%=v(@storedisplayurl)=%%</a>
                <br>%%=v(@storephone)=%%
            </td>
        </tr>
    </table>
    <table class="store-message-content" style="width:100%; border-bottom: 1px solid #999999">
        <tr>
            <td colspan="2" style="padding:10px 10px 5px;vertical-align:top;">
                <h2>%%=v(@confthankyou)=%%</h2>
                <p>%%=v(@confmessage)=%% %%=v(@confcontact)=%%</p>
            </td>
        </tr>
    </table>
    <table style="width:100%;">
        <tr>
            <td style="padding:10px 0;vertical-align:top;" colspan="2">
                <div style="padding: 0 10px;">
                    <h2>Order Number: %%=v(@ordernumber)=%%</h2>
                    <p>Order Placed: %%=v(@orderdate)=%%</p>
                </div>
                <table style="width:100%">
                    <tr>
                        <th style="background:#cccccc;padding:5px 20px;" colspan="2">Payment Information</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px;vertical-align:top;">
                            <strong>Billing Address</strong>
                            %%[ if not empty(@bAddrId) then ]%%
                            <div class="mini-address-title">%%=v(@bAddrId)=%%</div>
                            %%[ endif ]%%
                            <!-- First and Last Names -->
                            <div class="mini-address-name">%%=v(@bAddrFirst)=%% %%=v(@bAddrLast)=%%</div>
                            <div class="mini-address-location">
                                <!-- Address 1 and Address 2 -->
                                %%=v(@bAddr1)=%%
                                %%[ if not empty(@bAddr2) then ]%%
                                <br>%%=v(@bAddr2)=%%
                                %%[ endif ]%%
                                <!-- City, StateCode, and Zip -->
                                %%[ if not empty(@bAddrCity) then ]%%
                                <br>%%=v(@bAddrCity)=%%
                                %%[ endif ]%%
                                %%=v(@bAddrState)=%%
                                %%=v(@bAddrPostal)=%%
                                <br>
                                <!-- Country Name -->
                                %%=v(@bAddrCountry)=%%
                                <!-- Phone Number -->
                                %%[ if not empty(@bAddrPhone) then ]%%
                                <br>%%=v(@bAddrPhone)=%%
                                %%[ endif ]%%
                            </div>
                            <div>
                                %%[ if RowCount(@paymentRows) == 1 then ]%%
                                <strong>Payment Method</strong>
                                %%[ else ]%%
                                <strong>Payment Methods</strong>
                                %%[ endif ]%%
                                <!-- Render All Payment Instruments -->
                                %%[ for @i = 1 to RowCount(@paymentRows) do
                                SET @payXML = Concat( "<payment>", Field(Row(@paymentRows, @i), "XML"), "</payment>")
                                SET @payId = Trim(Field(Row(BuildRowSetFromXML(@payXML, "/payment/processor-id", 0), 1), "Value"))
                                SET @payAmount = FormatCurrency(Field(Row(BuildRowSetFromXML(@payXML, "/payment/amount", 0), 1), "Value"))
                                if @payId == "BASIC_CREDIT" then
                                SET @payName = "Credit Card"
                                SET @payDisplay = Field(Row(BuildRowSetFromXML(@payXML, "/payment/credit-card/card-type", 0), 1), "Value")
                                SET @payDisplay = Concat(@payDisplay, ": ")
                                SET @payDisplay = Concat(@payDisplay, Field(Row(BuildRowSetFromXML(@payXML, "/payment/credit-card/card-number", 0), 1), "Value"))
                                endif
                                if @payId == "METHOD_GIFT_CERTIFICATE" then
                                SET @payName = "Gift Card"
                                SET @payDisplay = Field(Row(BuildRowSetFromXML(@payXML, "/payment/gift-card/code", 0), 1), "Value")
                                endif
                                ]%%
                                <div>%%=v(@payName)=%%</div>
                                %%=v(@payDisplay)=%%
                                <div>
                                    <span class="label">Amount: </span>
                                    <span class="value">$%%=v(@payAmount)=%%</span>
                                </div>
                                %%[ next @i ]%%
                            </div>
                        </td>
                        <td style="padding: 10px;vertical-align:top;">
                            <strong>Payment Total</strong><br>
                            <strong>Subtotal:</strong> $%%=v(@orderTotalSubtotal)=%% <br>
                            <strong>Shipping:</strong> $%%=v(@shippingTotalGross)=%% <br>
                            <strong>Tax:</strong> $%%=v(@orderTotalTax)=%% <br>
                            <strong>Order Total:</strong> $%%=v(@orderTotalGross)=%%
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width:100%">
        <tr>
            <th style="background:#cccccc;padding:5px 20px;" colspan="2">Shipment Information</th>
        </tr>
        <tr>
            <td style="padding: 10px 20px 5px;">
                <!-- render a box for each shipment -->
                %%[ for @x = 1 to RowCount(@shipmentRows) do
                SET @shipXML = Concat("<shipment>", Field(Row(@shipmentRows, @x), "XML"), "</shipment>")
                SET @shipNum = Field(Row(@shipmentRows, @x), "Shipment-id_att")
                SET @shipMethod = Trim(Field(Row(BuildRowSetFromXML(@shipXML, "/shipment/shipping-method", 0), 1), "Value"))

                SET @shipMethodName = Lookup("ShippingMethods",Concat("Label_", @locale),"Method_ID",@shipMethod)
                SET @shipDescription = Lookup("ShippingMethods",Concat("Description_", @locale),"Method_ID",@shipMethod)

                SET @shipMethodStatus = Trim(Field(Row(BuildRowSetFromXML(@shipXML, "/shipment/status/shipping-status", 0), 1), "Value"))
                SET @shipMethodStatusName = ""

                if not empty(@shipMethodStatus) then
                if @shipMethodStatus == "NOT_SHIPPED" then
                SET @shipMethodStatusName = "Not Shipped"
                elseif @shipMethodStatus == "SHIPPED" then
                SET @shipMethodStatusName = "Shipped"
                endif
                endif

                if @shipMethod != "005" then
                SET @sAddrFirst = Trim(Field(Row(BuildRowSetFromXML(@shipXML, "/shipment/shipping-address/first-name", 0), 1), "Value"))
                SET @sAddrLast = Trim(Field(Row(BuildRowSetFromXML(@shipXML, "/shipment/shipping-address/last-name", 0), 1), "Value"))
                SET @sAddr1 = Trim(Field(Row(BuildRowSetFromXML(@shipXML, "/shipment/shipping-address/address1", 0), 1), "Value"))
                SET @sAddr2 = BuildRowSetFromXML(@shipXML, "/shipment/shipping-address/address2", 0)
                SET @sAddr2 = Iif(RowCount(@sAddr2), Trim(Field(Row(@sAddr2, 1), "Value")), "")
                SET @sAddrCity = BuildRowSetFromXML(@shipXML, "/shipment/shipping-address/city", 0)
                SET @sAddrCity = Iif(RowCount(@sAddrCity), Trim(Field(Row(@sAddrCity, 1), "Value")), "")
                SET @sAddrPostal = Trim(Field(Row(BuildRowSetFromXML(@shipXML, "/shipment/shipping-address/postal-code", 0), 1), "Value"))
                SET @sAddrState = Trim(Field(Row(BuildRowSetFromXML(@shipXML, "/shipment/shipping-address/state-code", 0), 1), "Value"))
                SET @sAddrCountry = Trim(Field(Row(BuildRowSetFromXML(@shipXML, "/shipment/shipping-address/country-code", 0), 1), "Value"))
                SET @sAddrPhone = BuildRowSetFromXML(@shipXML, "/shipment/shipping-address/phone", 0)
                SET @sAddrPhone = Iif(RowCount(@sAddrPhone), Trim(Field(Row(@sAddrPhone, 1), "Value")), "")
                endif
                ]%%
                <strong style="font-size: 15px;">Shipment No %%=v(@x)=%%</strong>
                <div class="shipment-content" style="padding: 5px 10px 10px; background-color:#efefef; margin-bottom: 10px;">
                    <table style="width:100%;" class="shipment-details">
                        <tr>
                            <td valign="top">
                                %%[ if not empty(@shipMethodStatusName) then ]%%
                                <strong>Shipping Status:</strong><br>
                                %%=v(@shipMethodStatusName)=%%<br>
                                %%[ endif ]%%
                                <strong>Method:</strong><br>
                                %%=v(@shipMethodName)=%%
                            </td>
                            <td valign="top">
                                <strong>Shipping Address</strong>
                                <!-- First and Last Names -->
                                <div class="mini-address-name">%%=v(@sAddrFirst)=%% %%=v(@sAddrLast)=%%</div>
                                <div class="mini-address-location">
                                    <!-- Address 1 and Address 2 -->
                                    %%=v(@sAddr1)=%%
                                    %%[ if not empty(@sAddr2) then ]%%
                                    <br>%%=v(@sAddr2)=%%
                                    %%[ endif ]%%
                                    <!-- City, StateCode, and Zip -->
                                    %%[ if not empty(@sAddrCity) then ]%%
                                    <br>%%=v(@sAddrCity)=%%
                                    %%[ endif ]%%
                                    %%=v(@sAddrState)=%%
                                    %%=v(@sAddrPostal)=%%
                                    <br>
                                    <!-- Country Name -->
                                    %%=v(@sAddrCountry)=%%
                                    <!-- Phone Number -->
                                    %%[ if not empty(@sAddrPhone) then ]%%
                                    <br>%%=v(@sAddrPhone)=%%
                                    %%[ endif ]%%
                                </div>
                            </td>
                        </tr>
                    </table>
                    <table style="width:100%; border: 1px solid #cccccc; margin-top: 10px;" class="product-details" cellspacing="0" cellpadding="0">
                        <tr>
                            <th style="text-align:left; padding: 5px 10px;">Item</th>
                            <th style="padding: 5px 10px;">Qty</th>
                            <th style="padding: 5px 10px;">Price</th>
                        </tr>
                        %%[ for @j = 1 to RowCount(@productRows) do
                        SET @productXML = Concat("<product>", Field(Row(@productRows, @j), "XML"), "</product>")
                        SET @productShipmentId = Trim(Field(Row(BuildRowSetFromXML(@productXML, "product/shipment-id", 0), 1), "Value"))

                        if @shipNum == @productShipmentId then
                        SET @productName = Trim(Field(Row(BuildRowSetFromXML(@productXML, "/product/product-name", 0), 1), "Value"))
                        SET @productId = Trim(Field(Row(BuildRowSetFromXML(@productXML, "/product/product-id", 0), 1), "Value"))
                        SET @productQty = Trim(Field(Row(BuildRowSetFromXML(@productXML, "/product/quantity", 0), 1), "Value"))
                        SET @productPrice = Trim(Field(Row(BuildRowSetFromXML(@productXML, "/product/net-price", 0), 1), "Value"))
                        SET @rowColor = Iif(Mod(@j,2) == 0, "#efefef", "#ffffff")
                        ]%%
                        <tr style="background-color:%%=v(@rowColor)=%%;">
                            <td style="padding: 3px 10px;">
                                <span style="font-size: 13px;">%%=v(@productName)=%%</span>
                                <br><span style="color: #333333;">Item No. %%=v(@productId)=%%</span>
                            </td>
                            <td style="text-align: right; padding: 3px 0;">%%=v(@productQty)=%%</td>
                            <td style="text-align: right; padding: 3px 10px 3px 0;">$%%=v(@productPrice)=%%</td>
                        </tr>
                        %%[ endif ]%%
                        %%[ next @j ]%%
                    </table>
                </div>
                %%[ next @x ]%%
            </td>
        </tr>
    </table>
</div>
```

### Triggered Send Definition

Name — Order Confirmation  
External Key — order.confirmation  
Send Classification — Default Transactional  
Email — Order Confirmation  
List — Any list of your choice  
Data Extension — Order Confirmation  
Disable API Calls (on error) — Enabled  

### Custom Object Field Mapping (Business Manager)

Hook ID — app.communication.order.confirmation  
Trigger External Key — order.confirmation  
Description:  

```
Order Confirmation trigger, contains details of the placed order. To reflect line items,
 use orderAsXML attribute and process as XML within the Marketing Cloud template.
To use XML approach, see Marketing Cloud docs: 
https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-apis.meta/mc-apis/using_triggered_sends_to_confirm_purchases.htm
```

Subscriber attributes: 

```
{
    "StoreHomeLink": "StoreHomeLink",
    "SiteID": "SiteID",
    "orderAsXML": "OrderAsXML",
    "Order.affiliatePartnerID": "",
    "Order.affiliatePartnerName": "",
    "Order.capturedAmount": "",
    "Order.capturedAmount.currencyCode": "",
    "Order.capturedAmount.decimalValue": "",
    "Order.createdBy": "",
    "Order.customerLocaleID": "",
    "Order.customerOrderReference": "",
    "Order.exportAfter": "",
    "Order.externalOrderNo": "",
    "Order.externalOrderStatus": "",
    "Order.externalOrderText": "",
    "Order.invoiceNo": "",
    "Order.orderNo": "OrderNumber",
    "Order.orderToken": "",
    "Order.remoteHost": "",
    "Order.sourceCode": "",
    "Order.sourceCodeGroupID": "",
    "Order.adjustedMerchandizeTotalGrossPrice": "",
    "Order.adjustedMerchandizeTotalGrossPrice.currencyCode": "",
    "Order.adjustedMerchandizeTotalGrossPrice.decimalValue": "",
    "Order.adjustedMerchandizeTotalNetPrice": "",
    "Order.adjustedMerchandizeTotalNetPrice.currencyCode": "",
    "Order.adjustedMerchandizeTotalNetPrice.decimalValue": "",
    "Order.adjustedMerchandizeTotalPrice": "",
    "Order.adjustedMerchandizeTotalPrice.currencyCode": "",
    "Order.adjustedMerchandizeTotalPrice.decimalValue": "",
    "Order.adjustedMerchandizeTotalTax": "",
    "Order.adjustedMerchandizeTotalTax.currencyCode": "",
    "Order.adjustedMerchandizeTotalTax.decimalValue": "",
    "Order.adjustedShippingTotalGrossPrice": "",
    "Order.adjustedShippingTotalGrossPrice.currencyCode": "",
    "Order.adjustedShippingTotalGrossPrice.decimalValue": "",
    "Order.adjustedShippingTotalNetPrice": "",
    "Order.adjustedShippingTotalNetPrice.currencyCode": "",
    "Order.adjustedShippingTotalNetPrice.decimalValue": "",
    "Order.adjustedShippingTotalPrice": "",
    "Order.adjustedShippingTotalPrice.currencyCode": "",
    "Order.adjustedShippingTotalPrice.decimalValue": "",
    "Order.adjustedShippingTotalTax": "",
    "Order.adjustedShippingTotalTax.currencyCode": "",
    "Order.adjustedShippingTotalTax.decimalValue": "",
    "Order.billingAddress.address1": "",
    "Order.billingAddress.address2": "",
    "Order.billingAddress.city": "",
    "Order.billingAddress.companyName": "",
    "Order.billingAddress.countryCode.displayValue": "",
    "Order.billingAddress.countryCode.value": "",
    "Order.billingAddress.firstName": "",
    "Order.billingAddress.fullName": "",
    "Order.billingAddress.jobTitle": "",
    "Order.billingAddress.lastName": "",
    "Order.billingAddress.phone": "",
    "Order.billingAddress.postalCode": "",
    "Order.billingAddress.postBox": "",
    "Order.billingAddress.salutation": "",
    "Order.billingAddress.secondName": "",
    "Order.billingAddress.stateCode": "",
    "Order.billingAddress.suffix": "",
    "Order.billingAddress.suite": "",
    "Order.billingAddress.title": "",
    "Order.channelType.displayValue": "",
    "Order.channelType.value": "",
    "Order.currencyCode": "",
    "Order.customer.anonymous": "",
    "Order.customer.authenticated": "",
    "Order.customer.ID": "",
    "Order.customer.note": "",
    "Order.customer.registered": "",
    "Order.customer.profile.birthday": "",
    "Order.customer.profile.companyName": "",
    "Order.customer.profile.customerNo": "",
    "Order.customer.profile.email": "",
    "Order.customer.profile.fax": "",
    "Order.customer.profile.female": "",
    "Order.customer.profile.firstName": "",
    "Order.customer.profile.gender.displayValue": "",
    "Order.customer.profile.gender.value": "",
    "Order.customer.profile.jobTitle": "",
    "Order.customer.profile.lastLoginTime": "",
    "Order.customer.profile.lastName": "",
    "Order.customer.profile.lastVisitTime": "",
    "Order.customer.profile.male": "",
    "Order.customer.profile.nextBirthday": "",
    "Order.customer.profile.phoneBusiness": "",
    "Order.customer.profile.phoneHome": "",
    "Order.customer.profile.phoneMobile": "",
    "Order.customer.profile.preferredLocale": "",
    "Order.customer.profile.previousLoginTime": "",
    "Order.customer.profile.previousVisitTime": "",
    "Order.customer.profile.salutation": "",
    "Order.customer.profile.secondName": "",
    "Order.customer.profile.suffix": "",
    "Order.customer.profile.taxIDMasked": "",
    "Order.customer.profile.taxIDType.displayValue": "",
    "Order.customer.profile.taxIDType.value": "",
    "Order.customer.profile.title": "",
    "Order.customerEmail": "",
    "Order.customerName": "",
    "Order.customerNo": "",
    "Order.defaultShipment.adjustedMerchandizeTotalGrossPrice": "",
    "Order.defaultShipment.adjustedMerchandizeTotalGrossPrice.currencyCode": "",
    "Order.defaultShipment.adjustedMerchandizeTotalGrossPrice.decimalValue": "",
    "Order.defaultShipment.adjustedMerchandizeTotalNetPrice": "",
    "Order.defaultShipment.adjustedMerchandizeTotalNetPrice.currencyCode": "",
    "Order.defaultShipment.adjustedMerchandizeTotalNetPrice.decimalValue": "",
    "Order.defaultShipment.adjustedMerchandizeTotalPrice": "",
    "Order.defaultShipment.adjustedMerchandizeTotalPrice.currencyCode": "",
    "Order.defaultShipment.adjustedMerchandizeTotalPrice.decimalValue": "",
    "Order.defaultShipment.adjustedMerchandizeTotalTax": "",
    "Order.defaultShipment.adjustedMerchandizeTotalTax.currencyCode": "",
    "Order.defaultShipment.adjustedMerchandizeTotalTax.decimalValue": "",
    "Order.defaultShipment.adjustedShippingTotalGrossPrice": "",
    "Order.defaultShipment.adjustedShippingTotalGrossPrice.currencyCode": "",
    "Order.defaultShipment.adjustedShippingTotalGrossPrice.decimalValue": "",
    "Order.defaultShipment.adjustedShippingTotalNetPrice": "",
    "Order.defaultShipment.adjustedShippingTotalNetPrice.currencyCode": "",
    "Order.defaultShipment.adjustedShippingTotalNetPrice.decimalValue": "",
    "Order.defaultShipment.adjustedShippingTotalPrice": "",
    "Order.defaultShipment.adjustedShippingTotalPrice.currencyCode": "",
    "Order.defaultShipment.adjustedShippingTotalPrice.decimalValue": "",
    "Order.defaultShipment.adjustedShippingTotalTax": "",
    "Order.defaultShipment.adjustedShippingTotalTax.currencyCode": "",
    "Order.defaultShipment.adjustedShippingTotalTax.decimalValue": "",
    "Order.defaultShipment.gift": "",
    "Order.defaultShipment.giftMessage": "",
    "Order.defaultShipment.ID": "",
    "Order.defaultShipment.merchandizeTotalGrossPrice": "",
    "Order.defaultShipment.merchandizeTotalGrossPrice.currencyCode": "",
    "Order.defaultShipment.merchandizeTotalGrossPrice.decimalValue": "",
    "Order.defaultShipment.merchandizeTotalNetPrice": "",
    "Order.defaultShipment.merchandizeTotalNetPrice.currencyCode": "",
    "Order.defaultShipment.merchandizeTotalNetPrice.decimalValue": "",
    "Order.defaultShipment.merchandizeTotalPrice": "",
    "Order.defaultShipment.merchandizeTotalPrice.currencyCode": "",
    "Order.defaultShipment.merchandizeTotalPrice.decimalValue": "",
    "Order.defaultShipment.merchandizeTotalTax": "",
    "Order.defaultShipment.merchandizeTotalTax.currencyCode": "",
    "Order.defaultShipment.merchandizeTotalTax.decimalValue": "",
    "Order.defaultShipment.proratedMerchandizeTotalPrice": "",
    "Order.defaultShipment.proratedMerchandizeTotalPrice.currencyCode": "",
    "Order.defaultShipment.proratedMerchandizeTotalPrice.decimalValue": "",
    "Order.defaultShipment.shipmentNo": "",
    "Order.defaultShipment.shippingAddress.address1": "",
    "Order.defaultShipment.shippingAddress.address2": "",
    "Order.defaultShipment.shippingAddress.city": "",
    "Order.defaultShipment.shippingAddress.companyName": "",
    "Order.defaultShipment.shippingAddress.countryCode.displayValue": "",
    "Order.defaultShipment.shippingAddress.countryCode.value": "",
    "Order.defaultShipment.shippingAddress.firstName": "",
    "Order.defaultShipment.shippingAddress.fullName": "",
    "Order.defaultShipment.shippingAddress.jobTitle": "",
    "Order.defaultShipment.shippingAddress.lastName": "",
    "Order.defaultShipment.shippingAddress.phone": "",
    "Order.defaultShipment.shippingAddress.postalCode": "",
    "Order.defaultShipment.shippingAddress.postBox": "",
    "Order.defaultShipment.shippingAddress.salutation": "",
    "Order.defaultShipment.shippingAddress.secondName": "",
    "Order.defaultShipment.shippingAddress.stateCode": "",
    "Order.defaultShipment.shippingAddress.suffix": "",
    "Order.defaultShipment.shippingAddress.suite": "",
    "Order.defaultShipment.shippingAddress.title": "",
    "Order.defaultShipment.shippingMethod.currencyCode": "",
    "Order.defaultShipment.shippingMethod.description": "",
    "Order.defaultShipment.shippingMethod.displayName": "",
    "Order.defaultShipment.shippingMethod.ID": "",
    "Order.defaultShipment.shippingMethod.taxClassID": "",
    "Order.defaultShipment.shippingMethodID": "",
    "Order.defaultShipment.shippingTotalGrossPrice": "",
    "Order.defaultShipment.shippingTotalGrossPrice.currencyCode": "",
    "Order.defaultShipment.shippingTotalGrossPrice.decimalValue": "",
    "Order.defaultShipment.shippingTotalNetPrice": "",
    "Order.defaultShipment.shippingTotalNetPrice.currencyCode": "",
    "Order.defaultShipment.shippingTotalNetPrice.decimalValue": "",
    "Order.defaultShipment.shippingTotalPrice": "",
    "Order.defaultShipment.shippingTotalPrice.currencyCode": "",
    "Order.defaultShipment.shippingTotalPrice.decimalValue": "",
    "Order.defaultShipment.shippingTotalTax": "",
    "Order.defaultShipment.shippingTotalTax.currencyCode": "",
    "Order.defaultShipment.shippingTotalTax.decimalValue": "",
    "Order.defaultShipment.totalGrossPrice": "",
    "Order.defaultShipment.totalGrossPrice.currencyCode": "",
    "Order.defaultShipment.totalGrossPrice.decimalValue": "",
    "Order.defaultShipment.totalNetPrice": "",
    "Order.defaultShipment.totalNetPrice.currencyCode": "",
    "Order.defaultShipment.totalNetPrice.decimalValue": "",
    "Order.defaultShipment.totalTax": "",
    "Order.defaultShipment.totalTax.currencyCode": "",
    "Order.defaultShipment.totalTax.decimalValue": "",
    "Order.defaultShipment.trackingNumber": "",
    "Order.giftCertificateTotalGrossPrice": "",
    "Order.giftCertificateTotalGrossPrice.currencyCode": "",
    "Order.giftCertificateTotalGrossPrice.decimalValue": "",
    "Order.giftCertificateTotalNetPrice": "",
    "Order.giftCertificateTotalNetPrice.currencyCode": "",
    "Order.giftCertificateTotalNetPrice.decimalValue": "",
    "Order.giftCertificateTotalPrice": "",
    "Order.giftCertificateTotalPrice.currencyCode": "",
    "Order.giftCertificateTotalPrice.decimalValue": "",
    "Order.giftCertificateTotalTax": "",
    "Order.giftCertificateTotalTax.currencyCode": "",
    "Order.giftCertificateTotalTax.decimalValue": "",
    "Order.merchandizeTotalGrossPrice": "",
    "Order.merchandizeTotalGrossPrice.currencyCode": "",
    "Order.merchandizeTotalGrossPrice.decimalValue": "",
    "Order.merchandizeTotalNetPrice": "",
    "Order.merchandizeTotalNetPrice.currencyCode": "",
    "Order.merchandizeTotalNetPrice.decimalValue": "",
    "Order.merchandizeTotalPrice": "",
    "Order.merchandizeTotalPrice.currencyCode": "",
    "Order.merchandizeTotalPrice.decimalValue": "",
    "Order.merchandizeTotalTax": "",
    "Order.merchandizeTotalTax.currencyCode": "",
    "Order.merchandizeTotalTax.decimalValue": "",
    "Order.productQuantityTotal": "",
    "Order.shippingTotalGrossPrice": "",
    "Order.shippingTotalGrossPrice.currencyCode": "",
    "Order.shippingTotalGrossPrice.decimalValue": "",
    "Order.shippingTotalNetPrice": "",
    "Order.shippingTotalNetPrice.currencyCode": "",
    "Order.shippingTotalNetPrice.decimalValue": "",
    "Order.shippingTotalPrice": "",
    "Order.shippingTotalPrice.currencyCode": "",
    "Order.shippingTotalPrice.decimalValue": "",
    "Order.shippingTotalTax": "",
    "Order.shippingTotalTax.currencyCode": "",
    "Order.shippingTotalTax.decimalValue": "",
    "Order.totalGrossPrice": "",
    "Order.totalGrossPrice.currencyCode": "",
    "Order.totalGrossPrice.decimalValue": "",
    "Order.totalNetPrice": "",
    "Order.totalNetPrice.currencyCode": "",
    "Order.totalNetPrice.decimalValue": "",
    "Order.totalTax": "",
    "Order.totalTax.currencyCode": "",
    "Order.totalTax.decimalValue": "",
    "Order.capturedAmount.value": "CapturedAmountValue",
    "Order.adjustedMerchandizeTotalGrossPrice.value": "",
    "Order.adjustedMerchandizeTotalNetPrice.value": "",
    "Order.adjustedMerchandizeTotalPrice.value": "",
    "Order.adjustedMerchandizeTotalTax.value": "",
    "Order.adjustedShippingTotalGrossPrice.value": "",
    "Order.adjustedShippingTotalNetPrice.value": "",
    "Order.adjustedShippingTotalPrice.value": "",
    "Order.adjustedShippingTotalTax.value": "",
    "Order.defaultShipment.adjustedMerchandizeTotalGrossPrice.value": "",
    "Order.defaultShipment.adjustedMerchandizeTotalNetPrice.value": "",
    "Order.defaultShipment.adjustedMerchandizeTotalPrice.value": "",
    "Order.defaultShipment.adjustedMerchandizeTotalTax.value": "",
    "Order.defaultShipment.adjustedShippingTotalGrossPrice.value": "",
    "Order.defaultShipment.adjustedShippingTotalNetPrice.value": "",
    "Order.defaultShipment.adjustedShippingTotalPrice.value": "",
    "Order.defaultShipment.adjustedShippingTotalTax.value": "",
    "Order.defaultShipment.merchandizeTotalGrossPrice.value": "",
    "Order.defaultShipment.merchandizeTotalNetPrice.value": "",
    "Order.defaultShipment.merchandizeTotalPrice.value": "",
    "Order.defaultShipment.merchandizeTotalTax.value": "",
    "Order.defaultShipment.proratedMerchandizeTotalPrice.value": "",
    "Order.defaultShipment.shippingTotalGrossPrice.value": "",
    "Order.defaultShipment.shippingTotalNetPrice.value": "",
    "Order.defaultShipment.shippingTotalPrice.value": "",
    "Order.defaultShipment.shippingTotalTax.value": "",
    "Order.defaultShipment.totalGrossPrice.value": "",
    "Order.defaultShipment.totalNetPrice.value": "",
    "Order.defaultShipment.totalTax.value": "",
    "Order.giftCertificateTotalGrossPrice.value": "",
    "Order.giftCertificateTotalNetPrice.value": "",
    "Order.giftCertificateTotalPrice.value": "",
    "Order.giftCertificateTotalTax.value": "",
    "Order.merchandizeTotalGrossPrice.value": "",
    "Order.merchandizeTotalNetPrice.value": "",
    "Order.merchandizeTotalPrice.value": "",
    "Order.merchandizeTotalTax.value": "",
    "Order.shippingTotalGrossPrice.value": "",
    "Order.shippingTotalNetPrice.value": "",
    "Order.shippingTotalPrice.value": "",
    "Order.shippingTotalTax.value": "",
    "Order.totalGrossPrice.value": "",
    "Order.totalNetPrice.value": "",
    "Order.totalTax.value": ""
}
```
<a name="OMSShipment"></a>
## OMS - Shipment

Th OMS Shipment trigger is specific to the SFCC Order Management System (OMS) product, and might not apply to your storefront.  
This example of a Shipment email doesn't include all options. See [API doc for dw.om.shipments.ShipmentDetail](https://documentation.demandware.com/API1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPP-18.8-API-doc%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_om_shipments_ShipmentDetail.html) to determine which fields are available for mapping.  
See [OMS Tasks repository](https://github.com/SalesforceCommerceCloud/order-management-tasks) for hook usage examples.  

### Data Extension

Minimum fields recommended:

* SiteID — Text, 50
* OrderNumber — Text, 50
* ShipmentID — Text, 50

### Email Template

No template provided currently.  

### Triggered Send Definition

Name — OMS Shipment  
External Key — oms.shipment  
Send Classification — Default Transactional  
Email — OMS Shipment  
List — Any list of your choice  
Data Extension — OMS Shipment  
Disable API Calls (on error) — Enabled  

### Custom Object Field Mapping (Business Manager)

Hook ID — app.communication.oms.shipment  
Trigger External Key — oms.shipment  
Description:  

```
See API doc for dw.om.shipments.ShipmentDetail to determine available fields for mapping.
https://documentation.demandware.com/API1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPP-18.8-API-doc%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_om_shipments_ShipmentDetail.html
```

Subscriber attributes: 

```
{
    "StoreHomeLink": "StoreHomeLink",
    "SiteID": "SiteID",
    "Shipment": ""
}
```
<a name="OMSReturn"></a>
## OMS - Return Order Created

The OMS Return Order Created trigger is specific to the SFCC Order Management System (OMS) product, and might not apply to your storefront.  
This example of an Return Order Created email doesn't include all options. See [API doc for dw.om.returnorders.ReturnOrderDetail](https://documentation.demandware.com/API1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPP-18.8-API-doc%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_om_returnorders_ReturnOrderDetail.html) to determine which fields are available for mapping.  
See [OMS Tasks repository](https://github.com/SalesforceCommerceCloud/order-management-tasks) for hook usage examples.  

### Data Extension

Minimum fields recommended:

* SiteID — Text, 50
* ReturnOrderID — Text, 50

### Email Template

No template provided currently.  

### Triggered Send Definition

Name — OMS Return Order Created  
External Key — oms.returnOrderCreated  
Send Classification — Default Transactional  
Email — OMS Return Order Created  
List — Any list of your choice  
Data Extension — OMS Return Order Created  
Disable API Calls (on error) — Enabled  

### Custom Object Field Mapping (Business Manager)

Hook ID — app.communication.oms.returnOrderCreated  
Trigger External Key — oms.returnOrderCreated  
Description:  

```
See API doc for dw.om.returnorders.ReturnOrderDetail to determine available fields for mapping.
https://documentation.demandware.com/API1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPP-18.8-API-doc%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_om_returnorders_ReturnOrderDetail.html
```

Subscriber attributes: 

```
{
    "StoreHomeLink": "StoreHomeLink",
    "SiteID": "SiteID",
    "ReturnOrder": ""
}
```
<a name="OMSInvoice"></a>
## OMS - Invoice Processed

The OMS Invoice Processed trigger is specific to the SFCC Order Management System (OMS) product, and might not apply to your storefront.  
This example of an Invoice Processed email doesn't include all options. See [API doc for dw.om.invoices.InvoiceDetail](https://documentation.demandware.com/API1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPP-18.8-API-doc%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_om_invoices_InvoiceDetail.html) to determine which fields are available for mapping.  
See [OMS Tasks repository](https://github.com/SalesforceCommerceCloud/order-management-tasks) for hook usage examples.  

### Data Extension

Minimum fields recommended:

* SiteID — Text, 50
* InvoiceID — Text, 50

### Email Template

No template provided currently.  

### Triggered Send Definition

Name — OMS Invoice Processed  
External Key — oms.invoiceProcessed  
Send Classification — Default Transactional  
Email — OMS Invoice Processed  
List — Any list of your choice  
Data Extension — OMS Invoice Processed  
Disable API Calls (on error) — Enabled  

### Custom Object Field Mapping (Business Manager)

Hook ID — app.communication.oms.invoiceProcessed  
Trigger External Key — oms.invoiceProcessed  
Description:  

```
See API doc for dw.om.invoices.InvoiceDetail to determine available fields for mapping.
https://documentation.demandware.com/API1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPP-18.8-API-doc%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_om_invoices_InvoiceDetail.html&resultof=%22invoicedetail%22%20
```

Subscriber attributes: 

```
{
    "StoreHomeLink": "StoreHomeLink",
    "SiteID": "SiteID",
    "Invoice": ""
}
```

- - -

[Back to the top](#Top)
