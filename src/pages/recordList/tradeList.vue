<template>
  <div class="mr-root">
    <!--header-->
    <van-nav-bar title="交易记录" left-arrow @click-left="onClickLeft()"/>
    <van-tabs v-model="activeIndex">
      <van-tab v-for="(menu,index) in menuList"   :key="index" :title="menu">

        <!--交易记录-->
        <div>
          <!--时间查询-->
          <div class="search_date" >
            <span style="position: relative">
                <yd-datetime   v-model="datetimeStar" :start-date="starSevenTime"   type="date"></yd-datetime>
            </span>

            <span style="margin: 0 0.2rem">至</span>
            <yd-datetime   v-model="datetimeEnd" type="date" :start-date="datetimeStar"></yd-datetime>
            <span class="search_but" @click="searchList(),page=1">查询</span>
          </div>
          <table class="ob_pay_record_table" >
            <tr>
              <th width="40%">时间</th>
              <th width="20%">类型</th>
              <th width="20%">金额</th>
              <th width="20%">余额</th>
            </tr>
          </table>
          <yd-infinitescroll :callback="searchList" ref="infinitescrollDemo" v-if="list&&list.length>0">
<div slot="list" class="traVan_list">
  <div v-for="trade in list"  class="tra_list">
    <span style="width: 40%">{{trade.changeTime.slice(0,16)}}</span>
    <span style="width: 20%">{{allType[trade.betType]}}</span>
    <!--如果为充值，则颜色添加红色，添加样式pay_money-->
    <!--<td width="20%" :class="{pay_money:trade.change.indexOf('-')!=-1}">{{trade.change}}</td>-->
    <span style="width: 15%">{{trade.change}}</span>
    <span style="width: 20%" class="pay_money">{{trade.resultBlnc}}</span>
  </div>
</div>


            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>

          </yd-infinitescroll>
        </div>
        <div  v-if="list&&list.length==0">
          <div style="position: absolute;top: 5rem">暂无记录</div>
        </div>
      </van-tab>
    </van-tabs>




  </div>
</template>
<script>
    import Vue from 'vue';
    import {DateTime} from 'vue-ydui/dist/lib.px/datetime';
    import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll';


    Vue.component(InfiniteScroll.name, InfiniteScroll);
    Vue.component(DateTime.name,DateTime);
  export default{
    name: 'tradeList',
    data () {
      return {
        loading: false,
        finished: false,

        list:[],
        userData:null,
        page: 1,
        menuList:['全部','充值','提现','投注'],
        activeIndex:0,
        activeType:null,
        datetimeStar: '2018-05-11',
        starSevenTime:'2018-05-11',
        datetimeEnd: '2018-05-11',
        allType:{
          bet:'下注',
          cancelBet:'取消下注',
          bonus:'中奖',
          recharge:'充值',
          withdraw:'提现',
        }
      }
    },
    computed:{

    },
    methods: {

      onLoad() {
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          this.loading = false;

          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500);
      },
      searchList(){
        const vm = this
//        const toast1 = vm.$toast.loading({
//          mask: true,
//          duration: 5000,       // 持续展示 toast
//          message: ''
//        });
        let params={
          token: vm.userData.token,
          pageNo:vm.page,
          pageSize:10,
          startDate:vm.datetimeStar,
          endDate:vm.datetimeEnd,
          type:vm.activeType,
        }
        let url = '/user/bet/getUserMoneyChangeList'
        vm.$axios.get(url,{params})
          .then(response => {
//            toast1.clear();
            if (response.status == 200&&response.data) {
              if(response.data.statusCode==-100){
                vm.$dialog.confirm({
                  message: response.data.resultInfo
                }).then(() => {
                  localStorage.removeItem('userInfo')
                  vm.$router.push('/login')
                }).catch(() => {
                  localStorage.removeItem('userInfo')
                  vm.$router.push('/')
                });
              }else{
                let _list = response.data.resultInfo
console.log("ff",_list)
                vm.list  = [... vm.list, ..._list]

                if (_list.length < 10 ) {
//                    console.log("10SSS")
                  /* 所有数据加载完毕 */
//                  this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                 return;
             }

                /* 单次请求数据完毕 */
//              this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');

//                this.page++;
//                  let newList =response.data.resultInfo
//                vm.list =(vm.list||[]).concat(newList)
//
//                vm.loading = false;
//                if ( newList.length <10) {
//                  vm.finished = true;
//                }
                vm.page++
              }


            } else {
              vm.$toast('获取余额信息失败');
            }
          }).catch(response => {
          vm.$toast('获取余额信息失败');
        })

      },

      onClickLeft(){
        this.$router.go(-1)
      },

    },
    mounted(){
      const vm = this
      vm.$watch('activeIndex',()=>{
       if(vm.activeIndex==0){
vm.activeType=null
         vm.list=[]
         vm.page=1
         vm.searchList()
       }else if(vm.activeIndex==1){
           //充值
         vm.activeType='recharge'
         vm.list=[]
         vm.page=1
         vm.searchList()
       }
       else if(vm.activeIndex==1){
           //提现
         vm.activeType='withdraw'
         vm.list=[]
         vm.page=1
         vm.searchList()
       }
       else if(vm.activeIndex==3){
         //投注
         vm.activeType='bet'
         vm.list=[]
         vm.page=1
         vm.searchList()
       }
      }, {deep: true})

    },
    created () {
      const vm = this
      var dd = new Date();
      vm.datetimeEnd=dd.toJSON().slice(0,10)
      let sevenTime= dd.getTime()-1000*60*60*24*7
      vm.datetimeStar = vm.datetimeEnd
      vm.starSevenTime=new Date(sevenTime).toJSON().slice(0,10)
      if(localStorage.getItem('userInfo')){
        vm.userData = JSON.parse(localStorage.getItem('userInfo'))
      }
      vm.searchList()
    },
    components: {},
  }
</script>
<style>
</style>
