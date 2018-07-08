<template>
  <div class="mr-root roomDa" v-if="roomData&&!$_.isEmpty(roomData)">
    <van-nav-bar
      :title="roomData.name"
      left-arrow
      @click-left="onClickLeft"
    >
      <van-icon name="add-o" slot="right"/>
    </van-nav-bar>

    <div class="room_topData">
      <!--头部期数信息-->
      <div class="room_topData_up" v-if="gameIssue&&!$_.isEmpty(gameIssue)">
        <div class="room_topData_lift"><span>第<em>{{gameIssue.issue}}</em>期</span>
          <p>
            <yd-countdown :time="gameIssue.duration" :callback="curGameOver" timetype="second" format="{%m}分{%s}秒"></yd-countdown>
          </p>
        </div>
        <div class="room_topData_lift"><span style="display: block">总余额</span>
          <p v-if="moneyData">{{moneyData.balance}}</p><p v-else>--.--</p></div>
      </div>

      <!--下拉查看历史开奖-->
      <van-collapse v-model="activeNames" class="room_topData_down" v-if="gameRecordList&&!$_.isEmpty(gameRecordList)">
        <van-collapse-item name="1">
          <div slot="title" v-if="gameRecordList[0].status=='2'"><span>第 <em>{{gameRecordList[0].issue}}</em> 期
            <i class="numblue_color">{{(gameRecordList[0].note).split("|")[0]}}</i>
            +<i class="numblue_color">{{(gameRecordList[0].note).split("|")[1]}}</i>
            +<i class="num_color">{{(gameRecordList[0].note).split("|")[2]}}</i>
            =<i :class="styleBull(Number((gameRecordList[0].note).split('|')[3]))">
              {{Number((gameRecordList[0].note).split("|")[3])}}
            </i>
            （ <i class="daDan_color" v-if="(gameRecordList[0].resultStr).split('|').indexOf('da')!=-1">大</i>
            <i class="daDan_color" v-if="(gameRecordList[0].resultStr).split('|').indexOf('xiao')!=-1">小</i>

            <i class="daDan_color" v-if="(gameRecordList[0].resultStr).split('|').indexOf('dan')!=-1">单</i>
            <i class="daDan_color" v-if="(gameRecordList[0].resultStr).split('|').indexOf('shuang')!=-1">双</i>）</span>
          </div>
          <div slot="title" v-if="gameRecordList[0].status=='-1'"><span>第 <em>{{gameRecordList[0].issue}}</em> 期
            <i style="color: red;margin-left: 0.5rem">开奖异常</i></span>
          </div>
          <div slot="title" v-if="gameRecordList[0].status=='1'"><span>第 <em>{{gameRecordList[0].issue}}</em> 期
            <i style="color: red;margin-left: 0.5rem">正在开奖</i></span>
          </div>
          <p class="kai_jieguo">开奖结果</p>
          <ul>
            <li v-for="openRecord in gameRecordList.slice(1,10)">
              <template v-if="openRecord.status=='2'">
                <span>
                  第 <em>{{openRecord.issue}}</em> 期
                  <i class="numblue_color">{{(openRecord.note).split("|")[0]}}</i>
              +<i class="numblue_color">{{(openRecord.note).split("|")[1]}}</i>
                +<i class="num_color">{{(openRecord.note).split("|")[2]}}</i>
                  =<i :class="styleBull(Number((openRecord.note).split('|')[3]))">
                  {{Number((openRecord.note).split("|")[3])}}</i>
                  （<i class="daDan_color" v-if="(openRecord.resultStr).split('|').indexOf('da')!=-1">大</i>
            <i class="xiaoShuang_color" v-if="(openRecord.resultStr).split('|').indexOf('xiao')!=-1">小</i>

            <i class="daDan_color" v-if="(openRecord.resultStr).split('|').indexOf('dan')!=-1">单</i>
            <i class="xiaoShuang_color" v-if="(openRecord.resultStr).split('|').indexOf('shuang')!=-1">双</i>）
                </span>
              </template>
              <template v-if="openRecord.status=='-1'"> <span>第 <em>{{openRecord.issue}}</em> 期</span><i style="color: red;margin-left: 0.5rem">开奖异常</i></template>

            </li>
          </ul>
        </van-collapse-item>
      </van-collapse>
    </div>


    <!--聊天信息-->

    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo" class='room_wechatul'>

      <ul style="margin-bottom: 90px;min-height: 400px">
        <p style="width: 100%;text-align: center;color: #00A3CF;margin-bottom: 0.3rem" @click="loadList">
          下拉或点击可查看聊天记录</p>

        <li :class="{right_wechat:mess.sendernickname==userName,lift_wechat:mess.sendernickname!=userName}"
            v-for="mess in mySendMessage">
          <template v-if="mess.sendernickname&&mess.sendernickname!=userName&&!mess.fristSend">

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
          <template v-if="!mess.sendernickname">

            <p style="text-align: center;margin: 0 auto;background-color: #dfdfdf;width: 50%" v-text="mess">
              2018-05-29 09:21</p>

          </template>

          <template v-if="mess.fristSend">
            <p v-text="mess.mySendTime" style="text-align: center;margin: 0 auto;background-color: #dfdfdf;width: 50%">
              2018-05-29 09:21</p>
            <p style="text-align: center;margin: 0.2rem auto;background-color: #dfdfdf;width: 50%">尊贵的
              <img src="../../assets/userRank1.png" alt="" style="width:1rem;height: 0.5rem" v-if="mess.message=='1'">
              <img src="../../assets/userRank2.png" alt="" style="width:1rem;height: 0.5rem" v-if="mess.message=='2'">
              <img src="../../assets/userRank3.png" alt="" style="width:1rem;height: 0.5rem" v-if="mess.message=='3'">
              <img src="../../assets/userRank4.png" alt="" style="width:1rem;height: 0.5rem" v-if="mess.message=='4'">
              <img src="../../assets/userRank5.png" alt="" style="width:1rem;height: 0.5rem" v-if="mess.message=='5'">
              <em style="color: blue">{{mess.sendernickname}}</em> 进入房间</p>
          </template>
          <!--用户自己发的消息-->
          <template v-if="mess.sendernickname&&mess.sendernickname==userName&&!mess.fristSend">
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

