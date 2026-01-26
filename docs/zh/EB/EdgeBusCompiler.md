# EB compiler SDK 使用说明
## 1. 概述
### 1.1 核心概念
EB Compiler SDK 是一个基于事件驱动的数据采集和传输框架。其核心逻辑是：

+ **事件驱动架构**：所有操作都围绕事件进行触发和执行
+ **周期性执行**：查询事件和上行事件都是周期性事件
+ **数据流处理**：通过查询事件获取子设备数据，经过处理后通过上行事件发送到云端

### 1.2 事件类型
+ **查询事件 (Query Event)**：周期性向子设备发送指令，获取数据
+ **查完即传事件(UpAfterQueryEvent)**: 查询完成后不做数据处理直接上传
+ **上行事件 (LoraUp Event)**：周期性将处理后的数据通过LoRaWAN发送到云端

### 1.3 编译方法
#### 1.3.1 环境准备
-  请先在您的系统中安装 [Node.js](https://nodejs.org/)，建议使用 **LTS 版本**。
-  在命令行中执行以下命令，全局安装 `ts-node`：

```bash
npm install -g ts-node
```

#### 1.3.2 编译
-  需要先执行 npm install 安装依赖

Windows 下执行脚本示例：

```bash
ts-node .\project\test\test.ts
```

> 请确保您已正确配置 TypeScript 环境，并在执行前检查路径是否正确。
>

### 1.4 下载固件
#### 1.4.1 多bin 升级说明
EB的升级采用的多bin的方式，编译生成的二进制文件分割成多包，按帧号顺序下发给设备。
编译好的obin文件内部已经有了分包信息，升级过程就是将多个数据包依次发给设备，设备收到升级包后会校验，升级包的完整性及合法性。校验通过后，写到设备的代码区，完成升级功能。
将obin文件用文本方式读取后，内容是一个json格式的文件如下，有效的升级包为bin_dic 中的内容。包的序号为index。index=0 是第1包数据。其他信息为通过ThinkLink ，UART或者SW模式时升级用的配置。

编译时，需要填写唯一的版本号，升级完成后，可以将版本号读出来，判断是否升级成功。

```json
{
  "otaFile": {
    "bin_dic": {
      "0": {
        "index": 0,
        "buffer": "AgADAGQDWQQAAAA=",
        "bufferstring": "02 00 03 00 64 03 59 04 00 00 00"
      },
      "1": {
        "index": 1,
        "buffer": "CAAAAgAAADEDIx6gAQoACBgCPEcz8AAAAAAAVQG5AAQCAgMBAwECAAAAAAIBAACgzwAAWAIBABwCAAAaDQACAAIAAQAAAAABoECAAw8MoBICAAAAAQEDAgwEEgAAAAkSAQAAVABgAA==",
        "bufferstring": "08 00 00 02 00 00 00 31 03 23 1E A0 01 0A 00 08 18 02 3C 47 33 F0 00 00 00 00 00 55 01 B9 00 04 02 02 03 01 03 01 02 00 00 00 00 02 01 00 00 A0 CF 00 00 58 02 01 00 1C 02 00 00 1A 0D 00 02 00 02 00 01 00 00 00 00 01 A0 40 80 03 0F 0C A0 12 02 00 00 00 01 01 03 02 0C 04 12 00 00 00 09 12 01 00 00 54 00 60 00"
      },
      "2": {
        "index": 2,
        "buffer": "CAEAfACMAJwAAAAAAAAA/wEBAAAAAJAIAwaBABACEQAAAJABAwAAAAbFyAABAgAAAAAAAQALAKDPAA8CAAAAggAAAAQAPQCgRQAPAgAAAIEhAwQPAAwAWAIADwIAAAABAAAAAAAAAA==",
        "bufferstring": "08 01 00 7C 00 8C 00 9C 00 00 00 00 00 00 00 FF 01 01 00 00 00 00 90 08 03 06 81 00 10 02 11 00 00 00 90 01 03 00 00 00 06 C5 C8 00 01 02 00 00 00 00 00 01 00 0B 00 A0 CF 00 0F 02 00 00 00 82 00 00 00 04 00 3D 00 A0 45 00 0F 02 00 00 00 81 21 03 04 0F 00 0C 00 58 02 00 0F 02 00 00 00 01 00 00 00 00 00 00 00"
      },
      "3": {
        "index": 3,
        "buffer": "CAIAAAAAAAAAAACqgRT//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////w==",
        "bufferstring": "08 02 00 00 00 00 00 00 00 00 00 AA 81 14 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF"
      }
    },
    "devEUI": [
      {
        "deveui_start": "0000000000000000",
        "deveui_end": "0000000000000000"
      }
    ],
    "otaMode": "gw",
    "otaPort": 201,
    "packets": 3,
    "intervalTime": 500,
    "txCounts": 2,
    "swtime": 0,
    "src": null,
    "deviceIntervalTime": "32000",
    "dndata": null,
    "appeui": "8100000002000001",
    "isClassA": true
  }
}
```

#### 1.4.2 注意事项
- 注意最大重复测试选择1，包发送次数选择 1
- 如果是ClassC的设备，随时可以升级。 ClassA的设备，需要触发设备上行一包数据才能触发升级包下行。
- 设备升级后会自动复位
- 节点检查等待时间是升级多个设备，用于不同设备之间的间隔的参数
- 注意EB代码中，电池供电的设备中Battery参数要设置为true，否则设备将会处于ClassC的模式造成电池耗电过大。
- 升级目标如果当前是ClassA模式，下发的数据需要用confirm类型的数据包。要依次发下去，触发升级后，会连续下发升级包
- 升级目标如果当前是ClassC模式，下发的数据需要用unconfirm类型的数据包，如果用的NS没有自动排队功能，则需要人工根据空中时间来控制下发数据包的顺序和时间间隔。 ClassC的模式，如果要保证可靠升级，可以将每包的下发次数增加，每包下发2次或者多次。重复包收到后会被EB过滤。

#### 1.4.3 采用 ThinkLink 下载固件方法
1. 登录 Thinklink 平台：[https://thinklink.manthink.cn/](https://thinklink.manthink.cn/)
2. 进入设备管理页面，使用 固件升级功能。
3. 上传 `.obin` 文件， 位于代码文件夹下的release文件夹

<!-- 这是一张图片，ocr 内容为：TIKL THINKLINK DEMO ADMIN 首页 升级 仪表板 设备固件新增 网关固件 设备升级任务 设备固件 名称 目应用数据 所输入 网络数据 王五 来源: 查询 名称: 请输入 备注 风还维管理 请输入 口设备管理 CI字 新培 品网关管理 固件 名称 操作 来源 备过 PBACNET 下就回件 CJ188_V23 自定义 罚仪表板管理 下就同件 CJ188T_303V22 当定义 CLICK OR DRAG FILE TO THIS AREA TO UPLOAD 甲升级 SUPPORT FOR A SINGLE OBIN TILE UPLOAD 下载同件 CJ188TV303.14 自定义 EB编译 下载同件 CJ188T_V2.1 确定 取消 模型管理 下载同件 CJ188T_V2 自定义 会系统管理 下载同件 CJ188HITV2.0 自定义 下我同件 自定义 2MF EXAMPLE 下载固件 自定义 TEST_DELETE 下载四件 自定义 OM422 TEST 带有APP PARAM信息 下载固件 白光文 XKW TEST 第1-10条/总共14条 -->
![](./assert/1761638221560-6755807c-3a35-4f40-8a0e-059c37457ae1.png)

4. 建立升级任务，选择需要升级的设备

<!-- 这是一张图片，ocr 内容为：TIKL THINKLINK X 新建任务 首页 升级 同件 高级配置 名称 仪表板 请选择 请输入 网关固件 设备固件 件设备升级任务 应用数据 目标设备 网络效据 ID: 请输入 名称 EUI @运维管理 展开 平置 查询 请输入 请输入 品设备管理 状态 标签 名称 EUI 物模型 品网关管理 名称 离线 1231231 PACNET 35386138319392773 测试 招仪表板管理 S00018BCD485C085 35378327334162437 测试 MT-DTU 6353012AF1090468 TU 在线 &升级 34329032795361285 测试 EB编译 MT-DTU-EMETER 红外抄表 S00016500AB52085 DANTHINK,DTU 34326515000807429 测试 MANTHINK,DTU MT-DTU,MT-DTU-EMETER 在线 MCI1-IR DTU 6353012AF1099301 34323365419021317 测试 系统管理 MT-DTU 3153012B00019/51 离线 3153012B00019151 测试 34204425828438021 MT-KS61 离线 6353012AF10A1806 34203402393096197 测试 MT-DTU. MT-DTU-MULTIDEVICE 6353012AF10A1805 在线 DTU TEST MANTHINK,DTU 29242801152450565 ZINF TEST MT-KS61 在线 MANTHINK,IAQ.KS61 LAQ-OFTICE BITETYPE 相同 29240704874057733 OFFICE AVG T8H 在线 A353012AF1000001 DEFAULT AVERAGETH 升级成功 29238416763785221 12 第1-10条/总共13条 取消 确定 -->
![](./assert/1761638285083-855bdee9-f3bd-4882-b289-a222b612e296.png)

### 1.5 代码配置说明
在入口文件中，需配置参数如下示例：

```typescript
let otaConfig = getOtaConfig({
    SwVersion: 31,
    BaudRate: 9600,
    StopBits: 1,
    DataBits: 8,
    Checkbit: CheckbitEnum.NONE,
    ConfirmDuty: 60,
    Battery: true,
    BzType: 101, // required ,2 bytes
    BzVersion: 2, // required,1 bytes
})
```

**配置注意事项：**

1. **SwVersion :**
   
    EB虚拟机的固件版本，当前版本为31 。版本好必须要实际EB的固件一致，否则会升级失败。
2. **BaudRate，StopBits，DataBits，Checkbit ：** 

    为uart/RS-485的串口配置参数，EB升级完将配置更新到APP参数中，EB重启后会从APP参数中获取串口配置参数并配置对应的串口。配置参数应该与EB要抄读子设备的配置一致。
3. **ConfirmDuty** ： 

    confirm包的占空比，默认是60，指每60包发送一包confirm数据包
4. **Battery 配置**
    - 电池供电的设备设置为 `true`，模组将按照 **Class A** 方式运行
    - 非电池供电的设备设置为 `false`，模组将按照 **Class C** 方式运行
5. **BzType**

  业务类型用于标识抄读不通类型的表计或者业务,number 类型，为必填项，升级时EB会判断BzType 和BzVersion的值，两个参数必须至少有一个与升级包中的不同才可以升级，否则EB会判断，固件已经完成过升级。

6. **BzVersion**

  业务版本号，用于标识同一种业务下，不同版本的固件，number类型，为必填项，升级时EB会判断BzType 和BzVersion的值，两个参数必须至少有一个与升级包中的不同才可以升级，否则EB会判断，固件已经完成过升级。

7. **高级参数**  

    如需配置其他高级参数，请联系门思科技（Manthink）技术支持。

## 2. 系统Buffer
### 2.1 预定义系统Buffer
以下5个系统Buffer 可以通过 EBModel 进行调用。 比如 EBModel.APP

### 2.2 Buffer功能说明
| Buffer名称 | 大小 | 权限 | 功能描述 |
| --- | --- | --- | --- |
| **APP** | 255字节 | 只读 | 应用数据存储，可通过LoRa指令修改（如485地址、阈值、版本号等），用户可以使用70之后的空间 |
| **APP_STATUS** | 32字节 | 只读 | 系统状态信息，包括查询超时状态等 |
| **SENSOR_DATA** | 128字节 | 只读 | 系统内置传感器数据，系统周期性采集 |
| **TEMPLATE** | 128字节 | 可读写 | 用户代码可使用的缓存数据 |
| **DEVICE_STATUS** | 16字节 | 只读 | 设备状态数据（电池电量、LoRa场强信噪比等） |


### 2.3 常用状态读取示例
```typescript
// 获取查询超时状态
const isQueryTimeOut = EBModel.APP_STATUS.readUint8(2).bitwiseAnd(2).rightShift(1);

// 获取电池电压
const deviceBatteryVoltage = EBModel.DEVICE_STATUS.readUint8(3);
```

## 3. 事件专用Buffer
### 3.1 查询事件Buffer
+ **cmdBuffer**：发送给子设备的指令Buffer，长度固定
+ **ackBuffer**：接收子设备回复数据的Buffer，长度必须≥实际回复数据长度

### 3.2 上行事件Buffer
+ **txBuffer**：LoRa事件发送Buffer，与事件发送的Buffer一致

## 4. Buffer操作方法
> 注意1：copy Rule（复制操作），Cvt Rule（转换操作）是两种格式的操作，返回的对象不同，不能互相连接。
>
> 注意2：每个cvt 规则最多支持连接6个操作符，每个查询事件最多支持15个cvt规则
>

### 4.1 数据复制方法
copy(sourceBuffer: Buffer,sourceOffset:number,byteLength: number, targetOffset:number)

**sourceBuffer ： copy 的数据源**

**sourceOffset : 源数据Buffer 的偏移**

**byteLength： 读取或者写入的字节长度**

**targetOffset：目标Buffer的偏移**

示例：

```json
copy(quEvent1.ackBuffer,3,72,3)
```

### 4.2 整数读写方法
**offset ： 调用buffer的偏移位置**

**byteLength： 读取或者写入的字节长度**

**value：写操作时写入的值**

#### 无符号整数
| 方法 | 字节序 | 位宽 | 说明 |
| --- | --- | --- | --- |
| `readUintLE(offset, byteLength)` | 小端 | 动态 | 读取无符号整数 |
| `writeUintLE(value, offset, byteLength)` | 小端 | 动态 | 写入无符号整数 |
| `readUintBE(offset, byteLength)` | 大端 | 动态 | 读取无符号整数 |
| `writeUintBE(value, offset, byteLength)` | 大端 | 动态 | 写入无符号整数 |
| `readUint8(offset)` | - | 8位 | 读取无符号8位整数 |
| `writeUint8(value, offset)` | - | 8位 | 写入无符号8位整数 |
| `readUint16LE(offset)` | 小端 | 16位 | 读取无符号16位整数 |
| `writeUint16LE(value, offset)` | 小端 | 16位 | 写入无符号16位整数 |
| `readUint16BE(offset)` | 大端 | 16位 | 读取无符号16位整数 |
| `writeUint16BE(value, offset)` | 大端 | 16位 | 写入无符号16位整数 |
| `readUint32LE(offset)` | 小端 | 32位 | 读取无符号32位整数 |
| `writeUint32LE(value, offset)` | 小端 | 32位 | 写入无符号32位整数 |
| `readUint32BE(offset)` | 大端 | 32位 | 读取无符号32位整数 |
| `writeUint32BE(value, offset)` | 大端 | 32位 | 写入无符号32位整数 |


#### 有符号整数
方法命名规则与无符号整数相同，将 `Uint` 替换为 `Int`

### 4.3 浮点数读写方法
**offset ： 调用buffer的偏移位置**

**value：写操作时写入的值**

| 方法 | 字节序 | 精度 | 说明 |
| --- | --- | --- | --- |
| `readFloatLE(offset)` | 小端 | 单精度 | 读取浮点数 |
| `writeFloatLE(value, offset)` | 小端 | 单精度 | 写入浮点数 |
| `readFloatBE(offset)` | 大端 | 单精度 | 读取浮点数 |
| `writeFloatBE(value, offset)` | 大端 | 单精度 | 写入浮点数 |
| `readDoubleLE(offset)` | 小端 | 双精度 | 读取双精度浮点数 |
| `writeDoubleLE(value, offset)` | 小端 | 双精度 | 写入双精度浮点数 |
| `readDoubleBE(offset)` | 大端 | 双精度 | 读取双精度浮点数 |
| `writeDoubleBE(value, offset)` | 大端 | 双精度 | 写入双精度浮点数 |


### 4.4 字符串读写方法
**offset ： 调用buffer的偏移位置**

**length： 读取或者写入的字节长度**

**value：写操作时写入的值**

| 方法 | 格式 | 说明 |
| --- | --- | --- |
| `readAscii(offset, length)` | ASCII | 读取ASCII字符串 |
| `writeAscii(value, offset, length)` | ASCII | 写入ASCII字符串 |
| `readXaasc(offset, length)` | XAASC | 读取XAASC格式字符串 |
| `writeXaasc(value, offset, length)` | XAASC | 写入XAASC格式字符串 |
| `readXaf(offset, length)` | XAF | 读取XAF格式字符串 |
| `writeXaf(value, offset, length)` | XAF | 写入XAF格式字符串 |


### 4.5 特殊格式方法
**offset ： 调用buffer的偏移位置**

**length： 读取或者写入的字节长度**

**value：写操作时写入的值**

| 方法 | 说明 |
| --- | --- |
| `readBcd(offset, length)` | 读取BCD码 |
| `writeBcd(value, offset, length)` | 写入BCD码 |


### 4.6 通用参数说明
+ **offset**: 缓冲区偏移量（从0开始）
+ **length/byteLength**: 要操作的字节长度
+ **value**: 要写入的值（CalcData类型）

**返回值**: 所有读写方法均返回 `CalcData` 或 `CopyData` 对象，可用于后续计算或赋值操作。 

### 4.7 计算操作符
EB SDK提供丰富的计算操作方法，支持链式调用：

| 方法 | 说明 |
| --- | --- |
| `multiply` | 乘法操作 |
| `divide` | 除法操作 |
| `add` | 加法操作 |
| `minus` | 减法操作 |
| `bitwiseAnd` | 按位与操作 |
| `bitwiseOr` | 按位或操作 |
| `bitwiseXOR` | 按位异或操作 |
| `power` | 幂操作 |
| `not` | 按位取反 |
| `leftShift` | 左移操作 |
| `rightShift` | 右移操作 |
| `notEqual` | 不等操作 |
| `lessThan` | 小于操作 |
| `greaterThan` | 大于操作 |
| `mod` | 取模操作 |
| `assign` | 赋值操作 |
| absolute | 取绝对值 |


**注意**: 操作符数量限制为最多6个，超过限制会抛出错误。

## 5. 事件
事件分为以下三种类型：

+ **查询事件 (QueryEvent)**：周期性向子设备发送指令，获取数据。
+ **查完即传事件 (UpAfterQueryEvent)**：在查询事件完成后立即触发，将处理后的数据发送到云端。
+ **上行事件 (LoraUpEvent)**：周期性将处理后的数据通过LoRaWAN发送到云端。

以下是主要的方法及其功能说明：

### 5.1`pushEBData`
+ **功能**：将一个操作（复制规则 `copy rule` 或计算规则 `cvt rule`）加入到该事件的动作中。当该事件发生时，这些操作将被执行。
+ **用法**：event.pushEBData(`operation`,`options`)
    - `operation`：要执行的操作。
    - `options`：可选参数，可以设置条件。

```javascript
quEvent1.pushEBData(quEvent1.cmdBuffer.copy(APP,31,1,10),{
      condition: ExprCondition.PRE,
  }
)
```

### 5.2`setPeriod`
+ **功能**：设置事件的周期性执行周期。该方法只有一个参数，单位为秒，用于设定一个固定的周期。
+ **用法**：event.setPeriod(`periodInSeconds`)
    - `periodInSeconds`：执行周期，单位为秒。

```javascript
quEvent1.setPeriod(300);
```

**注意**：如果想要设置一个被其他事件或动作触发的时间周期，应将该周期设置为一个非常长的时间（例如，几小时或几天），以避免固定周期的影响。

### 5.3`setPeriodFromApp`
+ **功能**：将事件的执行周期值放置在 `APP` 参数指定地址的4字节空间中，存储方式为小端模式。通过修改 `APP` 参数来动态调整事件的执行周期。
+ **用法**：quEvent1.setPeriodFromApp(`appParameterAddress`);

`appParameterAddress`：`APP` 参数的地址，指定了存储周期值的4字节空间,小端格式存储。

```javascript
event.setPeriodFromApp(70);
```

## 6. 查询事件 (Query Event)
查询事件有两种 `QueryEvent`和`UpAfterQueryEvent` 。

`QueryEvent` ，该事件为常规查询事件，查询完成后，用户根据查询到的数据进行`CopyRule`和`CvtRule`相关操作。

`UpAfterQueryEvent`, 该事件用于查询后直接透传使用, 用户无需再额外的写`CvtRule`和`CopyRule`相关的操作. 

### 6.1 数据流程
查询事件按以下流程执行：

1. **是否跳过查询：如果调用EB系统内的Buffer数值，可选择不做查询指令直接到11步，执行复制操作。**
2. **准备发送命令**：生成固定大小的命令数组
3. **数据复制（`copy Rule`）**：从其他Buffer复制相关字节（如需要），conditon需要是 **`ExprCondition.PRE`**
4. **校验和计算**：计算并放置校验和（如需要）
5. **发送命令**：发送命令，超时重发2次
6. **等待回复**：等待子设备回复，超时则结束本次查询
7. **接收回复**：获取回复报文
8. **校验和验证**：检查回复报文校验和（如需要）
9. **数据验证**：检查指定位置数值是否符合预期
10. **是否上行数据**：如果是`UpAfterQueryEvent`类型事件，将查询到的数据直接上传。不再执行下面的动作
11. **执行复制规则（copy Rule）**：按规则复制回复数据到目标Buffer
12. **执行转换规则（cvt Rule）**：按规则进行计算转换并存储结果，转换规则后面不允许执行copy Rule。
13. **触发上行**：根据计算结果决定是否触发上行数据
14. **结束事件**：等待下次事件

### 6.2 是否执行查询动作
如果不执行查询动作，则调用`setIfSelect` ，参数`IfSelectEnum.NO_QUERY` 即可跳过查询和数据返回的处理操作。

```typescript
quEvent1.setIfSelect(IfSelectEnum.NO_QUERY)
```

### 6.3 创建查询事件
#### 6.3.1 创建普通查询事件示例
```typescript
let cmdBuffer1 = Buffer.from("0F 04 10 0A 00 24 D5 FD".replaceAll(" ", ""), "hex");
let ackBuffer1 = Buffer.alloc(77);
let quEvent1 = new QueryEvent("quEvent1", {
    cmdBuffer: cmdBuffer1,
    ackBuffer: ackBuffer1,
}).setPeriod(300);
```

#### 6.3.2 创建 UpAfterQueryEvent 示例
```typescript
let cmdBuffer1 = Buffer.from("0F 04 10 0A 00 24 D5 FD".replaceAll(" ", ""), "hex");
let ackBuffer1 = Buffer.alloc(77);
let quEvent1 = new UpAfterQueryEvent("quEvent1", {
    cmdBuffer: cmdBuffer1,
    ackBuffer: ackBuffer1,
}).setPeriod(300);
```

### 6.4 更新数据操作
以下示例，执行查询操作前从APP参数的第31字节复制1个字节到cmdBuffer中的第10字节

```typescript
quEvent1.pushEBData(quEvent1.cmdBuffer.copy(APP,31,1,10),{
      condition: ExprCondition.PRE,
  }
)
```

### 6.5 设置查询校验和
```typescript
quEvent1.setQueryCrc({
    Mode: CrcMode.CRC16,
    placeIndex: 6,
    LittleEndian: true,
    crcCheckRange: {
        startIndex: 0,
        endIndex: cmdBuffer1.length - 3
    }
});
```

### 6.6 设置回复校验和
```typescript
quEvent1.setAckCrc({
    Mode: CrcMode.CRC16,
    placeIndex: 6,
    LittleEndian: true,
    crcCheckRange: {
        startIndex: 0,
        endIndex: ackBuffer1.length - 3
    }
});
```

### 6.7 添加回复检查规则
```typescript
quEvent1.addAckCheckRule(0, 0x10); // 检查第0字节是否为0x10
```

### 6.8 执行数据复制或者计算规则
```typescript
// 绑定读写/copy操作
quEvent1.pushEBData(upEvent1.txBuffer.copy(quEvent1.ackBuffer,3,72,3), 
  {
    condition: ExprCondition.ONTIME
  });
quEvent1.pushEBData(upEvent1.txBuffer.writeUint8(isQueryTimeOut, 1));

```

>  注意1 ：每个查询事件的操作，都是要执行copy动作，然后执行cvt动作。cvt后面不允许有copy操作
>
>  注意2：每个cvt 规则最多支持连接6个动作，每个查询事件最多支持15个cvt规则
>

如果执行完`CvtRule`需要触发数据上行，则需要在时间中增加 `ActAfterCvt` 参数。

`ActionAfertExpr.NO` , 默认 不做任何动作

`ActionAfertExpr.ALWAYS` ，则无论结果如何都将触发数据上传。

`ActionAfertExpr.UP_TO_RESULT` ,	取决于Cvt操作的结果，当操作结果大于0时触发上传，否则不上传。

### `6.9 setupCov` 方法
`setupCov` 是 EB compiler 封装的一个用于实现 COV（change of value）功能的方法。在许多场景中，EB 需要高频抄读设备数据，然后将抄读回来的数据与上次上传的数据进行比较。当差值大于设定的阈值时，则进行数据上传。这种机制可以在保证数据实时性的同时，大幅度降低数据发送的功耗，减少平台侧的垃圾数据和对空中资源的占用。

`setupCov` 会占用对应值大小的`SENSORDATA`的空间，比如binaryDataType为Uin16LE时，占用`SENSORDTA` 2字节的空间，`setupCov`执行完会返回`SENSORDTA`中的index值，用于上行事件从`SENSORDATA`中复制数据。COV条件达到时，会触发一包数据上行，在上行事件中将`SENSORDATA`中的传感器数值复制到txBuffer中然后发送，完成数据上传的工作。

+ `ackBufferIndex`: ack 消息中读取数据的位置
+ `up.event`: 上行事件实例
+ `up.txBufferIndex`: 上行数据中存储的采样值
+ `binaryDataType`: 操作的数据的字节类型
+ `appBufferCovThresholdIndex`: APP buffer 中存储 COV 阈值的地址
+ `txCovResultIndex`: 将 COV 的状态存储在上行 buffer 中的地址，这个值无意义，需要再txBuffer中预留。

   返回值：存放在·SENSORDATA·中index

使用示例：

```javascript
let sIndex=quEvent1.setupCov({
  ackBufferIndex: 0, // ack 消息中读取数据的位置
  up: {
    event: upEvent1, // 上行事件实例
    txBufferIndex: 2 // 上行数据中存储采样值
  },
  binaryDataType: "Uint16LE", // 操作的数据的字节类型
  appBufferCovThresholdIndex: 5, // APP buffer 中存储 COV 阈值的地址
  txCovResultIndex: 3 // 将 COV 的状态存储在上行 buffer 中的地址
});
```

## 7. 上行事件 (LoraUp Event)
### 7.1 数据流程
上行事件按以下流程执行：

1. **执行复制操作**：按规则执行copy操作（如需要）
2. **执行计算操作**：按规则执行计算操作（如需要）
3. **发送LoRa数据**：按预定格式发送数据

### 7.2 创建上行事件
```typescript
let txBuffer1 = Buffer.alloc(91);
txBuffer1[0] = 0x01; // 数据标识

let upEvent1 = new LoraUpEvent("upEvent1", {
    txBuffer: txBuffer1,
    txPort: 12
}).setPeriod(300);
```

### 7.3 数据处理（复制和转换）
```typescript
upEvent1.pushEBData(upEvent1.txBuffer.copy(buffer: TEMPLATE,3,4, 3), 
  {
    condition: ExprCondition.ONTIME
});
upEvent1.pushEBData(
    upEvent1.txBuffer.writeUint8(isQueryTimeOut, 1), {
        condition: ExprCondition.ONTIME,
        Repeat: 0,
        ActAfterCvt: ActionAfertExpr.NONE
    }
);
```

## 8. 校验和配置
### 8.1 CRC16模式
```typescript
quEvent1.setQueryCrc({
    Mode: CrcMode.CRC16,
    Poly: "a001", // 可选，默认0xa001，Modbus使用a001
    placeIndex: -2, // 校验和位置，正数正序，负数逆序
    LittleEndian: true, // 字节序，默认true，Modbus采用LittleEndian
    crcCheckRange: {
        startIndex: 0, // 计算起始位置
        endIndex: cmdBuffer1.length - 3 // 计算长度
    }
});
```

### 8.2 CCITT16模式
```typescript
quEvent1.setQueryCrc({
    Mode: CrcMode.CCITT16,
    Poly: "1021", // 可选，默认"1021"
    placeIndex: -2,
    LittleEndian: true,
    crcCheckRange: {
        startIndex: 0,
        endIndex: cmdBuffer1.length - 3
    }
});
```

### 8.3 SUM模式
```typescript
quEvent1.setQueryCrc({
    Mode: CrcMode.SUM,
    CrcLen: 6, // 计算6个字节长度的累加和
    placeIndex: -2,
    LittleEndian: true,
    crcCheckRange: {
        startIndex: 0,
        endIndex: cmdBuffer1.length - 3
    }
});
```

## 9. 操作条件 (Condition)
### 9.1 Copy操作条件
| 条件                  | 说明 |
|---------------------| --- |
| `ExprCondition.NONE` | 任何情况下都执行copy操作 |
| `ExprCondition.ONTIME` | 子设备有正确回复时执行copy操作 |
| `ExprCondition.TIMEOUT` | 查询操作超时时执行copy操作 |
| `ExprCondition.PRE` | 查询前从其他Buffer中复制数据 |


### 9.2 读写操作条件
| 条件 | 说明 |
| --- | --- |
| `ExprCondition.NONE` | 任何情况下都执行计算操作 |
| `ExprCondition.ONTIME` | 子设备有正确回复时执行计算操作 |
| `ExprCondition.TIMEOUT` | 查询操作超时时执行计算操作 |


### 9.3 计算后动作 (ActAfterCvt)
**如果要启动这个触发动作，必须最后调用的是上行事件的txBuffer才能才能触发。**

| 动作 | 说明 |
| --- | --- |
| `ActionAfertExpr.NONE` | 计算后无动作 |
| `ActionAfertExpr.ALWAYS` | 无论结果如何都触发上行 |
| `ActionAfertExpr.UP_TO_RESULT` | 结果大于0时触发上行 |
| `ActionAfertExpr.ALWAYS_REBOOT` | 计算完成后重启设备 |


### 9.4 重复转换(Repeat)
+ **默认值**: 1
+ **用途**: 用于上行事件的`CvtRule`的循环操作，当条件参数`Reapt`为 3时，那么相同的转换操作会执行三次，每次操作后，数据源地址会增加操作的数据长度为下一次操作的源地址；目的地址会增加目标结果数据长度为下次操作的目标地址。 如下为示例。

```javascript
// For a calc action, the loop operation count is implemented with the following result:
// The second parameter of writeUintLE is the loop step.
quEvent1.pushEBData(upEvent1.txBuffer.writeUintLE(quEvent1.ackBuffer.readBcd(2,7),3,7), {Repeat: 3})
```

等同于以下三个操作

```javascript
// is equivalent to:

// Iteration 1: Read from position 2
quEvent1.pushEBData(upEvent1.txBuffer.writeUintLE(quEvent1.ackBuffer.readBcd(2,7),3,7));
// Iteration 2: Read from position 9 (2 + 7)
quEvent1.pushEBData(upEvent1.txBuffer.writeUintLE(quEvent1.ackBuffer.readBcd(9,7),10,7));
// Iteration 3: Read from position 16 (9 + 7)
quEvent1.pushEBData(upEvent1.txBuffer.writeUintLE(quEvent1.ackBuffer.readBcd(16,7),17,7));
```

## 10. 内置封装函数
EB compiler 提供了一些内置的常用方法，以方便用户调用。此外，用户还可以将自己常用的方法封装成插件，并加入到 EB compiler 中，从而在调用时更加方便地实现所需功能。

## 11.示例代码
请联系门思科技获取示例代码

用户代码编写的文件位于 project下面，用户可以按照自己项目建立多个文件夹，每个文件夹可以建立一个EB文件。

```javascript
import {Buffer} from "buffer";
import {buildOtaFile} from "@EBSDK/run";
import {
    ActionAfertExpr,
    CrcMode,
    EBBuffer,
    EBModel,
    ExprCondition,
    LoraUpEvent,
    QueryEvent
} from "@EBSDK/EBCompiler/all_variable";
import {CheckbitEnum, getOtaConfig, HwTypeEnum, UpgrdTypeEnum} from "@EBSDK/otaConfig";

let otaConfig = getOtaConfig({
    BaudRate: 9600,
    StopBits: 1,
    DataBits: 8,
    Checkbit: CheckbitEnum.NONE,
    Battery: true,
    ConfirmDuty: 60,
    BzType: 101, // required ,2 bytes
    BzVersion: 2, // required,1 bytes
    SwVersion: 31
})
const MODBUS_TT = (ebModel: EBModel) => {
    // the Buffer which will be transmitted to sub device by UART/RS-485/M-Bus
    let cmdBuffer1=Buffer.from("12345678b1b2b3b4b5b6b7b8b9".replaceAll(" ", ""), "hex")
    // The expected message from the child device does not need to fully match the content, but its length should be greater than the actual reply.
    let ackBuffer1= Buffer.from("a1a2a3a4a5a6a7a8a9".replaceAll(" ",""),"hex")
    //build a query event with cmdBuffer1 and ackBuffer1, every 300 seconds, the cmdBuffer1 will be transmitted  and expecting ackBuffer1
    let quEvent1=new QueryEvent("quEvent1", {
        cmdBuffer: cmdBuffer1,
        ackBuffer: ackBuffer1,
        MulDev_NewGrpStart: true
    }).setPeriod(300)
    // EB will cacu the CRC before transmit cmdBuffer1
    quEvent1.setQueryCrc({
        Mode: CrcMode.SUM,
        CrcLen:1,
        placeIndex:-2,
        LittleEndian:true,
        crcCheckRange:{
            startIndex:0,
            endIndex:-2
        }
    })
    // when sub-device reply the message , EB start to find the first bytes which should be 0x68
    quEvent1.addAckCheckRule(0,0xa1)
    //the last byte of ackBuffer1 should be 0xa9
    quEvent1.addAckCheckRule(ackBuffer1.length-1,0xa9)
    //EB check the CRC of ackBuffer1
   /*
    quEvent1.setAckCrc({
        Mode: CrcMode.SUM,
        CrcLen:1,
        placeIndex:-2,
        LittleEndian:true,
        crcCheckRange:{
            startIndex:0,
            endIndex:-2
        }
    })
    */
    // build a upEvent1 which will transmit txBuffer by LoRaWAN and the period will be 1 year
    // EB also can make a condition to trigger the transmition when act a convertion
    let upEvent1= new LoraUpEvent("upEvent1", {
        txBuffer:Buffer.from("c1c2c3c4c5c6c7c8c9c0d1d2d3d4d5d6d7d8d9".replaceAll(" ",""),"hex"),
        txPort: 12
    }).setPeriod(86400*365)
    // read 2 bytes value with little-endian int16 format from ackBuffer of quEvent1 and then write to txBuffer with little-endian when quEvent1's ack event happen
    // ONTIME of condition means the message is replied , also the action can be TIMEOUT
    quEvent1.pushEBData(upEvent1.txBuffer.writeInt16LE(
        quEvent1.ackBuffer.readInt16LE(2), 3),{
        condition: ExprCondition.ONTIME
    })
    // a copy action from ackBuffer of quEvent1
    quEvent1.pushEBData(upEvent1.txBuffer.copy(quEvent1.ackBuffer,5,4,6),
        {
            condition: ExprCondition.ONTIME,
        }
    )
    //copy bytes from APP ,this byte is battery voltage
    quEvent1.pushEBData(upEvent1.txBuffer.copy(EBModel.APP,31,1,10),
        {
            condition: ExprCondition.ONTIME,
        }
    )
    // a read-write action ,ActionAfertExpr.ALWAYS means that the action will trigger a tranmition by LoRaWAN
    quEvent1.pushEBData(upEvent1.txBuffer.writeUint16LE(
        quEvent1.ackBuffer.readUint16LE(11), 2),{
        condition: ExprCondition.ONTIME,
        ActAfterCvt:ActionAfertExpr.UP_TO_RESULT
    })
    // ----------------------------------------------------
    return JSON.stringify(ebModel, null, 2)
}
buildOtaFile(__filename, otaConfig, MODBUS_TT)
```

### 11.1 输出文件说明
执行脚本后，将在项目文件夹下`release` 文件夹下生成 4 个文件，例如项目文件名称为test，路径位于project/test 那么将在project/test/release 文件夹下生成一下四个文件：

+ `test.bin`：原始编译二进制文件
+ `test.json`：编译过程文件
+ `test.obin`：最终升级包文件（用于设备升级）
+ `test.ota`：OTA 升级描述文件

其中 `bin`、`json`、`ota` 为中间过程文件，**最终用于升级的文件为 **`test.obin`。

### 11.2 串口配置说明
在入口文件中，需配置串口参数如下示例：

```typescript
let otaConfig = getOtaConfig({
    SwVersion: 31,
    BaudRate: 9600,
    StopBits: 1,
    DataBits: 8,
    Checkbit: CheckbitEnum.NONE,
    ConfirmDuty: 60,
    Battery: true,
    BzType: 101, // required ,2 bytes
    BzVersion: 2, // required,1 bytes
})
```

_**配置注意事项：**_

1. **Battery 配置**
    - 电池供电的设备设置为 `true`，模组将按照 **Class A** 方式运行
    - 非电池供电的设备设置为 `false`，模组将按照 **Class C** 方式运行
2. **高级参数**  
如需配置其他高级参数，请联系门思科技（Manthink）技术支持。


### 11.4 查询事件（QueryEvent）
设备内置的通过周期性的通过UART或者RS-485 发送报文，并设置预期回复的数据长度。

子设备收到数据后，会铜鼓RS-485或者UART接口回复一包数据。

EB根据设定的规则处理回复的数据

```jsx
let cmdBuffer1 = Buffer.from("0F 04 10 0A 00 24 D5 FD".replaceAll(" ", ""), "hex")
let ackBuffer1 = Buffer.alloc(77)
let quEvent1 = new QueryEvent("quEvent1", {
  cmdBuffer: cmdBuffer1,
  ackBuffer: ackBuffer1,
}).setPeriod(300)
```

+ `QueryEvent` 用于定义 Modbus 查询逻辑，包括发送命令、接收响应、校验数据。
+ `cmdBuffer` 是发送到设备的 Modbus 命令帧，需根据设备协议手册构造。
+ `ackBuffer` 是用于接收设备返回数据的缓冲区，大小应与预期响应数据一致

### 11.5 发送命令的CRC校验
+ CRC 校验是确保 Modbus 通信可靠性的关键步骤，务必根据设备协议配置正确的 CRC 模式。
+ `placeIndex` 表示 CRC 校验值在数据帧中的位置。
+ `LittleEndian` 表示是否使用小端序进行 CRC 计算，需与设备一致。

```jsx
quEvent1.setQueryCrc({
  Mode: CrcMode.CRC16,
  placeIndex: 6,
  LittleEndian: true,
  crcCheckRange: {
    startIndex: 0,
    endIndex: cmdBuffer1.length - 3
  }
})

```

### 11.6 接收数据的CRC校验
+ CRC 校验是确保 Modbus 通信可靠性的关键步骤，务必根据设备协议配置正确的 CRC 模式。
+ `placeIndex` 表示 CRC 校验值在数据帧中的位置。
+ `LittleEndian` 表示是否使用小端序进行 CRC 计算，需与设备一致。

```jsx
quEvent1.setAckCrc({
  Mode: CrcMode.CRC16,
  placeIndex: 6,
  LittleEndian: true,
  crcCheckRange: {
    startIndex: 0,
    endIndex: ackBuffer1.length - 3
  }
})
```

### 11.7 响应数据格式校验
```jsx
quEvent1.addAckCheckRule(0, cmdBuffer1[0]) // 检查回复的485地址是否正确
quEvent1.addAckCheckRule(1, cmdBuffer1[1]) // 检查功能码
quEvent1.addAckCheckRule(2, ackBuffer1.length - 5) // 检查数据长度
```

### 11.8 打包上行
可以将 缓冲区中的任何数据复制到上行报文中，示例中是将UARt和485的抄读超时的标志放到上行数据中

```jsx
quEvent1.pushEBData(upEvent1.txBuffer.writeUint8(isQueryTimeOut, 1))
quEvent1.pushEBData(upEvent1.txBuffer.copyFrom({
  bufferOffset: 3,
  byteLength: 72,
  buffer: quEvent1.ackBuffer
}, 3), {
  condition: ExprCondition.ONTIME
})
```



