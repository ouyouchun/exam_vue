<template>
  <div id="practise-result">
      <mt-header fixed title="练习结果">
        <router-link to="/main" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="page">
        <h1 class="page-title" style="text-align: center">单次练习汇总</h1>
        <mt-cell title="答题数">
          {{saveAnswer.length}}
        </mt-cell>
        <mt-cell title="正确数">
          {{sureExam.length}}
        </mt-cell>
        <mt-cell title="错误数">
          {{errorExam.length}}
        </mt-cell>
        <mt-cell title="通过率">
         {{passRate}}%
        </mt-cell>
        <mt-cell title="点评">
          {{resultTips}}
        </mt-cell>
        <div class="page-progress-wrapper">
          <mt-button size="large" type="primary" @click.native="backTrans()">返回练习</mt-button>
        </div>
      </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
    data () {
        return {
            //答错的题
            errorExam: [],
            //答对的题
            sureExam: [],
            //总分
            totalScore: 0,
            //通过率
            passRate: 0,
            resultTips: "",
        }
    },
    computed:mapState([
        'questions',
        'saveAnswer',
        'useTime',
        'examId'
    ]),
    mounted () {
        const vm = this;
        vm.getSureAnswer();
    },
    methods: {
        backTrans(){
          this.$router.push("/transChoose");
        },
        getSureAnswer() {
            var vm = this;
            vm.questions.forEach(function(item, index){
              console.log(JSON.stringify(item));
                if(item.answer == vm.saveAnswer[index]){
                    vm.sureExam.push(item);
                }else{
                    vm.errorExam.push(item);
                }
            });
            vm.passRate = vm.questions.length==0?0:((vm.sureExam.length/vm.questions.length)*100);
            vm.setResultTips();
            console.log(this.useTime)
            console.log("答对题:" + vm.sureExam.length);
        },
        setResultTips() {
            const scores = [100 ,90, 70, 60, 40, 20],
                  tips = [
                      '哇，你太优秀了，厉害了！！！',
                      '智商只差一步就爆表了，继续加油！',
                      '表现很好，good！',
                      '嗯，不错，还有很大的进步空间！',
                      '还需要继续加油哦！！！',
                      'What are you弄啥嘞！'
                  ];
            if(this.passRate <= scores[5]) {
                this.resultTips = tips[5];
                return;
            }
            if(this.passRate <= scores[4]) {
                this.resultTips = tips[4];
                return;
            }
            if(this.passRate <= scores[3]) {
                this.resultTips = tips[3];
                return;
            }
            if(this.passRate <= scores[2]) {
                this.resultTips = tips[2];
                return;
            }
            if(this.passRate <= scores[1]) {
                this.resultTips = tips[1];
                return;
            }
            if(this.passRate <= scores[0]) {
                this.resultTips = tips[0];
                return;
            }
        }
    }
}
</script>

<style scoped>
    #practise-result{
        margin-top: 50px;
        height: 100%;
        width: 100%;
        padding: 2rem  0rem ;
        background-size: 100%;
    }
  .page{
    padding: 0.5rem 1rem;
    text-align: left;
  }
</style>
