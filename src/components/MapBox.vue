<template>
  <div id="viz_container">
    <div class="header-container">
      <div class="usa-prose">
        <h2 class="title-text">{{ title }}</h2>
      </div>
      <div id="mapbox_component-layer-toggle" class="mapbox_component-topnav">
        <div id="topNavText">
          <a id="map-layers-label" href="#" class="active">Map Options</a>
        </div>
        <div id="ToggleOptions"></div>
        <div id="iconToggleContainer">
          <a
            href="javascript:void(0);"
            class="icon"
            id="layerToggle"
          >
            <font-awesome-icon icon="layer-group" />
          </a>
          <a
            href="javascript:void(0);"
            class="icon"
            id="streamToggle"
          >
            <font-awesome-icon icon="water" />
          </a>
        </div>
      </div>
    </div>
    <div id="mapContainer">
      <MapSubtitle />
      <MapLegend :legend-title="legendTitle" />
      <MglMap
        id="map"
        :container="container"
        :map-style="mapStyle"
        :zoom="zoom"
        :min-zoom="minZoom"
        :max-zoom="maxZoom"
        :center="center"
        :pitch="pitch"
        :bearing="bearing"
        :pitch-with-rotate="false"
        :drag-rotate="false"
        :touch-zoom-rotate="false"
        :access-token="accessToken"
        @load="onMapLoaded"
      >
        <MglAttributionControl
          position="bottom-right"
          :compact="false"
          custom-attribution="© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <MglScaleControl position="bottom-right" unit="imperial" />
        <MglNavigationControl position="top-left" :show-compass="false" />
        <MglGeolocateControl position="top-right" />
        <MglFullscreenControl position="top-right" />
      </MglMap>
    </div>
<!--    If  you would like to see a current zoom level while doing development un-comment the following section,  -->
<!--    and the ZOOM LEVEL code section. Hint, search for 'ZOOM LEVEL' to find the needed code section. -->
<!--    <div>-->
<!--      Current Zoom Level (listed for development purposes):-->
<!--      <span id="zoomlevel" />-->
<!--    </div>-->
  </div>
</template>
<script>
import MapSubtitle from "./MapSubtitle";
import MapLegend from "./MapLegend";
import {
  MglMap,
  MglNavigationControl,
  MglGeolocateControl,
  MglFullscreenControl,
  MglScaleControl,
  MglAttributionControl
} from "vue-mapbox";
import mapStyles from "../assets/mapStyles/mapStyles";

