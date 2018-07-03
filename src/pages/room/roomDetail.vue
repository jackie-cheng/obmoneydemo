<template>
  <div class="mr-root roomDa" v-if="roomData&&!$_.isEmpty(roomData)">
    <van-nav-bar
      :title="roomData.name"
      left-arrow
      @click-left="onClickLeft"
    > <van-icon name="add-o" slot="right" />
    </van-nav-bar>
    <!--<van-row>-->
      <!--<van-col span="12">span: 8</van-col>-->
      <!--<van-col span="12">span: 8</van-col>-->
    <!--</van-row>-->
    <div class="room_topData">
      <!--信息-->
      <div class="room_topData_up">
<div class="room_topData_lift"> <span>距<em>333</em>期止</span>
  <p> <yd-countdown :time="666" timetype="second" format="{%m}分{%s}秒"></yd-countdown></p>
</div>
        <div class="room_topData_lift"><span>总余额</span>
          <p>01:25</p></div>
      </div>
      <!--列-->
      <!--<div class="room_topData_down">-->
<!--<span>第 <em>4854545</em> 期5+1+3=9（大单）</span>-->
      <!--</div>-->
      <van-collapse v-model="activeNames" class="room_topData_down">
        <van-collapse-item  name="1">
          <div slot="title"><span>第 <em>4854545</em> 期 <i class="numblue_color">5</i>
            +<i class="numblue_color">5</i>+<i class="num_color">5</i>=<i class="lastNum_color">5</i>（大 <i class="dan_color">单</i> ）</span></div>
          <p class="kai_jieguo">开奖结果</p>
          <ul>
            <li>
              <span>第 <em>4854545</em> 期 <i class="numblue_color">5</i>
            +<i class="numblue_color">5</i>+<i class="num_color">5</i>=<i class="lastNum_color">5</i>（大<i class="dan_color">单</i>）</span>
            </li>
            <li>
              <span>第 <em>4854545</em> 期 <i class="numblue_color">5</i>
            +<i class="numblue_color">5</i>+<i class="num_color">5</i>=<i class="lastNum_color">5</i>（大<i class="dan_color">单</i>）</span>
            </li>
            <li>
              <span>第 <em>4854545</em> 期 <i class="numblue_color">5</i>
            +<i class="numblue_color">5</i>+<i class="num_color">5</i>=<i class="lastNum_color">5</i>（大<i class="dan_color">单</i>）</span>
            </li><li>
              <span>第 <em>4854545</em> 期 <i class="numblue_color">5</i>
            +<i class="numblue_color">5</i>+<i class="num_color">5</i>=<i class="lastNum_color">5</i>（大<i class="dan_color">单</i>）</span>
          </li>

          </ul>
        </van-collapse-item>
      </van-collapse>
    </div>
    <!--聊天信息-->
    <!--<main class="room_wechat">-->
    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo" class ='room_wechatul'>

      <ul style="margin-bottom: 90px;min-height: 400px">
        <p style="width: 100%;text-align: center;color: #00A3CF;margin-bottom: 0.3rem" @click="loadList">下拉或点击可查看聊天记录</p>
        <li :class="{right_wechat:mess.sendernickname==userName,lift_wechat:mess.sendernickname!=userName}"  v-for="mess in mySendMessage">
          <template v-if="mess.sendernickname&&mess.sendernickname!=userName&&!mess.fristSend">
            <!--{{JSON.parse(mess.msgContent)}}-->
            <p style="text-align: center;margin: 0 auto;background-color: #dfdfdf;width: 50%"  v-text="mess.mySendTime">2018-05-29 09:21</p>
            <p style="text-align: left;margin-left: 1rem;color: #ce5c4d">{{mess.sendernickname}}</p>
            <a v-if="mess.photourl">
              <img :src="mess.photourl" alt="" class="touxiangImg">
            </a>
            <a v-else>
              <img src="../../assets/qq.png" alt="" class="touxiangImg">
            </a>
            <span>{{mess.message}}</span>

          </template>
          <template v-if="!mess.sendernickname">
            <!--{{JSON.parse(mess.msgContent)}}-->
            <p style="text-align: center;margin: 0 auto;background-color: #dfdfdf;width: 50%"  v-text="mess">2018-05-29 09:21</p>

          </template>

          <template v-if="mess.fristSend">
            <p v-text="mess.mySendTime" style="text-align: center;margin: 0 auto;background-color: #dfdfdf;width: 50%" >2018-05-29 09:21</p>
            <p  style="text-align: center;margin: 0.2rem auto;background-color: #dfdfdf;width: 50%" >尊贵的
              <img src="../../assets/userRank1.png" alt=""  style="width:1rem;height: 0.5rem" v-if="mess.message=='1'">
              <img src="../../assets/userRank2.png" alt=""  style="width:1rem;height: 0.5rem" v-if="mess.message=='2'">
              <img src="../../assets/userRank3.png" alt=""  style="width:1rem;height: 0.5rem" v-if="mess.message=='3'">
              <img src="../../assets/userRank4.png" alt=""  style="width:1rem;height: 0.5rem" v-if="mess.message=='4'">
              <img src="../../assets/userRank5.png" alt=""  style="width:1rem;height: 0.5rem" v-if="mess.message=='5'">
              <em style="color: blue">{{mess.sendernickname}}</em>  进入房间</p>
            <!--<p v-text="mess.sendernickname" style="text-align: right;margin-right: 1rem;color: #ce5c4d">张三</p>-->
            <!--<a v-if="mess.photourl">-->
              <!--<img :src="mess.photourl" alt="">-->
            <!--</a>-->
            <!--<a v-else>-->
              <!--<img src="../../assets/qq.png" alt="">-->
            <!--</a>-->
            <!--<span>{{mess.message}}</span>-->
          </template>

          <template v-if="mess.sendernickname==userName&&!mess.fristSend">
            <p v-text="mess.mySendTime" style="text-align: center;margin: 0 auto;background-color: #dfdfdf;width: 50%" >2018-05-29 09:21</p>
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


    <!--</main>-->
    <div class="footSet">
      <van-button @click="showCustomAction=true" v-if="roomData.guessFlag=='1'">投注</van-button>
      <van-button @click="startGuess" v-if="roomData.guessFlag!='1'" class="disButton">投注</van-button>
      <van-button @click="recallMenu=true">
        撤单
      </van-button>
      <van-cell-group>
        <van-field v-model="messageValue" placeholder="发送聊天" @keydown.enter="sendMess"  v-if="roomData.guessFlag=='1'"/>
        <van-field v-model="messageValue" placeholder="房间禁言中" disabled  v-if="roomData.guessFlag!='1'"/>
      </van-cell-group>
      <!--<form action="/">-->
        <!--<van-search-->
          <!--v-model="messageValue"-->
          <!--placeholder="发送聊天"-->
          <!--show-action-->
          <!--@search="sendMess"-->
        <!--/>-->
      <!--</form>-->
      <van-button  class="send_button" @click="sendMess">
       发送
      </van-button>
      <!--<i>-->
        <!--<span class="right_class">正确</span>-->
        <!--<span class="wrong_class">错误</span>-->
        <!--<em class="set_score">给分</em>-->
      <!--</i>-->

    </div>
    <van-actionsheet v-model="showCustomAction" title="定位球投注" class="touzhu_actionbac">
      <div class="touzhu_action">
        <div class="touzhu_lift">
         <span :class="{active_touzhu:touzhuType==1}" @click="touzhuType=1"> <em>特<br/>码</em> </span>
          <span :class="{active_touzhu:touzhuType==2}" @click="touzhuType=2"> <em>定 <br/> 位 <br/>球</em> </span>
        </div>
        <div class="touzhu_right" v-if="touzhuType==1">

          <ul>
            <li ><p class="foz_bol"> 大</p><p> 2</p></li>
            <li><p class="foz_bol"> 大</p><p> 2</p></li>
            <li><p class="foz_bol"> 大</p><p> 2</p></li>
            <li><p class="foz_bol"> 大</p><p> 2</p></li>
            <li><p class="foz_bol"> 大</p><p> 2</p></li>
            <li><p class="foz_bol"> 小</p><p> 2</p></li>
            <li><p class="foz_bol"> 小</p><p> 2</p></li>
            <li><p class="foz_bol"> 小</p><p> 2</p></li>
            <li><p class="foz_bol"> 小</p><p> 2</p></li>
            <li><p class="foz_bol"> 小</p><p> 2</p></li>
            <li><p class="foz_bol"> 红</p><p> 2</p></li>
            <li><p class="foz_bol"> 红</p><p> 2</p></li>
            <li><p class="foz_bol"> 红</p><p> 2</p></li>
            <li><p class="foz_bol"> 红</p><p> 2</p></li>
            <li><p class="foz_bol"> 红</p><p> 2</p></li>
          </ul>

          <ul>
            <li v-for="n in 20"><p class="foz_bol"> {{n}}</p><p> {{n}}</p></li>
          </ul>
        </div>
        <div class="touzhu_right" v-if="touzhuType==2">
          <img src="../../assets/firstball.png" alt="" >
          <ul>
            <li v-for="n in 20" :class="{curChosBall_class:curChosBallOne== n}" @click = 'curChosBallOne= n'><p class="foz_bol"> {{n}}</p><p> {{n}}</p></li>
          </ul>
          <img src="../../assets/secball.png" alt="">
          <ul>
            <li v-for="n in 20" :class="{curChosBall_class:curChosBallTwo== n}" @click = 'curChosBallTwo= n'><p class="foz_bol"> {{n}}</p><p> {{n}}</p></li>
          </ul>
        </div>
      </div>
