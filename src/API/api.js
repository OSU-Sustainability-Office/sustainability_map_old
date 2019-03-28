/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-26T10:38:48-07:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-27T15:17:17-07:00
 */

import axios from 'axios'

function callAPI (route, data = null, method = 'get', base = '/map/') {
  return axios(process.env.VUE_APP_ROOT_API + base + route, { method: method, data: data, withCredentials: true })
}

export default {
  features: async () => {
    return (await callAPI('features')).data[0].features
  },
  buildings: async () => {
    return (await callAPI('buildings')).data.data
  }
}
