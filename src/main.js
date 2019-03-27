/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-26T18:31:29-07:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-26T18:31:29-07:00
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueI18n from 'vue-i18n'
import vuex from 'vuex'
import elm from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(elm)
Vue.use(VueI18n)
Vue.use(vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.prototype.$eventHub = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
