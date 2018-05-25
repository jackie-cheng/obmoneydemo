<template>
    <div class="mr-root money_in">

        <!--header-->
        <van-nav-bar title="充值" left-arrow @click-left="onClickLeft()"/>
        <!--页面内容-->


      <van-cell-group>
        <van-cell to="/wechat_in">
          <template slot="title">
            <img src="../../assets/wexin.png" alt="">
            <span class="van-cell-text">微信</span>

          </template>
        </van-cell>
        <van-cell to="/wechat_in">
          <template slot="title">
            <img src="../../assets/zhi.png" alt="">
            <span class="van-cell-text">支付宝</span>

          </template>
        </van-cell>
        <van-cell to="/wechat_in">
          <template slot="title">
            <img src="../../assets/cft.png" alt="">
            <span class="van-cell-text">财付通</span>

          </template>
        </van-cell>
        <van-cell to="/wechat_in">
          <template slot="title">
            <img src="../../assets/yhk.png" alt="">
            <span class="van-cell-text">银行卡</span>

          </template>
        </van-cell>
      </van-cell-group>
    </div>
</template>
<script>
    export default{
        name: 'monetIn',
        data () {
            return {}
        },
      methods: {
        onClickLeft(){
          this.$router.go(-1)
        }
      },
        created () {
            const vm = this
        },
        components: {},
    }
</script>
<style>
</style>
