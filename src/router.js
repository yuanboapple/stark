import Vue from 'vue'
import Router from 'vue-router'

//mainPage
//const MainPage = () => import('./views/MainPage.vue')

//404
const NotFoundComponent = () => import('./views/error/NotFound.vue') 
//登录
const MyLogin = () => import('./views/MyLogin.vue')
//信息确认
const identityConfirm = () => import('./views/settings/IdentifyConfirm.vue')
//收益管理
const IncomeIndex = () => import('./views/income/Index.vue')
const DataStatic = () => import('./views/income/DataStatic.vue')
const DepositStatic = () => import('./views/income/DepositStatic.vue')
const CashAdvanceStatic = () => import('./views/income/CashAdvanceStatic.vue')
//承总商管理
const ContractorIndex = () => import('./views/contractor/Index.vue')
const ContractorList = () => import('./views/contractor/ContractorList.vue')
const OrderManage = () => import('./views/contractor/OrderManage.vue')
//商户管理
const BusinessIndex = () => import('./views/business/Index.vue')
  const BusinessManage = () => import('./views/business/BusinessManage.vue')
  const BusiDataStatistic = () => import('./views/business/BusiDataStatistic.vue')
  const CommiDataStatistic = () => import('./views/business/CommiDataStatistic.vue')
//用户管理
const UserManage = () => import('./views/settings/UserManage.vue')
//结算管理
const SettlementIndex = () => import('./views/settlementManage/index.vue')
const SetttlementManage = () => import('./views/settlementManage/settlementManage.vue')
const SettlementDetail = () => import('./views/settlementManage/settlementDetail.vue')
//操作记录
const OperatingRecord = () => import('./views/operatingRecord/index.vue')
//钱包管理
const WalletManage = () => import('./views/walletManage/index.vue')
//收款管理
const CollectManage = () => import('./views/collectManage/index.vue')
//系统设置
const SystemIndex = () => import('./views/settings/Index.vue')
  //账户管理
  const AccountManage = () => import('./views/settings/AccountManage.vue')
  //通知公告
  const Notice = () => import('./views/settings/Notice.vue')
  //安全设置
  const SecurityManage = () => import('./views/settings/SecurityManage.vue')
  //消息通知
  const NewsNotify = () => import('./views/settings/NewsNotify.vue')
  //角色管理
  const RoleManage = () => import('./views/settings/RoleManage.vue')
// //会员管理
// const MemberIndex  = () => import('./views/member/Index.vue')
// const MemberManage = () => import('./views/member/MemberManage.vue')

// //账户设置
// const AccountSettingIndex = () => import('./views/settings/accountSettings/Index.vue')
// const Organization        = () => import('./views/settings/accountSettings/Organization.vue')
// const Role                = () => import('./views/settings/accountSettings/Role.vue')

// //安全设置
// const SecuritySettingIndex = () => import('./views/settings/securitySettings/Index.vue')
// const Password             = () => import('./views/settings/securitySettings/Password.vue')
// const Mobile               = () => import('./views/settings/securitySettings/Mobile.vue')
// const Email                = () => import('./views/settings/securitySettings/Email.vue')

