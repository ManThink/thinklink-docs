// @ts-ignore
import { defineConfig } from 'vitepress'

export const baseUrl = "/tkl-docs/"
const siteUrl = 'https://think-link.net'
const canonicalBase = `${siteUrl}${baseUrl.replace(/\/$/, '')}` // https://think-link.net/tkl-docs
export default defineConfig({
  base: baseUrl,
  outDir: `.${baseUrl}`,
  markdown: {
    math: true, // ← 关键：开启数学解析（v1.0+ 默认 true，但显式声明更稳妥）
  },
  title: 'ThinkLink',
  description: 'IOT platform with native LoRaWAN NS',
  lastUpdated: true, // ✅ 有利于文档类站点（也能被主题显示）
  cleanUrls: true,   // ✅ /xx/yy 而不是 /xx/yy.html（更利于 SEO）
  head: [
    // --- Basic ---
    ['meta', { name: 'author', content: 'ThinkLink' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['link', { rel: 'canonical', href: `${canonicalBase}/` }],

    // --- hreflang (多语言很关键) ---
    ['link', { rel: 'alternate', hreflang: 'en', href: `${canonicalBase}/en/` }],
    ['link', { rel: 'alternate', hreflang: 'zh-CN', href: `${canonicalBase}/zh/` }],
    ['link', { rel: 'alternate', hreflang: 'x-default', href: `${canonicalBase}/en/` }],

    // --- Open Graph ---
    ['meta', { property: 'og:site_name', content: 'ThinkLink Docs' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'ThinkLink Documentation' }],
    ['meta', { property: 'og:description', content: 'IoT platform with native LoRaWAN NS' }],
    ['meta', { property: 'og:url', content: `${canonicalBase}/` }],
    // ✅ 你可以放一张 1200x630 的分享图（建议放 public/og.png）
    ['meta', { property: 'og:image', content: `${canonicalBase}/og.png` }],

    // --- Twitter Card ---
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'ThinkLink Documentation' }],
    ['meta', { name: 'twitter:description', content: 'IoT platform with native LoRaWAN NS' }],
    ['meta', { name: 'twitter:image', content: `${canonicalBase}/og.png` }],

    // ✅ 可选：站点图标
    ['link', { rel: 'icon', href: `${baseUrl}favicon.ico` }],
  ],
  // rewrites: {
  //   'en/:slug*': ':slug*'
  // },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        lastUpdated: { // 可选：自定义文案和格式（仅影响显示，不改变数据源）
          text: 'lastUpdated',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium'
          }
        },
        nav: [
          { text: 'Home', link: 'https://think-link.net' },
        ],
      }
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        lastUpdated: { // 可选：自定义文案和格式（仅影响显示，不改变数据源）
          text: '最后更新',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium'
          }
        },
        nav: [
          { text: '首页', link: 'https://think-link.net/zh/home-zh' },
        ],
      }
    }, 
  },

  themeConfig: {
    // logo: '/logo.svg',
    siteTitle: 'ThinkLink',
    search:{
      provider: 'local'
    },
    outline: [2, 3],
    lastUpdated:{
      text:'Last updated'
    } ,
    sidebar: {
      '/en/': {
        base: '/en/',
        items: [
          {
            items: [
              { text: 'ThinkLink Introduction', link: 'QuickStart/ThinkLinkIntroduction' },
              { text: 'Account',
                items:[
                  { text:'Register', link: 'QuickStart/RegistrationAndLogin/Register'},
                  { text:'Personal Center', link: 'QuickStart/RegistrationAndLogin/PersonalCenter'},
                  { text:'Organization Management', link: 'QuickStart/RegistrationAndLogin/OrganizationManagement'},
                ]
              },
              { text: 'System Management',
                items:[
                  {text:'Role Management',link: 'QuickStart/SystemManagement/RoleManagement'},
                  {text:'User Management',link: 'QuickStart/SystemManagement/UserManagement'},
                  {text:'Server Configuration',link: 'QuickStart/SystemManagement/ServerConfiguration'},
                ]
              },
              {
                text: 'Deployment',
                items: [
                  { text: 'Docker', link: 'QuickStart/Deployment/ThinkLinkDocker' },
                  { text: 'Gateway', link: 'QuickStart/Deployment/ThinkLinkGateway' },
                ],
              },
            ],
          },
          {
            items:[
              {
                text: 'Network Data',
                items: [
                  { text: 'NS Data', link: 'Data/NetworkData/NSData' },
                  { text: 'AS Data', link: 'Data/NetworkData/ASData' },
                ],
              },
              {
                text: 'Application Data',
                items: [
                  { text: 'Realtime Data', link: 'Data/ApplicationData/RealtimeData' },
                  { text: 'Historical Data', link: 'Data/ApplicationData/HistoricalData' },
                ],
              }
            ]
          },
          {
            items:[
              {
                text:'Maintenance',
                items: [
                  { text: 'Device Management', link: 'Maintenance/DeviceManagement' },
                  { text: 'Gateway Management', link: 'Maintenance/GatewayManagement' },
                  { text: 'BACnet', link: 'Maintenance/BACnet' },
                  { text: 'Dashboard Configuration', link: 'Maintenance/DashboardConfiguration' },
                  { text: 'Upgrade', link: 'Maintenance/Upgrade' },
                { text: 'EBCompiler', link: 'Maintenance/EBCompiler' },
                ]
              },
              {
                text:'Model',
                items: [
                  { text: 'Thing Model', link: 'Model/ThingModel' },
                  { text: 'RPC Model', link: 'Model/RPCModel' },
                  { text: 'Trigger Model', link: 'Model/TriggerModel' },
                  { text: 'Template', link: 'Model/Template' },
                  { text: 'TKLHelper', link: 'Model/tklHelper' },
                ],
              },
              {
                text: 'Action',
                items: [
                  { text: 'Device Action', link: 'Action/DeviceAction' },
                  { text: 'Scheduled Tasks', link: 'Action/ScheduledTasks' },
                ],
              },
              {
                text: 'Alarm',
                items: [
                ],
              },
              {
                text: 'Log',
                items: [
                ],
              },
              {
                text: 'Protocol',
                items: [
                  { text: 'ThinkLink protocol', link: 'Protocol/ThinkLinkProtocol' },
                  { text: 'AS protocol', link: 'Protocol/ASProtocol' },
                  { text: 'Application protocol', link: 'Protocol/ApplicationProtocol' },
                ],
              },
              {
                text: 'Advanced',
                items: [
                  { text: 'MQTT Forwarder', link: 'Advanced/MQTTForwarder' },
                ],
              }
              ]
          },{
            items:[
              {
                text: 'EB',
                items: [
                  { text: 'EB compiler', link: 'EB/EdgeBusCompiler' },
                  { text: 'EB APP paras', link: 'EB/EdgeBusAppPara' },
                  { text: 'EBHelper', link: 'EB/EBHelper' },
                ]
              }
            ]
          },{
            items:[
              {
                text: 'AN',
                items: [
                  { text: 'EBHelper Codes', link: 'AN/EBHelperCodes' },
                  { text: 'tklHelper Codes', link: 'AN/tklHelperCodes' },
                  { text: 'BatchDataManagementGuide', link: 'AN/BatchDataManagementGuide' },
                  { text: '[AN-26022301] DTU Power Consumption Calculation Guide', link: 'AN/AN-26022301 DTU Power Consumption Calculation Guide' },
                ]
              }
            ]
          },
          {
            items:[
              {
                text: 'Integration',
                items: [
                  { text: 'Gateway',
                    items:[
                    ] },
                  { text: 'Device',
                    items:[
                      { text: 'WaterMeter',
                        items:[
                          {text:"KC21-21121-ZENNER",link:'Integration/Device/WaterMeter/KC21-21121-ZENNER'},
                        ] },
                    ] },
                ]
              }
            ]
          }
        ],
      },
      '/zh/': {
        base: '/zh/',
        items: [
          {
            items: [
              { text: 'ThinkLink 介绍', link: 'QuickStart/ThinkLinkIntroduction' },
              { text: '账号',
                items:[
                  { text:'注册/登录', link: 'QuickStart/RegistrationAndLogin/Register'},
                  { text:'个人中心', link: 'QuickStart/RegistrationAndLogin/PersonalCenter'},
                  { text:'组织管理', link: 'QuickStart/RegistrationAndLogin/OrganizationManagement'},
                ]
              },
              { text: '系统管理',
                items:[
                    {text:'角色管理',link: 'QuickStart/SystemManagement/RoleManagement'},
                    {text:'用户管理',link: 'QuickStart/SystemManagement/UserManagement'},
                    {text:'服务器配置',link: 'QuickStart/SystemManagement/ServerConfiguration'},
                ]
              },
              {
                text: '部署',
                items: [
                  { text: 'Docker', link: 'QuickStart/Deployment/ThinkLinkDocker' },
                  { text: '网关', link: 'QuickStart/Deployment/ThinkLinkGateway' },
                ],
              }
            ],
          },
          {
            items:[
              {
                text: '网络数据',
                items: [
                  { text: 'NS数据', link: 'Data/NetworkData/NSData' },
                  { text: 'AS数据', link: 'Data/NetworkData/ASData' },
                ],
              },
              {
                text: '应用数据',
                items: [
                  { text: '实时数据', link: 'Data/ApplicationData/RealtimeData' },
                  { text: '历史数据', link: 'Data/ApplicationData/HistoricalData' },
                ],
              }
            ]
          },
          {
            items:[
              {
                text:'运维管理',
                items: [
                { text: '设备管理', link: 'Maintenance/DeviceManagement' },
                { text: '网关管理', link: 'Maintenance/GatewayManagement' },
                { text: 'BACnet', link: 'Maintenance/BACnet' },
                { text: '仪表板配置', link: 'Maintenance/DashboardConfiguration' },
                { text: '升级', link: 'Maintenance/Upgrade' },
                { text: 'EB编译', link: 'Maintenance/EBCompiler' },
                ]
              },
              {
                text:'模型',
                items: [
                  { text: '物模型', link: 'Model/ThingModel' },
                  { text: 'RPC', link: 'Model/RPCModel' },
                  { text: '触发模型', link: 'Model/TriggerModel' },
                  { text: '模板', link: 'Model/Template' },
                  { text: 'tklHelper', link: 'Model/tklHelper' },
                ],
              },
              {
                text: '执行管理',
                items: [
                  { text: '设备执行', link: 'Action/DeviceAction' },
                  { text: '定时任务', link: 'Action/ScheduledTasks' },
                ],
              },
              {
                text: '协议',
                items: [
                  { text: 'ThinkLink 协议', link: 'Protocol/ThinkLinkProtocol' },
                  { text: 'AS 协议', link: 'Protocol/ASProtocol' },
                  { text: '应用层 协议', link: 'Protocol/ApplicationProtocol' },
                ],
              },
              {
                text: '告警',
                items: [],
              },
              {
                text: '日志',
                items: [],
              },
              {
                text: '高级功能',
                items: [
                  { text: 'MQTT 转发器', link: 'Advanced/MQTTForwarder' },
                ],
              }
            ]
          },
          {
            items:[
              {
                text: 'EB',
                items: [
                  { text: 'EB compiler', link: 'EB/EdgeBusCompiler' },
                  { text: 'EB APP 参数', link: 'EB/EdgeBusAppPara' },
                  { text: 'EBHelper', link: 'EB/EBHelper' },
                ]
              }
            ]
          },
          {
            items:[
              {
                text: 'AN',
                items: [
                  { text: 'EBHelper 源代码', link: 'AN/EBHelperCodes' },
                  { text: 'tklHelper 源代码', link: 'AN/tklHelperCodes' },
                  { text: '批量操作', link: 'AN/BatchDataManagementGuide' },
                  { text: '[AN-26022301] DTU功耗计算', link: 'AN/AN-26022301 DTU Power Consumption Calculation Guide' },

                ]
              }
            ]
          },
          {
            items:[
              {
                text: '集成',
                items: [
                  { text: '网关',
                    items:[
                    ] },
                  { text: '设备',
                    items:[
                      { text: '水表',
                        items:[
                          {text:"KC21-21121-ZENNER",link:'Integration/Device/WaterMeter/KC21-21121-ZENNER'},
                        ] },
                    ] },
                ]
              }
            ]
          }
        ],
      },
    },

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/30482418' },
      { icon: 'x', link: 'https://x.com/ManThinkTech' },
      { icon:'github',link:'https://github.com/ManThink'},
    ],
    footer: {
      copyright: 'Copyright © 2025 ThinkLink Email : info@manthink.cn',
    },
  },
})
