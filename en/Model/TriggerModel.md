# 1. Trigger Model
The trigger model is used to trigger the specified RPC command after data processing to realize automatic control between devices. For example, when a change in ambient temperature is detected, the target set temperature of the air conditioner is automatically adjusted. 

The trigger logic is implemented through JS script code. After the device is attached to the trigger model, you need to configure the device EUI to be linked in the server properties of the device. In the JS code, you can call the RPC command of the target device through this attribute to complete remote control or parameter setting. 

## 1.1. New Trigger Model
the execution result of the trigger model is an object containing the RPC call instruction, and the return value structure is defined as follows: 

| field  | description  |
| --- | --- |
| `delayms ` | delay time before RPC execution (unit: ms)  |
| `abort_previous_timer ` | whether to cancel a previously existing scheduled task. If set `true `the new task overwrites the previous task  |
| `actions ` | contains one or more RPC operations to be executed, which are called in sequence according to the array order.  |


Each `actions `the array entry contains the following fields:

| Field | Description |
| --- | --- |
| `_eui` | The unique identifier (EUI) of the target device. This value can be read from the server-side attributes of the current device and dynamically passed in. |
| `method` | The corresponding RPC name (i.e., the Method defined in the RPC model). |
| `params` | The input parameters object passed to the RPC command. If the RPC does not require parameters, this should be set to `null`. |


## 1.2. return value example
```javascript
let temperatrue=device?.telemetry_data?.["45616600866361349"].TP;
if (temperatrue >25){
  return {
  delayms: 10000,
  abort_previous_timer: true,
  should_dispatch: true,
  actions: [{
    method: "mt_data_transparent",
    params: {
    _eui: device.eui,
     payload:"FE 05 00 00 FF 00 98 35"
    }
    }
  ]
  }
}
```

> **prompt**: make sure that the target device is correctly registered to the TKL platform and has the corresponding RPC model and permissions. Otherwise, the command cannot be issued. 
>

## 1.3. Mount trigger model
The created trigger needs to be bound to a specific device before it can be used.** Operation Path **: `maintenance  → device → [select target device configuration] → Details->trigger model  `** operation steps**: 

1. on the device details page, click the trigger model tab. 
2. Click Add and select the created trigger model from the drop-down list. 
3. Multiple different trigger model can be repeatedly added to the same device. 

✅Supports multiple trigger model for one device, which is suitable for multi-function control scenarios. 
