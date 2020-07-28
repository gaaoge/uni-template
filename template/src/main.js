import Vue from 'vue'
import App from './App'
import store from './store'

// Vue实例
const app = new Vue({
  store,
  ...App,
})
app.$mount()
