---
layout: doc
---
<script setup>
import { withBase } from 'vitepress'

</script>
<div class="home-hero">
  <div class="home-hero-content">
    <h1 class="home-hero-name">ThinkLink</h1>
    <p class="home-hero-text">综合物联网系统</p>
    <p class="home-hero-tagline">构建高效、安全、可扩展的 LoRaWAN 物联网解决方案</p>
    <div class="home-hero-actions">
      <a class="action-button primary" :href="withBase('/zh/QuickStart/RegistrationAndLogin/Register')">快速开始</a>
      <a class="action-button" href="https://github.com/ManThink/">查看 GitHub</a>
    </div>
  </div>
</div>

<div class="home-features">
  <div class="feature-item">
    <div class="feature-icon">🌐</div>
    <h3 class="feature-title">灵活的部署方式</h3>
    <p class="feature-details">支持云服务器、边缘服务器 (TKE) 或网关内部 (TKG) 部署</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">📊</div>
    <h3 class="feature-title">集成数据模型</h3>
    <p class="feature-details">将原始 LoRaWAN 和 MQTT 数据解析为结构化应用层数据</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">🔧</div>
    <h3 class="feature-title">RPC 远程管理</h3>
    <p class="feature-details">远程配置设备参数并下发控制指令</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">🏢</div>
    <h3 class="feature-title">资产聚合</h3>
    <p class="feature-details">通过物模型对多个设备数据进行聚合形成资产视图</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">⚡</div>
    <h3 class="feature-title">实时监测</h3>
    <p class="feature-details">实时侦听网络数据，快速调试 LoRaWAN 传感器</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">🔌</div>
    <h3 class="feature-title">协议对接</h3>
    <p class="feature-details">无缝对接 BACnet、Modbus TCP、Home Assistant、ThingsBoard</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">🚨</div>
    <h3 class="feature-title">智能告警</h3>
    <p class="feature-details">基于多种数据类型设置告警规则，支持多渠道通知</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">☁️</div>
    <h3 class="feature-title">云端编译</h3>
    <p class="feature-details">在云端完成 EB 代码编译与下载，简化嵌入式开发流程</p>
  </div>
</div>

## 为什么选择 ThinkLink？

**ThinkLink (TKL)** 是一个功能全面、高度集成的综合性物联网系统，专为构建高效、安全、可扩展的 LoRaWAN 物联网解决方案而设计。内置完整的 LoRaWAN 网络服务器 (NS) 功能，支持多种灵活的部署方式。

### 核心优势

- **完整的 LoRaWAN 管理**：内置网络服务器，集中管理设备和网关
- **多源数据融合**：统一管理 LoRaWAN 和 MQTT 数据流
- **灵活的部署方式**：云、边缘或网关部署，满足各类需求
- **高级数据分析**：将原始传感器数据转化为可操作的洞察
- **企业级安全**：设备认证和加密通信

---

## 社区与支持

有问题？加入我们的社区或联系支持团队。我们随时准备帮助你成功使用 ThinkLink。
- **Email**     : info@manthink.cn
- **电 话/微信** : 15810684257

- **最后更新**   :2026 年 1 月  
- **版本**      :1.0.0

<style>
.home-hero {
  text-align: center;
  padding: 48px 24px;
  background: linear-gradient(180deg, var(--vp-home-hero-name-color) 0%, var(--vp-c-bg) 100%);
}

.home-hero-content {
  max-width: 1152px;
  margin: 0 auto;
}

.home-hero-name {
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 16px;
  background: linear-gradient(120deg, var(--vp-c-brand-1) 30%, var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.home-hero-text {
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 16px;
  color: var(--vp-c-text-1);
}

.home-hero-tagline {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  margin: 0 0 32px;
}

.home-hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-button {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s;
}

.action-button.primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.action-button.primary:hover {
  background: var(--vp-c-brand-2);
}

.action-button:not(.primary) {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.action-button:not(.primary):hover {
  background: var(--vp-c-bg-soft-up);
}

.home-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 48px 24px;
  max-width: 1152px;
  margin: 0 auto;
}

.feature-item {
  text-align: center;
  padding: 24px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  transition: transform 0.2s;
}

.feature-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--vp-c-text-1);
}

.feature-details {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.6;
}
</style>
