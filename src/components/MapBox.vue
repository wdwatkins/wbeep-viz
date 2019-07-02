<template>
    <div id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

var style = {
    version: 8,
    sources: {
        HRU: {
            type: "vector",
            url: ''
        }
    },
    layers: [
        {
            id: "background",
            type: "background",
            paint: {
                "background-color": "#ddeeff" 
            }
        },
        {
            id: "HRUS",
            type: "line",
            source: "HRU",
            "source-layer": "newgeo",
            paint: {
                "line-color": "#000000",
                "line-width": 1
            }
        }
    ]
}

export default {
    name: 'MapBox',
    data() {
        return {
        }
    },
  mounted() {
    this.createMap();
  },
  methods: {
    createMap() {
      // init the map
      this.map = new mapboxgl.Map({
        container: 'map',
        style: style,
        zoom: 4,
        minZoom: 4,
        maxZoom: 8,
        center: [-95.7129, 37.0902],
      });

    }
  }
}
</script>

<style>
    #map{
        height: 900px;
    }
</style>

