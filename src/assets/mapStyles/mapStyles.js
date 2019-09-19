export default {
    style: {
        version: 8,
        sources: {
            basemap: {
                type: 'vector',
                // The following line is used as a reference point for automated builds
                // to insert the correct base tile location - do not modify:
                // BASE SOURCE INSERT

                // If you are setting up a local build, you can uncomment the following
                // URL assignment to pull the base tiles from S3 so that no local tile
                // server is required:
                'tiles': ['http://wbeep-test-website.s3-website-us-west-2.amazonaws.com/basetiles/{z}/{x}/{y}.pbf']
                //
                // The following URL is an example of using a local mbtiles file and a
                // tile server.  See the readme for more information:
                // https://github.com/usgs-makerspace/wbeep-viz#start-run-the-tile-server
                // url: 'http://localhost:8086/data/basemap.json'

            },
            HRU: {
                type: 'vector',
                // The following line is used as a reference point for automated builds
                // to insert the correct HRU tile location - do not modify:
                // HRU SOURCE INSERT

                // If you are setting up a local build, you can uncomment the following
                // URL assignment to pull the HRU tiles from S3 so that no local tile
                // server is required:
                'tiles': ['http://wbeep-test-website.s3-website-us-west-2.amazonaws.com/tiles/{z}/{x}/{y}.pbf']
                //
                // The following URL is an example of using a local mbtiles file and a
                // tile server.  See the readme for more information:
                // https://github.com/usgs-makerspace/wbeep-viz#start-run-the-tile-server
                // url: 'http://localhost:8085/data/new2.json'
            },
            openmaptiles: {
                type: 'vector',
                'tiles': ['http://wbeep-test-website.s3-website-us-west-2.amazonaws.com/openmaptiles/{z}/{x}/{y}.pbf']
            },
            mapbox_terrain: {
                "type": "raster-dem",
                "url": "mapbox://mapbox.terrain-rgb",
                "tileSize": 256
            }
        },
        'sprite': '',
        'glyphs': 'https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf',
        'layers': [
            {
                "id": "background",
                "paint": {
                    "background-color": "hsl(47, 26%, 88%)"
                },
                "type": "background",
                'showButton': false
            },
            {
                "type": "hillshade",
                "paint": {
                    "hillshade-shadow-color": "hsl(39, 21%, 33%)"
                },
                "layout": {
                    "visibility": "visible"
                },
                "id": "MB Hill Shade",
                "source": "mapbox_terrain",
                'showButton': true
            },
            {
                'id': '*Counties Borders',
                'type': 'line',
                'source': 'basemap',
                'source-layer': 'counties',
                'minzoom': 6,
                'maxzoom': 24,
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'line-color': 'rgba(218, 234, 240, 1)'
                },
                'showButton': false
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["==", "brunnel", "tunnel"]
                ],
                "id": "waterway-tunnel",
                "paint": {
                    "line-color": "hsl(205, 56%, 73%)",
                    "line-dasharray": [3, 3],
                    "line-gap-width": {
                        "stops": [
                            [12, 0],
                            [20, 6]
                        ]
                    },
                    "line-opacity": 1,
                    "line-width": {
                        "base": 1.4,
                        "stops": [
                            [8, 1],
                            [20, 2]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "waterway",
                "type": "line",
                "layout": {
                    "visibility": "visible"
                },
                'showButton': false
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["!in", "brunnel", "tunnel", "bridge"],
                    ["!=", "intermittent", 1]
                ],
                "id": "waterway",
                "paint": {
                    "line-color": "hsl(205, 56%, 73%)",
                    "line-opacity": 1,
                    "line-width": {
                        "base": 1.4,
                        "stops": [
                            [8, 1],
                            [20, 8]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "waterway",
                "type": "line",
                "layout": {
                    "visibility": "visible"
                },
                'showButton': false
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["!in", "brunnel", "tunnel", "bridge"],
                    ["==", "intermittent", 1]
                ],
                "id": "waterway_intermittent",
                "paint": {
                    "line-color": "hsl(205, 56%, 73%)",
                    "line-opacity": 1,
                    "line-width": {
                        "base": 1.4,
                        "stops": [
                            [8, 1],
                            [20, 8]
                        ]
                    },
                    "line-dasharray": [2, 1]
                },
                "source": "openmaptiles",
                "source-layer": "waterway",
                "type": "line",
                "layout": {
                    "visibility": "visible"
                },
                'showButton': false
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["in", "class", "minor", "service"]
                ],
                "id": "road_minor",
                "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                },
                "paint": {
                    "line-color": "hsl(0, 0%, 97%)",
                    "line-width": {
                        "base": 1.55,
                        "stops": [
                            [4, 0.25],
                            [20, 30]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                "minzoom": 13,
                'showButton': false
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["in", "class", "trunk", "primary"]
                ],
                "id": "road_trunk_primary",
                "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                },
                "paint": {
                    "line-color": "#fff",
                    "line-width": {
                        "base": 1.4,
                        "stops": [
                            [6, 0.5],
                            [20, 30]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                'showButton': false
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["in", "class", "secondary", "tertiary"]
                ],
                "id": "road_secondary_tertiary",
                "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                },
                "paint": {
                    "line-color": "#fff",
                    "line-width": {
                        "base": 1.4,
                        "stops": [
                            [6, 0.5],
                            [20, 20]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                'showButton': false
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["==", "class", "motorway"]
                ],
                "id": "road_major_motorway",
                "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                },
                "paint": {
                    "line-color": "hsl(0, 0%, 100%)",
                    "line-offset": 0,
                    "line-width": {
                        "base": 1.4,
                        "stops": [
                            [8, 1],
                            [16, 10]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                'showButton': false
            },
            {
                'id': 'HRUs',
                'type': 'fill',
                'source': 'HRU',
                'source-layer': 'hrus',
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'fill-color': {
                        'property': 'value',
                        'type': 'categorical',
                        'stops': [
                            ["very high","#144873"],
                            ["high","#A7B9D7"],
                            ['medium','#FED98E'],
                            ['low', '#EDAA5F'],
                            ["very low","#CC4C02"],
                            ["",'#000000'],
                        ]
                    },
                    'fill-opacity': ['case',
                        ['boolean', ['feature-state', 'hover'], false],
                        0.1,
                        .4
                    ]
                },
                'showButton': false
            },
            {
                'id': 'River Flow Lines',
                'type': 'line',
                'source': 'basemap',
                'source-layer': 'USA_Rivers_and_Streams',
                'minzoom': 6,
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'line-color': 'rgba(115, 255, 255, 1)'
                },
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "Polygon"],
                    ["!=", "intermittent", 1]
                ],
                "id": "water",
                "paint": {
                    "fill-color": "hsl(205, 56%, 73%)"
                },
                "source": "openmaptiles",
                "source-layer": "water",
                "type": "fill",
                "layout": {
                    "visibility": "visible"
                },
                'showButton': false
            },
            {
                "filter": ["all", ["==", "$type", "Polygon"],
                    ["==", "intermittent", 1]
                ],
                "id": "water_intermittent",
                "paint": {
                    "fill-color": "hsl(205, 56%, 73%)",
                    "fill-opacity": 0.7
                },
                "source": "openmaptiles",
                "source-layer": "water",
                "type": "fill",
                "layout": {
                    "visibility": "visible"
                },
                'showButton': false
            },
            {
                'id': 'Neighboring Countries',
                'type': 'fill',
                'source': 'basemap',
                'source-layer': 'neighboringcountry',
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'fill-color': 'rgba(237, 236, 232, 1)'
                },
                'showButton': false
            },
            {
                'id': 'Hydrological Response Unit',
                'type': 'line',
                'source': 'HRU',
                'source-layer': 'hrus',
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'line-color': 'rgba(57, 79, 87, 1)'
                },
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "Point"],
                    ["==", "class", "city"]
                ],
                "id": "place_label_city",
                "layout": {
                    "text-field": "{name:latin}\n{name:nonlatin}",
                    "text-font": ["Noto Sans Regular"],
                    "text-max-width": 10,
                    "text-size": {
                        "stops": [
                            [3, 12],
                            [8, 16]
                        ]
                    }
                },
                "maxzoom": 16,
                "minzoom": 5,
                "paint": {
                    "text-color": "hsl(0, 0%, 0%)",
                    "text-halo-blur": 0,
                    "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
                    "text-halo-width": 2
                },
                "source": "openmaptiles",
                "source-layer": "place",
                "type": "symbol",
                'showButton': false
            }
        ]
    }
};