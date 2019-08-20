<template>
  <div id="viz_container">
    <div class="header-container">
      <div class="usa-prose">
        <h2 class="title-text">
          {{ title }}
        </h2>
      </div>
      <hr>

      <nav
        id="layer-bar"
        class="layer-toggle"
      />
    </div>
    <LayerToggle />
    <MapLegend :legend-title="legendTitle" />
    <MglMap
      id="map"
      :container="container"
      :map-style="mapStyle"
      :zoom="zoom"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :center="center"
      @load="onMapLoaded"
    >
      <MglScaleControl
        position="bottom-right"
        unit="imperial"
      />
      <MglNavigationControl
        position="bottom-right"
        :show-compass="false"
      />
      <MglGeolocateControl
        position="bottom-right"
      />
      <MglFullscreenControl
        position="bottom-right"
      />
    </MglMap>
  </div>
</template>

<script>
    import MapLegend from './MapLegend'
    import LayerToggle from "./LayerToggle";
    import {
        MglMap,
        MglNavigationControl,
        MglGeolocateControl,
        MglFullscreenControl,
        MglScaleControl
    } from "vue-mapbox";
    import mapStyles from '../assets/mapStyles/mapStyles';

    export default {
        name: 'MapBox',
        components: {
            MglMap,
            MglNavigationControl,
            MglGeolocateControl,
            MglFullscreenControl,
            MglScaleControl,
            MapLegend,
            LayerToggle
        },
        props: {
            title: {
                type: String,
                default: 'Add your title in App.vue or make this blank'
            },
        },
        data() {
            return {
                mapStyle: mapStyles.style,
                container: 'map',
                zoom: 4,
                minZoom: 4,
                maxZoom: 8,
                center: [-95.7129, 37.0902],
                hoveredHRUId: null,
                legendTitle: 'Calculated Availability'
            }
        },
        methods: {
            onMapLoaded(event) {
                let map = event.map; // This gives us access to the map as an object but only after the map has loaded

                // map.fitBounds([[
                //     -126, 49
                // ], [
                //     -66, 24
                // ]]);

                // Next section gives us names for the layer toggle buttons
                let styleLayers = Object.values(mapStyles.style.layers); // Pulls the layers out of the styles object as an array
                let toggleableLayerIds = [];

                for (let index = 0; index < styleLayers.length; index++) {
                    if (styleLayers[index].showButton === true) { // note: to NOT show a layer, change the 'showButton' property in the mapStyles.js to false
                        toggleableLayerIds.push(styleLayers[index].id)
                    }
                }

                // Go through each layer id that is in the array and make a button element for it
                for (let i = 0; i < toggleableLayerIds.length; i++) {
                    let id = toggleableLayerIds[i];

                    let link = document.createElement('button');
                    link.href = '#';
                    link.className = 'usa-button--accent-cool';
                    link.textContent = id;

                    // Creates a click event for each button so that when clicked by the user, the visibility property
                    // is changed as is the class (color) of the button
                    link.onclick = function (e) {
                        let clickedLayer = this.textContent;
                        e.preventDefault();
                        e.stopPropagation();

                        let visibility = map.getLayoutProperty(clickedLayer, 'visibility');

                        if (visibility === 'visible') {
                            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                            this.className = 'usa-button--base';
                        } else {
                            this.className = 'usa-button--accent-cool';
                            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                        }
                    };

                    // Add the toggle layer buttons to the 'layer-bar' element
                    let layers = document.getElementById('layer-bar');
                    layers.appendChild(link);
                }

                // next section controls the HRU hover effect
                let hoveredHRUId = this.hoveredHRUId;
                map.on("mousemove", "HRUS Fill Colors", function(e) {
                    if (e.features.length > 0) {
                        if (hoveredHRUId) {
                            map.setFeatureState({source: 'HRU', sourceLayer: 'hrus', id: hoveredHRUId}, { hover: false});
                        }
                        hoveredHRUId = e.features[0].id;
                        map.setFeatureState({source: 'HRU', sourceLayer: 'hrus', id: hoveredHRUId}, { hover: true});
                    }
                });
                map.on("mouseleave", "HRUS Fill Colors", function() {
                    if (hoveredHRUId) {
                        map.setFeatureState({source: 'HRU', sourceLayer: 'hrus', id: hoveredHRUId}, { hover: false});
                    }
                    hoveredHRUId =  null;
                });
            }
        }
    }
</script>

<style scoped lang="scss">
  @import"~mapbox-gl/dist/mapbox-gl.css";

  .header-container {
    background-color: white;
  }

  nav {
    background-color: red;
  }

  #map {
    position: absolute;
    z-index: -1;
    top: 100px;
    bottom: 0;
    width: 100%;
  }
  /*#layer-bar {*/
  /*  width: 100%;*/
  /*  background-color: yellow;*/
  /*  padding: 4px 4px 5px 4px;*/
  /*  overflow: auto;*/
  /*}*/

  /*#layer-bar a {*/
  /*  background-color: blue;*/
  /*  float: left;*/
  /*  padding: 12px;*/
  /*  color: white;*/
  /*  text-decoration: none;*/
  /*  font-size: 17px;*/
  /*  width: 10%;*/
  /*  text-align: center;*/
  /*}*/

  /*#layer-bar a:hover {*/
  /*  background-color: #000;*/
  /*}*/

  /*#layer-bar a.active {*/
  /*  background-color: #4CAF50;*/
  /*}*/



  /*@media screen and (max-width: 500px) {*/
  /*  .layer-toggle a {*/
  /*    float: none;*/
  /*    display: block;*/
  /*    width: 100%;*/
  /*    text-align: left;*/
  /*  }*/
  /*}*/



  /* override USWDS style to prevent title from wrapping too soon */
  .title-text {
    margin-left: 1.5rem;
    padding-top: 0.5rem;
  }

  /* make the line below the title stay off the title but snug up to the map */
  hr {
    margin: 2px 0 0 0;
    padding-bottom: 0;
  }
</style>
