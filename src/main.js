// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
// 将axios挂载到vue对象的原型下边以实现全局通用
// Vue.prototype.axios = axios
Vue.config.productionTip = false
import { appInitInject, } from './utils/common'
import mixin_app__token from './utils/mixin_app__token'
appInitInject()
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  // if(sessionStorage.getItem('userInfo')){
  //   let userData =  JSON.parse(sessionStorage.getItem('userInfo'))
  //   axios.defaults.headers.common['uuid'] = userData.uuid;
  //   axios.defaults.headers.common['token'] = userData.token;
  //   axios.defaults.headers.common['terminalType'] = userData.terminalType;
  // }
  next()
})
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-ydui/dist/ydui.base.css';
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  mixins: [mixin_app__token],
  components: { App },
  template: '<App/>'
})
