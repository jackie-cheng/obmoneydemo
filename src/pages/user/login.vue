<template>
  <div class="mr-root">
    <van-nav-bar
      title="登录"
      @click-left="onClickLeft"
      left-arrow
    />
    <div class="login-content">
      <div class="userPhoto">
        <img src="../../assets/qq.png" alt="">
      </div>
      <van-cell-group>
        <van-field v-model="username" placeholder="请输入用户名"   icon="clear"
                   @click-icon="username = ''" />
        <van-field v-model="pass" placeholder="请输入密码"  type="password" />

      </van-cell-group>
      <!--<el-input-->
        <!--placeholder="请输入用户名"-->
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

      <p> <router-link tag="a" to="/register">
        快速注册
      </router-link>
        <router-link tag="a" to="/forgetPass">
          忘记密码？
        </router-link></p>
    </div>


  </div>
</template>

<script>


  export default {

    name: 'login',
    data(){
      return {
          username:'',
          pass: '',
        terminalType:'',
      }
    },
    computed:{

    },
    components:{

    },
    created(){
      const vm = this
vm.IsPC()

    },
    methods:{
      IsPC() {
          const vm = this
        var userAgentInfo = navigator.userAgent;

        var Agents = ["Android", "iPhone",
          "SymbianOS", "Windows Phone",
          "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
          }
        }
      if(flag){
        vm.terminalType = 'PC'
      }else if (userAgentInfo.indexOf('Android') > -1 || userAgentInfo.indexOf('Linux') > -1) {
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
      goLogin(){
        const vm = this
        if (vm.$_.isEmpty(vm.username)) {
          vm.$toast('用户名不能为空');
          return
        } else if (vm.$_.isEmpty(vm.pass)) {
          vm.$toast('请输入密码')
          return
        }
        const toast1 = vm.$toast.loading({
          mask: true,
          duration: 10000,       // 持续展示 toast
          message: '登录中...'
        });
        let param = new URLSearchParams(); //创建form对象
        param.append('username', vm.username);//通过append向form对象添加数据
        param.append('password', vm.pass);//添加form表单中其他数据
        param.append('terminalType', vm.terminalType);
        vm.$axios.post(`/api/userLoginController/login`, param)
          .then(response => {
            if (response.status == 200&&!vm.$_.isEmpty(response.data.resultInfo)) {

              if (response.data.resultInfo.status != 'fail') {

                sessionStorage.setItem('userInfo',JSON.stringify(response.data.resultInfo))


//console.log(response.data)
                vm.$toast('登录成功');
                vm.$router.push('/')
//              } else {
                vm.$toast(response.data.resultInfo.message);
              }else{
                vm.$toast(response.data.resultInfo.message);
              }

            } else {
              vm.$toast('登录失败');
            }
//            toast1.clear();
          }).catch(response => {
          vm.$toast('登录失败');
        })
      },


    }
  }
</script>

<style>

</style>
