<template>
  <div class="mr-root">
    <van-nav-bar
      title="房间详情"
      left-arrow
      @click-left="onClickLeft"  :fixed="true"
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
          <div slot="title"><span>第 <em>4854545</em> 期 <i class="num_color">5</i>
            +<i class="num_color">5</i>+<i class="num_color">5</i>=<i class="lastNum_color">5</i>（大单）</span></div>
          888887887878787877456456
        </van-collapse-item>
      </van-collapse>
    </div>
    <!--聊天信息-->
    <main class="room_wechat">
      <ul>
        <li class="lift_wechat">
          <a>
            <img src="../../assets/qq.png" alt="">
          </a>
          <span>我是别人发的聊天记录我是别人发的聊天记录我是别人发的聊天记录我是别人发的聊天记录我是别人发的聊天记录我是别人发的聊天记录我是别人发的聊天记录</span>
        </li>
        <li class="lift_wechat">
          <a>
            <img src="../../assets/qq.png" alt="">
          </a>
          <span>我是自己发的聊天记录</span>
        </li>
        <li class="right_wechat">
          <a>
            <img src="../../assets/qq.png" alt="">
          </a>
          <span>我是自己发的聊天记录我是自己发的聊天记录我是自己发的聊天记录我是自己发的聊天记录我是自己发的聊天记录我是自己发的聊天记录我是自己发的聊天记录我是自己发的聊天记录</span>
          <div style="clear:both"></div>
        </li>



      <li class="right_wechat">
        <a>
          <img src="../../assets/qq.png" alt="">
        </a>
        <span>6666666666666666666666666666666666666888888888888888888888888888888</span>
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
         <span>特码</span>
          <span class="active_touzhu">定位球</span>
        </div>
        <div class="touzhu_right">
<p>第一球</p>
          <ul>
            <li v-for="n in 20"><p class="foz_bol"> {{n}}</p><p> {{n}}</p></li>
          </ul>
          <p>第二球</p>
          <ul>
            <li v-for="n in 20"><p class="foz_bol"> {{n}}</p><p> {{n}}</p></li>
          </ul>
        </div>
      </div>
<div class="touzhu_foot">

  <div class="foot_but">
    <van-stepper
      v-model="touzhuNum"
      integer
      :min="1000"
      :max="100000"
      :step="1000"
    />
    <span class="touzhu_total">总计：￥{{touzhuNum||0}}</span><van-button size="small" class="touzhu_null">清空</van-button>
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
        vm.threadPoxi()
        console.log(vm.messageValue)
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
        //若是ws开启状态
        if (vm.websock.readyState === vm.websock.OPEN) {
          vm.websocketsend(agentData)
        }
        // 若是 正在开启状态，则等待300毫秒
        else if (vm.websock.readyState === vm.websock.CONNECTING) {
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
      initWebSocket(){ //初始化weosocket
        //ws地址
        const vm = this
        vm.websock = new WebSocket("ws://47.92.129.86:8080/myHandler");
        console.log(vm.websock)
        vm.websock.onmessage = vm.websocketonmessage;
        vm.websock.onclose = vm.websocketclose;
      },
      websocketonmessage(e){ //数据接收
        const vm = this
        vm.redata = JSON.parse(e.data);
        console.log(vm.redata);
      },
      websocketsend(agentData){//数据发送
        const vm = this
        vm.websock.send(agentData);
      },
      websocketclose(e){  //关闭
        console.log("connection closed (" + e.code + ")");
      }
    },
    created () {
      const vm = this
      vm.initWebSocket()
      vm.roomId = vm.$route.params.id
      vm.userData = JSON.parse(sessionStorage.getItem('userInfo'))
      vm.userToken = vm.userData.accessToken
      let params = {
        roomnumber: vm.roomId,
        accessToken: vm.userToken,
      }
      vm.$axios.get(`/api/RoomController/queryRoomByRoomNo`, {params})
        .then(response => {
          if (response.status == 200 && response.data) {
            vm.roomData = response.data.rows
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
