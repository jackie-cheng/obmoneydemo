<template>
  <div class="mr-root">
    <!--header-->
    <van-nav-bar title="充值/提现记录" left-arrow @click-left="onClickLeft()"/>
    <!--消费记录-->
    <table class="ob_pay_record_table">
      <tr>
        <th width="30%">时间</th>
        <th width="20%">类型</th>
        <th width="30%">金额</th>
        <th width="20%">状态</th>
      </tr>
      <tr v-for="n in 4">
        <td width="30%">2018-4-40</td>
        <td width="20%">充值</td>
        <!--如果为充值，则颜色添加红色，添加样式pay_money-->
        <td width="30%" class="pay_money">+1000.00</td>
        <td width="20%">成功</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'wallet_record',
    data() {
      return {}
    },
    methods: {
      onClickLeft(){
        this.$router.go(-1)
      }
    },
    computed: {},
    created() {
      const vm = this
    },
  }
</script>

<style>
</style>
