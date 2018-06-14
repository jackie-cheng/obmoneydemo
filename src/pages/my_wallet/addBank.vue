<template>
  <div class="mr-root">
    <van-nav-bar
      title="添加银行卡"
      left-arrow
      @click-left="onClickLeft"

    />
    <div class="addBack_class">
      <div class="tishi_bank">
        请绑定持卡人本人的银行卡
      </div>
      <van-cell-group>
        <van-cell title="持卡人" value="李思璐" />
        <van-cell title="卡类型" value="中国工商银行" is-link />

      </van-cell-group>
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">银行卡号</span>
          <yd-input slot="right" v-model="bankNum" regex="bankcard" ref="input9" required placeholder="请输入银行卡号"
          ></yd-input>
        </yd-cell-item>

        </yd-cell-group>
      <van-cell-group class="frist_accountDel">
        <van-field
          v-model="selectBank"
          label="开户行"
          icon="clear"
          placeholder="请输入开户行"
          required
          onkeyup="this.value=this.value.replace(/[, ]/g,'')"
          @click-icon="selectBank = ''"
        />
        <van-field
          v-model="bankAddress"
          label="开户地址"
          icon="clear"
          placeholder="开户地址"
          required
          onkeyup="this.value=this.value.replace(/[, ]/g,'')"
          @click-icon="bankAddress = ''"
        />
      </van-cell-group>
      <van-button type="danger" v-if="$_.isEmpty(bankAddress)||$_.isEmpty(selectBank)||$_.isEmpty(bankNum)" style="opacity: 0.6">确认</van-button>
      <van-button type="danger" @click="addAccount()" v-else>确认</van-button>
    </div>


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
        selectBank:null,
        bankAddress:null,
        bankNum:'',

      }
    },
    computed:{

    },
    components:{

    },
    created(){
      const vm = this
    },
    methods:{
      onClickLeft() {
        this.$router.go(-1)
      },

      addAccount(){
        const vm = this
        if (!vm.$refs.input9.valid) {
          vm.$toast(vm.$refs.input9.errorMsg);
          return
        }
        vm.$toast('添加成功');
      },
//     修改密码
      obNewPass(){
        const vm = this
        vm.$toast('功能还没做');
        return
        if (vm.$_.isEmpty(vm.phoneNum)) {
          vm.$toast('密码不能为空');
          return
        }
        const toast1 = vm.$toast.loading({
          mask: true,
          duration: 10000,       // 持续展示 toast
          message: '密码更新中...'
        });
        let param = new URLSearchParams(); //创建form对象
        param.append('password', vm.phoneNum);//添加form表单中其他数据

        vm.$axios.post(`/api/LoginController/login.do`, param)
          .then(response => {
            toast1.clear();
            if (response.status == 200) {
              if (response.data.status != 'fail') {

                console.log('成功')
              } else {
                vm.$toast(response.data.message);
              }

            } else {
              vm.$toast('获取验证码失败');
            }
          }).catch(response => {

        })
      },


    }
  }
</script>

<style>

</style>
