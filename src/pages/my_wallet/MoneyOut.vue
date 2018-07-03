<template>
    <div class="mr-root">
      <!--header-->
      <van-nav-bar title="余额提现" left-arrow @click-left="onClickLeft()"/>
      <!--页面内容-->
      <section class=" money_out">
        <van-cell-group>
          <van-cell title="中国工商银行" value="" label="尾号1578储蓄卡" is-link @click="showBank=true">
          <div class="sd_home_room_pic" slot="icon"></div>
          </van-cell>
          <van-cell title="提现金额" value="" class="canbe_outNum">
            <div>
              <van-field v-model="outNumber"  type="number" pattern="[0-9]*" placeholder="请输入提现金额" />
            </div>

          </van-cell>
          <van-cell :title="'可提现金额￥'+canbeOut"  class="canbe_out">
            <span class="van-cell-value" @click="outNumber=canbeOut">全部提现</span>
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
      <van-actionsheet v-model="showBank" title="选择提现银行卡">
        <van-cell title="中国银行">
          <!--<van-icon slot="right-icon" name="success" class="van-cell__right-icon" />-->
        </van-cell>
        <van-cell title="中国建设银行">
          <van-icon slot="right-icon" name="success" class="van-cell__right-icon xuanzhong_bank"/>
        </van-cell>
        <van-cell title="添加新的银行卡" icon="add-o" to="/addBank" />
      </van-actionsheet>
    </div>
</template>

<script>
    export default {
        name: 'money_out',
        data() {
            return {
              canbeOut:365.6,
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

              id:'9bc34c34cbb144b3ac60fc09852b136c',

            }
            let url = '/user/geamUserAccountDown/getUserBank'
            vm.$axios.get(url,{params})
              .then(response => {

                if (response.status == 200&&response.data) {
                  if(response.data.statusCode){
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
                    vm.bankData = response.data
                  }

                } else {
                  vm.$toast('获取银行列表失败');
                }
              }).catch(response => {
              vm.$toast('获取银行列表失败');
            })
          },
          moneyOut(){
            const vm = this
            if(vm.$_.isEmpty(vm.shouAccount)){
              vm.$toast('请输入充值金额');
              return
            }
            let params={
              id: vm.userToken,
              bankid:'所选银行的id',
              Account :vm.outNumber,
            }
            vm.$axios.post('/user/geamUserAccountDown/getDown',params)
              .then(response => {

                if (response.status == 200&&response.data) {
                  if(response.data.statusCode){
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
                  }

//                vm.cardList = response.data
                } else {
                  vm.$toast('提现失败');
                }
              }).catch(response => {
              vm.$toast('提现失败');
            })
          }
        },
        computed: {},
        created() {
          const vm = this
          if(!localStorage.getItem('userInfo')){
            vm.$router.push('/login')
          }else{
            vm.userData =  JSON.parse(localStorage.getItem('userInfo'))
            vm.obOutData()
          }
        },
    }
</script>

<style scoped="scoped">
  .xuanzhong_bank{
    color: red;font-weight: bold
  }
</style>
