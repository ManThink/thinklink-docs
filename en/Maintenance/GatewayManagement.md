# 1. Gateway Management
ThinkLink (TKL) supports multiple gateways, including ManThink-owned gateways and third-party gateways conforming to standard protocols, enabling flexible network deployment and centralized management. 

## 1.1. Supported Gateway Types
TKL supports the following two types of gateway access: 

+ **ManThink Gateway**: Adopt `mqtt_mt `protocol to achieve a secure connection through the ManThink proprietary communication mechanism. 
+ **Third-Party Gateway**support Standards **GWMP (based on UDP protocol)** the gateway device ensures wide compatibility. 

## 1.2. Gateway Information Required
when you add a gateway, the following fields are required to uniquely identify and correctly configure the Gateway: 

| field  | description  |
| --- | --- |
| `gwEui ` | the EUI code of the Gateway, which is a unique identifier in the system and is usually found on the gateway device label.  |
| `type ` | gateway type, select from the drop-down menu: `GWMP `or `ManThink `.  |
| `pincode ` | the check code of the ManThink Gateway, which is only added after`ManThink `type Gateway is required for authentication.  |


>**[Note]]**: `pincode `is the security verification credential of the ManThink gateway, please contact the sales staff to obtain the validity of the corresponding Gateway `pincode `. 
>

## 1.3. New Gateway
with the New Gateway feature, you can add a single gateway device to the current organization for unified management. 

<!-- 这是一张图片，ocr 内容为：TIKL THINKLINK GATEWAY CONFIGURATION GATEWAY BASIC INFORMATION DASHBOARD EUI TYPE NAME NAME: PLEASE ENTE APPLICATION DATA PLEASE ENTER MANTHINK NETWORK DATA GEOGRAPHIC LOCATION HEARTBEAT PERIOD(S) PIN_CODE MAINTENANCE PLEASE SELECT 60 EASE ENTER &DEVICE LATITUDE COORDINATE  SOURCE LONGITUDE 品 GATEWAY PLEASE SELECT PLEASE ENTER PLEASE ENTER 34696457667 BACNET GATEWAY MODEL ENABLE LEAF_ENABLE 346225941413 PLEASE ENTER 召 DASHBOARD 227068180734 HARDWARE VERSION LORAWAN STANDARD FIRMWARE VERSION UPGRADE PLEASE ENTER PLEASE ENTER PLEASE ENTER EB COMPILE IP ADDRESS MODEL PLEASE ENTER SYSTEM GATEWAY PARAMETER CONFIGURATION POWERED BY ACE CODE* OK CANCEL -->
![](./assets/1761618243149-2a380a18-414b-46c1-a5b1-8437d50949af.png)

1. Enter TKL platform, click **[new Gateway]** button. 
2. Fill in the basic gateway information in the pop-up form: 
    - **select Gateway Type**: 
        * if used **ManThink Gateway**, please  `type `drop-down menu to select `ManThink `. 
        * If used **third-party gateways that support the GWMP protocol**, please select `GWMP`. 
3. Fill in `gwEui`And corresponding `pincode `(Only `ManThink `type required). 
4. For selection `GWMP `type of third-party gateway, make sure that  protocol configuration points to the address and port of the currently deployed ThinkLink server. 
5. Please confirm that the gateway device is in ** online Status** so that TKL can communicate with it and complete authentication. 

> **[Important Note]**: when adding a ManThink gateway, TKL will establish real-time communication with the gateway to verify `pincode `and equipment legality. If the gateway is offline, the ADD operation will fail. 
>

After the gateway is added, the gateway appears in the Gateway list. You can perform status monitoring, parameter configuration, and data management on the platform. 
