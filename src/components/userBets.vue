<template>
  <div class="mr-root user_bets">
    <van-actionsheet v-model="$store.state.show" :title="popTitle + '投注'" class="touzhu_actionbac">
      <div class="touzhu_action">
        <div class="touzhu_lift">
          <span :class="{active_touzhu:touzhuType==1}" @click="touzhuType=1,popTitle = '特码'"> <em>特<br/>码</em> </span>
          <span :class="{active_touzhu:touzhuType==2}" @click="touzhuType=2,popTitle = '定位球'"> <em>定<br/>位<br/>球</em> </span>
        </div>
        <div class="touzhu_right" v-if="touzhuType==1">
          <van-row gutter="0">
            <van-col span="5"><li class="betBallOne" :class="{curChosBall_class:selectBall.indexOf('da')!=-1}" @click="starBet('da')"><p class="foz_bol"> 大</p> <p v-text="getPercent(gameOdd['da'])"> 2</p></li>
            </van-col>
            <van-col span="5"><li class="betBallOne"  :class="{curChosBall_class:selectBall.indexOf('dan')!=-1}" @click="starBet('dan')"><p class="foz_bol"> 单</p> <p v-text="getPercent(gameOdd['dan'])"> 2</p></li></van-col>
            <van-col span="5"><li class="betBallOne"  :class="{curChosBall_class:selectBall.indexOf('dadan')!=-1}" @click="starBet('dadan')"><p class="foz_bol"> 大单</p> <p v-text="getPercent(gameOdd['dadan'])"> 2</p></li></van-col>
            <van-col span="5"><li class="betBallOne"  :class="{curChosBall_class:selectBall.indexOf('xiaodan')!=-1}" @click="starBet('xiaodan')"><p class="foz_bol"> 小单</p> <p v-text="getPercent(gameOdd['xiaodan'])"> 2</p></li></van-col>
            <van-col span="4"><li class="betBallOne"  :class="{curChosBall_class:selectBall.indexOf('jida')!=-1}" @click="starBet('jida')"><p class="foz_bol"> 极大</p> <p v-text="getPercent(gameOdd['jida'])"> 2</p></li></van-col>
          </van-row>
          <van-row gutter="0">
            <van-col span="5"><li class="betBallOne"  :class="{curChosBall_class:selectBall.indexOf('xiao')!=-1}" @click="starBet('xiao')"><p class="foz_bol"> 小</p> <p v-text="getPercent(gameOdd['xiao'])"> 2</p></li>
            </van-col>
            <van-col span="5"><li class="betBallOne"  :class="{curChosBall_class:selectBall.indexOf('shuang')!=-1}" @click="starBet('shuang')"><p class="foz_bol"> 双</p> <p v-text="getPercent(gameOdd['shuang'])"> 2</p></li></van-col>
            <van-col span="5"><li class="betBallOne" :class="{curChosBall_class:selectBall.indexOf('dashuang')!=-1}" @click="starBet('dashuang')"><p class="foz_bol"> 大双</p> <p v-text="getPercent(gameOdd['dashuang'])"> 2</p></li></van-col>
            <van-col span="5"><li class="betBallOne" :class="{curChosBall_class:selectBall.indexOf('xiaoshuang')!=-1}" @click="starBet('xiaoshuang')"><p class="foz_bol"> 小双</p> <p v-text="getPercent(gameOdd['xiaoshuang'])"> 2</p></li></van-col>
            <van-col span="4"><li class="betBallOne" :class="{curChosBall_class:selectBall.indexOf('jixiao')!=-1}" @click="starBet('jixiao')"><p class="foz_bol"> 极小</p> <p v-text="getPercent(gameOdd['jixiao'])"> 2</p></li></van-col>
          </van-row>
          <van-row gutter="0">
            <van-col span="4"><li class="betBallTwo" :class="{curChosBall_class:selectBall.indexOf('hongbo')!=-1}" @click="starBet('hongbo')"><p class="foz_bol daDan_color"> 红波</p> <p v-text="getPercent(gameOdd['hongbo'])"> 2</p></li></van-col>
            <van-col span="4"><li class="betBallTwo" :class="{curChosBall_class:selectBall.indexOf('lanbo')!=-1}" @click="starBet('lanbo')"><p class="foz_bol xiaoShuang_color"> 蓝波</p> <p v-text="getPercent(gameOdd['lanbo'])"> 2</p></li></van-col>
            <van-col span="4"><li class="betBallTwo" :class="{curChosBall_class:selectBall.indexOf('lvbo')!=-1}" @click="starBet('lvbo')"><p class="foz_bol greenBo_color"> 绿波</p> <p v-text="getPercent(gameOdd['lvbo'])"> 2</p></li></van-col>
            <van-col span="4"><li class="betBallTwo" :class="{curChosBall_class:selectBall.indexOf('baozi')!=-1}" @click="starBet('baozi')"><p class="foz_bol"> 豹子</p> <p v-text="getPercent(gameOdd['baozi'])"> 2</p></li></van-col>
            <van-col span="4"><li class="betBallTwo" :class="{curChosBall_class:selectBall.indexOf('shunzi')!=-1}" @click="starBet('shunzi')"><p class="foz_bol"> 顺子</p> <p v-text="getPercent(gameOdd['shunzi'])"> 2</p></li></van-col>
            <van-col span="4"><li class="betBallTwo" :class="{curChosBall_class:selectBall.indexOf('duizi')!=-1}" @click="starBet('duizi')"><p class="foz_bol"> 对子</p> <p v-text="getPercent(gameOdd['duizi'])"> 2</p></li></van-col>
          </van-row>
            <!--合最后一个数字-->
         <ul class="willy_userBets_ui">
           <li class="betBallThree" :class="{curChosBall_class:selectBall.indexOf(0)!=-1}" @click="starBet(0)"><p class="foz_bol greenBo_color">00 </p> <p v-text="getPercent(gameOdd['tema'+0])"> 2</p></li>
           <li class="betBallThree" :class="{curChosBall_class:selectBall.indexOf(num)!=-1}" v-for="num in 27"  @click="starBet(num)"><p class="foz_bol" :class="styleBull(num)"  v-text="ZeroNum(num)"> </p> <p v-text="getPercent(gameOdd['tema'+num])"> 2</p></li>
            <!--<li class="betBallThree"><p class="foz_bol greenBo_color"> 01</p> <p> 2</p></li>-->
          <!--<li class="betBallThree"><p class="foz_bol daDan_color"> 02</p> <p> 2</p></li>-->
         </ul>





        </div>
        <div class="touzhu_right" v-if="touzhuType==2">
          <img src="../assets/firstball.png" alt="">
          <ul class="willy_touzhu_right_ui">
            <li v-for="n in LocationOneBall" :class="{curChosBall_class:curChosBallOne== n}" @click='curChosBallOne= n'><p
              class="foz_bol"> {{n.num}}</p>
              <p> {{n.point}}</p></li>
          </ul>
          <img src="../assets/secball.png" alt="">
          <ul class="willy_touzhu_right_ui">
            <li v-for="n in LocationTwoBall" :class="{curChosBall_class:curChosBallTwo== n}" @click='curChosBallTwo= n'><p
              class="foz_bol"> {{n.num}}</p>
              <p> {{n.point}}</p></li>
          </ul>
          <img src="../assets/threeball.png" alt="">
          <ul class="willy_touzhu_right_ui">
            <li v-for="n in LocationThreeBall" :class="{curChosBall_class:curChosBallTwo== n}" @click='curChosBallTwo= n'><p
              class="foz_bol"> {{n.num}}</p>
              <p> {{n.point}}</p></li>
          </ul>
        </div>
      </div>
      <div class="touzhu_foot">

        <div class="foot_but">
          <div class="willy_foot_butBox">
            <ul class="willy_foot_but" ref="willy_foot_but_Ref">
              <!-- <li :class="{active_monbut:index==active}" @click="touzhuNum+=num,active=index" v-for="(num,index) in touzhuButList.slice(0,4)"> -->
              <li class="willy_ssn" ref="willy_fbf_li_Ref" :class="{active_monbut:index==active}" @click="touzhuNum+=num,active=index" v-for="(num,index) in touzhuButList" :key="index">
                <span v-if="num==50000">5W</span> <span v-if="num==10000">1W</span> <span v-if="num!=10000&&num!=50000">{{num}}</span>
              </li>
            </ul>
          </div>
          <!--<van-stepper-->
          <!--v-model="touzhuNum"-->
          <!--integer-->
          <!--:min="1000"-->
          <!--:max="100000"-->
          <!--:step="1000"-->
          <!--/>-->
          <div class="willy_botBox">
            <input class="willy_botInput" type="number" v-model="touzhuNum" placeholder="单注倍数" pattern="[0-9]*">
            <span class="touzhu_total">总计：￥{{totalAmount}}</span>
            <van-button size="small" class="touzhu_null" @click="selectBall=[],touzhuNum=null,active=-1">清空</van-button>
            <van-button size="small" class="touzhu_ok" @click="sureBet" v-if="touzhuNum>0&&selectBall.length>0&&touzhuNum!=null">确认</van-button>
            <van-button size="small" class="touzhu_ok" @click="$toast('倍数和球型必选')" v-else style="opacity: 0.5">确认</van-button>
          </div>
        </div>


      </div>
    </van-actionsheet>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'userBets',
    data(){
      return {
          active:0,
        touzhuButList:[1,5,10,50,100,500,1000,5000,10000,50000],
        redBall: [1, 2, 7, 8, 12, 13, 18, 19, 23, 24],
        blueBall: [3, 4, 9, 10, 14, 15, 20, 25, 26],
        greenBall: [5, 6, 11, 16, 17, 21, 22, 27],
        LocationOneBall: [
          {
            num: '0',
            point: '9.65'
          },
          {
            num: '1',
            point: '9.65'
          },
          {
            num: '2',
            point: '9.65'
          },
          {
            num: '3',
            point: '9.65'
          },
          {
            num: '4',
            point: '9.65'
          },
          {
            num: '5',
            point: '9.65'
          },
          {
            num: '6',
            point: '9.65'
          },
          {
            num: '7',
            point: '9.65'
          },
          {
            num: '8',
            point: '9.65'
          },
          {
            num: '9',
            point: '9.65'
          },
          {
            num: '大',
            point: '1.97'
          },
          {
            num: '小',
            point: '1.97'
          },
          {
            num: '单',
            point: '1.97'
          },
          {
            num: '双',
            point: '1.97'
          },
          {
            num: '龙',
            point: '1.97'
          }
        ],
        LocationTwoBall: [
          {
            num: '0',
            point: '9.65'
          },
          {
            num: '1',
            point: '9.65'
          },
          {
            num: '2',
            point: '9.65'
          },
          {
            num: '3',
            point: '9.65'
          },
          {
            num: '4',
            point: '9.65'
          },
          {
            num: '5',
            point: '9.65'
          },
          {
            num: '6',
            point: '9.65'
          },
          {
            num: '7',
            point: '9.65'
          },
          {
            num: '8',
            point: '9.65'
          },
          {
            num: '9',
            point: '9.65'
          },
          {
            num: '大',
            point: '1.97'
          },
          {
            num: '小',
            point: '1.97'
          },
          {
            num: '单',
            point: '1.97'
          },
          {
            num: '双',
            point: '1.97'
          },
          {
            num: '和',
            point: '9.5'
          }
        ],
        LocationThreeBall: [
          {
            num: '0',
            point: '9.65'
          },
          {
            num: '1',
            point: '9.65'
          },
          {
            num: '2',
            point: '9.65'
          },
          {
            num: '3',
            point: '9.65'
          },
          {
            num: '4',
            point: '9.65'
          },
          {
            num: '5',
            point: '9.65'
          },
          {
            num: '6',
            point: '9.65'
          },
          {
            num: '7',
            point: '9.65'
          },
          {
            num: '8',
            point: '9.65'
          },
          {
            num: '9',
            point: '9.65'
          },
          {
            num: '大',
            point: '1.97'
          },
          {
            num: '小',
            point: '1.97'
          },
          {
            num: '单',
            point: '1.97'
          },
          {
            num: '双',
            point: '1.97'
          },
          {
            num: '虎',
            point: '2.05'
          }
        ],
        popTitle: '特码',
        selectBall: [],
        curChosBallOne: 1,//当前选中球1
        curChosBallTwo: 1,//当前选中球2
        touzhuType: 1,
        touzhuNum: null,
        touzhuBut:null,//当前选择按钮
        point: '', //下注倍数
        //willy
        onlyRun: false
      }
    },
