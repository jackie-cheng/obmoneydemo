<template>
    <div>
      我是客服页面
      <tabbar :activeNum="3"></tabbar>
    </div>
</template>

<script>
  import tabbar from '../components/tabbar'
    export default{
        name: 'CustomerService',
        data () {
            return {}
        },
        created () {
            const vm = this
        },
        components: {tabbar},
    }
</script>
<style>
</style>
