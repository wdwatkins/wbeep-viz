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
            // Do not modify the following comment since we will look for it with awk in order to
            // automatically configure the proper S3 hru tile source based on whether we're
            // building for production, test or qa:
            // HRU SOURCE INSERT
            //
            // The inserted source will follow this form, with <target> being prod, qa, or test:
            // "tiles": ["http://wbeep-<target>-website.s3-website-us-west-2.amazonaws.com/tiles/{z}/{x}/{y}.pbf"],
            // 
            // If you're manually building to run locally, you can run tileserver https://www.npmjs.com/package/tileserver-gl-light 
            // and host the tiles in the /tiles dir with tileserver-gl-light /path/to/repo/tiles/new2.mbtiles -p 8085 
            // then uncomment the line below to have the map look for local tileserver instead of s3 path
            // url: 'http://127.0.0.1:8085/data/new2.json'
            }
        },
        "sprite": "",
        "glyphs": "https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf",
        "layers": [
          {
            "id": "bg",
            "type": "background",
            "paint": {
              "background-color": "rgba(202, 210, 211, 1)"
            }
          },
          {
            "id": "states",
            "type": "fill",
            "source": "basemap",
            "source-layer": "states",
            "paint": {
              "fill-color": "rgba(246, 246, 244, 1)"
            }
          },
          {
            "id": "neighbors",
            "type": "fill",
            "source": "basemap",
            "source-layer": "neighboringcountry",
            "layout": {},
            "paint": {
              "fill-color": "rgba(246, 246, 244, 1)"
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
            "id": "rivers",
            "type": "line",
            "source": "basemap",
            "source-layer": "USA_Rivers_and_Streams",
            "minzoom": 5,
            "layout": {},
            "paint": {
              "line-color": "rgba(115, 255, 255, 1)"
            }
          },
          {
            "id": "counties",
            "type": "line",
            "source": "basemap",
            "source-layer": "counties",
            "minzoom": 6,
            "maxzoom": 24,
            "paint": {
              "line-color": "rgba(115, 255, 255, 1)"
            }
          },
          {
            "id": "statesBorder",
            "type": "line",
            "source": "basemap",
            "source-layer": "states",
            "layout": {},
            "paint": {
              "line-color": "rgba(115, 255, 255, 1)",
              "line-dasharray": [
                2,
                1.5
              ]
            }
          },
          {
            "id": "citiesDot",
            "type": "circle",
            "source": "basemap",
            "source-layer": "Cities_and_Towns_NTAD",
            "minzoom": 6,
            "paint": {
              "circle-radius": 4
            }
          },
          {
            "id": "cities",
            "type": "symbol",
            "source": "basemap",
            "source-layer": "Cities_and_Towns_NTAD",
            "minzoom": 6,
            "layout": {
              "text-field": "{NAME}",
              "text-font": [
                "Roboto Regular"
              ],
              "text-size": 12,
              "symbol-placement": "point",
              "text-line-height": 1.2,
              "text-justify": "center",
              "text-anchor": "bottom",
              "text-offset": [
                0,
                -0.5
              ]
            },
            "paint": {
              "text-color": "rgba(255,255,255, 1)",
              "text-halo-width": 1,
              "text-halo-blur": 1,
              "text-halo-color": "rgba(0, 0, 0, 0.5)",
            }
          }
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