/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-27T14:25:30-07:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-28T17:11:45-07:00
 */

class SMBuilding {
  constructor (buildingJSON) {
    this.type = 'Feature'
    this.properties = {
      Name: buildingJSON.attributes.name,
      id: buildingJSON.id,
      active: false
    }
    this.geometry = buildingJSON.attributes.geometry
  }

  query (regEx) {
    return this.properties.Name.match(regEx)
  }
}

export default SMBuilding
