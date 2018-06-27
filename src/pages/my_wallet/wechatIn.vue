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
        <van-field v-model="shouAccount" type="number" pattern="[0-9]*" placeholder="输入金额"  />
      </van-cell-group>
      <van-button type="danger"  @click="moneySubmit" v-if="!$_.isEmpty(shouAccount)&&!isNaN(shouAccount)">提交</van-button>
      <van-button type="danger"  style="opacity: 0.6" v-else>提交</van-button>
    </div>
</template>
<script>
    export default{
        name: 'wechatIn',
        data () {
            return {
              curRecharge:null,
                shouAccount:null,

              userData:null,
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
          let params={
            id:vm.$route.params.id,
          }
          let url = '/user/GeamUserRank/getfind'
          vm.$axios.get(url,{params})
            .then(response => {

              if (response.status == 200&&response.data) {
                if(response.data.statusCode){
                  vm.$dialog.confirm({
                    message: response.data.resultInfo
                  }).then(() => {
                    vm.$router.push('/login')
                  }).catch(() => {
                    vm.$router.push('/')
                  });
                }else{
                  vm.curRecharge = response.data
                }


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
          const toast1 = vm.$toast.loading({
            mask: true,
            duration: 10000,       // 持续展示 toast
            message: '提交中...'
          });
          let params={
            token: vm.userData.token,
            uuid:vm.userData.uuid,
            terminalType :vm.userData.terminalType,

            Geamid: vm.userData.uuid,
            payType:vm.curRecharge.accountType,
            applyMoneyAmount:vm.shouAccount,
          }
          let param = new URLSearchParams(); //创建form对象
          param.append('token', vm.userData.token);//通过append向form对象添加数据
          param.append('uuid', vm.userData.uuid);//添加form表单中其他数据
          param.append('terminalType',vm.userData.terminalType);
          param.append('Geamid', vm.userData.uuid);//通过append向form对象添加数据
          param.append('payType', vm.curRecharge.accountType);//添加form表单中其他数据
          param.append('applyMoneyAmount',vm.shouAccount);
          vm.$axios.post('/user/GeamUserRank/upSave',param)
            .then(response => {

              if (response.status == 200&&response.data) {
                if(response.data.statusCode){
                  vm.$dialog.confirm({
                    message: response.data.resultInfo
                  }).then(() => {
                    vm.$router.push('/login')
                  }).catch(() => {
                    vm.$router.push('/')
                  });
                }else{
                  vm.$toast(response.data.a);
                }

//                vm.cardList = response.data
              } else {
                vm.$toast('充值失败');
              }
//              toast1.clear();
            }).catch(response => {
            vm.$toast('充值失败');
//            toast1.clear();
          })
        }
      },
        created () {
            const vm = this
          if(!localStorage.getItem('userInfo')){
            vm.$router.push('/login')
          }else{
            vm.userData =  JSON.parse(localStorage.getItem('userInfo'))
            vm.obRecharge()
          }

        },
        components: {},
    }
</script>
<style>
</style>
