<!--
@Author: Brogan Miner <Brogan>
@Date:   2019-03-26T12:15:39-07:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-03-26T19:33:48-07:00
-->

<template>
  <div class='mapFrame'>
    <l-map :style="mapStyle" :zoom="zoom" :center="center" ref='map'>
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-geo-json v-for='(item, index) of this.queryFeatures(this.queryString)' :options='jsonOptions' :key='index' :geojson='item' ref="geoLayer"></l-geo-json>
    </l-map>
  </div>
</template>
<script>
import L from 'leaflet'
import { mapGetters, mapActions } from 'vuex'
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet'
import Cluster from '../assets/clustering.js'
// import mapKey from '@/components/mapKey'

export default {
  name: 'featured',
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
      mapStyle: 'position: absolute;top: 60px;height: calc(100% - 60px);left: 0px; width: calc(100%);',
      map: null,
      clusterController: null,
      queryString: /.*/,
      jsonOptions: {
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
      }
    }
  },
  mounted () {

  },
  created () {
    this.clusterController = new Cluster()
    this.$nextTick(() => {
      this.clusterController.addMap(this.$refs.map.mapObject)
    })

    this.$eventHub.$on('updateClusters', () => {
      this.clusterController.updateClusterPoints()
    })
    this.loadAllFeatures()
  },
  computed: {
    ...mapGetters([
      'queryFeatures'
    ])
  },
  methods: {
    ...mapActions([
      'loadAllFeatures'
    ]),
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

<style>
@import "../../node_modules/leaflet/dist/leaflet.css";
</style>

<style scoped>
.mapFrame {
  position: absolute;
  top: 60px;
  left: 0px;
  height: 100%;
  width: 100%;
}
</div>
