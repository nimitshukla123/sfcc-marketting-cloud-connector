<a name="Top"></a>
# marketing-cloud-connector: 


### Navigation
1. [Project Overview](1_0_Project_Overview.md#navlink)
2. [Install B2C Commerce Components](2_0_Commerce_Cloud_Component_Installation.md#navlink)
	
	2.1 [Handler Framework Installation](2_1_Handler-Installation.md#navlink)
	
	2.2 [Marketing Cloud Cartridge Installation](2_2_MarketingCloudCart.md#navlink)
	
	2.3 [**SFRA Modification Instructions**](2_3_Modification-Instructions-for-SFRA.md#navlink)
	
	2.4 [SiteGenesis Modification Instructions](2_4_Modification-Instructions-for-SiteGenesis.md#navlink)
			
	2.5 [Manual Modification Instructions](2_5_ManualModifications.md#navlink)

7. [Install Marketing Cloud Components](3_0_ModifyMarketingCloud.md#navlink)

	3.1 [Triggered Send and Transactional Emails](3_1_0_TriggeredSendTransactionalEmails.md#navlink)
	
	3.1.1 [Triggered Send Configuration](3_1_1_MCConnectorInstallation-TriggeredSendConfiguration.md#navlink)
	
	3.2. [Realtime Analytics Configuration](3_2_MCConnectorInstallation-RealtimeAnalyticsConfiguration.md#navlink)
	
11. [Additional Features](4_0_AdditionalFeatures.md#navlink)
12. [Debugging](5_0_Debugging.md#navlink)

<a name="navlink"></a>
## 2.3 SFRA Modification Instructions 
<a name="Overlay"></a>
### Using the SFRA Overlay Cartridge

The release of the Marketing Cloud Connector version 2.0.0, includes the _plugin\_marketing\_cloud_ cartridge.  This cartridge overlays the SFRA main cartridge (_app\_storefront\_base_) and replaces the functionality to activate the Marketing Cloud Connector hooks.  It contains all the changes the manual modifications instructions advise you to make. You still need to import and configure the metadata and custom objects, but you don't have to manually cut and paste all the code from these instructions into your SFRA.

After loading the _plugin\_marketing\_cloud_ cartridge, adjust your cartridge path to look like:
`plugin_marketing_cloud:app_storefront_base:int_marketing_cloud:int_handlerframework`

**Note:** These instructions apply only to Version 2.0.0 of the Marketing Cloud Connector after the merging of [Pull Request 27](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/pull/27).  If you're using a previous release, use the [Manual Modification Instructions](2_5_ManualModifications.md#navlink).

- - -

[Back to the top](#Top)