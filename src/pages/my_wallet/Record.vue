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
        <th width="20%">余额</th>
      </tr>
      <!--<tr v-for="n in 4">-->
        <!--<td width="30%">2018-4-40</td>-->
        <!--<td width="20%">充值</td>-->
        <!--&lt;!&ndash;如果为充值，则颜色添加红色，添加样式pay_money&ndash;&gt;-->
        <!--<td width="30%" class="pay_money">+1000.00</td>-->
        <!--<td width="20%">成功</td>-->
      <!--</tr>-->
      <tr v-for="trade in list" v-if="list&&list.length>0">

        <td width="40%" >
          <span>{{trade.changeTime.slice(0,16)}} </span>
        </td>
        <td width="20%" > {{allType[trade.betType]}}  </td>
        <!--如果为充值，则颜色添加红色，添加样式pay_money-->
        <td width="20%" class="pay_money">{{trade.changeAmt}}</td>
        <td width="20%" class="pay_money">{{trade.resultBlnc}}</td>
      </tr>
    </table>
    <div  v-if="list&&list.length==0">
      <div style="position: absolute;top: 5rem">暂无记录</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wallet_record',
    data() {
      return {
        list:[],
        userData:null,
        page: 1,
        allType:{
          bet:'下注',
          cancelBet:'取消下注',
          recharge:'充值',
          bonus:'中奖',
         downchange:'提现',
          supplement:'补分',
          koufeng:'扣分',
          songfen:'送分',
          huishui:'回水',
//          betAll:'下注相关/下注取消下注奖金',
//          inOut:'充值提现'

        }
      }
    },
    methods: {
      onClickLeft(){
        this.$router.go(-1)
      },
      searchList(){
        const vm = this
        const toast1 = vm.$toast.loading({
          mask: true,
          duration: 5000,       // 持续展示 toast
          message: ''
        });
        let params={
          token: vm.userData.token,
          pageNo:vm.page,
          pageSize:20,
          startDate:null,
          endDate:null,
          type:'inOut',
        }
        let url = '/user/bet/getUserMoneyChangeList'
        vm.$axios.get(url,{params})
          .then(response => {
            toast1.clear();
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
                vm.list  = [... vm.list, ..._list]

                if (_list.length < 10 ) {
                  return;
                }

                vm.page++
              }


            } else {
              vm.$toast('获取充值信息失败');
            }
          }).catch(response => {
          vm.$toast('获取充值信息失败');
        })

      },
    },
    computed: {},
    created() {
      const vm = this
      if(localStorage.getItem('userInfo')){
        vm.userData = JSON.parse(localStorage.getItem('userInfo'))
      }
      vm.searchList()
    },
  }
</script>

<style>
</style>
