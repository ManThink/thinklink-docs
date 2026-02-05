# 真兰水表对接
本文档描述 **ZENNER 水表（DN25 / DN40）** 通过 **KC21 采集设备**，基于 **Modbus-RTU + EB 协议** 接入 **ThinkLink 平台** 的整体方案。  
内容包括：

+ 设备接线与通信参数
+ ThinkLink 平台使用方法
+ 数据上报与第三方订阅方式
+ EB 高级对接实现（EBHelper / 物模型 / RPC）

---

## 第 1 部分：用户使用说明
---

## 2. 对接设备信息（被采集设备）
### 2.1 水表基本信息
+ **品牌**：ZENNER
+ **设备类型**：水表
+ **规格型号**：DN25 / DN40
+ **供电方式**：外部供电
+ **供电电压**：DC 12–24V

### 2.2 通信参数（RS485 / Modbus-RTU）
| 参数项 | 配置 |
| --- | --- |
| 通信协议 | Modbus-RTU |
| 波特率 | 9600 bps |
| 数据位 | 8 |
| 校验位 | 偶校验（EVEN） |
| 停止位 | 1 |
| 默认从站地址 | 可配置（通过 ThinkLink RPC 修改） |


### 2.3 水表接线说明
| 线缆颜色 | 含义 |
| --- | --- |
| 红色 | 电源 + |
| 黑色 | 电源 − |
| 黄色 | RS485 A |
| 绿色 / 蓝色 | RS485 B |


### 2.4 官方说明书
+ [https://active.clewm.net/E1Jg6l](https://active.clewm.net/E1Jg6l)
+ [https://active.clewm.net/EeFfJo](https://active.clewm.net/EeFfJo)

---

## 3. 采集设备信息（KC21）
### 3.1 基本信息
+ **设备型号**：KC21
+ **供电方式**：内置电池
+ **对外供电能力**：15V（可为水表供电）

### 3.2 KC21 接线说明
| 线缆颜色 | 含义 |
| --- | --- |
| 红色 / 棕色 | 电源 + |
| 黑色 | 电源 − |
| 蓝色 | RS485 A |
| 白色 | RS485 B |


> ⚠️ 注意：  
KC21 的 RS485 A/B 需与 ZENNER 水表 A/B 对应连接，避免反接。
>

---

## 4. ThinkLink 平台使用方法
### 4.1 添加设备
1. 登录 ThinkLink 平台
2. 进入 **设备管理 → 新增设备**
3. 搜索并选择模板 <font style="background-color:#D8DAD9;">ZENNER-BATTERY-21121</font>
4. 完成设备创建

---

### 4.2 参数配置（抄表周期 & 地址）
路径：<font style="background-color:#D8DAD9;">设备管理</font> → <font style="background-color:#D8DAD9;">选择设备</font> → <font style="background-color:#D8DAD9;">配置</font> → <font style="background-color:#D8DAD9;">RPC</font>

选择 RPC：<font style="background-color:#D8DAD9;">[EB SET] easy para</font>

#### 参数说明
| 参数名 | 含义 | 说明 |
| --- | --- | --- |
| period | 抄表周期 | 单位：秒 |
| addr | 水表 Modbus 地址 | RS485 从站地址 |


> 参数修改后，设备会自动保存并生效。
>

---

### 4.3 第三方平台数据订阅
#### MQTT Topic
```plain
/v32/{Organization Account}/tkl/up/telemetry/{eui}
```

#### 上报示例数据
```json
{
    "eui": "6353012af10a9331",
    "active_time": "2026-02-05T08:35:48.000Z",
    "thingModelId": "71719731542888453",
    "thingModelIdName": "zenner_21121",
    "telemetry_data": {
        "snr": 13.5,
        "rssi": -51,
        "battery": 3.37,
        "total_flow": 1,
        "update_time": 1770280548000
    }
}
```

#### 协议说明文档
+ [http://think-link.net/tkl-docs/zh/Protocol/ThinkLinkProtocol.html](http://think-link.net/tkl-docs/zh/Protocol/ThinkLinkProtocol.html)

---

## 第 2 部分：高级对接说明
---

## 5. 数据采集实现（EBHelper）
### 5.1 通信协议
+ **协议类型**：Modbus-RTU
+ **实现方式**：EBHelper
+ **BzType**：21121

### 5.2 采集寄存器说明
| 寄存器地址 | 含义 | 数据类型 |
| --- | --- | --- |
| 0x0007 | EDC 电压状态 | Uint16BE |
| 0x0008 | EDC 报警信息 | Uint16BE |
| 0x0004–0x0005 | 总用水量 | FloatBE |


### 5.3 OTA 配置参数
```javascript
let otaConfig = getOtaConfig({
    BaudRate: 9600,
    StopBits: 1,
    DataBits: 8,
    Checkbit: CheckbitEnum.EVEN,
    Battery: true,
    ConfirmDuty: 60,
    BzType: 21121,
    BzVersion: 16
})
```

### 5.4 EB 编译核心逻辑
+ 使用 `EBHelper`
+ 定义 `eventInfo`
+ 调用 `buildOtaFile()` 生成 OTA 文件
+ 支持周期性 Modbus 采集与 LoRa 上报

（源码略，已与当前项目保持一致）

---

## 6. 物模型解析说明
### 6.1 上行帧结构
端口号：<font style="background-color:#E7E9E8;">22</font>

采用EBHelper标准帧结构:

| 字段名 | 偏移 | 长度 (Bytes) | 含义说明 |
| --- | --- | --- | --- |
| `version` | 0 | 1 | 协议版本号，固定为0x83 |
| `dataType` | 1 | 1 | 固定为 0x32 |
| `covStatus` | 2 | 1 | 保留字节（供内部 COV 处理） |
| `status` | 3 | 1 | 查询事件状态 |
| `battery` | 4 | 1 | 电池电量 |
| `addr` | 5 | 1 | 子设备地址 |
| `EDC电压` | 6 | 2 | 大端格式，Uint16BE |
| `EDC报警` | 8 | 2 | 大端格式，Uint16BE |
| 总流量 | 10 | 4 | FloatBE，单位m³ |


### 6.2 物模型信息
| 项目 | 内容 |
| --- | --- |
| 物模型名称 | ZENNER |
| ThingModel ID Name | zenner_21121 |
| 事件名称 | water |


### 6.3 字段映射
| 字段名 | 含义 |
| --- | --- |
| total_flow | 总用水量 |
| battery | 电池电压 |
| rssi | 信号强度 |
| snr | 信噪比 |


---

## 7. Payload 解析逻辑
### 7.1 Telemetry 数据解析
+ LoRa 端口：22
+ 数据类型：FloatBE
+ 精度：3 位小数

```javascript
{   
    name: "totalFlow",
    field_name: "total_flow",
    index: 10,
    type: "floatBE",
    decimal: 3
}
```

### 7.2 参数解析（RPC）
| APP 地址 | 参数 |
| --- | --- |
| 70 | 抄读周期（period） |
| 150 | 水表 Modbus 地址（addr） |


---

## 8. RPC 参数修改说明
+ **RPC 名称**：`[EB SET] easy para`
+ **ID Name**：`eb_set_easy_para`

| 地址 | 含义 |
| --- | --- |
| app_70 | 周期参数 |
| app_150 | 485 地址 |


---

## 9. 总结
+ 本方案实现了 **ZENNER 水表 → KC21 → EB → ThinkLink** 的完整闭环
+ 支持：
    - 远程参数配置
    - 周期性数据采集
    - 标准 MQTT 对接第三方平台
+ 架构稳定、低功耗，适用于水务与灌溉场景

