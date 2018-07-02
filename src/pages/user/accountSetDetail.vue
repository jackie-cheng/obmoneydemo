<template>
  <div class="mr-root">
    <van-nav-bar
      title="添加账户"
      left-arrow
      @click-left="onClickLeft"

    />
    <div class="accountSet_class">
      <van-cell-group>
        <van-cell title="账户类型" value="支付宝" />
      </van-cell-group>
      <van-cell-group class="frist_accountDel">
        <van-cell title="账户姓名"  value="张三" />
        <van-field
          v-model="accountNum"
          label="账号"
          icon="clear"
          placeholder="请输入账号"
          required
          @click-icon="accountNum = ''"
        />
      </van-cell-group>

      <van-button type="danger" @click="addAccount()">确认添加</van-button>
    </div>


  </div>
</template>

<script>


  export default {

    name: 'accountSetDe',
    data(){
      return {

        accountNum:'',

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

      addAccount(){
        const vm = this
        if (vm.$_.isEmpty(vm.accountNum)) {
          vm.$toast('账号不能为空');
          return
        }
        vm.$toast.success('添加成功');
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
