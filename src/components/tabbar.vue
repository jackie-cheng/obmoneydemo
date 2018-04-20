<template>
  <div id="app">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop">大厅</van-tabbar-item>
      <van-tabbar-item icon="chat" dot>充值/提现</van-tabbar-item>
      <van-tabbar-item icon="records" info="5">优惠</van-tabbar-item>
      <van-tabbar-item icon="gold-coin" info="20">客服</van-tabbar-item>
      <van-tabbar-item icon="gold-coin" info="20">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: 'tabbar',
    data() {
      return {
        active: 0
      }
    },
    methods:{

    },
    created(){

    },
    mounted() {
      const vm = this
      vm.$watch('active',()=>{
        if(vm.active==0){
          vm.$router.push('/')
        }else if(vm.active==1){
          vm.$router.push('/recharge')
        }
        else if(vm.active==2){
          vm.$router.push('/discount')
        }
        else if(vm.active==3){
          vm.$router.push('/customerSerVice')
        }
        else if(vm.active==4){
          vm.$router.push('/user')
        }
      })
    },
  }

</script>

<style>


</style>
