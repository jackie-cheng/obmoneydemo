<template>
  <div class="mr-root user_bets">
    <van-actionsheet v-model="$store.state.show" title="定位球投注" class="touzhu_actionbac">
      <div class="touzhu_action">
        <div class="touzhu_lift">
          <span :class="{active_touzhu:touzhuType==1}" @click="touzhuType=1"> <em>特<br/>码</em> </span>
          <span :class="{active_touzhu:touzhuType==2}" @click="touzhuType=2"> <em>定 <br/> 位 <br/>球</em> </span>
        </div>
        <div class="touzhu_right" v-if="touzhuType==1">
          <van-row gutter="0">
            <van-col span="5"><li class="betBallOne" :class="{curChosBall_class:selectBall.indexOf('da')!=-1}" @click="starBet('da')"><p class="foz_bol"> 大</p> <p> 2</p></li>
            </van-col>
            <van-col span="5"><li class="betBallOne"  :class="{curChosBall_class:selectBall.indexOf('dan')!=-1}" @click="starBet('dan')"><p class="foz_bol"> 单</p> <p> 2</p></li></van-col>
            <van-col span="5"><li class="betBallOne"  :class="{curChosBall_class:selectBall.indexOf('dadan')!=-1}" @click="starBet('dadan')"><p class="foz_bol"> 大单</p> <p> 2</p></li></van-col>
            <van-col span="5"><li class="betBallOne"  :class="{curChosBall_class:selectBall.indexOf('xiaodan')!=-1}" @click="starBet('xiaodan')"><p class="foz_bol"> 小单</p> <p> 2</p></li></van-col>
            <van-col span="4"><li class="betBallOne"  :class="{curChosBall_class:selectBall.indexOf('jida')!=-1}" @click="starBet('jida')"><p class="foz_bol"> 极大</p> <p> 2</p></li></van-col>
          </van-row>
          <van-row gutter="0">
            <van-col span="5"><li class="betBallOne"  :class="{curChosBall_class:selectBall.indexOf('xiao')!=-1}" @click="starBet('xiao')"><p class="foz_bol"> 小</p> <p> 2</p></li>
            </van-col>
            <van-col span="5"><li class="betBallOne"  :class="{curChosBall_class:selectBall.indexOf('shuang')!=-1}" @click="starBet('shuang')"><p class="foz_bol"> 双</p> <p> 2</p></li></van-col>
            <van-col span="5"><li class="betBallOne" :class="{curChosBall_class:selectBall.indexOf('dashuang')!=-1}" @click="starBet('dashuang')"><p class="foz_bol"> 大双</p> <p> 2</p></li></van-col>
            <van-col span="5"><li class="betBallOne" :class="{curChosBall_class:selectBall.indexOf('xiaoshuang')!=-1}" @click="starBet('xiaoshuang')"><p class="foz_bol"> 小双</p> <p> 2</p></li></van-col>
            <van-col span="4"><li class="betBallOne" :class="{curChosBall_class:selectBall.indexOf('jixiao')!=-1}" @click="starBet('jixiao')"><p class="foz_bol"> 极小</p> <p> 2</p></li></van-col>
          </van-row>
          <van-row gutter="0">
            <van-col span="4"><li class="betBallTwo" :class="{curChosBall_class:selectBall.indexOf('hongbo')!=-1}" @click="starBet('hongbo')"><p class="foz_bol daDan_color"> 红波</p> <p> 2</p></li></van-col>
            <van-col span="4"><li class="betBallTwo" :class="{curChosBall_class:selectBall.indexOf('lanbo')!=-1}" @click="starBet('lanbo')"><p class="foz_bol xiaoShuang_color"> 蓝波</p> <p> 2</p></li></van-col>
            <van-col span="4"><li class="betBallTwo" :class="{curChosBall_class:selectBall.indexOf('lvbo')!=-1}" @click="starBet('lvbo')"><p class="foz_bol greenBo_color"> 绿波</p> <p> 2</p></li></van-col>
            <van-col span="4"><li class="betBallTwo" :class="{curChosBall_class:selectBall.indexOf('baozi')!=-1}" @click="starBet('baozi')"><p class="foz_bol"> 豹子</p> <p> 2</p></li></van-col>
            <van-col span="4"><li class="betBallTwo" :class="{curChosBall_class:selectBall.indexOf('shunzi')!=-1}" @click="starBet('shunzi')"><p class="foz_bol"> 顺子</p> <p> 2</p></li></van-col>
            <van-col span="4"><li class="betBallTwo" :class="{curChosBall_class:selectBall.indexOf('duizi')!=-1}" @click="starBet('duizi')"><p class="foz_bol"> 对子</p> <p> 2</p></li></van-col>
          </van-row>
            <!--合最后一个数字-->
         <ul >
           <li class="betBallThree" :class="{curChosBall_class:selectBall.indexOf(0)!=-1}" @click="starBet(0)"><p class="foz_bol greenBo_color">00 </p> <p> 2</p></li>
           <li class="betBallThree" :class="{curChosBall_class:selectBall.indexOf(num)!=-1}" v-for="num in 27"  @click="starBet(num)"><p class="foz_bol" :class="styleBull(num)"  v-text="ZeroNum(num)"> </p> <p> 2</p></li>
            <!--<li class="betBallThree"><p class="foz_bol greenBo_color"> 01</p> <p> 2</p></li>-->
          <!--<li class="betBallThree"><p class="foz_bol daDan_color"> 02</p> <p> 2</p></li>-->
         </ul>





        </div>
        <div class="touzhu_right" v-if="touzhuType==2">
          <img src="../assets/firstball.png" alt="">
          <ul>
            <li v-for="n in 20" :class="{curChosBall_class:curChosBallOne== n}" @click='curChosBallOne= n'><p
              class="foz_bol"> {{n}}</p>
              <p> {{n}}</p></li>
          </ul>
          <img src="../assets/secball.png" alt="">
          <ul>
            <li v-for="n in 20" :class="{curChosBall_class:curChosBallTwo== n}" @click='curChosBallTwo= n'><p
              class="foz_bol"> {{n}}</p>
              <p> {{n}}</p></li>
          </ul>
        </div>
      </div>
      <div class="touzhu_foot">

        <div class="foot_but">
          <ul>
            <li :class="{active_monbut:touzhuNum=='10'}" @click="touzhuNum='10'">
              10
            </li>
            <li :class="{active_monbut:touzhuNum=='50'}" @click="touzhuNum='50'">
              50
            </li>
            <li :class="{active_monbut:touzhuNum=='100'}" @click="touzhuNum='100'">
              100
            </li>
            <li :class="{active_monbut:touzhuNum=='1000'}" @click="touzhuNum='1000'">
              1000
            </li>

          </ul>
          <!--<van-stepper-->
          <!--v-model="touzhuNum"-->
          <!--integer-->
          <!--:min="1000"-->
          <!--:max="100000"-->
          <!--:step="1000"-->
          <!--/>-->
          <input type="number" v-model="touzhuNum" placeholder="单注金额" pattern="[0-9]*">
          <span class="touzhu_total">总计：￥{{totalAmount}}</span>
          <van-button size="small" class="touzhu_null" @click="selectBall=[],touzhuNum=''">清空</van-button>
          <van-button size="small" class="touzhu_ok" @click="sureBet" v-if="!$_.isEmpty(touzhuNum)">确认</van-button>
          <van-button size="small" class="touzhu_ok" @click="$toast('请正确输入金额')" v-else style="opacity: 0.5">确认</van-button>
        </div>


      </div>
    </van-actionsheet>
  </div>
