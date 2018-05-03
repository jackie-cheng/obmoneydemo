<template>
  <div class="mr-root">
    <!--<Header></Header>-->
    <van-nav-bar title="客服"/>
    <!--内容部分-->
    <section class="ob_cus_serCon">
      <ul>
        <li>
          <span class="serveice_icon"></span>
          <p>在线客服</p>
        </li>
        <li>
          <span class="qq_icon"></span>
          <p>QQ客服</p>
        </li>
      </ul>
    </section>
    <tabbar :activeNum="3"></tabbar>
  </div>
</template>

<script>
  import tabbar from '../components/tabbar'

  export default {
    name: 'CustomerService',
    data() {
      return {}
    },
    created() {
      const vm = this
    },
    components: {tabbar},
  }
</script>
<style>
</style>
