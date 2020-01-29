<template>
  <div id="practise">
    <mt-header fixed title="随机练习">
      <router-link to="/transChoose" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="practise">
      <div class="top">
        <p class="title">练习试题&nbsp;{{(currendIndex+1)+'/'+this.questions.length}}</p>
        <p class="describe">
          <span>练习日期: {{currentDate}}</span>
          <span>时长: {{time}}分钟</span>
        </p>
      </div>
      <mt-progress :value="(currendIndex/this.questions.length)*100" :bar-height="7">
      </mt-progress>
      <div
        class="section"
        v-for="(item,index) in questions"
        :key="index"
        v-show="index == currendIndex"
      >

        <template v-if="item.questionTypeId==radio||item.questionTypeId==judge">
          <mt-radio
            class="page-part"
            :title="(index + 1)+'. '+item.title+'  ('+item.score+')分'"
            v-model="selectedValue"
            :options="item.options"
            @change="changeCurrentAnswer()"
          />
          <div>
            <mt-cell title="单选题选中项" :class="saveAnswer[currendIndex]!=null?(saveAnswer[currendIndex]==item.answer?'correct':'error'):''">{{selectedValue}}</mt-cell>
          </div>
        </template>
        <template v-if="item.questionTypeId==checklist">
          <mt-checklist
            :title="(index + 1)+'. '+item.title+'  ('+item.score+')分'"
            v-model="selectedCheckList"
            :options="item.options"
            @change="changeCurrentAnswer()">
          </mt-checklist>
          <div>
            <mt-cell title="多选题选中项" :class="saveAnswer[currendIndex]!=null?(saveAnswer[currendIndex]==item.answer?'correct':'error'):''">{{selectedValue}}</mt-cell>
          </div>
        </template>
        <div v-show="saveAnswer[currendIndex]!=null">
          <mt-cell></mt-cell>
          <mt-cell title="正确答案">{{item.answer}}</mt-cell>
        </div>
      </div>
      <div class="time-count-wrap">距离结束还有：{{restTime}}</div>
      <div class="buttons-group">
        <mt-button
          type="danger"
          size="small"
          @click.native="prevItem"
          :disabled="currendIndex<1 && currendIndex != questions.length-1"
        >上一题
        </mt-button>
        <mt-button
          type="primary"
          size="small"
          @click.native="nextItem"
          v-if="currendIndex != questions.length-1"
        >{{isShowNextItem==true?'下一题':'查看答案'}}
        </mt-button>
        <mt-button
          type="primary"
          size="small"
          @click.native="handleSubmit"
          v-if="currendIndex == questions.length-1"
        >{{isShowNextItem==true?'提交':'查看答案'}}
        </mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from "vuex";
  import {getNumberPrefix, getCurrentDate, QUESTION_TYPE} from "../utils/common";
  import {Toast,Radio,Checklist} from "mint-ui";
  import {queryTransData, commitQuestionAnswer} from "../data/transDao";

  export default {
    data() {
      return {
        currentDate: getCurrentDate(),
        radio: QUESTION_TYPE.RADIO,  //单选
        checklist: QUESTION_TYPE.CHECKLIST,  //多选
        judge: QUESTION_TYPE.JUDGE, //多选
        //选中的答案
        selectedCheckList:[],
        selectedValue: null,
        selectedLabel: null,
        answer: null,
        answerLabel: null,
        //初始化时间戳
        currentTime: new Date().getTime(),
        restTime: "",
        timer: "",
        isShowNextItem: false
      };
    },
    created() {
      const vm = this;
      //获取随机练习试题
      this.loadQuestions();
    },
    watch: {
      $route(to) {
      }
    },
    mounted() {
      this.countTime();
    },
    computed: {
      time() {
        const vm = this;
        return 10;
      },
      ...mapState([
        "currendIndex",
        "saveAnswer",
        "questions"
      ]),
    },
    methods: {
      ...mapMutations([
        "NEXT_ITEM",
        "PREV_ITEM",
        "USE_TIME",
        "EXAM_ID"
      ]),
      clearData() {
        this.$store.state.currendIndex = 0;
        this.$store.state.saveAnswer = [];
        this.$store.state.questions = [];
      },
      loadQuestions() {
        const vm = this;
        queryTransData(vm.$route.query.fieldId, "")
          .then(response => {
            vm.clearData();
            if(response.data.object.length==0) return false;
            response.data.object.forEach(question => {
              let _question = {};
              _question.title = question.title;
              _question.answer = question.answer;
              _question.score = question.score;
              _question.questionId = question.id;
              _question.questionTypeId = question.questionTypeId;
              if (question.questionTypeId === QUESTION_TYPE.RADIO||question.questionTypeId === QUESTION_TYPE.CHECKLIST) {
                //选择题
                _question.options = [];
                Object.keys(question.options).sort().forEach(function (key) {
                  if (question.options[key] != null) {
                    _question.options.push({
                      value: key.toUpperCase(),
                      label: key.toUpperCase()+":"+question.options[key]
                    });
                  }
                });
              } else if (question.questionTypeId === QUESTION_TYPE.JUDGE) {
                //判断题
                _question.options = [
                  {value: "T", label: "T:正确"},
                  {value: "F", label: "F:错误"}
                ];
              }
              vm.questions.push(_question);
            });
          })
          .catch(error => {
            console.log(error);
          });
      },


      //下一题
      nextItem() {
        const question = this.questions[this.currendIndex];
        if (this.selectedValue==null) {
          Toast("请先选择答案！");
          return;
        }

        if(this.saveAnswer[this.currendIndex]==null){
          this.saveAnswer[this.currendIndex] = this.selectedValue;
          commitQuestionAnswer(question.questionId, question.questionTypeId, this.selectedValue)
            .then(response => {
              console.log(response)
            });
          this.isShowNextItem=true;
          return;
        }
        this.selectedValue = null;
        this.selectedCheckList = [];
        this.answer = null
        this.NEXT_ITEM();
        this.getCurrentAnswer();
        this.isShowNextItem=this.saveAnswer.length-1>this.currendIndex?true:false;
      },
      //上一题
      prevItem() {
        this.selectedValue = null;
        this.selectedCheckList = [];
        this.answer = null
        this.PREV_ITEM();
        this.getCurrentAnswer();
        this.isShowNextItem=this.saveAnswer.length-1>this.currendIndex?true:false;
      },
      //提交答案
      handleSubmit() {
        const question = this.questions[this.currendIndex];
        if(this.saveAnswer[this.currendIndex]==null){
          this.saveAnswer[this.currendIndex] = this.selectedValue;
          commitQuestionAnswer(question.questionId, question.questionTypeId, this.selectedValue)
            .then(response => {
              console.log(response)
            });
          this.isShowNextItem=true;
          return;
        }
        //this.EXAM_ID(this.$route.query.id);
        this.USE_TIME(new Date().getTime() - this.currentTime);
        clearTimeout(this.timer);
        this.$router.push({name: "transResult"});
      },
      //更改当前题目的答案
      changeCurrentAnswer() {
        const question = this.questions[this.currendIndex];
        // this.answer = question.answer;
        //获取选取label
        let options = question.options;
        if(question.questionTypeId === QUESTION_TYPE.CHECKLIST&&this.selectedCheckList.length>0){
          this.selectedCheckList = this.selectedCheckList.sort();
          this.selectedValue = this.selectedCheckList.join("");
        }
      },

      //获取当前题目填写的答案
      getCurrentAnswer() {
        const question = this.questions[this.currendIndex];
        const currentAnswer = this.saveAnswer[this.currendIndex];
        if (currentAnswer) {
          if(question.questionTypeId === QUESTION_TYPE.CHECKLIST){
            this.selectedCheckList = currentAnswer.split("");
          }
          this.selectedValue = currentAnswer;
        } else {
          this.saveAnswer[this.currendIndex] = this.selectedValue;
        }
      },
      //倒计时
      countTime() {
        const vm = this,
          endTime = vm.time * 60 * 1000 + vm.currentTime,
          currentTime = new Date().getTime(),
          restTime = endTime - currentTime,
          hours = getNumberPrefix(
            parseInt((restTime / (1000 * 60 * 60)) % 24, 10)
          ),
          minutes = getNumberPrefix(parseInt((restTime / (1000 * 60)) % 60, 10)),
          seconds = getNumberPrefix(parseInt((restTime / 1000) % 60, 10));
        vm.restTime = `${hours}:${minutes}:${seconds}`;
        vm.timer = setTimeout(function () {
          if (restTime > 0) {
            vm.countTime();
          } else if (restTime <= 0) {
            clearTimeout(vm.timer);
            Toast("交卷时间已到，系统将帮您自动交卷");
            setTimeout(() => {
              vm.handleSubmit();
            }, 2000);
          }
        }, 1000);
      }
    }
  };
