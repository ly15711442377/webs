import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios"
import api from "./api"
import './plugins/element.js'
import './assets/css/common.css'
import VueUeditorWrap from 'vue-ueditor-wrap'
Vue.component('vue-ueditor-wrap', VueUeditorWrap)
Vue.prototype.$api = api
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
if(localStorage.getItem('token')){
  store.commit("loginModule/setToken",localStorage.getItem("token"));
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
