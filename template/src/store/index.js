import Vue from 'vue'
import Vuex from 'vuex'
import stores from './stores'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  ...stores
})
Vue.prototype.$store = store

export default store