</script>

<style>
  .correct .mint-cell-value {
    color: green;
  }

  .error .mint-cell-value {
    color: red;
  }

  .practise {
    margin-top: 50px;
    width: 100%;
    height: 100%;
    font-size: 1rem;
  }


  .practise .top {
    padding: 0.8rem 0.8rem;
    text-align: left;
  }

  .practise .section {
    padding: 0.5rem 0rem;
    text-align: left;
  }

  .practise .time-count-wrap {
    padding: 2rem 1rem 1rem 1rem;
    text-align: left;
  }


  .top .describe,
  .time-count-wrap {
    font-size: 1rem;
    color: rgba(135, 134, 136, 0.84);
  }

  .top .describe span:nth-child(2) {
    float: right;
  }


  section .ivu-radio-group label {
    display: block;
    padding: 7px 0px;
    white-space: normal;
  }

  .buttons-group {
    padding: 30px 0px;
  }

  .buttons-group button {
    padding-left: 25px;
    padding-right: 25px;
    margin-left: 5px;
  }

  .ivu-radio-wrapper {
    font-size: 0.9rem;
  }

  span.ivu-radio + * {
    position: relative;
    left: 20px;
  }

  .item-options .ivu-radio {
    position: absolute !important;
  }

  .mint-radiolist-title {
    font-size: 1rem;
  }
</style>
