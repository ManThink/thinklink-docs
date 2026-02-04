# tklHelper
`tklHelper` is a powerful tool designed for the ThinkLink platform to simplify the configuration process for Thing Models and RPC (Remote Procedure Calls). By using simple variables or JSON-formatted configurations, users can rapidly build Thing Models and RPC functions for uplink protocols, significantly improving development efficiency and configuration flexibility.

This manual provides a detailed introduction to the configuration parameters and usage methods of `tklHelper` to help users efficiently perform device data parsing and functional definition on the ThinkLink platform.

## 1. `frameInfo` Configuration: Data Packet Validation
The `frameInfo` configuration defines identification rules for data packets to ensure received data conforms to expected formats.

| Field Name | Type | Description | Example |
| --- | --- | --- | --- |
| `port` | Number | LoRaWAN uplink port number used to identify specific application data. | `22` |
| `dataLen` | Number | Expected packet length. Set to `-1` to ignore length checks (default is `-1`). | `24` or `-1` |
| `rssi` | Boolean | Indicates whether to display RSSI and SNR from the gateway (default is `false`). | `true` or `false` |
| `tagList` | Array | An array of tag objects for validation at specific offsets. Includes `index` (offset) and `tag` (hex value). | `[{ index:0, tag:0x83}]` |


**Example **`frameInfo`** Configuration:**

```json
let frameInfo = {
    port: 22,
    dataLen: 24,
    rssi: true,
    tagList: [
        { index: 0, tag: 0x83 },
        { index: 1, tag: 0x23 }
    ]
};

```

---

## 2. `appInfo` Configuration: Variable Identification
`appInfo` is an array of objects used to identify specific variables parsed from the data packet, including display names, data types, and units.

| Field Name | Type | Description | Example |
| --- | --- | --- | --- |
| `name` | String | Variable name displayed on the frontend interface. | `"Weight 1"` |
| `field_name` | String | Variable name used in Thing Model parsing code and other interface calls. | `"weight1"` |
| `unit` | String | The unit of the variable. | `"kg"` |
| `index` | Number | Starting position (offset) of the variable in the data frame. | `6` |
| `type` | String | Data type of the variable (see detailed list below). | `"int32be"` |
| `coefficient` | String/Num | Scaling factor (default is 1). Can be a number or another variable's `field_name`. | `"0.001"` |
| `decimal` | Number | Number of decimal places to retain (default is 0). | `2` |
| `options` | Object | Maps raw values to other values (e.g., `{0:false, 1:true}`). Prioritized over `postProcess`. | `{0: "Off"}` |
| `postProcess` | String | Function for simple algorithmic calculations. Input is `value`; must have a `return`. | `"return value + 1"` |


## 3. Data Type Details
### 3.1 Number Types
These represent various integers and floating-point numbers.

| Type Name | Description | Example Usage |
| --- | --- | --- |
| `int8`, `uint8` | 8-bit signed/unsigned integer. | `"int8"` |
| `int16be`, `uint16le` | 16-bit integer with Big-Endian (BE) or Little-Endian (LE) support. | `"uint16be"` |
| `int32be`, `uint32le` | 32-bit integer with BE/LE support. | `"int32be"` |
| `floatbe`, `floatle` | 32-bit floating point . | `"floatbe"` |
| `bcdbe`, `bcdle` | Binary Coded Decimal. Format: `type` + `byte length`. | `"bcdbe4"` |
| `bitbe`, `bitle` | Bit extraction. Format: `type` + `start bit` + `-` + `end bit`. | `"bitbe2-2"` |


### 3.2 Boolean and String Types
| Type Name | Description | Example Usage |
| --- | --- | --- |
| `bool` | Boolean type. Format: `bool` + `byte length`. | `"bool4"` |
| `string` | ASCII string. Format: `string` + `byte length`. | `"string7"` |
| `hexbe`, `hexle` | Hexadecimal string. Format: `hexbe` + `byte length`. | `"hexbe5"` |


## 4. Thing Model Display Fields
This configuration defines how data is presented on the ThinkLink frontend.

| Field Name | Type | Description |
| --- | --- | --- |
| `icon` | Null | Currently remains `null`. |
| `name` | String | Display name on the interface. |
| `type` | String | Data type: `number`, `string`, `boolean`, or `object`. |
| `order` | Number | Presentation order on the interface. |
| `field_name` | String | Must match the `field_name` in `appInfo`. |


## 5. Functions and Examples
Using `PayloadParser`, you can create a data parser to process uplink data. For EB-based parameters (usually on port 214), configurations are retrieved from APP parameters.

**Example Implementation:**

```javascript
function payload_parser({device, msg, thingModelId, noticeAttrs}) {
  let port = msg?.userdata?.port || null;
  let frameInfo = {
    port: 11, dataLen: 15, rssi: true,
    tagList: [{ index: 0, tag: 0x21 }, { index: 1, tag: 0x07 }, { index: 2, tag: 0x03 }]
  };
  let appInfo = [
    { name: "status", field_name: "status", unit: "", index: 7, type: "bitLE0-0" },
    { name: "temperature", field_name: "temperature", unit: "℃", index: 8, type: "uint16LE" }
  ];
  
  let payParser = new PayloadParser({
    device: device,
    msg: msg,
    frameInfo: frameInfo,
    appInfo: appInfo
  });

  let tdata = (port === 214) ? null : payParser.telemetry();
  let pdata = (port === 214) ? payParser.paras() : null;

  return {
    telemetry_data: tdata,
    server_attrs: null,
    shared_attrs: pdata
  };
}

```

## 6. Conclusion
By configuring `frameInfo` and `appInfo` with `tklHelper`, users can efficiently manage Thing Models and RPC functions on ThinkLink, ensuring precise data parsing and visualization.

