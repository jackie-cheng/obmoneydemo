<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
  import Vue from 'vue'
  // import 'lib-flexible'
  import 'hammer-touchemulator/touch-emulator'
  import './utils/lib-flexible.js'
  import Vant from 'vant';
  import tabbar from './components/tabbar'
  import 'vant/lib/vant-css/index.css';
  import './sass/_common.scss'
  Vue.use(Vant);
export default {
  name: 'App',
  components:{
    tabbar
  },
}
</script>

<style>

</style>
