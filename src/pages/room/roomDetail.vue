<template>
  <div class="mr-root roomDa willy_roomDaBox" v-if="roomData&&!$_.isEmpty(roomData)">
    <van-nav-bar
      :title="roomData.name"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="add-o" slot="right"/>
    </van-nav-bar>


    <!--顶部下拉菜单-->
    <div class="ob_moreOperate_content" v-if="RoomTopSelectShow">
      <van-cell title="玩法规则" />
      <van-cell title="赔率说明" />
      <van-cell title="交易记录"/>
      <van-cell title="统计记录" />
      <van-cell title="个人中心 " />
      <van-cell title=" 在线客服" />
    </div>
    <div class="room_topData">
      <!--头部期数信息-->
      <div class="room_topData_up">
        <div class="room_topData_lift"  v-if="gameIssue&&!$_.isEmpty(gameIssue)">
          <span>第<em v-if="gameIssue.issueApi">{{gameIssue.issueApi}}</em>
                <em v-if="!gameIssue.issueApi&&gameRecordList&&!$_.isEmpty(gameRecordList)">{{gameRecordList[0].issueApi}}</em>期
          </span>
          <p v-if="isCanBet">
            <yd-countdown :time="overGameTime" :callback="curGameOver" done-text="封盘中" timetype="second" format="{%m}分{%s}秒"></yd-countdown>
          </p>
          <p v-if="!isCanBet">
          {{fengPanIngText}}
          </p>
        </div>
        <div class="room_topData_lift"><span style="display: block">总余额</span>
          <p v-if="moneyData">{{moneyData.balance}}</p><p v-else>--.--</p></div>
      </div>

      <!--下拉查看历史开奖-->
      <van-collapse v-model="activeNames" class="room_topData_down" v-if="gameRecordList&&!$_.isEmpty(gameRecordList)">
        <van-collapse-item name="1">
          <div slot="title" v-if="gameRecordList[0].status=='2'"><span class="willy_yuan">第 <em>{{gameRecordList[0].issueApi}}</em> 期
            <i :class="styleBullThree((gameRecordList[0].note).split('|')[0])">{{(gameRecordList[0].note).split("|")[0]}}</i>
            +<i :class="styleBullThree((gameRecordList[0].note).split('|')[1])">{{(gameRecordList[0].note).split("|")[1]}}</i>
            +<i :class="styleBullThree((gameRecordList[0].note).split('|')[2])">{{(gameRecordList[0].note).split("|")[2]}}</i>
            =<i :class="styleBull(Number((gameRecordList[0].note).split('|')[3]))">
              {{Number((gameRecordList[0].note).split("|")[3])}}
            </i>
            ( <i class="daDan_color" v-if="(gameRecordList[0].resultStr).split('|').indexOf('da')!=-1">大</i>
            <i class="xiaoShuang_color" v-if="(gameRecordList[0].resultStr).split('|').indexOf('xiao')!=-1">小</i>

            <i class="daDan_color" v-if="(gameRecordList[0].resultStr).split('|').indexOf('dan')!=-1">单</i>
            <i class="xiaoShuang_color" v-if="(gameRecordList[0].resultStr).split('|').indexOf('shuang')!=-1">双</i>)</span>
          </div>
          <div slot="title" v-if="gameRecordList[0].status=='-1'"><span>第 <em>{{gameRecordList[0].issueApi}}</em> 期
            <i style="color: red;margin-left: 0.5rem">开奖异常</i></span>
          </div>
          <div slot="title" v-if="gameRecordList[0].status=='1'"><span>第 <em>{{gameRecordList[0].issueApi}}</em> 期
            <i style="color: red;margin-left: 0.5rem">正在开奖</i></span>
          </div>
          <p class="kai_jieguo">开奖结果</p>
          <ul class="willy_kaijiang">
            <li v-for="openRecord in gameRecordList.slice(1,10)">
              <template v-if="openRecord.status=='2'">
                <span class="willy_yuan">
                  第 <em>{{openRecord.issueApi}}</em> 期
                  <i :class="styleBullThree((openRecord.note).split('|')[0])">{{(openRecord.note).split("|")[0]}}</i>
              +<i :class="styleBullThree((openRecord.note).split('|')[1])">{{(openRecord.note).split("|")[1]}}</i>
                +<i :class="styleBullThree((openRecord.note).split('|')[2])">{{(openRecord.note).split("|")[2]}}</i>
                  =<i :class="styleBull(Number((openRecord.note).split('|')[3]))">
                  {{Number((openRecord.note).split("|")[3])}}</i>
                  (<i class="daDan_color" v-if="(openRecord.resultStr).split('|').indexOf('da')!=-1">大</i>
            <i class="xiaoShuang_color" v-if="(openRecord.resultStr).split('|').indexOf('xiao')!=-1">小</i>

            <i class="daDan_color" v-if="(openRecord.resultStr).split('|').indexOf('dan')!=-1">单</i>
            <i class="xiaoShuang_color" v-if="(openRecord.resultStr).split('|').indexOf('shuang')!=-1">双</i>)
                </span>
              </template>
              <template v-if="openRecord.status=='-1'"> <span>第 <em>{{openRecord.issueApi}}</em> 期</span><i style="color: red;margin-left: 0.5rem">开奖异常</i></template>

            </li>
          </ul>
        </van-collapse-item>
      </van-collapse>
    </div>


    <!--聊天信息-->

    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo" class='room_wechatul'>

      <ul style="min-height: 400px" class="willy_ltulli">
        <p style="width: 100%;text-align: center;color: #00A3CF;margin-bottom: 0.3rem" @click="loadList">
          下拉或点击可查看聊天记录</p>

        <li :class="{right_wechat:mess.sendernickname==userName,lift_wechat:mess.sendernickname!=userName}"
            v-for="mess in mySendMessage">
          <!--别人发的消息--lift-->
          <template v-if="mess.sendernickname&&mess.sendernickname!=userName&&!mess.fristSend&&!mess.betsSend">

            <p class="willy_time" style="text-align: center;margin: 0 auto;background-color: #dfdfdf;width: 55%;padding: 0.1rem 0.3rem">
              <span v-text="mess.mySendTime" >2018-05-29 09:21</span></p>
            <p style="text-align: left;margin-left: 1rem;color: #ce5c4d">{{mess.sendernickname}}</p>
            <a v-if="mess.photourl">
              <img :src="mess.photourl" alt="" class="touxiangImg">
            </a>
            <a v-else>
              <img src="../../assets/qq.png" alt="" class="touxiangImg">
            </a>
            <span style="color: black">{{mess.message}}</span>

          </template>
