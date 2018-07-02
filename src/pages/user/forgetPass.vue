<template>
  <div class="mr-root">
    <van-nav-bar
      title="找回密码"
      left-arrow
      @click-left="onClickLeft"

    />
    <div class="forgetPass">
      <van-cell-group v-show="!messSuccess">
        <van-field v-model="phoneNum" placeholder="请输入您的手机号"  type="number"  icon="clear" onkeyup="this.value=this.value.slice(0,11)"
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
          v-model="messageCode"
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" size="small" type="primary" v-if="!disableBut" @click="obMobileCode()">发送验证码</van-button>
          <van-button slot="button" size="small"  disabled v-if="disableBut">{{seconds}}s后获取</van-button>
        </van-field>
        <!--<van-field v-model="phoneNum" placeholder="请输入您的新密码"  icon="clear"-->
                   <!--@click-icon="phoneNum = ''" />-->
      </van-cell-group>
      <van-cell-group v-show="messSuccess">
        <van-field v-model="newPass" placeholder="请输入您的新密码"  icon="clear"
        @click-icon="newPass = ''" />
      </van-cell-group>

<div class="nextBut">
  <van-button type="danger" @click="goLogin()" v-show="!messSuccess">下一步</van-button>
  <van-button type="danger" @click="updateNewPwd()" v-show="messSuccess">重置密码</van-button>
</div>




    </div>


  </div>
</template>

<script>


  export default {

    name: 'forgetPass',
    data(){
      return {
        messSuccess:false,//短信验证成功切换表单
        newPass:null,
        photoCodeUrl:null,
        photoCode:null,
        photoCodeKey:null,
        seconds: 60,
        disableBut: false,//验证码60S
        phoneNum:'',
        messageCode: '',
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
    mounted(){
      const vm = this
      vm.$watch('newPass', function () {
        vm.newPass=vm.newPass.replace(/^ +| +$/g,'')
        vm.newPass=vm.newPass.slice(0,20)
      }, {deep: true})
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
        } else if (vm.phoneNum < 12999999999 || vm.phoneNum > 19999999999) {
          vm.$toast('请填写正确手机号')
          return
        }
        else if (vm.$_.isEmpty(vm.photoCode)) {
          vm.$toast('请填写图片验证码')
          return
        }
        vm.seconds = 60
        vm.disableBut = true
        vm.getTimesec()
        setTimeout(() => {
          vm.disableBut = false
        }, 60000)
        let param = new URLSearchParams(); //创建form对象
        param.append('phone', vm.phoneNum);//通过append向form对象添加数据
        param.append('photoCode', vm.photoCode);//添加form表单中其他数据
        param.append('key', vm.photoCodeKey);//添加form表单中其他数据
        vm.$axios.post(`/api/Registercontroller/sendMsg`, param)
          .then(response => {

            if (response.status == 200) {
              if (response.data.status.indexOf("success") != -1) {
                vm.$toast(response.data.message);

//                console.log('成功')
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
      //下一步验证短信
      goLogin(){
        const vm = this
        const toast1 = vm.$toast.loading({
          mask: true,
          duration: 10000,       // 持续展示 toast
          message: '加载中...'
        });
        let param = new URLSearchParams(); //创建form对象
        param.append('phone', vm.phoneNum);//通过append向form对象添加数据
        param.append('verificationCode', vm.messageCode);//添加form表单中其他数据

        vm.$axios.post(`/api/Registercontroller/judgeCerificationCode`, param)
          .then(response => {
            if (response.status == 200) {
                console.log(response)
              if (response.data.status.indexOf("success") != -1) {
                vm.$toast.success('验证成功');
                setTimeout(() => {
                vm.messSuccess = true
                  vm.$toast('请输入新密码');
                }, 500);

              } else {
                vm.$toast('验证码错误');
              }

            } else {
              vm.$toast('请求失败');
            }
          }).catch(response => {
          vm.$toast('请输入正确验证码');
        })

//       vm.$router.push('/newPassword')
      },
      updateNewPwd(){
        const vm = this
        if (vm.newPass==''||vm.newPass==null) {
          vm.$toast('密码不能为空');
          return
        }else if(vm.newPass.length<8){
          vm.$toast('密码最低为八位');
          return
        }
        const toast1 = vm.$toast.loading({
          mask: true,
          duration: 10000,       // 持续展示 toast
          message: '加载中...'
        });
        let param = new URLSearchParams(); //创建form对象
        param.append('phone', vm.phoneNum);//通过append向form对象添加数据
        param.append('userPwd', vm.newPass);//添加form表单中其他数据

        vm.$axios.post(`/user/geamUserAccountDown/updateNewPwd`, param)
          .then(response => {
            if (response.status == 200) {
              console.log(response)
              if (response.data.status.indexOf("success") != -1) {
                vm.$toast.success('密码重置成功');
                       vm.$router.push('/login')
              } else {
                vm.$toast(response.data.message);
              }

            } else {
              vm.$toast('请求失败');
            }
          }).catch(response => {
          vm.$toast('请求失败');
        })


      }

    }
  }
</script>

<style>

</style>
