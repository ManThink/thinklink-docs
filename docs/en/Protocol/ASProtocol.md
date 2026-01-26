# 1. Application Protocol of LoRaWAN NS
This protocol defines the message format used when LoRaWAN forwards decrypted data via MQTT. 
The `payload` field contains the data sent by the end device, which has already been decrypted by the LoRaWAN Network Server (NS).
## 1.1. Role of the LoRaWAN NS
The LoRaWAN Network Server (NS) is a core component of the LoRaWAN architecture, primarily responsible for the following functions:

+ Managing communication between end devices and gateways
+ Handling MAC layer protocols
+ Implementing Adaptive Data Rate (ADR) control
+ Managing device activation and security authentication
+ Data routing and forwarding
+ Downlink data scheduling

## 1.2. Relationship between NS and Application Server
The NS and the Application Server (AS) communicate via the MQTT protocol to achieve the following interactions:

+ The NS forwards uplink data from end devices to the AS.
+ The AS sends downlink data to end devices through the NS.
+ The NS provides network status and device status information to the AS.

**Communication Characteristics:**

+ Uses MQTT protocol as the transport layer.
+ The message body uses JSON format.
+ Supports bidirectional asynchronous communication.
+ Message routing is based on topics.

## 1.3. Uplink Data Protocol (Up Protocol)

### 1.3.1. Message Categories
Uplink messages are divided into the following types:

+ `data`: Fast uplink message (forwarded immediately).
+ `dataAll`: Complete uplink message (waits for data collection from multiple gateways).
+ `ack`: Downlink acknowledgment message.
+ `mac`: MAC layer command message.
+ `gw`: Gateway status message.
+ `dataIP`: IP interface data message.

### 1.3.2. Basic Message Format
```json
{
  "version": "3.1",
  "moteeui": "3f53012a000050a9",
  "if": "loraWAN",
  "token": 135,
  "type": "data",
  "userdata": {
    "class": "ClassC",
    "confirmed": false,
    "seqno": 42158,
    "port": 3,
    "payload": "vV0="
  },
  "moteTx": {
    "freq": 471.7,
    "modu": "LORA",
    "datr": "SF12BW125",
    "codr": "4/5"
  },
  "gwrx": [
    {
      "eui": "b100000000000128",
      "time": "",
      "tmms": 0,
      "tmst": 0,
      "ftime": 0,
      "chan": 7,
      "rfch": 1,
      "rssi": -43,
      "lsnr": 14.2
    }
  ],
  "geoInfo": {
    "longitude": 116.49325007243958,
    "latitude": 39.78473521213761,
    "altitude": 0,
    "accuracy": 50,
    "type": "gw:wifi"
  }
}
```

+ **version**: Protocol version number.
+ **moteeui**: Unique device identifier (DevEUI).
+ **if**: Interface type (e.g., loraWAN, can, 485, mbus).
+ **token**: Message sequence number.
+ **type**: Message type.
+ **userdata**: Application data.
    - **class**: Device operating mode (ClassA/B/C).
    - **confirmed**: Whether it is a confirmed message.
    - **seqno**: Uplink sequence number.
    - **port**: Application port.
    - **payload**: Base64-encoded application data.
+ **moteTx**: Radio transmission parameters.
    - **freq**: Frequency (MHz).
    - **modu**: Modulation type.
    - **datr**: Data rate.
    - **codr**: Coding rate.
+ **gwrx**: Array of gateway reception information.
    - **eui**: Gateway EUI.
    - **time**: Reception time.
    - **tmms**: GPS-synchronized timestamp.
    - **tmst**: Relative timestamp (μs).
    - **ftime**: Time on air.
    - **chan**: LoRa channel number.
    - **rfch**: LoRa link number.
    - **rssi**: Received Signal Strength Indicator (dBm).
    - **lsnr**: Signal-to-Noise Ratio (dB).
+ **geoInfo**: Geolocation information.
    - **longitude**: Longitude.
    - **latitude**: Latitude.
    - **altitude**: Altitude.
    - **accuracy**: Accuracy.
    - **type**: Source of the location information.

### 1.3.3. Uplink Message Topic
| Message Type | Topic Format | Description |
| :--- | :--- | :--- |
| Fast Message | `/v32/{tenant}/as/up/data/{deveui}` | NS forwards data immediately upon receipt, without waiting for data collection from multiple gateways. |
| Complete Message | `/v32/{tenant}/as/up/dataAll/{deveui}` | NS forwards data after completing data collection from multiple gateways. |


