<template>
  <div class="mr-root">
    <Header></Header>
    <van-cell-group>
      <van-field
        v-model="username"
        label="用户名"
        required
        placeholder="输入数字、字母，2-20个字符"
        error
      />
      <van-field
        v-model="phone"
        label="手机号"
        required
        placeholder="请输入11位手机号"
        error-message="手机号格式错误"
      />
      <van-field
        v-model="username"
        label="姓名"
        icon="clear"
        placeholder="请输入中文名"
        required
        @click-icon="username = ''"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="密码长度为6-20个字符"
        required
      />

      <van-field
        v-model="password"
        type="repassword"
        label="密码确认"
        placeholder="密码长度为6-20个字符"
        required
      />
    </van-cell-group>
    <van-button type="primary"  size="large">马上注册</van-button>
    <router-link  tag="van-button" to="/login"  type="primary"  size="large">
      立即登录
    </router-link>
    <!--<van-button type="primary"  size="large" >立即登录</van-button>-->

  </div>
</template>

<script>

  import Header from '../components/Header'
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
      Header
    },
    created(){

    },
    methods:{

    }
  }
</script>