<!--用户收到的别人的投注信息-->
          <template v-if="mess.sendernickname&&mess.sendernickname!=userName&&mess.betsSend">
            <p class="willy_time" style="text-align: center;margin: 0 auto;background-color: #dfdfdf;width: 55%;padding: 0.1rem 0.3rem" >
              <span v-text="mess.mySendTime" >2018-05-29 09:21</span></p>
            <p class="willy_Home_name" v-text="mess.sendernickname" style="text-align: left;margin-left: 1rem;color: #ce5c4d">张三</p>
            <a v-if="mess.photourl">
              <img :src="mess.photourl" alt="" class="touxiangImg">
            </a>
            <a v-else>
              <img src="../../assets/qq.png" alt="" class="touxiangImg">
            </a>

            <div class="betChat_class willy_betChat">
              <div class="willy_betChat_div" style="background-color:#ff7f00 ">
                {{JSON.parse(mess.message).gameQi}}期  <em>总计￥{{JSON.parse(mess.message).totleAmt}}</em>
              </div>
              <p style="background-color:white " v-for="ball in (JSON.parse(mess.message).betStr).split(',')">
                <b v-if="ball.indexOf('tema')!=-1">特码-{{ball.substr(4,ball.length)}}</b>
                <b v-if="ball.indexOf('tema')==-1">{{ballType[ball]}}</b>
                <em><i>{{JSON.parse(mess.message).ballOdd}}</i>x <i>￥{{JSON.parse(mess.message).point}}</i> </em>
              </p>

            </div>

          </template>
          <!--系统消息 -1 开奖失败  1 封盘  2开奖结果 3封盘中倒计时 4 开始下注 -2是维护  生成期号了会给你发消息的status 是0 -->

          <template v-if="!mess.sendernickname">

            <div class="willy_xiaoxi" v-if="mess.status=='1'">
              <p style="color:  #e1171b;font-size: 0.35rem">封盘消息</p>
              <p> <em style="color:  #e1171b">[ {{mess.expect}}期 ] </em>本期结束投注,稍后将开启下期投注!</p>
             </div>
            <div class="willy_xiaoxi" v-if="mess.status=='2'">
              <p style="color: #587cbe;font-size: 0.35rem">开奖结果</p>
              <p> <em style="color:  #e1171b">[ {{mess.expect}}期 ] </em>开奖结果：{{(mess.content).split("|")[0]}}+{{(mess.content).split("|")[1]}}+{{(mess.content).split("|")[2]}}={{(mess.content).split("|")[3]}}
              <i class="" v-if="(gameRecordList[0].resultStr).split('|').indexOf('da')!=-1">大</i>
            <i class="" v-if="(gameRecordList[0].resultStr).split('|').indexOf('xiao')!=-1">小</i>

            <i class="" v-if="(gameRecordList[0].resultStr).split('|').indexOf('dan')!=-1">单</i>
            <i class="" v-if="(gameRecordList[0].resultStr).split('|').indexOf('shuang')!=-1">双</i>
              </p>
            </div>
            <div class="willy_xiaoxi" v-if="mess.status=='-1'">
              <p style="color: #587cbe;font-size: 0.35rem">开奖结果</p>
              <p> <em style="color:  #e1171b">[ {{mess.expect}}期 ] </em> 开奖失败</p>
            </div>
            <div class="willy_xiaoxi" v-if="mess.status=='3'">
              <p>系统消息</p>
              <p> <em style="color:  #e1171b">[ {{mess.expect}}期 ] </em>距离封盘还有{{mess.time}}秒！</p>
            </div>
            <div class="willy_xiaoxi" v-if="mess.status=='4'">
              <p style="color:  #02ad3f;font-size: 0.3rem">开始下注</p>
              <p class="willy_hs"> <em style="color:  #e1171b">[ {{mess.expect}}期 ] </em>开始下注！感谢您的支持捧场，祝君好运。</p>
            </div>
          </template>
