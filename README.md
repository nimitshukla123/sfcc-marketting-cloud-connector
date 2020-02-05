<a name="Top"></a>
# Salesforce B2C Commerce to Marketing Cloud Connector #

### Table of Contents ###

1. [Connector Overview](#Overview)
2. [Connector Documentation](#Doc)
3. [Community](#Community)
4. [Changelog](#Changes) (please read for V2.2.0 deprecated API changes!) 
5. [Terms and Conditions](#Legalese)

```
The latest release 2.2.0 (and the latest code in the Master branch) is compatible with the new 
Marketing Cloud enhanced package and supports OAuth 2.0 AND Commerce Cloud API 19.10

To use Legacy package based Authentication (OAuth 1.0), Please get the version 2.0.3 from releases.
Please note that V2.0.3 is not compatible with Commerce Cloud API release 19.10.   
```

<a name="Overview"></a>
## Connector Overview ##
The Salesforce B2C Commerce to Marketing Cloud Connector is a project that facilitates the integration between the two clouds. The project connects B2C Commerce to Marketing Cloud "above the API", meaning it is using public API rather than direct backend integration. This framework allows you to share and synchronize data between the two clouds.

### Features ###

#### API Implementation ####
This cartridge implements in-part both the REST API and SOAP API from MC (Marketing Cloud).  
The inclusion of both APIs means that the groundwork is started to help you along with your own custom use of MC APIs, of which there are many abilities not already employed within this cartridge.

#### Analytics ####
Analytic tracking, using MC's `collect.js`, is enabled via configuration.
The following events are tracked by default:

- Page view
- Search request (search page)
- Product view (PDP)
- Category view (PLP)
- Cart (add/modify/remove)
- Order placement

The tracked information then you for MC Abandonment functionality (which requires a services engagement).
MC's Abandonment functionality includes abandoned cart, abandoned browse, abandoned search.

In addition to tracking page analytics, you can also opt to enable Streaming Updates, which updates your product catalog and content assets in MC's database as they are viewed.

#### Marketing Management ####
Marketing management is enabled by providing the following abilities:  

- Marketing opt-in check-box (during registration and ordering).
- Email subscribe form support.
- Marketing preferences page in My Account, for selectively opting into or out of specific mailing lists.

#### Transactional Emails ####
The following OOB SiteGenesis emails are replaced with MC email triggers: 

* Account - Created
* Account - Updated
* Account - Password Changed
* Account - Password Reset
* Account - Locked Out
* Customer Service - Contact Us
* Gift Certificate - Send Certificate
* Order - Confirmation 

Transactional emails are built using SFCC platform hooks leveraging "triggered email" functionality in Marketing Cloud, to send emails. Configurable trigger definitions, stored in Custom Objects, are used to support custom trigger keys as well as support mapping of data for each trigger from predefined attribute values to data extension attributes that you define. Configuration can be used to achieve a mix and match of SiteGenesis emails with Marketing Cloud emails.

#### Data Sync ####
Data sync to Marketing Cloud via jobs:

* Product Catalog
* Content Catalog
* Customers
* Orders
* Promotions/Campaigns

<a name="Doc"></a>
## Connector Documentation ##

The documents below, and their respective filenames, are numbered in sequence for installing and configuring the B2C Commerce to Marketing Cloud Connector. 

1. [Project Overview](docs/1_0_Project_Overview.md#navlink)
2. [Install B2C Commerce Components](docs/2_0_Commerce_Cloud_Component_Installation.md#navlink)
	
	2.1 [Handler Framework Installation](docs/2_1_Handler-Installation.md#navlink)
	
	2.2 [Marketing Cloud Cartridge Installation](docs/2_2_MarketingCloudCart.md#navlink)
	
	2.3 [SFRA Modification Instructions](docs/2_3_Modification-Instructions-for-SFRA.md#navlink)
	
	2.4 [SiteGenesis Modification Instructions](docs/2_4_Modification-Instructions-for-SiteGenesis.md#navlink)
	
	2.5 [Manual Modification Instructions](docs/2_5_ManualModifications.md#navlink)

3. [Install Marketing Cloud Components](docs/3_0_ModifyMarketingCloud.md#navlink)

	3.1 [Triggered Send / Transactional Emails](docs/3_1_0_TriggeredSendTransactionalEmails.md#navlink)
	
	3.1.1 [Triggered Send Configuration](docs/3_1_1_MCConnectorInstallation-TriggeredSendConfiguration.md#navlink)
	
	3.2. [Realtime Analytics Configuration](docs/3_2_MCConnectorInstallation-RealtimeAnalyticsConfiguration.md#navlink)
	
4. [Additional Features](docs/4_0_AdditionalFeatures.md#navlink)
5. [Debugging](docs/5_0_Debugging.md#navlink)

* [XChange Developer Forum](https://xchange.demandware.com/community/developer/marketing-cloud-connector/activity)
* [Unofficial Community Slack](https://sfcc-unofficial.slack.com)

<a name="Community"></a>
## Contribute

1. Create a fork, if you don't already have one.
2. Ensure your fork is synced with the latest changes from the main repository.
3. Create a new branch in your fork to hold your changes.
4. Submit a [pull request](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/compare).

<a name="Changes"></a>
## Changelog ##
#### 2.3.0 ####
1.	Added new hook listener for app.server.registerRoute (SFRA-specific). Depends on SalesforceCommerceCloud/storefront-reference-architecture#648, but is safe to be merged without the SFRA PR being merged yet.
When registerRoute is called (during registration of routes in SFRA), a route event listener is registered for route:Complete (was BeforeComplete, but found some logic in SFRA that then escaped detection). Before any route completes its response, the listener checks response to determine if JSON. If JSON, it injects the Marketing Cloud event info into the JSON response object.
2.	Moved detectController to a helper file.
3.	Added support for callback used to return any output on tracking hooks.
4.	Updated onRequest hook logic to ensure that tracking session basket etag value is only updated during the onRequest hook execution.
5.	Updated controller/method detection logic. SFRA methods (routes) are anonymous functions which makes the stack trace detection faulty.
6.	Updated ajax detection logic to look for XMLHttpRequest, rather than depending solely on ajax partial templates (SG-specific).
7.	Fixing various typos in documentation.
8.	Added client-side hook to send events to SFMC upon successful JSON ajax calls.
9.	Ensuring module overrides don't omit new exports.
10.	Fixed order confirmation email.
11.	Added an initial integration test, to get the cartridge moving in that direction so we can try to start tracking where changes are breaking other functionality.
12.	Adjusted analytic tracking to now fire during checkout in SFRA. A custom analytic event must be registered to use this in the storefront, as the checkout event is exposed but not output to the page by default, since SFMC has no default checkout flow tracking that I'm aware of.



#### 2.2.0 ####

**DEPRECATED COMMERCE API’s - COMPATIBILITY MODE 19.10**

**Commerce-to-Marketing Connector 2.2.0**

With the release of B2C Commerce 19.10, Commerce Cloud has introduced Compatibility Mode (CM) 19.10 (see Release Note (https://help.salesforce.com/articleView?id=b2c_19_10_W6488941_comp_mode_la.htm&type=5)). Part of the release of this Compatibility Mode is the **removal** of the following classes/subclasses from the Script API:

* dw.svc.ServiceRegistry
* dw.svc.ServiceDefinition (and it’s subclasses)

These classes had been **deprecated** and replaced with dw.svc.LocalServiceRegistry. We have determined that the Marketing Cloud (MC) Connector currently leverages the above deprecated classes/subclasses. Customers using Commerce-to-Marketing Connector versions 2.1.0 or lower may or may not be affected by this change, depending on whether or not they leverage CM 19.10. 

Customers will not be affected in the following scenarios:

* An existing MC Connector customer does not select CM 19.10, ie, does not run the dbinit job to use the latest CM.
* A new MC Connector customer implements MC Connector version 2.2.0 or higher from Master branch (via GitHub).

However, customers using the MC Connector will be affected in the following scenario:

* An existing Commerce-to-Marketing Connector customer using versions <2.2.0 and *_does_* select is using CM 19.10 in their Commerce Cloud platform, ie, the dbinit job to use the latest CM does run. 
    * Note: If no CM is explicitly selected, the instance will default to the latest CM.

The above scenario means that their MC Connector implementation would attempt to use the classes/subclasses that are no longer available, resulting in broken functionality.

**Customer Call to Action:**

In order to avoid a break in functionality, existing Commerce-to-Marketing Connector customers have the following options:

* Do not use Commerce Cloud CM 19.10 (until their Connector code has been updated appropriately to leverage the new dw.svc.LocalServiceRegistry classes). 
* Update to the latest version of the MC Connector, which has been modified for compatibility with Commerce Cloud CM 19.10. 
    * Note: As of the August 2019 update, the MC Connector also requires the use of a new MC API package with OAuth 2.0. See README file on GitHub for more information.
* Manually change the impacted classes to use dw.svc.LocalServiceRegistry. 




#### 2.1.0 ####
- Support for MC OAuth 2.0 and Enhanced package functionality.
- Updated documentation.

#### 2.0.0 ####

- Overlay cartridges for SiteGenesis and SFRA
- Includes the int\_handler\_framework cartridge
- Improved documentation tied to this release (instead of in the wiki)

#### 1.0.3 ####
- SFRA Support added for MC Connector (Refer Handler framework 1.0.1 Wiki)


#### [unreleased] ####

##### Added #####
 - Added OMS email hooks
 - Added ability to populate/send custom attributes via Subscriber form (thanks @pfscsantiago)

##### Fixed #####
 - Fixed a syntax error in compileMappingTemplates.js

#### [[1.0.2.1]](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/releases/tag/1.0.2.1) - 2017-01-17 ####

##### Added #####
 - Added missing service configuration definitions

#### [[1.0.2]](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/releases/tag/1.0.2) - 2017-01-17 ####

##### Fixed #####
 - Fix for treegen doc generation to ignore dot-files
 - Fixed array conversion error for analytics
 - Fixed order ID missing for analytics

##### Added #####
 - Added Promotions/Campaigns feed
 - Added mailing list / subscription functionality
 - Added soap service
 - Added two hooks for mailing list subscribe / unsubscribe
 - Added wsdl generated API zip file for reference
 - Added new site preferences

#### [[1.0.1-rc.1]](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/releases/tag/1.0.1-rc.1) - 2017-10-24 ####

##### Fixed #####
 - Fixed incorrect path to hooks.json
 - Fixed typo in variable casing in catalog feed job
 - Fixed `isValid401()` check, which was expecting a value as string rather than number
 - Fixed possible issue with expires comparison
 - Corrected `marketingcloud.rest.interaction.events` stub.

##### Added #####
 - Added more returned details to the `parseResponse()` method.
 - Added job which can be used to generate necessary velocity data mapping templates.
 - Added Analytics model
 - Added a currently-unused model for data feed jobs to export using Velocity templates. This is to support future functionality.
 - Added data layer script for Analytic use. This handles bulk of logic for analytic implementation with Marketing Cloud.
 - Added tracking link script for Analytic use. This handles tracking link(s) used for analytic init.
 - Registered 5 new hooks.
 - Added MCC-CompileMappingTemplates job.
 - Added custom object MarketingCloudAnalytics
 - Added MC custom preferences to control tracking link.

##### Changed #####
 - Service credential fallback now relies upon the service name for fallback credential ID.
 - Updated `helpers.getCustomObject()` to no longer auto-assume that you want a new object created if it wasn't found.
 - Slight improvement to `isValidAuth()` check.
 - Trigger logic no longer auto-creates missing trigger, instead uses plain JS object marking trigger as disabled.
 - Renamed MCC Init job to MCC InitTriggers.
 - Updated Order Confirmation email sample with a fully working email template.

#### [[1.0.0-rc.3]](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/releases/tag/1.0.0-rc.3) - 2017-08-14 ####

##### Fixed #####
 - Fixed bug where data object wasn't being passed to catalog feed.
 - Fixed issue where feed was being marked as exported when execution completed, rather than using job start timestamp.
 
##### Added #####
 - Added fallback logic for data mappings (to support a fallback object, so if a value isn't found in variant, for example, we then search master)
 - Added function to print list of images for product catalog.
 - Added support for variation groups in catalog feed.
 - DefaultProduct added to catalog list of variables, contains default variant || variation group || master. Useful for fallback parameter
 - Added support for mapping collections to arrays/strings (specifically to support customer groups in customer feed).
 - Added support for a "format" option for value mappings into MC. The format option is passed to dw.util.StringUtils along with the found value.
 - Added preferences to catalog feed to support including or skipping master product, variation group, variant, or simple products.
 - Added preference for data feeds to accept directory path for upload target server.

##### Changed #####
 - Changed product catalog export to use ProductSearchModel, and ensure we output variants
 - Changed content catalog export to use ContentSearchModel
 - Moved util directory out of models directory
 - Updated orderAsXML to strip namespace from XML sent to MC.
 - Ensuring empty string on export for empty values, fixes some values that were returning "undefined".
 - Exported fields are now trimmed to remove leading/trailing spaces.
 - Updated standardPrice function to additionally check master product for price (list price).
 - Ensure image links return as strings
 - Updated standardPrice() to return nothing if no price (to ensure no issue with fallback parameter)
 - Ensuring writeChildProducts is operating off of variation model.
 - Removed _aliases behavior, as it was too broad and a performance drain. New approach is to use fallback parameter in mapping, for values that may need to fall back...
 - Updated catalog export config to reflect the new functionality.
 - Updated jobs definitions export to change incremental to false by default (otherwise troubleshooting on a fresh install is problematic)
 - Updated api doc

#### [[1.0.0-rc.2]](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/releases/tag/1.0.0-rc.2) - 2017-06-27 ####
 
##### Changed #####
 - MC service now attempts to use site-specific credentials, if they exist.

#### [[1.0.0-rc.1]](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/releases/tag/1.0.0-rc.1) - 2017-06-26 ####
 
#### Added #####
 - Initial packaging of MC Connector Cartridge
 - Added triggered send email support
 - Added data feed support



### License ###

Licensed under the current NDA and licensing agreement in place with your organization. (This is explicitly not open source licensing.)

<a name="Legalese"></a>
## Terms & Conditions ##

Copyright 2018 [salesforce.com](https://www.salesforce.com/), inc. All rights reserved. 

These Terms of Use are between **You**, (being the Customer that purchased B2C Commerce Services) and salesforce.com, inc. or its Affiliate ("**SFDC**") that entered into a subscription agreement (the "**Agreement**") with You that governs Your purchase of B2C Commerce Services (formerly known as “Demandware Services”).
 
These Terms of Use were last updated on  June 11, 2018 and constitute a legally binding agreement between You and SFDC effective upon Your first download, installation or use of the Connector, whichever is earliest. If You do not have authority to bind the Customer that entered into the Agreement or You do not agree to these Terms of Use, You may not install or use the Connector
 
SFDC grants You a limited non-exclusive, nontransferable, non-sublicensable, revocable license to use the Connector internally solely for the purpose of integrating Your subscription to B2C Commerce Services with Your subscription to SFDC’s Marketing Cloud Services in the manner as described by the Documentation.  

Subject to the limited rights expressly granted hereunder, SFDC reserves all rights, title and interest in and to all intellectual property rights subsisting in the Connector. No rights are granted to You hereunder other than as expressly set forth herein.  Users residing in countries on the United States Office of Foreign Assets Control sanction list, or which are otherwise subject to a US export embargo, may not use the Connector.
 
The Connector is not part of the B2C Commerce Services nor the Marketing Cloud Services. Implementation of the Connector requires development work and appropriate configuration and permissions within Your instances of B2C Commerce and Marketing Cloud for which You are responsible. The Connector may contain bugs, errors and incompatibilities with Your configuration of B2C Commerce Services or Marketing Cloud Services and is made available on an AS IS basis without support, updates, or service level commitments. 
 
SFDC reserves the right at any time to modify or discontinue, temporarily or permanently, the Connector (or any part thereof) with or without notice. You agree that SFDC shall not be liable to You or to any third party for any modification, suspension or discontinuance

WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, THE CONNECTOR IS NOT SUPPORTED, AND IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL  SFDC HAVE ANY LIABILITY FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO, DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR DAMAGES BASED ON LOST PROFITS, DATA OR USE, IN CONNECTION WITH THE CONNECTOR, HOWEVER CAUSED AND, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, WHETHER OR NOT YOU HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

 
These Terms of Use shall be governed exclusively by the internal laws of the State of California, without regard to its conflicts of laws rules. Each party hereby consents to the exclusive jurisdiction of the state and federal courts located in San Francisco County,California to adjudicate any dispute arising out of or relating to this Agreement. Except as expressly stated in these Terms of Use, these Terms of Use constitute the entire agreement between the parties, and supersede all prior and contemporaneous agreements, proposals or representations, written or oral, concerning their subject matter.No modification, amendment, or waiver of any provision of these Terms of Use shall be effective unless it is by an update to these Terms of Use that we make available on this website, or is in writing and signed by the party against whom the modification, amendment or waiver is to be asserted.

---
[Back to the top](#Top)
