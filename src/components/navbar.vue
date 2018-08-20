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
      let values = this.$store.getters.getAllPoints.filter(point => (point.properties.Name && point.properties.Name.includes(query)) || (point.properties.description && point.properties.description.includes(query)))
      let r = []
      for (let v of values) {
        r.push({ value: v.properties.Name })
      }
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
