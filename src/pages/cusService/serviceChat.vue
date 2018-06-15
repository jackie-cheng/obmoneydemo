<template>
  <div class="mr-root roomDa">
    <van-nav-bar
      title="客服聊天"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>

    <!--聊天信息-->
    <main class="room_wechat">
      <ul class ='room_wechatul'>

        <li :class="{right_wechat:!mess.nickname,lift_wechat:mess.nickname}"  v-for="mess in mySendMessage">
          <template v-if="!mess.nickname">
            <p style="text-align: center;margin: 0 auto;background-color: #dfdfdf;width: 50%"  v-text="mess.sendTime">2018-05-29 09:21</p>
            <p style="text-align: right;margin-right: 1rem;color: #ce5c4d">{{userData.username}}</p>
            <a v-if="userData.photourl">
              <img :src="userData.photourl" alt="">
            </a>
            <a v-else>
              <img src="../../assets/qq.png" alt="">
            </a>
            <span>{{mess.message}}</span>

          </template>
          <template v-else>
            <p v-text="mess.sendTime" style="text-align: center;margin: 0 auto;background-color: #dfdfdf;width: 50%" >2018-05-29 09:21</p>
            <p v-text="mess.nickname" style="text-align: left;margin-left: 1rem;color: #ce5c4d">张三</p>
            <a v-if="mess.photourl">
            <img :src="mess.photourl" alt="">
            </a>
            <a v-else>
            <img src="../../assets/qq.png" alt="">
            </a>
            <span>{{mess.message}}</span>
          </template>
          <div style="clear:both"></div>
        </li>
        <div style="margin-bottom: 1rem"><a id="msg_end" name="1" href="#1">&nbsp</a></div>
        <!--<div id="msg_end" style="height:0px; overflow:hidden"></div>-->
      </ul>

    </main>
    <div class="footSet">
      <van-cell-group>
        <van-field v-model="messageValue" placeholder="发送聊天" @keydown.enter="sendMess"/>
        <!--<van-field v-model="messageValue" placeholder="房间禁言中" disabled  v-if="roomData.guessFlag!='1'"/>-->
      </van-cell-group>

      <van-button  class="send_button" @click="sendMess">
       发送
      </van-button>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'

  export default{
    name: 'roomDetail',
    data () {
      return {
        userData:null,

          mySendMessage:[],
        othersSendMessage:[],

        roomId: null,
        userToken: null,
        roomData: null,
        websock: null,
        messageValue: null,//websock要发送的值
        resData: {}, //websock接收到的值

      }
    },
    methods: {


      onClickLeft() {
          const vm = this
        vm.$router.push('/')
      },


//      获取聊天记录
      obChatRecord(){
          const vm = this
        let params={
          roomNumber: 6,
          pageNumber:1,
          pageSize:10,
        }
        vm.$axios.get(`/chatRecord/addChatRecord?senderUserid=11&senderPhone=12&&chatType=customerservicechat`,{params})
          .then(response => {
            if (response.status == 200 && response.data) {
              console.log(response)
            } else {
              vm.$toast('获取房间信息失败');
            }
          }).catch(response => {

        })
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
//      vm.$watch('',()=>{
//          if(vm.websock.readyState === 1){
//            console.log('连接成功')
//          }
//
//      })

    },
    created () {
      const vm = this
      vm.obChatRecord()
      if(sessionStorage.getItem('userInfo')){
              vm.userData = JSON.parse(sessionStorage.getItem('userInfo'))
      vm.userToken = vm.userData.accessToken
      }

    },
    beforeDestroy () {
      this.websock.onclose
    },
    components: {},
  }
</script>
<style>
</style>
