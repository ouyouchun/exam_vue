<template>
  <div id="index">
    <mt-header fixed title="首页"></mt-header>
    <div class="content">
      <mt-cell-swipe :right="right" title="未读通知">
        <span>
          <mt-badge type="error">10</mt-badge>
        </span>
      </mt-cell-swipe>
      <div class="line-divider">

      </div>
      <!--图片轮播展示-->
      <div class="slider-img">
        <mt-swipe :auto="4000">
          <mt-swipe-item>
            <img src="../assets/tool/swipe1.jpg" height="200" width="100%"/>
          </mt-swipe-item>
          <mt-swipe-item><img src="../assets/tool/swipe2.jpg" height="200" width="100%"/></mt-swipe-item>
          <mt-swipe-item><img src="../assets/tool/swipe3.jpg" height="200" width="100%"/></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="group-title">功能列表</div>
      <!--一条分割线-->
      <div class="line"></div>
      <!--应用展示-->
      <div class="apps">
        <div @click="go('/transChoose')">
          <img src="../assets/tool/chart.png"/>
          <span>在线练习</span>
        </div>
        <div @click="go('/tool/loadmore')">
          <img src="../assets/tool/data.png"/>
          <span>在线考试</span>
        </div>
        <div @click="go('/tool/memolist')">
          <img src="../assets/tool/note.png"/>
          <span>在线报名</span>
        </div>
      </div>

      <div class="apps">
        <div @click="go('/tool/otherTest')">
          <img src="../assets/tool/workflow.png"/>
          <span>在线缴费</span>
        </div>
        <div @click="go('/test/selectHeader')">
          <img src="../assets/components/select.png"/>
          <span>缴费记录</span>
        </div>
        <div @click="go('/test/refresh')">
          <img src="../assets/tool/refresh.png"/>
          <span>个人中心</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .content {
    margin-top: 50px;
  }

  .mint-button {
    display: flex;
    flex-direction: column;
  }

  .content {
    margin-top: 40px;
    text-align: left;
  }

  .group-title {
    margin-top: 10px;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    color: #0c60ee;
    padding-left: 5px;
    border-left: 5px solid #0c60ee;
  }

  .line {
    margin-top: 5px;
    height: 1px;
    background-color: #c4e3f3;
  }

  .apps {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .apps div {
    display: flex;
    height: 100px;
    width: 32%;
    justify-content: center;
    align-items: center;
  }

  .apps div {
    display: flex;
    flex-direction: column;
  }

  .apps div span {
    margin-top: 10px;
    font-size: 14px;
  }

  .apps img {
    height: 40px;
    width: 40px;
  }

  .slider-img {
    height: 200px;
    width: 100%;
  }
</style>
<script>
  import {Toast, MessageBox} from 'mint-ui'
  import SingleSelector from '../components/singleSelector.vue'
  import DialogUtil from '../common/DialogUtil'

  export default {
    methods: {
      go(index){
        this.$router.push(index);
      },

      toggle() {
        this.showCheckbox = !this.showCheckbox
        this.showOperator = !this.showOperator
      },
      choose() {
        this.showPop = true
      },
      toggleSelector(text, value) {
        this.showPop = false
        this.chooseText = text
        this.chooseValue = value
      }
    },
    components: {
      SingleSelector
    },
    data() {
      return {
        errMsg: '请输入正确的内容',
        showOperator: true,
        showCheckbox: false,
        valueKey: 'text',
        showPop: false,
        chooseText: '请选择',
        chooseValue: '',
        sData: [
          {
            flex: 1,
            values: [
              {id: 100, text: '美国队长'},
              {id: 101, text: '钢铁侠'},
              {id: 103, text: '绿巨人'},
              {id: 104, text: '幻视'},
              {id: 105, text: '猩红女巫'},
              {id: 106, text: '洛基'},
              {id: 107, text: '雷神'},
              {id: 108, text: '鹰眼'}
            ],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        right: [
          {
            content: '删除',
            style: {
              background: 'red',
              color: '#fff',
              width: '50px',
              textAlign: 'center'
            },
            handler: () =>
              this.$messagebox({
                title: '提示',
                message: '确定执行此操作?',
                showCancelButton: true
              }).then(action => {
                if (action === 'confirm') {
                  Toast({message: '删除成功'})
                } else {
                }
              })
          }
        ]
      }
    }
  }
</script>
