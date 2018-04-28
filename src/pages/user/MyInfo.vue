<template>
  <div class="mr-root">
    <van-nav-bar
      title="我的"
      right-text="设置"


      @click-right="onClickRight"

    />

    <router-link to="/login">还没登录，去登录</router-link>
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

