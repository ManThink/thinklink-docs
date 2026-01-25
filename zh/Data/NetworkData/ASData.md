AS 数据是 ThinkLink（TKL）系统中经过 LoRaWAN 网络服务器（NS）解析后的实时应用层数据。与原始的 NS 数据不同，AS 数据已根据门思科技定义的设备通信协议完成初步解码，便于用户查看上行和下行的结构化日志信息。

门思科技的设备通信协议遵循《[PTL-S05-asp通信协议V3.2](https://mensikeji.yuque.com/staff-zesscp/gqdw7f/uyzkiq?singleDoc#)》标准，该协议详细规定了数据字段的格式、编码方式、消息类型及交互流程。通过 AS 数据，用户可以直观地监控设备上报的遥测信息（如温度、湿度、电量等）以及平台下发的控制指令执行情况。

对于需要接入第三方系统的场景，若希望获取尚未经过 TKL 物模型进一步处理的中间层数据，可通过 MQTT 协议订阅特定的 topic 来实现数据的实时接收与转发。具体订阅方式及 topic 命名规则应参照上述协议文档中的定义进行配置。

## 上行数据示例（up）
```json
{
  "if": "loraWAN",
  "gwrx": [
    {
      "eui": "5a53012501030056",
      "chan": 0,
      "lsnr": 14.2,
      "rfch": 0,
      "rssi": -21,
      "time": "2025-09-24T07:07:03.807677Z",
      "tmms": 0,
      "tmst": 1152383989,
      "ftime": 0
    },
    {
      "eui": "5a53012501030011",
      "chan": 3,
      "lsnr": 12.5,
      "rfch": 0,
      "rssi": -97,
      "time": "2025-09-24T07:07:03.807677Z",
      "tmms": 0,
      "tmst": 2679707811,
      "ftime": 0
    },
    {
      "eui": "5a53012501030058",
      "chan": 3,
      "lsnr": 13.8,
      "rfch": 0,
      "rssi": -37,
      "time": "2025-09-24T07:07:03.807677Z",
      "tmms": 0,
      "tmst": 1832384199,
      "ftime": 0
    }
  ],
  "type": "data",
  "token": 56368,
  "moteTx": {
    "codr": "4/5",
    "datr": "SF7BW125",
    "freq": 470.9,
    "modu": "LORA",
    "macAck": "",
    "macCmd": ""
  },
  "geoInfo": {
    "type": "gw:wifi",
    "accuracy": 50,
    "altitude": 0,
    "latitude": 34.19863,
    "longitude": 108.86273
  },
  "moteeui": "6353012af1090498",
  "version": "3.0",
  "userdata": {
    "port": 11,
    "class": "ClassA",
    "seqno": 27464,
    "payload": "IQcDDG4BAADaBB0C538J",
    "confirmed": false
  }
}
```

> **说明**：
>
> + 此为一条典型的上行数据包，表示终端设备向网关发送数据。
> + `gwrx` 数组展示了多个网关接收到该帧的信号质量（RSSI、LSNR），可用于定位最优路径或分析覆盖情况。
> + `moteeui` 表示发送方设备的唯一标识。
> + `userdata.payload` 为 Base64 编码的有效载荷数据，需结合物模型进行解析以获取实际业务数据（如传感器数值）。
> + `port` 字段用于区分不同的数据类型或功能通道。
> + `geoInfo` 提供了网关的地理坐标信息，适用于支持位置服务的应用场景。
>

## 下行数据示例（dn）
```json
{
  "dn": {
    "if": "loraWAN",
    "type": "data",
    "token": 1758686562078,
    "moteeui": "6353012af1099301",
    "version": "3.0",
    "userdata": {
      "port": 51,
      "type": "data",
      "fpend": false,
      "payload": "/mgSBgNWBQZoHBA1MzMzMzMzM04zAAAAAAAAABY=",
      "dnWaitms": 3000,
      "TxUTCtime": "",
      "confirmed": false,
      "intervalms": 0
    }
  }
}
```

>**说明**：
>
> + 此为一条典型的下行数据包，表示从网络服务器向终端设备下发指令。
> + `moteeui` 指定目标设备地址。
> + `userdata.payload` 为待下发的加密或编码指令内容，通常由应用层生成并经 NS 调度发送。
> + `port` 为 51，常用于设备管理类操作（如参数配置、固件升级等）。
> + `dnWaitms` 表示系统在等待设备下行窗口开启的最大延迟时间，保障数据在合适时机发送。
> + 下行数据可通过 AS 日志确认是否成功调度，并结合设备反馈验证执行结果。
>

<!-- 这是一张图片，ocr 内容为：THINK LINK DEMO TKL DEMO 首页 AS数据 仪表板 重置 时间范围: 请输入 查询 2025-09-241-2025-09-25 展开 DEVEUI: 应用数据 网络数据 类型 操作 帧号 序号 上报时间 DEVEUI NS数据 2025-09-24 12:02:42 复制内容 DN 6353012AF1099301 AS数据 三三117%DCODE POWORED BY ACE 运维管理 123456789 DN  "IF": "LORAWAN", 模型管理 "TYPE": "DATA", "TOKEN": 1758686562078, 系统管理 "MOTEEUI": "6353012AF1099301", "VERSION":"3.0", "USERDATA": 9 "PORT":51, 10 "TYPE": "DATA", 11 "FPEND":FALSE, "PAYLOAD": "/MGSBGNWBQZOHBA1MZMZMZMZM2M04ZAAAAAAAAABY:", "DNWAITMS": 3000 LN:19 COL:2 385 CHARACTERS SELECTED -->
![](./assets/1758698079748-4431347b-bc1c-4a8d-8c51-e20477bfb33c.png)

>**提示**：此功能适用于需自定义数据解析逻辑或对接私有平台的高级集成场景，建议开发人员在调试阶段结合 NS 数据与 AS 数据进行比对验证，以确保数据一致性。
>
