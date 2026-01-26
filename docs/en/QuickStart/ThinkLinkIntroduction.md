# 1. ThinkLink Introduction

ThinkLink (hereinafter referred to as TKL) is a comprehensive and highly integrated IoT system designed for building efficient, secure and scalable LoRaWAN IoT solutions. TKL has built-in complete LoRaWAN network server (NS) function, which can centralize the management of LoRaWAN devices and gateways to ensure the stable operation of the network and the safe access of devices.

At the same time, TKL supports accessing data from third-party systems through the standard MQTT protocol, realizing the integration and unified management of multi-source data, and greatly enhancing the openness and compatibility of the platform.
The URL of the cloud ThinkLink is https://thinklink.manthink.cn

## 1.1. Deployment Flexibility

TKL provides high deployment flexibility. You can choose any of the following deployment methods based on project requirements and environment characteristics:

- **Cloud server (Cloud)**: It is applicable to scenarios that need to get started quickly and do not need local resources.
- **Edge Server (TKE)**: Meet applications that require data localization and low-latency communication, and support private deployment.
- **Gateway Internal (TKG)**: The NS function is directly embedded in the gateway device to achieve lightweight and low-cost local network management.

This "cloud-edge-end" integrated deployment capability enables TKL to flexibly adapt to various requirements from small-scale testing to large-scale enterprise applications.

## 1.2. Core Features

TKL provides a series of powerful function modules, covering the entire life cycle of IoT applications from device access to business analysis:

+ **Network data debugging**: It can listen to LoRaWAN gateway side data (NS data) and NS output data (AS data), helping users to quickly debug LoRaWAN sensors, locate communication problems, and accelerate project development and deployment.
+ **Thing Model**: Parses raw data from LoRaWAN or MQTT into structured application-layer data, and supports Visual Display through tables, charts, or custom dashboards.
+ **RPC Model**: Support remote configuration equipment parameters and issue control instructions to realize remote management and maintenance of terminal equipment.
+ **Asset Model**: Aggregate data from multiple devices through the thing model to form a higher-dimensional "asset" view for comprehensive data analysis and business insight.
+ **Sub-device management**: Supports the management of sub-device data read by DTU or acquisition units through interfaces such as RS-485 and M-Bus as independent devices, realizing hierarchical device organization.
+ **EB cloud compiler**: Compile and download EB(Embedded Business) code in the cloud, simplifying the process of developing and updating Embedded Business logic.
+ **Alarm model**: You can set alarm rules based on multiple data types and implement alarm notifications through multiple channels (such as email and SMS) to ensure timely response to key events.
+ **Linkage model**: Realize the automatic linkage between devices, trigger corresponding actions according to preset conditions, and improve the intelligent level of the system.
+ **Scheduled Task**: Tasks can be set to execute periodically, calling RPC through periodic tasks to achieve automated, cyclical operations.
+ **Protocol docking**: Through flexible configuration, it can seamlessly connect with mainstream protocols such as BACnet, Home Assistant, ThingsBoard, Modbus TCP, etc.

>**[Note]**: The interface between BACnet and Modbus TCP protocol is only available in TKE/TKG mode.
