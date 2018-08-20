<template>
  <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/navbar'

import bottleRefill from '@/assets/GeoJSON/bottle_refill.geojson'
import eco2goReturn from '@/assets/GeoJSON/eco2go_return.geojson'
import foodGlutenFree from '@/assets/GeoJSON/food_gluten_free.geojson'
import foodHalal from '@/assets/GeoJSON/food_halal.geojson'
import foodLocal from '@/assets/GeoJSON/food_local.geojson'
import foodMakeCents from '@/assets/GeoJSON/food_make_cents.geojson'
import foodVegan from '@/assets/GeoJSON/food_vegan.geojson'
import foodVegetarian from '@/assets/GeoJSON/food_vegetarian.geojson'
import tourPath from '@/assets/GeoJSON/tour_path.geojson'
import tourPOI from '@/assets/GeoJSON/tour_poi.geojson'

export default {
  name: 'App',
  components: {
    navbar
  },
  created () {
    let layers = [bottleRefill, eco2goReturn, foodGlutenFree, foodHalal, foodLocal, foodMakeCents, foodVegan, foodVegetarian, tourPath, tourPOI]
    for (let layer of layers) {
      this.$store.commit('addLayer', layer)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
@font-face {
    font-family: 'StratumNo2';
    src: url('/static/fonts/StratumNo2-Bold.woff2') format('woff2'),
        url('/static/fonts/StratumNo2-Bold.woff') format('woff'),
        url('/static/fonts/StratumNo2-Bold.ttf') format('truetype'),
        url('/static/fonts/StratumNo2-Bold.svg#StratumNo2-Bold') format('svg');
    font-weight: bold;
    font-style: normal;
}
body {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
