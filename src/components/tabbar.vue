<template>
  <div>
    <div class="bott_tabbarcla">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="shop">大厅</van-tabbar-item>
        <van-tabbar-item icon="gold-coin">充值</van-tabbar-item>
        <van-tabbar-item icon="records">优惠</van-tabbar-item>
        <van-tabbar-item icon="chat">客服</van-tabbar-item>
        <van-tabbar-item icon="contact">我的</van-tabbar-item>
      </van-tabbar>
      <!--<router-view></router-view>-->
    </div>

  </div>
</template>

<script>
export default {
  name: 'tabbar',
  data() {
    return {
      active: this.activeNum
    }
  },
  props: ['activeNum'],
  methods: {},
  created() {
    // document.body.addEventListener('touchstart', function() {})
  },
  mounted() {
    const vm = this
    vm.$watch('active', () => {
      if (vm.active == 0) {
        vm.$router.push('/')
      } else if (vm.active == 1) {
        vm.$router.push('/wallet_in')
      } else if (vm.active == 2) {
        vm.$router.push('/discount')
      } else if (vm.active == 3) {
        vm.$router.push('/customerSerVice')
      } else if (vm.active == 4) {
        vm.$router.push('/user')
      }
    })
  }
}
</script>

<style>
</style>
