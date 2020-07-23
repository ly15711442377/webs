import Vue from 'vue'
import Vuex from 'vuex'
import loginModule from './moudles/islogin'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createLogger()],
  modules: {
    loginModule
  }
})
