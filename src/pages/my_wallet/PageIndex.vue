<template>
  <div class="mr-root">
    <!--header-->
    <van-nav-bar title="我的钱包" left-arrow @click-left="onClickLeft"/>
    <section class="ob_myWallet_container">
      <van-nav-bar title="充值/提现记录"/>
      <div class="ob_myWallet_content">
        <i class="iconfont wallet_icon"></i>
        <div class="ob_myWallet_num">
          <em>账户资金</em>
          <p class="money_num">188.00</p>
        </div>
        <div class="ob_myWallet_btns">
          <van-button size="large" type="danger">充值</van-button>
          <van-button size="large">提现</van-button>
        </div>
      </div>

    </section>

  </div>

</template>

<script>
  export default {
    name: 'my_wallet',
    data() {
      return {}
    },
    methods: {},
    computed: {
      onClickLeft() {

      }
    },
    created() {
      const vm = this
    },
  }
</script>

<style>
</style>
