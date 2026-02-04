# EBHelper
`EBHelper` 是一款专为简化 EB 代码开发设计的插件工具。用户仅需完成 **JSON 格式配置文件**，即可快速实现设备通信与数据上报，无需编写代码。
##  核心功能与支持规约
+ **设计目标**：简化开发流程，通过配置实现通信。
+ **支持协议**：
+ **Modbus**
+ **DL/T 645**
+ **Any**（自定义任意格式）

## 数据结构定义
### EB 上行标准帧结构
上行事件采用固定格式封装原始数据：

| 字段名 | 偏移 | 长度 (Bytes) | 含义说明 |
| --- | --- | --- | --- |
| `version` | 0 | 1 | 协议版本号 |
| `dataType` | 1 | 1 | 数据类型编码 |
| `covStatus` | 2 | 1 | 保留字节（供内部 COV 处理） |
| `status` | 3 | 1 | 查询事件状态 |
| `battery` | 4 | 1 | 电池电量 |
| `addr[]` | 5 | n | 子设备地址（Modbus 为 1 字节，DL/T 645 为 6 字节） |
| `appData[]` | 5+n | m | **应用层原始数据**（解析由物模型完成） |


##  配置项详解
### 上行事件配置（主配置）
用于定义数据上报通道及周期。

+ **基础项**：`name` (标识名), `port` (端口, 默认 22), `addrSize` (地址长度)。
+ **版本控制**：`version` (默认 0x83), `dataType` (自动递增)。
+ **周期策略**：
+ **优先级**：`upPeriod` > `upPeriodIndex` > 默认不触发。
+ **动态调整**：推荐使用 `upPeriodIndex`（起始地址 70，4 字节对齐）。

### 3.2. 查询事件配置 (quInfo)
定义如何向子设备发起请求。

+ **协议参数**：支持 `protocol`, `code` (功能码), `addr` (设备地址)。
+ **数据注入**：通过 `indexAPP`, `indexCMD`, `copySize` 可将 App 参数动态写入命令帧，避免硬编码。
+ **校验与触发**：
+ `isLast`: 设为 `true` 时，该查询完成后立即触发数据上行。
+ `listTag`: 用于回复报文的基础校验。

### 3.3. 数据处理与 COV (listVal)
定义从回复报文中提取数据的规则及 **变化上报 (COV)** 策略。

+ **提取范围**：`start` 和 `end` 为**闭区间**。在 Modbus 中代表寄存器地址，非偏移量。
+ **COV 机制**：
+ 支持 `Uint8/16/32`, `Int8/16/32`, `Float` (大/小端)。
+ **触发条件**：采集值与上次发送值的差值绝对值 > `covAppIndex` 存储的阈值。

##  最佳实践建议
### 效率优化
+ **减少查询次数**：尽量用单次查询获取连续数据，即使包含少量无效字节（回复报文支持达 250 字节）。
+ **分包原则**：若无效数据超过 50 字节，建议拆分为多个查询事件。

### 参数规划
+ **动态化**：优先使用 `Index` 类配置（如 `upPeriodIndex`），便于后期无需重新编译即可调整参数。
+ **内存分配参考**：
+ **70+**：周期相关参数。
+ **110+**：COV 阈值缓存区。
+ **150+**：动态参数源地址。

###  周期单位参考
支持：`s` (秒), `m` (分), `h` (时), `d` (天), `y` (年)。

> 示例：`"900s"` 表示 900秒。
>

### 参考示例
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

