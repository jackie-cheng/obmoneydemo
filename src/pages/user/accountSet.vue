<template>
  <div class="mr-root">
    <van-nav-bar
      title="提现账户设置"
      left-arrow
      @click-left="onClickLeft"

    />
    <div class="accountSet_class">
      <van-cell-group v-if="bankData&&bankData.length>0">
      <van-cell :title="bank.accountType=='银行卡'?bank.bankname:bank.accountType" :label="bank.accountDetail" v-for="(bank,index) in bankData" :key="index">
      <!--<template slot="icon">-->
        <!--<img src="../../assets/qq.png" alt="">-->
      <!--</template>-->
        <!--<div class="sd_home_room_set" slot="icon"></div>-->
      </van-cell>
      <van-cell title="添加账户" icon="add-o" to="/addBank" />
      </van-cell-group>
    </div>



  </div>
</template>

<script>


  export default {

    name: 'accountSet',
    data(){
      return {
        bankData:[],
        userData:null,

      }
    },
    computed:{

    },
    components:{

    },
    created(){
      const vm = this
      if(!localStorage.getItem('userInfo')){
        vm.$router.push('/login')
      }else{
        vm.userData =  JSON.parse(localStorage.getItem('userInfo'))
        vm.obOutData()
      }
    },
    methods:{
      onClickLeft() {
        this.$router.go(-1)
      },


      obOutData(){
        const vm = this
        let params={

          token: vm.userData.token,

        }
        let url = '/user/geamUserAccountDown/getUserBank'
        vm.$axios.get(url,{params})
          .then(response => {

            if (response.status == 200&&response.data) {
              if(response.data.statusCode==-100){
                vm.$dialog.confirm({
                  message: response.data.resultInfo,
                  className: 'willy_pup'
                }).then(() => {
                  localStorage.removeItem('userInfo')
                  vm.$router.push('/login')
                }).catch(() => {
                  localStorage.removeItem('userInfo')
                  vm.$router.push('/')
                });
              }else{
                vm.bankData = response.data.a
                if(vm.bankData.length==0){
                  vm.$dialog.confirm({
                    message: '暂无提现账户，立即添加',
                    className: 'willy_pup'
                  }).then(() => {
                    vm.$router.push('/addBank')
                  }).catch(() => {
                    vm.$router.go(-1)
                  });
                }
              }

            } else {
              vm.$toast('获取银行列表失败');
            }
          }).catch(response => {
          vm.$toast('获取银行列表失败');
        })
      },


    }
  }
</script>

<style>

</style>
