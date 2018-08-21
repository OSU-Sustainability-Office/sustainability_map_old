const store = {
  state: {
    geolayers: []
  },
  getters: {
    getLayerWithName: (state) => (name) => {
      return state.geolayers.find(element => element.name === name)
    },
    getAllLayers: state => {
      return state.geolayers
    },
    getAllPoints: state => {
      let r = []
      for (let layer of state.geolayers) {
        r = r.concat(layer.features)
      }
      return r
    }
  },
  mutations: {
    addLayer (state, layer) {
      state.geolayers.push(layer)
    }
  }
}

export default store
