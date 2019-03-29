<!--
@Author: Brogan Miner <Brogan>
@Date:   2019-03-27T17:28:17-07:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-03-28T20:23:30-07:00
-->

<template>
  <el-row class="main">
    <el-col :span='24' class="head">
      <el-row class="title">
        OSU Sustainability Map
      </el-row>
      <el-row class='searchBar'>
        <el-col :span='24' class='searchcol'>
          <el-autocomplete placeholder="Search" v-model="searchString" class='searchInput' :fetch-suggestions="suggest">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-autocomplete>
        </el-col>
      </el-row>
      <el-row class='keyStart'>
        <el-col :span='24'>
          <el-row class='keyTitleRow'>
            <el-col :span='24' class='keyTitleCol'>
              Map Key
            </el-col>
          </el-row>
          <el-row class='keyElementsRow'>
            <el-col :span='24' class='keyElement halal' @click='disable("Halal")'>Halal Food Options</el-col>
            <el-col :span='24' class='keyElement vegan' @click='disable("Vegan")'>Vegan Food Options</el-col>
            <el-col :span='24' class='keyElement vegetarian' @click='disable("Vegetarian")'>Vegetarian Food Options</el-col>
            <el-col :span='24' class='keyElement local' @click='disable("Local")'>Local Food Options</el-col>
            <el-col :span='24' class='keyElement bottlerefill' @click='disable("Bottle Refill")'>Bottle Refill Station</el-col>
            <el-col :span='24' class='keyElement glutenfree' @click='disable("Gluten Free")'>Gluten Free Food Options</el-col>
            <el-col :span='24' class='keyElement eco2go' @click='disable("Eco2Go Return")'>Eco2Go Return Box</el-col>
            <el-col :span='24' class='keyElement makecents' @click='disable("Make Cents")'>Make Cents Food Option</el-col>
            <el-col :span='24' class='keyElement tour' @click='disable("Tour POI")'>Sustainability Tour POI</el-col>
            <el-col :span='24' class='keyElement building' @click='disable("Buildings")'>Building with Sustainability Features</el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'mapKey',
  props: ['query'],
  data () {
    return {
      input23: ''
    }
  },
  computed: {
    ...mapGetters([
      'queryFeatures',
      'queryBuildings'
    ]),
    searchString: {
      get () {
        return this.query
      },
      set (value) {
        this.$emit('updateQuery', value)
      }
    }
  },
  methods: {
    suggest: function (value, cb) {
      let links = this.queryFeatures(value).concat(this.queryBuildings(value))
      let result = []
      for (let link of links) {
        if (!result.find(e => { return e.value === link.properties.Name })) {
          result.push({ value: link.properties.Name })
        }
      }
      cb(result)
    }
  }
}
</script>
<style lang='scss'>
.searchInput > .el-input > .el-input__inner {
  background-color: $--color-black;
  color: $--color-white;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  .head {
    font-family: "StratumNo2";
    font-size: 38px;
    color: $--color-white;
    text-align: center;
    padding-top: 0.5em;
  }
  .main {
    top: 0px;
    height: 100%;
    background-color: $--color-black;
    padding: 1em;
  }
  .searchBar {
    padding-top: 0.5em;
  }
  .searchInput {
    width: 100%;
  }
  .keyTitleRow {
    padding-top: 1em;
  }
  .keyTitleCol {
    text-align: left;
    font-size: 28px;
  }
  .keyElement {
    font-size: 16px;
    text-align: left;
    padding-top: 0.5em;
    font-family: "Open Sans";
    cursor: pointer;
  }
  .keyElement::before {
    content: "\00a0";
    background-color: white;
    width: 18px;
    height: 18px;
    border-radius: 10px;
    display: inline-block;
    margin-right: 0.7em;
    position: relative;
    top: 3px;
    border: solid 1px white;
  }
  .halal::before {
    background-color: #FFB50088;
    border-color: #FFB500;
  }
  .vegan::before {
    background-color: #0D525788;
    border-color: #0D5257;
  }
  .vegetarian::before {
    background-color: #D3832B88;
    border-color: #D3832B;
  }
  .local::before {
    background-color: #006A8E88;
    border-color: #006A8E;
  }
  .bottlerefill::before {
    background-color: #4A773C88;
    border-color: #4A773C;
  }
  .glutenfree::before {
    background-color: #FFB50088;
    border-color: #FFB500;
  }
  .eco2go::before {
    background-color: #00859B88;
    border-color: #00859B;
  }
  .makecents::before {
    background-color: #AA9D2E88;
    border-color: #AA9D2E;
  }
  .tour::before {
    background-color: #003B5C88;
    border-color: #003B5C;
  }
  .building::before {
    background-color: #D73F0988;
    border-color: #D73F09;
    border-radius: 0;
  }
  .disabled::before {
    background-color: #ffffff88;
    border-color: #ffffff;
  }
</style>
