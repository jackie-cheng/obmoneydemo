<template>
  <div class="mr-root roomDa">
    <van-nav-bar
      title="客服聊天"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>

    <!--聊天信息-->
    <!--<main class="room_wechat">-->

    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo" class='room_wechatul kefu_chart'>

      <ul style="margin-bottom: 90px;min-height: 400px">
        <p style="width: 100%;text-align: center;color: #00A3CF;margin-bottom: 0.3rem" @click="loadList">
          下拉或点击可查看聊天记录</p>

        <li :class="{right_wechat:mess.sendernickname==userName,lift_wechat:mess.sendernickname!=userName}"
            v-for="mess in mySendMessage">
          <template v-if="mess.sendernickname&&mess.sendernickname!=userName">

            <p style="text-align: center;margin: 0 auto;background-color: #dfdfdf;width: 50%" v-text="mess.mySendTime">
              2018-05-29 09:21</p>
            <p style="text-align: left;margin-left: 1rem;color: #ce5c4d">{{mess.sendernickname}}</p>
            <a v-if="mess.photourl">
              <img :src="mess.photourl" alt="" class="touxiangImg">
            </a>
            <a v-else>
              <img src="../../assets/qq.png" alt="" class="touxiangImg">
            </a>
            <span>{{mess.message}}</span>

          </template>

          <!--用户自己发的消息-->
          <template v-if="mess.sendernickname&&mess.sendernickname==userName">
            <p v-text="mess.mySendTime" style="text-align: center;margin: 0 auto;background-color: #dfdfdf;width: 50%">
              2018-05-29 09:21</p>
            <p v-text="mess.sendernickname" style="text-align: right;margin-right: 1rem;color: #ce5c4d">张三</p>
            <a v-if="mess.photourl">
              <img :src="mess.photourl" alt="" class="touxiangImg">
            </a>
            <a v-else>
              <img src="../../assets/qq.png" alt="" class="touxiangImg">
            </a>
            <span>{{mess.message}}</span>
          </template>
          <div style="clear:both"></div>
        </li>

      </ul>

    </yd-pullrefresh>




    <div class="footSet">
      <van-cell-group style="width: 80%">
        <van-field v-model="messageValue" placeholder="发送聊天" @keydown.enter="sendMess"/>
        <!--<van-field v-model="messageValue" placeholder="房间禁言中" disabled  v-if="roomData.guessFlag!='1'"/>-->
      </van-cell-group>

      <van-button  class="send_button" @click="sendMess" v-if="messageValue">
       发送
      </van-button>
      <van-button class="nosend_button"  v-if="!messageValue">
        发送
      </van-button>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import {PullRefresh} from 'vue-ydui/dist/lib.px/pullrefresh';
  Vue.component(PullRefresh.name, PullRefresh);
  export default{
    name: 'roomDetail',
    data () {
      return {
        page: 1,
        userData:null,
        userName:null,
        newUuid:null,//游客id
          mySendMessage:[],

        roomId: null,
        userToken: null,
        roomData: null,
        websock: null,
        messageValue: null,//websock要发送的值


      }
    },
    methods: {
      loadList() {
        const vm = this
        if(!localStorage.getItem('userInfo')){
          vm.$router.push('/login')
          return
        }
        let params={
          roomNumber: vm.$route.params.id,
          pageNumber:this.page,
          pageSize:10,
        }
        const url = 'user/chatRecord/queryChatRecordByRoomnumber';

        vm.$axios.get(url, {params}).then((response) => {
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
            const _list = (response.data||[]).map(a=>JSON.parse(a.msgContent));
            _list.reverse()
            vm.mySendMessage= [..._list, ...vm.mySendMessage];
            vm.$toast(_list.length > 0 ? '为您更新了' + _list.length + '条内容' : '已是最新内容');
            vm.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
//
            vm.page++;
          }
        });
      },

      onClickLeft() {
          const vm = this
        vm.$router.push('/')
      },
      sendMess(){
        const vm = this
     if(vm.$_.isEmpty(vm.messageValue)){
          vm.$toast('不能发送空值');
          return
        }
        else{
          vm.threadPoxi()
        }

//        console.log(vm.messageValue)
      },
      threadPoxi(){  // 实际调用的方法
        //参数
        const vm = this
        const agentData = vm.messageValue;
        vm.messageValue=null
//       vm.mySendMessage.push(agentData)
//        console.log(vm.mySendMessage)
//        vm.websocketsend(agentData)
        //若是ws开启状态
        if (vm.websock.readyState == 1) {
          vm.websocketsend(agentData)

        }else{
          vm.$toast('聊天还未建立');
          vm.initWebSocket()
        }
//        // 若是 正在开启状态，则等待300毫秒
//        else if (vm.websock.readyState === 0) {
//          setTimeout(function () {
//            vm.websocketsend(agentData)
//          }, 300);
//        }
//        // 若未开启 ，则等待500毫秒
//        else {
//          vm.initWebSocket();
//          setTimeout(function () {
//            vm.websocketsend(agentData)
//          }, 500);
//        }
      },
      initWebSocket(){
        //初始化weosocketnew WebSocket("ws://ip:8080/websocket");ws://localhost:8080/websocket
        //ws地址
        const vm = this
        vm.newUuid ='youke'+ new Date().getTime()+ Math.floor(Math.random()*11)+10

        if(localStorage.getItem('userInfo')){
          vm.websock = new WebSocket("ws://47.106.11.246:8086/websocket?chatType=1&userId="+vm.userData.uuid+"&chartId="+vm.userData.uuid);
        }else {
          vm.websock = new WebSocket("ws://47.106.11.246:8086/websocket?chatType=1&chartId="+vm.newUuid+"&userId="+vm.newUuid);
          vm.userName=vm.newUuid
        }


//        if(vm.websock.readyState != 1){
//         console.log("WebSocket连接中")
////          vm.initWebSocket()
//        }
        console.log(vm.websock)
        vm.websock.onmessage = vm.websocketonmessage;
        vm.websock.onclose = vm.websocketclose;
        // 路由跳转时结束websocket链接
//        vm.$router.afterEach(function () {
//          vm.websock.onclose
//        })
      },
      websocketonmessage(e){ //数据接收
        const vm = this
        vm.redata = JSON.parse(e.data.msgContent);
//        let content = document.getElementsByClassName('room_wechatul')[0];
//        content.scrollTop=content.scrollHeight
//        console.log(e.data)
        console.log('收到的',vm.redata)
        vm.mySendMessage.push(vm.redata)

//        content.scrollTop=content.scrollHeight-100
        console.log('收消息列表',vm.mySendMessage)

//        let divUl = document.getElementsByClassName('room_wechatul')[0]
//        divUl.scrollTop = divUl.scrollHeight;
//{"phone":"","message":""}
//        console.log('jieshou',vm.redata);
      },
      websocketsend(agentData){//数据发送
        const vm = this
        let curTime =vm.getNowFormatDate()

        if(localStorage.getItem('userInfo')){
          let sendData ={"uuid": vm.userData.uuid,"message":agentData,'mySendTime':curTime,
            'sendernickname':vm.userData.username
          }
          vm.websock.send(JSON.stringify(sendData));
//          console.log('发的消息',JSON.stringify(sendData))
          vm.mySendMessage.push(sendData)
        }else {
          let sendData ={"uuid": vm.newUuid,"message":agentData,'mySendTime':curTime,
            'sendernickname':vm.newUuid
          }
          vm.websock.send(JSON.stringify(sendData));
//          console.log('发的消息',JSON.stringify(sendData))
          vm.mySendMessage.push(sendData)
        }
//          let content = document.getElementsByClassName('room_wechatul')[0];
//          content.scrollTop=content.scrollHeight

//        console.log(JSON.stringify(sendData))

//          let content = document.getElementsByClassName('room_wechatul')[0];
//          content.scrollTop=content.scrollHeight-50
//          console.log('发送列表',content.scrollHeight)
//          let divUl = document.getElementsByClassName('room_wechatul')[0]
//          divUl.scrollTop = divUl.scrollHeight;
//        vm.mySendMessage=  vm.mySendMessage.push(agentData)
      },
      websocketclose(e){  //关闭
        console.log("connection closed (" + e.code + ")");
      },




    getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
      var hours = date.getHours();
      var minut = date.getMinutes();
      var second = date.getSeconds();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
      }
      if (minut >= 0 && minut <= 9) {
        minut = "0" + minut;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + " " + hours + seperator2 + minut
      + seperator2 + second;
    return currentdate;
  }
    },
    mounted(){
        const vm = this
      vm.$watch('mySendMessage',()=>{
        let content = document.getElementsByClassName('room_wechatul')[0];
        console.log(content.scrollHeight)
        content.scrollTop=content.scrollHeight+90
      }, {deep: true})
//      vm.$watch('',()=>{
//          if(vm.websock.readyState === 1){
//            console.log('连接成功')
//          }
//
//      })

    },
    created () {
      const vm = this
      if(localStorage.getItem('userInfo')){
              vm.userData = JSON.parse(localStorage.getItem('userInfo'))
      vm.userToken = vm.userData.accessToken
        vm.userName = vm.userData.username
      }
      vm.initWebSocket()

    },
    beforeDestroy () {
      this.websock.onclose
    },
    components: {},
  }
</script>
<style>
</style>
