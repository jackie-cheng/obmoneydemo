<template>
  <div class="mr-root">
    <van-nav-bar
      title="注册"
      left-text="返回"
      right-text="登录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="register">
      <el-form :model="ruleForm2" label-position="top" :rules="rules2"
               ref="ruleForm2"
               class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm2.username" auto-complete="off" placeholder="请输入您的昵称"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model.number="ruleForm2.phone" auto-complete="off" placeholder="请输入您的手机号"></el-input>
        </el-form-item>

        <el-form-item prop="photoCode" class="twoInput">
          <el-input v-model="ruleForm2.photoCode" placeholder="请输入图片验证码">

            <template slot="append"><img src="http://47.106.11.246:8080/api/Registercontroller/photoCode.do"
                                         @click="showPhotoCode()" ref="Imgdata"></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="mobileCode" class="threeInput">
          <el-input v-model.number="ruleForm2.mobileCode" placeholder="请输入您的短信验证码">
            <template slot="append" v-if="!disableBut">
              <el-button  @click="obMobileCode('ruleForm2.phone')">获取验证码
              </el-button>
            </template>
            <template slot="append" v-if="disableBut">
              <el-button style="background-color: #c8c9cc;color: white;border-color: #c8c9cc">{{seconds}}s后获取</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入您的登录密码"></el-input>
        </el-form-item>

        <el-form-item prop="qqNum">
          <el-input  v-model="ruleForm2.qqNum" auto-complete="off" placeholder="请输入您的QQ号"></el-input>
        </el-form-item>
        <el-form-item prop="recomMan">
          <el-input  v-model="ruleForm2.recomMan" auto-complete="off"
                    placeholder="请输入您的介绍人（没有可不填）"></el-input>
        </el-form-item>
        <div class="goRegis">
          <el-button type="primary" @click="submitForm('ruleForm2')">立即注册</el-button>

        </div>


      </el-form>
    </div>

  </div>
</template>

