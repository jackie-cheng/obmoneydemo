<template>
  <div class="mr-root">
    <van-nav-bar
      title="个人信息"
      @click-left="onClickLeft"
      left-arrow
    />

    <!--<router-link to="/login">还没登录，去登录</router-link>-->
    <!--<van-cell-group v-if="userData&&!$_.isEmpty(userData)">-->
      <!--<van-cell title="个人头像">-->
        <!--<van-icon slot="right-icon" name="search" class="van-cell__right-icon" />-->
      <!--</van-cell>-->
      <!--<van-cell title="推广id" value="132456" />-->
      <!--<van-cell title="手机号" :value="userData.phone"/>-->
      <!--<van-cell title="用户昵称" is-link :value="userData.username"/>-->
      <!--<van-cell title="QQ号" is-link value="771810659" />-->

    <!--</van-cell-group>-->
    <van-cell-group v-if="userData&&!$_.isEmpty(userData)">
      <div class="myInfo_touxiang">
        <van-uploader :after-read="onRead" accept="image/*" :max-size="1024*1024*0.5" @oversize="overSize" multiple>
          <span>个人头像</span>
          <img src="../../../assets/qq.png" alt="" v-if="userData&&userData.photourl==null">
          <img :src="'http://47.106.11.246/'+userData.photourl" alt="" v-if="userData&&userData.photourl!=null">
        </van-uploader>

      </div>
      <van-cell title="推广id" value="132456" />
      <van-cell title="手机号" :value="userData.phone"/>
      <van-cell title="用户昵称" is-link :value="userData.username"/>
      <van-cell title="QQ号" is-link :value="userData.qq" />

    </van-cell-group>
<!--<p>还没登录，去登录</p>-->
    <van-button type="danger" @click="onClickLeft()" style="width: 70%;margin: 3rem 1.5rem">完成</van-button>
  </div>
</template>

<script>
  import 'lrz/dist/lrz.all.bundle.js'
  import tabbar from '../../../components/tabbar'
  export default {
    name: 'home',
    data(){
      return {
        repassword:null,
        password:null,
        username:null,
        phone:null,
        userData:null,
      }
    },

    components:{
     tabbar
    },
    created(){
const vm = this
      vm.userData =  JSON.parse(localStorage.getItem('userInfo'))
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1)
      },
      overSize(){
        const vm = this
        vm.$toast.fail('上传失败，图片过大');
      },

      onRead(file) {
        const vm = this

        lrz(file.file, {
          quality: 0.5
        })
          .then(function (rst) {
            // 处理成功会执行
//            console.log('customUploadImg:', 'lrz success')
//            console.log(rst)
            console.log(rst)
            console.log(file.file.name)
            let param = new FormData(); //创建form对象
            param.append('fileName', file.file,file.file.name);//通过append向form对象添加数据
            param.append('token',vm.userData.token);
//        param.append('fileName', file.file.name);//通过append向form对象添加数据
//        param.append('chunk', '0');//添加form表单中其他数据

            let config = {
              headers: {'Content-Type': 'multipart/form-data'}
            };  //添加请求头
            vm.$axios.post('/api/upLoadImg/fileUpload', param, config)
              .then(response => {
                console.log(response)
                if (response.status == 200) {

                  vm.$toast.success('上传成功');
                  vm.userData.photourl = response.data.address
                  localStorage.setItem('userInfo',JSON.stringify(vm.userData))
                } else {
                  vm.$toast('请求失败');
                }
              }).catch(response => {
              vm.$toast('请求失败');
            })
          })
          .catch(function (err) {
//            console.log('222')
            vm.$message.error('压缩失败')
          })
          .always(function () {
            // 清空文件上传控件的值
//            e.target.value = null
          })

      }
    }
  }
</script>

