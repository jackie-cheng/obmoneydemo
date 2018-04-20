<template>
  <div id="app">
    <tabbar>22</tabbar>
    <router-view/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import 'lib-flexible'
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
