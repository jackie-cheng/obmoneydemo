<template>
  <div class="mr-root">
    <van-nav-bar
      title="提现账户设置"
      left-arrow
      @click-left="onClickLeft"

    />
    <div class="accountSet_class">
      <van-cell-group>
      <van-cell title="支付宝" value="" label="15937442239" class="first_cell">
      <template slot="icon">
        <img src="../../assets/qq.png" alt="">
      </template>
      </van-cell>
      <van-cell title="添加银行卡" icon="add-o" to="/accountSetDetail" />
      </van-cell-group>
    </div>



  </div>
</template>

<script>


  export default {

    name: 'accountSet',
    data(){
      return {

        phoneNum:'',

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


//     修改密码
      obNewPass(){
        const vm = this
        vm.$toast('功能还没做');
        return
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