<!--用户进入房间个人等级消息-->
          <template v-if="mess.fristSend">
            <p class="willy_time" style="text-align: center;margin: 0 auto;background-color: #dfdfdf;width: 50%;padding: 0.1rem 0.3rem;">
              <span v-text="mess.mySendTime" >2018-05-29 09:21</span></p>
            <p class="willy_on" style="text-align: center;margin: 0.2rem auto;width: 50%">
              <span class="willy_on_span">
              尊贵的
              <img src="../../assets/userRank1.png" alt="" style="width:1.5rem;" v-if="mess.message=='1'">
              <img src="../../assets/userRank2.png" alt="" style="width:1.5rem;" v-if="mess.message=='2'">
              <img src="../../assets/userRank3.png" alt="" style="width:1.5rem;" v-if="mess.message=='3'">
              <img src="../../assets/userRank4.png" alt="" style="width:1.5rem;" v-if="mess.message=='4'">
              <img src="../../assets/userRank5.png" alt="" style="width:1.5rem;" v-if="mess.message=='5'">
              <em style="color: blue">{{mess.sendernickname}}</em> 进入房间</span>
            </p>
          </template>
          <!--用户自己发的消息-->
          <template v-if="mess.sendernickname&&mess.sendernickname==userName&&!mess.fristSend&&!mess.betsSend">
            <p class="willy_time" style="text-align: center;margin: 0 auto;background-color: #dfdfdf;width: 55%;padding: 0.1rem 0.3rem" >
              <span v-text="mess.mySendTime" >2018-05-29 09:21</span></p>
            <p v-text="mess.sendernickname" style="text-align: right;margin-right: 1rem;color: #ce5c4d">张三</p>
            <a v-if="mess.photourl">
              <img :src="mess.photourl" alt="" class="touxiangImg">
            </a>
            <a v-else>
              <img src="../../assets/qq.png" alt="" class="touxiangImg">
            </a>
            <span>{{mess.message}}</span>
          </template>

          <!--用户投注信息-->
          <template v-if="mess.sendernickname&&mess.sendernickname==userName&&mess.betsSend">
            <p class="willy_time" style="text-align: center;margin: 0 auto;background-color: #dfdfdf;width: 55%;padding: 0.1rem 0.3rem" >
              <span v-text="mess.mySendTime" >2018-05-29 09:21</span></p>
            <p v-text="mess.sendernickname" style="text-align: right;margin-right: 1rem;color: #ce5c4d">张三</p>
            <a v-if="mess.photourl">
              <img :src="mess.photourl" alt="" class="touxiangImg">
            </a>
            <a v-else>
              <img src="../../assets/qq.png" alt="" class="touxiangImg">
            </a>

              <div class="betChat_class willy_betChat">
