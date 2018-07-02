<template>
  <div class="mr-root">
    <van-nav-bar
      title="支付密码"
      left-arrow
      @click-left="onClickLeft"

    />
    <!--<div style="max-width: 800px">-->

      <!--&lt;!&ndash; 密码输入框 &ndash;&gt;-->
      <!--<span style="position: relative">-->
      <!--<yd-keyboard v-model="showKeyboard" :callback="done1" ref="keyboardDemo1" :title="'支付密码为6位数字'"-->
                   <!--:input-text="'请设置您的支付密码'"-->
      <!--&gt;</yd-keyboard>-->
        <!--</span>-->
    <!--</div>-->


    <!-- 数字键盘 -->
    <!--<van-number-keyboard-->
      <!--:show="showKeyboard"-->
      <!--@input="onInput"-->
      <!--@delete="onDelete"-->
      <!--@blur="showKeyboard = false"-->
    <!--/>-->
    <div class="modifyPass">
      <yd-cell-group style="margin-top: 0.6rem">
        <yd-cell-item>

          <span slot="left">支付密码：</span>

          <yd-input slot="right" required v-model="payPass"
                    type="number"
                    max="6"    placeholder="请输入6位纯数字支付密码"></yd-input>


        </yd-cell-item>
      </yd-cell-group>


      <div class="nextBut">
        <van-button type="danger" @click="obNewPass()" v-if="payPass.length==6">确定</van-button>
        <van-button type="danger" style="opacity: 0.6" v-else @click="$toast('支付密码为6位纯数字')">确定</van-button>
      </div>




    </div>


  </div>
</template>

<script>

  import Vue from 'vue';
  import {Input} from 'vue-ydui/dist/lib.px/input'
  import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell';
  /* 使用px：import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell'; */

  Vue.component(CellGroup.name, CellGroup);
  Vue.component(CellItem.name, CellItem);
  /* 使用px：import {Input} from 'vue-ydui/dist/lib.px/input'; */

  Vue.component(Input.name, Input);
  import {KeyBoard} from 'vue-ydui/dist/lib.px/keyboard';
  Vue.component(KeyBoard.name, KeyBoard);
  export default {

    name: 'modifyPass',
    data(){
      return {
        userData:null,
        payPass:'',
        value: '',
        showKeyboard: true,
//        phoneNum:'',

      }
    },
    computed:{

    },
    components:{

    },
    mounted(){
      const vm = this
      vm.$watch('payPass', function () {
        vm.payPass=vm.payPass.replace(/^ +| +$/g,'')
        vm.payPass=vm.payPass.slice(0,6)
        vm.payPass=vm.payPass.replace(/\./,'')
      }, {deep: true})

    },
    created(){
      const vm = this
      if(!localStorage.getItem('userInfo')){
        vm.$router.push('/login')
      }else{
        vm.userData =  JSON.parse(localStorage.getItem('userInfo'))
      }
    },
    methods:{
      onClickLeft() {
        this.$router.go(-1)
      },
      done1(val) {
        const vm = this
        console.log('输入的密码是：' + val);
        const toast1 = vm.$toast.loading({
          mask: true,
          duration: 3000,       // 持续展示 toast
          message: '密码提交中...'
        });
//        this.$dialog.loading.open('验证支付密码');
//
//        /* 模拟异步验证密码 */
//        setTimeout(() => {
//          this.$refs.keyboardDemo1.$emit('ydui.keyboard.error', '对不起，您的支付密码不正确，请重新输入。');
//          this.$dialog.loading.close();
//        }, 2000);
      },

//     修改密码
      obNewPass(){
        const vm = this
//        if (vm.$_.isEmpty(vm.phoneNum)) {
//          vm.$toast('密码不能为空');
//          return
//        }
        const toast1 = vm.$toast.loading({
          mask: true,
          duration: 10000,       // 持续展示 toast
          message: '密码更新中...'
        });
        let param = new URLSearchParams(); //创建form对象
        param.append('token', vm.userData.token);//通过append向form对象添加数据
        param.append('userPayPwd', vm.payPass);//添加form表单中其他数据
        vm.$axios.post(`/user/geamUserAccountDown/updateNewPayPwd`, param)
          .then(response => {
//            toast1.clear();
            if (response.status == 200) {
              if (response.data.status == 'success') {

                vm.$toast.success('修改成功');
                vm.userData.paymentPassword = true
                localStorage.setItem('userInfo',JSON.stringify(vm.userData))
                setTimeout(() => {
                  this.$router.go(-1)
                }, 500);

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


    }
  }
</script>

<style>

</style>
