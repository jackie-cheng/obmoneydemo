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
           <van-button size="large" type="danger" @click="showKeyboard=true" v-if="outNumber&&outNumber!=''">确认提现</van-button>
            <van-button size="large" type="danger"  style="opacity: 0.6" v-else @click="$toast('请输入提现金额')">确认提现</van-button>
          </div>


      </section>
      <van-actionsheet v-model="showBank" title="选择提现账户">

        <van-cell :title="bank.accountType=='银行卡'?bank.bankname:bank.accountType" v-for="(bank,index) in bankData" :key="index" :label="bank.accountDetail"   @click="curBank= bank">
          <van-icon slot="right-icon" name="success" class="van-cell__right-icon xuanzhong_bank" v-if="curBank.id== bank.id"/>
        </van-cell>
        <van-cell title="添加新的账户" icon="add-o" to="/addBank" />
      </van-actionsheet>

      <div style="max-width: 640px">

      <!-- 密码输入框 -->
      <span style="position: relative">
      <yd-keyboard v-model="showKeyboard" :callback="obNewPass" ref="keyboardDemo1" :title="'支付密码为6位数字'"
      :input-text="'请输入您的支付密码'"
      ></yd-keyboard>
      </span>
      </div>


    </div>
</template>

<script>
  import Vue from 'vue';
  import {KeyBoard} from 'vue-ydui/dist/lib.px/keyboard';
  Vue.component(KeyBoard.name, KeyBoard);
    export default {
        name: 'money_out',
        data() {
            return {
              showKeyboard: false,
              curBank:null,//当前选中银行
              moneyData:null,//账户余额
              showBank:false,
              userData:null,
              bankData:null,
              outNumber:null,
            }
        },
        methods: {
          done1(val) {
            console.log('输入的密码是：' + val);
            this.$dialog.loading.open('验证支付密码');

            /* 模拟异步验证密码 */
            setTimeout(() => {
              this.$refs.keyboardDemo1.$emit('ydui.keyboard.error', '对不起，您的支付密码不正确，请重新输入。');
              this.$dialog.loading.close();
            }, 2000);
          },
          //     验证支付密码
          obNewPass(val){
            const vm = this
            const toast1 = vm.$toast.loading({
              mask: true,
              duration: 10000,       // 持续展示 toast
              message: '密码验证中...'
            });
            let param = new URLSearchParams(); //创建form对象
            param.append('token', vm.userData.token);//通过append向form对象添加数据
            param.append('userPayPwd', val);//添加form表单中其他数据
            vm.$axios.post(`/user/geamUserAccountDown/regNewPayPwd`, param)
              .then(response => {
                toast1.clear();
                if (response.status == 200) {
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
                  }else
                  if (response.data.status == 'success') {
                      vm.moneyOut()

                  } else {
                    vm.$toast(response.data.message);
                  }

                } else {
                  vm.$toast('请求失败');
                }
              }).catch(response => {
              toast1.clear();
            })
          },

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
                    vm.curBank= vm.bankData[0]
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
          //确定提现
          moneyOut(){
            const vm = this
            const toast1 = vm.$toast.loading({
              mask: true,
              duration: 10000,       // 持续展示 toast
              message: '提现中...'
            });
            if(vm.$_.isEmpty(vm.outNumber)){
              vm.$toast('请输入充值金额');
              return
            }
            let params={
              token: vm.userData.token,
              bankid:vm.curBank.id,
              account :vm.outNumber,
            }
            vm.$axios.get('/user/geamUserAccountDown/getDown',{params})
              .then(response => {
                toast1.clear();
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
                    vm.$toast.success('提现成功');
                    setTimeout(function () {
                      vm.$router.push('/my_wallet')
                    }, 1000);
                    vm.obMoney()
                  }

//                vm.cardList = response.data
                } else {
                  vm.$toast('提现失败');
                }
              }).catch(response => {
              toast1.clear();
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
      mounted(){
        const vm = this

        vm.$watch('outNumber', function () {
         if(Number(vm.outNumber)>Number(vm.moneyData.balance)){
           vm.outNumber=vm.moneyData.balance
         }
        }, {deep: true})



      },
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
