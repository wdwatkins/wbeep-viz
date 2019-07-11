<template>
  <div id="viz_container">
    <div class="usa-prose">
      <h2 class="title-text">{{ title }}</h2>
    </div>
    <hr>
    <div id="map"/>
  </div>
</template>

<script>
    import mapboxgl from "mapbox-gl";
    import 'mapbox-gl/dist/mapbox-gl.css';

    let style = {
        version: 8,
        sources: {
            basemap: {
                type: "vector",
                url: "http://localhost:8086/data/basemap.json"
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
                    "background-color": "#ebf0fa"
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
                    "fill-opacity": 1
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
                },
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
                    "fill-color": "rgba(213, 218, 227, 1)"
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
                    "fill-color": "rgba(231, 242, 252, 0.1)"
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
                    "line-color": "rgba(115, 255, 255, 1)"
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
                    "line-color": "rgba(115, 255, 255, 1)"
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
                    "line-color": "rgba(115, 204, 255, 1)"
                }
            },
        ]
    }

    export default {
        name: 'MapBox',
        props: {
            title: {
                type: String,
                default: 'Add your title in App.vue or make this blank'
            }
        },
        data() {
            return {}
        },
        mounted() {
            this.createMap();
            this.addGeolocateControl();
            this.addMapControls();
            this.addFullscreenToggle();
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
            },
            addGeolocateControl() {
                this.map.addControl(new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true
                    },
                    trackUserLocation: true
                }));
            },
            addMapControls() {
                this.map.addControl(new mapboxgl.NavigationControl());
            },
            addFullscreenToggle() {
                this.map.addControl(new mapboxgl.FullscreenControl());
            }
        }
    }
</script>

<style>
  #map {
    height: 900px;
  }

  .title-text {
    margin-left: 1.5rem;
    padding-top: 0.5rem;
  }

  hr {
    margin: 2px 0 0 0;
    padding-bottom: 0;
  }
</style>

