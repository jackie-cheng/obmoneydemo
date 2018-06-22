/**
 * Created by hao.wang on 2017-5-5.
 * App.vue 的 mixins
 */

import * as axios from 'axios'
export default {
  beforeCreate(){
    // 获取token
    let vm = this
    console.log('beforeCreate')
      let userData =  JSON.parse(localStorage.getItem('userInfo'))
    let token = userData || ''
    if(!!userData){
      axios.defaults.headers.common['uuid'] = userData.uuid;
      axios.defaults.headers.common['token'] = userData.token;
      axios.defaults.headers.common['terminalType'] = userData.terminalType;
    }

  },

  //用于停下服务，上线时
  // watch:{
  //   $route(to, from){
  //      window.location.href = 'index.html'
  //   }
  // }
}
