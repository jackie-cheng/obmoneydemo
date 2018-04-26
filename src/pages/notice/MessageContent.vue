<template>
    <div class="mr-root">
      <van-nav-bar title="重要通知" left-arrow @click-left="onClickLeft"/>
      <div class="ob_notice_detail_box">
        <span>尊敬的会员朋友：</span>
        <p class="ob_notice_detail">
          这里是吧内容啊啊啊啊啊 少时诵诗书受伤使受伤少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所
        </p>
        <div class="ob_notice_detail_note">
          <p>帝魂国际</p>
          <p>shijian</p>

        </div>

      </div>
    </div>
</template>

<script>
    export default {
        name: 'msg_content',
        data() {
            return {}
        },
        methods: {
          onClickLeft(){

          }
        },
        computed: {},
        created() {
            const vm = this
        },
    }
</script>

<style>
</style>
