import Vue from 'vue'
import Vuex from 'vuex'
import ChinaMap from './modules/ChinaMap'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ChinaMap
  }
})
