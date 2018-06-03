<template>
  <div class="mr-root statis_cla" style=" background-color: white">
    <!--header-->
    <van-nav-bar title="统计记录" left-arrow @click-left="onClickLeft()"/>
    <!--时间查询-->
    <div class="search_date" >
      <yd-datetime   v-model="datetimeStar" type="date" style=" background-color: #efeff4;"></yd-datetime>
      <span style="margin: 0 0.2rem">至</span>
      <yd-datetime   v-model="datetimeEnd" type="date" :start-date="datetimeStar" style=" background-color: #efeff4;"></yd-datetime>
      <span class="search_but" @click="searchList">查询</span>
    </div>
<!--总数-->
<div class="tab_statis">
  <van-tabbar  class="tab_statistic">
    <van-tabbar-item icon="shop">
      <span>666</span>
      <template slot="icon" slot-scope="props">
       总单数
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="chat"><span>8888.54</span>
      <template slot="icon" slot-scope="props">
        总下注
      </template></van-tabbar-item>
    <van-tabbar-item icon="records"><span>-88962.22</span>
      <template slot="icon" slot-scope="props">
        总盈亏
      </template></van-tabbar-item>
  </van-tabbar>

</div>
    <van-tabs v-model="activeIndex" swipeable>
      <van-tab v-for="index in 4" :key="index" :title="'北京' + index">

        <!--交易记录-->
        <div style="height: 80vh" v-if="activeIndex==0">

          <table class="ob_pay_record_table" >
            <tr>
              <th width="30%">期数</th>
              <th width="20%">投注</th>
              <th width="30%">金额</th>
              <th width="20%">中奖</th>
            </tr>
            <tr v-for="n in 10">
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
    name: 'statisticList',
    data () {
      return {
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
