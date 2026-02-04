# tklHelper 
tklHelper 是一个用于 ThinkLink 平台上的强大工具，旨在简化物模型（Thing Model）和远程过程调用（RPC）的配置过程。通过 tklHelper，用户可以利用简单的变量或 JSON 格式配置，快速实现对上行协议的物模型和 RPC 功能的搭建，极大地提高了开发效率和配置的灵活性。

本说明书将详细介绍 tklHelper 的各项配置参数及其使用方法，帮助用户高效地在 ThinkLink 平台上进行设备数据解析和功能定义。

## 1.`frameInfo` 配置：数据包合理性识别
`frameInfo` 配置项用于定义数据包的识别规则，确保接收到的数据符合预期的格式和内容。它主要由以下字段构成：

| 字段名 | 类型 | 描述 | 示例值 |
| :--- | :--- | :--- | :--- |
| `port` | Number | LoRaWAN 上行数据包的端口号，用于识别特定应用的数据。 | `22` |
| `dataLen` | Number | 预期的数据包长度。如果设置为 `-1`，则表示不对数据包长度进行判断。默认 -1 | `24` 或 `-1` |
| `rssi` | Boolean | 指示是否需要显示网关接收到的信号强度（RSSI）。如果上行协议的物模型需要显示场强和信噪比，则设置为 `true`。默认false | `true` 或 `false` |
| `tagList` | Array | 一个数组，包含多个标签对象，用于在数据包的指定偏移量处进行校验。每个标签对象包含 `index`（偏移量）和 `tag`（校验值）。 | `[{ index:0, tag:0x83}, { index:1, tag:0x23}]` |


**示例 **`frameInfo`** 配置：**

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

## 2. `appInfo` 配置：变量信息标识
`appInfo` 配置项用于标识数据包中解析出的指定变量的相关信息，包括其显示名称、数据类型、单位等。`appInfo` 是一个对象数组，每个对象代表一个需要解析的变量。

| 字段名 | 类型 | 描述 | 示例值 |
| :--- | :--- | :--- | :--- |
| `name` | String | 在前端界面上显示的变量名称。 | `"重量1"` |
| `field_name` | String | 物模型解析代码中调用的变量名，以及其他接口调用的名称。 | `"weight1"` |
| `unit` | String | 变量的单位。 | `"kg"` |
| `index` | Number | 变量在数据帧中的起始位置（偏移量）。 | `6` |
| `type` | String | 变量的数据类型。详细类型列表见下文。 | `"int32be"` |
| `coefficient` | String/Number | 乘的比例参数。可以是数值（如 `"0.001"`），也可以是其他已解析变量的 `field_name`。如果为其他变量值，其计算方法是整体完成一拨计算后，再做系统变化。默认1 | `"0.001"` 或 `"precision1"` |
| `decimal` | Number | 保留的小数位数。默认 0 | `2` |
| options | object | 将变量值映射到另外的数值：<br/>比如options:{0:false,1:true} | 优先使用options 而不是 postProcess |
| `postProcess` | String | 其他需要简单算法计算的函数。输入参数为 `value`，需要有 `return` 返回值。 | `"if (value>8) value=8; return value"` |


**示例 **`appInfo`** 配置：**

```json
let appInfo = [
    {
        name: "重量1",
        field_name: "weight1",
        unit: "kg",
        index: 6,
        type: "int32be",
        coefficient: "precision1",
        decimal: 2
    }
];
```

## 3. 数据类型详解
tklHelper 支持多种数据类型，以适应不同的数据解析需求。以下是主要的数据类型及其用法：

### 3.1 Number 类型
Number 类型涵盖了各种整数、浮点数以及特殊编码的数值表示。这些类型通常用于表示传感器读数、计数器等数值数据。

