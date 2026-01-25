The AS protocol is suitable for scenarios requiring direct access to the original payload of LoRaWAN devices. It leverages the MQTT publish/subscribe mechanism to achieve efficient communication.

**AS Protocol Reference:**[[EN]  PTL-S05 ASP LoRaWAN NS and Application Server Communication Protocol](https://mensikeji.yuque.com/staff-zesscp/gqdw7f/rq1r3c4piwy64fyl?singleDoc#)**+** Uplink Data Subscription Topic**`/v32/{**<font style="color:rgba(0, 0, 0, 0.88);background-color:rgb(250, 250, 250);">Organization Account</font>**}/as/up/data/#`Third-party platforms can subscribe to this wildcard topic to receive raw uplink data from all devices under a specified tenant.
+** Downlink Command Publishing Topic**  
`/v32/{**<font style="color:rgba(0, 0, 0, 0.88);background-color:rgb(250, 250, 250);">Organization Account</font>**}/as/dn/data/{devEui}`When sending downlink commands to a specific device:
    - Replace `{**<font style="color:rgba(0, 0, 0, 0.88);background-color:rgb(250, 250, 250);">Organization Account</font>**}` with the actual organization account (e.g., "demo");
    - Replace `{devEui}` with the target device’s unique identifier (DevEui).

>** Note **: This protocol is ideal for applications that have custom logic for parsing raw data, allowing independent decoding and processing in external systems.
>

---

###** Thing Model Data Interface **
Through the thing model interface, ThinkLink automatically parses raw data according to predefined thing model configurations, delivering structured application-layer data—significantly simplifying integration with upper-layer systems.

+** Telemetry Data (Uplink)**: Sensor readings or monitoring values reported periodically or triggered by events. Real-time retrieval requires subscription to the corresponding MQTT topic.
+** Device Control (Downlink)**: Remote operations and parameter configuration are achieved by invoking RPC methods associated with the device.

🔹** Supported Generic LoRaWAN Downlink RPC **: `[MT DATA] down data`, method = `mt_dn_data`

---

#### **Telemetry Data**Telemetry data refers to sensor readings or other monitored values periodically or event-triggered by devices.** Subscription Topic**`/v32/{**<font style="color:rgba(0, 0, 0, 0.88);background-color:rgb(250, 250, 250);">Organization Account</font>**}/tkl/up/telemetry/{eui}`

| Parameter | Description |
| --- | --- |
| `{**<font style="color:rgba(0, 0, 0, 0.88);background-color:rgb(250, 250, 250);">Organization Account</font>**}` | Organization account (e.g., demo) |
| `{eui}` | Device's unique EUI identifier |** Data Format Example **

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

📌** Field Description **:

+ `thingModelId` and `thingModelIdName`: Represent the associated thing model; can be found in the [Thing Model List];
+ `telemetry_data`: Carries the actual sensor data; internal field structure is defined by the thing model—refer to the corresponding thing model configuration.

---

####** RPC Control (Remote Procedure Call)** Users can send JSON-RPC 2.0 formatted messages via MQTT to perform remote control and parameter configuration on devices.** Downlink Topic**`/v32/{**<font style="color:rgba(0, 0, 0, 0.88);background-color:rgb(250, 250, 250);">Organization Account</font>**}/tkl/dn/rpc/{eui}`

| Parameter | Description |
| --- | --- |
| `{**<font style="color:rgba(0, 0, 0, 0.88);background-color:rgb(250, 250, 250);">Organization Account</font>**}` | Organization account (e.g., demo) |
| `{eui}` | Target device's EUI identifier |** Message Payload Format **

```json
{
  "id": "1",
  "jsonrpc": "2.0",
  "method": "set_cov",
  "params": {
    "_eui": "a123456789123456",
    "covTemp": 12,
    "covHumi": 13
  }
}
```

📌** Field Description **:

+ `id`: String type; used to identify the session ID of the request;
+ `jsonrpc`: Fixed as `"2.0"`; indicates compliance with the JSON-RPC 2.0 standard;
+ `method`: Specifies the RPC method name defined in the thing model (i.e., command ID);
+ `params`: Parameter object passed to the device; must conform to the required input format of the target RPC method;

> Parameters starting with `_` are system-reserved fields. `_eui` must be provided to explicitly specify the target device.
>

⚠️** Important Notes **:

+ Ensure the target device firmware supports the invoked RPC functionality;
+ Command mapping must be correctly configured in the thing model to ensure consistency between `method` and device-side behavior.

✅** Recommendation **: We strongly recommend using the** Thing Model Data Interface** for system integration. It provides semantically clear, uniformly structured data, improving development efficiency and system stability.