+ `{tenant}`: Organization name identifier.
+ `{deveui}`: Device EUI.
+ The message body format for both message types is the same; the only difference is the timing of forwarding and data completeness.

## 1.4. Downlink Data Protocol (Down Protocol)
### 1.4.1. Basic Message Format
```json
{
  "version": "3.1",
  "type": "dataIP",
  "if": "485",
  "moteeui": "3f53012a00004081",
  "token": 1,
  "userdata": {
    "confirmed": false,
    "fpend": false,
    "port": 61,
    "payload": "gSQBAAAAdARQJ/sA",
    "specify": {
      "gweui": "",
      "txTime": ""
    }
  }
}
```

**Field Descriptions:**

+ **version**: Protocol version number.
+ **type**: Message type (e.g., `data`, `dataIP`, `dataClear`).
+ **if**: Interface type.
+ **moteeui**: Device EUI.
+ **token**: Message sequence number.
+ **userdata**: Application data.
    - **confirmed**: Whether it is a confirmed message.
    - **fpend**: Whether to request the device to initiate a pull data request.
    - **port**: Application port (-1 for MAC command, 0 for Payload MAC command, >0 for normal port).
    - **payload**: Base64-encoded downlink data.
    - **specify**: Special parameters.
        * **gweui**: Specify the sending gateway (empty means not specified).
        * **txTime**: Reserved field.

### 1.4.2. Downlink Acknowledgment Message
#### 1.4.2.1. Topic Format
`/v32/{tenant}/as/up/ack/{deveui}`

#### 1.4.2.2. Message Content
```json
{
  "version": "3.1",
  "type": "ackSeq",
  "moteeui": "3f53012a00004081",
  "token": 1,
  "msg": "OK",
  "seq": 83257
}
```

**Field Descriptions:**

+ **type**: Acknowledgment type (`ackSeq`/`ackTx`).
    - `ackSeq`: Acknowledges the frame number (indicates NS has received the downlink data).
    - `ackTx`: Acknowledges transmission (indicates data has been sent to the device).
+ **token**: Corresponds to the `token` of the original downlink message.
+ **msg**: Status information ("OK" for success, otherwise the reason for failure).
+ **seq**: Downlink sequence number assigned by the NS (-1 on failure).

**Acknowledgment Flow:**

1. **For LoRaWAN devices:**
    - First acknowledgment (`ackSeq`): Sent back after the NS receives the downlink data.
    - Second acknowledgment (`ackTx`): Sent back after the data is transmitted to the device.
2. **For IP DTU devices:**
    - First acknowledgment (`ackSeq`): Sent back after the data is transmitted.
    - Second acknowledgment (`ackTx`): Sent back only in case of a timeout event.

### 1.4.3. Downlink Message Topic
| Topic Format | Subscriber | Sender | Description |
| :--- | :--- | :--- | :--- |
| `/v32/{tenant}/as/dn/data/{deveui}` | NS | AS | AS  downlink data to the NS. |


#### 1.4.3.1. Downlink Data Example
```json
{
  "version": "3.1",
  "moteeui": "34010134112b8001",
  "type": "data",
  "if": "loraWAN",
  "token": 1,
  "userdata": {
    "confirmed": false,
    "fpend": false,
    "port": 61,
    "payload": "gSQBAAAAdARQJ/sA",
    "intervalms": 0,
    "dnWaitms": 0,
    "specify": {
      "gweui": "",
      "txTime": ""
    }
  }
}
```

#### 1.4.3.2. Example of Clearing Downlink Buffer
```json
{
  "version": "3.1",
  "moteeui": "34010134112b8001",
  "type": "dataClear",
  "if": "loraWAN",
  "token": 1,
  "userdata": {
    "confirmed": false,
    "fpend": false,
    "port": 61,
    "payload": "gSQBAAAAdARQJ/sA",
    "intervalms": 0,
    "dnWaitms": 0,
    "specify": {
      "gweui": "",
      "txTime": ""
    }
  }
}
```

1. **type=dataClear**: Clears the pending data in the NS buffer while sending the current downlink data.
2. **intervalms**: The waiting interval (in ms) for downlinks to the same device. 0 means no waiting.
3. **dnWaitms**: Downlink wait interval (in ms). If the NS does not receive a reply after `dnWaitms` seconds, it will reply to the AS that this data packet failed to send.
4. **specify.gweui**: If not empty, specifies a particular gateway to send the data.

