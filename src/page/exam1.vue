<script src="../data/examData1.js"></script>
<template>
  <div id="practise">
    <mt-header fixed title="练习试题">
      <router-link to="/main" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="practise">
      <div class="top">
        <p class="title">练习试题</p>
        <p class="describe">
          <span>练习日期: {{currentDate}}</span>
          <span>时长: {{time}}分钟</span>
        </p>
      </div>
      <div class="section" v-for="(item,index) in examList"  v-show="index == currendIndex" >
          <mt-radio
            class="page-part"
            :title="(index + 1)+'. '+item.title+'  ('+item.score+')分'"
            v-model="selectedValue"
            :options="item.options"
            @change="changeCurrentAnswer"/>
          <div>
            <mt-cell title="选中的项">{{selectedValue}}</mt-cell>
          </div>
      </div>
      <div class="time-count-wrap">距离练习结束还有：{{restTime}}</div>
      <div class="buttons-group">
        <mt-button type="danger" size="small" @click.native="prevItem" :disabled="currendIndex<1 && currendIndex != examList.length-1">上一题</mt-button>
        <mt-button type="primary" size="small" @click.native="nextItem" v-if="currendIndex != examList.length-1">下一题</mt-button>
        <mt-button type="primary" size="small" @click.native="handleSubmit" v-if="currendIndex == examList.length-1">提交试卷</mt-button>
      </div>
    </div>

  </div>

</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getNumberPrefix, getCurrentDate} from '../utils/common'
import { Toast } from 'mint-ui';
import { Radio } from 'mint-ui';
export default {
    data () {
        return {
            currentDate: getCurrentDate(),
            //选中的答案
            selectedValue: "",
            //初始化时间戳
            currentTime: new Date().getTime(),
            restTime: "",
            timer: ""
        }
    },
    watch: {
      $route (to) {
      }
    },
    mounted () {
        this.countTime();
        // console.log(this.examList)
    },
    computed: {
        examList() {
            const vm = this;
            return vm.$store.state.examList[vm.$route.query.id - 1];
        },
        time() {
            const vm = this;
            return vm.$store.state.time[vm.$route.query.id - 1];
        },
        ...mapState([
            'currendIndex',
            'saveAnswer'
        ])
    },
    methods: {
        ...mapMutations([
            'NEXT_ITEM',
            'PREV_ITEM',
            'USE_TIME',
            'EXAM_ID'
        ]),
        //下一题
        nextItem() {
            if(!this.selectedValue){
                Toast('请先选择答案！');
                return;
            }
            this.selectedValue = "";
            this.NEXT_ITEM();
            this.getCurrentAnswer();
        },
        //上一题
        prevItem() {
            this.PREV_ITEM();
            this.getCurrentAnswer();
        },
        //提交答案
        handleSubmit() {
            this.EXAM_ID(this.$route.query.id);
            this.USE_TIME(new Date().getTime() - this.currentTime);
            clearTimeout(this.timer);
            this.$router.push({name: 'Result'});
        },
        //更改当前题目的答案
        changeCurrentAnswer() {
            this.saveAnswer[this.currendIndex] = this.selectedValue;
        },
        //获取当前题目填写的答案
        getCurrentAnswer() {
            const currentAnswer = this.saveAnswer[this.currendIndex];
            if(currentAnswer){
                this.selectedValue = currentAnswer;
            }else{
                this.saveAnswer[this.currendIndex] = this.selectedValue;
            }
            console.log(this.saveAnswer);
        },
        //倒计时
        countTime() {
            const vm = this,
                  endTime = vm.time * 60 * 1000 + vm.currentTime,
                  currentTime = new Date().getTime(),
                  restTime = endTime - currentTime,
                  hours = getNumberPrefix(parseInt(restTime / (1000 * 60 * 60) % 24, 10)),
                  minutes = getNumberPrefix(parseInt(restTime / (1000 * 60) % 60, 10)),
                  seconds = getNumberPrefix(parseInt(restTime / 1000 % 60, 10));
            vm.restTime = `${hours}:${minutes}:${seconds}`;
            vm.timer = setTimeout(function(){
                if(restTime > 0){
                    vm.countTime();
                }else if(restTime <= 0){
                    clearTimeout(vm.timer);
                    vm.$Message.warning("交卷时间已到，系统将帮您自动交卷");
                    setTimeout(() => {
                      vm.handleSubmit();
                    }, 2000)
                }
            }, 1000);
        }
    }
}
</script>

<style>
.practise{
    margin-top: 50px;
    width: 100%;
    height: 100%;
    font-size: 1rem;
}
.practise .top{
  padding: 0.8rem;
  text-align: left;
}
.practise .section
{
    padding: 1rem  0;
    text-align: left;
}
.practise .time-count-wrap
{
  padding: 2rem  1rem 1rem 1rem;
  text-align: left;
}

.practise .top
{
    border-bottom: 0.5rem solid #ccc;
}
.top .describe,
.time-count-wrap
{
    font-size: 0.8rem;
    color: rgba(135, 134, 136, 0.84);
}
.top .describe span:nth-child(2){
    float: right;
}
.practise section{
    border-left: 5px solid red;
    background: url(../assets/3.jpg) 100% 100%;;
}
section .ivu-radio-group label{
    display: block;
    padding: 7px 0px;
    white-space: normal;
}
.buttons-group{
    padding: 30px 0px;
}
.buttons-group button{
    padding-left: 25px;
    padding-right: 25px;
    margin-left: 5px;
}
.ivu-radio-wrapper{
    font-size: 0.9rem;
}
span.ivu-radio+*{
  position: relative;
  left: 20px;
}
.item-options .ivu-radio{
  position: absolute!important;
}
</style>
