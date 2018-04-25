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
    <el-form :model="ruleForm2" label-position="top" :rules="rules2"
             ref="ruleForm2"
             class="demo-ruleForm">
      <el-form-item  prop="username">
        <el-input v-model="ruleForm2.username" auto-complete="off"  placeholder="请输入您的用户名"></el-input>
      </el-form-item>
      <el-form-item  prop="phone">
        <el-input v-model.number="ruleForm2.phone" auto-complete="off"  placeholder="请输入您的手机号"></el-input>
      </el-form-item>

      <el-form-item prop="photoCode" class="twoInput">
        <el-input v-model="ruleForm2.photoCode" placeholder="请输入图片验证码">

          <template slot="append"><img src="http://47.92.129.86:80/api/Registercontroller/photoCode.do"  @click="showPhotoCode()" ref="Imgdata"></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="mobileCode" class="threeInput">
        <el-input v-model.number="ruleForm2.mobileCode" placeholder="请输入您的短信验证码">
          <template slot="append">
          <el-button  style="background-color: white;border-color: red;color: red;border-top: 1px solid red;border-bottom: 1px solid red" @click="obMobileCode('ruleForm2.phone')">获取验证码</el-button></template>
        </el-input>
      </el-form-item>
      <el-form-item  prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入您的登录密码"></el-input>
      </el-form-item>

      <el-form-item  prop="qqNum">
        <el-input type="password" v-model="ruleForm2.qqNum" auto-complete="off" placeholder="请输入您的QQ号"></el-input>
      </el-form-item>
      <el-form-item  prop="recomMan">
        <el-input type="password" v-model="ruleForm2.recomMan" auto-complete="off" placeholder="请输入您的介绍人（没有可不填）"></el-input>
      </el-form-item>
<div style="width: 100%;text-align: center;">
  <el-button type="primary" @click="submitForm('ruleForm2')" style="width: 70%; max-width: 8rem;">立即注册</el-button>

</div>


    </el-form>
  </div>
</template>

<script>

  import Header from '../components/Header'
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
            }else{
              callback();
            }
          }
        }, 100);
      };
      var validatePass = (rule, value, callback) => {
        if (value.replace(/ /g,'') === '') {
          callback(new Error('密码不能为空格或者为空，请确认后再次输入'));
        } else {
          callback();
        }
      };

      return {
        ruleForm2: {
          username:'',
          pass: '',
          qqNum:'',
          photoCode:'',
          mobileCode:'',
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
          photoCode:[

          ],
          qqNum:[],
          recomMan:[],
          mobileCode:[
            {required: true, message: '请输入短信验证码', trigger: 'blur'},
          ],
          username: [
            {required: true, message: '请输入姓名(中文或拼音)', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ],
        },
      }
    },
computed:{
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
    components:{
      Header
    },
    created(){
const vm = this
    },
    methods:{
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

        img.src = "http://47.92.129.86:80/api/Registercontroller/photoCode.do?time=" + new Date().getTime();
      },
      goRegister(){
        const vm = this
        let params={
          username:vm.username,
          password:vm.password,
          mobileCode:vm.mobileCode,
          phone:vm.phone
        }
        vm.$axios.get(`/api/Registercontroller/registUser.do`,{params})
          .then(response => {
            console.log(response)
            if (response.status == 200) {

            } else {
              vm.$toast('获取验证码失败');
            }
          }).catch(response => {


        })
      },
//      获取短信验证码
      obMobileCode(){
        const vm = this
        let params={
          phone:vm.ruleForm2.phone,
          photoCode:vm.ruleForm2.photoCode
        }


        if(!vm.ruleForm2.phone){
          vm.$toast('手机号不能为空');
          return
        }else if(vm.ruleForm2.phone< 12999999999 || vm.ruleForm2.phone > 18999999999){
          vm.$toast('请填写正确手机号')
          return
        }
        else if(vm.$_.isEmpty(vm.ruleForm2.photoCode)){
          vm.$toast('请填写图片验证码')
          return
        }
        let param = new URLSearchParams(); //创建form对象
        param.append('phone', vm.ruleForm2.phone);//通过append向form对象添加数据
        param.append('photoCode', vm.ruleForm2.photoCode);//添加form表单中其他数据

        let config = {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };  //添加请求头
//        vm.$axios.post('core/upload', param, config)
        vm.$axios.post(`/api/Registercontroller/sendMsg.do`, params)
          .then(response => {
            console.log(response)
            if (response.status == 200) {

            } else {
              vm.$toast('获取验证码失败');
            }
          }).catch(response => {


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
              let params = {
                username:vm.ruleForm2.username,
                password:vm.ruleForm2.pass,
                mobileCode:vm.ruleForm2.mobileCode,
                phone:vm.ruleForm2.phone,
              }
//                                console.log(params)
              vm.$axios.post('/api/Registercontroller/registUser.do', params).then(function (response) {
                if (response.status == 200 && response.data) {
                  const toast = Toast.loading({
                    duration: 0,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    message: '注册成功，去往登录页'
                  });

                  let second = 3;
                  const timer = setInterval(() => {
                    second--;
                    if (second) {
//                      toast.message = `倒计时 ${second} 秒`;
                    } else {
                      clearInterval(timer);
                      Toast.clear();
                    }
                  }, 1000);
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
.demo-ruleForm{
  margin-top:0.6rem;
}
.demo-ruleForm .el-form-item__content{
  width: 70%;
  max-width: 8rem;
  margin: 0 auto;
}
  .twoInput .el-input-group__append {
   border: none;
    padding: 0;
  }
.threeInput .el-input-group__append {
  border: none;
  background-color: transparent;
  padding: 0 0rem 0 0.8rem;
}
.twoInput .el-input-group__append img{

}
</style>
