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
      name: 'home',
      component: home
    },
    {
      path: '*',
      redirect:"/home",
    },
    {
      path:'/roomDetail/:id',
      component:resolve=>{
        require(['../pages/room/roomDetail.vue'],resolve)
      }
    },
    {
      path:'/discount',
      component:resolve=>{
        require(['../pages/Discount.vue'],resolve)
      }
    },
    {
      path:'/login',
      component:resolve=>{
        require(['../pages/user/login.vue'],resolve)
      }
    },
    {
      path:'/register',
      component:resolve=>{
        require(['../pages/user/register.vue'],resolve)
      }
    },
    {
      path:'/user',
      component:resolve=>{
        require(['../pages/user/userMenu/userIndex.vue'],resolve)
      }
    },
    {
      path:'/myInfo',
      component:resolve=>{
        require(['../pages/user/userMenu/MyInfo.vue'],resolve)
      }
    },
    {
      path:'/forgetPass',
      component:resolve=>{
        require(['../pages/user/forgetPass.vue'],resolve)
      }
    },
    {
      path:'/newPassword',
      component:resolve=>{
        require(['../pages/user/newPassword.vue'],resolve)
      }
    },
    {
      path:'/customerSerVice',
      component:resolve=>{
        require(['../pages/CustomerSerVice.vue'],resolve)
      }
    },
    {
      path:'/notice',
      component:resolve=>{
        require(['../pages/notice/pageIndex.vue'],resolve)
      }
    },
    {
      path:'/msg_content/:id',
      component:resolve=>{
        require(['../pages/notice/MessageContent.vue'],resolve)
      }
    },
      {
        path: '/my_wallet',
        component: resolve => {
          require(['../pages/my_wallet/PageIndex.vue'], resolve)
        }
      },
      {
        path: '/wallet_record',
        component: resolve => {
          require(['../pages/my_wallet/Record.vue'], resolve)
        }
      },
      {
        path: '/wallet_out',
        component: resolve => {
          require(['../pages/my_wallet/MoneyOut.vue'], resolve)
        }
      },
    {
      path: '/wallet_in',
      component: resolve => {
        require(['../pages/my_wallet/MoneyIn.vue'], resolve)
      }
    },
    {
      path: '/wechat_in',
      component: resolve => {
        require(['../pages/my_wallet/wechatIn.vue'], resolve)
      }
    },
    {
      path: '/statistic_list',
      component: resolve => {
        require(['../pages/recordList/statisticList.vue'], resolve)
      }
    },
    {
      path: '/trade_list',
      component: resolve => {
        require(['../pages/recordList/tradeList.vue'], resolve)
      }
    },
    {
      path: '/score_list',
      component: resolve => {
        require(['../pages/recordList/scoreList.vue'], resolve)
      }
    },
    {
      path: '/backwater_list',
      component: resolve => {
        require(['../pages/recordList/backWater.vue'], resolve)
      }
    },
    {
      path: '/backWater_rule',
      component: resolve => {
        require(['../pages/recordList/backWaterRule.vue'], resolve)
      }
    },
    {
      path: '/sign_every',
      component: resolve => {
        require(['../pages/user/signEvery.vue'], resolve)
      }
    },
  ]
})
