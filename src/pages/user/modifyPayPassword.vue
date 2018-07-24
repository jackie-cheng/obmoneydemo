<template>
  <div class="mr-root">
    <van-nav-bar
      title="修改支付密码"
      left-arrow
      @click-left="onClickLeft"

    />
    <div class="modifyPass">
      <yd-cell-group>
        <yd-cell-item>

          <span slot="left">原支付密码：</span>

            <yd-input slot="right" required v-model="oldPass"
type="number"
                      max="6" min="6"   placeholder="请输入原支付密码"></yd-input>


        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">新支付密码：</span>
          <yd-input slot="right" pattern="[0-9]*" type="password" v-model="newPass" min="6"  max="6" placeholder="请输入新支付密码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">确认新支付密码：</span>
          <yd-input slot="right" pattern="[0-9]*" type="password" v-model="secNewPass" min="6" max="6" placeholder="请再次输入新支付密码"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <!--<van-cell-group>-->
        <!--<van-field v-model="oldPass" placeholder="请输入原登录密码"  label="原登录密码" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')"  clearable/>-->
        <!--<van-field v-model="newPass" placeholder="请输入新登录密码" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" label="新登录密码"-->

                   <!--type = 'password'-->
                   <!--icon="password-view"-->
                   <!--@click-icon="$toast('question')" />-->
        <!--<van-field v-model="secNewPass" placeholder="请再次输入新登录密码" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')"-->
                   <!--clearable-->
                   <!--label="确认新密码"  icon="clear"-->
                   <!--@click-icon="secNewPass = ''" />-->

      <!--</van-cell-group>-->

      <div class="nextBut">
        <van-button type="danger" @click="obNewPass()" v-if="oldPass!=''&&newPass!=''&&secNewPass!=''&&newPass.length==6">确定</van-button>
        <van-button type="danger" @click="passTest()" style="opacity: 0.6" v-else>确定</van-button>
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

  export default {

    name: 'modifyPass',
    data(){
      return {
        oldPass:'',
        newPass:'',
        secNewPass:'',
        userData:null,
      }
    },
    computed:{

    },
    components:{

    },
    mounted(){
      const vm = this
      vm.$watch('oldPass', function () {
        vm.oldPass=vm.oldPass.replace(/^ +| +$/g,'')
        vm.oldPass=vm.oldPass.slice(0,6)
      }, {deep: true})
      vm.$watch('newPass', function () {
        vm.newPass=vm.newPass.replace(/^ +| +$/g,'')
        vm.newPass=vm.newPass.replace(/\./,'')
      }, {deep: true})
      vm.$watch('secNewPass', function () {
        vm.secNewPass=vm.secNewPass.replace(/^ +| +$/g,'')
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
      passTest() {
        const vm = this
        if (vm.oldPass==''||vm.newPass==''||vm.secNewPass=='') {
          vm.$toast('密码不能为空');
          return
        }else if(vm.newPass.length!=6){
          vm.$toast('密码为6位数字');
          return
        }
      },

//     修改密码
      obNewPass(){
        const vm = this
        if (vm.newPass!=vm.secNewPass) {
          vm.$toast('新密码输入不一致');
          return
        }else if(isNaN(vm.newPass)){
          vm.$toast('支付密码为6位纯数字');
          return
        }
        const toast1 = vm.$toast.loading({
          mask: true,
          duration: 10000,       // 持续展示 toast
          message: '密码更新中...'
        });
        let param = new URLSearchParams(); //创建form对象
        param.append('token', vm.userData.token);//通过append向form对象添加数据
        param.append('userPayPwd', vm.newPass);//添加form表单中其他数据
        param.append('oldPayPwd', vm.oldPass);
        vm.$axios.post(`/user/geamUserAccountDown/updateUserPayPwd`, param)
          .then(response => {
//            toast1.clear();
            if (response.status == 200) {
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
              }else if (response.data.status == 'success') {

                vm.$toast.success('修改成功');
                setTimeout(() => {
                  this.$router.go(-1)
        }, 2000);

              } else {
                vm.$toast('原密码输入错误');
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
