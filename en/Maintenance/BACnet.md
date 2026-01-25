## BACnet
> <font style="color:rgb(0, 0, 0);">Note: BACnet functionality is only supported on TKG (gateway running TKL) and TKE (edge server), the cloud platform does not support BACnet.</font>
>

<font style="color:rgb(0, 0, 0);">If the user's BMS (Building Management System) requires formal deployment, a standard BACnet point list file typically needs to be provided to facilitate system integration and commissioning. Before generating the BACnet point list, BACnet fields must be configured in the thing model. Please refer to Section 7.1 for relevant descriptions about BACnet fields.</font>

1. Enter **operation and maintenance management → BACnet ** module. 
2. Click ** incremental generation ** button. 
3. Select the target in the pop-up window ** object Model**. 
4. After confirmation, the system will automatically generate the  table information of all BACnet fields under the corresponding model. 

The generated  table contains key information such as object type, object instance number, object name, attribute description, data type, company, read and write permissions, and can be delivered to third-party systems for docking. 

<!-- 这是一张图片，ocr 内容为：TIKL THINKLINK DEMO ADMIN 金 HOME BACNET DASHBOARD BACNET对象 RESET OBJECT_TYPE: EXPAND QUERY EUI THING_MODEL APPLICATION DATA PLEASE SELECT NETWORK DATA OBJECT_TYPE *FIELD_NAME(SINGLE SELECT) [EXPORT LIST T IMPORT MAINTENANCE ANALOGOUTPUT PLEASE SELECT ID OPERATION 品 DEVICE OBJECT_ID OBJECT_NAME PLEASE ENTER PLEASE ENTER 品 GATEWAY 3565921134 EDIT DEFAULT_VALUE UNIT > BACNET NOUNITS 0 1 昭 DASHBOARD 1-1 OF 1 ITEMS DESCRIPTION COV_INCREMENT UPGRADE PLEASE ENTER RPC EB COMPILE PLEASE SELECT WODEL OK CANCEL SYSTEM -->
![](./assets/1761618431313-9fe9d3d6-380b-4f69-9616-e6181e58ab33.png)
