# MQTT Forwarder

The MQTT Forwarder is a middleware solution designed to enable protocol integration between third-party application platforms and ThinkLink. It achieves this through flexible JavaScript scripting, supporting:

- Cross-platform message routing (`source → target broker`)
- Dynamic topic redirection
- Message payload format transformation

## 1. Configuration Workflow

### 1.1 Step 1: Establish Broker Connections

1. **Prepare broker credentials**:
   - **ThinkLink Broker credentials**: Retrieve from *System Configuration → Server Configuration → Internal MQTT*. Users may modify these credentials as needed.
   - **Third-party broker credentials**: Obtain from your broker provider. Required information includes:
     - Username/password
     - TLS certificate (if encrypted connection is required)

2. **Select connection type**:
   - `Customize`: For third-party brokers
   - `ThinkLink`: Subscribes to topics containing Thing Model–parsed data (e.g., `/v32/[tenant]/tkl/up/telemetry/#`)
   - `AS`: Subscribes to raw, unprocessed data (e.g., `/v32/[tenant]/as/#`)

> ⚠️ **Note 1**: At least **two broker connections** must be configured — one as the *source* and one as the *target*.
> <br>⚠️ **Note 2**: `[tenant]` refers to the organization account of the ThinkLink user.
 
![img](./asserts/01.png)

### 1.2 Step 2: Configure Forwarding Rules


1. **Access the configuration interface**:
   `[Advanced Features] → [Forwarder] → [Add New]`

2. **Basic Settings**:
   - Name the forwarder instance
   - Enable/disable the forwarder via toggle switch

3. **Endpoint Configuration**:
   - `Source Broker`: Select from dropdown (create new if not listed)
   - `Target Broker`: Select from dropdown (create new if not listed)
   - `Subscription Topic`: Supports MQTT wildcards (e.g., `+/sensor/+/telemetry`)

![img](./asserts/02.png)

### 1.3 Optional: Protocol Transformation Script

If no custom script is provided, the forwarder relays messages *unchanged* — preserving both original topic and payload format.

```javascript
// Example: Renaming telemetry fields 'T' → 'temperature', 'H' → 'humidity' to comply with another protocol
function forwardScript({topic, msg}) {
  if (!msg?.telemetry_data) return;
  let content = {};
  content.temperature = msg.telemetry_data?.T;
  content.humidity = msg.telemetry_data?.H;
  return {
    topic: `/v32/test/my/up/gw/${eui}`,
    option: {
      retain: false
    },
    msg: content
  };
}
```

#### Input Parameters

| Parameter | Type     | Description                            |
| --------- | -------- | -------------------------------------- |
| `topic`   | `string` | The original subscribed MQTT topic     |
| `msg`     | `Object` | Received message payload (JSON format) |

#### Return Value

Return a new message object (or `null` to discard the message):

| Field    | Type     | Description                                                  |
| -------- | -------- | ------------------------------------------------------------ |
| `topic`  | `string` | **Target topic** — supports dynamic variable substitution using `${variable}` (e.g., `${msg.deviceId}`) |
| `msg`    | `Object` | Transformed message payload (must conform to the target protocol specification) |
| `option` | `object` | Optional configuration — e.g., `{ retain: true }` to publish as a retained message |