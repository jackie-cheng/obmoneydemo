<template>
  <div class="mr-root">
    <van-nav-bar
      title="回水规则"
      @click-left="onClickLeft"
      left-arrow
    />
    <div style="margin: 1rem 0.5rem">
      <h2 style="font-size: 0.45rem;color: black">回水说明:</h2>
      <p style="text-indent: 1rem;margin-top: 0.2rem;color: #666;font-size: 0.4rem">
       北京28回水为负盈利回水 ；
      </p>
      <p style="text-indent: 1rem;margin-top: 0.2rem;color: #666;font-size: 0.4rem">
       系统自动计算回水数量，自动进行回水；
      </p>
      <p style="text-indent: 1rem;margin-top: 0.2rem;color: #666;font-size: 0.4rem">
       系统默认会查询近一周的数据进行呈现。
      </p>
    </div>
  </div>
</template>
<script>
    export default{
        name: 'backWaterRule',
        data () {
            return {}
        },
      methods: {
        onClickLeft(){
          this.$router.go(-1)
        },
      },
        created () {
            const vm = this
        },
        components: {},
    }
</script>
<style>
</style>
