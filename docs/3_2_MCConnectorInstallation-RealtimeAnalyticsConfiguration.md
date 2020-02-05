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
	
	3.1.1 [Triggered Send Configuration](3_1_1_MCConnectorInstallation-TriggeredSendConfiguration.md#navlink)
	
	3.2 [**Realtime Analytics Configuration**](3_2_MCConnectorInstallation-RealtimeAnalyticsConfiguration.md#navlink)
	
11. [Additional Features](4_0_AdditionalFeatures.md#navlink)
12. [Debugging](5_0_Debugging.md#navlink)

<a name="navlink"></a>
## 3.2 Realtime Analytics Configuration 

You can use the Predictive Web feature, also referred to as Analytics or collect.js, to track customer activity throughout your storefront. You can use the information can be used to power personalized recommendations, and facilitate abandoned cart, search, or browse journeys.

The Predictive Web feature is part of Personalization Builder. To ensure that you set up Personalization Builder correctly, work with your Marketing Cloud representative.

A Personalization Builder wizard walks you through the setup process. You can define whether you want to personalize products, content, or both. You also define additional fields that you want to store within the product and content catalog to be used for recommendation behavior.
Work with your Marketing Cloud representative to address questions or concerns that arise.

## Events

Marketing Cloud Connectors Analytics functionality supports configurable event tracking using a field-mapping approach similar to triggers and data feeds.  
The connector also supports custom events that can output based on predefined storefront event occurrences.

### Available Events

- search
    - Endpoints: `Search-Show`
    - Required params: `q`
    - Event value: Search string
- category
    - Endpoints: `Search-Show`
    - Required params: `cgid`
    - Event value: Category ID
- content
    - Endpoints: `Page-Show`
    - Required params: `cid`
    - Event value: Content ID
- product
    - Endpoints: `Product-Show`, `Product-ShowInCategory`
    - Required params: `pid`
    - Event value: Product ID
- cartAddProduct
    - Endpoints: `Cart-AddProduct`
    - Required params: `pid`
    - Event value: Product ID
- viewCart
    - Endpoints: `Cart-Show`
- cartAddCoupon
    - Endpoints: `Cart-SubmitForm`
    - Required Form ID: `cart`
    - Required Form Action: `addCoupon`
    - Event value: Submitted coupon code
- wishlistAddProduct
    - Endpoints: `Wishlist-Add`
    - Required params: `pid`
    - Event value: Product ID
- registryAddProduct
    - Endpoints: `GiftRegistry-AddProduct`
    - Required params: `pid`
    - Event value: Product ID
- checkout
    - Endpoints: `COCustomer-Start`, `COShipping-Start`, `COBilling-Start`, `COSummary-Start`
    - Event value: Current step number, i.e. - `step0`, `step1`, `step2`, or `step3`
- coShipping
    - Endpoints: `COShipping-SingleShipping`
    - Required Form ID: `singleshipping`
    - Required Form Action: `save`
    - Event value: `submitted`
- coBilling
    - Endpoints: `COBilling-Billing`
    - Required Form ID: `billing`
    - Required Form Action: `save`
    - Event value: `submitted`
- mailingListSubscribed
    - Endpoints: `COBilling-Billing`
    - Required Form ID: `billing`
    - Required Form Action: `save`
    - Event value: Submitted email address (this event fires only when the subscribe option is enabled)
- coSummary
    - Endpoints: `COSummary-Submit`
    - Event value: `submitted`
- orderConfirmation
    - Endpoints: `COSummary-Submit`
    - Event value: Order ID string
- basketUpdated
    - Fires when the basket etag hash has changed
- ajaxRequest
    - Fires when an Ajax template is requested

#### Custom Events

Custom events can be fired when any available event occurs. You can name a custom event anything you want.  

**Note**: Custom events are sent to Marketing Cloud using the collect.js `trackEvent` method. This data might not be usable on the Marketing Cloud side, so we recommend that you speak with your representative to confirm. To ensure that custom event data is always available in some form, custom event data is also added to the `setUserInfo` method. Work with your representative to ensure that you can react to information set on the user profile.

All custom events have the following attributes available for data mapping:

- EventName
    - Type: `string`
    - Example value: `product`
- EventValue
    - Type: `string`
    - Example value: `123MyProductID`
- RequestData
    - Type: `object`
    - Structure:
        - `RequestData.origBasketState` (`string` - hash value representing the state of the basket at the start of the request)
        - `RequestData.request.requestID` (`string` - base request ID)
        - `RequestData.request.referer` (`string` - referrer according to last clickstream)
        - `RequestData.request.urlPath` (`string` - URL path according to last clickstream)
        - `RequestData.request.queryString` (`string` - request query string according to last clickstream)
        - `RequestData.request.triggeredForm.formID` (`string` - submitted form ID)
        - `RequestData.request.triggeredForm.actionID` (`string` - submitted form action)
        - `RequestData.request.params` (`object` - submitted URL parameters)
        - `RequestData.request.clickstreamPipeline` (`string` - the last requested pipeline)
        - `RequestData.request.detectedController.controller` (`string` - detected controller that is executing)
        - `RequestData.request.detectedController.method` (`string` - detected controller method that is executing)
        - `RequestData.request.isAjaxRequest` (`boolean` - whether current request is Ajax based)
        - `RequestData.events` (`array` - each entry is an array of the event name and possible additional parameter)
- Session
    - Type: `dw.system.Session`
- Customer
    - Type: `dw.customer.Customer`
- Basket
    - Type: `dw.order.Basket`

If you want to introduce your own events to be used for tracking,use something like this:

```
const HookMgr = require('dw/system/HookMgr');
var hookID = 'app.tracking.getDataLayer';
var dataLayer = HookMgr.callHook(
    hookID,
    hookID.slice(hookID.lastIndexOf('.') + 1)
);

dataLayer.events.push(['some-custom-event-ID', 'some-custom-event-value']);
```

For more information, review the code for pre-defined events, found in the [Handler Framework's tracking data layer](https://github.com/SalesforceCommerceCloud/handler-framework/tree/develop/cartridges/int_handlerframework/cartridge/scripts/tracking).

- - -

[Back to the top](#Top)