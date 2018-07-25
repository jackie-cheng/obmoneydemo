<template>
  <div class="mr-root willy_tradeList">
    <!--header-->
    <van-nav-bar title="我的回水" right-text="回水规则"  @click-right="onClickRight" left-arrow @click-left="onClickLeft()"/>
    <van-tabs v-model="activeIndex" swipeable>
      <van-tab v-for="index in 4" :key="index" :title="'北京' + index">
        <div style="height: 80vh" v-if="activeIndex==0">
          <table class="ob_pay_record_table" >
            <tr>
              <th width="30%">日期</th>
              <th width="20%">亏损金额</th>
              <th width="30%">组合比例</th>
              <th width="20%">回水金额</th>
            </tr>
            <tr v-for="n in 5">
              <td width="30%">2018-4-40</td>
              <td width="20%">-1000.00</td>
              <!--如果为充值，则颜色添加红色，添加样式pay_money-->
              <td width="30%" class="pay_money">1.10%</td>
              <td width="20%">1000.00</td>
            </tr>
          </table>
        </div>
        <div style="height: 80vh" v-else>
        <div class="willy_zwjl" style="margin:0.2rem 0.3rem;color: #666;">暂无记录</div>
        </div>
      </van-tab>
    </van-tabs>
    <!--时间查询-->
    <!--<div class="search_date">-->
      <!--<yd-datetime   v-model="datetimeStar" type="date"></yd-datetime>-->
      <!--<span style="margin: 0 0.2rem">至</span>-->
      <!--<yd-datetime   v-model="datetimeEnd" type="date" :start-date="datetimeStar"></yd-datetime>-->
      <!--<span class="search_but" @click="searchList">查询</span>-->
    <!--</div>-->
    <!--消费记录-->

  </div>
</template>
<script>
//  import Vue from 'vue';
//  import {DateTime} from 'vue-ydui/dist/lib.px/datetime';
//
//  Vue.component(DateTime.name,DateTime);
  export default{
    name: 'backWater',
    data () {
      return {
        activeIndex:0,
//        datetimeStar: '2018-05-11',
//        datetimeEnd:'2017-05-11',
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
      },
      onClickRight(){
          const vm = this
        vm.$router.push('/backWater_rule')
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
