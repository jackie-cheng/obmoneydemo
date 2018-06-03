<template>
  <div class="mr-root">
    <van-nav-bar
      title="签到有奖"
      right-text="签到规则"  @click-right="onClickRight"
      @click-left="onClickLeft"
      left-arrow
    />
  </div>
</template>
<script>
    export default{
        name: 'signEvery',
        data () {
            return {}
        },
        methods:{
          onClickLeft() {
            const vm = this
            vm.$router.go(-1)
          },
          onClickRight(){
            const vm = this
            vm.$router.push('/backWater_rule')
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
