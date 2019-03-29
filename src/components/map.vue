<!--
@Author: Brogan Miner <Brogan>
@Date:   2019-03-26T12:15:39-07:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-03-28T17:45:32-07:00
-->

<template>
    <l-map :style="mapStyle" :zoom="zoom" :center="center" ref='map' v-loading="!this.queryFeatures(this.queryString) || !this.queryBuildings(this.queryString) || !storeInit">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-geo-json v-for='(item, index) of mapFeatures' :options='jsonOptions' :key='index+"-feature"' :geojson='item' ref="pointLayers"></l-geo-json>
        <l-geo-json v-for='item of this.queryBuildings(this.queryString)' :options='buildingOptions' :key='item.properties.buildingID' :geojson='item' ref="buildingLayers"></l-geo-json>
    </l-map>
</template>
<script>
import L from 'leaflet'
import { mapGetters } from 'vuex'
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet'
// import Cluster from '../assets/clustering.js'
// import mapKey from '@/components/mapKey'

export default {
  name: 'featured',
  props: ['query'],
  components: {
    LMap,
    LTileLayer,
    LGeoJson
  },
  data () {
    return {
      zoom: 15.5,
      center: L.latLng(44.565, -123.2785),
      url: 'https://api.mapbox.com/styles/v1/jack-woods/cjmi2qpp13u4o2spgb66d07ci/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFjay13b29kcyIsImEiOiJjamg2aWpjMnYwMjF0Mnd0ZmFkaWs0YzN0In0.qyiDXCvvSj3O4XvPsSiBkA',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapStyle: 'height: 100%; width: 100%;',
      map: null,
      clusterController: null,
      queryString: /.*/,
      jsonOptions: {
        onEachFeature: (feature, layer) => {
          layer.on('click', e => {

            // window.vue.$eventHub.$emit('clickedFeature', )
            // document.execCommand('copy')
          })
          layer.on('mouseover', function (e) {
            e.target.setStyle({ fillColor: '#000', color: '#000' })
            e.target.bindTooltip(e.target.feature.properties.Name, {className: 'leafletTooltip'}).openTooltip()
          })
          layer.on('mouseout', v => {
            this.$refs.pointLayers.forEach(e => { e.mapObject.resetStyle(v.target) })
          })
        },
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            color: feature.properties.color,
            opacity: 0.75,
            weight: 1,
            fillColor: feature.properties.color,
            fillOpacity: 0.45,
            radius: 5
          })
        }
      },
      buildingOptions: {
        onEachFeature: (feature, layer) => {
          layer.on('click', e => {
            this.$router.push('/building/' + e.target.feature.properties.id)
            // window.vue.$eventHub.$emit('clickedBuilding', )
            // document.execCommand('copy')
          })
          layer.on('mouseover', function (e) {
            e.target.setStyle({ fillColor: '#000', color: '#000' })
            e.target.bindTooltip(e.target.feature.properties.Name, {className: 'leafletTooltip'}).openTooltip()
          })
          layer.on('mouseout', v => {
            this.$refs.buildingLayers.forEach(e => { e.mapObject.resetStyle(v.target) })
          })
        },
        style: {
          weight: 2,
          color: '#D73F09',
          opacity: 1,
          fillColor: '#D73F09',
          fillOpacity: 0.7
        }
      }
    }
  },
  watch: {
    query: function (value) {
      if (value === '') {
        this.queryString = /.*/
      } else {
        this.queryString = value
      }
    }
  },
  mounted () {
  },
  created () {
    // this.clusterController = new Cluster()
    // this.$nextTick(() => {
    //   this.clusterController.addMap(this.$refs.map.mapObject)
    // })
    //
    // this.$eventHub.$on('updateClusters', () => {
    //   this.clusterController.updateClusterPoints()
    // })
  },
  computed: {
    ...mapGetters([
      'queryFeatures',
      'queryBuildings',
      'queryBuildingFeatures',
      'storeInit'
    ]),
    mapFeatures: {
      get () {
        let allFeatures = this.queryFeatures(this.queryString)
        let buildings = this.queryBuildings(this.queryString)
        let buildingFeatures = []
        for (let building of buildings) {
          buildingFeatures = buildingFeatures.concat(this.queryBuildingFeatures(building.properties.id))
        }

        return allFeatures.filter(x => !buildingFeatures.includes(x))
      }
    }
  },
  methods: {
    color: function (name) {
      let color = '#FFFFFF'
      switch (name) {
        case 'Bottle Refill Station':
          color = '#4A773C'
          break
        case 'Eco2Go Return':
          color = '#00859B'
          break
        case 'Gluten-Free':
          color = '#FFB500'
          break
        case 'Halal':
          color = '#FFB500'
          break
        case 'Local':
          color = '#006A8E'
          break
        case 'Make Cents':
          color = '#AA9D2E'
          break
        case 'Vegan':
          color = '#0D5257'
          break
        case 'Vegetarian':
          color = '#D3832B'
          break
        case 'tour_path':
          color = '#7A6855'
          break
        case 'tour_poi':
          color = '#003B5C'
          break
        default:
          color = '#003B5C'
          break
      }
      return color
    },
    flipLine: function (arr) {
      let r = []
      arr.forEach(v => {
        r.push([v[1], v[0]])
      })
      return r
    }
  }
}
</script>

<style lang='scss'>
@import "../../node_modules/leaflet/dist/leaflet.css";
.leafletTooltip {
  background-color: $--color-black;
  color: $--color-white;
  font-family: "StratumNo2";
  font-size: 18px;
}
</style>

<style scoped>
.mapFrame {
  height: 100%;
  width: 100%;
}
</div>