</template>

<script>
  export default {
    name: 'userBets',
    data(){
      return {
        redBall: [1, 2, 7, 8, 12, 13, 18, 19, 23, 24],
        blueBall: [3, 4, 9, 10, 14, 15, 20, 25, 26],
        greenBall: [5, 6, 11, 16, 17, 21, 22, 27],
        selectBall: [],
        curChosBallOne: 1,//当前选中球1
        curChosBallTwo: 1,//当前选中球2
        touzhuType: 1,
        touzhuNum: null,
        point: '', //下注倍数
//        totalAmount:0,//下注总额
//        specialBall:[],

//        da: -1,
//        xiao: -1,
//        dan: -1,
//        shuang: -1,
//        dadan: -1,
//        dashuang: -1,
//        xiaodan: -1,
//        xiaoshuang: -1,
//        jida: -1,
//        jixiao: -1,
//        hongbo: -1,
//        lanbo: -1,
//        lvbo: -1,
//        baozi: -1,
//        shunzi: -1,
//        duizi: -1,

      }
    },
props:['gameid','uuid'],
computed:{
  totalAmount(){
      const vm = this
if(!vm.$_.isEmpty(vm.touzhuNum)){
    return (vm.selectBall.length)*Number(vm.touzhuNum)
}else{
    return 0
}
  }
},
mounted(){
  const vm = this

  vm.$watch('touzhuNum', function () {
    vm.touzhuNum=vm.touzhuNum.slice(0,10)
    vm.touzhuNum=vm.touzhuNum.replace(/\./g,'')
    vm.touzhuNum=vm.touzhuNum.replace(/-/g,'')
  }, {deep: true})
//  vm.$watch('touzhuNum', () => {
//      if(vm.da!=-1){
//        vm.da = vm.touzhuNum
//      }
//   if(vm.xiao!=-1){
//     vm.xiao= vm.touzhuNum
//   }
//    if(vm.dan!=-1){
//      vm.dan= vm.touzhuNum
//    }
//    if(vm.shuang!=-1){
//      vm.shuang= vm.touzhuNum
//    }
//    if(vm.dadan!=-1){
//      vm.dadan= vm.touzhuNum
//    }
//    if(vm.dashuang!=-1){
//      vm.dashuang= vm.touzhuNum
//    }
//    if(vm.xiaodan!=-1){
//      vm.xiaodan= vm.touzhuNum
//    }
//    if(vm.xiaoshuang!=-1){
//      vm.xiaoshuang= vm.touzhuNum
//    }
//    if(vm.jida!=-1){
//      vm.jida= vm.touzhuNum
//    }
//    if(vm.jixiao!=-1){
//      vm.jixiao= vm.touzhuNum
//    }
//    if(vm.hongbo!=-1){
//      vm.hongbo= vm.touzhuNum
//    }
//    if(vm.lanbo!=-1){
//      vm.lanbo= vm.touzhuNum
//    }
//    if(vm.lvbo!=-1){
//      vm.lvbo= vm.touzhuNum
//    }
//    if(vm.baozi!=-1){
//      vm.baozi= vm.touzhuNum
//    }
//    if(vm.shunzi!=-1){
//      vm.shunzi= vm.touzhuNum
//    }
//    if(vm.duizi!=-1){
//      vm.duizi= vm.touzhuNum
//    }
//  }, {deep: true})
},
    created(){
      const vm = this

    },
    methods:{
        //确认下注/user/bet/userBet
      sureBet(){
          const vm = this
        if(!localStorage.getItem('userInfo')){
          vm.$router.push('/login')
          return
        }
        var obj = new Object();
        var arr =vm.selectBall;
        for (var x of arr){
          obj[x] =  vm.touzhuNum;
        }
        var objtwo ={
          roomId : vm.$route.params.id,
          gameId:vm.gameid,
          gameUserId:vm.uuid,
          point:vm.totalAmount,
        }
        let params = Object.assign(obj, objtwo);
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
              }else{
                vm.$toast('下注成功');
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
        if( vm.selectBall.indexOf(num)!=-1){
          const index = vm.selectBall.indexOf(num);
          vm.selectBall.splice(index,1)
        }else{
          vm.selectBall.push(num)
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

