// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import StoreJS from './Store'
import router from './router'
import VueI18n from 'vue-i18n'
import vuex from 'vuex'
import elm from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(elm)
Vue.use(VueI18n)
Vue.use(vuex)

const store = new vuex.Store(StoreJS)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
