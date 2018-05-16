<template>
  <div id="app">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop">大厅</van-tabbar-item>
      <van-tabbar-item icon="chat">充值/提现</van-tabbar-item>
      <van-tabbar-item icon="records">优惠</van-tabbar-item>
      <van-tabbar-item icon="gold-coin">客服</van-tabbar-item>
      <van-tabbar-item icon="gold-coin">我的</van-tabbar-item>
    </van-tabbar>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
  export default {
    name: 'tabbar',
    data() {
      return {
        active:this.activeNum
      }
    },
    props:['activeNum'],
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
          vm.$router.push('/my_wallet')
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
