<template>
  <div class="mr-root">
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"

    />
    <div class="login-content">
      <div class="userPhoto">
        <img src="../assets/logo.png" alt="">
      </div>
      <el-input
        placeholder="请输入用户名"
        v-model="username"
        clearable>
      </el-input>
      <el-input
        placeholder="请输入密码"
        type="password"
        v-model="pass"
        clearable>
      </el-input>
      <van-button type="danger" @click="goLogin()">登录</van-button>

      <p> <router-link tag="a" to="/register">
        快速注册
      </router-link>
        <router-link tag="a" to="/register">
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
      }
    },
    computed:{

    },
    components:{

    },
    created(){
      const vm = this
    },
    methods:{
      onClickLeft() {
        this.$router.go(-1)
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

        vm.$axios.post(`/api/LoginController/login.do`, param)
          .then(response => {
            toast1.clear();
            if (response.status == 200) {
              if (response.data.status != 'fail') {

                console.log('成功')
              } else {
                vm.$toast(response.data.message);
              }

            } else {
              vm.$toast('获取验证码失败');
            }
          }).catch(response => {

        })
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
