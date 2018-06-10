<template>
    <div class="mr-root wechat_in" v-if="curRecharge&&curRecharge!=null">

        <!--header-->
        <van-nav-bar :title="curRecharge.accountType+'充值'" left-arrow @click-left="onClickLeft()"/>
        <!--页面内容-->
      <img :src="'http://47.106.11.246:8080'+curRecharge.twoDimensionalCode" alt="">
      <van-cell-group>
        <van-field
          center

          label="收款账户"
          :placeholder="curRecharge.account"
          disabled="true"
        >
          <van-button slot="button" size="small" type="default" @click="copyText">复制</van-button>
        </van-field>
        <van-field
          center

          label="收款姓名"
          :placeholder="curRecharge.realName"
          disabled="true"
        >
          <van-button slot="button" size="small" type="default" @click="copyText">复制</van-button>
        </van-field>
      </van-cell-group>

      <van-cell-group class="shuru_money">
        <van-field v-model="shouAccount" type="number" placeholder="输入金额" maxlength="4" />
      </van-cell-group>
      <van-button type="danger" style="width: 70%;margin: 0.8rem 1.5rem" @click="moneySubmit">提交</van-button>
    </div>
</template>
<script>
    export default{
        name: 'wechatIn',
        data () {
            return {
              curRecharge:null,
                shouAccount:null,
              userToken:null,
            }
        },
      methods: {
        copyText(){
            const vm = this
          vm.$toast('复制成功');
//          input.value = text; // 修改文本框的内容
//          input.select(); // 选中文本
//          document.execCommand("copy"); // 执行浏览器复制命令
//          alert("复制成功");
        },
        onClickLeft(){
          this.$router.go(-1)
        },
        obRecharge(){
            const vm = this
          let url = '/a/receivingbankaccount/receivingBankAccount/getfind?id=' + vm.$route.params.id
          vm.$axios.get(url)
            .then(response => {

              if (response.status == 200&&response.data) {

                console.log(response.data)
                vm.curRecharge = response.data
              } else {
                vm.$toast('获取充值信息失败');
              }
            }).catch(response => {
            vm.$toast('获取充值信息失败');
          })
        },
        moneySubmit(){
          const vm = this
          if(vm.$_.isEmpty(vm.shouAccount)){
            vm.$toast('请输入充值金额');
            return
          }
          let params={
              gameid: vm.userToken,
            payType:vm.curRecharge.accountType,
            applyMoneyAmount:vm.shouAccount,
          }
          vm.$axios.post('/f/GeamUserRank/upSave',params)
            .then(response => {

              if (response.status == 200&&response.data) {
console.log( response)
//                vm.cardList = response.data
              } else {
                vm.$toast('充值失败');
              }
            }).catch(response => {
            vm.$toast('充值失败');
          })
        }
      },
        created () {
            const vm = this

               vm.userData =  JSON.parse(sessionStorage.getItem('userInfo'))
     vm.userToken =  vm.userData.accessToken
          vm.obRecharge()
        },
        components: {},
    }
</script>
<style>
</style>
