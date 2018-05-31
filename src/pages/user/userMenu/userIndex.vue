<template>
  <div class="mr-root user_index_class">
<div class="user_header" v-if="userData&&!$_.isEmpty(userData)">
  <div class="top_head">
    <span><van-icon name="setting" /></span>  <span><van-icon name="chat" /></span>
    <div style="clear: both"></div>
  </div>
  <div class="touxiang_header" @click="myInfo">
    <img src="../../../assets/qq.png" alt="">  <div><p>{{userData.username}}</p><p>{{userData.phone}}</p></div>
  </div>
</div>

<div class="gongneng_list">
  <van-cell-group>
    <van-cell title="我的钱包" icon="pending-payment" is-link to="/wallet_record" />
    <van-cell title="交易记录" icon="exchange-record" is-link to="/wallet_record" />
    <van-cell title="统计记录" icon="edit-data" is-link to="/wallet_record" />
    <van-cell title="我的回水" icon="pending-deliver" is-link to="/wallet_record" />

  </van-cell-group>
  <van-cell-group>
    <van-cell title="积分记录" icon="exchange" is-link to="/wallet_record" />
    <van-cell title="联系客服" icon="phone" is-link to="/wallet_record" />
    <van-cell title="我的推广" icon="new" is-link to="/wallet_record" />
  </van-cell-group>
</div>
    <!--<router-link to="/login">还没登录，去登录</router-link>-->
    <!--<van-cell-group>-->
      <!--<van-cell title="个人头像">-->
        <!--<van-icon slot="right-icon" name="search" class="van-cell__right-icon" />-->
      <!--</van-cell>-->
      <!--<van-cell title="推广id" value="132456" />-->
      <!--<van-cell title="手机号" :value="userData.phone"/>-->
      <!--<van-cell title="用户昵称" is-link :value="userData.username"/>-->
      <!--<van-cell title="QQ号" is-link value="771810659" />-->

    <!--</van-cell-group>-->
    <!--<p>还没登录，去登录</p>-->
    <tabbar :activeNum="4"></tabbar>
  </div>
</template>

<script>
  import tabbar from '../../../components/tabbar'
  export default {
    name: 'userIndex',
    data(){
      return {
        repassword:null,
        password:null,
        username:null,
        phone:null,
        userData:null,
      }
    },

    components:{
      tabbar
    },
    created(){
      const vm = this
      if(!sessionStorage.getItem('userInfo')){
        vm.$router.push('/login')
      }
      vm.userData =  JSON.parse(sessionStorage.getItem('userInfo'))
    },
    methods:{
      myInfo(){
          const vm = this
        vm.$router.push('/myInfo')
      }
    }
  }
</script>

