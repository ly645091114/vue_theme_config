import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './registerServiceWorker'
import compontents from './components'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'
import 'styles/index.scss'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(compontents)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
