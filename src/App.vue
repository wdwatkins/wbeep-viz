<template>
  <div id="app">
    <div class="main-container">
      <HeaderUSWDSBanner />
      <HeaderUSGS />
      <HeaderUSWDSSelections title="Water Budget Estimation and Evaluation" />
      <MapBox title="A Title Related to Water Availability" />
    </div>
    <FooterUSGS />
  </div>
</template>

<script>
  import HeaderUSWDSBanner from './components/HeaderUSWDSBanner'
  import HeaderUSWDSSelections from './components/HeaderUSWDSSelections'
  import HeaderUSGS from './components/HeaderUSGS'
  import MapBox from './components/MapBox'
  import FooterUSGS from './components/FooterUSGS'

export default {
  name: 'App',
  components: {
    HeaderUSWDSBanner,
    HeaderUSGS,
    HeaderUSWDSSelections,
    MapBox,
    FooterUSGS
  }
}
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
  *:before,
  *:after {
    box-sizing: border-box;
  }
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    position: relative;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .main-container {
    min-height: 100vh; /* will cover the 100% of viewport */
    overflow: hidden;
    display: block;
    position: relative;
    padding-bottom: 100px; /* height of footer */
  }

</style>
