<template>
  <div class="mr-root">
    <van-nav-bar
      title="找回密码"
      left-arrow
      @click-left="onClickLeft"

    />
    <div class="forgetPass">
      <van-cell-group>
        <van-field v-model="phoneNum" placeholder="请输入您的手机号"  type="number"  icon="clear"
                   @click-icon="phoneNum = ''" />
        <van-field class="forgetTwoInput"
          center
          v-model="photoCode"
          placeholder="请输入图片验证码"
        >
          <template slot="button"><img :src="photoCodeUrl"
                                       @click="showPhotoCode()"     ref="Imgdata"></template>
          <!--<van-button slot="button" size="small" type="primary" v-if="!disableBut" @click="obMobileCode()">发送验证码</van-button>-->
        </van-field>
        <van-field
          center
          v-model="phoneCode"
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" size="small" type="primary" v-if="!disableBut" @click="obMobileCode()">发送验证码</van-button>
          <van-button slot="button" size="small"  disabled v-if="disableBut">{{seconds}}后获取</van-button>
        </van-field>
        <van-field v-model="phoneNum" placeholder="请输入您的新密码"  icon="clear"
                   @click-icon="phoneNum = ''" />
      </van-cell-group>
      <!--<el-input-->
        <!--placeholder="请输入您的手机号"-->
        <!--v-model="phoneNum"-->
        <!--clearable>-->
      <!--</el-input>-->
      <!--<el-input-->
        <!--placeholder="请输入您的手机验证码"-->
        <!--v-model="phoneCode"-->
        <!--clearable>-->
      <!--</el-input>-->
<div class="nextBut">
  <van-button type="danger" @click="goLogin()">下一步</van-button>
</div>




    </div>


  </div>
</template>

<script>


  export default {

    name: 'forgetPass',
    data(){
      return {
        photoCodeUrl:null,
        photoCode:null,
        seconds: 20,
        disableBut: false,//验证码60S
        phoneNum:'',
        phoneCode: '',
      }
    },
    computed:{

    },
    components:{

    },
    created(){
      const vm = this
      vm.showPhotoCode()
    },
    methods:{
      onClickLeft() {
        this.$router.go(-1)
      },
      showPhotoCode(){
        const vm = this

//        let img = vm.$refs.Imgdata
//
//        img.src = "http://47.106.11.246:8086/api/Registercontroller/photoCode?time=" + new Date().getTime();
        vm.$axios.get(`/api/Registercontroller/photoCode`)
          .then(response => {
            if (response.status == 200 && response.data) {
              vm.photoCodeUrl = response.data.img
              vm.photoCodeKey = response.data.key
              console.log(response)
            } else {
              vm.$toast('获取图片验证码失败');
            }
          }).catch(response => {
          vm.$toast('获取图片验证码失败');
        })
      },

      getTimesec() {
        const vm = this
        vm._timer = setInterval(function () {
          vm.seconds = vm.seconds - 1
          if (vm.seconds == 1) {                  //当num变为1的时候，通过 clearInterval()结束倒计时
            clearInterval(vm._timer);
          }
        }, 1000)
        return vm.seconds
      },
//      获取短信验证码
      obMobileCode(){
        const vm = this
        if (vm.$_.isEmpty(vm.phoneNum)) {
          vm.$toast('手机号不能为空');
          return
        } else if (vm.phoneNum < 12999999999 || vm.phoneNum > 18999999999) {
          vm.$toast('请填写正确手机号')
          return
        }
        else if (vm.$_.isEmpty(vm.photoCode)) {
          vm.$toast('请填写图片验证码')
          return
        }
        vm.seconds = 20
        vm.disableBut = true
        vm.getTimesec()
        setTimeout(() => {
          vm.disableBut = false
        }, 20000)
        let param = new URLSearchParams(); //创建form对象
        param.append('phone', vm.phoneNum);//通过append向form对象添加数据
        param.append('photoCode', vm.photoCode);//添加form表单中其他数据

        vm.$axios.post(`/api/Registercontroller/sendMsg.do`, param)
          .then(response => {

            if (response.status == 200) {
              if (response.data.status != 'fail') {


                console.log('成功')
              } else {
                vm.disableBut = false
                clearInterval(vm._timer);
                vm.$toast(response.data.message);
              }

            } else {
              vm.disableBut = false
              clearInterval(vm._timer);
              vm.$toast('获取验证码失败');
            }
          }).catch(response => {
          vm.disableBut = false
          clearInterval(vm._timer);
        })

      },
      //下一步
      goLogin(){
        const vm = this
       vm.$router.push('/newPassword')
      },


    }
  }
</script>

<style>

</style>