Vue.use(Router)
/*
** rule角色权限:
   'merchant'商户 'stark'平台管理权限 'acceptance'承兑商权限 'channel'渠道商权限
*/
const router = new Router({
  mode: "history",
  base: "/web/",
  routes: [
    { 
      path: '*', 
      name: '404',
      meta: {
        routerName: "404router",
        showNav: false,
        inNav: true,
      },
      component: NotFoundComponent 
    },
    { 
      path: '/identityConfirm', 
      name: 'identityConfirm',
      meta: {
        routerName: "信息确认",
        showNav: false,
        inNav: true,
      },
      component:  identityConfirm
    },    
    {
      path: "",
      redirect: "/mylogin",
      name:'mylogin',
      meta: {
        routerName: "重定向router",
        showNav: false,
        inNav: true,
      },
    },
    {
      path: '/myLogin',
      name: 'myLogin',
      routerName: "Start登录页",
      component: MyLogin,
      meta: {
        showNav: false,
        inNav: true,
      }
    },
    {
      path: '/income',
      name: 'incomeManage',
      component: DataStatic,
      meta: {
        routerName: "收益管理",
        inNav: true,
        url: require("./assets/imgs/nav/gold.png"),
        showNav: true, //是否显示导航条
        role: 'acceptance'
      },
    },
    {
      path: '/incomeManage',
      name: 'starkincomeManage',
      component: IncomeIndex,
      meta: {
        routerName: "收益管理",
        inNav: true,
        url: require("./assets/imgs/nav/gold.png"),
        showNav: true, //是否显示导航条
        role: 'stark,merchant,channel'
      },
      children: [
        {
          path: 'busiDataStatistic',
          name: 'busiInBusiStatistic',
          component: BusiDataStatistic,
          meta: {
            inNav: true,
            prerouterName: "businessManage",
            routerName: "数据统计（商户）",
            role: 'merchant',
            showNav: true //是否显示导航条
          },
        },
        {
          path: 'commiDataStatistic',
          name: 'commiInbusiStatistic',
          component: CommiDataStatistic,
          meta: {
            inNav: true,
            prerouterName: "businessManage",
            routerName: "数据统计（渠道商）",
            role: 'channel',
            showNav: true //是否显示导航条
          },
        },  
        {
          path: 'dataStatic',
          name: 'dataStatic',
          component: DataStatic,
          meta: {
            inNav: true,
            routerName: "数据统计",
            showNav: true, //是否显示导航条
            role: 'stark'
          },
        }
        ,
        {
          path: 'depositStatic',
          name: 'depositStatic',
          component: DepositStatic,
          meta: {
            inNav: true,
            routerName: "保证金统计",
            showNav: true, //是否显示导航条
            role: 'stark'
          },
        },
        {
          path: 'cashAdvanceStatic',
          name: 'cashAdvanceStatic',
          component: CashAdvanceStatic,
          meta: {
            inNav: true,
            routerName: "提现统计",
            showNav: true, //是否显示导航条
            role: 'stark'
          },
        }        
      ]
    },
    {
      path: '/contractor',
      name: 'contractorIndex',
      component: ContractorIndex,
      meta: {
        inNav: true,
        routerName: "承总商管理",
        url: require("./assets/imgs/nav/czs.png"),
        showNav: true, //是否显示导航条
        role: 'stark'
      },
      children: [
        {
          path: 'list',
          name: 'contractorList',
          component: ContractorList,
          meta: {
            inNav: true,
            routerName: "承总商列表",
            showNav: true,
            role: 'stark' //是否显示导航条
          },
        },
        {
          path: 'orderManage',
          name: 'orderManage',
          component: OrderManage,
          meta: {
            inNav: true,
            routerName: "订单管理",
            showNav: true,
            role: 'stark'
          }

        }        
      ]
    },
    {
      path: '/busiess',
      name: 'busiessIndex',
      component: BusinessIndex,
      meta: {
        inNav: true,
        routerName: "商户管理",
        url: require("./assets/imgs/nav/shanghu.png"),
        showNav: true, //是否显示导航条
        role: 'stark'
      },
      children: [
        {
          path: 'businessManage',
          name: 'businessManage',
          component: BusinessManage,
          meta: {
            inNav: true,
            routerName: "商户管理",
            role: 'stark',
            showNav: true //是否显示导航条
          },
        },
        {
          path: 'busiDataStatistic',
          name: 'busiDataStatistic',
          component: BusiDataStatistic,
          meta: {
            inNav: false,
            prerouterName: "businessManage",
            routerName: "数据统计（商户）",
            role: 'stark',
            showNav: true //是否显示导航条
          },
        },
        {
          path: 'commiDataStatistic',
          name: 'commiDataStatistic',
          component: CommiDataStatistic,
          meta: {
            inNav: false,
            prerouterName: "businessManage",
            routerName: "数据统计（渠道商）",
            role: 'stark',
            showNav: true //是否显示导航条
          },
        }                
      ]
    },
    {
      path: '/settlement',
      name: 'settlement',
      component: SettlementIndex,
      meta: {
        inNav: true,
        routerName: "结算管理",
        url: require("./assets/imgs/nav/czs.png"),
        role: 'acceptance',
        showNav: true //是否显示导航条
      },
      children: [
        {
          path: 'manage',
          name: 'settlementManage',
          component: SetttlementManage,
          meta: {
            inNav: true,
            routerName: "结算管理",
            role: 'acceptance',
            showNav: true //是否显示导航条
          },
        },
        {
          path: 'detail',
          name: 'settlementDetail',
          component: SettlementDetail,
          meta: {
            inNav: true,
            routerName: "结算明细",
            role: 'acceptance',
            showNav: true //是否显示导航条
          },
        }                  

      ]

    },
    {
      path: '/operatingRecord',
      name: 'operatingRecord',
      component: OperatingRecord,
      meta: {
        inNav: true,
        routerName: "操作记录",
        url: require("./assets/imgs/nav/czs.png"),
        role: 'acceptance',
        showNav: true //是否显示导航条
      },       
    },
    {
      path: '/orderManage',
      name: 'orderManage',
      component: OrderManage,
      meta: {
        inNav: true,
        routerName: "订单管理",
        url: require("./assets/imgs/nav/czs.png"),        
        showNav: true,
        role: 'acceptance'
      }
    }, 
    {
      path: '/walletManage',
      name: 'walletManage',
      component: WalletManage,
      meta: {
        inNav: true,
        routerName: "钱包管理",
        role: 'acceptance,merchant,channel',
        url: require("./assets/imgs/nav/czs.png"),
        showNav: true //是否显示导航条
      },       
    },    
    {
      path: '/collectManage',
      name: 'collectManage',
      component: CollectManage,
      meta: {
        inNav: true,
        routerName: "收款管理",
        role: 'acceptance',
        url: require("./assets/imgs/nav/czs.png"),
        showNav: true //是否显示导航条
      },       
    },
    {
      path: '/setting',
      name: 'setting',
      component: SystemIndex,
      meta: {
        inNav: true,
        routerName: "系统设置",
        role: 'stark,acceptance,merchant,channel',
        url: require("./assets/imgs/nav/xitong.png"),
        showNav: true //是否显示导航条
      },
      children: [
        {
          path: 'accountManage',
          name: 'accountManage',
          component: AccountManage,
          meta: {
            inNav: true,
            routerName: "账号管理",
            role: 'stark',
            showNav: true //是否显示导航条
          },
        },
        {
          path: 'notice',
          name: 'notice',
          component: Notice,
          meta: {
            inNav: true,
            routerName: "通知公告",
            role: 'stark',
            showNav: true //是否显示导航条
          },
        },
        {
          path: 'securityManage',
          name: 'securityManage',
          component: SecurityManage,
          meta: {
            inNav: true,
            routerName: "安全管理",
            role: 'stark,acceptance,merchant,channel',
            showNav: true //是否显示导航条
          },
        }, 
        {
          path: 'newsNotify',
          name: 'newsNotify',
          component: NewsNotify,
          meta: {
            inNav: true,
            routerName: "消息通知",
            role: 'acceptance',
            showNav: true //是否显示导航条
          }
        },
        {
          path: 'userManage',
          name: 'userManage',
          component: UserManage,
          meta: {
            inNav: true,
            routerName: "用户管理",
            role: 'acceptance',
            showNav: true //是否显示导航条
          }
        },                
        {
          path: 'roleManage',
          name: 'roleManage',
          component: RoleManage,
          meta: {
            inNav: true,
            routerName: "角色管理",
            role: 'acceptance',
            showNav: true //是否显示导航条
          },
        }                        
      ]
    },      
  ]
})

export default router
