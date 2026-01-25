The MQTT Forwarder is a middleware solution designed to enable protocol integration with third-party application platforms. It provides flexible message processing through customizable JavaScript scripting, supporting:

+ Cross-platform message routing (source → target broker)
+ Dynamic Topic redirection
+ Message content format transformation

### **Configuration Workflow ** Step 1: Establish Broker Connections**

Prepare the necessary authentication details for both source and target brokers.

1.** Authentication Preparation:**
    - Username / Password
    - TLS Certificate (required if encrypted connection is used)
2.** Connection Type Selection:**
    -** Standard MQTT Broker:** Full connection details must be provided.
    -**TKL Ecosystem Data:**
        * **AS Type:** Retrieves LoRaWAN application-layer data after parsing.  
Subscription topic permission: `/v32/[organization ID]/as/#`
        * **ThinkLink Type:** Retrieves data parsed by ThinkLink’s Thing Model.  
Subscription topic: `/v32/[organization ID]/tkl/#`

>** Note **: At least two broker connections must be established — one as the** source **and one as the ** target**.
>** Step 2: Configure Forwarding Rules **1.** Access Configuration Interface:**  
[Advanced Features] → [Forwarder] → [Add New]
2.** Basic Settings:**
    - Name the forwarder instance
    - Enable/Disable the forwarder function
3.** Endpoint Configuration:**
    -** Source Broker ** (select from dropdown; create new if not available)
    -** Target Broker ** (select from dropdown; create new if not available)
    -** Subscription Topic ** (wildcards supported, e.g., `+/temp/+`)

####** Optional: Protocol Conversion Script **
Use a custom JS script to transform message structure during forwarding. Messages can be filtered, remapped, or dropped based on logic.

```javascript
/**
 * Message transformation function
 * @param {Object} input - Original message
 * @param {string} input.topic - Source topic
 * @param {Object} input.msg - Message payload (JSON)
 * @returns {Object|null} Return null to discard the message
 */
function forwardScript({topic, msg}) {
  // Example: Filter and transform device heartbeat messages
  if (!msg?.uheart?.EUI || msg?.uheart?.action != 'heart') return null;

  const VALID_EUIS = ["7a53012a00000070", "7a53012a00000331"];
  const eui = msg.uheart.EUI;
  if (!VALID_EUIS.includes(eui)) return null;

  // Construct transformed message
  return {
    topic: `/v32/test/my/up/gw/${eui}`,  // Template variables supported
    msg: {
      version: "3.0",
      eui: eui,
      action: "heart",
      data: {  // Field mapping
        validIP: msg.uheart?.IP,
        txPackets: msg.uheart?.TxPackets,
        rxPackets: msg.uheart?.RxPackets,
        deviceHandle: msg.uheart?.deviceHandle,
        hwVersion: msg.uheart?.hardwareVersion,
        fwVersion: msg.uheart?.fimewareVersion,
        netType: msg.uheart?.netType
      }
    }
  };
}
```

#### **Input Parameters **
| Parameter | Type | Description |
| --- | --- | --- |
| `topic` | string | The original MQTT topic received |
| `msg` | Object | The message body in JSON format |


---

#####** Return Value **
Returns a new message object to be forwarded, or `null` to discard the message.

| Field | Type | Description |
| --- | --- | --- |
| `topic` | string | Target topic; supports dynamic placeholders (e.g., `${msg.deviceId}`) |
| `msg` | Object | Transformed message content, compliant with target protocol requirements |
| option | object | <font style="color:rgb(0, 0, 0);">if retain message， then set option:{retain:true}</font> |


✅** Best Practices:**

+ Always validate incoming message structure before transformation.
+ Use descriptive names for forwarder instances to simplify management.
+ Leverage wildcards and template variables for scalable rule definitions.
