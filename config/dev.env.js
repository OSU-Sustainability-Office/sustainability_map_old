/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-26T12:15:07-07:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-26T18:42:55-07:00
 */

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_ROOT_API: '"http://localhost:3000"'
})
