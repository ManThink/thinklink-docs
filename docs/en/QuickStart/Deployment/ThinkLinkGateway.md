# 1. Built-in ThinkLink on the Gateway
## 1.1. Get the Gateway IP Address
You can access the gateway's NS management interface in the following two ways:

+ **Method 1: Access via the Gateway's Local Area Network (LAN) IP Address**  
Ensure your device is on the same LAN as the gateway, and obtain the gateway's IP address (for details on how to obtain it, see: [Gateway IP Acquisition Guide](https://mensikeji.yuque.com/staff-zesscp/gqdw7f/ztuxwov2gzget69s?singleDoc#)).
+ **Method 2: Connect to the Gateway's WiFi AP**  
Connect to the gateway's default WiFi hotspot (refer to the product manual for SSID and password). After connecting to the gateway's WiFi hotspot, you can access the gateway via 192.158.1.1.

> [Note] It is necessary to confirm that the gateway's WiFi is operating in the default AP mode. If the gateway's AP mode has been changed to client mode, the gateway's WiFi hotspot will not be found.
>

## 1.2. Configuration of Built-in NS
The following operations are all performed on the webConf page.

## 1.3. ThinkOne Configuration
ThinkOne is mainly responsible for LoRaWAN MAC device authentication, protocol parsing, and other functions, and sends the parsed data to the AS server.

By default, ThinkOne inside the gateway is enabled, but `downEnable` is disabled, mainly to prevent data duplication if the gateway connects to another NS.

Other data configurations should be set as shown in the figure below:

