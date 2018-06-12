<template>
  <div class="mr-root">
    <!--<Header></Header>-->
    <van-nav-bar title="客服"/>
    <!--内容部分-->
    <section class="ob_cus_serCon">
      <ul>
        <li @click="serviceChat">
          <span class="serveice_icon"  :style="note"></span>
          <p>在线客服</p>
        </li>
        <li>
          <span class="qq_icon" :style="note2"></span>
          <p>QQ客服</p>

        </li>
      </ul>
    </section>
    <tabbar :activeNum="3"></tabbar>
  </div>
</template>

<script>
  import tabbar from '../components/tabbar'

  export default {
    name: 'CustomerService',
    data() {
      return {
        note: {
          backgroundImage: "url(" + require("../assets/service.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        },
        note2: {
          backgroundImage: "url(" + require("../assets/qq.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        },
      }
    },
    methods:{
        QQaaa(){

            //其中1234567指的是QQ号码
            window.location.href="mqqwpa://im/chat?chat_type=wpa&uin=771810659&version=1&src_type=web&web_src=oicqzone.com";

        },
      serviceChat(){
        const vm = this
        let params = {
          senderUserid:'2311213',// 发送者用户ID
        senderPhone:'12456',// 发送者手机账号
          msgContent:'6666'// 消息内容
        }
        vm.$axios.post(`/chatRecord/addChatRecord`, params)
          .then(response => {

            if (response.status == 200&&response.data) {

              console.log(response)
            } else {
              vm.$toast('获取房间列表失败');
            }
          }).catch(response => {

        })

      },
    },

    created() {
      const vm = this
    },
    components: {tabbar},
  }
</script>
<style>
</style>
