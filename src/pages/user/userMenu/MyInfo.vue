<template>
  <div class="mr-root">
    <van-nav-bar
      title="个人信息"
      @click-left="onClickLeft"
      left-arrow
    />

    <!--<router-link to="/login">还没登录，去登录</router-link>-->
    <!--<van-cell-group v-if="userData&&!$_.isEmpty(userData)">-->
      <!--<van-cell title="个人头像">-->
        <!--<van-icon slot="right-icon" name="search" class="van-cell__right-icon" />-->
      <!--</van-cell>-->
      <!--<van-cell title="推广id" value="132456" />-->
      <!--<van-cell title="手机号" :value="userData.phone"/>-->
      <!--<van-cell title="用户昵称" is-link :value="userData.username"/>-->
      <!--<van-cell title="QQ号" is-link value="771810659" />-->

    <!--</van-cell-group>-->
    <van-cell-group v-if="userData&&!$_.isEmpty(userData)">
      <div class="myInfo_touxiang">
<span>个人头像</span> <img src="../../../assets/qq.png" alt="">
      </div>
      <van-cell title="推广id" value="132456" />
      <van-cell title="手机号" :value="userData.phone"/>
      <van-cell title="用户昵称" is-link :value="userData.username"/>
      <van-cell title="QQ号" is-link :value="userData.qq" />

    </van-cell-group>
<!--<p>还没登录，去登录</p>-->
    <van-button type="danger" @click="onClickLeft()" style="width: 70%;margin: 3rem 1.5rem">完成</van-button>
  </div>
</template>

<script>
  import tabbar from '../../../components/tabbar'
  export default {
    name: 'home',
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
      vm.userData =  JSON.parse(localStorage.getItem('userInfo'))
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1)
      }
    }
  }
</script>

