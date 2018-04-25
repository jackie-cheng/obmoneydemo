<template>
  <div class="mr-root">
    <!--顶部-->
    <van-nav-bar title="消息公告" left-arrow @click-left="onClickLeft"/>
    <!--tab标签-->
    <van-tabs v-model="tabActive" swipeable>
      <van-tab title="消息">
        22
      </van-tab>
      <van-tab title="公告">
        33
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: 'notice_home',
    data() {
      return {
        tabActive: 1,
      }
    },
    methods: {
      //点击顶部返回按钮触发的事件
      onClickLeft() {
      },
    },
    computed: {},
    created() {
      const vm = this
    },
  }
</script>

<style>
</style>