export default {
  name: "MapBox",
  components: {
    MglMap,
    MapSubtitle,
    MglNavigationControl,
    MglGeolocateControl,
    MglFullscreenControl,
    MglScaleControl,
    MglAttributionControl,
    MapLegend
  },
  props: {
    title: {
      type: String,
      default: "Add your title in App.vue or make this blank"
    }
  },
  data() {
    return {
      mapStyle: mapStyles.style,
      container: "map",
      zoom: 3,
      minZoom: 2,
      maxZoom: 9,
      center: [-95.7129, 37.0902],
      pitch: 0, // tips the map from 0 to 60 degrees
      bearing: 0, // starting rotation of the map from 0 to 360
      hoveredHRUId: null,
      legendTitle: "Current Water Status",
      accessToken:
        "pk.eyJ1IjoiYWJyaWdncyIsImEiOiJjandrd3J4bmMwcjNpNGFxZ2hoZGE2djR5In0.gKPNdhLzvbzui4aiIwAihA"
    };
  },
  methods: {
    onMapLoaded(event) {
      let map = event.map; // This gives us access to the map as an object but only after the map has loaded

      // Once map is loaded zoom in a bit more so that the map neatly fills the screen
      map.fitBounds([[-128, 23], [-65, 49]]);

      // For now, I am going to duplicate this code section for each set of toggles (currently layers and streams), ideally this would be
      // in separate components, but for prototyping purposes this is fine for now.

      // Next section gives us names for the layer toggle buttons
      let styleLayers = Object.values(mapStyles.style.layers); // Pulls the layers out of the styles object as an array
      let toggleableLayerIds = [];
      let layersTurnedOffAtStart = [];
      // Next section gives us names for the streams toggle buttons
      let toggleableStreamsIds = [];
      let streamsTurnedOffAtStart = [];

      for (let index = 0; index < styleLayers.length; index++) {
        if (styleLayers[index].showButtonLayerToggle === true) {
          // note: to NOT show a button for layer, change the 'showButtonLayerToggle' property in the mapStyles.js to false
          toggleableLayerIds.push(styleLayers[index].id);

          // Make a list if ids of any layers that we do not want to show when the page loads (layers that are toggleable but are off by default)
          // These layers that are off by default have a visibility of 'none' in the style sheet.
          if (styleLayers[index].layout.visibility === "none") {
            layersTurnedOffAtStart.push(styleLayers[index].id);
          }
        } else if (styleLayers[index].showButtonStreamToggle === true) {
          toggleableStreamsIds.push(styleLayers[index].id);
          // Make a list if ids of any layers that we do not want to show when the page loads (layers that are toggleable but are off by default)
          // These layers that are off by default have a visibility of 'none' in the style sheet.
          if (styleLayers[index].layout.visibility === "none") {
            streamsTurnedOffAtStart.push(styleLayers[index].id);
          }
        }
      }
      //Creates toggles based on which arrays are pushed to this function
      let createToggles = function(layers, off) {
        // Go through each layer id that is in the array and make a button element for it
        for (let i = 0; i < layers.length; i++) {
          let id = layers[i];
          let link = document.createElement("a");
          link.href = "#";
          // If the layer is not set to visible when first loaded, then do not mark it as active.
          // In other words, if the layer is not visible on page load, make the button look like the layer is toggled off
          if (off.includes(id)) {
            link.className = "";
          } else {
            link.className = "active";
          }

          // Set the wording (label) for the layer toggle button to match the 'id' listed in the style sheet
          link.textContent = id;

          // Creates a click event for each button so that when clicked by the user, the visibility property
          // is changed as is the class (color) of the button
          link.onclick = function(e) {
            let clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

            let visibility = map.getLayoutProperty(clickedLayer, "visibility");

            if (visibility === "visible") {
              map.setLayoutProperty(clickedLayer, "visibility", "none");
              this.className = "";
            } else {
              this.className = "active";
              map.setLayoutProperty(clickedLayer, "visibility", "visible");
            }
          };

          let layerToggleList = document.getElementById("ToggleOptions");
          layerToggleList.appendChild(link);
        }
      };

      let layer = document.getElementById('layerToggle');
      let streams = document.getElementById('streamToggle');
      //Create the toggles dynamically based on which icon is clicked
      let dynamic = function(icon, ids, offAtStart){
        let toggleOptions = document.getElementById("ToggleOptions");
        let icons = document.getElementById("iconToggleContainer").childNodes;
        if(toggleOptions.classList.contains("active") && icon.classList.contains("active")){
          while(toggleOptions.firstChild){
            toggleOptions.removeChild(toggleOptions.firstChild);
          }
          toggleOptions.classList.remove("active");
          icon.classList.remove("active");
        }else if(toggleOptions.classList.contains("active")){
          while(toggleOptions.firstChild){
            toggleOptions.removeChild(toggleOptions.firstChild);
          }
          //Check to see which icon is already active and deactivate
          for(let i = 0; i < icons.length; i++){
            if(icons[i].classList.contains("active")){
              icons[i].classList.remove("active");
            }
          }
          icon.classList.add("active");
          createToggles(ids, offAtStart);
        }
        else{
          toggleOptions.classList.add("active");
          icon.classList.add("active");
          createToggles(ids, offAtStart);
        }
      }

      layer.onclick = function(){
        dynamic(layer, toggleableLayerIds, layersTurnedOffAtStart);
      }
      streams.onclick = function(){
        dynamic(streams, toggleableStreamsIds, streamsTurnedOffAtStart);
      }

      // next section controls the HRU hover effect
      let hoveredHRUId = this.hoveredHRUId;

      map.on("mousemove", "HRUs", function(e) {
        if (e.features.length > 0) {
          if (hoveredHRUId) {
            map.setFeatureState(
              { source: "HRU", sourceLayer: "hrus", id: hoveredHRUId },
              { hover: false }
            );
          }
          hoveredHRUId = e.features[0].id;
          map.setFeatureState(
            { source: "HRU", sourceLayer: "hrus", id: hoveredHRUId },
            { hover: true }
          );
        }
      });
      map.on("mouseleave", "HRUS Fill Colors", function() {
        if (hoveredHRUId) {
          map.setFeatureState(
            { source: "HRU", sourceLayer: "hrus", id: hoveredHRUId },
            { hover: false }
          );
        }
        hoveredHRUId = null;
      });
      //Subtitle information Modal functionality
      let infoButton = document.getElementById("subtitleInfoButton");
      let modal = document.getElementById("subtitleInfoModal");
      let legendInfoButton = document.getElementById("legendInfoButton");
      let legendModal = document.getElementById("legendModal");
      let legendExit = document.getElementById("legendExit");
      //Info Button Click Function
      infoButton.onclick = function() {
        toggle(modal);
      };
      //Legend Modal functionality
      legendInfoButton.onclick = function() {
        toggle(legendModal);
      };
      legendExit.onclick = function() {
        toggle(legendModal);
      };

      //Toggle function
      let toggle = function(name) {
        if (name.style.display === "block") {
          name.style.display = "none";
        } else {
          name.style.display = "block";
        }
      };

      // To see the current ZOOM LEVEL of the map during development, uncomment the next section.
      // This section adds a indicator so that we can see the current zoom level
      // This is for development and should be removed before sending to production
      // function onZoomend() {
      //   let currentZoom = map.getZoom();
      //   document.getElementById("zoomlevel").innerHTML = currentZoom;
      // }
      // map.on("zoomend", onZoomend);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~mapbox-gl/dist/mapbox-gl.css";
$color: #fff;
$blue: #4574a3;
$border: 1px solid #fff;
.header-container {
  background-color: #fff;
}
/* Add a background color to the layer toggle bar */
#mapbox_component-layer-toggle {
  background-color: $blue;
  overflow: hidden;
  display: flex;
}

#topNavText {
  width: 110px;
  border-right: $border;
  a {
    width: 100%;
    font-size: 0.9em;
    color: $color;
    background: #00264c;
  }
}

#iconToggleContainer {
  display: flex;
  a {
    flex: 1;
    background: #00264c;
    margin: 0;
    color: $color;
  }

  a.active{
      background: #00bf26
    }

  .icon {
    border-left: $border;
  }
}

.usa-prose {
  border-bottom: 1px solid rgb(100, 100, 100);
}

/* override USWDS style to prevent title from wrapping too soon */
.title-text {
  margin-left: 1.5rem;
  padding: 0.5rem 0;
}

#mapContainer {
  position: relative;
  height: 80vh;
}

@media screen and (min-width: 600px) {
  #viz_container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  #mapContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: auto;
  }
  #map {
    flex: 1;
  }
}
</style>
<style lang="scss">
$color: #fff;
$blue: #4574a3;
#mapbox_component-layer-toggle a {
  text-decoration: none;
  padding: 5px 10px;
  display: block;
  height: 30px;
  background: #00264c;
  outline: none;
  text-align: center;
}

#ToggleOptions {
  display: flex;
  a {
    font-size: 0.9em;
    color: $color;
    width: auto;
    text-decoration: line-through;

    &:hover {
      text-decoration: none;
      background: $blue;
    }
  }
  .active {
    text-decoration: none;
    background: $blue;
  }
}
</style>
