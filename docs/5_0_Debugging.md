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
	
	3.2 [Realtime Analytics Configuration](3_2_MCConnectorInstallation-RealtimeAnalyticsConfiguration.md#navlink)
	
11. [Additional Features](4_0_AdditionalFeatures.md#navlink)
12. [**Debugging**](5_0_Debugging.md#navlink)

<a name="navlink"></a>
## 5. Debugging 
<a name="Log"></a>
## B2C Commerce Log Settings

To turn on the debug logs:

1. In Business Manager, navigate to **Administrator > Operations > Custom Log Settings**.
	2. Choose Log level as the Debug for Log Category root.
	3. Add email . to custom log targets.

1. Navigate to **Merchant Tools > Custom Objects > Custom Objects**

	1. For Object Type, select *CommunicationHandlers*, and click **Find**.
	2. Click to edit development object.
	
		The JSON object appears with two top-level properties: 
		 - standard_email 
		 - int\_marketing\_cloud
	4. Make sure int\_marketing\_cloud is enabled, and standard_email is disabled, and click **Apply**.
	5. Select *MarketingCloudTriggers* from Object Type, and click **Find**.
	6. Edit each entry. 
	
		Each trigger has a trigger key that maps it to Marketing Cloud. Enter the external key that we got from the Triggered Send. You can directly enable or disable each trigger. Additionally, a list of subscriber attributes is defined, which is a mapping of available values from B2C Commerce, to the matching attribute key recognized by Marketing Cloud.
	
<a name="Synch"></a>
## Synchronous Promise Errors

If debugging indicates `SynchronousPromise.js` errors, make sure that the file is placed in a directory where the function can be accessed globally, such as the module directory.

To debug, use a client to ease web request testing such as [Restlet Client](https://restlet.com/modules/client/?utm_source=DHC).

Below are some sample calls to perform direct API testing. The host value varies vary based on what Marketing Cloud instance you're connecting to.

<a name="Auth"></a>
## Authorization Token Request 

Request an API token (replace `Host value`, `CLIENTID`, and `CLIENTSECRETVALUE`).

```
POST /v1/requestToken HTTP/1.1
Content-Length: 90
Host: auth-s7.exacttargetapis.com
Content-Type: application/json

{
  "clientId": "CLIENTID",
  "clientSecret": "CLIENTSECRETVALUE"
}

HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
X-Mashery-Responder: 01-15
Vary: Origin
X-Mashery-Message-ID: a079376e-919e-4c1a-830c-31bc07cd6704
Content-Encoding: gzip
Content-Type: application/json
Content-Length: 78
Date: Mon, 14 Aug 2017 14:31:35 GMT

{"accessToken":"NEWACCESSTOKEN","expiresIn":3479}
```

**Important**: For all requests other than auth, you need to include an Authorization header with the value of `accessToken`. 

<a name="SentMsg"></a>
## Sent Message Status 

After you have issued a triggered send, the response value contains a `location` header. This location gives you a follow-up URL to request the status of the sent message. 

That location value has been requested here.

```
GET /messaging/v1/messageDefinitionSends/be52dfb1-134a-e711-ada2-38eaa791d4a1/deliveryRecords/a408d926-e100-46ce-aef5-a576520668ec HTTP/1.1
Authorization: Bearer NEWACCESSTOKEN
Cache-Control: no-cache
Host: www.exacttargetapis.com

HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
X-Mashery-Responder: 03-23
Vary: Origin
X-Mashery-Message-ID: b8c6d6b8-52c4-45bf-a3af-3f1dcc22ac08
Content-Encoding: gzip
Content-Type: application/json;charset=UTF-8
Content-Length: 206
Date: Mon, 14 Aug 2017 14:30:43 GMT

{"deliveryTime":"2017-08-08T09:23:52.517","id":"be52dfb1-134a-e711-ada2-38eaa791d4a1","messageId":"a408d926-e100-46ce-aef5-a576520668ec","status":"Sent","to":{"address":"jlangevin+customerservice@salesforce.com","id":50069331,"key":"jlangevin+customerservice@salesforce.com"}}
```

## Integration Testing

We now have integration tests that use the same process as SFRA. Refer to the SFRA Readme documentation for procedural testing information.

[Storefront Reference Architecture (SFRA) Readme](https://github.com/SalesforceCommerceCloud/storefront-reference-architecture/blob/master/README.md)


- - -

[Back to the top](#Top)
