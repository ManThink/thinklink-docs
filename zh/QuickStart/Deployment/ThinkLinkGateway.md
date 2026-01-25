以下为门思科技网关内置TKL的使用方法
## 获取网关IP地址

您可以通过以下两种方式访问网关的NS管理界面：

+ **方式一：通过网关的局域网IP地址访问**  
  确保您的设备与网关处于同一局域网，获取网关的IP地址（获取方法详见：[网关IP获取指南](https://mensikeji.yuque.com/staff-zesscp/gqdw7f/ztuxwov2gzget69s?singleDoc#)）。
+ **方式二：连接网关的WiFi AP**  
  连接网关默认的WiFi热点（SSID和密码请参考产品说明书），连接到网关的wifi热点后，可通过192.158.1.1 访问网关。

> 【注】需要确认网关的wifi工作在默认的 AP 模式，如果修改了网关的AP模式到client模式，那么就找不到网关的wifi热点了

# 内置NS的配置

以下操作都是在webConf页面下进行。

##   打开ThinkOne的配置

ThinkOne 主要负责LoRaWAN MAC的设备鉴权，协议解析等功能，并将解析后的数据发送到AS服务器。

默认网关内部的ThinkOne是打开的，但是 downEnable是关闭的，主要为了避免网关连接到其他NS上之后导致的数据双发。

其他数据配置按照下图所示进行配置：

<!-- 这是一张图片，ocr 内容为：OPENVPN X LOCAL NETWORK CONFIGURATIONX THINKONE LORAWAN SERVER NET INTERFACES 8 STATE NETWORK CONFIGURATION DOWNENABLE: JOINDISABLE: ENABLE STOP RESTART WIFI GENERATEENABLE: SIGAUTODISABLE: ROOTENABLE: LOCAL NETWORK CONFIGURATION LTE AS BROKER NET INTERFACES LOCALHOST:1883 BROKER OPENVPN 品G GATEWAY CONFIGURATION PASSWORD: LORAWAN SERVER BASIC INFORMATION CACERT.PEM UPLOAD SYSTEM TIME CONFIG FREQUENCY CONFIGURATION TLS_CERT:CLIENT-CERT.PEM PROFESSIONAL CONFIGURATION UPLOAD BACK UP & RESTORE OTHER SERVICE TLS KEY: CLIENT-KEY.PEM NPC UPLOAD THINKONE -->
![](https://cdn.nlark.com/yuque/0/2025/png/761760/1764851738118-0e6b5252-d3de-49b9-85c1-dbd5fc855856.png)

### 功能配置

| 配置项           | 状态 |
| ---------------- | ---- |
| `enable`         | 开启 |
| `downEnable`     | 开启 |
| `joinDisable`    | 关闭 |
| `leafEnable`     | 关闭 |
| `rootEnable`     | 关闭 |
| `sigAutoDisable` | 开启 |
| `generateEnable` | 关闭 |


> **说明**：上述为系统推荐的功能模块启用状态，请根据实际需求进行配置。非必要情况下不建议修改默认设置。

---

### AS Broker 配置

网关默认的 AS Broker 地址为：`localhost:1883`，使用内置账号和密码进行连接，出厂已预配置完成，用户通常无需更改。

⚠️ **注意事项**：  
如您误修改了账号或密码导致无法连接，请使用以下账号密码进行重置，如果依然无法解决问题，请联系门思科技。

username=thinklink , password=Z4fZr1eRW+ZcczXtbU9ebQ==

---

### AS2 Broker配置

如果需要将NS解析后的数据转发到第三方平台，可以配置AS2的Broker信息，将第三方平台的Broker地址，账号密码按下图所示进行配置。

AS2Broker 只有上行数据，不接受数据下行。其协议格式见：[[CN] PTL-S05 ASP LoRaWAN NS 与应用服务器通信协议V3.2](https://mensikeji.yuque.com/staff-zesscp/gqdw7f/uyzkiq?singleDoc#)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2025/png/761760/1764852778403-ff1cdd6b-ea81-4622-9496-9922e6460708.png)

> **说明**：如果不需要将应用数据转发到第三方平台，请保持AS2 Broker 地址为空。

### 重启服务

完成配置后，请按照以下步骤重启 ThinkOne 服务以使配置生效：

1. 点击 ** Save **（保存）按钮，保存当前配置；
2. 点击 ** Restart**（重启）按钮，重启 ThinkOne 服务。

## 更改LoRaWAN Server指向

### 开启 nsLocal

如下图所示，将nsLocal 开启后，将NS的地址指向内置NS，将所有的参数配置完成后点击submit，完成配置。

<!-- 这是一张图片，ocr 内容为：WEBCONTIGURE TKL X THINKONE X LORAWAN SERVER NS1 BESIC INFORMATION TCP://THINKLINK MANTHINK.CN:1883 TKBROKER NOC CA_CERT: UPLBAD I UPLOAD 绍UPGRADE TLS.KMY: UPLOAD -->
![](https://cdn.nlark.com/yuque/0/2025/png/761760/1764855217767-4c9c64f8-783b-4067-aa61-e29dcf788271.png)

### 开启nmsLocal

如下图所示，打开nmsLocal功能，开启后将通过网关内置的TKL对网关进行管理。所有配置完成后点击submit，完成配置。

<!-- 这是一张图片，ocr 内容为：THINKONE TKL X @ NETOORK CONFIGURATION GHOLP NMSLOCAL: BACK UP & RESTCRE 时 OTHER SERVICE UPLOAD IS CORT: UPLOAD TLS_KEY UOLOAD WUPGRADE -->
![](https://cdn.nlark.com/yuque/0/2025/png/761760/1764855296794-a5b2d9a1-16ee-41aa-9a05-94cf531999f7.png)



# 使用内置ThinkLink(TKL)

## 开启ThinkLink

如下图所示，开启TKL后，点击save。

<!-- 这是一张图片，ocr 内容为：WEBCONFIGURE TKL HOME BB STATE @NETWORK CONFIGURATION ENABLE: 88( GATEWAY CONFIGURATION OTHER SERVICE NPC THINKONE NS BRIDGE TKL BB Log BB UPGRADE -->
![](https://cdn.nlark.com/yuque/0/2025/png/761760/1764854797648-7e252bc8-711b-42a9-9973-9994add145b7.png)

## 访问ThinkLink

网关内部的ThinkLink 采用10100端口进行访问，访问方法 http://[ip地址]:10100, 例如 ：[http://192.158.1.1:](http://192.158.1.1:5000)10100 ，打开后，将弹出如下登录页面。

<!-- 这是一张图片，ocr 内容为：THINK LINK 账户密码登录 用户名:ADMIN OR USER 母密码:ANT.DESIGN 国 登录 -->
![](https://cdn.nlark.com/yuque/0/2025/png/761760/1756348497969-37994988-2423-4505-99db-66a84f77aa75.png)

ThinkLink 默认登录的用户名为admin，默认建立的组织账号为mtfac，账号密码为：

+ 用户名：admin
+ 密码：`TKedge_0801`

## 登录后查看网关

在 运维管理->网关管理 菜单中可以发现对应的网关，如果没有找到该网关，则需要点击新增，输入网关的eui和pincode，网关类型选择 ManThink对网关进行认领。

认领网关的方法：[[CN] ThinkLink 使用说明书](https://mensikeji.yuque.com/staff-zesscp/gqdw7f/lyh7hfbvi9sumrs2?singleDoc#) 6.2章。

<!-- 这是一张图片，ocr 内容为：TKI THINKLINK 门思科技 ADMIN 网关管理 仪表饭 查询 名称:  请注入 请选择 至重 类型: 日应用数据 C工您 新疆 D 类型 名称 固件版本 软态 硬件版本 品 设备管理 正洛 TRUE 3.2.09 高线 41197298830544901 纳辑 MANTHINK CN470 品网关管理 第1-1条|总共1条 仪表板管理 &升级 -->
![](https://cdn.nlark.com/yuque/0/2025/png/761760/1764855787083-9d626008-34af-4ac6-9393-3da89f83c46d.png)

## 导入节点LoRaWAN档案

参考 [[CN] ThinkLink 使用说明书](https://mensikeji.yuque.com/staff-zesscp/gqdw7f/lyh7hfbvi9sumrs2?singleDoc#) 6.1.2章 ，导入节点档案后，即可实现LoRaWAN NS数据解析。

> 如需要使用ThinkLink的物模型RPC，第三方数据对接等应用层功能清参考[[CN] ThinkLink 使用说明书](https://mensikeji.yuque.com/staff-zesscp/gqdw7f/lyh7hfbvi9sumrs2?singleDoc#)<font style="color:rgb(38, 38, 38);"> </font>

# 应用数据测试

ThinkLink 支持两种应用数据，一种是LoRaWAN NS解密后的原始数据，一种是经过ThinkLink物模型转码后的应用层数据。两种数据均支持订阅ThinkLinkBroker的方式或推送至第三方平台的方式进行订阅。

可以使用ThinkLink的转发器实现自定义协议格式转发至第三方平台。

## ThinkLink 物模型数据

请参考  [[CN] ThinkLink 使用说明书](https://mensikeji.yuque.com/staff-zesscp/gqdw7f/lyh7hfbvi9sumrs2?singleDoc#)

## 定于解密后的原始数据

如需要将AS数据推送至第三方平台，可以在网关内部配置AS2的broker信息即可将数据推送至第三方。注意AS2的信息不支持下行数据。

协议参考  [[CN] PTL-S05 ASP LoRaWAN NS 与应用服务器通信协议V3.2](https://mensikeji.yuque.com/staff-zesscp/gqdw7f/uyzkiq?singleDoc#)

### MQTT Broker连接信息

网关内置AS（Application Server）的MQTT Broker地址为：

+ 地址：`【网关IP地址】:1883`  
  示例：`192.158.1.1:1883`
+ 用户名：asUser
+ 密码：as-user@1705

### 订阅主题（Topic）

设备上行数据将发布到以下主题：

```plain
/v32/mtfac/as/up/data/#
```

您可以使用 [MQTTX](https://mqttx.app/) 等MQTT客户端工具订阅该主题，实时查看设备发送的数据。

<!-- 这是一张图片，ocr 内容为：PLAINTEXT RECEIVED ALL PUBLISHED NEW SUBSCRIPTION /V32/MTFAC/U..... QOS 0 TOPIC://V32/MTFAC/UP/DATA/3F53012A0000050E5 QOS:0 {"GEOINFO": {"LONGITUDE":108.86375,"LATITUDE":34.19604,"ALTITUDE ":0,"ACCURACY":50,"TYPE":"GW:WIFI"},"GWRX": [{"EUI":"5A53012501030027","TIME":"2025-08- 28T02:46:26.8466746Z","TMMS":0,"TMST":2572447664,"FT IME":0,"CHAN":0,"RFCH":0,"RSSI":-62,"LSNR":8.8]L,"IF ":"LORAWAN","MOTETX": ["FREQ":470.3,"MODU":"LORA","DATR":"SF9BW125","CODR" :"4/5","MACCMD":"MACACACK":"MOTEEUI,"MOTEEUI":"3F53012A0 00050E5","TOKEN":3,"TYPE":"DATA","USERDATA": "CLASS":"CLASSA","CONFIRMED":FALSE,"SEQNO":4001,"PO RT":3,"PAYLOAD":"MTIZNA-"},"VERSION":"3.0"} 2025-08-28 10:46:26:432 -->
![](https://cdn.nlark.com/yuque/0/2025/png/761760/1756352075976-f874d583-9ac1-42f5-8785-1846eecccb26.png)

## 5. 更多信息
如需了解更多产品信息或技术支持，请访问：
🔗 [门思科技官网](https://www.manthink.cn)