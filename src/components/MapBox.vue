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
        basemap: {
          type: "vector",
          url: "http://localhost:8080/data/basemap.json"
        },
        HRU: {
            type: "vector",
            url: "http://localhost:8085/data/new2.json",
            // amazon S3 "tiles": ["http://wbeep-test-website.s3-website-us-west-2.amazonaws.com/tiles/{z}/{x}/{y}.pbf"],
            // locally, you can run tileserver https://www.npmjs.com/package/tileserver-gl-light 
            // host the tiles in the /tiles dir with tileserver-gl-light /path/to/repo/tiles/new2.mbtiles -p 8085 
            // then change the line above to have the map look for local tileserver instead of s3 path
            // url: 'http://127.0.0.1:8085/data/new2.json'
        }
    },
    layers: [
        {
            id: "background",
            type: "background",
            paint: {
                "background-color": "#c3dbf4"
            }
        },
        {
      "id": "caMex",
      "type": "fill",
      "source": "basemap",
      "source-layer": "basemap",
      "filter": [
        "none",
        [
          "!has",
          "CNTRY_NAME"
        ]
      ],
      "layout": {},
      "paint": {
        "fill-color": "rgba(231, 242, 252, 1)"
      }
    },
    {
      "id": "states",
      "type": "fill",
      "source": "basemap",
      "source-layer": "basemap",
      "filter": [
        "all",
        [
          "has",
          "STATE_ABBR"
        ]
      ],
      "paint": {
        "fill-color": "rgba(231, 242, 252, 1)"
      }
    },
    {
      "id": "statesoutline",
      "type": "line",
      "source": "basemap",
      "source-layer": "basemap",
      "filter": [
        "all",
        [
          "has",
          "STATE_ABBR"
        ]
      ],
      "layout": {},
      "paint": {
        "line-color": "rgba(192, 218, 245, 1)"
      }
    },
    {
      "id": "counties",
      "type": "line",
      "source": "basemap",
      "source-layer": "basemap",
      "minzoom": 6,
      "maxzoom": 9,
      "filter": [
        "all",
        [
          "has",
          "CNTY_FIPS"
        ]
      ],
      "layout": {},
      "paint": {
        "line-color": "rgba(149,168,187, 1)"
      }
    },
    {
      "id": "rivers",
      "type": "line",
      "source": "basemap",
      "source-layer": "basemap",
      "minzoom": 5,
      "maxzoom": 9,
      "filter": [
        "all",
        [
          "has",
          "MILES"
        ]
      ],
      "layout": {},
      "paint": {
        "line-color": "rgba(164, 185, 207, 1)"
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