<script>

  import Header from '../../components/Header'
  export default {

    name: 'register',
    data(){
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入正确的手机号'));
          } else {
            if (value < 12999999999 || value > 18999999999) {
              callback(new Error('请输入正确的手机号'));
            } else {
              callback();
            }
          }
        }, 100);
      };
      var validatePass = (rule, value, callback) => {
        if (value.replace(/ /g, '') === '') {
          callback(new Error('密码不能为空格或者为空'));
        } else {
          callback();
        }
      };

      return {
        seconds: 60,
        disableBut: false,//验证码60S
        ruleForm2: {
          username: '',
          pass: '',
          qqNum: '',
          photoCode: '',
          mobileCode: '',
          recomMan: '',
          phone: '',
        },
        rules2: {
          pass: [
            {validator: validatePass, trigger: 'blur', required: true,},
            {min: 6, max: 15, message: '长度在 6 到 18 个字符', trigger: 'blur'}
          ],
          phone: [
            {validator: checkAge, trigger: 'blur', required: true,}
          ],
          photoCode: [],
          qqNum: [
//              { type: 'number', message: 'QQ号码为数字值', required: false},
//            {min: 6, max: 15, message: '长度在 5 到 18 个字符', trigger: 'blur'}
          ],
          recomMan: [
//            { type: 'number', message: '推荐人id必须为数字值', required: false},
//            {min: 6, max: 15, message: '长度在 5 到 18 个字符', trigger: 'blur'}
          ],
          mobileCode: [
            {required: true, message: '请输入短信验证码', trigger: 'blur'},
          ],
          username: [
            {required: true, message: '请输入姓名(中文或拼音)', trigger: 'blur'},
            {min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur'}
          ],
        },
      }
    },
    computed: {
//  checkPhone(){
//const vm = this
//    if(vm.phone < 12999999999 || vm.phone > 18999999999){
//    return false
//    }
//  },
//  checkPassword(){
//const vm = this
//    if(vm.password.length < 6 || vm.password.length >18){
//      return false
//    }
//  },
//  checkMobileCode(){
//      const vm = this
//    if(vm.mobileCode.length !=4){
//      return false
//    }
//  },
    },
    components: {
      Header
    },
    created(){
      const vm = this
    },
    methods: {
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
      onClickLeft() {
        const vm = this
        vm.$router.go(-1)
      },
      onClickRight() {
        const vm = this
        vm.$router.push('/login')
      },
      showPhotoCode(){
        const vm = this

        let img = vm.$refs.Imgdata

        img.src = "http://47.106.11.246:8080/api/Registercontroller/photoCode.do?time=" + new Date().getTime();
      },

//      获取短信验证码
      obMobileCode(){
        const vm = this
        let params = {
          phone: vm.ruleForm2.phone,
          photoCode: vm.ruleForm2.photoCode
        }


        if (!vm.ruleForm2.phone) {
          vm.$toast('手机号不能为空');
          return
        } else if (vm.ruleForm2.phone < 12999999999 || vm.ruleForm2.phone > 18999999999) {
          vm.$toast('请填写正确手机号')
          return
        }
        else if (vm.$_.isEmpty(vm.ruleForm2.photoCode)) {
          vm.$toast('请填写图片验证码')
          return
        }
        let param = new URLSearchParams(); //创建form对象
        param.append('phone', vm.ruleForm2.phone);//通过append向form对象添加数据
        param.append('photoCode', vm.ruleForm2.photoCode);//添加form表单中其他数据
        vm.seconds = 60
        vm.disableBut = true
        vm.getTimesec()
        setTimeout(() => {
          vm.disableBut = false
        }, 60000)
        let config = {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };  //添加请求头
//        vm.$axios.post('core/upload', param, config)
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
//        vm.$axios({
//          url: '/api/Registercontroller/sendMsg.do',
//          method: 'get',
//          data: {
//            phone:vm.ruleForm2.phone,
//            photoCode:vm.ruleForm2.photoCode
//          },
//          transformRequest: [function (data) {
//            // Do whatever you want to transform the data
//            let ret = ''
//            for (let it in data) {
//              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//            }
//            return ret
//          }],
//          headers: {
//            'Content-Type': 'application/x-www-form-urlencoded'
//          }
//        })
      },
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            const vm = this
            const toast1 = vm.$toast.loading({
              mask: true,
              duration: 10000,       // 持续展示 toast
              message: '加载中...'
            });
//              let params = {
//                username:vm.ruleForm2.username,
//                password:vm.ruleForm2.pass,
//                mobileCode:vm.ruleForm2.mobileCode,
//                phone:vm.ruleForm2.phone,
//              }
//                                console.log(params)
            let paramtwo = new URLSearchParams(); //创建form对象
            paramtwo.append('phone', vm.ruleForm2.phone);//通过append向form对象添加数据
            paramtwo.append('phoneCode', (vm.ruleForm2.mobileCode).toString());//添加form表单中其他数据
            paramtwo.append('username', vm.ruleForm2.username);//添加form表单中其他数据
            paramtwo.append('password', vm.ruleForm2.pass);//添加form表单中其他数据
            paramtwo.append('qq', vm.ruleForm2.qqNum);//添加form表单中其他数据
            paramtwo.append('introducer', vm.ruleForm2.recomMan);//添加form表单中其他数据
            vm.$axios.post('/api/Registercontroller/registUser.do', paramtwo).then(function (response) {
              if (response.status == 200 && response.data) {
                toast1.clear();
                if (response.data.status != 'fail') {
                  vm.$toast.success('注册成功');
                  vm.$router.push('/login')
                } else {
                  vm.$toast(response.data.message);
                }


              } else {
                vm.$toast.fail('请求出错');
              }

            })


          } else {
            return false;
          }
        });
      },

    }
  }
</script>

<style>
  .demo-ruleForm {
    margin-top: 0.6rem;
  }



  .twoInput .el-input-group__append {
    border: none;
    padding: 0;
  }

  .threeInput .el-input-group__append {
    border: none;
    background-color: transparent;
  }

  .twoInput .el-input-group__append img {

  }
</style>
