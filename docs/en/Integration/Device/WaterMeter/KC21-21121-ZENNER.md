# Integration of ZENNER's water meter
This document describes the complete integration solution for **ZENNER water meters (DN25 / DN40)** connected via **KC21 data collector**, using **Modbus-RTU protocol** and **EB framework**, and integrated into the **ThinkLink platform**.

The document includes:

+ Device wiring and communication parameters
+ ThinkLink platform usage instructions
+ Telemetry data format and third-party subscription
+ Advanced EB integration details (EBHelper, Thing Model, RPC)

---

## Part 1: User Guide
---

## 2. Meter Device Information
### 2.1 Water Meter Specifications
+ **Brand**: ZENNER
+ **Device Type**: Water Meter
+ **Models**: DN25 / DN40
+ **Power Supply**: External power required
+ **Input Voltage**: DC 12–24V

---

### 2.2 Communication Parameters (RS485 / Modbus-RTU)
| Parameter | Value |
| --- | --- |
| Protocol | Modbus-RTU |
| Baud Rate | 9600 bps |
| Data Bits | 8 |
| Parity | Even |
| Stop Bits | 1 |
| Slave Address | Configurable |


---

### 2.3 Water Meter Wiring
| Wire Color | Description |
| --- | --- |
| Red | Power + |
| Black | Power − |
| Yellow | RS485 A |
| Green / Blue | RS485 B |


---

### 2.4 Official Manuals
+ [https://active.clewm.net/E1Jg6l](https://active.clewm.net/E1Jg6l)
+ [https://active.clewm.net/EeFfJo](https://active.clewm.net/EeFfJo)

---

## 3. Data Collector Information (KC21)
### 3.1 Basic Information
+ **Model**: KC21
+ **Power Supply**: Battery powered
+ **External Power Output**: 15V (for meter power supply)

---

### 3.2 KC21 Wiring
| Wire Color | Description |
| --- | --- |
| Red / Brown | Power + |
| Black | Power − |
| Blue | RS485 A |
| White | RS485 B |


> ⚠️ Ensure RS485 A/B lines are connected correctly between the KC21 and the water meter.
>

---

## 4. ThinkLink Platform Usage
---

### 4.1 Add Device
1. Log in to the ThinkLink platform
2. Go to **Device Management → Add Device**
3. Search and add the following model:

```plain
ZENNER-BATTERY-21121
```

4. Complete device binding

---

### 4.2 Parameter Configuration
Navigation path:

```plain
Device Management → Select Device → Configuration → RPC
```

Select RPC:

```plain
[EB SET] easy para
```

#### Parameters
| Parameter | Description                                                                              |
| --- |------------------------------------------------------------------------------------------|
| period | Meter reading interval (seconds)                                                         |
| addr | Modbus slave address of the water meter<br>start with 0x if hex type<br>otherwise is DEC |


---

### 4.3 Third-Party Data Subscription
#### MQTT Topic
```plain
/v32/{Organization Account}/tkl/up/telemetry/{eui}
```

#### Sample Telemetry Payload
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

#### Protocol Reference
+ [http://think-link.net/docs/zh/Protocol/ThinkLinkProtocol.html](http://think-link.net/docs/zh/Protocol/ThinkLinkProtocol.html)

---

## Part 2: Advanced Integration
---

## 5. Data Acquisition via EBHelper
### 5.1 Communication Protocol
+ **Protocol**: Modbus-RTU
+ **Implementation**: EBHelper
+ **Business Type (BzType)**: 21121

---

### 5.2 Modbus Register Mapping
| Register Address | Description | Data Type |
| --- | --- | --- |
| 0x0007 | EDC voltage status | Uint16BE |
| 0x0008 | EDC alarm status | Uint16BE |
| 0x0004–0x0005 | Total water consumption | FloatBE |


---

### 5.3 OTA Configuration
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

---

### 5.4 EB Compilation Logic
+ EBHelper is used to define Modbus polling logic
+ Event configuration is defined in `eventInfo`
+ OTA file is generated using `buildOtaFile()`
+ Supports periodic Modbus polling and LoRa uplink

---

## 6. Thing Model Mapping
### 6.1 **Uplink Frame Structure**
**Port:** 22

Uses the **EBHelper standard frame format**:

| Field Name | Offset | Length (Bytes) | Description |
| --- | --- | --- | --- |
| version | 0 | 1 | Protocol version, fixed at **0x83** |
| dataType | 1 | 1 | Fixed at **0x32** |
| covStatus | 2 | 1 | Reserved byte (for internal COV processing) |
| status | 3 | 1 | Query event status |
| battery | 4 | 1 | Battery level |
| addr | 5 | 1 | Sub-device address |
| EDC Voltage | 6 | 2 | Big-endian format, **Uint16BE** |
| EDC Alarm | 8 | 2 | Big-endian format, **Uint16BE** |
| Total Flow | 10 | 4 | **FloatBE**, unit: **m³** |


### 6.2 Thing Model Information
| Item | Value |
| --- | --- |
| Thing Model Name | ZENNER |
| Thing Model ID Name | zenner_21121 |
| Event Name | water |


---

### 6.2 Field Mapping
| Field | Description |
| --- | --- |
| total_flow | Total water consumption |
| battery | Battery voltage |
| rssi | Signal strength |
| snr | Signal-to-noise ratio |


---

## 7. Payload Parsing Logic
### 7.1 Telemetry Parsing
+ **LoRa Port**: 22
+ **Data Type**: FloatBE
+ **Precision**: 3 decimal places

---

### 7.2 Parameter Parsing (RPC)
| APP Address | Parameter |
| --- | --- |
| 70 | Polling interval (period) |
| 150 | Modbus slave address |


---

## 8. RPC Parameter Configuration
+ **RPC Name**: `[EB SET] easy para`
+ **RPC ID Name**: `eb_set_easy_para`

| APP Address | Description |
| --- | --- |
| app_70 | Polling period |
| app_150 | Water meter Modbus address |


---

## 9. Summary
This solution provides a complete and reliable integration of **ZENNER water meters** into the **ThinkLink platform** using **EB + KC21**:

+ Remote parameter configuration
+ Periodic meter reading
+ Standard MQTT telemetry for third-party systems
+ Low power consumption and high stability

It is well suited for **water management, irrigation automation, and smart utility projects**.

