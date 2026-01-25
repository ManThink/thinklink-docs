NS data is the original data used to subscribe to LoRaWAN MAC layer communication in the ThinkLink(TKL) system in real time, and the data subscribed to is the data communicated between the Gateway and NS. By viewing NS data, users can obtain the complete uplink and downlink data packet information between the device and the gateway, which is convenient for in-depth debugging, network performance analysis and troubleshooting. 

## Format of NS data
NS data can be viewed in JSON format, including complete physical layer and link layer parameters, which can clearly reflect the context of each wireless communication. The following is an example of a typical NS data format: 

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

> **description **: 
>
> + `rxpk `field represents ** upstream data packet **, including signal strength (RSSI), signal-to-noise ratio (LSNR), frequency, timestamp and other key parameters. 
> + `txpk `field represents ** downlink data packet**, which can be used to verify whether the instruction is successfully issued. 
> + `data `the fields are base64-encoded raw payload data, which can be parsed with the binding model in subsequent processes. 
>

<!-- 这是一张图片，ocr 内容为：THINKLINK 刘 TIKL DEMO ADMIN HOME NS DATA DASHBOARD GWEUI: TIME RANGE: 2025-10-20 00:01-2025-10-21 00:00 日 RESET QUERY PLEASE ENTER 目 APPLICATION DATA NETWORK DATA 容工 W NS DATA UPDATE TIME GWEUI INDEX CODR DATR FREQ SNR DATA TYPE AS DATA 5A53012501030059 2025-10-20 08:09 80DB 55 01.... SF9BW125 924.2 4/5 11.8 RXPK MAINTENANCE 60DB 55 01..... - 2025-10-20 08:02:05 SF9BW125 5A53012501030059 923.8 4/5 TXPK MODEL YRM山业 SYSTEM CODE 1-H 23 "EUI":'5A53012501030059", TOKEN''43391. 4- 'PAYLOAD":( 5678901133 "TXPK":' "CODR'''4/5". : "YNTVATIGTEOA2CJA", "DATA": "DATR":"SF9BW125", "FDEY": "FREQ":923.8 " IMME": FALSE, "IPOL":TRUE, "MODU": LORA COL:1 LN:1 80 DB 55 01.... SF9BW125 10.5 2025-10-20 08:02:04 5A53012501030059 923.8 DXPK 4/5 -->
![](./assets/1760918556396-e75675e7-50e4-4fed-ad49-e9fa39fd6e36.png)

## Decoder of LoRaWAN
This feature is especially useful for developers to fully monitor sensor communication early in deployment to ensure reliable data transmission. 

<font style="color:rgb(0, 0, 0);">Click the "+" next to the data message to view the LoRaWAN NS message parsing for NS data.</font>

<!-- 这是一张图片，ocr 内容为：40 E0 33 01.... 2025-12-08 16:06:16 85 5A53012501030011 280133E0 UNCONFIRMED DATA UP RXPK ORIGIN CONTENT PARSED DATA T兰 世三 CODE CODE POVRED BY ACE 1-H 1-K "EUI":"5A53012501030011", "MIC":"06747B9E", 23 23456789 'TOKEN': 5398 "FCNT":4401 'PAYLOAD":{ "FCTR": 4567893123 "ACK":FALSE, "RXPK": "MID":0 "ADR'':TRUE, "CLASSB":FALSE, "CHAN":4 "CODR'':"4/5". "FOPTSLEN'':0, "DATA":"QOAZASIAMRFVKLR8 "ADRACKREG":FALSE /AMTOZ0SALCNO7POOBYANK3M1D9VSLKGDHUE", "FOPTS":[], "DATR":"SF11BW125", 7012 "FOFF":284, "FPORT":85, "FTVPE": "UNCONFIRMED DATA UP", "FREG":471.1 LN:1 COL:1 LN:1 COL:1 -->
![](./assets/1765181293728-d0c52f56-55ae-42d3-8bc5-af4db0fd60c8.png)
