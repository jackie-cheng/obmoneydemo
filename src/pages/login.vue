<template>
  <div class="mr-root">
    <Header></Header>
    <van-cell-group>
      <van-field
        v-model="username"
        label="用户名"
        required
        placeholder="输入数字、字母，2-20个字符"
        error
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="密码长度为6-20个字符"
        required
      />

    </van-cell-group>
    <van-button type="primary"  size="large" @click="userLogin()">马上登录</van-button>
    <router-link  tag="van-button" to="/register"  type="primary"  size="large">
      免费注册
    </router-link>

    <!--<van-button type="primary"  size="large">免费注册</van-button>-->
    <tabbar :activeNum="4"></tabbar>
  </div>
</template>

<script>
  import tabbar from '../components/tabbar'
  import Header from '../components/Header'
  export default {
    name: 'login',
    data(){
      return {
        password:null,
        username:null,
      }
    },

    components:{
      Header, tabbar
    },
    created(){

    },
    methods:{
      userLogin(){
const vm = this
        let params={
          username:vm.username,
          password:vm.password,
        }
        vm.$axios.post(`/api/LoginController/login.do`,params)
          .then(response => {
              console.log(response)
          if (response.status == 200) {

          } else {

          }
        }).catch(response => {


        })
      }
    }
  }
</script>

