<template>
  <div class="mr-root">
    <van-nav-bar title="登录" @click-left="onClickLeft" left-arrow />
    <div class="login-content">
      <div class="userPhoto">
        <img src="../../assets/qq.png" alt="">
      </div>
      <van-cell-group>
        <van-field v-model="username" placeholder="请输入手机号码" icon="clear" @click-icon="username = ''" />
        <van-field v-model="pass" placeholder="请输入密码" type="password" />
        <van-checkbox v-model="checked">记住密码</van-checkbox>
      </van-cell-group>
      <!--<el-input-->
      <!--placeholder="请输入手机号码"-->
      <!--v-model="username"-->
      <!--clearable>-->
      <!--</el-input>-->
      <!--<el-input-->
      <!--placeholder="请输入密码"-->
      <!--type="password"-->
      <!--v-model="pass"-->
      <!--clearable>-->
      <!--</el-input>-->
      <van-button type="danger" @click="goLogin()">登录</van-button>

      <p>
        <router-link tag="a" to="/register">
          快速注册
        </router-link>
        <router-link tag="a" to="/forgetPass">
          忘记密码？
        </router-link>
      </p>
    </div>

  </div>
</template>

<script>
import * as axios from 'axios'
export default {
  name: 'login',
  data() {
    return {
      checked: false,
      username: '',
      pass: '',
      terminalType: ''
    }
  },
  computed: {},
  components: {},
  created() {
    const vm = this
    vm.IsPC()
    if (localStorage.getItem('userLoginData')) {
      vm.username = JSON.parse(localStorage.getItem('userLoginData')).userName
      vm.pass = JSON.parse(localStorage.getItem('userLoginData')).password
    }
  },
  methods: {
    IsPC() {
      const vm = this
      var userAgentInfo = navigator.userAgent

      var Agents = [
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod'
      ]
      var flag = true
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false
          break
        }
      }
      if (flag) {
        vm.terminalType = 'PC'
      } else if (
        userAgentInfo.indexOf('Android') > -1 ||
        userAgentInfo.indexOf('Linux') > -1
      ) {
        vm.terminalType = 'Android'
      } else if (userAgentInfo.indexOf('iPhone') > -1) {
        vm.terminalType = 'ios'
      }
    },
    onClickLeft() {
      const vm = this
      vm.$router.push('/')
    },

    //      登录
    goLogin() {
      const vm = this
      if (vm.$_.isEmpty(vm.username)) {
        vm.$toast('用户名不能为空')
        return
      } else if (vm.$_.isEmpty(vm.pass)) {
        vm.$toast('请输入密码')
        return
      }
      const toast1 = vm.$toast.loading({
        mask: true,
        duration: 10000, // 持续展示 toast
        message: '登录中...'
      })
      let userLogin = {
        password: vm.pass,
        userName: vm.username
      }
      let param = new URLSearchParams() //创建form对象
      param.append('username', vm.username) //通过append向form对象添加数据
      param.append('password', vm.pass) //添加form表单中其他数据
      param.append('terminalType', vm.terminalType)
      vm.$axios
        .post(`/api/userLoginController/login`, param)
        .then(response => {
          if (
            response.status == 200 &&
            !vm.$_.isEmpty(response.data.resultInfo)
          ) {
            if (response.data.resultInfo.status != 'fail') {
              localStorage.setItem(
                'userInfo',
                JSON.stringify(response.data.resultInfo)
              )
              if (vm.checked) {
                localStorage.setItem('userLoginData', JSON.stringify(userLogin))
              }

              //                window.reload()
              //                let userData = response.data.resultInfo
              //                axios.defaults.headers.common['uuid'] = userData.uuid;
              //                axios.defaults.headers.common['token'] = userData.token;
              //                axios.defaults.headers.common['terminalType'] = userData.terminalType;
              //console.log(response.data)
              vm.$toast('登录成功')
              vm.$router.push('/')
              //                window.location.href = '/login'
              //              } else {
              //                vm.$toast(response.data.resultInfo.message);
            } else {
              vm.$toast(response.data.resultInfo.message)
            }
          } else {
            vm.$toast('登录失败')
          }
          //            toast1.clear();
        })
        .catch(response => {
          vm.$toast('登录失败')
        })
    }
  }
}
</script>

<style>
</style>
