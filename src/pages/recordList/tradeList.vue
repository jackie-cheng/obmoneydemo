<template>
  <div class="mr-root">
    <!--header-->
    <van-nav-bar title="交易记录" left-arrow @click-left="onClickLeft()"/>
    <van-tabs v-model="activeIndex" swipeable>
      <van-tab v-for="(menu,index) in menuList" :key="index" :title="menu">

        <!--交易记录-->
        <div style="height: 80vh" v-if="activeIndex==0">
          <!--时间查询-->
          <div class="search_date">
            <yd-datetime   v-model="datetimeStar" type="date"></yd-datetime>
            <span style="margin: 0 0.2rem">至</span>
            <yd-datetime   v-model="datetimeEnd" type="date" :start-date="datetimeStar"></yd-datetime>
            <span class="search_but" @click="searchList">查询</span>
          </div>
          <table class="ob_pay_record_table" >
            <tr>
              <th width="30%">时间</th>
              <th width="20%">类型</th>
              <th width="30%">金额</th>
              <th width="20%">余额</th>
            </tr>
            <tr v-for="n in 6">
              <td width="30%">2018-4-40</td>
              <td width="20%">充值</td>
              <!--如果为充值，则颜色添加红色，添加样式pay_money-->
              <td width="30%" class="pay_money">+1000.00</td>
              <td width="20%">100.00</td>
            </tr>
          </table>
        </div>
        <div style="height: 80vh" v-else>
          <div style="margin:0.2rem 0.3rem;color: #666;">暂无记录</div>
        </div>
      </van-tab>
    </van-tabs>




  </div>
</template>
<script>
    import Vue from 'vue';
    import {DateTime} from 'vue-ydui/dist/lib.px/datetime';

    Vue.component(DateTime.name,DateTime);
  export default{
    name: 'tradeList',
    data () {
      return {
        menuList:['全部','充值','提现','投注'],
        activeIndex:0,
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
      },

    },
    created () {
      const vm = this
    },
    components: {},
  }
</script>
<style>
</style>