props:['gameid','gameQi','gameOdd'],
computed:{
  totalAmount(){
      const vm = this
if(vm.touzhuNum>0){
    return (vm.selectBall.length)*Number(vm.touzhuNum)
}else{
    return 0
}
  }
},
mounted(){
  // this.$refs.willy_foot_but_Ref.addEventListener('scroll', this.handleScroll)
  const vm = this
  vm.$watch('touzhuNum', function () {

      if(vm.touzhuNum!=null){
        vm.touzhuNum=Number(vm.touzhuNum)
        if(vm.touzhuNum>1000000){
          vm.touzhuNum=1000000
          vm.$toast('最大输入一百万');
        }
        //
        vm.onlyRun = true
      }

  }, {deep: true})
},
    created(){
      const vm = this

    },
    methods:{
      handleScroll () {
        var scrollLeft = this.$refs.willy_foot_but_Ref.scrollLeft
        console.log(scrollLeft)
      },
      // 从父组件传来的FN,用来设置筹码默认位置
      cmScrollLeft() {
        if (!this.onlyRun) {
          this.$nextTick(function () {
            let wfbrLiLength = this.$refs.willy_fbf_li_Ref.length
            let wfbr = this.$refs.willy_foot_but_Ref
            if (wfbr !== undefined) {
              let a = this.$refs.willy_foot_but_Ref.clientWidth
              let b = this.$refs.willy_fbf_li_Ref[0].offsetParent.offsetLeft  + this.$refs.willy_fbf_li_Ref[0].clientWidth
              let d = 2 * b
              this.$refs.willy_foot_but_Ref.scrollLeft = d
            } else {
              console.log('none')
            }
          })
        }
      },
//赔率去零
      getPercent(num){
        const vm = this
        if(parseInt(Number(num))==Number(num)){
return parseInt(Number(num))
        }else{
            return num
        }
      },
        //确认下注/user/bet/userBet
      sureBet(){
          const vm = this
        if(!localStorage.getItem('userInfo')){
          vm.$router.push('/login')
          return
        }
        vm.userData = JSON.parse(localStorage.getItem('userInfo'))
//        var obj = new Object();
        var arr =JSON.parse(JSON.stringify(vm.selectBall));
//        for (var x of arr){
//          obj[x] =  vm.touzhuNum;
//        }
        arr.forEach((ball,index)=>{
            if(!isNaN(ball)){
              arr[index]='tema'+ball
            }
        })
       let params ={
         token: vm.userData.token,

            roomId : vm.$route.params.id,
            gameId:vm.gameid,
            gameUserId: vm.userData.uuid,
         gameQi:vm.gameQi,
            ballOdd:vm.getPercent(vm.gameOdd[arr.toString()]),
            point:Number(vm.touzhuNum),
            totleAmt :Number(vm.totalAmount),
            betStr:arr.toString()


        }


        vm.$axios.get(`/user/bet/userBet`, {params})
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
                vm.$toast('下注失败，当前期数已停止下注');
              }else if(response.data.statusCode==-1){
                vm.$toast(response.data.resultInfo);
              }else{
                vm.$toast('下注成功');
                vm.selectBall=[]
                vm.touzhuNum=null
                vm.$emit('betsBall',JSON.stringify(params))
              }

            } else {
              vm.$toast('下注失败');
            }
          }).catch(response => {

        })

      },

//        数字求的颜色
      styleBull(num){
        const vm = this
        if( vm.redBall.indexOf(num)!=-1){
         return  'daDan_color'
        }else if(vm.greenBall.indexOf(num)!=-1){
          return  'greenBo_color'
        }else if(vm.blueBall.indexOf(num)!=-1) {
          return  'xiaoShuang_color'
        }
      },

//      选取球
      starBet(num){
        const vm = this
//        if( vm.selectBall.indexOf(num)!=-1){
//          const index = vm.selectBall.indexOf(num);
//          vm.selectBall.splice(index,1)
//        }else{
//          vm.selectBall.push(num)
//        }
        //更改后
        if( vm.selectBall.indexOf(num)!=-1){
          const index = vm.selectBall.indexOf(num);
          vm.selectBall.splice(index,1)
        }else{
          Vue.set( vm.selectBall, 0, num)
        }

      },
//      加零
      ZeroNum(num){
          const vm = this
        if(num<10){
              return '0'+num
        }else{
          return num
        }
      },
//      //清空
//      nullBall(){
//          const vm = this
//        vm.touzhuNum=-1
//        setTimeout(function () {
//          vm.touzhuNum=null
//        }, 100);
//
//      }
    }
  }
</script>

