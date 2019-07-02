<template>
  <div id="app">
    <HeaderUSGS></HeaderUSGS>
    <MapBox></MapBox>
    <FooterUSGS></FooterUSGS>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HeaderUSGS from './components/HeaderUSGS'
import MapBox from './components/MapBox'
import FooterUSGS from './components/FooterUSGS' //this line is the module import

export default {
  name: 'app',
  components: {
    HelloWorld,
    HeaderUSGS,
    MapBox,
    FooterUSGS
  }
}
</script>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
