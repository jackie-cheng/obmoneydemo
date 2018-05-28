<template>
  <div class="mr-root">
    <van-nav-bar
      title="666"
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
  <p>01:25</p>
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
    <main class="room_wechat">
      <ul>
        <li class="lift_wechat" v-for="mes in othersSendMessage">
          <a>
            <img src="../../assets/qq.png" alt="">
          </a>
          <span>{{mes}}</span>
        </li>

        <li class="right_wechat" v-for="mess in mySendMessage">
          <a>
            <img src="../../assets/qq.png" alt="">
          </a>
          <span>{{mess.message}}</span>
          <div style="clear:both"></div>
        </li>


      </ul>

    </main>
    <div class="footSet">
      <van-button @click="showCustomAction=true">投注</van-button>
      <van-button >
        撤单
      </van-button>
      <van-cell-group>
        <van-field v-model="messageValue" placeholder="发送聊天" />
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
          <p>第一球</p>
          <ul>
            <li v-for="n in 20" :class="{curChosBall_class:curChosBallOne== n}" @click = 'curChosBallOne= n'><p class="foz_bol"> {{n}}</p><p> {{n}}</p></li>
          </ul>
          <p>第二球</p>
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
  </div>
</template>
<script>
  import Vue from 'vue'

  export default{
    name: 'roomDetail',
    data () {
      return {
        userData:null,
        userToken:null,
          mySendMessage:[],
        othersSendMessage:[],
        curChosBallOne:1,//当前选中球1
        curChosBallTwo:1,//当前选中球2
        touzhuType:1,
        touzhuNum:null,
        showCustomAction:false,
        activeNames: ['2'],
        roomId: null,
        userToken: null,
        roomData: null,
        websock: null,
        messageValue: null,//websock要发送的值
        resData: {}, //websock接收到的值

      }
    },
    methods: {
      sendMess(){
        const vm = this
        if(!sessionStorage.getItem('userInfo')){
          vm.$router.push('/login')
        }else{
          vm.threadPoxi()
        }

//        console.log(vm.messageValue)
      },
      onCancel(){
        const vm = this
      },
      onClickLeft() {
        this.$router.go(-1)
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
        if (vm.websock.readyState === 1) {
          vm.websocketsend(agentData)

        }
        // 若是 正在开启状态，则等待300毫秒
        else if (vm.websock.readyState === 0) {
          setTimeout(function () {
            vm.websocketsend(agentData)
          }, 300);
        }
        // 若未开启 ，则等待500毫秒
        else {
          vm.initWebSocket();
          setTimeout(function () {
            vm.websocketsend(agentData)
          }, 500);
        }
      },
      initWebSocket(){ //初始化weosocketnew WebSocket("ws://ip:8080/websocket");ws://localhost:8080/websocket
        //ws地址
        const vm = this
        vm.websock = new WebSocket("ws://47.106.11.246:8080/websocket");
        if(vm.websock.onopen){
         console.log("WebSocket连接成功")
        }
        console.log(vm.websock)
        vm.websock.onmessage = vm.websocketonmessage;
        vm.websock.onclose = vm.websocketclose;
      },
      websocketonmessage(e){ //数据接收
        const vm = this
        vm.redata = e.data;
        console.log(e.data)
        vm.othersSendMessage.push(vm.redata)
//{"phone":"","message":""}
        console.log('jieshou',vm.redata);
      },
        websocketsend(agentData){//数据发送
        const vm = this
          let aa =agentData.toString()
        let sendData ={"phone":vm.userData.phone,"message":aa}
        console.log(JSON.stringify(sendData))
        vm.websock.send(JSON.stringify(sendData));
        vm.mySendMessage.push(sendData)

//        vm.mySendMessage=  vm.mySendMessage.push(agentData)
      },
      websocketclose(e){  //关闭
        console.log("connection closed (" + e.code + ")");
      },
      creatGet(){
          const vm = this
        vm.$axios.get(`/api/chatWebsocket/startChat`)
          .then(response => {
            if (response.status == 200 && response.data) {
              console.log(response)
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
    },
    mounted(){
        const vm = this
      vm.$watch('',()=>{
          if(vm.websock.readyState === 1){
            console.log('连接成功')
          }

      })

    },
    created () {
      const vm = this
      if(sessionStorage.getItem('userInfo')){
              vm.userData = JSON.parse(sessionStorage.getItem('userInfo'))
      vm.userToken = vm.userData.accessToken
      }
//      vm.websocket()
      vm.initWebSocket()
//      vm.creatGet()
      vm.roomId = vm.$route.params.id
//      vm.userData = JSON.parse(sessionStorage.getItem('userInfo'))
//      vm.userToken = vm.userData.accessToken
      let params = {
        roomnumber: vm.roomId,
//        accessToken: vm.userToken,
      }
      vm.$axios.get(`/api/RoomController/queryRoomByRoomNo`, {params})
        .then(response => {
          if (response.status == 200 && response.data) {
            vm.roomData = response.data
            console.log(response)
          } else {
            vm.$toast('获取房间信息失败');
          }
        }).catch(response => {

      })
    },
    components: {},
  }
</script>
<style>
</style>