<!--底部信息-->
    <div class="footSet">
      <van-button @click="$store.state.show = true" v-if="roomData.guessFlag=='1'">投注</van-button>
      <van-button @click="startGuess" v-if="roomData.guessFlag!='1'" class="disButton">投注</van-button>
      <van-button @click="recallMenu=true">
        撤单
      </van-button>
      <van-cell-group>
        <van-field v-model="messageValue" placeholder="发送聊天" @keydown.enter="sendMess" v-if="roomData.guessFlag=='1'"/>
        <van-field  placeholder="房间禁言中" disabled v-if="roomData.guessFlag!='1'"/>
      </van-cell-group>

      <van-button class="send_button" @click="sendMess" v-if="messageValue">
        发送
      </van-button>
      <van-button class="nosend_button"  v-if="!messageValue">
        发送
      </van-button>
    </div>
   <!--下注组件-->
    <userBetsCom :gameid =gameIssue.id v-if="gameIssue&&!$_.isEmpty(gameIssue)"> </userBetsCom>
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
            <td width="20%" class="recallMenu_but" @click="toRecall(n)"><span>撤单</span></td>
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
  import userBetsCom from '../../components/userBets.vue'
  Vue.component(PullRefresh.name, PullRefresh);
  Vue.component(CountDown.name, CountDown);
  export default{
    name: 'roomDetail',
    data () {
      return {
        sumRandomNum:Math.floor(Math.random()*28),
        gameOdd:null,//获取房间赔率
        moneyData:null,//获取用户余额
        gameIssue: null,//房间游戏期次
        gameRecordList: null,//开奖记录
        page: 1,
        userData: null,
        userName: null,
        redBall: [1, 2, 7, 8, 12, 13, 18, 19, 23, 24],
        blueBall: [3, 4, 9, 10, 14, 15, 20, 25, 26],
        greenBall: [5, 6, 11, 16, 17, 21, 22, 27],
        userRankImg: {
          '1': '../../assets/userRank1.png',
          '2': '../../assets/userRank2.png',
          '3': '../../assets/userRank3.png',
          '4': '../../assets/userRank4.png',
          '5': '../../assets/userRank5.png',
        },
        mySendMessage: [],
        othersSendMessage: [],
        curChosBallOne: 1,//当前选中球1
        curChosBallTwo: 1,//当前选中球2
        touzhuType: 1,
        touzhuNum: null,
        recallMenu: false,
        showCustomAction: false,
        activeNames: ['2'],
        roomId: null,
        userToken: null,
        roomData: null,
        websock: null,
        messageValue: null,//websock要发送的值

      }
    },
    methods: {
      //        数字求的颜色
      styleBull(num){
        const vm = this
        if( vm.redBall.indexOf(num)!=-1){
          return  'lastNumRed_color'
        }else if(vm.greenBall.indexOf(num)!=-1){
          return  'lastNumBlue_color'
        }else if(vm.blueBall.indexOf(num)!=-1) {
          return  'lastNumGre_color'
        }
      },
        //当期游戏倒计时走完，封盘
      curGameOver(){
        const vm = this
        console.log('当期游戏倒计时走完，封盘')
                setTimeout(function () {
                  //     封盘后 刷新当前游戏期次
                  vm.obGameIssue()
                  //     封盘后 刷新开奖记录
                  vm.obGameRecord()
        }, 100);
        return
      },
      loadList() {
        const vm = this
        let params = {
          roomNumber: vm.$route.params.id,
          pageNo: this.page,
          pageSize: 10,
        }
        const url = 'api/chatRecord/queryChatRecordByRoomnumber';

        vm.$axios.get(url, {params}).then((response) => {

            const _list = (response.data.resultInfo || []).map(a => JSON.parse(a.msgContent));
            _list.reverse()
            vm.mySendMessage = [..._list, ...vm.mySendMessage];
            vm.$toast(_list.length > 0 ? '为您更新了' + _list.length + '条内容' : '已是最新内容');
            vm.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
//
            vm.page++;

        });
      },
      loadListOne() {
        const vm = this
        let params = {
          roomNumber: vm.$route.params.id,
          pageNo: this.page,
          pageSize: 10,
        }
        const url = 'api/chatRecord/queryChatRecordByRoomnumber';

        vm.$axios.get(url, {params}).then((response) => {
          const _list = (response.data.resultInfo || []).map(a => JSON.parse(a.msgContent));
          _list.reverse()
          vm.mySendMessage = [..._list, ...vm.mySendMessage];
          vm.page++;
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
        if (!localStorage.getItem('userInfo')) {
          vm.$router.push('/login')
        } else if (vm.$_.isEmpty(vm.messageValue)) {
          vm.$toast('不能发送空值');
          return
        } else if (vm.roomData.guessFlag != '1') {
          vm.$toast('当前房间聊天已关闭');
          return
        }
        else {
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
      threadPoxi(){
          // 实际调用的方法
        const vm = this
        const agentData = vm.messageValue;
        vm.messageValue = null
//       vm.mySendMessage.push(agentData)
//        console.log(vm.mySendMessage)
//        vm.websocketsend(agentData)
        //若是ws开启状态
        if (vm.websock.readyState == 1) {
          vm.websocketsend(agentData)

        } else {
          vm.$toast('聊天还未建立');
          vm.initWebSocket()
        }
      },
      initWebSocket(){
        //初始化weosocketnew WebSocket("ws://ip:8080/websocket");ws://localhost:8080/websocket
        //ws地址
        const vm = this
        if (vm.userToken) {
          vm.websock = new WebSocket("ws://47.106.11.246:8086/websocket?chatType=0&roomNumber=" + vm.$route.params.id + "&token=" + vm.userToken);
          vm.websock.onopen = () => {
            // Web Socket 已连接上，使用 send() 方法发送数据
            let curTime = vm.getNowFormatDate()
            let sendData = {
              "roomNumber": vm.$route.params.id,
              "uuid": vm.userData.uuid,
              "senderPhone": vm.userData.phone,
              "message": vm.userData.userRank.levelno,
              'mySendTime': curTime,
              'sendernickname': vm.userData.username,
              "fristSend": true
            }
//    console.log(JSON.stringify(sendData))
            vm.websock.send(JSON.stringify(sendData));
            console.log('发的消息', JSON.stringify(sendData))
            vm.mySendMessage.push(sendData)

          }


        } else {
          vm.websock = new WebSocket("ws://47.106.11.246:8086/websocket?chatType=0&roomNumber=" + vm.$route.params.id);
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
        console.log('收到的', JSON.parse(e.data))
        let pullData = JSON.parse(e.data)
        if (pullData.chatType != '9') {
          vm.redata = JSON.parse(pullData.msgContent);

//          console.log(vm.redata)

          vm.mySendMessage.push(vm.redata)
        } else {

          vm.redata = pullData.msgContent

          console.log('系统消息', vm.redata)

          vm.mySendMessage.push(vm.redata)
        }


      },
      websocketsend(agentData){//数据发送
        const vm = this
        let curTime = vm.getNowFormatDate()

        let sendData = {
          "roomNumber": vm.$route.params.id,
          "uuid": vm.userData.uuid,
          "senderPhone": vm.userData.phone,
          "message": agentData,
          'mySendTime': curTime,
          'sendernickname': vm.userData.username
        }
//        console.log(JSON.stringify(sendData))
        vm.websock.send(JSON.stringify(sendData));
//          console.log('发的消息',JSON.stringify(sendData))
        vm.mySendMessage.push(sendData)
      },
      websocketclose(e){  //关闭
        console.log("connection closed (" + e.code + ")");
      },
//      获取开奖记录
      obGameRecord(){
        const vm = this
        let params = {
          roomNumber: vm.$route.params.id,
          pageSize: 10,
          pageNo: 1,
        }
        vm.$axios.get(`/api/bet/getRoomGameRecord`, {params})
          .then(response => {
            if (response.status == 200 && response.data) {
              vm.gameRecordList = response.data.resultInfo

            } else {
              vm.$toast('获取开奖历史失败');
            }
          }).catch(response => {

        })
      },

//      获取房间 当前游戏期次
      obGameIssue(){
        const vm = this
        let params = {
          roomNumber: vm.$route.params.id,
        }
        vm.$axios.get(`/api/bet/getGameIssue`, {params})
          .then(response => {
            if (response.status == 200 && response.data) {
              vm.gameIssue = response.data.resultInfo
//console.log('1',response.data.resultInfo)
            } else {
              vm.$toast('获取开奖历史失败');
            }
          }).catch(response => {

        })
      },

      //      获取房间 赔率
      obGameOdd(){
        const vm = this
        let params = {
          roomId : vm.$route.params.id,
        }
        vm.$axios.get(`/api/bet/getGameOdd`, {params})
          .then(response => {
            if (response.status == 200 && response.data) {
              vm.gameOdd= response.data.resultInfo
console.log('1',response)
            } else {
              vm.$toast('获取赔率失败');
            }
          }).catch(response => {

        })
      },

      //      用户下注
//      userBets(){
//        const vm = this
//        if(!localStorage.getItem('userInfo')){
//          vm.$router.push('/login')
//          return
//        }
//        let params = {
//         roomId : vm.$route.params.id,
//       gameId:'fb760bc3e97b4ffea3ba1f6205b90566',
//        gameUserId:'22ee28f074994530a62cbf919cf05252',
//       point:25.5,
//        da:1
//        }
//        vm.$axios.get(`/user/bet/userBet`, {params})
//          .then(response => {
//            if (response.status == 200 && response.data) {
//              if(response.data.statusCode){
//                vm.$dialog.confirm({
//                  message: response.data.resultInfo
//                }).then(() => {
//                  localStorage.removeItem('userInfo')
//                  vm.$router.push('/login')
//                }).catch(() => {
//                  localStorage.removeItem('userInfo')
//                  vm.$router.push('/')
//                });
//              }else{
//                vm.gameOdd= response.data.resultInfo
//                console.log('1',response)
//              }
//
//            } else {
//              vm.$toast('获取赔率失败');
//            }
//          }).catch(response => {
//
//        })
//      },

      //      获取用户账户余额
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

      vm.$watch('mySendMessage', () => {
        let content = document.getElementsByClassName('room_wechatul')[0];
//        console.log('scrollHeight',content.scrollHeight)
//        console.log('scrollTop',content.scrollTop)
        content.scrollTop = content.scrollHeight + 90

      }, {deep: true})


    },
    created () {
      const vm = this
//      vm.obChatRecord()
      if (localStorage.getItem('userInfo')) {
        vm.userData = JSON.parse(localStorage.getItem('userInfo'))
        vm.userToken = vm.userData.token
        vm.userName = vm.userData.username
        //登陆用户获取用户余额
        vm.obMoney()
      }
      // 获取房间游戏期次
      vm.obGameIssue()
//      获取开奖记录
      vm.obGameRecord()


      vm.roomId = vm.$route.params.id

      let params = {
        roomnumber: vm.roomId,
      }
      vm.$axios.get(`/api/RoomController/queryRoomByRoomNo`, {params})
        .then(response => {
          if (response.status == 200 && response.data) {
            vm.roomData = response.data.resultInfo

            //      获取10条记录  以下都要写在获取到房间数据之后  以为外部有v-if
            vm.loadListOne()
            vm.initWebSocket()
            //      获取房间 赔率
            vm.obGameOdd()
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
    components:{
      userBetsCom
    },
  }
</script>
<style>
</style>