<!-- 这是一张图片，ocr 内容为：OPENVPN X LOCAL NETWORK CONFIGURATIONX THINKONE LORAWAN SERVER NET INTERFACES 8 STATE NETWORK CONFIGURATION DOWNENABLE: JOINDISABLE: ENABLE STOP RESTART WIFI GENERATEENABLE: SIGAUTODISABLE: ROOTENABLE: LOCAL NETWORK CONFIGURATION LTE AS BROKER NET INTERFACES LOCALHOST:1883 BROKER OPENVPN 品G GATEWAY CONFIGURATION PASSWORD: LORAWAN SERVER BASIC INFORMATION CACERT.PEM UPLOAD SYSTEM TIME CONFIG FREQUENCY CONFIGURATION TLS_CERT:CLIENT-CERT.PEM PROFESSIONAL CONFIGURATION UPLOAD BACK UP & RESTORE OTHER SERVICE TLS KEY: CLIENT-KEY.PEM NPC UPLOAD THINKONE -->
![](https://private-us-east-1.manuscdn.com/sessionFile/BdhLnf0v49iuoUGYn5UQ7r/sandbox/EJa3roLNakjJybwo7PEgV7-images_1769329607331_na1fn_L2hvbWUvdWJ1bnR1L2Fzc2VydC8xNzY0ODUxNzM4MTE4LTBlNmI1MjUyLWQzZGUtNDliOS04NWMxLWRiZDVmYzg1NTg1Ng.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQmRoTG5mMHY0OWl1b1VHWW41VVE3ci9zYW5kYm94L0VKYTNyb0xOYWtqSnlid283UEVnVjctaW1hZ2VzXzE3NjkzMjk2MDczMzFfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyRnpjMlZ5ZEM4eE56WTBPRFV4TnpNNE1URTRMVEJsTm1JMU1qVXlMV1F6WkdVdE5EbGlPUzA0TldNeExXUmlaRFZtWXpnMU5UZzFOZy5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=eN0FXwYEmh2XA34kBmXmgALBcvX0EnSN~-icEBKfOGVc2T3L-ea0bEBHH-l-DE8tdtW~GPZIhnle02gj8EqSwHqdRznvZnbt-6Kr16BrP28ZttvtkbNtGUQEuFtWbCVVz15uQXM-D-3eL0GLcI5M067-URvF6DUUNU02upk~aVmUW8GuaC147DoWhZ0Z~v3FFJkZ4hq14aGQmnQLsKPYwISNadVyXdDgqtcWFm-xPcIDLV4HLlXU4rMJHHFNBepnLpoYi0fRPy~U8f4N2PTwBUc-o9qq9EcsyJZ5MB-cbB3U2s1um0AarAg46uTgrb25pANxRsLMBMChOVTgeZseAg__)

### 1.3.1. Function Configuration
| Configuration Item | Status |
| --- | --- |
| `enable` | Enabled |
| `downEnable` | Enabled |
| `joinDisable` | Disabled |
| `leafEnable` | Disabled |
| `rootEnable` | Disabled |
| `sigAutoDisable` | Enabled |
| `generateEnable` | Disabled |


> **Note**: The above are the system-recommended enabled states for the functional modules. Please configure according to actual needs. It is not recommended to modify the default settings unless necessary.
>

---

### 1.3.2. AS Broker Configuration
The gateway's default AS Broker address is: `localhost:1883`. It connects using the built-in username and password, which are pre-configured at the factory and usually do not need to be changed by the user.

⚠️ **Important Note**:  
If you accidentally modify the username or password and cannot connect, please use the following credentials to reset. If the issue persists, please contact MenThink Technology.
<br>username=thinklink , password=Z4fZr1eRW+ZcczXtbU9ebQ== 

---

### 1.3.3. AS2 Broker Configuration
If you need to forward the data parsed by the NS to a third-party platform, you can configure the AS2 Broker information. Set the third-party platform's Broker address, username, and password as shown in the figure below.

AS2 Broker only handles uplink data and does not accept downlink data.

<!-- 这是一张图片，ocr 内容为： -->
![](https://private-us-east-1.manuscdn.com/sessionFile/BdhLnf0v49iuoUGYn5UQ7r/sandbox/EJa3roLNakjJybwo7PEgV7-images_1769329607332_na1fn_L2hvbWUvdWJ1bnR1L2Fzc2VydC8xNzY0ODUyNzc4NDAzLWZmMWNkZDZiLWVhODEtNDYyMi05NDk2LTk5MjJlNjQ2MDcwOA.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQmRoTG5mMHY0OWl1b1VHWW41VVE3ci9zYW5kYm94L0VKYTNyb0xOYWtqSnlid283UEVnVjctaW1hZ2VzXzE3NjkzMjk2MDczMzJfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyRnpjMlZ5ZEM4eE56WTBPRFV5TnpjNE5EQXpMV1ptTVdOa1pEWmlMV1ZoT0RFdE5EWXlNaTA1TkRrMkxUazVNakpsTmpRMk1EY3dPQS5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=FSHjt7Eriat2vqac0Q0d1iUKwTp5dl3vc3Vn5sh3jJIHw7LceSceX2jgb915BKZs3K0CPSHbKa39XaZhODYIb9M-9xODOFJwf86GMm5TTBjZc74uRvHB5o363MsBh16bnnVrclZlDtV01Epyyup7eQiawih-kvheSvRQrcIODv0~L-bnU6RIA4n0iwR5SXCIbYJ6KsWiRyLDwv2RyIOkWqZt4VcrkZuw972~mQ9xmt4eMuqSsfULCyw~RSx-UErkuZ4oCHs4P86hTn4CTmzisvwprWbtSxD7yLJDEGsa7pcn6N2Qd9TvBQ0Pu22tiWoO4lCurGZdkOY8tm5DOgi9zQ__)

> **Note**: If you do not need to forward application data to a third-party platform, please keep the AS2 Broker address empty.
>

### 1.3.4. Restart Service
After completing the configuration, please follow these steps to restart the ThinkOne service for the configuration to take effect:

1. Click the **Save** button to save the current configuration;
2. Click the **Restart** button to restart the ThinkOne service.

## 1.4. Change LoRaWAN Server
### 1.4.1. Enable nsLocal
As shown in the figure below, after enabling `nsLocal`, the NS address will point to the built-in NS. After completing all parameter configurations, click submit to finalize the configuration.

<!-- 这是一张图片，ocr 内容为：WEBCONTIGURE TKL X THINKONE X LORAWAN SERVER NS1 BESIC INFORMATION TCP://THINKLINK MANTHINK.CN:1883 TKBROKER NOC CA_CERT: UPLBAD I UPLOAD 绍UPGRADE TLS.KMY: UPLOAD -->
![](https://private-us-east-1.manuscdn.com/sessionFile/BdhLnf0v49iuoUGYn5UQ7r/sandbox/EJa3roLNakjJybwo7PEgV7-images_1769329607332_na1fn_L2hvbWUvdWJ1bnR1L2Fzc2VydC8xNzY0ODU1MjE3NzY3LTRjOWM2NGY4LTc4M2ItNDA2Ny1hYTYxLWUyOWRjZjc4ODI3MQ.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQmRoTG5mMHY0OWl1b1VHWW41VVE3ci9zYW5kYm94L0VKYTNyb0xOYWtqSnlid283UEVnVjctaW1hZ2VzXzE3NjkzMjk2MDczMzJfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyRnpjMlZ5ZEM4eE56WTBPRFUxTWpFM056WTNMVFJqT1dNMk5HWTRMVGM0TTJJdE5EQTJOeTFoWVRZeExXVXlPV1JqWmpjNE9ESTNNUS5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=MfMynGLNWc7bnR-Z2XMOzX0cObJrRT3gNyUzLCuj8mBBRFgry7qspwLh5QJkjcQK-1RZA5w9D0zdMAxwdB8rl7FvkSFJj3Kx2X1Tf709~7EfkI8~7LxUaIn~3LURh2b2EXSJWu2M3Rqs6W~UJEJIbSrC6ysbuXl1Q41cy7F6xtpTU5RAxVgRc2xU0G3mML8tyFPkroKsSFoJ6uAz~VS2wP4HpXHZxX0BqN0DMFn6PbFcleX~XTUzJAZca5bXAkdw1tTaDdS357RDYXqBvg6S4LiN39YFQH33LhevygerwdV3ojqWLF8aSKRxp4n68suBkOUZYdPVJdo77O3qpEy3jg__)

### 1.4.2. Enable nmsLocal
As shown in the figure below, enable the `nmsLocal` function. Once enabled, the gateway will be managed through the built-in TKL. After completing all configurations, click submit to finalize the configuration.

<!-- 这是一张图片，ocr 内容为：THINKONE TKL X @ NETOORK CONFIGURATION GHOLP NMSLOCAL: BACK UP & RESTCRE 时 OTHER SERVICE UPLOAD IS CORT: UPLOAD TLS_KEY UOLOAD WUPGRADE -->
![](https://private-us-east-1.manuscdn.com/sessionFile/BdhLnf0v49iuoUGYn5UQ7r/sandbox/EJa3roLNakjJybwo7PEgV7-images_1769329607332_na1fn_L2hvbWUvdWJ1bnR1L2Fzc2VydC8xNzY0ODU1Mjk2Nzk0LWE1YjJkOWExLTE2ZWUtNDFhYS05YTA1LTk0Y2Y1MzE5OTlmNw.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQmRoTG5mMHY0OWl1b1VHWW41VVE3ci9zYW5kYm94L0VKYTNyb0xOYWtqSnlid283UEVnVjctaW1hZ2VzXzE3NjkzMjk2MDczMzJfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyRnpjMlZ5ZEM4eE56WTBPRFUxTWprMk56azBMV0UxWWpKa09XRXhMVEUyWldVdE5ERmhZUzA1WVRBMUxUazBZMlkxTXpFNU9UbG1Ody5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=HI3ZMh11gIcsgJ~5DskJ1sIfcuaGLDxntlY3x--7SM08qHyZdAFOhyNNcq-l8E~Qdl6YLKDxN~yPX8M13UkFymSlPVzl-IqapoFHMs0D-eA6uo9uh3r64Do-7lkg1MghiE4AZ-LYJbamFl2G9-UYHACAyz5YWpvdGhN6-P~9E-7P1aAU9WqrGGOQ0zo909S-J6Zz7ezNx6cdlVUZsit10Ki73rVeocu55qqHK7oaB5Gs~P4zU9Mvw1GLDZdtgFhxi8lWohcfyGmwlfcdwtZ9BlDD~eGess5lFbGc8EfCaCIlGS3r8WtZPh-RDqI6Ex~IfmB0mk8jWLnnAu4gqflTSA__)



## 1.5. Use Built-in ThinkLink (TKL)
### 1.5.1. Enable ThinkLink
As shown in the figure below, after enabling TKL, click save.

<!-- 这是一张图片，ocr 内容为：WEBCONFIGURE TKL HOME BB STATE @NETWORK CONFIGURATION ENABLE: 88( GATEWAY CONFIGURATION OTHER SERVICE NPC THINKONE NS BRIDGE TKL BB LOG BB UPGRADE -->
![](https://private-us-east-1.manuscdn.com/sessionFile/BdhLnf0v49iuoUGYn5UQ7r/sandbox/EJa3roLNakjJybwo7PEgV7-images_1769329607333_na1fn_L2hvbWUvdWJ1bnR1L2Fzc2VydC8xNzY0ODU0Nzk3NjQ4LTdlMjUyYmM4LTcxMWItNDJhOS05OTczLTk5OTRhZGQxNDViNw.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQmRoTG5mMHY0OWl1b1VHWW41VVE3ci9zYW5kYm94L0VKYTNyb0xOYWtqSnlid283UEVnVjctaW1hZ2VzXzE3NjkzMjk2MDczMzNfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyRnpjMlZ5ZEM4eE56WTBPRFUwTnprM05qUTRMVGRsTWpVeVltTTRMVGN4TVdJdE5ESmhPUzA1T1RjekxUazVPVFJoWkdReE5EVmlOdy5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=DOoZoIJVmcX0Q97u9YyuPxUwfMQjkP0ZxPmRqQ-1ahcHoUJkpPqd1tpV19OUkfXO89qzolUrguGp1mApp314XhpbniRk5jYaNZa6~KqFM8u2JVyqftktE3xKjhGt5~re~-fjGVZFBM2bpMhmyat1ZkZNeY4bczqVP5cB0whN7AG-rIDHGuzK9BGSGaPZ3DteSU6VXF7-DIAttYQXcWgHYG-W88n63QAeD1CR3d2bKR08uXy8kOHd8jmOzQ3b0o48Mfe8XLajKiSnELA3Ft3DG9sbiLHNTNI9hjQFnhxQyOksFifVLJI2RYfhwCDdHw9k2F75EwjLTSdAPElu7uB8nQ__)

### 1.5.2. Access ThinkLink
The ThinkLink inside the gateway is accessed using port 10100. The access method is `http://[IP Address]:10100`, for example: `http://192.158.1.1:10100`. After opening, the following login page will pop up.


The default login username for ThinkLink is `admin`, and the default organization account created is `mtfac`. The credentials are:

+ Username: `admin`
+ Password: `TKedge_0801`

## 1.6. View Gateway After Login
In the **Operation Management -> Gateway Management** menu, you can find the corresponding gateway. If the gateway is not found, you need to click **Add**, enter the gateway's EUI and Pincode, and select the gateway type as **ManThink** to claim the gateway.

### 1.6.1. Import Node LoRaWAN Profile

### 1.6.2. Application Data Testing
ThinkLink supports two types of application data: the raw data decrypted by LoRaWAN NS, and the application layer data transcoded by the ThinkLink object model. Both types of data support subscription via the ThinkLink Broker or pushing to a third-party platform.

You can use ThinkLink's forwarder to implement custom protocol format forwarding to a third-party platform.

### 1.6.3. ThinkLink Object Model Data
Please refer to the ThinkLink Manual.

### 1.6.4. Raw Data After Decryption
If you need to push AS data to a third-party platform, you can configure the AS2 broker information inside the gateway to push the data to the third party. Note that AS2 information does not support downlink data.

## 1.7. MQTT Broker Connection Information
The MQTT Broker address for the built-in AS (Application Server) on the gateway is:

+ Address: `[Gateway IP Address]:1883`  
Example: `192.158.1.1:1883`
+ Username: `asUser` 
+ Password: `as-user@1705` 

### 1.7.1. Subscription Topic
Uplink data from devices will be published to the following topic:

```plain
/v32/mtfac/as/up/data/#
```

You can use MQTT client tools such as [MQTTX](https://mqttx.app/) to subscribe to this topic and view the data sent by the device in real-time.

<!-- 这是一张图片，ocr 内容为：PLAINTEXT RECEIVED ALL PUBLISHED NEW SUBSCRIPTION /V32/MTFAC/U..... QOS 0 TOPIC://V32/MTFAC/UP/DATA/3F53012A0000050E5 QOS:0 {"GEOINFO": {"LONGITUDE":108.86375,"LATITUDE":34.19604,"ALTITUDE ":0,"ACCURACY":50,"TYPE":"GW:WIFI"},"GWRX": [{"EUI":"5A53012501030027","TIME":"2025-08- 28T02:46:26.8466746Z","TMMS":0,"TMST":2572447664,"FT IME":0,"CHAN":0,"RFCH":0,"RSSI":-62,"LSNR":8.8]L,"IF ":"LORAWAN","MOTETX": ["FREQ":470.3,"MODU":"LORA","DATR":"SF9BW125","CODR" :"4/5","MACCMD":"MACACACK":"MOTEEUI,"MOTEEUI":"3F53012A0 00050E5","TOKEN":3,"TYPE":"DATA","USERDATA": "CLASS":"CLASSA","CONFIRMED":FALSE,"SEQNO":4001,"PO RT":3,"PAYLOAD":"MTIZNA-"},"VERSION":"3.0"} 2025-08-28 10:46:26:432 -->
![](https://private-us-east-1.manuscdn.com/sessionFile/BdhLnf0v49iuoUGYn5UQ7r/sandbox/EJa3roLNakjJybwo7PEgV7-images_1769329607334_na1fn_L2hvbWUvdWJ1bnR1L2Fzc2VydC8xNzU2MzUyMDc1OTc2LWY4NzRkNTgzLTlhYzEtNDJmNS04Nzg1LTE4NDZlZWNjY2IyNg.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQmRoTG5mMHY0OWl1b1VHWW41VVE3ci9zYW5kYm94L0VKYTNyb0xOYWtqSnlid283UEVnVjctaW1hZ2VzXzE3NjkzMjk2MDczMzRfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyRnpjMlZ5ZEM4eE56VTJNelV5TURjMU9UYzJMV1k0TnpSa05UZ3pMVGxoWXpFdE5ESm1OUzA0TnpnMUxURTRORFpsWldOalkySXlOZy5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=SB-1Z33tvLWA4J9XrEnXClJdKtuFkdM3RHGp7bafNGOXhIFCGseC0l1SLTlm~OeyNWQtG9-r8t2WK2bphU04SARjxfXFPLEb5TljmLZvctaqRo5QvBDJ6Ycmlq43NIOp~tCL2wZipvVZAttoyk3kYIDyhxkZxDFFTorv7oOx4gKJumTRAv3Bq969CNQ4Q4NJw6AF1LWKZz0ZMrBc5CAcnMq-UTcDe50ZtdsadSDm0~0h14Q4Z9sRPZ0urH2V6DReFHVtnO9x7OhFn0ht0w96cXmPYlPfIlQUXu8STTDPnt~jmV4fjRdB90cpfY8tAz8V1K7lYR7xhRNfRrvguiJHuA__)

### 1.7.2. More Information
For more product information or technical support, please visit:

🔗 [MenThink Technology Official Website](https://www.manthink.cn)  
🔗 [ThinkLink LoRaWAN Platform](https://thinklink.manthink.cn)
