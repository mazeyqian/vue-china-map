import Vue from 'vue'
import Index from './components/index.vue'
import store from './store/index'

let ChinaMap = new Vue({
  el: '#app',
  store,
  template: '<Index/>',
  components: {Index}
})

Vue.use(ChinaMap)
