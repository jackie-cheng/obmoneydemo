<template>
  <div class="mr-root">
    <!--header-->
    <van-nav-bar title="提现" left-arrow @click-left="onClickLeft"/>


  </div>

</template>

<script>
  export default {
    name: 'my_wallet',
    data() {
      return {
        userToken:null,

      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      obMoney(){
        const vm = this
        let url = '/f/geamUserAccountDown/getUserAccount?id=' + vm.userToken
        vm.$axios.get(url)
          .then(response => {

            if (response.status == 200&&response.data) {

              console.log(response.data)
              vm.moneyData = response.data
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
      if(!sessionStorage.getItem('userInfo')){
        vm.$router.push('/login')
      }else{
        vm.userData =  JSON.parse(sessionStorage.getItem('userInfo'))
        vm.userToken =  vm.userData.no
      }
    },
  }
</script>

<style>
</style>
