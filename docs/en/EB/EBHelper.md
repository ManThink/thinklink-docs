# EBHelper

`EBHelper` is a plugin tool specifically designed to simplify EB code development. Users can quickly implement device communication and data reporting by completing a **JSON configuration file** without writing any code.

## 1. Core Functions and Supported Protocols
**Design Goal**: To simplify the development process and achieve communication through configuration.

**Supported Protocols**:

+ **Modbus**.
+ **DL/T 645**.
+ **Any** (Custom arbitrary formats).

## 2. Data Structure Definition
### 2.1 EB Uplink Standard Frame Structure
Uplink events encapsulate raw data using a fixed format:

| Field Name | Offset | Length (Bytes) | Description |
| --- | --- | --- | --- |
| `version` | 0 | 1 | Protocol version number. |
| `dataType` | 1 | 1 | Data type encoding. |
| `covStatus` | 2 | 1 | Reserved byte (for internal COV processing). |
| `status` | 3 | 1 | Query event status. |
| `battery` | 4 | 1 | Battery level. |
| `addr[]` | 5 | n | Sub-device address (1 byte for Modbus, 6 bytes for DL/T 645). |
| `appData[]` | 5+n | m | **Application layer raw data** (parsing is handled by the Object Model). |


## 3. Configuration Details
### 3.1 Uplink Event Configuration (Main Configuration)
Used to define data reporting channels and cycles.

+ **Basic Items**: `name` (Identifier), `port` (Port, default 22), `addrSize` (Address length).
+ **Version Control**: `version` (Default 0x83), `dataType` (Auto-incremented).
+ **Reporting Cycle Strategy**:
+ **Priority**: `upPeriod` > `upPeriodIndex` > Default (no cycle triggered).
+ **Dynamic Adjustment**: Recommended to use `upPeriodIndex` (Starting address 70, 4-bytes aligned).

### 3.2 Query Event Configuration (quInfo)
Defines how to initiate requests to sub-devices.

+ **Protocol Parameters**: Supports `protocol`, `code` (Function code), `addr` (Device address).
+ **Data Injection**: App parameters can be dynamically written into command frames via `indexAPP`,

 	`indexCMD`, and `copySize` to avoid hard-coding.

+ **Validation & Triggering**:
+ `isLast`: When set to `true`, data uplink is triggered immediately after this query is completed.
+ `listTag`: Used for basic validation of the response message.

### 3.3 Data Processing and COV (listVal)
Defines rules for extracting data from response messages and **Change of Value (COV)** strategies.

+ **Extraction Range**: `start` and `end` are **closed intervals**. In Modbus, these represent register addresses, not offsets.
+ **COV Mechanism**:
+ Supports `Uint8/16/32`, `Int8/16/32`, `Float` (Big/Little Endian).
+ **Trigger Condition**: Triggered when the absolute difference between the sampled value and the last sent value is > the threshold stored in `covAppIndex`.

## 4. Best Practice 
### 4.1 Efficiency Optimization
+ **Minimize Query Frequency**: Try to obtain continuous data in a single query, even if it includes a small amount of invalid bytes (response messages support up to 250 bytes).
+ **Segmentation Principle**: If invalid data exceeds 50 bytes, it is recommended to split it into multiple query events.

### 4.2 Parameter Planning
+ **Dynamic Configuration**: Prioritize `Index`-type configurations (e.g., `upPeriodIndex`) so that parameters can be adjusted later without re-compiling.
+ **Memory Allocation Reference**:
+ **70+**: Reporting/Query cycle parameters.
+ **110+**: COV threshold buffer.
+ **150+**: Dynamic parameter source addresses.

### 4.3 Time Unit Reference
Supported units: `s` (seconds), `m` (minutes), `h` (hours), `d` (days), `y` (years).

+ _Example_: `"900s"` represents 900 seconds.

### 4.4 Reference Example
```typescript
import { Buffer } from "buffer";
import { buildOtaFile } from "@EBSDK/run";
import {
    ActionAfertExpr, CalcData,
    CrcMode,
    CvtRule,
    EBBuffer,
    EBModel,
    ExprCondition,
    LoraUpEvent,
    QueryEvent, SetUpCovDataType,
    UserConfUPItem,EventInfoItem
} from "@EBSDK/EBCompiler/all_variable";
import { CheckbitEnum, getOtaConfig, HwTypeEnum, UpgrdTypeEnum } from "@EBSDK/otaConfig";
////////////////////////////////////////////////////////////////////////////////////////
const eventInfo:UserConfUPItem[]=[
    {
        name:"transh",dataType:"0x23",upPeriodIndex:70,
        // port:22, version:"0x83",upPeriod:"900s",
        quInfo:[
            {
            protocol:"modbus",addr:"0x02",code:"0x03", periodIndex:74,
            //indexAPP:150, indexCMD:0, copySize:4,period:"900s",isLast:false,payIndex:3,ackAddrIndex:0,
            listVal:[
                { start: "0", end: "1" ,covType:"Uint32BE",covAppIndex:110},
                { start: "2", end: "3" ,covType:"Uint32BE",covAppIndex:110},
                { start: "4", end: "7" },
                ]
            },{
            protocol:"modbus",addr:"0x01",code:"0x03",periodIndex:74,
            //indexAPP:-1, indexCMD:0, copySize:4,period:"300s",//isLast:false,payIndex:3,ackAddrIndex:0, hook:false
            listVal:[
                { start: "0x0102", end: "0x0102",covType:"Uint16BE",covAppIndex:114} //,covAppIndex
            ]
            }
        ]
    }
]
let otaConfig = getOtaConfig({
    SwVersion:31,
    BaudRate: 9600,
    StopBits: 1,
    DataBits: 8,
    Checkbit: CheckbitEnum.NONE,
    Battery: false, // 非电池供电，Class C模式
    ConfirmDuty: 60,
    BzType: 10105,
    BzVersion: 11
})
const MODBUS_TT = (ebModel: EBModel) => {
    for (let i=0; i<eventInfo.length; i++){
        let event=new EventInfoItem(eventInfo[i]);
        event.upEventSetup()
        event.eventInstall()
    }
    return JSON.stringify(ebModel, null, 2)
}
```

---

