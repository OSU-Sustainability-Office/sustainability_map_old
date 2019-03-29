/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-27T17:27:22-07:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-28T17:20:38-07:00
 */

import Vue from 'vue'
import Router from 'vue-router'
import feature from '@/components/feature'
import building from '@/components/building'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/building/:buildingID',
      component: building
    },
    {
      path: '/feature/:featureID',
      component: feature
    }
  ]
})
