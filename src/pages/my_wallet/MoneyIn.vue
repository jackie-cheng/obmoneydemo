<template>
    <div class="mr-root money_in">

        <!--header-->
        <van-nav-bar title="充值" left-arrow @click-left="onClickLeft()"/>
        <!--页面内容-->


      <van-cell-group v-if="cardList&&!$_.isEmpty(cardList)">
        <van-cell :to="'/wechat_in/'+car.id" v-for = "(car,index) in cardList" :key = 'car.id'>
          <template slot="title">
            <img :src="'http://47.106.11.246:8080'+car.iconPhoto" alt="">
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
    </div>
</template>
<script>
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

              if (response.status == 200&&response.data) {

                vm.cardList = response.data
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
          if(!sessionStorage.getItem('userInfo')){
            vm.$router.push('/login')
          }else{
            vm.userData =  JSON.parse(sessionStorage.getItem('userInfo'))
            vm.obList()
          }

        },
        components: {},
    }
</script>
<style>
</style>
