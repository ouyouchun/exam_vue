<template>
  <div class="page-field">
    <mt-header fixed title="注册">
      <router-link to="/main" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="register">
      <!--<div class="top">
        <p class="title">用户详细信息</p>
      </div>-->
      <div class="section">
        <mt-field v-model="userName" placeholder="用户名" :attr="{ maxlength: 10 }"></mt-field>
        <mt-field v-model="trueName" placeholder="真实姓名" :attr="{ maxlength: 10 }"></mt-field>
        <mt-field v-model="nationalId" placeholder="身份证号" type="number" :attr="{ oninput: 'if(value.length>18)value=value.slice(0,18)' }"></mt-field>
      </div>
    </div>
    <div class="buttons-group">
      <mt-button type="primary" size="large" @click="commit">提 交</mt-button>
    </div>
  </div>
</template>

<script>
  import {Toast} from "mint-ui";
  import {checkIdCard} from '../utils/common';
  import {userRegister} from "../data/transDao";

  export default {
      name: 'register',
      data() {
        return {
          userName: "",
          trueName: "",
          nationalId: ""
        }
      },
      methods: {
        formValid: function() {
          const vm = this;

          if(vm.userName.trim() == "") {
            Toast("请输入用户名");
            return false;
          }
          if(vm.trueName.trim() == "") {
            Toast("请输入真实姓名");
            return false;
          }
          if(vm.nationalId.trim() == "") {
            Toast("请输入身份证号");
            return false;
          }
          
          const checkBoolean = checkIdCard(vm.nationalId.trim());
          if(!checkBoolean) {
            Toast("请输入正确身份证号");
            return false;
          }
          return true;
        },
        commit: function() {
          const vm = this;
          if(!vm.formValid()) {
            return;
          }

          userRegister(vm.userName.trim(), vm.trueName.trim(), vm.nationalId.trim())
              .then(response => {
                const result = response.data.result;
                if(result == 'success') {
                    Toast("注册成功");
                    this.$router.push("/login");
                }else {
                    Toast(response.data.messageInfo);
                }
              });
        }
      }
  };
</script>
<style>
  /* 上面的线隐藏 */
  .mint-cell-wrapper  {
    background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%) !important;
    border-bottom: 1px solid #26a2ff;
    margin: 0 5%;
    padding: 0 2% !important;
  }
  /* 修改默认 butoon 的样式 */
  .mint-button--primary {
      border-radius: 25px;
  }
  .mint-button--large {
    width: 80%;
  }
  .register{
    margin-top: 100px;
    width: 100%;
    height: 100%;
    font-size: 1rem;
  }
  .register .top{
    padding-left: 10px;
    padding-top: .9rem;
    text-align: left;
  }
  .register .section
  {
    padding: .9rem  0;
    text-align: left;
  }
  .mint-cell-wrapper {
    background-image:-webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image:linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: top left;
    background-origin: content-box;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 16px;
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 0 10%;
    width: 100%;
    font-size: .9rem;
  }
  .mint-field {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .mint-field .mint-cell-title {
    width: 105px;
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
  }
  .mint-field .mint-cell-value {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .mint-field-core {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    border: 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    outline: 0;
    line-height: 1.6;
    font-size: inherit;
    width: 100%;
  }
  .buttons-group{
    padding: 45px 0px;
  }
  .buttons-group button{
    padding-left: 25px;
    padding-right: 25px;
    margin: auto;
  }
</style>
