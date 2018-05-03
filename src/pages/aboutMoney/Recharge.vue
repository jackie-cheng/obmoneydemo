<template>
    <div class="mr-root">
      <van-nav-bar
        title="我的钱包"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"

      />
<div class="recharge-content">
<ul>
  <li class="recharge-chong">
    <a>充值/提现记录</a>
  </li>
  <li>
    <img src="../../assets/logo.png" alt="">
  </li>
  <li>
    <a>账户资金</a>
  </li>
  <li>
    <a>188.00</a>
  </li>
  <li>
    <van-button type="danger">充值</van-button>
  </li>
  <li>
    <van-button type="danger">提现</van-button>
  </li>
</ul>
</div>

      <tabbar :activeNum="1"></tabbar>
    </div>
</template>

<script>
  import tabbar from '../../components/tabbar'
    export default{
        name: 'Recharge',
        data () {
            return {}
        },
      methods:{
        onClickLeft() {
          this.$router.go(-1)
        },

      },
      components:{
        tabbar
      },
        created () {
            const vm = this
        },
    }
</script>
<style>
</style>
