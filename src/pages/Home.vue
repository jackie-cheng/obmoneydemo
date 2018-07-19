<template>
  <div class="mr-root">
    <!--<Header></Header>-->
    <van-nav-bar title="7-19晚更新" class="home_head">
      <span slot="left" class="ob_header_select" @click="selectRoad()" ref="selectBox">
        {{roadSelect}}
        <van-icon name="arrow"/>

      </span>
      <!--<select slot="left" class="ob_header_select">-->
      <!--<option value="">线路一</option>-->
      <!--</select>-->
      <div slot="right">
        <van-icon name="contact" style="margin-right: 1.78rem"/>
        <template v-if="!nullLogin&&userData&&!$_.isEmpty(userData)">

          <span style="position: absolute;right: 0.5rem;top:-0.2rem;">{{userData.username}}</span>
          <span style="position: absolute;right: 0.5rem;top:0.2rem" v-if="moneyData&&!$_.isEmpty(moneyData)">￥{{moneyData.balance}}</span>
          <img src="../assets/maohao.png" style="width: 0.6rem;height: 0.6rem;" @click="showDownBox()" ref="DownBox">
        </template>
      </div>
      <div slot="right" class="homeLogig" v-if="nullLogin">
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
        <img src="../assets/maohao.png" style="width: 0.6rem;height: 0.6rem;" @click="showDownBoxLogin()" ref="DownBox">
      </div>
    </van-nav-bar>
    <!--选择线路-->
    <div v-if="showRoad" class="ob_show_road">
      <van-cell v-for="road in roads" :key="road" :title="road" @click="selectedRoad(road)"/>
    </div>

    <!--顶部下拉菜单-->
    <div class="ob_moreOperate_content" v-if="showDownNav">
      <van-cell title="交易记录" to="/trade_list"/>
      <van-cell title="统计记录" to="/statistic_list"/>
      <van-cell title="关闭声音"/>
      <van-cell title="个人中心" to="/user"/>
      <van-cell title="退出账号" @click="outLogin"/>

    </div>
    <!--图片部分-->
    <section class="ob_index_imgs">
      <van-swipe :autoplay="3000" v-if="homeData&&homeData.length>0">
        <van-swipe-item to="/notice" v-for="(image,index) in homeData" :key="index">
          <img :src="'http://47.106.11.246/'+image.pictureAddress"/>
        </van-swipe-item>

      </van-swipe>
      <van-swipe :autoplay="3000" v-else>
        <van-swipe-item to="/notice">1</van-swipe-item>
        <van-swipe-item to="/notice">2</van-swipe-item>
        <van-swipe-item to="/notice">3</van-swipe-item>
        <van-swipe-item to="/notice">4</van-swipe-item>
      </van-swipe>
    </section>
    <!--消息提示-->
    <van-notice-bar @click="routerNotice()"
      text="欢迎来到帝魂国际!2欢迎来到帝魂国际3欢迎来到帝魂国际4欢迎来到帝魂国际5欢迎来到帝魂国际6欢迎来到帝魂国际7欢迎来到帝魂国际8欢迎来到帝魂国际欢迎来到帝魂国际欢迎来到帝魂国际"
    />
    <!--<van-cell-group>-->
      <!--<van-cell title="欢迎来到ce国际!" is-link to="/notice">-->
        <!--<em class="iconfont notice_icon" slot="icon"></em>-->
      <!--</van-cell>-->
    <!--</van-cell-group>-->
    <!--App -->
    <section class="ob_home_apps">
      <ul>
        <li>
          <div class="ob_home_app app_download">
            <em class="iconfont download_icon"></em>
          </div>
          <span>App下载</span>

        </li>
        <li>
          <div class="ob_home_app app_arrive">
            <em class="iconfont arrive_icon"></em>
          </div>
          <span>签到有奖</span>
        </li>
        <li>
          <div class="ob_home_app app_pride">
            <em class="iconfont pride_icon"></em>
          </div>
          <span>积分摇奖</span>
        </li>
        <li>
          <div class="ob_home_app app_addpeople">
            <em class="iconfont addpeople_icon"></em>
          </div>
          <span>邀请好友</span>
        </li>


      </ul>

    </section>
    <!--房间list-->
    <section class="ob_home_lists">
      <van-cell-group v-for="r in roomList" :key="r.no">
        <van-cell :title="r.name" value="进入房间" :label="'当前在线'+r.count+'人'" @click="intoRoom(r)">
          <div class="sd_home_room_pic" slot="icon" v-if="r.roomIcon==''">
          </div>
          <div class="sd_home_room_picteo" slot="icon">
            <img :src="'http://47.106.11.246/'+r.roomIcon" alt="" v-if="r.roomIcon!=''">
          </div>
        </van-cell>
      </van-cell-group>

    </section>
    <!--关于我们-->
    <section class="ob_footer">
      <ul>
        <li>关于我们</li>
        <li>免责声明</li>
        <li>技术支持</li>
      </ul>

    </section>


    <tabbar :activeNum="0"></tabbar>
  </div>
</template>

