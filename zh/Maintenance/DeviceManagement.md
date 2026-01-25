ThinkLink （简称 TKL）支持多种设备类型的接入与统一管理，包括 LoRaWAN 设备、子设备、虚拟设备以及通过第三方协议接入的外部设备。系统提供灵活的设备生命周期管理能力，涵盖设备档案配置、物模型挂载、属性设置及设备间关联关系建立等功能。

## 【注意事项】
+ **【注意1】** ThinkLink V2 支持 LoRaWAN 设备、子设备、虚拟设备和外部设备等多种类型。
+ **【注意2】** 在新增设备时，若选择非 LoRaWAN 类型的第三方设备，其通信接口协议必须符合 TKL V2 的协议标准。
+ **【注意3】**对于通过 ThinkLink NS 接入的 LoRaWAN 设备，需**先在“LoRaWAN设备档案”中完成设备注册**，再将对应的 `devEUI` 添加至平台设备列表中。

## LoRaWAN 设备档案
所有使用 OTAA 或 ABP 模式接入的 LoRaWAN 终端设备，均需在此模块预先创建设备档案。该档案用于网络服务器（NS）对设备的身份认证、密钥管理和通信调度。

###  新增单个LoRaWAN 设备档案
<!-- 这是一张图片，ocr 内容为：THINK LINK 节点档案配置 仪表板 设备管理 JOIN_MODE DEV_EUI 应用数据 OTAA 请输入 设备配置 LORAWAN档案 STANDARD 网络数据 DEV_ADDR 请输入 CN470 运维管理 语输入 DEV_EUI: DEV_ADDR ENABLE LW_VER 设备管理 1.0.2 网关管理 DOWN_ENABLE CLASS_MODE CLASSA BACNET TIME_SYNC DEV EUI DEV ADDR ENABL HANDLE JOIN CLASS MODE 仪表板管理 6353012AF1099301 32015019  2025-09-23 17:11:49 TRU OM422 CLASSA 升级 APPS KEY APP_KEY 6353012AF1093064  320144AF 2025-09-22  15:25:52 TR 模型管理 请输入 请输入 6353012AF1093063  320144AE 2025-09-22  15:25:52 RX1DR_OFFSET 系统管理 NWKS KEY 320144AD 2025-09-22  15:25:52 6353012AF1093062 TRU 0 请输入 6353012AF1093061 2025-09-22  15:25:52 320144AC TRU RX_DELAY RX2DR 6353012AF1090498 32013AA8 2025-09-22  15:25:52 TRU RX2_FREG RX_DELAY_JOIN 6353012AF1090468 32013A8A 2025-09-2316:35:11 TR 确定 取消 -->
![](./assets/1758660480123-6cdeea96-5a8f-4a52-b6d5-bdb8e404f05d.png)

| 字段名 | 是否必填 | 说明 |
| --- | --- | --- |
| `devEui` | 必填 | 设备唯一标识符（EUI），全局唯一，不可重复。 |
| `devAddr` | ABP 模式下必填 | 设备地址，确保在网络中不冲突。 |
| `enable` | 必填（默认值：`TRUE`） | 是否启用该设备。`TRUE` 表示启用，`FALSE` 表示禁用。 |
| `down_enable` | 必填（默认值：`TRUE`） | 是否允许下行通信。`TRUE` 允许，`FALSE` 禁止。 |
| `lw_ver` | 必填（建议值：`1.0.2`） | LoRaWAN 协议版本。推荐填写 `1.0.2`，兼容大多数 1.0.3 和部分 1.0.4 地区协议。 |
| `standard` | 必填 | 频段标准，可选：   • CN470   • EU433   • EU868   • AS923   • AU915   • US902 |
| `class_mode` | 必填（默认值：`ClassA`） | 设备正常工作模式，可选：`ClassA` 或 `ClassC`。 |
| `join_class_mode` | 必填（默认值：`ClassA`） | 重入网后的工作模式，应与设备实际行为一致。 |
| `app_key` | OTAA 模式下必填 | OTAA 加密密钥（应用主密钥）。 |
| `apps_key` | ABP 模式下必填 | 应用会话密钥。 |
| `nwks_key` | ABP 模式下必填 | 网络会话密钥。 |
| `rx1dr_offset` | 必填（默认值根据频段自动填充） | 下行窗口 RX1 的 DR 偏移量，不同地区标准有差异。 |
| `rx2dr` | 必填（默认值根据频段自动填充） | RX2 窗口的传输速率（Data Rate）。 |
| `rx_delay` | 必填（默认值：1） | 上行数据后，第一个下行接收窗口的延迟时间（单位：秒）。 |
| `rx_delay_join` | 必填（默认值：5） | Join 流程中的下行响应延迟时间（单位：秒）。 |
| `rx2_freq` | 必填（默认值根据频段自动填充） | RX2 接收窗使用的固定频率，依地区标准而定。 |


