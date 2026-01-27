---
layout: doc
lang: en
---
<script setup>
import { withBase } from 'vitepress'

</script>
<div class="home-hero">
  <div class="home-hero-content">
    <h1 class="home-hero-name">ThinkLink</h1>
    <p class="home-hero-text">Comprehensive IoT System</p>
    <p class="home-hero-tagline">Build efficient, secure, and scalable LoRaWAN IoT solutions</p>
    <div class="home-hero-actions">
      <a class="action-button primary" :href="withBase('/en/QuickStart/RegistrationAndLogin/Register')">Get Started</a>
      <a class="action-button" href="https://github.com/ManThink/">View on GitHub</a>
    </div>
  </div>
</div>

<div class="home-features">
  <div class="feature-item">
    <div class="feature-icon">🌐</div>
    <h3 class="feature-title">Flexible Deployment</h3>
    <p class="feature-details">Support cloud server, edge server (TKE), or gateway internal (TKG) deployment</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">📊</div>
    <h3 class="feature-title">Integrated Data Model</h3>
    <p class="feature-details">Parse raw LoRaWAN and MQTT data into structured application-layer data</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">🔧</div>
    <h3 class="feature-title">RPC Remote Management</h3>
    <p class="feature-details">Remotely configure device parameters and issue control commands</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">🏢</div>
    <h3 class="feature-title">Asset Aggregation</h3>
    <p class="feature-details">Aggregate data from multiple devices through thing models to form asset views</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">⚡</div>
    <h3 class="feature-title">Real-time Monitoring</h3>
    <p class="feature-details">Real-time listening to network data for quick debugging of LoRaWAN sensors</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">🔌</div>
    <h3 class="feature-title">Protocol Integration</h3>
    <p class="feature-details">Seamless integration with BACnet, Modbus TCP, Home Assistant, ThingsBoard</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">🚨</div>
    <h3 class="feature-title">Smart Alarms</h3>
    <p class="feature-details">Set alarm rules based on multiple data types with multi-channel notifications</p>
  </div>
  
  <div class="feature-item">
    <div class="feature-icon">☁️</div>
    <h3 class="feature-title">Cloud Compilation</h3>
    <p class="feature-details">Complete EB code compilation and download in the cloud, simplifying embedded development</p>
  </div>
</div>

## Why Choose ThinkLink?

**ThinkLink (TKL)** is a comprehensive and highly integrated IoT system designed for building efficient, secure, and scalable LoRaWAN IoT solutions. It features a built-in complete LoRaWAN network server (NS) function and supports multiple flexible deployment methods.

### Core Advantages

- **Complete LoRaWAN Management**: Built-in network server for centralized device and gateway management
- **Multi-source Data Integration**: Unified management of LoRaWAN and MQTT data streams
- **Flexible Deployment**: Cloud, edge, or gateway deployment to meet various needs
- **Advanced Data Analytics**: Transform raw sensor data into actionable insights
- **Enterprise-grade Security**: Device authentication and encrypted communication

---

## Community & Support

Have questions? Join our community or contact our support team. We're here to help you succeed with ThinkLink.
- **Email**    : info@manthink.cn
- **Mobile**   : +86-15810684257
- **Last Updated**: January 2026 
- **Version**: 1.0.0

<style  scoped>
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
