<template>
  <div class="mr-root">
    <!--<Header></Header>-->
    <van-nav-bar title="帝魂国际">
      <select slot="left" class="ob_header_select">
        <option value="">线路一</option>
      </select>
      <div slot="right" @click="showDownBox()">
        <van-icon name="contact"/>
        <van-icon name="more-o"/>
      </div>
    </van-nav-bar>
    <!--顶部下拉菜单-->
    <div class="ob_moreOperate_content" v-if="showDownNav">
      <van-cell v-for="item in list" :key="item" :title="item + ''"/>

    </div>
    <!--图片部分-->
    <section class="ob_index_imgs">
      <van-swipe :autoplay="3000">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </section>
    <!--消息提示-->
    <van-cell-group>
      <van-cell title="欢迎来到帝魂国际!" is-link>
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
      <van-cell-group v-for="n in 4" :key="n">
        <van-cell :title="'北京'+n" value="进入房间" label="最低30元起，大双小单4.6倍，大胆期限红100万">
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
        roads: ["线路一", "线路二"],
        list: ["交易记录", "统计记录", "关闭声音", "个人中心", "退出账号"],
        images: [
          'https://img.yzcdn.cn/1.jpg',
          'https://img.yzcdn.cn/2.jpg'
        ],
        showDownNav: false,
      }
    },

    components: {
      tabbar
    },
    created() {

    },
    methods: {
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
