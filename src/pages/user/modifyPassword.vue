<template>
  <div class="mr-root">
    <van-nav-bar
      title="修改密码"
      left-arrow
      @click-left="onClickLeft"

    />
    <div class="forgetPass">
      <van-cell-group>
        <van-field v-model="phoneNum" placeholder="请输入您的旧密码"  icon="clear"
                   @click-icon="phoneNum = ''" />
        <van-field v-model="phoneNum" placeholder="请输入您的新密码"  icon="clear"
                   @click-icon="phoneNum = ''" />
        <van-field v-model="phoneNum" placeholder="请再次输入您的新密码"  icon="clear"
                   @click-icon="phoneNum = ''" />

      </van-cell-group>

      <div class="nextBut">
        <van-button type="danger" @click="obNewPass()">确定</van-button>
      </div>




    </div>


  </div>
</template>

<script>


  export default {

    name: 'modifyPass',
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
