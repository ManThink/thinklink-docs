# 1. ThinkLink
ThinkLink是一款集成LoRaWAN网络服务器(NS)的**全栈式物联网平台**，提供：

+ LoRaWAN设备与网关管理
+ 多协议接入（MQTT/BACnet/Modbus TCP等）
+ 云端/边缘计算部署（支持云服务器/TKE边缘计算/嵌入式网关）
+ 端到端数据生命周期管理

## 1.1. 核心功能
### 1.1.1. 数据管理
| 功能模块 | 能力描述 |
| --- | --- |
| **物模型** | 将原始数据（LoRaWAN/第三方）解析为结构化数据，支持表格/仪表板可视化 |
| **资产管理** | 跨设备数据聚合分析，支持多维数据建模 |
| **EB云编译** | 云端完成EB代码编译与固件下载 |


### 1.1.2. 设备控制
+ **RPC模型**：远程参数配置与指令下发
+ **联动引擎**：设备间自动化规则

### 1.1.3. 监控告警
+ 多级告警阈值设置
+ 邮件/短信等通知渠道
+ 实时告警看板

## 1.2. 接入方式
| 方式 | 数据流向 | 适用场景 |
| --- | --- | --- |
| **AS接口** | 原始数据上行/下行 | 需要直接操作LoRaWAN MAC层 |
| **物模型接口** | 仅解析后数据上行 | 应用层数据处理 |


## 1.3. 连接配置
### 1.3.1. 组织账号信息
`个人中心 > 组织列表`

<!-- 这是一张图片，ocr 内容为：TKL 个人中心 DEMO MANTHINK 个人档案 组织列表 组织列表 请输入 展开V 组织账号: 请输入 查询 画量 C 工 空 新建组织 是否所有者 操作 名称 所有者 ID 组织账号 是 删除 22648786538991621 进入平台退出 MANTHINK(22648402131030021) DEMO DEMO 第1-1条/总共1条 -->
![](./assets/1759456230055-d6dcb833-8e9f-49f9-91a4-0bd2e2bae45e.png)

### 1.3.2. MQTT凭证
`系统管理 > 服务器配置 > 内部MQTT`

+ Broker地址：`thinklink.manthink.cn:1883` （TKE 或者独立部署，请与部署工程师联系）
+ 密码：组织创建时设定

<!-- 这是一张图片，ocr 内容为：TKL THINKLINK 刘 DEMO MANTHINK 金首页 服务器配置 仪表板 内部MQTT 目应用数据 密码 账号: DEMO 网络数据 查看ACL权限 刷新 提交 运维管理 模型管理 THINGS BOARD 系统管理 京 运行状态: R 用户管理 请输入 PORT: PORT PROTOCOL: ACCESS TOKEN: PROTOCOL HOST: HOST 角色管理 重启 提交 停止 刷新 胎服务器配置 HOMEASSISTANT -->
![](./assets/1759457624492-cee94cde-5e78-4510-912a-b6ddef008a3b.png)

## 1.4. 通信 topic
与ThinkLink的协议对接有两种方法，第一种是与AS协议接口，可获取到LoRaWAN NS的上行的数据，并可通过下行接口将数据下发给设备。

第二种方法是获取通过ThinkLink的物模型解析后的数据。第二种方法，只能获取解析后的数据，下行数据则需要通过AS协议接口进行数据下行，或者将AS协议的下行接口封装成RPC，通过调用RPC的方式进行数据下行。

```plain
# 2. AS接口
上行订阅：/v32/{Orgnization Account}/as/up/data/{deveui}
下行发布：/v32/{tenant}/as/dn/data/{deveui}

# 3. 遥测数据接口
上行订阅：/v32/{Orgnization Account}/tkl/up/telemetry/{deveui}
# 4. 下行数据接口
/v32/{Organization Account}/tkl/dn/rpc/{eui}
```

 {Orgnization Account}  用自己的组织账号替代，可以在个人中心中对应的组织查到

 {deveui} 是设备的唯一编号，上行订阅时可以用通配符 # 替代 ，下行数据发送时必须要填写准确的devEui

### 4.1. 数据格式规范
第三方平台与 ThinkLink（简称 TKL）之间的数据交互支持两种方式：

1. 通过 **AS 协议** 获取设备上行的原始数据；
2. 通过订阅 **物模型解析后的数据**，实现更高层级的数据集成与业务处理。

