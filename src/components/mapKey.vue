<template>
  <div class="main container">
    <div class="head row">
      <div class="col text-center">
        OSU Sustainability Map
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mapKey',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .head {
    font-family: "StratumNo2";
  }
  .main {
    position: absolute;
    right: -350px;
    top: 0px;
    width: 350px;
    height: 100%;
    margin-right: 350px;
    background-color: red;
    z-index: 2000;
  }
</style>
