<template>
  <div class="mr-root">
    <van-nav-bar
      title="安全设置"
      left-arrow
      @click-left="onClickLeft"

    />
    <div>
      <van-cell-group>
        <van-cell title="修改支付密码" is-link to="/mPayPassword" />
        <van-cell title="设置支付密码" is-link to="/payPassword" />
        <van-cell title="修改密码" is-link to="/modifyPassword" />
        <van-cell title="提现账户设置" is-link to="/accountSet" />
      </van-cell-group>




    </div>


  </div>
</template>

<script>


  export default {

    name: 'modifyPass',
    data(){
      return {
        userData:null,
        phoneNum:'',

      }
    },
    computed:{

    },
    components:{

    },
    created(){
      const vm = this
      if(!localStorage.getItem('userInfo')){
        vm.$router.push('/login')
      }else{
        vm.userData =  JSON.parse(localStorage.getItem('userInfo'))
      }
    },
    methods:{
      onClickLeft() {
        this.$router.go(-1)
      },


//     修改密码
      obNewPass(){
        const vm = this
        if (vm.$_.isEmpty(vm.phoneNum)) {
          vm.$toast('密码不能为空');
          return
        }
        const toast1 = vm.$toast.loading({
          mask: true,
          duration: 10000,       // 持续展示 toast
          message: '密码更新中...'
        });
        let param = new URLSearchParams(); //创建form对象
        param.append('password', vm.phoneNum);//添加form表单中其他数据

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

</style>