用户可根据实际需求选择合适的数据接入模式。

### 4.2. AS 协议接入
**AS 协议**适用于需要直接获取 LoRaWAN 设备原始 payload 的场景，基于 MQTT 发布/订阅机制实现高效通信。
<br><a class="action-button primary" href="/zh/Protocol/ASProtocol">AS 协议</a>
#### 4.2.1. 上行数据订阅 Topic
```plain
/v32/{Organization Account}/as/up/data/#
```

第三方平台可通过订阅该通配符主题，接收指定租户下所有设备的上行原始数据。

#### 4.2.2. 下行指令发送 Topic
```plain
/v32/{Organization Account}/as/dn/data/{devEui}
```

向特定设备发送下行指令时，需将：

+ `{Organization Account}` 替换为实际组织账号（例如 `"demo"`）；
+ `{devEui}` 替换为目标设备的唯一标识符 **DevEui**。

> **说明**：此协议适用于对原始数据有定制化解析逻辑的应用场景，便于用户在外部系统中进行独立的数据解码和处理。
>

### 4.3. 物模型数据接口
通过物模型接口，ThinkLink 系统会根据预设的物模型配置自动完成原始数据的解析，输出结构化的应用层数据，极大简化上层系统的集成工作。

+ **上行数据** 为设备上报的遥测信息，需通过订阅对应 Topic 实时获取；
+ **下行控制** 则通过调用设备关联的 **RPC 方法** 实现远程操作与参数下发。

> 🔹 支持通用 LoRaWAN 下发 RPC：`[MT DATA] down data`，`method=mt_dn_data`
>

#### 4.3.1. 遥测数据（Telemetry）
遥测数据指设备周期性或事件触发上报的传感器读数或其他监测值。

#### 4.3.2. 订阅 Topic
```plain
/v32/{Organization Account}/tkl/up/telemetry/{eui}
```

| 参数 | 说明 |
| --- | --- |
| `{Organization Account}` | 组织账号，如 `demo` |
| `{eui}` | 设备的 EUI 唯一标识 |


#### 4.3.3. 数据格式示例
```json
{
  "eui": "a00000000000001",
  "thingModelId": "1",
  "thingModelIdName": "SE73",
  "telemetry_data": {
    "temp": 1.0,
    "hum": 2
  }
}
```

📌 字段说明：

+ `thingModelId` 与 `thingModelIdName`：表示当前数据所关联的物模型，在【物模型列表】中可查 ；
+ `telemetry_data`：承载具体传感数据，其内部字段结构由物模型定义决定，详见对应物模型配置。

## 4.1. RPC 控制
用户可通过 MQTT 消息发送 JSON-RPC 2.0 格式的请求，实现对设备的远程控制、参数配置等操作。

### 4.1.1. 下行 Topic
```plain
/v32/{Organization Account}/tkl/dn/rpc/{eui}
```

| 参数                       | 说明 |
|--------------------------| --- |
| `{Organization Account}` | 组织账号，例如 `demo` |
| `{eui}`                  | 目标设备的 EUI 标识 |


### 4.1.2. 消息内容格式
```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "set_cov",
  "params": {
    "_eui": "a123456789123456",
    "covTemp": 12,
    "covHumi": 13
  }
}
```

📌 字段说明：

+ `id`：字符串类型，用于标识本次请求的会话 ID；
+ `jsonrpc`：固定填写为 `"2.0"`，表示遵循 JSON-RPC 2.0 协议标准；
+ `method`：指定要执行的 RPC 方法名（即物模型中定义的命令 ID 名称）；
+ `params`：传递给设备的参数对象，必须符合目标 RPC 所需的输入格式；  
其中以 `_` 开头的为系统保留参数，`_eui`**必须提供**，用于明确目标设备。

> ⚠️ **注意事项**：
>
> + 确保目标设备固件已支持所调用的 RPC 功能；
> + 物模型中需正确配置命令映射关系，确保 method 与设备端行为一致。
>

---

> ✅ 提示：推荐优先使用物模型接口进行系统对接，以获得语义清晰、结构统一的数据，提升开发效率与系统稳定性。
>



🌐 官网：[www.manthink.cn](http://www.manthink.cn)  
✉ 技术支持邮箱：info@manthink.cn  
☎ 紧急联系电话：+86-15810684257