<div class="willy_betChat_div" style="background-color:#ff7f00 ">
{{JSON.parse(mess.message).gameQi}}期  <em>总计￥{{JSON.parse(mess.message).totleAmt}}</em>
</div>
                <p style="background-color:white " v-for="ball in (JSON.parse(mess.message).betStr).split(',')">
                  <b v-if="ball.indexOf('tema')!=-1">特码-{{ball.substr(4,ball.length)}}</b>
                  <b v-if="ball.indexOf('tema')==-1">{{ballType[ball]}}</b>
                  <em><i>{{JSON.parse(mess.message).ballOdd}}</i>x<i>￥{{JSON.parse(mess.message).point}}</i> </em>
                </p>

            </div>

          </template>
          <div style="clear:both"></div>
        </li>

      </ul>

    </yd-pullrefresh>

<!--底部信息-->
    <div class="footSet">
      <!-- <van-button @click="$store.state.show = true" v-if="roomData.guessFlag=='1'&&isCanBet">投注</van-button> -->
      <van-button @click="startGuessOk" v-if="roomData.guessFlag=='1'&&isCanBet">投注</van-button>
       <!--<van-button @click="$store.state.show = true" v-if="true">投注</van-button>-->
      <van-button @click="startGuess" v-else class="disButton">投注</van-button>
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
    <userBetsCom ref="refWilly" :gameid =gameIssue.id :gameQi="gameIssue.issueApi" :gameOdd="gameOdd" v-show="gameOdd&&gameIssue&&!$_.isEmpty(gameIssue)" @betsBall="betsBall"> </userBetsCom>
    <van-actionsheet v-model="recallMenu" title="撤单" class="touzhu_actionbac chedan_actionbac">
      <div class="recallMenu_action">
        <table class="ob_pay_record_table">
          <tr>
            <th width="30%">期号</th>
            <th width="20%">投注内容</th>
            <th width="30%">金额</th>
            <th width="20%">操作</th>
          </tr>
          <template v-for="bet in userBetList" v-if="userBetList&&!$_.isEmpty(userBetList)">
          <tr  v-if="bet.gameId==gameIssue.id&&isCanBet&&bet.delFlag==0">

              <td width="30%">{{bet.issueApi}}</td>
              <td width="20%" v-if="(bet.betStr).indexOf('tema')==-1">{{ballType[bet.betStr]}}</td>
              <td width="20%" v-if="(bet.betStr).indexOf('tema')!=-1">特码 - {{bet.betStr.substr(4,bet.betStr.length)}}</td>
              <!--如果为充值，则颜色添加红色，添加样式pay_money-->
              <td width="30%" class="pay_money">{{bet.totleAmt}}</td>
              <td width="20%" class="recallMenu_but" @click="cancleBet(bet.gameId,bet.id)"><span>撤单</span></td>

            <!--<td width="20%" class="recallMenu_but"  v-if="bet.delFlag==1"><span>已撤单</span></td>-->
          </tr>
          </template>

        </table>

      </div>
    </van-actionsheet>
    <!-- 下注 -->
    <!-- <div class="orderButton"><img src="../../assets/orderButton.png" alt=""></div> -->
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
        AllhomeData:null,//关键词
        fengPanIngText:'封盘中',
        userBetList:null,//用户下注历史
        overGameTime:5,
          isCanBet:false,
        gameOdd:null,//获取房间赔率
        moneyData:null,//获取用户余额
        gameIssue: null,//房间游戏期次
        gameRecordList: null,//开奖记录
        page: 1,
        userData: null,
        userName: null,
        redBall: [1, 2, 7, 8, 12, 13, 18, 19, 23, 24],
        blueBall: [3, 4, 9, 10, 14, 15, 20, 25, 26],
        greenBall: [0,5, 6, 11, 16, 17, 21, 22, 27],
        userRankImg: {
          '1': '../../assets/userRank1.png',
          '2': '../../assets/userRank2.png',
          '3': '../../assets/userRank3.png',
          '4': '../../assets/userRank4.png',
          '5': '../../assets/userRank5.png',
        },
        ballType:{
          'da':'大',
          'dadan':'大单',
          'dan':'单',
          'xiaodan':'小单',
          'jida':'极大',
          'xiao':'小',
          'shuang':'双',
          'dashuang':'大双',
          'xiaoshuang':'小双',
          'jixiao':'极小',
          'hongbo':'红波',
          'lanbo':'蓝波',
          'lvbo':'绿波',
          'baozi':'豹子',
          'shunzi':'顺子',
          'duizi':'对子',
        },
        mySendMessage: [],

        recallMenu: false,
        showCustomAction: false,
        activeNames: ['2'],
        roomId: null,
        userToken: null,
        roomData: null,
        websock: null,
        messageValue: null,//websock要发送的值
        // willy
        clickLoadMore: false,
        oldRoom_wechatulHeight:'',
        loadRoom_wechatulHeight:'',
        RoomTopSelectShow: false
      }
    },
    computed:{

    },
    methods: {
    // 设置筹码默认位置
    startGuessOk() {
        this.$store.state.show = true
        this.$refs.refWilly.cmScrollLeft()
    },
        //子组件用户下注成功要发送消息
      betsBall(bet){
        const vm = this
        //下注成功要刷新余额  和下注历史
        vm.obMoney()
        vm.obUserBetList()
        let curTime = vm.getNowFormatDate()
        let sendData = {
          "roomNumber": vm.$route.params.id,
          "uuid": vm.userData.uuid,
          "senderPhone": vm.userData.phone,
          "message": bet,
          'mySendTime': curTime,
          'sendernickname': vm.userData.username,
          "betsSend": true
        }

        vm.websock.send(JSON.stringify(sendData));
        console.log('发的消息', JSON.stringify(sendData))
        vm.mySendMessage.push(sendData)
      },
      //        数字求的颜色
      styleBull(num){
        const vm = this
        if( vm.redBall.indexOf(num)!=-1){
          return  'lastNumRed_color'
        }else if(vm.greenBall.indexOf(num)!=-1){
          return  'lastNumGre_color'
        }else if(vm.blueBall.indexOf(num)!=-1) {
          return   'lastNumBlue_color'
        }
      },
      //        前面三个数字求的颜色
      styleBullThree(num){
        const vm = this
        if( vm.redBall.indexOf(Number(num))!=-1){
          return  'num_color'
        }else if(vm.greenBall.indexOf(Number(num))!=-1){
          return  'numGre_color'
        }else if(vm.blueBall.indexOf(Number(num))!=-1) {
          return   'numblue_color'
        }
      },
        //当期游戏倒计时走完，封盘
      curGameOver(){
        const vm = this
vm.isCanBet=false

      },
      loadList() {
        const vm = this
        const toast1 = vm.$toast.loading({
          mask: true,
          duration: 10000,       // 持续展示 toast
          message: ''
        });
        vm.clickLoadMore = true
        vm.oldRoom_wechatulHeight = document.getElementsByClassName('willy_ltulli')[0].clientHeight;
        console.log(vm.oldRoom_wechatulHeight)
        let params = {
          roomNumber: vm.$route.params.id,
          pageNo: this.page,
          pageSize: 10,
        }
        const url = 'api/chatRecord/queryChatRecordByRoomnumber';

        vm.$axios.get(url, {params}).then((response) => {
          toast1.clear();
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
        const toast1 = vm.$toast.loading({
          mask: true,
          duration: 10000,       // 持续展示 toast
          message: ''
        });
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
          toast1.clear();
        });
      },
      startGuess(){
        const vm = this
//        vm.$toast('当前竞猜已关闭');
        vm.$dialog.alert({
          title: '友情提示',
          message: '已封盘，禁止提示'
        });
      },
      toRecall(){
        const vm = this
        vm.$toast('撤单成功');
      },
      sendMess(){
        const vm = this
        vm.clickLoadMore = false
        if (!localStorage.getItem('userInfo')) {
          vm.$router.push('/login')
        } else if (vm.$_.isEmpty(vm.messageValue)) {
          vm.$toast('不能发送空值');
          return
        } else if (vm.roomData.guessFlag != '1') {
          vm.$toast('当前房间聊天已关闭');
          return
        }else if(!vm.$_.isEmpty(vm.userData)&&vm.userData.chatstatus=='1'){
          vm.$toast('该账号已被禁言');
          return
        }
        else {
          vm.threadPoxi()
        }


      },
      onCancel(){
        const vm = this
      },
      onClickLeft() {
        const vm = this
        vm.$router.push('/')
      },
      onClickRight() {
        this.RoomTopSelectShow = !this.RoomTopSelectShow
      },
      threadPoxi(){
          // 实际调用的方法
        const vm = this
        const agentData = vm.messageValue;
        vm.messageValue = null

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



          vm.mySendMessage.push(vm.redata)
        } else {

          vm.redata = JSON.parse(pullData.msgContent)
          //收到开奖消息后刷新当前游戏其次和历史
if( vm.redata.status=='2'){
  setTimeout(function () {
    if (localStorage.getItem('userInfo')) {
      vm.obMoney()
    }

    //     刷新当前游戏期次
    vm.obGameIssue()
    //     刷新开奖记录
    vm.obGameRecord()
  }, 1000);

}
          if( vm.redata.status=='-2'){
            setTimeout(function () {
            vm.fengPanIngText='维护中'
            }, 100);

          }

          console.log('系统消息', vm.redata)

          vm.mySendMessage.push(vm.redata)
        }


      },
      websocketsend(agentData){//数据发送
        const vm = this
        let curTime = vm.getNowFormatDate()


          let roomKeyWords=vm.AllhomeData.roomKeyWordsShielding
          const roomKeyWordsArr = roomKeyWords.split('|');
          console.log(roomKeyWordsArr)
          roomKeyWordsArr.forEach(key=>{
                        let reg = new RegExp("(" + key + ")", "g");
            let str = agentData.replace(/ /g,'');
            vm.newstr = str.replace(reg, "**");
          })


if(vm.newstr==''){
  vm.$toast('不能发送空值');
          return
}
        let sendData = {
          "roomNumber": vm.$route.params.id,
          "uuid": vm.userData.uuid,
          "senderPhone": vm.userData.phone,
          "message": vm.newstr,
          'mySendTime': curTime,
          'sendernickname': vm.userData.username
        }

        vm.websock.send(JSON.stringify(sendData));

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
              vm.$nextTick(function () {
                //              如果用户登录需要获取投注历史
                if(vm.userData&&!vm.$_.isEmpty(vm.userData)){
                  vm.obUserBetList()
                }
              })
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
if(response.data.statusCode=='-2'){
  vm.fengPanIngText='维护中'
  return
}
              if(vm.gameIssue.duration&&vm.gameIssue.duration>0){
                vm.redata = {
                  content: "开始下注",
                  expect: vm.gameIssue.issueApi,
                  status: "4"
                }
                vm.fengPanIngText='封盘中'
                vm.mySendMessage.push(vm.redata)
                vm.overGameTime=vm.gameIssue.duration
                vm.isCanBet=true
              }
              vm.secondsTime = JSON.parse(JSON.stringify(vm.gameIssue)).duration
              vm._timer = setInterval(function () {
                vm.secondsTime = vm.secondsTime  - 1

                if( vm.secondsTime ==30){
                  vm.redata = {
                    content: "系统消息",
                    expect: vm.gameIssue.issueApi,
                    time:30,
                    status: "3"
                  }
                  vm.mySendMessage.push(vm.redata)
                }
                else if( vm.secondsTime ==10){
                  vm.redata = {
                    content: "系统消息",
                    expect: vm.gameIssue.issueApi,
                    time:10,
                    status: "3"
                  }
                  vm.mySendMessage.push(vm.redata)
                }
                else if (vm.secondsTime == 1) {                  //当num变为1的时候，通过 clearInterval()结束倒计时
                  clearInterval(vm._timer);
                }
              }, 1000)


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
          roomNumber: vm.$route.params.id,
        }
        vm.$axios.get(`/api/bet/getGameOdd`, {params})
          .then(response => {
            if (response.status == 200 && response.data) {
              vm.gameOdd= response.data.resultInfo

            } else {
              vm.$toast('获取赔率失败');
            }
          }).catch(response => {

        })
      },



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
//取消下注
cancleBet(e,id){
  const vm = this
  let params ={
    token: vm.userData.token,
      roomId : vm.$route.params.id,
      gameId:e,
    gameBetId:id,
  }

  vm.$axios.get(`/user/bet/userBetCancel`, {params})
    .then(response => {
      if (response.status == 200 && response.data) {
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
        }else if(response.data.statusCode==-200){
          vm.$toast(response.data.resultInfo);
        }else{
            //撤单成功刷新余额 和投注历史
            vm.obUserBetList()
          vm.obMoney()
          vm.$toast('撤单成功');
        }

      } else {
        vm.$toast('撤单失败');
      }
    }).catch(response => {

  })

},

      //用户下注历史
      obUserBetList(){
        const vm = this
        let params ={
    token: vm.userData.token,
          pageSize:10,
          pageNo:1,
//          gameId:vm.gameIssue.id ||vm.gameRecordList[0].id,
        }


        vm.$axios.get(`/user/bet/userBetList`, {params})
          .then(response => {
            if (response.status == 200 && response.data) {
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
              }else if(response.data.statusCode==-200){
                console.log("获取下注历史")
              }else{
                  if(response.data.statusCode==1){
                    vm.userBetList=response.data.resultInfo
                  }

              }

            } else {
              console.log("获取下注历史失败")
            }
          }).catch(response => {

        })

      },
      //获取首页数据
      obAllData(){
        const vm = this
        vm.$axios.get(`/api/OperationalSetController/queryOperationalSetInfo`)
          .then(response => {
//            toast1.clear();
//            console.log(response.data)
            if (response.status == 200 && response.data) {
              vm.AllhomeData = response.data

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

      vm.$watch('mySendMessage', () => {
        // 为false设置滚动条（点击下拉或点击可查看聊天记录,不设置滚动条到底部）
        if (!vm.clickLoadMore) {
          setTimeout(function () {
            let content = document.getElementsByClassName('room_wechatul')[0];
            content.scrollTop = content.scrollHeight + 90
          }, 100);
        } else {
          // 设置下拉加载历史记录滚动位置
          setTimeout(() => {
            vm.loadRoom_wechatulHeight = document.getElementsByClassName('willy_ltulli')[0].clientHeight;
            let content = document.getElementsByClassName('room_wechatul')[0];
            console.log( ' contencrollTop',content.scrollTop)
            content.scrollTop = vm.loadRoom_wechatulHeight - vm.oldRoom_wechatulHeight
//            content.scrollTop =0
          }, 100);
          // setTimeout(function () {
          //   let content = document.getElementsByClassName('room_wechatul')[0];
          //   content.scrollTop = vm.loadRoom_wechatulHeight - vm.oldRoom_wechatulHeight
          // }, 100);
        }
//         let content = document.getElementsByClassName('room_wechatul')[0];
// //        console.log('scrollHeight',content.scrollHeight)
// //        console.log('scrollTop',content.scrollTop)
//         content.scrollTop = content.scrollHeight + 90

      }, {deep: true})
//      vm.$watch('gameIssue', () => {
//          if(vm.gameIssue.duration&&vm.gameIssue.duration>0){
//            vm.overGameTime=vm.gameIssue.duration
//          }else{
//            vm.overGameTime=false
//          }
//
//      }, {deep: true})
          setTimeout(function () {
            let content = document.getElementsByClassName('room_wechatul')[0];
            content.scrollTop = content.scrollHeight
          }, 900);

    },
    created () {
      const vm = this
      vm.obAllData()
//      vm.obChatRecord()
      // 获取房间游戏期次
      vm.obGameIssue()
//      获取开奖记录
      vm.obGameRecord()
      if (localStorage.getItem('userInfo')) {
        vm.userData = JSON.parse(localStorage.getItem('userInfo'))
        vm.userToken = vm.userData.token
        vm.userName = vm.userData.username
        //登陆用户获取用户余额
        vm.obMoney()


      }



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
