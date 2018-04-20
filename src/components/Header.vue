<template>
  <div id="app">
    <van-nav-bar
      title="首页"
      left-text="返回"
      right-text="我的22"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        active: 0
      }
    },
    methods: {
      onClickLeft() {
        Toast('返回');
      },
      onClickRight() {
        Toast('按钮');
      }
    }

  }

</script>

<style>


</style>
