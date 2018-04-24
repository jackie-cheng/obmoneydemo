<template>
    <div class="mr-root">
      <Header></Header>
      <tabbar :activeNum="0"></tabbar>
    </div>
</template>

<script>
  import tabbar from '../components/tabbar'
  import Header from '../components/Header'
  export default {
    name: 'home',
      data(){
        return {

        }
      },

      components:{
       Header,tabbar
      },
      created(){

      },
      methods:{

      }
  }
</script>

<style>
  .is-active{
    color:#ff6900!important
  }
</style>
