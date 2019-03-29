<!--
@Author: Brogan Miner <Brogan>
@Date:   2019-03-28T17:20:54-07:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-03-28T21:01:41-07:00
-->
<template>
  <el-row class='buildingMainRow'>
    <el-col :span='24' class='buildingMainCol'>
      <el-col :span='24' class='buildingTitle'>
        <i class="el-icon-close" @click='$router.push("/")'></i> {{ buildingNameFromID(buildingID) }}
      </el-col>
      <el-col :span='24' class='buildingImage'>
        <img :src='imageSource' />
      </el-col>
      <el-col :span='24' class='buildingFeatures'>
        Sustainability Features
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item v-for='(feature, index) in queryBuildingFeatures(buildingID)' :title='feature.properties.Name' :name="index" :key='index' class='buildingFeature'>
            {{ feature.properties.description }}
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      imageSource: ''
    }
  },
  created () {
    this.buildingImageSourceFromID(this.buildingID).then(r => {
      this.imageSource = r
    })
  },
  watch: {
    buildingID: function (value) {
      this.buildingImageSourceFromID(value).then(r => {
        this.imageSource = r
      })
    }
  },
  computed: {
    ...mapGetters([
      'queryBuildingFeatures',
      'buildingNameFromID'
    ]),
    buildingID: {
      get () {
        return this.$route.params.buildingID
      }
    }
  },
  methods: {
    ...mapActions([
      'buildingImageSourceFromID'
    ])
  }
}
</script>
<style lang='scss'>
.buildingFeature > * > * {
  background-color: $--color-black !important;
  color: $--color-white;
}
</style>
<style scoped lang='scss'>
.buildingMainRow {
  background-color: $--color-black;
  height: 100%;
}
.buildingImage {
  height: 200px;
  overflow: hidden;
  border-bottom: solid 2px $--color-white;
}
.buildingImage > * {
  width: 100%;
  height: auto;
}
.el-icon-close {
  cursor: pointer;
}
.buildingTitle {
  padding-top: 0.7em;
  padding-bottom: 0.7em;
  padding-left: 0.5em;
  font-size: 28px;
  font-family: "StratumNo2";
  background-color: $--color-primary;
  color: $--color-white;
  border-bottom: solid 2px $--color-white;
  border-top: solid 1px $--color-white;
}
.buildingFeatures {
  font-size: 22px;
  color: $--color-white;
  padding: 1em;
  font-family: "StratumNo2";
}
.el-collapse {
  margin-top: 0.5em;
  height: calc(100vh - 430px);
  overflow: scroll;

}
.el-collapse-item {
  background-color: $--color-black !important;
  font-family: "Open Sans";
}
</style>
