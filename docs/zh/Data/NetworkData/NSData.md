# 1. NS 数据
NS 数据是 ThinkLink（TKL）系统中用于实时订阅 LoRaWAN MAC 层通信的原始数据，订阅的是网关与NS之间通信的数据。通过查看 NS 数据，用户可以获取设备与网关之间上行和下行的完整数据包信息，便于进行深度调试、网络性能分析和故障排查。

## 1.1. 数据格式
NS 数据可以以 JSON 格式查看，包含完整的物理层和链路层参数，能够清晰反映每一次无线通信的上下文环境。以下是典型的 NS 数据格式示例：

```json
{
  "EUI": "5a53012501030011",
  "token": 35160,
  "payload": {
    "rxpk": {
      "mid": 8,
      "chan": 4,
      "codr": "4/5",
      "data": "QKg6ATIAQ2sL/g+03laRsIW5iqvAAD0TohUdGw==",
      "datr": "SF7BW125",
      "foff": 9,
      "freq": 471.1,
      "jver": 1,
      "lsnr": 12,
      "modu": "LORA",
      "rfch": 1,
      "rssi": -95,
      "size": 28,
      "stat": 1,
      "time": "2025-09-24T07:02:03.802672Z",
      "tmst": 2379579148,
      "rssis": -96
    }
  },
  "version": 2,
  "identifier": 0
}
```

```json
{
  "EUI": "5a53012501030011",
  "token": 52914,
  "payload": {
    "txpk": {
      "codr": "4/5",
      "data": "YKg6ATIm+AkNqlP+VU6cdZ50",
      "datr": "SF7BW125",
      "fdev": 0,
      "freq": 501.5,
      "imme": false,
      "ipol": true,
      "modu": "LORA",
      "ncrc": false,
      "powe": 22,
      "prea": 8,
      "rfch": 1,
      "size": 18,
      "time": "",
      "tmms": 0,
      "tmst": 760845965
    }
  },
  "version": 2,
  "identifier": 3
}
```

> **说明**：
>
> + `rxpk` 字段表示从终端设备到网关的**上行数据包**，包含信号强度（RSSI）、信噪比（LSNR）、频率、时间戳等关键参数。
> + `txpk` 字段表示从网关到终端设备的**下行数据包**，可用于验证指令下发是否成功。
> + `data` 字段为 Base64 编码的原始负载数据，可在后续流程中结合物模型进行解析。
>

<!-- 这是一张图片，ocr 内容为：THINK LINK DEMO TKC DEMO 首页 收起 重置 查询 仪表板 应用数据 网络数据 序号 上报时间 类型 FREG GWEUI DATA DATR NS数据 2025-09-2414:35:04 501.5 60 A8 3A 01..... " SF7BW125 5A53012501030011 TXPK AS数据 E三178900 CODE 运维管理 123456789013344 "EUI": "5A53012501030011", 模型管理 "TOKEN": 52914, 'PAYLOAD": "TXPK": 系统管理 "CODR":"4/5". ": "YKA6ATIM+AKNGLP+VU6CDZ50", "DATATA "DATR": "SF7BW125", "FDEV": 0, "FREG'' 501.5 "IMME'" FALSE, "IPOL": TRUE, "LORA". "MODU'': COL:2 464 CHARACTERS SELECTED LN:26 -->
![](./assets/1758697572433-5e836fea-21b6-49ec-98b6-439d1987029a.png)

## 1.2. LoRaWAN数据解析
此功能特别适用于开发人员在部署初期对传感器通信状态进行全面监控，确保数据可靠传输。

点击数据报文的"+" 可查看针对NS数据LoRaWAN NS 的报文解析。

<!-- 这是一张图片，ocr 内容为：40 E0 33 01.... 2025-12-08 16:06:16 85 5A53012501030011 280133E0 UNCONFIRMED DATA UP RXPK ORIGIN CONTENT PARSED DATA T兰 世三 CODE CODE POVRED BY ACE 1-H 1-K "EUI":"5A53012501030011", "MIC":"06747B9E", 23 23456789 'TOKEN': 5398 "FCNT":4401 'PAYLOAD":{ "FCTR": 4567893123 "ACK":FALSE, "RXPK": "MID":0 "ADR'':TRUE, "CLASSB":FALSE, "CHAN":4 "CODR'':"4/5". "FOPTSLEN'':0, "DATA":"QOAZASIAMRFVKLR8 "ADRACKREG":FALSE /AMTOZ0SALCNO7POOBYANK3M1D9VSLKGDHUE", "FOPTS":[], "DATR":"SF11BW125", 7012 "FOFF":284, "FPORT":85, "FTVPE": "UNCONFIRMED DATA UP", "FREG":471.1 LN:1 COL:1 LN:1 COL:1 -->
![](./assets/1765181249563-29f19671-766c-405b-8344-eb3fc8faa2d8.png)
