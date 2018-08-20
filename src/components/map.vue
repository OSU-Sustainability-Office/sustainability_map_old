<template>
  <div class='mapFrame'>
    <l-map :style="mapStyle" :zoom="zoom" :center="center" ref='map'>
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-layer-group v-for='data in geojson' :key='data.name' :name='data.name' ref="groups">
          <l-geo-json :geojson='data.json' :options='data.options'></l-geo-json>
        </l-layer-group>
    </l-map>
  </div>
</template>
<script>
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LPolygon, LGeoJson, LLayerGroup } from 'vue2-leaflet'
import Cluster from '../assets/clustering.js'
import mapKey from '@/components/mapKey'

export default {
  name: 'featured',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolygon,
    LGeoJson,
    LLayerGroup,
    mapKey

  },
  data () {
    return {
      zoom: 15.5,
      center: L.latLng(44.565, -123.2785),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapStyle: 'position: absolute;top: 60px;height: calc(100% - 60px);left: 0px; width: calc(100%);',
      geojson: [],
      map: null,
      clusterController: null
    }
  },
  created () {
    this.clusterController = new Cluster()

    for (let layer of this.$store.getters.getAllLayers) {
      this.geojson.push({ name: layer.name, json: layer, options: this.optionsForLayer(layer.name) })
    }

    this.$nextTick(() => {
      this.clusterController.addLayer(Object.values(this.$refs.map.mapObject._layers))
      this.clusterController.addMap(this.$refs.map.mapObject)
    })
  },
  methods: {
    optionsForLayer: function (name) {
      let color = '#FFFFFF'
      switch (name) {
        case 'bottle_refill':
          color = '#4A773C'
          break
        case 'eco2go_return':
          color = '#00859B'
          break
        case 'food_gluten_free':
          color = '#FFB500'
          break
        case 'food_halal':
          color = '#FFB500'
          break
        case 'food_local':
          color = '#006A8E'
          break
        case 'food_make_cents':
          color = '#AA9D2E'
          break
        case 'food_vegan':
          color = '#0D5257'
          break
        case 'food_vegetarian':
          color = '#D3832B'
          break
        case 'tour_path':
          color = '#7A6855'
          break
        case 'tour_poi':
          color = '#003B5C'
          break
        default:
          break
      }
      if (name === 'tour_path') {
        return {
          style: function () {
            return {
              weight: 4,
              color: '#7A6855',
              fillColor: '7A6855',
              fillOpacity: 0.6,
              opacity: 1
            }
          }
        }
      }
      return {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 5,
            fillColor: color,
            color: color,
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
          })
        }
      }
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
