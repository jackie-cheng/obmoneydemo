<template>
  <div class="mr-root">
    <van-nav-bar
      title="添加提现账户"
      left-arrow
      @click-left="onClickLeft"

    />
    <div class="addBack_class">
      <van-cell-group>
        <van-cell title="账户类型" :value="curAccountType" is-link arrow-direction="down" @click="showAccType=true"/>
      </van-cell-group>
      <template v-if="curAccountType== '银行卡'&& !hadBank">
        <div class="tishi_bank">
          请绑定持卡人本人的银行卡
        </div>

        <van-cell-group>
          <yd-cell-item>
            <span slot="left">持卡人</span>
            <yd-input slot="right" v-model="bankUserName" type="text"     placeholder="请输入姓名"
            ></yd-input>
          </yd-cell-item>
          <!--<van-cell title="持卡人" value="李思璐" />-->
          <van-cell title="卡类型" :value="selectBank" is-link @click="showBanksType=true" />

        </van-cell-group>
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">银行卡号</span>
            <yd-input slot="right" v-model="bankNum" regex="bankcard" ref="input9"  required placeholder="请输入银行卡号"
            ></yd-input>
          </yd-cell-item>

        </yd-cell-group>
        <van-cell-group class="frist_accountDel">
          <yd-cell-item>
            <span slot="left">开户地址</span>
            <yd-input slot="right" v-model="bankAddress"   placeholder="开户地址(选填)"
            ></yd-input>
          </yd-cell-item>
          <!--<van-field-->
            <!--v-model="selectBank"-->
            <!--label="开户行"-->
            <!--icon="clear"-->
            <!--placeholder="请输入开户行"-->
            <!--onkeyup="this.value=this.value.replace(/[, ]/g,'')"-->
            <!--@click-icon="selectBank = ''"-->
          <!--/>-->
          <!--<van-field-->
            <!--v-model="bankAddress"-->
            <!--label="开户地址"-->
            <!--icon="clear"-->
            <!--placeholder="开户地址(选填)"-->
            <!--&lt;!&ndash;onkeyup="this.value=this.value.replace(/[, ]/g,'')"&ndash;&gt;-->
            <!--@click-icon="bankAddress = ''"-->
          <!--/>-->
        </van-cell-group>
        <van-button type="danger" v-if="$_.isEmpty(bankUserName)||$_.isEmpty(bankNum)" style="opacity: 0.6">确认</van-button>
        <van-button type="danger" @click="addAccount()" v-else>确认</van-button>
      </template>
      <template v-if="curAccountType== '支付宝'&& !hadBank">
        <van-cell-group class="frist_accountDel">
          <yd-cell-item>
            <span slot="left">账户姓名</span>
            <yd-input slot="right" v-model="bankUserName" type="text"   placeholder="请输入姓名"
            ></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">账号</span>
            <yd-input slot="right" v-model="bankNum" type="text"    placeholder="请输入账号"
            ></yd-input>
          </yd-cell-item>
        </van-cell-group>

        <van-button type="danger" v-if="$_.isEmpty(bankUserName)||$_.isEmpty(bankNum)" style="opacity: 0.6">确认</van-button>
        <van-button type="danger" @click="addAccount()" v-else>确认</van-button>
      </template>
      <template v-if="curAccountType== '微信'&& !hadBank">
        <van-cell-group class="frist_accountDel">

          <yd-cell-item>
            <span slot="left">账户姓名</span>
            <yd-input slot="right" v-model="bankUserName" type="text"    placeholder="请输入姓名"
            ></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">账号</span>
            <yd-input slot="right" v-model="bankNum" type="text"    placeholder="请输入账号"
            ></yd-input>
          </yd-cell-item>
        </van-cell-group>

        <van-button type="danger" v-if="$_.isEmpty(bankNum)||$_.isEmpty(bankUserName)" style="opacity: 0.6">确认</van-button>
        <van-button type="danger" @click="addAccount()" v-else>确认</van-button>
      </template>
      <template v-if="curAccountType== '财付通'&& !hadBank">
        <van-cell-group class="frist_accountDel">

          <yd-cell-item>
            <span slot="left">账户姓名</span>
            <yd-input slot="right" v-model="bankUserName" type="text"    placeholder="请输入姓名"
            ></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">账号</span>
            <yd-input slot="right" v-model="bankNum" type="text"    placeholder="请输入账号"
            ></yd-input>
          </yd-cell-item>
        </van-cell-group>

        <van-button type="danger" v-if="$_.isEmpty(bankNum)||$_.isEmpty(bankUserName)" style="opacity: 0.6">确认</van-button>
        <van-button type="danger" @click="addAccount()" v-else>确认</van-button>
      </template>
    </div>
    <van-actionsheet v-model="showAccType" title="选择账户类型">
      <van-cell title="银行卡" @click="curAccountType= '银行卡',showAccType=false">
        <van-icon slot="right-icon" name="success" class="van-cell__right-icon xuanzhong_bank" v-if="curAccountType== '银行卡'"/>
      </van-cell>
      <van-cell title="微信" @click="curAccountType= '微信',showAccType=false" >
        <van-icon slot="right-icon" name="success" class="van-cell__right-icon xuanzhong_bank" v-if="curAccountType== '微信'"/>
      </van-cell>
      <van-cell title="支付宝" @click="curAccountType= '支付宝',showAccType=false">
        <van-icon slot="right-icon" name="success" class="van-cell__right-icon xuanzhong_bank" v-if="curAccountType== '支付宝'"/>
      </van-cell>
      <van-cell title="财付通" @click="curAccountType= '财付通',showAccType=false">
        <van-icon slot="right-icon" name="success" class="van-cell__right-icon xuanzhong_bank" v-if="curAccountType== '财付通'"/>
      </van-cell>
    </van-actionsheet>

    <van-actionsheet v-model="showBanksType" title="选择银行" class="addbank">
      <van-cell :title="sBank" @click="selectBank= sBank,showBanksType=false" v-for="(sBank,index) in allBackList" :key="index">
        <van-icon slot="right-icon" name="success" class="van-cell__right-icon xuanzhong_bank" v-if="selectBank== sBank"/>
      </van-cell>
    </van-actionsheet>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Input} from 'vue-ydui/dist/lib.px/input';
  import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell';
  Vue.component(Input.name, Input);
  Vue.component(CellGroup.name, CellGroup);
  Vue.component(CellItem.name, CellItem);
  export default {

    name: 'accountSetDe',
    data(){
      return {
        hadBank:false,
        bankData:[],
        userData:null,
        showBanksType: false,
        bankUserName: null,//银行用户
//        zhiUserName:null,//支付宝用户名
//        weiUserName:null,//微信用户名
        showAccType: false,
        curAccountType: '请选择账户类型',
        selectBank: '中国工商银行',
        bankAddress: null,
        bankNum: null,
        allBackList: [ '中国工商银行',
          '招商银行',
          '中国农业银行',
          '中国建设银行',
          '中国银行',
          '中国民生银行',
          '中国光大银行',
          '中信银行',
          '交通银行',
          '兴业银行',
          '上海浦东发展银行',
          '中国邮政储蓄银行',
          '中国农业发展银行']
      }
    },
    computed:{

    },
    components:{

    },
    mounted(){
      const vm = this

      vm.$watch('curAccountType', function () {
       let curUserBank= vm.bankData.filter(bank=>bank.accountType==vm.curAccountType)
        if(curUserBank.length>0){
            vm.hadBank= true
          vm.$dialog.alert({
            title: '友情提示',
            message: '您已有'+vm.curAccountType+'账户，修改'+vm.curAccountType+'账户请联系管理员',
            className: 'willy_pup'
          });
        }else{
          vm.hadBank= false
//          vm.bankUserName=null
//          vm.bankNum=null
        }

      }, {deep: true})

      vm.$watch('bankUserName', function () {
          if(!vm.$_.isEmpty(vm.bankUserName)){
            vm.bankUserName=vm.bankUserName.replace(/^ +| +$/g,'')
//            vm.bankUserName=vm.bankUserName.slice(0,5)
          }

      }, {deep: true})
      vm.$watch('bankNum', function () {
          if(!vm.$_.isEmpty(vm.bankNum)){
            vm.bankNum=vm.bankNum.replace(/^ +| +$/g,'')
          }

      }, {deep: true})

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
      //获取用户银行列表
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


              }

            } else {
              vm.$toast('获取银行列表失败');
            }
          }).catch(response => {
          vm.$toast('获取银行列表失败');
        })
      },
      addAccount(){
        const vm = this
        if (vm.curAccountType=='银行卡') {
            if(!vm.$refs.input9.valid){
              vm.$toast(vm.$refs.input9.errorMsg);
              return
            }

        }
        let params={
          accountType:vm.curAccountType,      // 账户类型
          accountDetail:vm.bankNum,    // 收款账户
          accountAddress:vm.curAccountType=='银行卡'?vm.bankAddress:null,   // 开户地址  -- 没有则空
          bankname:vm.curAccountType=='银行卡'?vm.selectBank:null,    //支行名称
          accountName:vm.bankUserName,  // 账户姓名
          token: vm.userData.token,
        }
console.log(params)
        let url = '/user/geamUserAccountDown/saveShow'
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
//                vm.$toast.success('添加账户成功');
                vm.$dialog.confirm({
                  message: '添加账户成功,点击返回',
                  className: 'willy_pup'
                }).then(() => {
                  vm.$router.go(-1)

                }).catch(() => {
                  vm.$router.push('/addBank')
                });
              }

            } else {
              vm.$toast('添加账户失败');
            }
          }).catch(response => {
          vm.$toast('添加账户失败');
        })
      },

    }
  }
</script>

<style>

</style>