<div class="touzhu_foot">

  <div class="foot_but">
    <ul>
      <li :class="{active_monbut:touzhuNum==1000}" @click="touzhuNum=1000">
        1000
      </li><li :class="{active_monbut:touzhuNum==5000}" @click="touzhuNum=5000">
        5000
      </li><li :class="{active_monbut:touzhuNum==10000}" @click="touzhuNum=10000">
        1W
      </li>
      <li :class="{active_monbut:touzhuNum==50000}" @click="touzhuNum=50000">
      5W
    </li>

    </ul>
    <!--<van-stepper-->
      <!--v-model="touzhuNum"-->
      <!--integer-->
      <!--:min="1000"-->
      <!--:max="100000"-->
      <!--:step="1000"-->
    <!--/>-->
    <input type="number"  v-model="touzhuNum" placeholder="单注金额"  pattern="[0-9]*">
    <span class="touzhu_total">总计：￥{{touzhuNum||0}}</span><van-button size="small" class="touzhu_null" @click="touzhuNum=null">清空</van-button>
    <van-button size="small" class="touzhu_ok">确认</van-button>
  </div>


</div>
    </van-actionsheet>
    <van-actionsheet v-model="recallMenu" title="撤单" class="touzhu_actionbac">
      <div class="recallMenu_action">
        <table class="ob_pay_record_table">
          <tr>
            <th width="30%">期号</th>
            <th width="20%">投注内容</th>
            <th width="30%">金额</th>
            <th width="20%">操作</th>
          </tr>
          <tr v-for="n in 4">
            <td width="30%">888</td>
            <td width="20%">大</td>
            <!--如果为充值，则颜色添加红色，添加样式pay_money-->
            <td width="30%" class="pay_money">1000.00</td>
            <td width="20%" class="recallMenu_but" @click="toRecall(n)"> <span>撤单</span></td>
          </tr>
        </table>

      </div>
    </van-actionsheet>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {CountDown} from 'vue-ydui/dist/lib.px/countdown';
 import {PullRefresh} from 'vue-ydui/dist/lib.px/pullrefresh';
  /* 使用px：import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.px/list'; */
  Vue.component(PullRefresh.name, PullRefresh);
  Vue.component(CountDown.name, CountDown);
  export default{
    name: 'roomDetail',
    data () {
      return {
        page: 1,
        userData:null,
        userName:null,
        userToken:null,
          userRankImg:{
            '1':'../../assets/userRank1.png',
            '2':'../../assets/userRank2.png',
            '3':'../../assets/userRank3.png',
            '4':'../../assets/userRank4.png',
            '5':'../../assets/userRank5.png',
          },
          mySendMessage:[],
        othersSendMessage:[],
        curChosBallOne:1,//当前选中球1
        curChosBallTwo:1,//当前选中球2
        touzhuType:1,
        touzhuNum:null,
        recallMenu:false,
        showCustomAction:false,
        activeNames: ['2'],
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
          if(response.data.statusCode){
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
      startGuess(){
        const vm = this
        vm.$toast('当前竞猜已关闭');
      },
      toRecall(){
        const vm = this
        vm.$toast('撤单成功');
      },
      sendMess(){
        const vm = this
        if(!localStorage.getItem('userInfo')){
          vm.$router.push('/login')
        }else if(vm.$_.isEmpty(vm.messageValue)){
          vm.$toast('不能发送空值');
          return
        }else if(vm.roomData.guessFlag!='1'){
          vm.$toast('当前房间聊天已关闭');
          return
        }
        else{
          vm.threadPoxi()
        }

//        console.log(vm.messageValue)
      },
      onCancel(){
        const vm = this
      },
      onClickLeft() {
          const vm = this
        vm.$router.push('/')
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
      },
      initWebSocket(){
          //初始化weosocketnew WebSocket("ws://ip:8080/websocket");ws://localhost:8080/websocket
        //ws地址
        const vm = this
if(vm.userToken){
  vm.websock = new WebSocket("ws://47.106.11.246:8086/websocket?chatType=0&roomNumber="+vm.$route.params.id+"&token="+vm.userToken);
  vm.websock.onopen = () => {
          // Web Socket 已连接上，使用 send() 方法发送数据
    let curTime =vm.getNowFormatDate()
    let sendData ={"roomNumber":vm.$route.params.id,"uuid":vm.userData.uuid,"senderPhone":vm.userData.phone,"message":vm.userData.userRank.levelno,'mySendTime':curTime,
      'sendernickname':vm.userData.username,"fristSend":true
    }
//    console.log(JSON.stringify(sendData))
    vm.websock.send(JSON.stringify(sendData));
          console.log('发的消息',JSON.stringify(sendData))
    vm.mySendMessage.push(sendData)

  }



}else {
  vm.websock = new WebSocket("ws://47.106.11.246:8086/websocket?chatType=0&roomNumber="+vm.$route.params.id);
}



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
        console.log('收到的',JSON.parse(e.data))
        let pullData = JSON.parse(e.data)
        if(pullData.chatType!='9'){
          vm.redata = JSON.parse(pullData.msgContent);

          console.log(vm.redata)

          vm.mySendMessage.push(vm.redata)
        }else{

          vm.redata = pullData.msgContent

          console.log('系统消息',vm.redata)

          vm.mySendMessage.push(vm.redata)
        }



      },
        websocketsend(agentData){//数据发送
        const vm = this
          let curTime =vm.getNowFormatDate()
//          let content = document.getElementsByClassName('room_wechatul')[0];
//          content.scrollTop=content.scrollHeight
        let sendData ={"roomNumber":vm.$route.params.id,"uuid":vm.userData.uuid,"senderPhone":vm.userData.phone,"message":agentData,'mySendTime':curTime,
          'sendernickname':vm.userData.username
        }
//        console.log(JSON.stringify(sendData))
        vm.websock.send(JSON.stringify(sendData));
//          console.log('发的消息',JSON.stringify(sendData))
        vm.mySendMessage.push(sendData)
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
//      获取聊天记录
      obChatRecord(){
          const vm = this
        let params={
          roomNumber: vm.$route.params.id,
          pageNumber:1,
          pageSize:10,
        }
        vm.$axios.get(`/chatRecord/queryChatRecordByRoomnumber`,{params})
          .then(response => {
            if (response.status == 200 && response.data) {
              if(response.data.statusCode){
                vm.$dialog.confirm({
                  message: response.data.resultInfo
                }).then(() => {
                  localStorage.removeItem('userInfo')
                  vm.$router.push('/login')
                }).catch(() => {
                  localStorage.removeItem('userInfo')
                  vm.$router.push('/')
                });
              }else{}
              const _list = response.data;
              vm.mySendMessage= [..._list, ...vm.mySendMessage];
//              this.list = [..._list, ...this.list];
              console.log(response.data)
            } else {
              vm.$toast('获取房间信息失败');
            }
          }).catch(response => {

        })
      },
//      websocket () {
//        let ws = new WebSocket('ws://47.92.129.86:8080/websocket');
//        console.log(ws)
//        ws.onopen = () => {
//          // Web Socket 已连接上，使用 send() 方法发送数据
//          console.log('数据发送中...')
//          ws.send('Holle')
//          console.log('数据发送完成')
//        }
//        ws.onmessage = evt => {
//          console.log('数据已接收...')
//        }
//        ws.onclose = function () {
//          // 关闭 websocket
//          console.log('连接已关闭...')
//        }
//        // 路由跳转时结束websocket链接
//        this.$router.afterEach(function () {
//          ws.close()
//        })
//      }


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
//      window.addEventListener("scroll", function(){
//        let content = document.getElementsByClassName('room_wechatul')[0];
//        content.scrollTop=content.scrollHeight
//        console.log('发送列表',content.scrollHeight)
//      });
      vm.$watch('mySendMessage',()=>{
        let content = document.getElementsByClassName('room_wechatul')[0];
//        console.log('scrollHeight',content.scrollHeight)
//        console.log('scrollTop',content.scrollTop)
        content.scrollTop=content.scrollHeight+90

      }, {deep: true})
      vm.$watch('websock',()=>{
        console.log(1)
        if(vm.websock.readyState == 1){
          let curTime =vm.getNowFormatDate()
          let sendData ={"roomNumber":vm.$route.params.id,"uuid":vm.userData.uuid,"senderPhone":vm.userData.phone,"message":vm.userData.userRank.levelno,'mySendTime':curTime,
            'sendernickname':vm.userData.username,"fristSend":true
          }
        console.log(JSON.stringify(sendData))
          vm.websock.send(JSON.stringify(sendData));
//          console.log('发的消息',JSON.stringify(sendData))
          vm.mySendMessage.push(sendData)
        }

      }, {deep: true})

    },
    created () {
      const vm = this
//      vm.obChatRecord()
      if(localStorage.getItem('userInfo')){
              vm.userData = JSON.parse(localStorage.getItem('userInfo'))
      vm.userToken = vm.userData.token
vm.userName = vm.userData.username
      }

//      vm.websocket()

//      vm.creatGet()
      vm.roomId = vm.$route.params.id
//      vm.userData = JSON.parse(localStorage.getItem('userInfo'))
//      vm.userToken = vm.userData.accessToken
      let params = {
        roomnumber: vm.roomId,
//        accessToken: vm.userToken,
      }
      vm.$axios.get(`/api/RoomController/queryRoomByRoomNo`, {params})
        .then(response => {
          if (response.status == 200 && response.data) {
            vm.roomData = response.data.resultInfo
            vm.initWebSocket()
//            console.log(response)
          } else {
            vm.$toast('获取房间信息失败');
          }
        }).catch(response => {

      })
    },
    beforeDestroy () {
      this.websock.onclose
    },
    components: {},
  }
</script>
<style>
</style>
