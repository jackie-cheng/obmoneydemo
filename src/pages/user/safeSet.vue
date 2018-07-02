<template>
  <div class="mr-root">
    <van-nav-bar
      title="安全设置"
      left-arrow
      @click-left="onClickLeft"

    />
    <div>
      <van-cell-group>
        <van-cell title="修改支付密码" is-link to="/mPayPassword" v-if="userData&&userData.paymentPassword!='false'" />
        <van-cell title="设置支付密码" is-link to="/payPassword" v-if="userData&&userData.paymentPassword=='false'"/>
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




    }
  }
</script>

<style>

</style>
