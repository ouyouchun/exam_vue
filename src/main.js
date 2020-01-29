// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import './assets/css/common.scss';
// import iView from 'iview';
// import 'iview/dist/styles/iview.css'
import store from './store/';



Vue.use(Mint);
Vue.prototype.axios = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
