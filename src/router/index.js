/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-27T17:27:22-07:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-27T17:27:22-07:00
 */

import Vue from 'vue'
import Router from 'vue-router'
import map from '@/components/map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'map',
      component: null
    }
  ]
})
