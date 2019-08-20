<template>
  <div id="layer_toggle_container">
    <font-awesome-icon
      icon="layer-group"
      class="layer-icon"
    />
  </div>
</template>

<script>
   export default {
      name: 'LayerToggle',
      methods: {
          onMapLoaded(event) {
              let map = event.map;
          }
      }
  }

</script>

<style scoped lang="scss">
  .layer-icon {
    height: 30px;
    width: 30px;
  }
</style>