The upgrade of ThinkLink consists of two parts: gateway upgrade and device upgrade, both involving the gateways and devices of ManThink  The firmware for gateway upgrades is managed by ManThink Technology, and users can choose which firmware version to upgrade to. The device firmware is based on EB firmware, and ManThink's DTU and sensors are all built on EB code, making them upgradable. For EB encoding methods, please refer to [[EN] AN-25100101 EB compiler SDK instructions](https://mensikeji.yuque.com/staff-zesscp/gqdw7f/sw2h63yynws3vcn0?singleDoc#) 

After compilation, a file with the suffix `.obin` is generated, which serves as the upgrade firmware for devices.

## Gateway Upgrade
To view firmware details, navigate to **<font style="background-color:#E7E9E8;">MAINTENANCE -> UPGRADE -> Gateway Firmware</font>**, where you can check the specific version number and related upgrade content.

To upgrade the gateway, go to **<font style="background-color:#E7E9E8;">MAINTENANCE -> GATEWAY ->More ->Upgrade</font>**select the corresponding firmware to upgrade, and click ** Send** to initiate the upgrade process.

<!-- 这是一张图片，ocr 内容为：TIKL THINKLINK DEMO ADMIN 金 HOME GATEWAY DASHBOARD UPGRADE EXPAND V NAME: QUERY RESET PLEASE ENTER GW-EUI 目 APPLICATION DATA 5A53012501030059 NETWORK DATA PLEASE SELECT THE FIRMWARE TO UPGRADE 工 ADD @MAINTENANCE A-U-A-A-0.0.0-12.0.01(3.2.01) 品DEVICE OPERATION HARDWARE VERSION ENABLE CANCEL SEND 品 GATEWAY 512M测试 MANTHINK 24405920414961669 EDIT TRUE MORE ONLINE BACNET MANTHINK 5A53012501030011 22706818073497605 TRUE 5A53012501030011 EDIT ONLINE MORE B DASHBOARD UPGRADE 1-2 OF 2 ITEMS 圆 MODEL -->
![](./assets/1760874180345-e8e976fb-7dad-4c79-8f1f-dc4284cf9579.png)

## Device Upgrade
>** Note:** The device upgrade function is only applicable to devices equipped with the EB virtual machine. Make sure the MT-EB thing model is correctly mounted to the corresponding device; otherwise, the upgrade may fail due to inability to retrieve required parameter values.
>

Before performing a device upgrade, please check the device's shared property parameters. It is recommended to pre-configure the following default parameter values in the loading template, or obtain the actual runtime values by calling the **[MT APP] get app paras RPC ** API.

The following parameters must be configured:

- [x]** class_mode **: Must match the device’s actual operating mode (ClassA or ClassC). If uncertain, trigger an uplink data packet—the system will automatically update this value
- [x]** SwVersion**: Should match the EB firmware version. It is recommended to use **[MT APP] get app paras RPC ** to obtain the accurate value
- [x]**swSF**: Default is `7` (used in debug mode); must match the actual configuration or be obtained via**[MT CF] get sw para **- [x]** swBW**: Default is `500kHz` (used in debug mode), or retrieve actual value using**[MT CF] get sw para **- [x]** swFreq**: Low-band default is `477300000Hz`, high-band default is `923000000Hz` (used in debug mode), or obtain via**[MT CF] get sw para **- [x]** swPeriod**: Default is `8000ms` (used in debug mode), or retrieve via **[MT CF] get sw para**

> It is recommended to use debug-related parameters cautiously in production environments and prioritize dynamically retrieving actual values via RPC interfaces to ensure successful upgrades.
>

### Import Firmware
Upload the `.obin` file compiled using the EB Compiler by navigating to **<font style="background-color:#E7E9E8;">MAINTENANCE -> UPGRADE -> Device Firmware</font>** This will import the firmware into the TKL platform.

<font style="color:rgb(0, 0, 0);">If using the compiler built into ThinkLink, click "Save Firmware" to directly save the cloud-compiled firmware into the device firmware list.</font>

<!-- 这是一张图片，ocr 内容为：TKL THINKLINK DEMO ADMIN HOME UPGRADE DASHBOARD ADD DEVICE FIRMWARE DEVICE GATEWAY FIRMWARE DEVICE FIRMWARE APPLICATION DATA LEASE ENTER NETWORK DATA RESET NAME: PLEASE ENTER QUERY REMARK MAINTENANCE PLEASE ENTER 品DEVICE 工 京 C + ADD GATEWAY FIRMWARE NAME SOURCE OPERATION DBACNET 2MF EXAMPLE DOWNLOAD FIRMWARE 昭 DASHBOARD DOWNLOAD FIRMWARE TEST_DELETE CUSTOM CLICK OR DRAG FILE TO THIS AREA TO UPLOAD UPGRADE SUPPORT FOR A SINGLE.OBIN FILE UPLOAD DOWNLOAD FIRMWARE OM422 TEST CUSTOM 圆 MODEL DOWNLOAD FIRMWARE XKW TEST CUSTOM OK CANCEL SYSTEM ZMF TEST CUSTOM DOWNLOAD FIRMWARE CLASSC 可用2 -->
![](./assets/1760874332538-39aadc06-f466-4d66-a105-5363dea5480f.png)