> 📌**提示**：在添加新设备档案时，只需选定正确的 `standard`（频段）和 `lw_ver`（协议版本），其余参数将自动填充为对应标准的默认值，简化配置流程。
>

### 批量导入 LoRaWAN 设备
对于大规模部署场景，支持通过 Excel 表格批量导入 LoRaWAN 设备档案。

1. 下载标准模板文件（参考示例格式<font style="color:rgba(0, 0, 0, 0.88);">：</font>[mt_sdev_pf_macs--1756347416255.xlsx](https://mensikeji.yuque.com/attachments/yuque/0/2025/xlsx/761760/1758698571917-10cfd98a-55fb-4912-8042-c5c075faeb5e.xlsx)）；
2. 按照字段要求填写设备信息；
3. 校验无误后上传至系统；
4. 系统自动校验并导入设备档案。

## 新增设备
### 新增单个设备
在完成 LoRaWAN 设备档案配置后，可将其注册为平台管理设备。

| 字段 | 说明 |
| --- | --- |
|**EUI** | 设备的唯一编号，在 ThinkLink 系统内必须唯一。 |
|**名称** | 用户自定义的设备名称，便于识别和管理。 |
|**设备类型** | 可以为设备或者资产，资产为变量值重新组合后的虚拟体 |
|**配置模板** | 可选择已预设的配置模板，快速绑定物模型、RPC 等功能配置。 |


> ✅**操作建议**：使用配置模板可大幅提高设备上线效率，特别适用于同型号设备批量部署。
>

<!-- 这是一张图片，ocr 内容为：设备管理 添加设备 展开 请输入 查询 重置 EUI: EUI 名称 请输入 请输入 设备类型 配置模板 I DL导出 立 导入 新增 设备 DEFAULT 操作 标签 遥测数据来源 THINKONE 详情更多 KS52 确定 取消 详情 更多 -->
![](./assets/1758149591025-9241c4b0-5bf3-4350-89df-baebe4e06944.png)

### 批量增加设备
可以通过 Excel 表格进行设备信息的批量导入。操作方法如下：

1. 可先勾选一个已有设备，点击“导出”按钮，下载该设备的档案信息模板；
2. 在此基础上填写或修改其他设备的信息，**必须填写**`EUI`**字段**（EUI 为设备的唯一标识）；
3. 若部分参数无需导入或修改，可直接删除对应列；
4. 完成表格编辑后，执行批量导入操作：
+ **若系统中已存在相同 EUI 的设备**：系统将更新该设备的对应参数；
+ **若系统中不存在该 EUI 的设备**：系统将作为新设备进行添加。

> ⚠️ 请确保每个设备的 EUI 唯一且准确，以保证导入结果符合预期。
>

## 设备详情页功能模块
进入任一设备详情页面后，可进行以下高级配置与监控操作。

<!-- 这是一张图片，ocr 内容为：THINK LINK 设备配置 仪表板 设备管理 服务端属性 设备关联 共享属性 物模型 RPC 触发器 客户端属性 遥测数据 基本信息 应用数据 请输入 EUI: 网络数据 EUI ZMF测试 设备名称 6353012AF1090498 运维管理 设备管理 设备 设备类型 在线 设备状态 标签 网关管理 KS52X 最后上数时间 2025-09-18 07:51:01 KS52 TAGS 仪表板管理 定时任务 请选择 定时任务 实时存储 BACNET 升级 请选择 请选择 THINGSBOARD BACNET 模板管理 请选择 请选择 THIRDPARTY HOMEASSISTANT 模型管理 LORAWAN档案 请选择 地理位置 系统管理 取消 确定 -->
![](./assets/1758154836081-8b45f54a-ee8c-4cb2-b17c-11852de2b9f7.png)

### 新增物模型
+ 点击「新增」按钮，可为设备挂载一个物模型。
+**一个设备可挂载多个物模型**，以解析不同类型的数据报文（如传感器数据、状态上报、事件通知等）。
+ 物模型负责将原始二进制 payload 解析为结构化的应用层数据（如温度、湿度、开关状态等）。

### 新增 RPC
+ 支持为设备挂载多个远程过程调用（RPC）模型。
+ 用于实现对设备的反向控制指令下发（如远程重启、参数修改、固件升级等）。

### 服务端属性（Server Attributes）
+ 属于业务层逻辑参数，独立于设备上报的实际数据。
+ 示例：温湿度告警阈值、心跳检测周期、用户备注等。
+ 可在物模型脚本或 RPC 中被调用，参与逻辑判断。

> 🔧 用户可通过界面手动增删服务端属性。
>

### 共享属性（Shared Attributes）
+ 存储于设备侧，但可在服务端和设备侧双向更新。
+ 典型用途：设备工作模式、采样间隔、OTA 更新标记等。
+ 可在物模型解析上行报文时提取并同步至平台。

### 遥测数据（Telemetry Data）
+ 实时保存设备最新一次上报的遥测信息及其时间戳。
+ 包括温度、电压、位置、状态码等动态变化数据。

### 设备关联
<!-- 这是一张图片，ocr 内容为：设备配置 侧数据 设备关联 基本信息 物模型 绑定主设备 从设备: 设备关联-当前设备 (6353012AF1093063) 变更通知项 从设备 操作 主设备: A153012AF1000001 请选择 变更通知项: 遥测数据 客户端属性 遥测数据 共享属性 服务端属性 设备关联-当前设备:主设备 十 主设备 操作 从设备 变更通知项 主设备类型 遥测数据 设备 A153012AF1000001 6353012AF1093061 编辑删除 设备 编辑删除 遥测数据 6353012AF1093062 A153012AF1000001 编辑删除 设备 遥测数据,客户端属性,共享属性,服务端属性 6353012AF1093063 A153012AF1000001 设备 遥测数据 编辑删除 6353012AF1093064 A153012AF1000001 -->
![](./assets/1758336070606-15953a57-7aa8-407a-ad45-803295105df1.png)

+ 支持为主设备添加从设备，或为从设备指定主设备，构建设备拓扑关系。
+ 关联类型支持：
    - 从设备 → 主设备
    - 主设备 ← 多个从设备

当关联设备的以下数据发生变化时，系统将自动触发通知至主设备：

| 变更类型 | 触发条件 |
| --- | --- |
| 遥测数据 | 从设备上报新的 telemetry |
| 共享属性 | 平台或设备修改 shared attributes |
| 服务端属性 | 业务系统修改 server attributes |


主设备可通过物模型中的脚本处理这些变更数据，实现聚合计算、联动触发等功能。

###  资产类物模型示例：多设备温湿度平均值计算
以下是一个典型的资产级物模型应用案例：主设备代表“空调区域”，下属四个温湿度传感器作为从设备。每当任一从设备上报数据时，主设备自动计算当前区域的平均温湿度。

场景说明：

+ 主设备关联了 4 个从设备；
+ 各从设备定期上报自身温湿度（t, h）；
+ 主设备物模型脚本实时聚合数据并更新 avgT（平均温度）、avgH（平均湿度）。

示例脚本如下：

```javascript
let preTelemetry = device.telemetry_data[thingModelId];
let tempetrature;
let humidity;
if (!noticeAttrs.telemetry_data) {
        return {
            telemetry_data: null,
            server_attrs: null,
            shared_attrs: null,
        }
  }
// 遍历所有从设备模型ID，提取最新温湿度
msg.thing_model.forEach((tid) => {
  if (msg.telemetry_data[tid].t != null) {
    tempetrature = msg.telemetry_data[tid].t;
    humidity = msg.telemetry_data[tid].h;
  }
});

let avgT = device.telemetry_data[thingModelId]?.avgT || 0;
let avgH = device.telemetry_data[thingModelId]?.avgH || 0;

// 构造服务端属性，记录各从设备最后一次数据
let attrs_server = {
  [msg.eui]: {
    "tempetrature": tempetrature,
    "humidity": humidity
  }
};

// 初始值判断
if (avgT === 0) avgT = tempetrature;
if (avgH === 0) avgH = humidity;

// 计算平均值（此处仅为简单累加示例，实际建议使用加权或滑动平均）
avgT = (avgT + tempetrature) / 2;
avgH = (avgH + humidity) / 2;

// 返回更新后的遥测数据
let attrs_telemetry = {
  "avgT": avgT,
  "avgH": avgH
};

return {
  telemetry_data: attrs_telemetry,
  server_attrs: attrs_server,
  shared_attrs: null,
};
```

> 此模型广泛应用于楼宇环境监测、冷链仓储、智慧农业等需要“区域级数据聚合”的场景。
>
