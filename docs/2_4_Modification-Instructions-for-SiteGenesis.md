<a name="Top"></a>
# marketing-cloud-connector

### Navigation
1. [Project Overview](1_0_Project_Overview.md#navlink)
2. [Install B2C Commerce Components](2_0_Commerce_Cloud_Component_Installation.md#navlink)

	2.1 [Handler Framework Installation](2_1_Handler-Installation.md#navlink)

	2.2 [Marketing Cloud Cartridge Installation](2_2_MarketingCloudCart.md#navlink)

	2.3 [SFRA Modification Instructions](2_3_Modification-Instructions-for-SFRA.md#navlink)

	2.4 [**SiteGenesis Modification Instructions**](2_4_Modification-Instructions-for-SiteGenesis.md#navlink)

	2.5 [Manual Modification Instructions](2_5_ManualModifications.md#navlink)

7. [Install Marketing Cloud Components](3_0_ModifyMarketingCloud.md#navlink)

	3.1 [Triggered Send and Transactional Emails](3_1_0_TriggeredSendTransactionalEmails.md#navlink)

	3.1.1 [Triggered Send Configuration](3_1_1_MCConnectorInstallation-TriggeredSendConfiguration.md#navlink)

	3.2 [Realtime Analytics Configuration](3_2_MCConnectorInstallation-RealtimeAnalyticsConfiguration.md#navlink)

11. [Additional Features](4_0_AdditionalFeatures.md#navlink)
12. [Debugging](5_0_Debugging.md#navlink)

<a name="navlink"></a>
## 2.4 SiteGenesis Modification Instructions #

<a name="Clone"></a>
### Clone or Pull from Community SiteGenesis

The release of the Marketing Cloud Connector Version 2.0.0 includes the new overlay cartridges _int\_sitegenesis\_marketing\_cloud\_controllers_ and _int\_sitegenesis\_marketing\_cloud\_core_, which contain all of the changes the manual modifications instructions advise you to make. You still need to import and configure all the metadata and custom objects, but don't have to manually cut and paste all the code from these instructions into your SiteGenesis.

1. Load the latest version of SiteGenesis cloned from [https://github.com/SalesforceCommerceCloud/sitegenesis](https://github.com/SalesforceCommerceCloud/sitegenesis).
2. Load the _int\_sitegenesis\_marketing\_cloud\_controllers_ and _int\_sitegenesis\_marketing\_cloud\_core_ cartridges.
3. Upload and install all the metadata from the _sites/_ directory.
4. Update your cartridge path so that the new SiteGenesis overlay cartridges appear before the SiteGenesis cartridges:
`
int_marketing_cloud:int_sitegenesis_marketing_cloud_controllers:int_sitegenesis_marketing_cloud_core:app_storefront_controllers:app_storefront_core:int_handlerframework
`

If your project cannot take advantage of Community SiteGenesis for some reason, see [2.5 Manual Modification Instructions](2_5_ManualModifications.md#navlink).

- - -

[Back to the top](#Top)
