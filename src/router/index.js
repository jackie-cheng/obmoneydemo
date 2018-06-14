import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/Home.vue'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  linkActiveClass:'is-active',
  routes: [
    {
      path: '/',
      meta: {
        title: '首页',
      },
      name: 'home',
      component: home
    },
    {
      path: '*',
      meta: {
        title: '首页',
      },
      redirect:"/home",
    },
    {
      path:'/roomDetail/:id',
      meta: {
        title: '房间详情',
      },
      component:resolve=>{
        require(['../pages/room/roomDetail.vue'],resolve)
      }
    },
    {
      path:'/discount',
      meta: {
        title: '优惠',
      },
      component:resolve=>{
        require(['../pages/Discount.vue'],resolve)
      }
    },
    {
      path:'/login',
      meta: {
        title: '登录',
      },
      component:resolve=>{
        require(['../pages/user/login.vue'],resolve)
      }
    },
    {
      path:'/register',
      meta: {
        title: '注册',
      },
      component:resolve=>{
        require(['../pages/user/register.vue'],resolve)
      }
    },
    {
      path:'/user',
      meta: {
        title: '个人信息',
      },
      component:resolve=>{
        require(['../pages/user/userMenu/userIndex.vue'],resolve)
      }
    },
    {
      path:'/myInfo',
      meta: {
        title: '个人资料',
      },
      component:resolve=>{
        require(['../pages/user/userMenu/MyInfo.vue'],resolve)
      }
    },
    {
      path:'/forgetPass',
      meta: {
        title: '忘记密码',
      },
      component:resolve=>{
        require(['../pages/user/forgetPass.vue'],resolve)
      }
    },
    {
      path:'/newPassword',
      meta: {
        title: '设置密码',
      },
      component:resolve=>{
        require(['../pages/user/newPassword.vue'],resolve)
      }
    },
    {
      path:'/modifyPassword',
      meta: {
        title: '修改密码',
      },
      component:resolve=>{
        require(['../pages/user/modifyPassword.vue'],resolve)
      }
    },
    {
      path:'/payPassword',
      meta: {
        title: '支付密码',
      },
      component:resolve=>{
        require(['../pages/user/payPassword.vue'],resolve)
      }
    },
    {
      path:'/accountSet',
      meta: {
        title: '提现账户设置',
      },
      component:resolve=>{
        require(['../pages/user/accountSet.vue'],resolve)
      }
    },
    {
      path:'/accountSetDetail',
      meta: {
        title: '添加账户',
      },
      component:resolve=>{
        require(['../pages/user/accountSetDetail.vue'],resolve)
      }
    },
    {
      path:'/addBank',
      meta: {
        title: '添加银行卡',
      },
      component:resolve=>{
        require(['../pages/my_wallet/addBank.vue'],resolve)
      }
    },
    {
      path:'/safeSet',
      meta: {
        title: '安全设置',
      },
      component:resolve=>{
        require(['../pages/user/safeSet.vue'],resolve)
      }
    },
    {
      path:'/customerSerVice',
      meta: {
        title: '客服',
      },
      component:resolve=>{
        require(['../pages/CustomerSerVice.vue'],resolve)
      }
    },
    {
      path:'/notice',
      meta: {
        title: '公告',
      },
      component:resolve=>{
        require(['../pages/notice/pageIndex.vue'],resolve)
      }
    },
    {
      path:'/msg_content/:id',
      meta: {
        title: '公告详情',
      },
      component:resolve=>{
        require(['../pages/notice/MessageContent.vue'],resolve)
      }
    },
      {
        path: '/my_wallet',
        meta: {
          title: '我的钱包',
        },
        component: resolve => {
          require(['../pages/my_wallet/PageIndex.vue'], resolve)
        }
      },
    // {
    //   path: '/put_money',
    //   meta: {
    //     title: '提现',
    //   },
    //   component: resolve => {
    //     require(['../pages/my_wallet/putMoney.vue'], resolve)
    //   }
    // },
      {
        path: '/wallet_record',
        meta: {
          title: '充值/提现记录',
        },
        component: resolve => {
          require(['../pages/my_wallet/Record.vue'], resolve)
        }
      },
      {
        path: '/wallet_out',
        meta: {
          title: '提现',
        },
        component: resolve => {
          require(['../pages/my_wallet/MoneyOut.vue'], resolve)
        }
      },
    {
      path: '/wallet_in',
      meta: {
        title: '充值列表',
      },
      component: resolve => {
        require(['../pages/my_wallet/MoneyIn.vue'], resolve)
      }
    },
    {
      path: '/wechat_in/:id',
      meta: {
        title: '充值详情',
      },
      component: resolve => {
        require(['../pages/my_wallet/wechatIn.vue'], resolve)
      }
    },
    {
      path: '/statistic_list',
      meta: {
        title: '统计记录',
      },
      component: resolve => {
        require(['../pages/recordList/statisticList.vue'], resolve)
      }
    },
    {
      path: '/trade_list',
      meta: {
        title: '交易记录',
      },
      component: resolve => {
        require(['../pages/recordList/tradeList.vue'], resolve)
      }
    },
    {
      path: '/score_list',
      meta: {
        title: '积分记录',
      },
      component: resolve => {
        require(['../pages/recordList/scoreList.vue'], resolve)
      }
    },
    {
      path: '/backwater_list',
      meta: {
        title: '回水记录',
      },
      component: resolve => {
        require(['../pages/recordList/backWater.vue'], resolve)
      }
    },
    {
      path: '/backWater_rule',
      meta: {
        title: '回水说明',
      },
      component: resolve => {
        require(['../pages/recordList/backWaterRule.vue'], resolve)
      }
    },
    {
      path: '/sign_every',
      meta: {
        title: '签到',
      },
      component: resolve => {
        require(['../pages/user/signEvery.vue'], resolve)
      }
    },
  ]
})
