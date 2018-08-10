<template>
  <div class='mapFrame'>
    <l-map :style="mapStyle" :zoom="zoom" :center="center" ref='map'>
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-layer-group v-for='data in geojson' :name='data.name' ref="groups">
          <l-geo-json :geojson='data.json' :options='data.options'></l-geo-json>
        </l-layer-group>
    </l-map>
  </div>
</template>
<script>
import { LMap, LTileLayer, LMarker, LPolygon, LGeoJson, LLayerGroup } from 'vue2-leaflet'
import axios from 'axios'
import cluster from '../assets/clustering.js'

var bottleRefillIcon = L.icon({
  iconUrl: 'static/images/bottle_refill.png',
  iconSize: [32,32],
  iconAnchor: [16,16],
  popupAnchor: [16,0]
});


export default {
name: 'featured',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolygon,
    LGeoJson,
    LLayerGroup
  },
  data() {
    return {
      zoom:15.5,
      center: L.latLng(44.565, -123.2785),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapStyle: "position: absolute;top: 0px;height: calc(100%);left: 0px;",
      geojson: [],
      map: null,
      clusterController: null,
      bottleRefillOptions: {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 5,
            fillColor: "#4A773C",
            color: "#4A773C",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
          });
        }
      },
      eco2goReturnOptions: {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 5,
            fillColor: "#00859B",
            color: "#00859B",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
          });
        }
      },
      foodGlutenFreeOptions: {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 5,
            fillColor: "#FFB500",
            color: "#FFB500",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
          });
        }
      },
      foodHalalOptions: {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 5,
            fillColor: "#FFB500",
            color: "#FFB500",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
          });
        }
      },
      foodLocalOptions: {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 5,
            fillColor: "#006A8E",
            color: "#006A8E",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
          });
        }
      },
      foodMakeCentsOptions: {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 5,
            fillColor: "#AA9D2E",
            color: "#AA9D2E",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
          });
        }
      },
      foodVeganOptions: {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 5,
            fillColor: "#0D5257",
            color: "#0D5257",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
          });
        }
      },
      foodVegetarianOptions: {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 5,
            fillColor: "#D3832B",
            color: "#D3832B",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
          });
        }
      },
      tourPathOptions: {
        style: function() {
          return {
            weight: 4,
            color: '#7A6855',
            fillColor: '7A6855',
            fillOpacity: 0.6,
            opacity: 1
          }
        }
      },
      tourPOIOptions: {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 5,
            fillColor: "#003B5C",
            color: "#003B5C",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
          });
        }
      }
    }
  },
  created() {
    var promises = [];
    this.clusterController = new cluster();
    promises.push(axios.get('/static/GeoJSON/bottle_refill.geojson').then(res => {this.geojson.push({name:'bottle_refill',json:res.data,options:this.bottleRefillOptions})}));
    promises.push(axios.get('/static/GeoJSON/eco2go_return.geojson').then(res => {this.geojson.push({name:'eco2eco2go_return',json:res.data,options:this.eco2goReturnOptions})}));
    promises.push(axios.get('/static/GeoJSON/food_gluten_free.geojson').then(res => {this.geojson.push({name:'food_gluten_free',json:res.data,options:this.foodGlutenFreeOptions})}));
    promises.push(axios.get('/static/GeoJSON/food_halal.geojson').then(res => {this.geojson.push({name:'food_halal',json:res.data,options:this.foodHalalOptions})}));
    promises.push(axios.get('/static/GeoJSON/food_local.geojson').then(res => {this.geojson.push({name:'food_local',json:res.data,options:this.foodLocalOptions})}));
    promises.push(axios.get('/static/GeoJSON/food_make_cents.geojson').then(res => {this.geojson.push({name:'food_make_cents',json:res.data,options:this.foodMakeCentsOptions})}));
    promises.push(axios.get('/static/GeoJSON/food_vegan.geojson').then(res => {this.geojson.push({name:'food_vegan',json:res.data,options:this.foodVeganOptions})}));
    promises.push(axios.get('/static/GeoJSON/food_vegetarian.geojson').then(res => {this.geojson.push({name:'food_vegetarian',json:res.data,options:this.foodVegetarianOptions})}));
    promises.push(axios.get('/static/GeoJSON/tour_path.geojson').then(res => {this.geojson.push({name:'tour_path',json:res.data,options:this.tourPathOptions})}));
    promises.push(axios.get('/static/GeoJSON/tour_poi.geojson').then(res => {this.geojson.push({name:'tour_poi',json:res.data,options:this.tourPOIOptions})}));
    Promise.all(promises).then(()=> {


      // for (var com of this.$refs.groups) {
      //   //This is kind of hacky but I could only really find the layer info this way
      //   var layerObjects = Object.values(Object.values(com.mapObject._layers)[0]._layers);
      //   console.log(com);
      //   var layerName = com.$attrs.name;
      //   if (layerName !=="tour_path")
      //     for (var layer of layerObjects)
      //       this.clusterController.addLayer(layerObjects);
      // }

      this.clusterController.addLayer(Object.values(this.$refs.map.mapObject._layers));
      this.clusterController.addMap(this.$refs.map.mapObject);
    });
  }
}
</script>

<style>
@import "../../node_modules/leaflet/dist/leaflet.css";
</style>

<style scoped>
.mapFrame {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
}
</div>
