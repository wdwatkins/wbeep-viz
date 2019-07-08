<template>
  <div id="viz_container">
    <h1>{{ title }}</h1>
    <div id="map" />
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

var style = {
    version: 8,
    sources: {
        HRU: {
            type: "vector",
            "tiles": ["http://wbeep-test-website.s3-website-us-west-2.amazonaws.com/tiles/{z}/{x}/{y}.pbf"],
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
            id: "HRUS2",
            type: "fill",
            source: "HRU",
            "source-layer": "no_simp_prec5",
            paint: {
                "fill-color": {
                  "property": "SoilMoisture",
                  "type": 'categorical',
                  "stops": [
                        ["","#000000"],
                        ["very low","#CC4C02"],
                        ["low", "#EDAA5F"],
                        ["average","#FED98E"],
                        ["high","#A7B9D7"],
                        ["very high","#144873"],
                      ]
                },
                "fill-opacity": 0.5
            }
        },
        {
            id: "HRUS",
            type: "line",
            source: "HRU",
            "source-layer": "no_simp_prec5",
            paint: {
                "line-color": {
                  "property": "SoilMoisture",
                  "type": 'categorical',
                  "stops": [
                        ["","#000000"],
                        ["very low","#823102"],
                        ["low", "#C28C4E"],
                        ["average","#D0B275"],
                        ["high","#8998B0"],
                        ["very high","#113B5F"],
                  ]
                },
                "line-width": 1
            }
        }
    ]
}

export default {
    name: 'MapBox',
    props: {
      title: {
        type: String,
        default: 'Add your title in App.vue or hide this with CSS'
      }
    },
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
        maxZoom: 15,
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

