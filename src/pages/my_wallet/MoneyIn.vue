<template>
    <div class="mr-root money_in willy_moneyIn">

        <!--header-->
        <van-nav-bar title="充值中心" left-arrow @click-left="onClickLeft()"/>
        <!--页面内容-->


      <van-cell-group v-if="cardList&&!$_.isEmpty(cardList)">
        <van-cell :to="'/wechat_in/'+car.id" v-for = "(car,index) in cardList" :key = 'car.id'>
          <template slot="title">
            <img :src="'http://47.106.11.246/'+car.iconPhoto" alt="">
            <span class="van-cell-text">{{car.accountType}}</span>

          </template>
        </van-cell>
        <!--<van-cell to="/wechat_in">-->
          <!--<template slot="title">-->
            <!--<img src="../../assets/zhi.png" alt="">-->
            <!--<span class="van-cell-text">支付宝</span>-->

          <!--</template>-->
        <!--</van-cell>-->
        <!--<van-cell to="/wechat_in">-->
          <!--<template slot="title">-->
            <!--<img src="../../assets/cft.png" alt="">-->
            <!--<span class="van-cell-text">财付通</span>-->

          <!--</template>-->
        <!--</van-cell>-->
        <!--<van-cell to="/wechat_in">-->
          <!--<template slot="title">-->
            <!--<img src="../../assets/yhk.png" alt="">-->
            <!--<span class="van-cell-text">银行卡</span>-->

          <!--</template>-->
        <!--</van-cell>-->
      </van-cell-group>
      <tabbar :activeNum="1"></tabbar>
    </div>
</template>
<script>
  import tabbar from '../../components/tabbar'
    export default{
        name: 'monetIn',
        data () {
            return {
              cardList:null,
              userData:null
            }
        },
      methods: {
        onClickLeft(){
          this.$router.go(-1)
        },
        obList(){
          const vm = this

          vm.$axios.get('/user/GeamUserRank/findList')
            .then(response => {
console.log(response.headers)
              if (response.status == 200&&response.data) {
                  console.log(response)
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
                  vm.cardList = response.data
                }

              } else {
                vm.$toast('获取充值列表失败');
              }
            }).catch(response => {
            vm.$toast('获取充值列表失败');
          })
        },


      },
        created () {
            const vm = this
          if(!localStorage.getItem('userInfo')){
            vm.$router.push('/login')
          }else{
            vm.userData =  JSON.parse(localStorage.getItem('userInfo'))
            vm.obList()
          }

        },
      components: {
        tabbar
      },
    }
</script>
<style>
</style>