| 类型名称 | 描述 | 用法示例 |
| :--- | :--- | :--- |
| `int8`, `uint8` | 8 位有符号/无符号整数。 | `"int8"` |
| `int16`, `int16be`, `uint16`, `uint16be`, `int16le`, `uint16le` | 16 位有符号/无符号整数，支持大端（BE）和小端（LE）字节序。 | `"uint16be"` |
| `int24`, `int24be`, `uint24`, `uint24be`, `int24le`, `uint24le` | 24 位有符号/无符号整数，支持大端（BE）和小端（LE）字节序。 | `"int24le"` |
| `int32`, `int32be`, `uint32`, `uint32be`, `int32le`, `uint32le` | 32 位有符号/无符号整数，支持大端（BE）和小端（LE）字节序。 | `"int32be"` |
| `int40`, `int40be`, `uint40`, `uint40be`, `int40le`, `uint40le` | 40 位有符号/无符号整数，支持大端（BE）和小端（LE）字节序。 | `"uint40le"` |
| `int48`, `int48be`, `uint48`, `uint48be`, `int48le`, `uint48le` | 48 位有符号/无符号整数，支持大端（BE）和小端（LE）字节序。 | `"int48be"` |
| `int56`, `int56be`, `uint56`, `uint56be`, `int56le`, `uint56le` | 56 位有符号/无符号整数，支持大端（BE）和小端（LE）字节序。 | `"uint56le"` |
| `int64`, `int64be`, `uint64`, `uint64be`, `int64le`, `uint64le` | 64 位有符号/无符号整数，支持大端（BE）和小端（LE）字节序。 | `"int64be"` |
| `floatbe`, `floatle` | 32 位浮点数，支持大端（BE）和小端（LE）字节序。 | `"floatbe"` |
| `floatcdab`, `intcdab` | 特殊编码的浮点数或整数。 | `"floatcdab"` |
| `bcdbe`, `bcdle` | 二进制编码的十进制数（BCD），支持大端（BE）和小端（LE）字节序。**用法：** `bcdbe` 后跟数据字节长度，例如 `bcdbe4` 表示 4 字节大端 BCD。 | `"bcdbe4"` |
| `bitbe`, `bitle` | 位操作，用于从数据中提取特定位的值，支持大端（BE）和小端（LE）字节序。**用法：** `bitbe` 后跟起始位和结束位，例如 `bitbe2-2` 表示提取第 2 位（从 0 开始计数）。 | `"bitbe2-2"` 或 `"bitle3-9"` |


### 3.2 Boolean 类型
Boolean 类型用于表示布尔值（真/假）。

| 类型名称 | 描述 | 用法示例 |
| :--- | :--- | :--- |
| `bool` | 布尔类型。**用法：** `bool` 后跟数据字节长度，例如 `bool4` 表示 4 字节布尔值。 | `"bool4"` |


### 3.3 String 类型
String 类型用于表示文本数据。

| 类型名称 | 描述 | 用法示例 |
| :--- | :--- | :--- |
| `string` | ASCII 码格式的字符串。**用法：** `string` 后跟数据字节长度，例如 `string7` 表示 7 字节 ASCII 字符串。 | `"string7"` |
| `hexbe`, `hexle` | 十六进制字符串，支持大端（BE）和小端（LE）字节序。**用法：** `hexbe` 后跟数据字节长度，例如 `hexbe5` 表示 5 字节大端十六进制字符串。 | `"hexbe5"` 或 `"hexle16"` |


## 4. 物模型展示字段配置
物模型展示字段定义了在 ThinkLink 平台前端界面上如何呈现设备数据。其配置格式如下：

```json
{
    "fields": {
        "<field_name>": {
            "icon": null,
            "name": "<展示名称>",
            "type": "<数据类型>",
            "unit": "<单位>",
            "order": <展示顺序>,
            "field_name": "<物模型字段名>"
        }
    }
}
```

