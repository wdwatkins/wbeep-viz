<template>
  <div id="app">
    <HeaderUSWDSBanner />
    <HeaderUSGS />
    <MapBox title="National Integrated Water Availability Assessments" />
    <footerEmail />
    <FooterUSGS />
  </div>
</template>

<script>
    import HeaderUSWDSBanner from './components/HeaderUSWDSBanner'
    import HeaderUSGS from './components/HeaderUSGS'
    import MapBox from './components/MapBox'
    import footerEmail from './components/footerEmail'
    import FooterUSGS from './components/FooterUSGS'

    export default {
        name: 'App',
        components: {
            HeaderUSWDSBanner,
            HeaderUSGS,
            MapBox,
            footerEmail,
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
    width: 100vw;
  }

  @media screen and (min-width: 601px){
    body{
      height: 100vh;
    }
    #app{
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
  }
</style>