<script>
  import mixin_app__token from '../utils/mixin_app__token'
  import tabbar from '../components/tabbar'
  //  import Header from '../components/Header'
  export default {
    name: 'home',
    data() {
      return {
        AllhomeData:null,
        moneyData:null,
        homeData: null,
        nullLogin: false,
        roadSelect: '线路一',
        showRoad: false,
        roads: ["线路一", "线路二"],
        list: ["交易记录", "统计记录", "关闭声音", "个人中心", "退出账号"],
        showDownNav: false,
        roomList: null,
        userData: null
      }
    },
    mixins: [mixin_app__token],
    components: {
      tabbar
    },
    created() {
      const vm = this
vm.obAllData()
      vm.obHomeData()
      if (!localStorage.getItem('userInfo')) {
        vm.nullLogin = true
      } else {
        vm.userData = JSON.parse(localStorage.getItem('userInfo'))
vm.obMoney()
      }

      const toast1 = vm.$toast.loading({
        mask: true,
        duration: 10000,       // 持续展示 toast
        message: '加载中...'
      });
//     vm.userData =  JSON.parse(localStorage.getItem('userInfo'))
//     vm.userToken =  vm.userData.accessToken
      let params = {
        pageNo: 1,
        pageSize: 20,
      }
      vm.$axios.get(`/api/RoomController/queryRoomList`, {params})
        .then(response => {
          toast1.clear();
          if (response.status == 200 && response.data) {
            vm.roomList = response.data.resultInfo

          } else {
            vm.$toast('获取房间列表失败');
          }
        }).catch(response => {
        toast1.clear();
      })


    },
    mounted(){
      this.$nextTick(() => {
        document.querySelector('body').addEventListener('click', this.handleBodyClick);
      })
    },
    beforeDestroy(){
      document.querySelector('body').removeEventListener('click', this.handleBodyClick);
    },
    methods: {
        //获取首页数据
      obAllData(){
          const vm = this
        vm.$axios.get(`/api/OperationalSetController/queryOperationalSetInfo`)
          .then(response => {
//            toast1.clear();
            console.log(response.data)
            if (response.status == 200 && response.data) {
              vm.AllhomeData = response.data

            } else {
              vm.$toast('获取房间信息失败');
            }
          }).catch(response => {
        })
      },

      //获取余额
      obMoney(){
        const vm = this
        let params={
          token: vm.userData.token,
          uuid:vm.userData.uuid,
          terminalType :vm.userData.terminalType,
        }
        let url = '/user/geamUserAccountDown/getUserAccount'
        vm.$axios.get(url,{params})
          .then(response => {

            if (response.status == 200&&response.data) {
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
              }else{
                vm.moneyData = response.data.a
              }


            } else {
              vm.$toast('获取余额信息失败');
            }
          }).catch(response => {
          vm.$toast('获取余额信息失败');
        })
      },
      routerNotice(){
         const vm = this
        vm.$router.push('/notice')
      },
      intoRoom(r){
        const vm = this
        if (r.openFlag == '1') {
          vm.$router.push('/roomDetail/' + r.roomnumber)
        } else {
          vm.$toast.fail('房间已关闭');
        }
      },
      //退出登录
      outLogin(){
        const vm = this
        let param = new URLSearchParams(); //创建form对象
        param.append('token', vm.userData.token);//通过append向form对象添加数据
        param.append('userOnlineStatus', '0');//添加form表单中其他数据
        vm.$axios.post(`/user/geamUserAccountDown/updateUserOnlineStatus`, param)
          .then(response => {
            if (response.status == 200 && response.data) {
              localStorage.removeItem('userInfo')
//        window.location.href = '/login'
//        location.reload()
              vm.$router.push('/login')
            } else {

            }
          }).catch(response => {
        })

      },
      //选择线路
      selectRoad() {
        const vm = this
        vm.showRoad = !vm.showRoad

      },
//获取首页数据
      obHomeData() {
        const vm = this
//        let params = {
//          id:vm.userData.accessToken,
//          user_level:'黄金会员',
//        }
        vm.$axios.get(`/api/frontPictureController/getAllPicture`)
          .then(response => {
            if (response.status == 200 && response.data) {
              vm.homeData = response.data.info
//              console.log(response.data.info)
            } else {
              vm.$toast('获取首页数据失败');
            }
          }).catch(response => {

        })

      },
      handleBodyClick(e){
        const vm = this
//        console.log(vm.$refs.DownBox.contains(event.target))
        const notOutside = vm.$refs.DownBox.contains(event.target);
        const notOutside2 = vm.$refs.selectBox.contains(event.target);
        if (!notOutside) {
          vm.showDownNav = false

        }
        if (!notOutside2) {

          vm.showRoad = false
        }
//        if(vm.showDownNav){
//          vm.showDownNav=false
//        }
//        if(vm.showRoad){
//          vm.showRoad=false
//        }

      },
      selectedRoad(road) {
        const vm = this
        vm.roadSelect = road
        vm.showRoad = false

//        console.log(road)
      },
      onChange() {

      },
      //点击出现下拉菜单
      showDownBox() {
        const vm = this
        if (vm.showDownNav) {
          vm.showDownNav = false
        } else {
          vm.showDownNav = true
        }
      },
      // 点击跳登录页面
      showDownBoxLogin() {
        this.$router.push('/login')
      }
    }
  }
</script>

<style>
  .is-active {
    color: #ff6900 !important
  }
</style>
