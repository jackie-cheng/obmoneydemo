<template>
  <div class="mr-root">
    <van-nav-bar
      title="支付密码"
      left-arrow
      @click-left="onClickLeft"

    />
    <div style="margin-top: 2rem">

      <!-- 密码输入框 -->
      <van-password-input
        :value="value"
        info="密码为 6 位数字"
        @focus="showKeyboard = true"
      />
    </div>


    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />


  </div>
</template>

<script>


  export default {

    name: 'modifyPass',
    data(){
      return {
        value: '',
        showKeyboard: true,
//        phoneNum:'',

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
      onInput(key) {
        this.value = (this.value + key).slice(0, 6);
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1);
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
