<template>
    <div>
      我是优惠页面
      <tabbar :activeNum="2"></tabbar>
    </div>
</template>

<script>
  import tabbar from '../components/tabbar'
    export default{
        name: 'Discount',
        data () {
            return {}
        },
        created () {
            const vm = this
        },
      components:{
        tabbar
      },
    }
</script>
<style>
</style>
