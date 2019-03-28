/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-27T19:13:33-07:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-27T19:13:55-07:00
 */

module.exports = function (api) {
  api.cache(true)
  const presets = [
    '@vue/app'
  ]
  return {
    presets
  }
}
