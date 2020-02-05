<a name="Top"></a>
# marketing-cloud-connector

### Navigation
1. [Project Overview](1_0_Project_Overview.md#navlink)
2. [Install Commerce Cloud Components](2_0_Commerce_Cloud_Component_Installation.md#navlink)
	
	2.1 [Handler Framework Installation](2_1_Handler-Installation.md#navlink)
	
	2.2 [Marketing Cloud Cartridge Installation](2_2_MarketingCloudCart.md#navlink)
	
	2.3 [SFRA Modification Instructions](2_3_Modification-Instructions-for-SFRA.md#navlink)
	
	2.4 [SiteGenesis Modification Instructions](2_4_Modification-Instructions-for-SiteGenesis.md#navlink)
		
	2.5 [Manual Modification Instructions](2_5_ManualModifications.md#navlink)

7. [**Install Marketing Cloud Components**](3_0_ModifyMarketingCloud.md#navlink)

	3.1 [Triggered Send and Transactional Emails](3_1_0_TriggeredSendTransactionalEmails.md#navlink)
	
	3.1.1 [Triggered Send Configuration](3_1_1_MCConnectorInstallation-TriggeredSendConfiguration.md#navlink)
	
	3.2 [Realtime Analytics Configuration](3_2_MCConnectorInstallation-RealtimeAnalyticsConfiguration.md#navlink)
	
11. [Additional Features](4_0_AdditionalFeatures.md#navlink)
12. [Debugging](5_0_Debugging.md#navlink)

<a name="navlink"></a>
## 3. Install Marketing Cloud Components

The next step in connecting Commerce Cloud to Marketing Cloud is installing the Marketing Cloud components. 
 
## Marketing Cloud App and API Key

You must install the Marketing Cloud app and API key for each Commerce Cloud Business Unit that you want to connect with.

See [Salesforce Developers App Center](https://developer.salesforce.com/docs/atlas.en-us.mc-getting-started.meta/mc-getting-started/get-api-key.htm) for more information.

1. Log in to App Center.

    Create an App Center account if you don't already have one.
	
	See the [Salesforce Developers App Center Overview](https://developer.salesforce.com/docs/atlas.en-us.mc-getting-started.meta/mc-getting-started/app-center.htm) for more information.

3. If necessary, create a package.

	See [Create and Install Enhanced Package](https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/create-integration-enhanced.htm) for additional information.
	
	
4. Create an API Integration component.

	See [Create an API Integration in Enhanced Package](https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/create-integration-enhanced.htm) for more information.
	
	1. Select the Server-to-Server Integration type.
	2. Set the following Scope properties:
		 
		- Channels - Email: Send
		- Data - Data Extensions: Read and Write
	3. Save the component.

5. Save the Details page for your records.

## Postman Automation

A Postman automation script is provided to expedite the setup of Marketing Cloud data extensions and email templates for the transactional use cases supported by the Commerce-to-Marketing Connector. 

To manually set up the data extensions and email templates, see [3.1.1 Triggered Send Configuration](3_1_1_MCConnectorInstallation-TriggeredSendConfiguration.md#navlink). 

### Prerequisites


1. Install Postman and import the Postman scripts from the `/POSTMAN` directory.
2. Install the legacy package to make API calls.
3. Verify that Send Management is configured correctly and that the From Email address is correct.
4. Get the Auth, SOAP, Rest Endpoints, Client Id, and Client Secret information.
5. Enable SOAP calls in the Marketing Cloud account for the user, which is disabled by default.
6. Add */service.asmx* to the end of the SOAP URL while populating the SoapEndPoint variable.
7. Enable username and password for web service calls.
8. Use the legacy package client credentials to request an access token.
9. Enter the requisite values.

### Variables

| Variable Name | Notes |
|---------------|-------|
| soapEndPoint | Information is located in the installed package. Be sure to add the suffix */service.asmx* |
| soapUserName | You use this username to login to the Marketing Cloud Account. |
| soapPassword | You use this password to login to the Marketing Cloud Account. |
| restEndPoint | Information is located in the installed package. |
| authEndPoint | Information is located in the installed package. |
| clientId | Information is located in the installed package. |
| clientSecret | Information is located in the installed package. |
| sfmcClientId | MID |

### Scripts

Execute the scripts in the following order.


1. Auth : Request SFMC Token - This step saves the auth token.
2. General: Gets the data extension template ID's and stores them in the variables.
3. Account Created.
4. Account Updated.
5. Account Locked.
6. Account Password Changed.
7. Account Password Reset.
8. Customer Service - Contact Us.
9. Gift Certificate - Send.
10. Order Confirmation.

### Debugging


1. Check the response.
2. If the response is not clear, check if all variables have been filled.
3. If steps 1 and 2 do not work, type the variables directly in the SOAP or REST body and try again.

- - -

[Back to the top](#Top)