### Upgrade Devices
Go to **<font style="background-color:#E7E9E8;">MAINTENANCE -> UPGRADE -> Device Upgrade Task->CreatTask</font>**. Assign a name to the upgrade task and select the corresponding firmware. Use **EUI** or **device name ** to filter the devices requiring upgrades. After filtering, multiple devices can be selected using the checkboxes on the left. Click** Confirm ** to create the upgrade task and begin the process.

>** Note 1:** Firmware upgrade for Class A devices requires an uplink data packet to be sent from the device before the upgrade process can be triggered.
>

>** Note 2:** When Debug mode is enabled, an uplink packet is triggered via the device's EB SW mode. For Class A devices, once Debug mode is activated, there is no need to trigger an uplink packet using a magnet or other methods — the upgrade can proceed directly. However, the default SW parameters use a high-speed channel (SF=7, BW=500kHz), which has limited communication range and is not suitable for large-scale deployments. When using Debug mode, ensure that the SW parameters in the shared attributes match those of the actual device. If the SW parameters are unknown, use the RPC command `[MT CF] get sw para` to retrieve the actual SW parameters from the device.
>

<!-- 这是一张图片，ocr 内容为：TIKL THINKLINK CREATE TASK 金 HOME UPGR ADVANCED SETTINGS FIRMWARE DEBUG NAME DASHBOARD PLEASE SELECT PLEASE ENTER GATEWAY APPLICATION DATA TARGET DEVICE NETWORK DATA ID: G MAINTENANCE RESET EUI: PLEASE ENTER NAME: EXPAND PLEASE ENTER QUERY DEVICE THING MODEL EUI STATUS TAGS NAME 品 GATEWAY 1231231 1231231 OFFLINE DEFAULT BACNET S00018BCD485C085 MANTHINK,DTU OFFLINE ARCHI SPOT 120 MT-DTU-EMETER 绍 DASHBOARD 6353012AF1090468 MT-DTU MANTHINK,DTU ONLINE KC21 UPGRADE EB COMPILE MANTHINK,DTU 红外抄表 OFFLINE S00016500AB52085 MT-DTU-EMETER MANTHINK,DTU @ACTIONMANAGE... MT-DTU,MT-DTU-EMETER MC11-IR DTU OFFLINE 6353012AF1099301 MODEL OFFLINE 3F53012B00019F5F 3153012B0001915F MT-DTU 粤 SYSTEM MT-KS51 DEFAULT OFFLINE 6353012AF10A1806 WATER LEAKAGE DETECTOR BB ADVANCED MANTHINK,DTU MT-DTU.MT-DTU-MULTIDEVICE DTU TEST 6353012AF10A1805 OFFLINE MT-KS61 6353012AF1090142 LAQ-OFFICE MANTHINK,IAQ,KS61 ONLINE A353012AF1000001 OFFLINE AVERAGETH OFFICE AVG T&H DEFAULT FOR SUPPORT:INFO@MANTHINK.CN CANCEL OK -->
![](./assets/1765610215075-a6b7cca3-fd7d-42d0-bcbb-e36289f983cf.png)

>** Note:** For Class A devices, the upgrade process is triggered only after the device sends an uplink data packet.
>

### View Upgrade Status and Tasks
Click ** Task Details** to check the status and results of the upgrade task.  
Click the **+** next to a device to expand its upgrade details and view specific results.

If parameters are highlighted in red, it indicates an alarm regarding the upgrade result. Alarms are generated when:

+ A Class A device is upgraded to Class C.
+ A Class C device is upgraded to Class A.

<!-- 这是一张图片，ocr 内容为：TASK DETAILS TASK DETAILS FIRMWARE ADVANCED SETTINGS UPGRADE METHOD NAME ZMF EXAMPLE(29241763994537 ZMF TEST SUB TASK LIST 奇 ERROR MESSAGE STATUS DEV-EUI 6353012AF10A1805 SUCCESSFUL SUB TASK CONFIG 6000 FRAGMENT RETRIES FRAGMENT INTERVAL (MS) 2 10000 WAIT CHECK TIME (MS) MAXIMUM UPGRADE ATTEMPTS 10000 DOWNLINK CHECK TIMEOUT TIME (MS) MESSAGE TYPE FALSE CONFIRMED MESSAGE DEVICE INFORMATION COMPARISON PACKAGE TARGET VALUE POST-UPGRADE VALUE PARAMETER PRE-UPGRADE VALUE 40 40 HWTYPE 40 FALSE FALSE BATTERY TRUE -->
![](./assets/1760874543001-6877df3b-48ce-4226-a391-5712b1578a4e.png)
