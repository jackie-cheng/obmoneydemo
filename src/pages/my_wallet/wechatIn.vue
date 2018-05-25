<template>
    <div class="mr-root wechat_in">

        <!--header-->
        <van-nav-bar title="微信充值" left-arrow @click-left="onClickLeft()"/>
        <!--页面内容-->
      <img src="../../assets/wechatIn.png" alt="">
      <van-cell-group>
        <van-field
          center

          label="收款账户"
          placeholder="6666666666666"
          disabled="true"
        >
          <van-button slot="button" size="small" type="default" @click="copyText">复制</van-button>
        </van-field>
        <van-field
          center

          label="收款姓名"
          placeholder="帝魂国际"
          disabled="true"
        >
          <van-button slot="button" size="small" type="default" @click="copyText">复制</van-button>
        </van-field>
      </van-cell-group>

      <van-cell-group class="shuru_money">
        <van-field v-model="shouAccount" type="number" placeholder="输入金额" maxlength="4" />
      </van-cell-group>
      <van-button type="danger" style="width: 70%;margin: 0.8rem 1.5rem">提交</van-button>
    </div>
</template>
<script>
    export default{
        name: 'wechatIn',
        data () {
            return {shouAccount:null}
        },
      methods: {
        copyText(){
            const vm = this
          vm.$toast('复制成功');
//          input.value = text; // 修改文本框的内容
//          input.select(); // 选中文本
//          document.execCommand("copy"); // 执行浏览器复制命令
//          alert("复制成功");
        },
        onClickLeft(){
          this.$router.go(-1)
        }
      },
        created () {
            const vm = this
        },
        components: {},
    }
</script>
<style>
</style>
