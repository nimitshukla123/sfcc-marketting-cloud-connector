## Modules
Module | Description
------ | -----------
[communication/account](#markdown-header-communicationaccount) | 
[communication/customerService](#markdown-header-communicationcustomerservice) | 
[communication/giftCertificate](#markdown-header-communicationgiftcertificate) | 
[communication/handler](#markdown-header-communicationhandler) | 
[communication/order](#markdown-header-communicationorder) | 
[communication/util/send](#markdown-header-communicationutilsend) | 
[feeds/catalog](#markdown-header-feedscatalog) | 
[feeds/content](#markdown-header-feedscontent) | 
[feeds/customers](#markdown-header-feedscustomers) | 
[feeds/orders](#markdown-header-feedsorders) | 
[feeds/upload](#markdown-header-feedsupload) | 
[init/rest](#markdown-header-initrest) | 
[jobs/compileMappingTemplates](#markdown-header-jobscompilemappingtemplates) | 
[jobs/triggers](#markdown-header-jobstriggers) | 
[models/analytic](#markdown-header-modelsanalytic) | 
[models/authToken](#markdown-header-modelsauthtoken) | 
[models/dataExport](#markdown-header-modelsdataexport) | 
[models/dataExportStatus](#markdown-header-modelsdataexportstatus) | 
[models/dataExport](#markdown-header-modelsdataexport) | 
[models/event](#markdown-header-modelsevent) | 
[models/export](#markdown-header-modelsexport) | 
[models/message](#markdown-header-modelsmessage) | 
[models/trigger](#markdown-header-modelstrigger) | 
[int_marketing_cloud](#markdown-header-int_marketing_cloud-object) : Object | Registry object
[util/helpers](#markdown-header-utilhelpers) | 

## Members
Global | Description
------ | -----------
velocity : dw.template.Velocity | 
HookMgr : dw.system.HookMgr | 
velocity : dw.template.Velocity | 

## Functions
Global | Description
------ | -----------
buildCustomer(requestData) ⇒ Object | Build customer data for setUserInfo
buildBasket() ⇒ Object ⎮ Object | Builds basket object
buildOrder(orderID) ⇒ Object | Builds order object
buildCartItems(lineItems) ⇒ Array.<Object> | Build cart items, used by both buildBasket and buildOrder
buildLineItem(pli) ⇒ Object | Build product line items
buildCustomEvent(eventID, dataObject) ⇒ Object | Builds event details using custom mapping
trackCached() | Registered hook for app.tracking.trackCached
eventsInit(requestData) | Registered hook for app.tracking.preEvents
requestEvent(eventName, eventValue, requestData) | Registered hook for app.tracking.event
eventsOutput(requestData) | Registered hook for app.tracking.postEvents
cachedTrackingLink() | Registered hook for app.tracking.cachedTrackingLink

## communication/account

* [communication/account](#markdown-header-communicationaccount)
    * [~sendTrigger(hookID, promise, data)](#markdown-header-communicationaccountsendtriggerhookid-promise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~created(promise, data)](#markdown-header-communicationaccountcreatedpromise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~updated(promise, data)](#markdown-header-communicationaccountupdatedpromise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~passwordChanged(promise, data)](#markdown-header-communicationaccountpasswordchangedpromise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~passwordReset(promise, data)](#markdown-header-communicationaccountpasswordresetpromise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~lockedOut(promise, data)](#markdown-header-communicationaccountlockedoutpromise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~triggerDefinitions()](#markdown-header-communicationaccounttriggerdefinitions-object) ⇒ Object

### communication/account~sendTrigger(hookID, promise, data) ⇒ SynchronousPromise
Wrapper to trigger.sendTrigger() to allow common variable injection for all hooks in the file

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param |
| --- |
| hookID | 
| promise | 
| data | 

### communication/account~created(promise, data) ⇒ SynchronousPromise
Trigger account created notification

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param | Type |
| --- | --- |
| promise | SynchronousPromise | 
| data | module:communication/util/trigger~CustomerNotification | 

### communication/account~updated(promise, data) ⇒ SynchronousPromise
Trigger account updated notification

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param | Type |
| --- | --- |
| promise | SynchronousPromise | 
| data | module:communication/util/trigger~CustomerNotification | 

### communication/account~passwordChanged(promise, data) ⇒ SynchronousPromise
Trigger password changed notification

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param | Type |
| --- | --- |
| promise | SynchronousPromise | 
| data | module:communication/util/trigger~CustomerNotification | 

### communication/account~passwordReset(promise, data) ⇒ SynchronousPromise
Trigger password reset notification

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param | Type |
| --- | --- |
| promise | SynchronousPromise | 
| data | module:communication/util/trigger~CustomerNotification | 

### communication/account~lockedOut(promise, data) ⇒ SynchronousPromise
Trigger account locked out notification

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param | Type |
| --- | --- |
| promise | SynchronousPromise | 
| data | module:communication/util/trigger~CustomerNotification | 

### communication/account~triggerDefinitions() ⇒ Object
Declares attributes available for data mapping configuration

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  
**Returns**: Object - Map of hook function to an array of strings  
## communication/customerService

* [communication/customerService](#markdown-header-communicationcustomerservice)
    * [~contactUs(promise, data)](#markdown-header-communicationcustomerservicecontactuspromise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~customFromTo(trigger, data)](#markdown-header-communicationcustomerservicecustomfromtotrigger-data)
    * [~triggerDefinitions()](#markdown-header-communicationcustomerservicetriggerdefinitions-object) ⇒ Object

### communication/customerService~contactUs(promise, data) ⇒ SynchronousPromise
Trigger a customer service notification

**Kind**: inner method of [communication/customerService](#markdown-header-communicationcustomerservice)  

| Param | Type |
| --- | --- |
| promise | SynchronousPromise | 
| data | module:communication/util/trigger~CustomerNotification | 

### communication/customerService~customFromTo(trigger, data)
Override the trigger message from/to values

**Kind**: inner method of [communication/customerService](#markdown-header-communicationcustomerservice)  

| Param | Type |
| --- | --- |
| trigger | Trigger | 
| data | module:communication/util/trigger~CustomerNotification | 

### communication/customerService~triggerDefinitions() ⇒ Object
Declares attributes available for data mapping configuration

**Kind**: inner method of [communication/customerService](#markdown-header-communicationcustomerservice)  
**Returns**: Object - Map of hook function to an array of strings  
## communication/giftCertificate

* [communication/giftCertificate](#markdown-header-communicationgiftcertificate)
    * [~sendCertificate(promise, data)](#markdown-header-communicationgiftcertificatesendcertificatepromise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~triggerDefinitions()](#markdown-header-communicationgiftcertificatetriggerdefinitions-object) ⇒ Object

### communication/giftCertificate~sendCertificate(promise, data) ⇒ SynchronousPromise
Trigger a gift certificate notification

**Kind**: inner method of [communication/giftCertificate](#markdown-header-communicationgiftcertificate)  

| Param | Type |
| --- | --- |
| promise | SynchronousPromise | 
| data | module:communication/util/trigger~CustomerNotification | 

### communication/giftCertificate~triggerDefinitions() ⇒ Object
Declares attributes available for data mapping configuration

**Kind**: inner method of [communication/giftCertificate](#markdown-header-communicationgiftcertificate)  
**Returns**: Object - Map of hook function to an array of strings  
## communication/handler
### communication/handler.registerHandler(registerHandler)
Register communication handler

**Kind**: static method of [communication/handler](#markdown-header-communicationhandler)  

| Param | Type |
| --- | --- |
| registerHandler | Object | 

## communication/order

* [communication/order](#markdown-header-communicationorder)
    * [~confirmation(promise, data)](#markdown-header-communicationorderconfirmationpromise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~triggerDefinitions()](#markdown-header-communicationordertriggerdefinitions-object) ⇒ Object

### communication/order~confirmation(promise, data) ⇒ SynchronousPromise
Trigger an order confirmation notification

**Kind**: inner method of [communication/order](#markdown-header-communicationorder)  

| Param | Type |
| --- | --- |
| promise | SynchronousPromise | 
| data | module:communication/util/trigger~CustomerNotification | 

### communication/order~triggerDefinitions() ⇒ Object
Declares attributes available for data mapping configuration

**Kind**: inner method of [communication/order](#markdown-header-communicationorder)  
**Returns**: Object - Map of hook function to an array of strings  
## communication/util/send

* [communication/util/send](#markdown-header-communicationutilsend)
    * [~sendTrigger(hookID, promise, data, [cb])](#markdown-header-communicationutilsendsendtriggerhookid-promise-data-cb-synchronouspromise) ⇒ SynchronousPromise
    * [~CustomerNotification](#markdown-header-communicationutilsendcustomernotification-object) : Object

### communication/util/send~sendTrigger(hookID, promise, data, [cb]) ⇒ SynchronousPromise
Trigger a customer notification
Resolves promise with a {{status: string}} Response object. At a minimum it should contain a status string: OK= indicates success, ERROR= indicates failure, anything else also indicates failure

**Kind**: inner method of [communication/util/send](#markdown-header-communicationutilsend)  

| Param | Type | Description |
| --- | --- | --- |
| hookID | string |  |
| promise | SynchronousPromise |  |
| data | module:communication/util/trigger~CustomerNotification |  |
| [cb] | function | Optional callback, is called with the created trigger instance and the data object |

### communication/util/send~CustomerNotification : Object
**Kind**: inner typedef of [communication/util/send](#markdown-header-communicationutilsend)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| fromEmail | string | The email address the communication is sent from |
| toEmail | string ⎮ Array | The email address the communication is sent to |
| subject | string | The communication subject |
| messageBody | string | The body of the communication to send |
| params | Object | Object containing additional parameters for usage by the hook |
| params.CurrentForms | dw.web.Forms | The forms available in current session |
| params.CurrentHttpParameterMap | dw.web.HttpParameterMap | The parameters in current request |
| params.CurrentCustomer | dw.customer.Customer | The current customer |

## feeds/catalog

* [feeds/catalog](#markdown-header-feedscatalog)
    * [~exportModel](#markdown-header-feedscatalogexportmodel-modulemodelsexportexport) : Export
    * [~PSM](#markdown-header-feedscatalogpsm-dwcatalogproductsearchmodel) : dw.catalog.ProductSearchModel
    * [~ProductSearchModel](#markdown-header-feedscatalogproductsearchmodel-dwcatalogproductsearchmodel) : dw.catalog.ProductSearchModel
    * [~CatalogMgr](#markdown-header-feedscatalogcatalogmgr-dwcatalogcatalogmgr) : dw.catalog.CatalogMgr
    * [~Export](#markdown-header-feedscatalogexport-modulemodelsexportexport) : [Export](#markdown-header-feedscatalogexport-modulemodelsexportexport)
    * [~imageLink(cfg, data)](#markdown-header-feedscatalogimagelinkcfg-data-dwweburl) ⇒ dw.web.URL
    * [~images(cfg, data)](#markdown-header-feedscatalogimagescfg-data-array) ⇒ Array
    * [~standardPrice(cfg, data)](#markdown-header-feedscatalogstandardpricecfg-data-dwutildecimalvoid) ⇒ dw.util.Decimal ⎮ void
    * [~process(product, parameters, stepExecution)](#markdown-header-feedscatalogprocessproduct-parameters-stepexecution-voidfunction) ⇒ void ⎮ function
    * [~writeProduct(product, parameters, writeNextCB)](#markdown-header-feedscatalogwriteproductproduct-parameters-writenextcb)
    * [~writeChildProducts(childProducts, parentProduct, writeNextCB)](#markdown-header-feedscatalogwritechildproductschildproducts-parentproduct-writenextcb)
    * [~buildProductData(product, defaultProduct)](#markdown-header-feedscatalogbuildproductdataproduct-defaultproduct-arraystring) ⇒ Array.<String>

### feeds/catalog~exportModel : [Export](#markdown-header-feedscatalogexport-modulemodelsexportexport)
**Kind**: inner property of [feeds/catalog](#markdown-header-feedscatalog)  
**See**: [https://help.marketingcloud.com/en/documentation/personalization_builder/personalization_builder_prerequisites/catalog/add_attributes/](https://help.marketingcloud.com/en/documentation/personalization_builder/personalization_builder_prerequisites/catalog/add_attributes/)
### feeds/catalog~PSM : dw.catalog.ProductSearchModel
**Kind**: inner property of [feeds/catalog](#markdown-header-feedscatalog)  
### feeds/catalog~ProductSearchModel : dw.catalog.ProductSearchModel
**Kind**: inner constant of [feeds/catalog](#markdown-header-feedscatalog)  
### feeds/catalog~CatalogMgr : dw.catalog.CatalogMgr
**Kind**: inner constant of [feeds/catalog](#markdown-header-feedscatalog)  
### feeds/catalog~Export : [Export](#markdown-header-feedscatalogexport-modulemodelsexportexport)
**Kind**: inner constant of [feeds/catalog](#markdown-header-feedscatalog)  
### feeds/catalog~imageLink(cfg, data) ⇒ dw.web.URL
Returns https image link, as long as image type is defined in the property configuration

**Kind**: inner method of [feeds/catalog](#markdown-header-feedscatalog)  

| Param |
| --- |
| cfg | 
| data | 

### feeds/catalog~images(cfg, data) ⇒ Array
Returns an array of image links

**Kind**: inner method of [feeds/catalog](#markdown-header-feedscatalog)  

| Param |
| --- |
| cfg | 
| data | 

### feeds/catalog~standardPrice(cfg, data) ⇒ dw.util.Decimal ⎮ void
Returns the base price for a product (using pricebook inheritance to determine price ancestor)

**Kind**: inner method of [feeds/catalog](#markdown-header-feedscatalog)  

| Param |
| --- |
| cfg | 
| data | 

### feeds/catalog~process(product, parameters, stepExecution) ⇒ void ⎮ function
**Kind**: inner method of [feeds/catalog](#markdown-header-feedscatalog)  

| Param | Type |
| --- | --- |
| product | dw.catalog.Product | 
| parameters |  | 
| stepExecution |  | 

### feeds/catalog~writeProduct(product, parameters, writeNextCB)
This method will write out any products in the search index, that are allowed by job preferences.

**Kind**: inner method of [feeds/catalog](#markdown-header-feedscatalog)  

| Param | Type |
| --- | --- |
| product | dw.catalog.Product | 
| parameters |  | 
| writeNextCB | function | 

### feeds/catalog~writeChildProducts(childProducts, parentProduct, writeNextCB)
**Kind**: inner method of [feeds/catalog](#markdown-header-feedscatalog)  

| Param | Type |
| --- | --- |
| childProducts | dw.util.Collection | 
| parentProduct | dw.catalog.Product | 
| writeNextCB | function | 

### feeds/catalog~buildProductData(product, defaultProduct) ⇒ Array.<String>
**Kind**: inner method of [feeds/catalog](#markdown-header-feedscatalog)  

| Param | Type | Description |
| --- | --- | --- |
| product | dw.catalog.Product ⎮ dw.catalog.Variant |  |
| defaultProduct | dw.catalog.Product | Product to use as fallback, such as for pricing |

## feeds/content

* [feeds/content](#markdown-header-feedscontent)
    * [~exportModel](#markdown-header-feedscontentexportmodel-modulemodelsexportexport) : Export
    * [~CSM](#markdown-header-feedscontentcsm-dwcontentcontentsearchmodel) : dw.content.ContentSearchModel
    * [~ContentSearchModel](#markdown-header-feedscontentcontentsearchmodel-dwcontentcontentsearchmodel) : dw.content.ContentSearchModel
    * [~ContentMgr](#markdown-header-feedscontentcontentmgr-dwcontentcontentmgr) : dw.content.ContentMgr
    * [~Export](#markdown-header-feedscontentexport-modulemodelsexportexport) : [Export](#markdown-header-feedscontentexport-modulemodelsexportexport)
    * [~process(content, parameters, stepExecution)](#markdown-header-feedscontentprocesscontent-parameters-stepexecution-voidarray) ⇒ void ⎮ Array

### feeds/content~exportModel : [Export](#markdown-header-feedscontentexport-modulemodelsexportexport)
**Kind**: inner property of [feeds/content](#markdown-header-feedscontent)  
### feeds/content~CSM : dw.content.ContentSearchModel
**Kind**: inner property of [feeds/content](#markdown-header-feedscontent)  
### feeds/content~ContentSearchModel : dw.content.ContentSearchModel
**Kind**: inner constant of [feeds/content](#markdown-header-feedscontent)  
### feeds/content~ContentMgr : dw.content.ContentMgr
**Kind**: inner constant of [feeds/content](#markdown-header-feedscontent)  
### feeds/content~Export : [Export](#markdown-header-feedscontentexport-modulemodelsexportexport)
**Kind**: inner constant of [feeds/content](#markdown-header-feedscontent)  
### feeds/content~process(content, parameters, stepExecution) ⇒ void ⎮ Array
**Kind**: inner method of [feeds/content](#markdown-header-feedscontent)  

| Param | Type |
| --- | --- |
| content | dw.content.Content | 
| parameters |  | 
| stepExecution |  | 

## feeds/customers

* [feeds/customers](#markdown-header-feedscustomers)
    * [~exportModel](#markdown-header-feedscustomersexportmodel-modulemodelsexportexport) : Export
    * [~CustomerMgr](#markdown-header-feedscustomerscustomermgr-dwcustomercustomermgr) : dw.customer.CustomerMgr
    * [~Export](#markdown-header-feedscustomersexport-modulemodelsexportexport) : [Export](#markdown-header-feedscustomersexport-modulemodelsexportexport)
    * [~process(profile, parameters, stepExecution)](#markdown-header-feedscustomersprocessprofile-parameters-stepexecution-voidarray) ⇒ void ⎮ Array

### feeds/customers~exportModel : [Export](#markdown-header-feedscustomersexport-modulemodelsexportexport)
**Kind**: inner property of [feeds/customers](#markdown-header-feedscustomers)  
### feeds/customers~CustomerMgr : dw.customer.CustomerMgr
**Kind**: inner constant of [feeds/customers](#markdown-header-feedscustomers)  
### feeds/customers~Export : [Export](#markdown-header-feedscustomersexport-modulemodelsexportexport)
**Kind**: inner constant of [feeds/customers](#markdown-header-feedscustomers)  
### feeds/customers~process(profile, parameters, stepExecution) ⇒ void ⎮ Array
**Kind**: inner method of [feeds/customers](#markdown-header-feedscustomers)  

| Param | Type |
| --- | --- |
| profile | dw.customer.Profile | 
| parameters |  | 
| stepExecution |  | 

## feeds/orders

* [feeds/orders](#markdown-header-feedsorders)
    * [~exportModel](#markdown-header-feedsordersexportmodel-modulemodelsexportexport) : Export
    * [~OrderMgr](#markdown-header-feedsordersordermgr-dworderordermgr) : dw.order.OrderMgr
    * [~Export](#markdown-header-feedsordersexport-modulemodelsexportexport) : [Export](#markdown-header-feedsordersexport-modulemodelsexportexport)
    * [~process(order, parameters, stepExecution)](#markdown-header-feedsordersprocessorder-parameters-stepexecution-voidarray) ⇒ void ⎮ Array

### feeds/orders~exportModel : [Export](#markdown-header-feedsordersexport-modulemodelsexportexport)
**Kind**: inner property of [feeds/orders](#markdown-header-feedsorders)  
### feeds/orders~OrderMgr : dw.order.OrderMgr
**Kind**: inner constant of [feeds/orders](#markdown-header-feedsorders)  
### feeds/orders~Export : [Export](#markdown-header-feedsordersexport-modulemodelsexportexport)
**Kind**: inner constant of [feeds/orders](#markdown-header-feedsorders)  
### feeds/orders~process(order, parameters, stepExecution) ⇒ void ⎮ Array
**Kind**: inner method of [feeds/orders](#markdown-header-feedsorders)  

| Param | Type |
| --- | --- |
| order | dw.order.Order | 
| parameters |  | 
| stepExecution |  | 

## feeds/upload

* [feeds/upload](#markdown-header-feedsupload)
    * [~File](#markdown-header-feedsuploadfile-dwiofile) : dw.io.File
    * [~ServiceRegistry](#markdown-header-feedsuploadserviceregistry-dwsvcserviceregistry) : dw.svc.ServiceRegistry
    * [~Status](#markdown-header-feedsuploadstatus-dwsystemstatus) : dw.system.Status
    * [~registerSFTP(serviceID)](#markdown-header-feedsuploadregistersftpserviceid-dwsvcftpservice) ⇒ dw.svc.FTPService
    * [~createRequest(svc, params)](#markdown-header-feedsuploadcreaterequestsvc-params)

### feeds/upload~File : dw.io.File
**Kind**: inner constant of [feeds/upload](#markdown-header-feedsupload)  
### feeds/upload~ServiceRegistry : dw.svc.ServiceRegistry
**Kind**: inner constant of [feeds/upload](#markdown-header-feedsupload)  
### feeds/upload~Status : dw.system.Status
**Kind**: inner constant of [feeds/upload](#markdown-header-feedsupload)  
### feeds/upload~registerSFTP(serviceID) ⇒ dw.svc.FTPService
**Kind**: inner method of [feeds/upload](#markdown-header-feedsupload)  

| Param | Type |
| --- | --- |
| serviceID | string | 

### feeds/upload~createRequest(svc, params)
**Kind**: inner method of [feeds/upload](#markdown-header-feedsupload)  

| Param | Type |
| --- | --- |
| svc | dw.svc.FTPService | 
| params | Object | 

## init/rest

* [init/rest](#markdown-header-initrest)
    * [~ServiceRegistry](#markdown-header-initrestserviceregistry)
    * [~setAuthHeader(svc)](#markdown-header-initrestsetauthheadersvc)
        * [~authToken](#markdown-header-setauthheaderauthtoken-modulemodelsauthtokenauthtoken) : AuthToken
    * [~isValid401(client)](#markdown-header-initrestisvalid401client-boolean) ⇒ boolean
    * [~isResponseJSON(client)](#markdown-header-initrestisresponsejsonclient-boolean) ⇒ boolean
    * [~parseResponse(svc, client)](#markdown-header-initrestparseresponsesvc-client-object) ⇒ Object
    * [~createRequest(svc)](#markdown-header-initrestcreaterequestsvc)
    * [~parseResponse(svc, client)](#markdown-header-initrestparseresponsesvc-client-object) ⇒ Object
    * [~createRequest(svc)](#markdown-header-initrestcreaterequestsvc)
    * [~createRequest(svc, message)](#markdown-header-initrestcreaterequestsvc-message-string) ⇒ string
    * [~parseResponse(svc, client)](#markdown-header-initrestparseresponsesvc-client-object) ⇒ Object
    * [~createRequest(svc, sendID, customerKey, recipientSendID)](#markdown-header-initrestcreaterequestsvc-sendid-customerkey-recipientsendid)
    * [~createRequest(svc, event)](#markdown-header-initrestcreaterequestsvc-event-string) ⇒ string

### init/rest~ServiceRegistry
Marketing Cloud Connector
REST API webservice
Documentation:
 https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/index-api.htm
 https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/routes.htm

Production Env: https://mc.exacttarget.com
Sandbox Env: https://mc.test.exacttarget.com

Production API: https://www.exacttargetapis.com

**Kind**: inner constant of [init/rest](#markdown-header-initrest)  
### init/rest~setAuthHeader(svc)
Inserts auth token into request header

**Kind**: inner method of [init/rest](#markdown-header-initrest)  
**Throws**:

- Error Throws error when no valid auth token is available (i.e.- service error, service down)


| Param | Type |
| --- | --- |
| svc | dw.svc.HTTPService | 

#### setAuthHeader~authToken : AuthToken
**Kind**: inner property of setAuthHeader  
### init/rest~isValid401(client) ⇒ boolean
Check if 401 due to expired token

**Kind**: inner method of [init/rest](#markdown-header-initrest)  
**Returns**: boolean - true if expired auth token  

| Param | Type |
| --- | --- |
| client | dw.net.HTTPClient | 

### init/rest~isResponseJSON(client) ⇒ boolean
Check if response type is JSON

**Kind**: inner method of [init/rest](#markdown-header-initrest)  

| Param | Type |
| --- | --- |
| client | dw.net.HTTPClient | 

### init/rest~parseResponse(svc, client) ⇒ Object
Parses response JSON and wraps with an object containing additional helper properties

**Kind**: inner method of [init/rest](#markdown-header-initrest)  

| Param | Type |
| --- | --- |
| svc | dw.svc.HTTPService | 
| client | dw.net.HTTPClient | 

### init/rest~createRequest(svc)
Create request for service authentication

**Kind**: inner method of [init/rest](#markdown-header-initrest)  
**Throws**:

- Error Throws error when service credentials are missing


| Param | Type |
| --- | --- |
| svc | dw.svc.HTTPService | 

### init/rest~parseResponse(svc, client) ⇒ Object
**Kind**: inner method of [init/rest](#markdown-header-initrest)  

| Param | Type |
| --- | --- |
| svc | dw.svc.HTTPService | 
| client | dw.net.HTTPClient | 

### init/rest~createRequest(svc)
**Kind**: inner method of [init/rest](#markdown-header-initrest)  

| Param | Type |
| --- | --- |
| svc | dw.svc.HTTPService | 

### init/rest~createRequest(svc, message) ⇒ string
Create request for sending an email

**Kind**: inner method of [init/rest](#markdown-header-initrest)  
**Returns**: string - Request body  

| Param | Type | Description |
| --- | --- | --- |
| svc | dw.svc.HTTPService |  |
| message | Message | A message model instance to be sent to Marketing Cloud |

### init/rest~parseResponse(svc, client) ⇒ Object
**Kind**: inner method of [init/rest](#markdown-header-initrest)  

| Param | Type |
| --- | --- |
| svc | dw.svc.HTTPService | 
| client | dw.net.HTTPClient | 

### init/rest~createRequest(svc, sendID, customerKey, recipientSendID)
Create request for viewing delivery records

**Kind**: inner method of [init/rest](#markdown-header-initrest)  

| Param | Type |
| --- | --- |
| svc | dw.svc.HTTPService | 
| sendID | string | 
| customerKey | string | 
| recipientSendID | string | 

### init/rest~createRequest(svc, event) ⇒ string
Create request for posting an event

**Kind**: inner method of [init/rest](#markdown-header-initrest)  
**Returns**: string - Request body  

| Param | Type | Description |
| --- | --- | --- |
| svc | dw.svc.HTTPService |  |
| event | Event | An event model instance to be sent to Marketing Cloud |

## jobs/compileMappingTemplates

* [jobs/compileMappingTemplates](#markdown-header-jobscompilemappingtemplates)
    * [~mappingObjects](#markdown-header-jobscompilemappingtemplatesmappingobjects-dwutilseekableiterator) : dw.util.SeekableIterator
    * [~CustomObjectMgr](#markdown-header-jobscompilemappingtemplatescustomobjectmgr-dwobjectcustomobjectmgr) : dw.object.CustomObjectMgr
    * [~HookMgr](#markdown-header-jobscompilemappingtemplateshookmgr-dwsystemhookmgr) : dw.system.HookMgr
    * [~Logger](#markdown-header-jobscompilemappingtemplateslogger-dwsystemlogger) : dw.system.Logger
    * [~process(customObject, parameters, stepExecution)](#markdown-header-jobscompilemappingtemplatesprocesscustomobject-parameters-stepexecution-object) ⇒ Object

### jobs/compileMappingTemplates~mappingObjects : dw.util.SeekableIterator
**Kind**: inner property of [jobs/compileMappingTemplates](#markdown-header-jobscompilemappingtemplates)  
### jobs/compileMappingTemplates~CustomObjectMgr : dw.object.CustomObjectMgr
**Kind**: inner constant of [jobs/compileMappingTemplates](#markdown-header-jobscompilemappingtemplates)  
### jobs/compileMappingTemplates~HookMgr : dw.system.HookMgr
**Kind**: inner constant of [jobs/compileMappingTemplates](#markdown-header-jobscompilemappingtemplates)  
### jobs/compileMappingTemplates~Logger : dw.system.Logger
**Kind**: inner constant of [jobs/compileMappingTemplates](#markdown-header-jobscompilemappingtemplates)  
### jobs/compileMappingTemplates~process(customObject, parameters, stepExecution) ⇒ Object
**Kind**: inner method of [jobs/compileMappingTemplates](#markdown-header-jobscompilemappingtemplates)  

| Param | Type |
| --- | --- |
| customObject | dw.object.CustomObject | 
| parameters |  | 
| stepExecution |  | 

## jobs/triggers

* [jobs/triggers](#markdown-header-jobstriggers)
    * [~hookFilter(hook)](#markdown-header-jobstriggershookfilterhook-boolean) ⇒ boolean
    * [~initTriggers()](#markdown-header-jobstriggersinittriggers)

### jobs/triggers~hookFilter(hook) ⇒ boolean
Use with array filter, to filter hooks not matching the communication handler pattern

**Kind**: inner method of [jobs/triggers](#markdown-header-jobstriggers)  
**Returns**: boolean - Whether hook is comm handler  

| Param | Type | Description |
| --- | --- | --- |
| hook | string | The hook path/ID |

### jobs/triggers~initTriggers()
Initializes trigger configurations

**Kind**: inner method of [jobs/triggers](#markdown-header-jobstriggers)  
## models/analytic

* [models/analytic](#markdown-header-modelsanalytic)
    * [~AnalyticEvent](#markdown-header-modelsanalyticanalyticevent)
        * [new AnalyticEvent(analyticEventID)](#markdown-header-new-analyticeventanalyticeventid)
        * [.analyticEventID](#markdown-header-analyticeventanalyticeventid-string) : string
        * [.definition](#markdown-header-analyticeventdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
        * [.customEventName](#markdown-header-analyticeventcustomeventname-string) : string
        * [.attributes](#markdown-header-analyticeventattributes-object) : Object
        * [.template](#markdown-header-analyticeventtemplate-string) : string
        * [.prototype](#markdown-header-analyticeventprototype)
            * [.isEnabled()](#markdown-header-prototypeisenabled-boolean) ⇒ boolean
            * [.trackEvent(data)](#markdown-header-prototypetrackeventdata-objectvoid) ⇒ object ⎮ void
    * [~HookMgr](#markdown-header-modelsanalytichookmgr-dwsystemhookmgr) : dw.system.HookMgr
    * [~StringWriter](#markdown-header-modelsanalyticstringwriter-dwiostringwriter) : dw.io.StringWriter
    * [~velocity](#markdown-header-modelsanalyticvelocity-dwtemplatevelocity) : dw.template.Velocity

### models/analytic~AnalyticEvent
**Kind**: inner class of [models/analytic](#markdown-header-modelsanalytic)  

* [~AnalyticEvent](#markdown-header-modelsanalyticanalyticevent)
    * [new AnalyticEvent(analyticEventID)](#markdown-header-new-analyticeventanalyticeventid)
    * [.analyticEventID](#markdown-header-analyticeventanalyticeventid-string) : string
    * [.definition](#markdown-header-analyticeventdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
    * [.customEventName](#markdown-header-analyticeventcustomeventname-string) : string
    * [.attributes](#markdown-header-analyticeventattributes-object) : Object
    * [.template](#markdown-header-analyticeventtemplate-string) : string
    * [.prototype](#markdown-header-analyticeventprototype)
        * [.isEnabled()](#markdown-header-prototypeisenabled-boolean) ⇒ boolean
        * [.trackEvent(data)](#markdown-header-prototypetrackeventdata-objectvoid) ⇒ object ⎮ void

#### new AnalyticEvent(analyticEventID)
AnalyticEvent constructor


| Param | Type |
| --- | --- |
| analyticEventID | string | 

#### analyticEvent.analyticEventID : string
The instance event ID

**Kind**: instance property of [AnalyticEvent](#markdown-header-new-analyticeventanalyticeventid)  
#### analyticEvent.definition : dw.object.CustomAttributes
Definition object

**Kind**: instance property of [AnalyticEvent](#markdown-header-new-analyticeventanalyticeventid)  
#### analyticEvent.customEventName : string
**Kind**: instance property of [AnalyticEvent](#markdown-header-new-analyticeventanalyticeventid)  
#### analyticEvent.attributes : Object
Expanded attributes from trigger definition

**Kind**: instance property of [AnalyticEvent](#markdown-header-new-analyticeventanalyticeventid)  
#### analyticEvent.template : string
Template filename

**Kind**: instance property of [AnalyticEvent](#markdown-header-new-analyticeventanalyticeventid)  
#### analyticEvent.prototype
**Kind**: instance property of [AnalyticEvent](#markdown-header-new-analyticeventanalyticeventid)  

* [.prototype](#markdown-header-analyticeventprototype)
    * [.isEnabled()](#markdown-header-prototypeisenabled-boolean) ⇒ boolean
    * [.trackEvent(data)](#markdown-header-prototypetrackeventdata-objectvoid) ⇒ object ⎮ void

##### prototype.isEnabled() ⇒ boolean
Returns whether this trigger is enabled

**Kind**: static method of prototype  
##### prototype.trackEvent(data) ⇒ object ⎮ void
Return tracked event based on data mapping, or void if error occurred

**Kind**: static method of prototype  

| Param | Type | Description |
| --- | --- | --- |
| data | object | Data object to be passed to the template |

### models/analytic~HookMgr : dw.system.HookMgr
**Kind**: inner constant of [models/analytic](#markdown-header-modelsanalytic)  
### models/analytic~StringWriter : dw.io.StringWriter
**Kind**: inner constant of [models/analytic](#markdown-header-modelsanalytic)  
### models/analytic~velocity : dw.template.Velocity
**Kind**: inner constant of [models/analytic](#markdown-header-modelsanalytic)  
## models/authToken

* [models/authToken](#markdown-header-modelsauthtoken)
    * [~AuthToken](#markdown-header-modelsauthtokenauthtoken)
        * [new AuthToken()](#markdown-header-new-authtoken)
        * [.token](#markdown-header-authtokentoken-object) : Object
        * [.prototype](#markdown-header-authtokenprototype)
        * [.isValidAuth()](#markdown-header-authtokenisvalidauth-boolean) ⇒ boolean
        * [.getValidToken()](#markdown-header-authtokengetvalidtoken-booleanobject) ⇒ boolean ⎮ Object
    * [~getObject()](#markdown-header-modelsauthtokengetobject-dwobjectcustomattributes) ⇒ dw.object.CustomAttributes
    * [~updateCachedTokenObject(obj)](#markdown-header-modelsauthtokenupdatecachedtokenobjectobj-object) ⇒ Object

### models/authToken~AuthToken
**Kind**: inner class of [models/authToken](#markdown-header-modelsauthtoken)  

* [~AuthToken](#markdown-header-modelsauthtokenauthtoken)
    * [new AuthToken()](#markdown-header-new-authtoken)
    * [.token](#markdown-header-authtokentoken-object) : Object
    * [.prototype](#markdown-header-authtokenprototype)
    * [.isValidAuth()](#markdown-header-authtokenisvalidauth-boolean) ⇒ boolean
    * [.getValidToken()](#markdown-header-authtokengetvalidtoken-booleanobject) ⇒ boolean ⎮ Object

#### new AuthToken()
Token class for checking auth and retrieving valid token

#### authToken.token : Object
Token object returned by Marketing Cloud

**Kind**: instance property of [AuthToken](#markdown-header-new-authtoken)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| accessToken | string | The token auth string |
| expiresIn | number | Expiration in seconds, relative to when requested |
| issued | number | Date issued in milliseconds |
| expires | number | Date expires in milliseconds |

#### authToken.prototype
**Kind**: instance property of [AuthToken](#markdown-header-new-authtoken)  
#### authToken.isValidAuth() ⇒ boolean
Returns whether the stored token is valid

**Kind**: instance method of [AuthToken](#markdown-header-new-authtoken)  
**Returns**: boolean - Whether the stored token is valid and not expired  
#### authToken.getValidToken() ⇒ boolean ⎮ Object
Gets a valid token from storage or from a new auth request

**Kind**: instance method of [AuthToken](#markdown-header-new-authtoken)  
**Returns**: boolean ⎮ Object - False or plain JS object containing the token response  
### models/authToken~getObject() ⇒ dw.object.CustomAttributes
Retrieves cached token from custom object storage
If no existing token object, an empty one is created

**Kind**: inner method of [models/authToken](#markdown-header-modelsauthtoken)  
**Returns**: dw.object.CustomAttributes - Returns token custom attributes  
### models/authToken~updateCachedTokenObject(obj) ⇒ Object
Puts token into custom object storage

**Kind**: inner method of [models/authToken](#markdown-header-modelsauthtoken)  
**Returns**: Object - Returns the same plain JS object  

| Param | Type | Description |
| --- | --- | --- |
| obj | Object | A plain JS object with the token |

## models/dataExport

* [models/dataExport](#markdown-header-modelsdataexport)
    * [~DataExport](#markdown-header-modelsdataexportdataexport)
        * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
        * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
        * [.exportID](#markdown-header-dataexportexportid-string) : string
        * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
        * [.attributes](#markdown-header-dataexportattributes-object) : Object
        * [.header](#markdown-header-dataexportheader-array) : Array
        * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus
        * [.prototype](#markdown-header-dataexportprototype)
        * [.exportID](#markdown-header-dataexportexportid-string) : string
        * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
        * [.attributes](#markdown-header-dataexportattributes-object) : Object
        * [.header](#markdown-header-dataexportheader-array) : Array
        * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus
        * [.prototype](#markdown-header-dataexportprototype)
    * [~DataExport](#markdown-header-modelsdataexportdataexport)
        * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
        * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
        * [.exportID](#markdown-header-dataexportexportid-string) : string
        * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
        * [.attributes](#markdown-header-dataexportattributes-object) : Object
        * [.header](#markdown-header-dataexportheader-array) : Array
        * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus
        * [.prototype](#markdown-header-dataexportprototype)
        * [.exportID](#markdown-header-dataexportexportid-string) : string
        * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
        * [.attributes](#markdown-header-dataexportattributes-object) : Object
        * [.header](#markdown-header-dataexportheader-array) : Array
        * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus
        * [.prototype](#markdown-header-dataexportprototype)
    * [~HookMgr](#markdown-header-modelsdataexporthookmgr-dwsystemhookmgr) : dw.system.HookMgr
    * [~Logger](#markdown-header-modelsdataexportlogger-dwsystemlogger) : dw.system.Logger
    * [~StringWriter](#markdown-header-modelsdataexportstringwriter-dwiostringwriter) : dw.io.StringWriter
    * [~velocity](#markdown-header-modelsdataexportvelocity-dwtemplatevelocity) : dw.template.Velocity

### models/dataExport~DataExport
**Kind**: inner class of [models/dataExport](#markdown-header-modelsdataexport)  

* [~DataExport](#markdown-header-modelsdataexportdataexport)
    * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
    * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
    * [.exportID](#markdown-header-dataexportexportid-string) : string
    * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
    * [.attributes](#markdown-header-dataexportattributes-object) : Object
    * [.header](#markdown-header-dataexportheader-array) : Array
    * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus
    * [.prototype](#markdown-header-dataexportprototype)
    * [.exportID](#markdown-header-dataexportexportid-string) : string
    * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
    * [.attributes](#markdown-header-dataexportattributes-object) : Object
    * [.header](#markdown-header-dataexportheader-array) : Array
    * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus
    * [.prototype](#markdown-header-dataexportprototype)

#### new DataExport(exportID)
DataExport constructor


| Param | Type |
| --- | --- |
| exportID | string | 

#### new DataExport(exportID)
DataExport constructor


| Param | Type |
| --- | --- |
| exportID | string | 

#### dataExport.exportID : string
The export ID

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.definition : dw.object.CustomAttributes
Definition object

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.attributes : Object
Expanded attributes from dataExport definition

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.header : Array
Array header (attributes object values)

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.lastExportStatus : DataExportStatus
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.prototype
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.exportID : string
The export ID

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.definition : dw.object.CustomAttributes
Definition object

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.attributes : Object
Expanded attributes from dataExport definition

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.header : Array
Array header (attributes object values)

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.lastExportStatus : DataExportStatus
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.prototype
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
### models/dataExport~DataExport
**Kind**: inner class of [models/dataExport](#markdown-header-modelsdataexport)  
**Todo**

- [ ] This is intended as an alternative to dataExport.js (which uses runtime mapping). Needs full parity before it can act as replacement


* [~DataExport](#markdown-header-modelsdataexportdataexport)
    * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
    * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
    * [.exportID](#markdown-header-dataexportexportid-string) : string
    * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
    * [.attributes](#markdown-header-dataexportattributes-object) : Object
    * [.header](#markdown-header-dataexportheader-array) : Array
    * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus
    * [.prototype](#markdown-header-dataexportprototype)
    * [.exportID](#markdown-header-dataexportexportid-string) : string
    * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
    * [.attributes](#markdown-header-dataexportattributes-object) : Object
    * [.header](#markdown-header-dataexportheader-array) : Array
    * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus
    * [.prototype](#markdown-header-dataexportprototype)

#### new DataExport(exportID)
DataExport constructor


| Param | Type |
| --- | --- |
| exportID | string | 

#### new DataExport(exportID)
DataExport constructor


| Param | Type |
| --- | --- |
| exportID | string | 

#### dataExport.exportID : string
The export ID

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.definition : dw.object.CustomAttributes
Definition object

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.attributes : Object
Expanded attributes from dataExport definition

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.header : Array
Array header (attributes object values)

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.lastExportStatus : DataExportStatus
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.prototype
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.exportID : string
The export ID

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.definition : dw.object.CustomAttributes
Definition object

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.attributes : Object
Expanded attributes from dataExport definition

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.header : Array
Array header (attributes object values)

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.lastExportStatus : DataExportStatus
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.prototype
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
### models/dataExport~HookMgr : dw.system.HookMgr
**Kind**: inner constant of [models/dataExport](#markdown-header-modelsdataexport)  
### models/dataExport~Logger : dw.system.Logger
**Kind**: inner constant of [models/dataExport](#markdown-header-modelsdataexport)  
### models/dataExport~StringWriter : dw.io.StringWriter
**Kind**: inner constant of [models/dataExport](#markdown-header-modelsdataexport)  
### models/dataExport~velocity : dw.template.Velocity
**Kind**: inner constant of [models/dataExport](#markdown-header-modelsdataexport)  
## models/dataExportStatus

* [models/dataExportStatus](#markdown-header-modelsdataexportstatus)
    * [~DataExportStatus](#markdown-header-modelsdataexportstatusdataexportstatus)
        * [new DataExportStatus(exportID)](#markdown-header-new-dataexportstatusexportid)
        * [.siteID_exportID](#markdown-header-dataexportstatussiteid_exportid-string) : string
        * [._definition](#markdown-header-dataexportstatus_definition-dwobjectcustomattributes) : dw.object.CustomAttributes
        * [.lastExported](#markdown-header-dataexportstatuslastexported-date) : Date
        * [.currentExport](#markdown-header-dataexportstatuscurrentexport-date) : Date
        * [.prototype](#markdown-header-dataexportstatusprototype)

### models/dataExportStatus~DataExportStatus
**Kind**: inner class of [models/dataExportStatus](#markdown-header-modelsdataexportstatus)  

* [~DataExportStatus](#markdown-header-modelsdataexportstatusdataexportstatus)
    * [new DataExportStatus(exportID)](#markdown-header-new-dataexportstatusexportid)
    * [.siteID_exportID](#markdown-header-dataexportstatussiteid_exportid-string) : string
    * [._definition](#markdown-header-dataexportstatus_definition-dwobjectcustomattributes) : dw.object.CustomAttributes
    * [.lastExported](#markdown-header-dataexportstatuslastexported-date) : Date
    * [.currentExport](#markdown-header-dataexportstatuscurrentexport-date) : Date
    * [.prototype](#markdown-header-dataexportstatusprototype)

#### new DataExportStatus(exportID)
DataExportStatus constructor


| Param | Type |
| --- | --- |
| exportID | string | 

#### dataExportStatus.siteID_exportID : string
The site ID + export ID

**Kind**: instance property of [DataExportStatus](#markdown-header-new-dataexportstatusexportid)  
#### dataExportStatus._definition : dw.object.CustomAttributes
Definition object

**Kind**: instance property of [DataExportStatus](#markdown-header-new-dataexportstatusexportid)  
#### dataExportStatus.lastExported : Date
Date last exported

**Kind**: instance property of [DataExportStatus](#markdown-header-new-dataexportstatusexportid)  
#### dataExportStatus.currentExport : Date
Current export date

**Kind**: instance property of [DataExportStatus](#markdown-header-new-dataexportstatusexportid)  
#### dataExportStatus.prototype
**Kind**: instance property of [DataExportStatus](#markdown-header-new-dataexportstatusexportid)  
## models/dataExport

* [models/dataExport](#markdown-header-modelsdataexport)
    * [~DataExport](#markdown-header-modelsdataexportdataexport)
        * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
        * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
        * [.exportID](#markdown-header-dataexportexportid-string) : string
        * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
        * [.attributes](#markdown-header-dataexportattributes-object) : Object
        * [.header](#markdown-header-dataexportheader-array) : Array
        * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus
        * [.prototype](#markdown-header-dataexportprototype)
        * [.exportID](#markdown-header-dataexportexportid-string) : string
        * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
        * [.attributes](#markdown-header-dataexportattributes-object) : Object
        * [.header](#markdown-header-dataexportheader-array) : Array
        * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus
        * [.prototype](#markdown-header-dataexportprototype)
    * [~DataExport](#markdown-header-modelsdataexportdataexport)
        * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
        * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
        * [.exportID](#markdown-header-dataexportexportid-string) : string
        * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
        * [.attributes](#markdown-header-dataexportattributes-object) : Object
        * [.header](#markdown-header-dataexportheader-array) : Array
        * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus
        * [.prototype](#markdown-header-dataexportprototype)
        * [.exportID](#markdown-header-dataexportexportid-string) : string
        * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
        * [.attributes](#markdown-header-dataexportattributes-object) : Object
        * [.header](#markdown-header-dataexportheader-array) : Array
        * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus
        * [.prototype](#markdown-header-dataexportprototype)
    * [~HookMgr](#markdown-header-modelsdataexporthookmgr-dwsystemhookmgr) : dw.system.HookMgr
    * [~Logger](#markdown-header-modelsdataexportlogger-dwsystemlogger) : dw.system.Logger
    * [~StringWriter](#markdown-header-modelsdataexportstringwriter-dwiostringwriter) : dw.io.StringWriter
    * [~velocity](#markdown-header-modelsdataexportvelocity-dwtemplatevelocity) : dw.template.Velocity

### models/dataExport~DataExport
**Kind**: inner class of [models/dataExport](#markdown-header-modelsdataexport)  

* [~DataExport](#markdown-header-modelsdataexportdataexport)
    * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
    * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
    * [.exportID](#markdown-header-dataexportexportid-string) : string
    * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
    * [.attributes](#markdown-header-dataexportattributes-object) : Object
    * [.header](#markdown-header-dataexportheader-array) : Array
    * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus
    * [.prototype](#markdown-header-dataexportprototype)
    * [.exportID](#markdown-header-dataexportexportid-string) : string
    * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
    * [.attributes](#markdown-header-dataexportattributes-object) : Object
    * [.header](#markdown-header-dataexportheader-array) : Array
    * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus
    * [.prototype](#markdown-header-dataexportprototype)

#### new DataExport(exportID)
DataExport constructor


| Param | Type |
| --- | --- |
| exportID | string | 

#### new DataExport(exportID)
DataExport constructor


| Param | Type |
| --- | --- |
| exportID | string | 

#### dataExport.exportID : string
The export ID

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.definition : dw.object.CustomAttributes
Definition object

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.attributes : Object
Expanded attributes from dataExport definition

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.header : Array
Array header (attributes object values)

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.lastExportStatus : DataExportStatus
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.prototype
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.exportID : string
The export ID

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.definition : dw.object.CustomAttributes
Definition object

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.attributes : Object
Expanded attributes from dataExport definition

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.header : Array
Array header (attributes object values)

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.lastExportStatus : DataExportStatus
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.prototype
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
### models/dataExport~DataExport
**Kind**: inner class of [models/dataExport](#markdown-header-modelsdataexport)  
**Todo**

- [ ] This is intended as an alternative to dataExport.js (which uses runtime mapping). Needs full parity before it can act as replacement


* [~DataExport](#markdown-header-modelsdataexportdataexport)
    * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
    * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
    * [.exportID](#markdown-header-dataexportexportid-string) : string
    * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
    * [.attributes](#markdown-header-dataexportattributes-object) : Object
    * [.header](#markdown-header-dataexportheader-array) : Array
    * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus
    * [.prototype](#markdown-header-dataexportprototype)
    * [.exportID](#markdown-header-dataexportexportid-string) : string
    * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
    * [.attributes](#markdown-header-dataexportattributes-object) : Object
    * [.header](#markdown-header-dataexportheader-array) : Array
    * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus
    * [.prototype](#markdown-header-dataexportprototype)

#### new DataExport(exportID)
DataExport constructor


| Param | Type |
| --- | --- |
| exportID | string | 

#### new DataExport(exportID)
DataExport constructor


| Param | Type |
| --- | --- |
| exportID | string | 

#### dataExport.exportID : string
The export ID

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.definition : dw.object.CustomAttributes
Definition object

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.attributes : Object
Expanded attributes from dataExport definition

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.header : Array
Array header (attributes object values)

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.lastExportStatus : DataExportStatus
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.prototype
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.exportID : string
The export ID

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.definition : dw.object.CustomAttributes
Definition object

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.attributes : Object
Expanded attributes from dataExport definition

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.header : Array
Array header (attributes object values)

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.lastExportStatus : DataExportStatus
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.prototype
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
### models/dataExport~HookMgr : dw.system.HookMgr
**Kind**: inner constant of [models/dataExport](#markdown-header-modelsdataexport)  
### models/dataExport~Logger : dw.system.Logger
**Kind**: inner constant of [models/dataExport](#markdown-header-modelsdataexport)  
### models/dataExport~StringWriter : dw.io.StringWriter
**Kind**: inner constant of [models/dataExport](#markdown-header-modelsdataexport)  
### models/dataExport~velocity : dw.template.Velocity
**Kind**: inner constant of [models/dataExport](#markdown-header-modelsdataexport)  
## models/event

* [models/event](#markdown-header-modelsevent)
    * [~Event](#markdown-header-modelseventevent)
        * [new Event(contactKey, eventKey)](#markdown-header-new-eventcontactkey-eventkey)
        * [.contactKey](#markdown-header-contactkey) : [string](#markdown-header-string)
        * [.eventDefinitionKey](#markdown-header-eventdefinitionkey) : [string](#markdown-header-string)
        * [.establishContactKey](#markdown-header-establishcontactkey) : [boolean](#markdown-header-boolean)
        * [.data](#markdown-header-data) : [Object](#markdown-header-object)
        * [.prototype](#markdown-header-prototype)
            * [.setEstablishContactKey(enabled)](#markdown-header-prototypesetestablishcontactkeyenabled-modulemodelseventevent) ⇒ Event
            * [.setDataAttribute(key, value)](#markdown-header-prototypesetdataattributekey-value-modulemodelseventevent) ⇒ Event
            * [.toJSON()](#markdown-header-prototypetojson-object) ⇒ Object
    * [~messageToJson(obj)](#markdown-header-modelseventmessagetojsonobj-object) ⇒ Object

### models/event~Event
**Kind**: inner class of [models/event](#markdown-header-modelsevent)  

* [~Event](#markdown-header-modelseventevent)
    * [new Event(contactKey, eventKey)](#markdown-header-new-eventcontactkey-eventkey)
    * [.contactKey](#markdown-header-contactkey) : [string](#markdown-header-string)
    * [.eventDefinitionKey](#markdown-header-eventdefinitionkey) : [string](#markdown-header-string)
    * [.establishContactKey](#markdown-header-establishcontactkey) : [boolean](#markdown-header-boolean)
    * [.data](#markdown-header-data) : [Object](#markdown-header-object)
    * [.prototype](#markdown-header-prototype)
        * [.setEstablishContactKey(enabled)](#markdown-header-prototypesetestablishcontactkeyenabled-modulemodelseventevent) ⇒ Event
        * [.setDataAttribute(key, value)](#markdown-header-prototypesetdataattributekey-value-modulemodelseventevent) ⇒ Event
        * [.toJSON()](#markdown-header-prototypetojson-object) ⇒ Object

#### new Event(contactKey, eventKey)
Event class


| Param | Type | Description |
| --- | --- | --- |
| contactKey | string | The ID that uniquely identifies a subscriber/contact |
| eventKey | string | The EventDefinitionKey in Event Administration after the event is created and saved |

#### event.contactKey : [string](#markdown-header-string)
Contact key

**Kind**: instance property of [Event](#markdown-header-new-eventcontactkey-eventkey)  
#### event.eventDefinitionKey : [string](#markdown-header-string)
Event definition key

**Kind**: instance property of [Event](#markdown-header-new-eventcontactkey-eventkey)  
#### event.establishContactKey : [boolean](#markdown-header-boolean)
Whether to add contact key to contact model

**Kind**: instance property of [Event](#markdown-header-new-eventcontactkey-eventkey)  
#### event.data : [Object](#markdown-header-object)
Data object
Properties of the event. Only required if defined in a custom event or by the event.

**Kind**: instance property of [Event](#markdown-header-new-eventcontactkey-eventkey)  
#### event.prototype
**Kind**: instance property of [Event](#markdown-header-new-eventcontactkey-eventkey)  

* [.prototype](#markdown-header-prototype)
    * [.setEstablishContactKey(enabled)](#markdown-header-prototypesetestablishcontactkeyenabled-modulemodelseventevent) ⇒ Event
    * [.setDataAttribute(key, value)](#markdown-header-prototypesetdataattributekey-value-modulemodelseventevent) ⇒ Event
    * [.toJSON()](#markdown-header-prototypetojson-object) ⇒ Object

##### prototype.setEstablishContactKey(enabled) ⇒ Event
If true, the contact key is automatically added to the contact model if it isn't already included, making
it available to be injected into the journey. Default is true.

**Kind**: static method of prototype  

| Param | Type |
| --- | --- |
| enabled | boolean | 

##### prototype.setDataAttribute(key, value) ⇒ Event
Set a data attribute

**Kind**: static method of prototype  

| Param | Type |
| --- | --- |
| key | string | 
| value | * | 

##### prototype.toJSON() ⇒ Object
Builds up a formatted object for JSON.stringify()

**Kind**: static method of prototype  
### models/event~messageToJson(obj) ⇒ Object
Recursive method to handle Event during JSON.stringify().
Used to ensure exported JSON is webservice compatible

**Kind**: inner method of [models/event](#markdown-header-modelsevent)  

| Param | Type |
| --- | --- |
| obj | [Event](#markdown-header-new-eventcontactkey-eventkey) ⎮ Object | 

## models/export

* [models/export](#markdown-header-modelsexport)
    * [~Export](#markdown-header-modelsexportexport)
        * [new Export(params, iteratorCallback)](#markdown-header-new-exportparams-iteratorcallback)
        * [.isIncremental](#markdown-header-exportisincremental-boolean) : boolean
        * [.lastExported](#markdown-header-exportlastexported-date) : Date
        * [.header](#markdown-header-exportheader-array) : Array
        * [.dataIterator](#markdown-header-exportdataiterator-dwutiliteratoriterator) : dw.util.Iterator ⎮ Iterator
        * [.prototype](#markdown-header-exportprototype)
            * [.readNext()](#markdown-header-prototypereadnext-void) ⇒ void ⎮ *
            * [.buildRow(data)](#markdown-header-prototypebuildrowdata-arraystring) ⇒ Array.<String>
            * [.writeRow(data)](#markdown-header-prototypewriterowdata)
                * [~rowArr](#markdown-header-writerowrowarr-array) : Array
    * [~File](#markdown-header-modelsexportfile-dwiofile) : dw.io.File
    * [~FileWriter](#markdown-header-modelsexportfilewriter-dwiofilewriter) : dw.io.FileWriter
    * [~CSVStreamWriter](#markdown-header-modelsexportcsvstreamwriter-dwiocsvstreamwriter) : dw.io.CSVStreamWriter

### models/export~Export
**Kind**: inner class of [models/export](#markdown-header-modelsexport)  

* [~Export](#markdown-header-modelsexportexport)
    * [new Export(params, iteratorCallback)](#markdown-header-new-exportparams-iteratorcallback)
    * [.isIncremental](#markdown-header-exportisincremental-boolean) : boolean
    * [.lastExported](#markdown-header-exportlastexported-date) : Date
    * [.header](#markdown-header-exportheader-array) : Array
    * [.dataIterator](#markdown-header-exportdataiterator-dwutiliteratoriterator) : dw.util.Iterator ⎮ Iterator
    * [.prototype](#markdown-header-exportprototype)
        * [.readNext()](#markdown-header-prototypereadnext-void) ⇒ void ⎮ *
        * [.buildRow(data)](#markdown-header-prototypebuildrowdata-arraystring) ⇒ Array.<String>
        * [.writeRow(data)](#markdown-header-prototypewriterowdata)
            * [~rowArr](#markdown-header-writerowrowarr-array) : Array

#### new Export(params, iteratorCallback)

| Param | Type |
| --- | --- |
| params | object | 
| iteratorCallback | function | 

#### export.isIncremental : boolean
**Kind**: instance property of [Export](#markdown-header-new-exportparams-iteratorcallback)  
#### export.lastExported : Date
**Kind**: instance property of [Export](#markdown-header-new-exportparams-iteratorcallback)  
#### export.header : Array
**Kind**: instance property of [Export](#markdown-header-new-exportparams-iteratorcallback)  
#### export.dataIterator : dw.util.Iterator ⎮ Iterator
**Kind**: instance property of [Export](#markdown-header-new-exportparams-iteratorcallback)  
#### export.prototype
**Kind**: instance property of [Export](#markdown-header-new-exportparams-iteratorcallback)  

* [.prototype](#markdown-header-exportprototype)
    * [.readNext()](#markdown-header-prototypereadnext-void) ⇒ void ⎮ *
    * [.buildRow(data)](#markdown-header-prototypebuildrowdata-arraystring) ⇒ Array.<String>
    * [.writeRow(data)](#markdown-header-prototypewriterowdata)
        * [~rowArr](#markdown-header-writerowrowarr-array) : Array

##### prototype.readNext() ⇒ void ⎮ *
Reads next record, void return when reading is complete

**Kind**: static method of prototype  
##### prototype.buildRow(data) ⇒ Array.<String>
Translates object into an array of mapped values

**Kind**: static method of prototype  

| Param | Type |
| --- | --- |
| data | Object | 

##### prototype.writeRow(data)
Writes array of data to file

**Kind**: static method of prototype  

| Param | Type |
| --- | --- |
| data | dw.util.Collection ⎮ Array | 

###### writeRow~rowArr : Array
**Kind**: inner property of writeRow  
### models/export~File : dw.io.File
**Kind**: inner constant of [models/export](#markdown-header-modelsexport)  
### models/export~FileWriter : dw.io.FileWriter
**Kind**: inner constant of [models/export](#markdown-header-modelsexport)  
### models/export~CSVStreamWriter : dw.io.CSVStreamWriter
**Kind**: inner constant of [models/export](#markdown-header-modelsexport)  
## models/message

* [models/message](#markdown-header-modelsmessage)
    * [~Message](#markdown-header-modelsmessagemessage)
        * [new Message(customerKey, [sendID])](#markdown-header-new-messagecustomerkey-sendid)
        * [.from](#markdown-header-messagefrom-object) : Object
        * [.to](#markdown-header-messageto-object) : Object
        * [.options](#markdown-header-messageoptions-object) : Object
        * [.prototype](#markdown-header-messageprototype)
            * [.setFrom(address, [name])](#markdown-header-prototypesetfromaddress-name-modulemodelsmessagemessage) ⇒ Message
            * [.setTo(address)](#markdown-header-prototypesettoaddress-modulemodelsmessagemessage) ⇒ Message
            * [.setAsync(isAsync)](#markdown-header-prototypesetasyncisasync-modulemodelsmessagemessage) ⇒ Message
            * [.setSubscriberAttribute(key, value)](#markdown-header-prototypesetsubscriberattributekey-value-modulemodelsmessagemessage) ⇒ Message
            * [.toJSON()](#markdown-header-prototypetojson-object) ⇒ Object
    * [~messageToJson(obj)](#markdown-header-modelsmessagemessagetojsonobj-object) ⇒ Object
    * [~convertValues(obj)](#markdown-header-modelsmessageconvertvaluesobj-object) ⇒ Object

### models/message~Message
**Kind**: inner class of [models/message](#markdown-header-modelsmessage)  

* [~Message](#markdown-header-modelsmessagemessage)
    * [new Message(customerKey, [sendID])](#markdown-header-new-messagecustomerkey-sendid)
    * [.from](#markdown-header-messagefrom-object) : Object
    * [.to](#markdown-header-messageto-object) : Object
    * [.options](#markdown-header-messageoptions-object) : Object
    * [.prototype](#markdown-header-messageprototype)
        * [.setFrom(address, [name])](#markdown-header-prototypesetfromaddress-name-modulemodelsmessagemessage) ⇒ Message
        * [.setTo(address)](#markdown-header-prototypesettoaddress-modulemodelsmessagemessage) ⇒ Message
        * [.setAsync(isAsync)](#markdown-header-prototypesetasyncisasync-modulemodelsmessagemessage) ⇒ Message
        * [.setSubscriberAttribute(key, value)](#markdown-header-prototypesetsubscriberattributekey-value-modulemodelsmessagemessage) ⇒ Message
        * [.toJSON()](#markdown-header-prototypetojson-object) ⇒ Object

#### new Message(customerKey, [sendID])
Message class


| Param | Type | Description |
| --- | --- | --- |
| customerKey | string | CustomerKey of the entry event send definition. Either this or the SendID is required. |
| [sendID] | string | ID of the entry event send definition. Either this or the customer key is required. |

#### message.from : Object
From object

**Kind**: instance property of [Message](#markdown-header-new-messagecustomerkey-sendid)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The sender's email address |
| name | string | The sender's name |

#### message.to : Object
To object

**Kind**: instance property of [Message](#markdown-header-new-messagecustomerkey-sendid)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The recipient's email address |
| subscriberKey | string | The recipient's unique subscriber key (typically email) |
| contactAttributes | Object | Contact attributes |
| contactAttributes.subscriberAttributes | Object | Subscriber attributes |

#### message.options : Object
Available options

**Kind**: instance property of [Message](#markdown-header-new-messagecustomerkey-sendid)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| requestType | string | The request type. Value can be SYNC or ASYNC (default) |

#### message.prototype
**Kind**: instance property of [Message](#markdown-header-new-messagecustomerkey-sendid)  

* [.prototype](#markdown-header-messageprototype)
    * [.setFrom(address, [name])](#markdown-header-prototypesetfromaddress-name-modulemodelsmessagemessage) ⇒ Message
    * [.setTo(address)](#markdown-header-prototypesettoaddress-modulemodelsmessagemessage) ⇒ Message
    * [.setAsync(isAsync)](#markdown-header-prototypesetasyncisasync-modulemodelsmessagemessage) ⇒ Message
    * [.setSubscriberAttribute(key, value)](#markdown-header-prototypesetsubscriberattributekey-value-modulemodelsmessagemessage) ⇒ Message
    * [.toJSON()](#markdown-header-prototypetojson-object) ⇒ Object

##### prototype.setFrom(address, [name]) ⇒ Message
Set FROM details

**Kind**: static method of prototype  

| Param | Type | Description |
| --- | --- | --- |
| address | string | Sender email address |
| [name] | string | Sender name |

##### prototype.setTo(address) ⇒ Message
Set TO details

**Kind**: static method of prototype  

| Param | Type | Description |
| --- | --- | --- |
| address | string | Recipient email address |

##### prototype.setAsync(isAsync) ⇒ Message
Set ASYNC on/off

**Kind**: static method of prototype  

| Param | Type | Description |
| --- | --- | --- |
| isAsync | boolean | Set true if message should send async |

##### prototype.setSubscriberAttribute(key, value) ⇒ Message
Set a custom subscriber attribute

**Kind**: static method of prototype  

| Param | Type |
| --- | --- |
| key | string | 
| value | * | 

##### prototype.toJSON() ⇒ Object
Builds up a formatted object for JSON.stringify()

**Kind**: static method of prototype  
### models/message~messageToJson(obj) ⇒ Object
Recursive method to handle Message during JSON.stringify().
Used to ensure exported JSON is webservice compatible

**Kind**: inner method of [models/message](#markdown-header-modelsmessage)  

| Param | Type |
| --- | --- |
| obj | [Message](#markdown-header-new-messagecustomerkey-sendid) ⎮ Object | 

### models/message~convertValues(obj) ⇒ Object
Handle value type conversion for Message

**Kind**: inner method of [models/message](#markdown-header-modelsmessage)  

| Param | Type |
| --- | --- |
| obj | Object | 

## models/trigger

* [models/trigger](#markdown-header-modelstrigger)
    * [~Trigger](#markdown-header-modelstriggertrigger)
        * [new Trigger(hookID)](#markdown-header-new-triggerhookid)
        * [.hookID](#markdown-header-triggerhookid-string) : string
        * [.definition](#markdown-header-triggerdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
        * [.attributes](#markdown-header-triggerattributes-object) : Object
        * [.message](#markdown-header-triggermessage-modulemodelsmessagemessage) : Message
        * [.prototype](#markdown-header-triggerprototype)
            * [.isEnabled()](#markdown-header-prototypeisenabled-boolean) ⇒ boolean
        * [.rebuild()](#markdown-header-triggerrebuild)
        * [.newMessage(data)](#markdown-header-triggernewmessagedata-modulemodelsmessagemessage) ⇒ Message
        * [.send()](#markdown-header-triggersend-dwsvcresult) ⇒ dw.svc.Result
            * [~msgSvc](#markdown-header-sendmsgsvc-dwsvcservice) : dw.svc.Service
    * [~getTriggerDefinition(hookID, attributes)](#markdown-header-modelstriggergettriggerdefinitionhookid-attributes-object) ⇒ Object

### models/trigger~Trigger
**Kind**: inner class of [models/trigger](#markdown-header-modelstrigger)  

* [~Trigger](#markdown-header-modelstriggertrigger)
    * [new Trigger(hookID)](#markdown-header-new-triggerhookid)
    * [.hookID](#markdown-header-triggerhookid-string) : string
    * [.definition](#markdown-header-triggerdefinition-dwobjectcustomattributes) : dw.object.CustomAttributes
    * [.attributes](#markdown-header-triggerattributes-object) : Object
    * [.message](#markdown-header-triggermessage-modulemodelsmessagemessage) : Message
    * [.prototype](#markdown-header-triggerprototype)
        * [.isEnabled()](#markdown-header-prototypeisenabled-boolean) ⇒ boolean
    * [.rebuild()](#markdown-header-triggerrebuild)
    * [.newMessage(data)](#markdown-header-triggernewmessagedata-modulemodelsmessagemessage) ⇒ Message
    * [.send()](#markdown-header-triggersend-dwsvcresult) ⇒ dw.svc.Result
        * [~msgSvc](#markdown-header-sendmsgsvc-dwsvcservice) : dw.svc.Service

#### new Trigger(hookID)
Trigger constructor


| Param | Type |
| --- | --- |
| hookID | string | 

#### trigger.hookID : string
The instance hook ID

**Kind**: instance property of [Trigger](#markdown-header-new-triggerhookid)  
#### trigger.definition : dw.object.CustomAttributes
Definition object

**Kind**: instance property of [Trigger](#markdown-header-new-triggerhookid)  
#### trigger.attributes : Object
Expanded attributes from trigger definition

**Kind**: instance property of [Trigger](#markdown-header-new-triggerhookid)  
#### trigger.message : Message
The current Message instance

**Kind**: instance property of [Trigger](#markdown-header-new-triggerhookid)  
#### trigger.prototype
**Kind**: instance property of [Trigger](#markdown-header-new-triggerhookid)  
##### prototype.isEnabled() ⇒ boolean
Returns whether this trigger is enabled

**Kind**: static method of prototype  
#### trigger.rebuild()
Rebuilds trigger definition in Custom Object

**Kind**: instance method of [Trigger](#markdown-header-new-triggerhookid)  
#### trigger.newMessage(data) ⇒ Message
Returns a new Message instance

**Kind**: instance method of [Trigger](#markdown-header-new-triggerhookid)  

| Param | Type | Description |
| --- | --- | --- |
| data | CustomerNotification | Data to populate the Message with. |

#### trigger.send() ⇒ dw.svc.Result
Sends a trigger message

**Kind**: instance method of [Trigger](#markdown-header-new-triggerhookid)  
##### send~msgSvc : dw.svc.Service
**Kind**: inner property of send  
### models/trigger~getTriggerDefinition(hookID, attributes) ⇒ Object
Returns trigger definition for a hook

**Kind**: inner method of [models/trigger](#markdown-header-modelstrigger)  

| Param | Type |
| --- | --- |
| hookID | string | 
| attributes | Object | 

## int_marketing_cloud : Object
Registry object


* [int_marketing_cloud](#markdown-header-int_marketing_cloud-object) : Object
    * [.authToken()](#markdown-header-int_marketing_cloudauthtoken-modulemodelsauthtokenauthtoken) ⇒ AuthToken
        * [~model](#markdown-header-authtokenmodel-modulemodelsauthtokenauthtoken) : AuthToken
    * [.event(contactKey, eventKey)](#markdown-header-int_marketing_cloudeventcontactkey-eventkey-modulemodelseventevent) ⇒ Event
        * [~model](#markdown-header-model) : [Event](#markdown-header-event)
    * [.analyticEvent(analyticEventID)](#markdown-header-int_marketing_cloudanalyticeventanalyticeventid-modulemodelsanalyticanalyticevent) ⇒ AnalyticEvent
        * [~model](#markdown-header-analyticeventmodel-modulemodelsanalyticanalyticevent) : AnalyticEvent
    * [.dataExport(exportID)](#markdown-header-int_marketing_clouddataexportexportid-modulemodelsdataexportdataexport) ⇒ DataExport
        * [~model](#markdown-header-dataexportmodel-modulemodelsdataexportdataexport) : DataExport
    * [.message(customerKey, sendID)](#markdown-header-int_marketing_cloudmessagecustomerkey-sendid-modulemodelsmessagemessage) ⇒ Message
        * [~model](#markdown-header-messagemodel-modulemodelsmessagemessage) : Message
    * [.trigger(hookID)](#markdown-header-int_marketing_cloudtriggerhookid-modulemodelstriggertrigger) ⇒ Trigger
        * [~model](#markdown-header-triggermodel-modulemodelstriggertrigger) : Trigger

### int_marketing_cloud.authToken() ⇒ AuthToken
**Kind**: static method of [int_marketing_cloud](#markdown-header-int_marketing_cloud-object)  
**Returns**: [AuthToken](#markdown-header-new-authtoken) - Instance of AuthToken  
#### authToken~model : AuthToken
**Kind**: inner property of authToken  
### int_marketing_cloud.event(contactKey, eventKey) ⇒ Event
**Kind**: static method of [int_marketing_cloud](#markdown-header-int_marketing_cloud-object)  
**Returns**: [Event](#markdown-header-new-eventcontactkey-eventkey) - Instance of Event  

| Param | Type | Description |
| --- | --- | --- |
| contactKey | string | The ID that uniquely identifies a subscriber/contact |
| eventKey | string | The EventDefinitionKey in Event Administration after the event is created and saved |

#### event~model : [Event](#markdown-header-event)
**Kind**: inner property of event  
### int_marketing_cloud.analyticEvent(analyticEventID) ⇒ AnalyticEvent
**Kind**: static method of [int_marketing_cloud](#markdown-header-int_marketing_cloud-object)  
**Returns**: [AnalyticEvent](#markdown-header-new-analyticeventanalyticeventid) - Instance of AnalyticEvent  

| Param | Type | Description |
| --- | --- | --- |
| analyticEventID | string | The analytic event ID |

#### analyticEvent~model : AnalyticEvent
**Kind**: inner property of analyticEvent  
### int_marketing_cloud.dataExport(exportID) ⇒ DataExport
**Kind**: static method of [int_marketing_cloud](#markdown-header-int_marketing_cloud-object)  
**Returns**: [DataExport](#markdown-header-new-dataexportexportid) - Instance of DataExport  

| Param | Type | Description |
| --- | --- | --- |
| exportID | string | The data export ID |

#### dataExport~model : DataExport
**Kind**: inner property of dataExport  
### int_marketing_cloud.message(customerKey, sendID) ⇒ Message
**Kind**: static method of [int_marketing_cloud](#markdown-header-int_marketing_cloud-object)  
**Returns**: [Message](#markdown-header-new-messagecustomerkey-sendid) - Instance of Message  

| Param | Type | Description |
| --- | --- | --- |
| customerKey | string | CustomerKey of the entry event send definition. Either this or the SendID is required. |
| sendID | string | ID of the entry event send definition. Either this or the customer key is required. |

#### message~model : Message
**Kind**: inner property of message  
### int_marketing_cloud.trigger(hookID) ⇒ Trigger
**Kind**: static method of [int_marketing_cloud](#markdown-header-int_marketing_cloud-object)  
**Returns**: [Trigger](#markdown-header-new-triggerhookid) - Instance of Trigger  

| Param | Type | Description |
| --- | --- | --- |
| hookID | string | The trigger hook ID |

#### trigger~model : Trigger
**Kind**: inner property of trigger  
## util/helpers

* [util/helpers](#markdown-header-utilhelpers)
    * _static_
        * [.isObject(obj)](#markdown-header-utilhelpersisobjectobj-boolean) ⇒ boolean
        * [.ucfirst(str)](#markdown-header-utilhelpersucfirststr-string) ⇒ string
        * [.dwValue(obj)](#markdown-header-utilhelpersdwvalueobj-) ⇒ *
    * _inner_
        * [~RequiredAttributeException](#markdown-header-utilhelpersrequiredattributeexception)
            * [new RequiredAttributeException(attribute, [message])](#markdown-header-new-requiredattributeexceptionattribute-message)
        * [~expandAttributes(attrJSON)](#markdown-header-utilhelpersexpandattributesattrjson-object) ⇒ Object
        * [~getCustomObject(customObjectName, objectID, [createIfNotExists])](#markdown-header-utilhelpersgetcustomobjectcustomobjectname-objectid-createifnotexists-dwobjectcustomattributes) ⇒ dw.object.CustomAttributes
        * [~mergeAttributes(newAttributes, oldAttributes)](#markdown-header-utilhelpersmergeattributesnewattributes-oldattributes)
        * [~getParamValue(attr, data)](#markdown-header-utilhelpersgetparamvalueattr-data-) ⇒ *
        * [~mapValues(obj, data, outputCallback)](#markdown-header-utilhelpersmapvaluesobj-data-outputcallback)
        * [~objValues(obj)](#markdown-header-utilhelpersobjvaluesobj-array) ⇒ Array
        * [~buildSimpleArrayFromIterable(valueKey, iterable, fallbackData)](#markdown-header-utilhelpersbuildsimplearrayfromiterablevaluekey-iterable-fallbackdata-array) ⇒ Array
        * [~buildMappedArrayFromIterable(objMap, iterable, fallbackData)](#markdown-header-utilhelpersbuildmappedarrayfromiterableobjmap-iterable-fallbackdata-array) ⇒ Array
        * [~mappingFilter(key, val, data)](#markdown-header-utilhelpersmappingfilterkey-val-data)
        * [~isNonEmptyString(str)](#markdown-header-utilhelpersisnonemptystringstr-boolean) ⇒ boolean
        * [~stripXmlNS(xmlStr)](#markdown-header-utilhelpersstripxmlnsxmlstr-string) ⇒ string

### util/helpers.isObject(obj) ⇒ boolean
Checks if submitted value type is an Object (and not an Array)

**Kind**: static method of [util/helpers](#markdown-header-utilhelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | * | Object to be checked |

### util/helpers.ucfirst(str) ⇒ string
Uppercases first char of string

**Kind**: static method of [util/helpers](#markdown-header-utilhelpers)  

| Param | Type | Description |
| --- | --- | --- |
| str | string | String to uppercase |

### util/helpers.dwValue(obj) ⇒ *
Returns an object's preferred value, based on what DW object type it represents

**Kind**: static method of [util/helpers](#markdown-header-utilhelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | * | Object to use for value return |

### util/helpers~RequiredAttributeException
**Kind**: inner class of [util/helpers](#markdown-header-utilhelpers)  
#### new RequiredAttributeException(attribute, [message])
Custom error, thrown when required attribute is missing.


| Param | Type | Description |
| --- | --- | --- |
| attribute | string | Attribute that is missing |
| [message] | string | Optional custom message |

### util/helpers~expandAttributes(attrJSON) ⇒ Object
Expands JSON attributes

**Kind**: inner method of [util/helpers](#markdown-header-utilhelpers)  

| Param | Type |
| --- | --- |
| attrJSON | string | 

### util/helpers~getCustomObject(customObjectName, objectID, [createIfNotExists]) ⇒ dw.object.CustomAttributes
Fetches object definition from Custom Object, creating it if not exists

**Kind**: inner method of [util/helpers](#markdown-header-utilhelpers)  

| Param | Type |
| --- | --- |
| customObjectName | string | 
| objectID | string | 
| [createIfNotExists] | boolean | 

### util/helpers~mergeAttributes(newAttributes, oldAttributes)
Merges attribute JS objects in place, preserving old values

**Kind**: inner method of [util/helpers](#markdown-header-utilhelpers)  

| Param | Type |
| --- | --- |
| newAttributes | Object | 
| oldAttributes | Object | 

### util/helpers~getParamValue(attr, data) ⇒ *
Returns parameter value from data (uses recursion)

**Kind**: inner method of [util/helpers](#markdown-header-utilhelpers)  

| Param | Type | Description |
| --- | --- | --- |
| attr | string | Period-delimited path to a parameter |
| data | Array ⎮ Object |  |

### util/helpers~mapValues(obj, data, outputCallback)
Handles object key/value mapping, writes to callback that accepts key and value as params

**Kind**: inner method of [util/helpers](#markdown-header-utilhelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | Object | Keys serve as the value path, Values serve as the key to be written to |
| data | Array ⎮ Object | Source of data that should provide values to be mapped. Should be an object, or an array of objects |
| outputCallback | function | Callback that is executed with resulting key and value. Signature: function(key, value) |

### util/helpers~objValues(obj) ⇒ Array
Return object values as an array

**Kind**: inner method of [util/helpers](#markdown-header-utilhelpers)  

| Param | Type |
| --- | --- |
| obj | Object | 

### util/helpers~buildSimpleArrayFromIterable(valueKey, iterable, fallbackData) ⇒ Array
Build a simple array of values from a collection

**Kind**: inner method of [util/helpers](#markdown-header-utilhelpers)  

| Param | Type | Description |
| --- | --- | --- |
| valueKey | string | The key to be fetched from each item in collection |
| iterable | Array ⎮ dw.util.List | Array or List to iterate |
| fallbackData | Object | Fallback data object |

### util/helpers~buildMappedArrayFromIterable(objMap, iterable, fallbackData) ⇒ Array
Build an array of objects from a collection

**Kind**: inner method of [util/helpers](#markdown-header-utilhelpers)  

| Param | Type | Description |
| --- | --- | --- |
| objMap | Object | Keys serve as the value path, Values serve as the key to be written to |
| iterable | Array ⎮ dw.util.List | Array or List to iterate |
| fallbackData | Object | Fallback data object |

### util/helpers~mappingFilter(key, val, data)
Mapping callback, called by helpers.mapValues()

**Kind**: inner method of [util/helpers](#markdown-header-utilhelpers)  
**Throws**:

- [RequiredAttributeException](#markdown-header-new-requiredattributeexceptionattribute-message) 


| Param | Type | Description |
| --- | --- | --- |
| key | string ⎮ Object | The data map definition. Object = complex definition |
| val | * | The value mapped by helpers.getParamValue() |
| data | Object | Source of data, used when mapped value is a callback itself |

### util/helpers~isNonEmptyString(str) ⇒ boolean
**Kind**: inner method of [util/helpers](#markdown-header-utilhelpers)  

| Param | Type |
| --- | --- |
| str | * | 

### util/helpers~stripXmlNS(xmlStr) ⇒ string
Strip XML namespace (interferes with MC xml parser otherwise)

**Kind**: inner method of [util/helpers](#markdown-header-utilhelpers)  

| Param |
| --- |
| xmlStr | 

## velocity : dw.template.Velocity
**Kind**: global variable  
## HookMgr : dw.system.HookMgr
**Kind**: global variable  
## velocity : dw.template.Velocity
**Kind**: global variable  
## buildCustomer(requestData) ⇒ Object
Build customer data for setUserInfo

**Kind**: global function  

| Param | Type |
| --- | --- |
| requestData | Object | 

## buildBasket() ⇒ Object ⎮ Object
Builds basket object

**Kind**: global function  
### buildBasket~basket : dw.order.Basket
**Kind**: inner property of buildBasket  
## buildOrder(orderID) ⇒ Object
Builds order object

**Kind**: global function  

| Param | Type |
| --- | --- |
| orderID | string | 

### buildOrder~order : dw.order.Order
**Kind**: inner property of buildOrder  
## buildCartItems(lineItems) ⇒ Array.<Object>
Build cart items, used by both buildBasket and buildOrder

**Kind**: global function  

| Param | Type |
| --- | --- |
| lineItems | dw.util.Collection | 

## buildLineItem(pli) ⇒ Object
Build product line items

**Kind**: global function  

| Param | Type |
| --- | --- |
| pli | dw.order.ProductLineItem | 

## buildCustomEvent(eventID, dataObject) ⇒ Object
Builds event details using custom mapping

**Kind**: global function  

| Param | Type |
| --- | --- |
| eventID | string | 
| dataObject | Object | 

### buildCustomEvent~AnalyticEvent : AnalyticEvent
**Kind**: inner constant of buildCustomEvent  
## trackCached()
Registered hook for app.tracking.trackCached

**Kind**: global function  
## eventsInit(requestData)
Registered hook for app.tracking.preEvents

**Kind**: global function  

| Param | Type |
| --- | --- |
| requestData | Object | 

## requestEvent(eventName, eventValue, requestData)
Registered hook for app.tracking.event

**Kind**: global function  

| Param | Type |
| --- | --- |
| eventName | string | 
| eventValue | * | 
| requestData | Object | 

## eventsOutput(requestData)
Registered hook for app.tracking.postEvents

**Kind**: global function  

| Param | Type |
| --- | --- |
| requestData | Object | 

## cachedTrackingLink()
Registered hook for app.tracking.cachedTrackingLink

**Kind**: global function  
