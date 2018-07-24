<template>
  <div class="mr-root statis_cla willy_tradeList" style=" background-color: white">
    <!--header-->
    <van-nav-bar title="统计记录" left-arrow @click-left="onClickLeft()"/>
    <!--时间查询-->
    <div class="search_date" >
      <yd-datetime   v-model="datetimeStar" :start-date="starSevenTime"   type="date" style=" background-color: #efeff4;"></yd-datetime>
      <span style="margin: 0 0.2rem">至</span>
      <yd-datetime   v-model="datetimeEnd" type="date" :start-date="datetimeStar" style=" background-color: #efeff4;"></yd-datetime>
      <span class="search_but" @click="tradeData=[],page=1,searchList()">查询</span>
    </div>
<!--总数-->
<div class="tab_statis" v-if="statisticData&&statisticData!=null">
  <van-tabbar  class="tab_statistic">
    <van-tabbar-item icon="shop">
      <span>{{statisticData.betCount}}</span>
      <template slot="icon" slot-scope="props">
       总单数
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="chat"><span v-if="statisticData.totleAmt">{{statisticData.totleAmt}}</span> <span v-else="">0</span>
      <template slot="icon" slot-scope="props">
        总下注
      </template></van-tabbar-item>
    <van-tabbar-item icon="records"><span v-if="statisticData.totleAmt&&statisticData.bonusAmt">{{statisticData.bonusAmt -statisticData.totleAmt}}</span> <span v-else="">0</span>
      <template slot="icon" slot-scope="props">
        总盈亏
      </template></van-tabbar-item>
  </van-tabbar>

</div>
    <van-tabs v-model="activeIndex" :swipe-threshold="4">
      <van-tab v-for="(room,index) in roomList" :key="index" :title="room.name" v-if="roomList&&roomList.length>0">

        <!--交易记录-->
        <div>

          <table class="ob_pay_record_table" >
            <tr>
              <th width="30%">期数</th>
              <th width="20%">投注</th>
              <th width="30%">金额</th>
              <th width="20%">中奖</th>
            </tr>
            <tr v-for="trade in tradeData" v-if="tradeData&&tradeData.length>0">

              <td width="30%" >
                <span>{{trade.issueApi}} </span>
                </td>
              <td width="20%" v-if="(trade.betStr).indexOf('tema')==-1" > {{ballType[trade.betStr]}}   </td>
              <td width="20%" v-if="(trade.betStr).indexOf('tema')!=-1">特码 - {{trade.betStr.substr(4,trade.betStr.length)}}</td>
              <!--<td width="20%">{{trade.issueApi}}</td>-->
              <!--如果为充值，则颜色添加红色，添加样式pay_money-->
              <td width="30%" class="pay_money">{{trade.totleAmt}}</td>
              <td width="20%" class="statis_che"> <i v-if="trade.delFlag==1">撤单</i> <span v-if="trade.delFlag!=1">{{trade.bonus}}</span> </td>
            </tr>
          </table>
        </div>
      </van-tab>
    </van-tabs>

    <div  v-if="tradeData&&tradeData.length==0&&!thisNullData" style=" background-color: #efeff4;padding: 0.2rem 0.2rem">
      <div>暂无记录</div>
    </div>


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
        loading: false,
        finished: false,
        thisNullData:false,
        roomList:[
          {
            name:"全部",
            roomnumber:null
          }
        ],
        statisticData:null,
        tradeData:null,
        userData:null,
        page: 1,
        activeIndex:0,
        activeRoomNumber:null,
        datetimeStar: '2018-05-11',
        starSevenTime:'2018-05-11',
        datetimeEnd: '2018-05-11',
        ballType:{
          'da':'大',
          'dadan':'大单',
          'dan':'单',
          'xiaodan':'小单',
          'jida':'极大',
          'xiao':'小',
          'shuang':'双',
          'dashuang':'大双',
          'xiaoshuang':'小双',
          'jixiao':'极小',
          'hongbo':'红波',
          'lanbo':'蓝波',
          'lvbo':'绿波',
          'baozi':'豹子',
          'shunzi':'顺子',
          'duizi':'对子',
        },
      }

    },
    mounted(){
      const vm = this
      vm.$watch('activeIndex',()=>{
          vm.activeRoomNumber=vm.roomList[vm.activeIndex].roomnumber
        vm.page=1
        vm.tradeData=[]
        vm.searchList()
      }, {deep: true})

    },
    methods: {
      searchList(){
        const vm = this
        vm.thisNullData=true
        const toast1 = vm.$toast.loading({
          mask: true,
          duration: 5000,       // 持续展示 toast
          message: ''
        });
        let params={
          token: vm.userData.token,
          roomId: vm.activeRoomNumber,
          pageNo:vm.page,
          pageSize:20,
          startDate:vm.datetimeStar,
          endDate:vm.datetimeEnd,
        }
        let url = '/user/bet/userBetList'
        vm.$axios.get(url,{params})
          .then(response => {
            toast1.clear();
            vm.thisNullData=false
            if (response.status == 200&&response.data) {
              if(response.data.statusCode==-100){
                vm.$dialog.confirm({
                  message: response.data.resultInfo,
                  className: 'willy_pup'
                }).then(() => {
                  localStorage.removeItem('userInfo')
                  vm.$router.push('/login')
                }).catch(() => {
                  localStorage.removeItem('userInfo')
                  vm.$router.push('/')
                });
              }else{
                let newList =response.data.resultInfo
                vm.tradeData =(vm.tradeData||[]).concat(newList)
                vm.page++
                vm.loading = false;
                if ( newList.length == 0) {
                  vm.finished = true;
                }
              }


            } else {
              vm.$toast('获取信息失败');
            }
          }).catch(response => {
          vm.thisNullData=false
          vm.$toast('获取信息失败');
        })

      },
      searchAll(){
        const vm = this
        const toast1 = vm.$toast.loading({
          mask: true,
          duration: 5000,       // 持续展示 toast
          message: ''
        });
        let params={
          token: vm.userData.token,
          startDate:vm.datetimeStar,
          endDate:vm.datetimeEnd,
          roomNumber:null,
        }
        let url = '/user/bet/userBetSum'
        vm.$axios.get(url,{params})
          .then(response => {
            toast1.clear();
            if (response.status == 200&&response.data) {
              if(response.data.statusCode==-100){
                vm.$dialog.confirm({
                  message: response.data.resultInfo,
                  className: 'willy_pup'
                }).then(() => {
                  localStorage.removeItem('userInfo')
                  vm.$router.push('/login')
                }).catch(() => {
                  localStorage.removeItem('userInfo')
                  vm.$router.push('/')
                });
              }else{

                vm.statisticData =response.data.resultInfo

              }


            } else {
              vm.$toast('获取汇总信息失败');
            }
          }).catch(response => {
          vm.$toast('获取汇总信息失败');
        })

      },
      onClickLeft(){
        this.$router.go(-1)
      },

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
      //要先获取房间列表
      let params = {
        pageNo: 1,
        pageSize: 20,
      }
      vm.$axios.get(`/api/RoomController/queryRoomList`, {params})
        .then(response => {
          if (response.status == 200 && response.data) {
            vm.roomList =vm.roomList.concat(response.data.resultInfo)
            vm.activeRoomNumber=vm.roomList[0].roomnumber
            vm.searchList()
            vm.searchAll()
          } else {
            vm.$toast('获取房间列表失败');
          }
        }).catch(response => {
        toast1.clear();
      })

    },
    components: {},
  }
</script>
<style>
</style>
