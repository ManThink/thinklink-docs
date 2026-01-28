import { defineConfig } from 'vitepress'

export const baseUrl = "/tkl-docs"
export default defineConfig({
  base: baseUrl,
  outDir: `.${baseUrl}`,
  title: 'ThinkLink',
  description: 'IOT platform with native LoRaWAN NS',
  // rewrites: {
  //   'en/:slug*': ':slug*'
  // },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          // 英文链接使用根路径 (因为有 rewrites 映射)
          { text: 'Guide', link: '/en/QuickStart/Deployment/ThinkLinkDocker' }, 
        ],
      }
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          // 中文链接使用 /zh/ 前缀 (或使用相对路径，但绝对路径更清晰)
          { text: '指南', link: '/zh/QuickStart/Deployment/ThinkLinkDocker' }, 
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
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Deployment', link: '/en/QuickStart/Deployment/ThinkLinkDocker' },
    // ],

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
                  { text: 'EB APP paras', link: 'EB/EdgeBusAppPara' }
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
                  { text: 'EB APP 参数', link: 'EB/EdgeBusAppPara' }
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
