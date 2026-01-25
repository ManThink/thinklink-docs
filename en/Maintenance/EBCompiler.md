<!-- 这是一张图片，ocr 内容为：TIKL THINKLINK EB COMPILE 合HOME EB COMPILE REMARK DASHBOARD PLEASE ENTER PLEASE ENTER NAME : PLEASE ENTE APPLICATION DATA EDIT:MAIN.TS SAVE RUN NETWORK DATA MAINTENANCE IMPORT{BUFFER) FROM "BUFFER"; ID 23456789012666038822 旦 DEVICE IMPORT {BUILDOTAFILE> FROM "CEBSDK/RUN'; IMPORT ACTIONAFERTEXPR, 411689462079 品 GATEWAY CROMODE, EBBUFFER, 342021234748 BACNET EBMODEL, EXPRCONDITION, LORAUPEVENT, DASHBOARD QUERYEVENT, UPAFTERQUERYEVENT & UPGRADE FROM "GEBSDK/EBCOMPILER/ALL VARIABLE"; IMPORT {CHECKBITENUM, GETOTACONFIG, HUTYPEENUM, UPGRDTYPEENUM} FROM "AEBSOK/OTACONFIG";  EB COMPILE LET T OTACONFIG GETOTACONFIG(( UPGRDTYPE:UPGRDTYPEENUM.GW,GW, ACTIONMANAGE... HUTYPE: HOTYPEENUM.ON822, // CN470 AND EN478 USED ON422 OTHERWISE IS OM822 BAUDRATE:9600, STOPBITS:1, 图 MODEL DATABITS:8, CHECKBIT: CHECKBITENUM.NONE, V @SYSTEM FUNCTION MAIN(){RETURN BUILDOTAFILE(NULL,OTACONFIG,MODBUS_TT)] 999+FU V BE ADVANCED MAIN() RUN RESULT SAVE FIRMWARE PACKAGE OTACONFIG FOR SUPPORT:INFO@MANTHINK.CN DETAILS DOWNLOAD -->
![](./assets/1765610369217-c8d962af-e9c3-4755-a5c3-47d2a5cfbeed.png)

EB (EdgeBus) is a virtual machine running on low-power MCUs. EB enables complex sensor integration through programming with TypeScript. For a detailed introduction to EB, please refer to [[EN] AN-25100101 EB compiler SDK instructions](https://mensikeji.yuque.com/staff-zesscp/gqdw7f/sw2h63yynws3vcn0?singleDoc#)

ThinkLink provides an EB cloud compilation platform, allowing users to input TypeScript code and compile it online into an obin file for device firmware updates.

## Add New EB Code
**Note 1:** Unlike using the SDK, the `main` function definition and execution are already built into the cloud compilation system. Therefore, you must exclude the `main` function from your code.** Note 2:** Each EB code must have a unique combination of `BzType` and `BzVersion`. Duplicated combinations will result in device upgrade failures.** Note 3:** The `SwVersion` must match the firmware version of the target device. The current latest EB version is 31.

[ 1 ] After clicking "Add", the system will generate a default code template. Replace the sample code with your own implementation.

[ 2 ] Assign a name and add remarks for the EB code.

[ 3 ] Click "Compile" to generate the corresponding obin file.

[ 4 ] Click "Save Firmware Package" to store the compiled firmware package in the system for future EB upgrades.

[ 5 ] Click "Save" to save the EB code to the system.
