<template>
  <div class="mr-root">
    <!--<Header></Header>-->
    <van-nav-bar title="帝魂国际">
      <span slot="left" class="ob_header_select" @click="selectRoad()">
        {{roadSelect}}
        <van-icon name="arrow"/>

      </span>
      <!--<select slot="left" class="ob_header_select">-->
      <!--<option value="">线路一</option>-->
      <!--</select>-->
      <div slot="right" @click="showDownBox()" v-if="!nullLogin">
        <van-icon name="contact"/>
        <van-icon name="more-o"/>
      </div>
      <div slot="right" class="homeLogig" v-if="nullLogin">
       <router-link to="/login">登录</router-link>   <router-link to="/register" >注册</router-link>
      </div>
    </van-nav-bar>
    <!--选择线路-->
    <div v-if="showRoad" class="ob_show_road">
      <van-cell v-for="road in roads" :key="road" :title="road" @click="selectedRoad(road)"/>
    </div>

    <!--顶部下拉菜单-->
    <div class="ob_moreOperate_content" v-if="showDownNav">
      <van-cell  title="交易记录"/>
      <van-cell  title="统计记录"/>
      <van-cell  title="关闭声音"/>
      <van-cell  title="个人中心" to="/user"/>
      <van-cell  title="退出账号" @click="outLogin"/>

    </div>
    <!--图片部分-->
    <section class="ob_index_imgs">
      <van-swipe :autoplay="3000">
        <van-swipe-item  to="/notice">1</van-swipe-item>
        <van-swipe-item  to="/notice">2</van-swipe-item>
        <van-swipe-item  to="/notice">3</van-swipe-item>
        <van-swipe-item  to="/notice">4</van-swipe-item>
      </van-swipe>
    </section>
    <!--消息提示-->
    <van-cell-group>
      <van-cell title="欢迎来到帝魂国际!" is-link to="/notice">
        <em class="iconfont notice_icon" slot="icon"></em>
      </van-cell>
    </van-cell-group>
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
        <van-cell :title="r.name" value="进入房间" label="最低30元起，大双小单4.6倍，大胆期限红100万" :to="'/roomDetail/'+r.roomnumber">
          <div class="sd_home_room_pic" slot="icon"></div>
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
  import tabbar from '../components/tabbar'
  //  import Header from '../components/Header'
  export default {
    name: 'home',
    data() {
      return {
        nullLogin:false,
        roadSelect: '线路一',
        showRoad: false,
        roads: ["线路一", "线路二"],
        list: ["交易记录", "统计记录", "关闭声音", "个人中心", "退出账号"],
        images: [
          'https://img.yzcdn.cn/1.jpg',
          'https://img.yzcdn.cn/2.jpg'
        ],
        showDownNav: false,
        roomList:null,
      }
    },

    components: {
      tabbar
    },
    created() {
const vm = this

   if(!sessionStorage.getItem('userInfo')){
    vm.nullLogin = true
   }

     const toast1 = vm.$toast.loading({
       mask: true,
       duration: 10000,       // 持续展示 toast
       message: '加载中...'
     });
//     vm.userData =  JSON.parse(sessionStorage.getItem('userInfo'))
//     vm.userToken =  vm.userData.accessToken
     let params = {
       pageNo:1,
       pageSize:10,
     }
     vm.$axios.get(`/api/RoomController/queryRoomList`, {params})
       .then(response => {
         toast1.clear();
         if (response.status == 200&&response.data) {
             vm.roomList = response.data.rows
              console.log(response)
         } else {
           vm.$toast('获取房间列表失败');
         }
       }).catch(response => {
       toast1.clear();
     })


    },
    methods: {
        //退出登录
      outLogin(){
          const vm = this
        sessionStorage.removeItem('userInfo')
        vm.$router.push('/login')
      },
      //选择线路
      selectRoad() {
        const vm = this
        vm.showRoad = true

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
      }
    }
  }
</script>

<style>
  .is-active {
    color: #ff6900 !important
  }
</style>
