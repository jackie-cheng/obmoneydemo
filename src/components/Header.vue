<template>
  <div id="app">
    <van-nav-bar
      title="首页"
      left-text="返回"
      right-text="登录"
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
        this.$toast('提示文案')
      },
      onClickRight() {
          const vm = this
        vm.$router.push('/login')
      }
    }

  }

</script>

<style>


</style>