| 字段名 | 类型 | 描述 | 示例值 |
| :--- | :--- | :--- | :--- |
| `icon` | Null | 目前保持为 `null`。 | `null` |
| `name` | String | 在前端界面上显示的变量名称。 | `"总流量"` |
| `type` | String | 数据类型，可以是 `number`, `string`, `boolean`, `object` 四种。 | `"number"` |
| `order` | Number | 变量在前端界面上的展示顺序。 | `3` |
| `field_name` | String | 调用物模型的字段名称，应与 `appInfo` 中的 `field_name` 对应。 | `"flowTotal"` |
| `unit` | String | 字段的单位。 | `""` (空字符串) |


**示例物模型展示字段配置：**

```json
{
    "fields": {
        "flowTotal": {
            "icon": null,
            "name": "总流量",
            "type": "number",
            "unit": "",
            "order": 3,
            "field_name": "flowTotal"
        }
    }
}
```

## 5. 函数和示例
通过 PayloadParser 可以建立数据解析器，将配置参数配置后，即可实现对上行数据的解析。基于EB的的参数均放在APP参数中。按照app的参数格式进行配置。通过214端口进行数据解析。

通过 payParser.paras() 可获取到配置参数

通过 payParser.telemetry() 可获取到要遥测数据

示例如下：

```javascript
function payload_parser({device, msg, thingModelId, noticeAttrs}) {
  let    port=msg?.userdata?.port || null;
  let frameInfo={
    port:11, dataLen:15,rssi:true,
    tagList:[{   index:0, tag:0x21}, {   index:1, tag:0x07},{   index:2, tag:0x03}]
  }
  let appInfo = [
    {   name: "status", field_name: "status", unit:"", index: 7, type: "bitLE0-0"},
    {   name: "leakStatus", field_name: "leakStatus", unit:"", index: 7, type: "bitLE4-4"},
    {   name: "temperature", field_name: "temperature", unit:"℃", index: 8, type: "uint16LE"},
    {   name: "humidity", field_name: "humidity", unit:"%", index: 10, type: "uint16LE",coefficient:0.1,decimal:1},
    {   name: "vbat", field_name: "vbat", unit:"v", index: 12, type: "uint8"}
  ]
  let paraInfo= {
    app_40: {name: "upPeriod", field_name: "upPeriod", unit: "s",  type: "uint32LE"},
    app_142: {name: "measurePeriod", field_name: "measurePeriod", unit: "s", type: "uint16LE"},
    app_144: {name: "covTemperature", field_name: "covTemperature", unit: "℃",  type: "uint8",coefficient:0.1,decimal:1},
    app_145: {name: "covHumidity", field_name: "covHumidity", unit: "%",  type: "uint8",coefficient:0.1,decimal:1},
  }
  let pdata={}
  let tdata={}
  let payParser=new PayloadParser({
    device:device,
    msg:msg,
    frameInfo:frameInfo,
    appInfo:appInfo,
    paraInfo:paraInfo,
  })
  if (port===214) {
    pdata=payParser.paras()
    tdata=null
  }else  {
    tdata= payParser.telemetry()
    pdata=null
  }
  if (tdata!==null) {
    if (tdata.status!==0) {tdata.status="fault"
                          }else {tdata.status="normal"}
    tdata.temperature=Number(((tdata.temperature-1000)*0.1).toFixed(1))
    tdata.vbat=Number(((tdata.vbat*1.6)/254 +2.0).toFixed(2))
  }
  return {
    telemetry_data: tdata,
    server_attrs: null,
    shared_attrs: pdata
  }
}
```

## 6. 总结
通过 `tklHelper` 的 `frameInfo` 和 `appInfo` 配置，以及灵活的数据类型支持，用户可以高效地在 ThinkLink 平台上搭建和管理设备的物模型及 RPC 功能。正确理解和使用这些配置项，将有助于实现设备数据的精准解析和可视化展示。

如有任何疑问或需要进一步的帮助，请查阅相关文档或联系技术支持。

