<template>
  <div id="practise-choose">
    <mt-header fixed title="练习类型">
      <router-link to="/main" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="page-popup-wrapper" v-for="(field,index) in fields"
         :key="index">
      <mt-button @click.native="goTrans(field.fieldId)" size="large" :type="types[index]">{{field.fieldName}}</mt-button>
    </div>
  </div>
</template>

<script>
  import {queryTransData, questionTypes} from "../data/transDao";
  export default {
    data() {
      return {
        fields:null,
        types: ["default","danger","primary"]
      }
    },

    mounted() {
      const vm = this;
      vm.loadQuestionType();
    },
    methods: {
      goTrans(fieldId){
        this.$router.push({name: 'transQuestion', query: {fieldId: fieldId}});
      },
      loadQuestionType() {
        const vm = this;
        questionTypes()
          .then(response => {
             vm.fields= response.data.object;
          });
      },

      backTrans() {
        this.$router.push("/main");
      },

    }
  }
</script>

<style scoped>
  #practise-choose {
    margin-top: 50px;
    height: 100%;
    width: 100%;
    padding: 2rem 0rem;
    background-size: 100%;
  }

  .page-popup-wrapper {
    padding: 0.5rem 1rem;
  }

  .page-popup-wrapper .mint-button {
    margin-top: 1.5rem;
  }
</style>
