/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-26T10:38:55-07:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-26T19:22:52-07:00
 */

import API from '@/API/api.js'
import SMFeature from '@/assets/SMFeature.js'

const state = {
  features: [] //  Of type SMFeature
}

const getters = {
  queryFeatures: state => query => {
    let matchedItems = []
    for (let feature of state.features) {
      matchedItems = matchedItems.concat(feature.queryItems(query))
    }
    return JSON.parse(JSON.stringify(matchedItems))
  }
}

const mutations = {
  addFeature: (state, feature) => {
    state.features.push(feature)
  }
}

const actions = {
  loadAllFeatures: async ({ dispatch, commit, getters }, payload) => {
    let features = await API.features()
    for (let feature of features) {
      commit('addFeature', new SMFeature(feature.name, feature.items, feature.color))
    }
    return Promise.resolve()
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
