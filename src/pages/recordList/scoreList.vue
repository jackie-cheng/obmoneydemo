<template>
  <div class="mr-root willy_tradeList">
    <!--header-->
    <van-nav-bar title="积分记录" left-arrow @click-left="onClickLeft()"/>
<!--时间查询-->
    <div class="search_date">
      <yd-datetime   v-model="datetimeStar" type="date"></yd-datetime>
        <span style="margin: 0 0.2rem">至</span>
      <yd-datetime   v-model="datetimeEnd" type="date" :start-date="datetimeStar"></yd-datetime>
      <span class="search_but" @click="searchList">查询</span>
    </div>
    <!--消费记录-->
    <table class="ob_pay_record_table">
      <tr>
        <th width="30%">时间</th>
        <th width="20%">类型</th>
        <th width="30%">额度</th>
        <th width="20%">现有</th>
      </tr>
      <tr v-for="n in 4">
        <td width="30%">2018-4-40</td>
        <td width="20%">充值</td>
        <!--如果为充值，则颜色添加红色，添加样式pay_money-->
        <td width="30%" class="pay_money">1000.00</td>
        <td width="20%">1000.00</td>
      </tr>
    </table>
  </div>
</template>
<script>
  import Vue from 'vue';
//  import {ActionSheet} from 'vue-ydui/dist/lib.rem/actionsheet';
  import {DateTime} from 'vue-ydui/dist/lib.px/datetime';

  Vue.component(DateTime.name,DateTime);
    export default{
        name: 'scoreList',
        data () {
            return {
              datetimeStar: '2018-05-11',
              datetimeEnd:'2017-05-11',
            }
        },
      methods: {
        searchList(){
          const vm = this
          const toast1 = vm.$toast.loading({
            mask: true,
            duration: 3000,       // 持续展示 toast
            message: '加载中...'
          });
//          vm.$toast('搜索成功');
        },
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
