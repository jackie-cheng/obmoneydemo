<template>
  <div class="mr-root">
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"

    />
    <van-cell-group>
      <van-field v-model="username" placeholder="请输入用户名" />
      <van-field v-model="pass" placeholder="请输入密码" />
    </van-cell-group>
    <van-button type="primary" @click="goRegister()">登录</van-button>


    <router-link tag="a" to="/register">
快速注册
    </router-link>
    <router-link tag="a" to="/register">
忘记密码？
    </router-link>
  </div>
</template>

<script>

  import Header from '../components/Header'
  export default {

    name: 'login',
    data(){


      return {
          username:'',
          pass: '',
      }
    },
    computed:{

    },
    components:{
      Header
    },
    created(){
      const vm = this
    },
    methods:{
      onClickLeft() {
        this.$router.go(-1)
      },

      goRegister(){
        const vm = this

                vm.$axios({
          url: '/api/LoginController/login.do',
          method: 'get',
          data: {
            phone:159375,
            photoCode:1234
          },
          transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
      },

      submitForm() {

      },

    }
  }
</script>

<style>
  .demo-ruleForm{
    margin-top:0.6rem;
  }
  .demo-ruleForm .el-form-item__content{
    width: 70%;
    margin: 0 auto;
  }
  .twoInput .el-input-group__append {
    border: none;
    padding: 0;
  }
  .threeInput .el-input-group__append {
    border: none;
    background-color: transparent;
    padding: 0 0rem 0 0.8rem;
  }
  .twoInput .el-input-group__append img{

  }
</style>
