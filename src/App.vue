<!--
@Author: Brogan Miner <Brogan>
@Date:   2019-03-26T12:00:17-07:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-03-27T19:30:16-07:00
-->

<template>
  <el-container id="app">
    <el-header>
      <navbar />
    </el-header>
    <el-main style='height: 100%; width: 100%'>
      <el-row style='height: 100%'>
        <el-col :span='6' style='height: 100%;'>
          <mapkey />
        </el-col>
        <el-col :span='12' style='height: 100%;'>
          <mapview />
        </el-col>
        <el-col :span='6' style='height: 100%;'>
          <router-view/>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import navbar from '@/components/navbar'
import mapview from '@/components/map'
import mapkey from '@/components/mapKey'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    navbar,
    mapview,
    mapkey
  },
  created () {
    // Initialize Store
    this.loadAllFeatures().then(() => {
      this.loadAllBuildings()
    })
  },
  methods: {
    ...mapActions([
      'loadAllFeatures',
      'loadAllBuildings'
    ])
  }
}
</script>
<style lang='scss'>
@import "~element-ui/packages/theme-chalk/src/index";
</style>
<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
@font-face {
    font-family: 'StratumNo2';
    src: url('/fonts/StratumNo2-Bold.woff2') format('woff2'),
        url('/fonts/StratumNo2-Bold.woff') format('woff'),
        url('/fonts/StratumNo2-Bold.ttf') format('truetype'),
        url('/fonts/StratumNo2-Bold.svg#StratumNo2-Bold') format('svg');
    font-weight: bold;
    font-style: normal;
}
body {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  margin: 0;
}
#app {
  height: 100vh;
  width: 100vw;
}
.el-main {
  padding: 0;
  margin: 0;
}
.el-row {
  padding: 0;
  margin: 0;
}
.el-col {
  padding: 0;
  margin: 0;
}
</style>
