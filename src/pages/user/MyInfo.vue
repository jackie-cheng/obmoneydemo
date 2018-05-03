<template>
  <div class="mr-root">
    <van-nav-bar
      title="我的"
      right-text="设置"


      @click-right="onClickRight"

    />

    <router-link to="/login">还没登录，去登录</router-link>
    <van-cell-group>
      <van-cell title="个人头像">
        <van-icon slot="right-icon" name="search" class="van-cell__right-icon" />
      </van-cell>
      <van-cell title="会员id" value="132456" />
      <van-cell title="手机号" value="15937442239"/>
      <van-cell title="用户昵称" is-link value="程晓龙"  />
      <van-cell title="QQ号" is-link value="771810659" />

    </van-cell-group>
<!--<p>还没登录，去登录</p>-->
    <tabbar :activeNum="4"></tabbar>
  </div>
</template>

<script>
  import tabbar from '../../components/tabbar'
  export default {
    name: 'home',
    data(){
      return {
        repassword:null,
        password:null,
        username:null,
        phone:null,
      }
    },

    components:{
     tabbar
    },
    created(){

    },
    methods:{
      onClickRight(){

      }
    }
  }
</script>

