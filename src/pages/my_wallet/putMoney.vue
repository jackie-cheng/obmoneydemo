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
        let url = '/user/geamUserAccountDown/getUserAccount?id=' + vm.userToken
        vm.$axios.get(url)
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
                vm.moneyData = response.data
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
        vm.userToken =  vm.userData.no
      }
    },
  }
</script>

<style>
</style>
