<template>
  <div class="mr-root">
    <!--顶部-->
    <van-nav-bar title="消息公告" left-arrow @click-left="onClickLeft"/>
    <!--tab标签-->
    <van-tabs v-model="tabActive" swipeable>
      <van-tab title="消息">
        <msg-list></msg-list>
      </van-tab>
      <van-tab title="公告">
        <msg-list></msg-list>
      </van-tab>

    </van-tabs>
    <!--<van-tabs v-model="active" swipeable @click="changeTab1()">-->
    <!--<van-tab v-for="index in 4" :title="'选项 ' + index" :key="index">-->
    <!--内容 {{ index }}-->
    <!--</van-tab>-->
    <!--</van-tabs>-->
    <!--<transition name="tab-fade" v-for="(tab,index) in tabs" :key="tab.id">-->
    <!--<component :is="msgList" v-show="tabActive==index" ref="tabCompos"></component>-->
    <!--</transition>-->
  </div>
</template>

<script>
  import msgList from './MessageList'
  import alertList from './alert/List'

  export default {
    name: 'notice_home',
    data() {
      return {
        active: 0,
        tabActive: 0,
        tabs: [
          {
            name: '消息',
            id: 0,
          },
          {
            name: '公告',
            id: 1,
          },
        ],
        msgList: alertList
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
    components: {
      msgList
    },
  }
</script>

<style>
</style>
