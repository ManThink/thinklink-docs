## AS 协议接入
**AS 协议**适用于需要直接获取 LoRaWAN 设备原始 payload 的场景，基于 MQTT 发布/订阅机制实现高效通信。

AS 协议参考：[[CN] PTL-S05 ASP LoRaWAN NS 与应用服务器通信协议V3.2](https://mensikeji.yuque.com/staff-zesscp/gqdw7f/uyzkiq?singleDoc#) 

### 上行数据订阅 Topic
```plain
/v32/{Organization Account}/as/up/data/#
```

第三方平台可通过订阅该通配符主题，接收指定租户下所有设备的上行原始数据。

### 下行指令发送 Topic
```plain
/v32/{Organization Account}/as/dn/data/{devEui}
```

向特定设备发送下行指令时，需将：

+ `{**<font style="color:rgba(0, 0, 0, 0.88);background-color:rgb(250, 250, 250);">Organization Account</font>**}` 替换为实际组织账号（例如 `"demo"`）；
+ `{devEui}` 替换为目标设备的唯一标识符** DevEui**。

>**说明**：此协议适用于对原始数据有定制化解析逻辑的应用场景，便于用户在外部系统中进行独立的数据解码和处理。
>
