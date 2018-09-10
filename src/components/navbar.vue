<template>
  <div class="navigation">
    <el-row :display='"flex"' :align='"middle"' class="row">
      <el-col :span='6'>
        <img src='/static/logo.png' id='logo' />
      </el-col>
      <el-col :span='8'>
        <el-autocomplete prefix-icon="el-icon-search" v-model="search" :fetch-suggestions="querySearch" placeholder="Search" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
      </el-col>
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

      let values = this.$store.getters.getAllPoints.filter((point, index, arr) => (
          // Check that the item's name includes query
          (point.properties.Name && point.properties.Name.toLowerCase().includes(query.toLowerCase()))
          // Check that description includes query
          || (point.properties.description && point.properties.description.toLowerCase().includes(query.toLowerCase()))
      )

      for (let i = 0; i < values.length; i++) {

      }


        forEach(function(point) {
          // Filter duplicates
          && inputArray.map(point => point.properties.Name).indexOf(point.properties.Name) === index)
        })


      // Build autocomplete list
      let r = []
      values.forEach(function(point) {
        r.push({ value: point.properties.Name })
      })

      // eslint-disable-next-line
      cb(r)
    },
    handleSelect: function (item) {
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
    height: 60px;
  }
  #logo {
    height: calc(60px - 1em);
    width: auto;
  }
</style>
