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
      path:'/recharge',
      component:resolve=>{
        require(['../pages/Recharge.vue'],resolve)
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
        require(['../pages/user/MyInfo.vue'],resolve)
      }
    },
    {
      path:'/forgetPass',
      component:resolve=>{
        require(['../pages/user/forgetPass.vue'],resolve)
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

  ]
})
