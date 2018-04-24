<template>
    <div>
      <div> 我是充值页面</div>


      <tabbar :activeNum="1"></tabbar>
    </div>
</template>

<script>
  import tabbar from '../components/tabbar'
    export default{
        name: 'Recharge',
        data () {
            return {}
        },
      components:{
        tabbar
      },
        created () {
            const vm = this
        },
    }
</script>
<style>
</style>
