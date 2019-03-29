<!--
@Author: Brogan Miner <Brogan>
@Date:   2019-03-27T14:08:44-07:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-03-28T17:58:53-07:00
-->

<template>
  <div class="navigation">
    <el-row :display='"flex"' :align='"middle"' class="row">
      <el-col :span='6'>
        <img src='/logo.png' id='logo' />
      </el-col>
      <!-- <el-col :span='8'>
        <el-autocomplete prefix-icon="el-icon-search" v-model="search" :fetch-suggestions="querySearch" placeholder="Search" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      search: ''
    }
  },
  methods: {
    querySearch: function (query, cb) {
      let values = this.$store.getters.allPoints.filter((point, index, arr) => (
        // Check that the item's name includes query
        (point.properties.Name && point.properties.Name.toLowerCase().includes(query.toLowerCase())) ||
        // Check that description includes query
        (point.properties.description && point.properties.description.toLowerCase().includes(query.toLowerCase()))
      )).sort()

      let m = values.map(e => { return e.properties.Name }).sort()
      let c = m.reduce((acc, cur, i) => {
        (!acc[cur]) ? acc[cur] = [values[i]] : acc[cur].push(values[i])
        return acc
      }, {})

      // Build autocomplete list
      let r = []
      Object.keys(c).forEach(function (key) {
        r.push({ value: key, array: c[key] })
      })

      // eslint-disable-next-line
      cb(r)
    },
    handleSelect: function (item) {
      this.$store.commit('filterPoints', item.array)
      this.$eventHub.$emit('updateClusters')
    }
  }
}
</script>

<style scoped>
  .row {
    height: 100%;
    margin: 0.5em;
  }
  .navigation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #D73F09;
    height: 59px;
    border-bottom: solid 1px white;
  }
  #logo {
    height: calc(60px - 1em);
    width: auto;
  }
</style>
