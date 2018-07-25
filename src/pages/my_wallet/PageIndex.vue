<template>
  <div class="mr-root">
    <!--header-->
    <van-nav-bar title="我的钱包" left-arrow @click-left="onClickLeft"/>
    <section class="ob_myWallet_container">
      <router-link to="/wallet_record">  <van-nav-bar title="充值/提现记录"/></router-link>

      <div class="ob_myWallet_content">
        <i class="iconfont wallet_icon"></i>
        <div class="ob_myWallet_num" v-if="moneyData&&moneyData!=null">
          <em>账户资金</em>
          <p class="money_num">{{moneyData.balance}}</p>
        </div>
        <div class="ob_myWallet_btns">
          <router-link to="/wallet_in"> <van-button size="large" type="danger">充值</van-button></router-link>
          <router-link to="/wallet_out"><van-button size="large" v-if="moneyData&&moneyData!=null&&Number(moneyData.balance)>0">提现</van-button></router-link>
          <van-button size="large" disabled v-if="moneyData&&moneyData!=null&&Number(moneyData.balance)<1" style="color: #999;border-color: #ccc">提现</van-button>
        </div>
      </div>

    </section>

  </div>

</template>

<script>
  export default {
    name: 'my_wallet',
    data() {
      return {
        moneyData:null,
        userToken:null,
        userData:null,
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      obMoney(){
        const vm = this
                  let params={
                    token: vm.userData.token,
                    uuid:vm.userData.uuid,
                    terminalType :vm.userData.terminalType,
          }
        let url = '/user/geamUserAccountDown/getUserAccount'
        vm.$axios.get(url,{params})
          .then(response => {

            if (response.status == 200&&response.data) {
              if(response.data.statusCode==-100){
                vm.$dialog.confirm({
                  message: response.data.resultInfo,
                  className: 'willy_pup'
                }).then(() => {
                  localStorage.removeItem('userInfo')
                  vm.$router.push('/login')
                }).catch(() => {
                  localStorage.removeItem('userInfo')
                  vm.$router.push('/')
                });
              }else{
                vm.moneyData = response.data.a
              }


            } else {
              vm.$toast('获取余额信息失败');
            }
          }).catch(response => {
          vm.$toast('获取余额信息失败');
        })
      },

    },
    computed: {

    },
    created() {
      const vm = this
      if(!localStorage.getItem('userInfo')){
        vm.$router.push('/login')
      }else{
        vm.userData =  JSON.parse(localStorage.getItem('userInfo'))
//        console.log(vm.userData)
//        vm.userToken =  vm.userData.token
        vm.obMoney()
      }
    },
  }
</script>

<style>
</style>
