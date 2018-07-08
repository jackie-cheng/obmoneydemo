<template>
    <div class="mr-root">
      <!--header-->
      <van-nav-bar title="余额提现" left-arrow @click-left="onClickLeft()"/>
      <!--页面内容-->
      <section class="money_out" v-if="bankData&&bankData.length>0&&!$_.isEmpty(curBank)">
        <van-cell-group>
          <van-cell :title="curBank.bankname" value="" :label="'尾号'+(curBank.accountDetail).substr((curBank.accountDetail).length-4)+'储蓄卡'" is-link @click="showBank=true" v-if="curBank.accountType=='银行卡'">
          <div class="sd_home_room_pic" slot="icon"></div>
          </van-cell>
          <van-cell :title="curBank.accountType" value="" :label="curBank.accountDetail" is-link @click="showBank=true" v-else>
            <div class="sd_home_room_pic" slot="icon"></div>
          </van-cell>
          <van-cell title="提现金额" value="" class="canbe_outNum">
            <div>
              <van-field v-model="outNumber"  type="number" pattern="[0-9]*" placeholder="请输入提现金额" />
            </div>

          </van-cell>
          <van-cell :title="'可提现金额￥'+moneyData.balance"  class="canbe_out" v-if="moneyData&&moneyData!=null">
            <span class="van-cell-value" @click="outNumber=moneyData.balance">全部提现</span>
            <!--<van-field v-model="outNumber" placeholder="请输入用户名" />-->
          </van-cell>
          <!--<van-cell title="中国工商银行" value="">-->
            <!--<van-field v-model="value" placeholder="请输入用户名" />-->
          <!--</van-cell>-->
        </van-cell-group>

          <div class="ob_myWallet_btns">
           <van-button size="large" type="danger" @click="moneyOut" v-if="outNumber&&outNumber!=''">确认提现</van-button>
            <van-button size="large" type="danger"  style="opacity: 0.6" v-else >确认提现</van-button>
          </div>


      </section>
      <van-actionsheet v-model="showBank" title="选择提现账户">

        <van-cell :title="bank.accountType=='银行卡'?bank.bankname:bank.accountType" v-for="(bank,index) in bankData" :key="index"  @click="curBank= bank">
          <van-icon slot="right-icon" name="success" class="van-cell__right-icon xuanzhong_bank" v-if="curBank.id== bank.id"/>
        </van-cell>
        <van-cell title="添加新的账户" icon="add-o" to="/addBank" />
      </van-actionsheet>
    </div>
</template>

<script>
    export default {
        name: 'money_out',
        data() {
            return {
              curBank:null,//当前选中银行
              moneyData:null,//账户余额
              showBank:false,
              userData:null,
              bankData:null,
              outNumber:null,
            }
        },
        methods: {
          onClickLeft(){
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
                      message: response.data.resultInfo
                    }).then(() => {
                      localStorage.removeItem('userInfo')
                      vm.$router.push('/login')
                    }).catch(() => {
                      localStorage.removeItem('userInfo')
                      vm.$router.push('/')
                    });
                  }else{
                    vm.bankData = response.data.a
                    vm.curBank= vm.bankData[0]
                    if(vm.bankData.length==0){
                      vm.$dialog.confirm({
                        message: '暂无提现账户，立即添加'
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
          //确定提现
          moneyOut(){
            const vm = this
            if(vm.$_.isEmpty(vm.outNumber)){
              vm.$toast('请输入充值金额');
              return
            }
            let params={
              token: vm.userData.token,
              bankid:vm.curBank.id,
              Account :vm.outNumber,
            }
            vm.$axios.get('/user/geamUserAccountDown/getDown',{params})
              .then(response => {

                if (response.status == 200&&response.data) {
                  if(response.data.statusCode==-100){
                    vm.$dialog.confirm({
                      message: response.data.resultInfo
                    }).then(() => {
                      localStorage.removeItem('userInfo')
                      vm.$router.push('/login')
                    }).catch(() => {
                      localStorage.removeItem('userInfo')
                      vm.$router.push('/')
                    });
                  }else{
                    vm.$toast('提现成功');
                    vm.obMoney()
                  }

//                vm.cardList = response.data
                } else {
                  vm.$toast('提现失败');
                }
              }).catch(response => {
              vm.$toast('提现失败');
            })
          },
          //获取余额
          obMoney(){
            const vm = this
            let params={
              token: vm.userData.token,
              uuid:vm.userData.uuid,
              terminalType :vm.userData.terminalType,
            }
            let url = '/user/geamUserAccountDown/getUserAccount'
            vm.$axios.get(url,{params})
              .then(response => {

                if (response.status == 200&&response.data) {
                  if(response.data.statusCode==-100){
                    vm.$dialog.confirm({
                      message: response.data.resultInfo
                    }).then(() => {
                      localStorage.removeItem('userInfo')
                      vm.$router.push('/login')
                    }).catch(() => {
                      localStorage.removeItem('userInfo')
                      vm.$router.push('/')
                    });
                  }else{
                    vm.moneyData = response.data.a
                  }


                } else {
                  vm.$toast('获取余额信息失败');
                }
              }).catch(response => {
              vm.$toast('获取余额信息失败');
            })
          },
        },
        computed: {},
        created() {
          const vm = this
          if(!localStorage.getItem('userInfo')){
            vm.$router.push('/login')
          }else{
            vm.userData =  JSON.parse(localStorage.getItem('userInfo'))
            vm.obOutData()
            vm.obMoney()
          }
        },
    }
</script>

<style>

</style>
