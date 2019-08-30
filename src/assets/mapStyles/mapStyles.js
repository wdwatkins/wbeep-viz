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
                // 'tiles': ['http://wbeep-test-website.s3-website-us-west-2.amazonaws.com/basetiles/{z}/{x}/{y}.pbf']
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
                // 'tiles': ['http://wbeep-test-website.s3-website-us-west-2.amazonaws.com/tiles/{z}/{x}/{y}.pbf']
                //
                // The following URL is an example of using a local mbtiles file and a
                // tile server.  See the readme for more information:
                // https://github.com/usgs-makerspace/wbeep-viz#start-run-the-tile-server
                // url: 'http://localhost:8085/data/new2.json'

            },
            composite: {
                "type": "vector",
                "url": "mapbox://mapbox.mapbox-streets-v7"
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
                'id': 'Background',
                'type': 'background',
                'layout': {
                    'visibility': 'visible'
                },
                "paint": {
                    "background-color": ["interpolate", ["linear"],
                        ["zoom"], 5, "hsl(38, 43%, 89%)", 7, "hsl(38, 48%, 86%)"
                    ]
                },
                'showButton': true
            },
            {
                'id': 'State Color Fill',
                'type': 'fill',
                'source': 'basemap',
                'source-layer': 'states',
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'fill-color': 'rgba(246, 246, 244, .1)',
                },
                'showButton': true
            },
            {
                "layout": {},
                "filter": ["==", "class", "national_park"],
                "type": "fill",
                "source": "composite",
                "id": "MB National_Park",
                "paint": {
                    "fill-color": "hsl(78, 51%, 73%)",
                    "fill-opacity": ["interpolate", ["linear"],
                        ["zoom"], 5, 0, 6, 0.5
                    ]
                },
                "source-layer": "landuse_overlay",
                'showButton': true
            },
            {
                "layout": {},
                "filter": ["in", "class", "hospital", "park", "pitch", "school"],
                "type": "fill",
                "source": "composite",
                "id": "MB Landuse",
                "paint": {
                    "fill-color": ["match", ["get", "class"], "park", "hsl(78, 51%, 73%)", "pitch", "hsl(78, 51%, 73%)", "hospital", "hsl(0, 56%, 89%)", "school", "hsl(25, 45%, 85%)", "hsla(0, 0%, 0%, 0)"],
                    "fill-opacity": ["interpolate", ["linear"],
                        ["zoom"], 5, 0, 6, 1
                    ]
                },
                "source-layer": "landuse",
                'showButton': true
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
                "layout": {},
                "filter": ["all", ["==", "$type", "Polygon"],
                    ["in", "type", "helipad", "runway", "taxiway"]
                ],
                "type": "fill",
                "source": "composite",
                "id": "MB Aeroway-polygon",
                "paint": {
                    "fill-color": "hsl(0, 0%, 77%)"
                },
                "source-layer": "aeroway",
                'showButton': true
            },
            {
                "layout": {},
                "filter": ["all", ["==", "$type", "LineString"],
                    ["in", "type", "runway", "taxiway"]
                ],
                "type": "line",
                "source": "composite",
                "id": "MB Aeroway-line",
                "paint": {
                    "line-width": ["interpolate", ["exponential", 1.5],
                        ["zoom"], 10, 0.5, 18, 20
                    ],
                    "line-color": "hsl(0, 0%, 77%)"
                },
                "source-layer": "aeroway",
                'showButton': true
            },
            {
                "minzoom": 14,
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "filter": ["all", ["==", "$type", "LineString"],
                    ["all", ["!=", "type", "platform"],
                        ["in", "class", "path", "pedestrian"]
                    ]
                ],
                "type": "line",
                "source": "composite",
                "id": "MB Pedestrian-path",
                "paint": {
                    "line-width": ["interpolate", ["exponential", 1.5],
                        ["zoom"], 14, ["match", ["get", "class"], "pedestrian", 1, "path", 0.75, 0.75], 20, ["match", ["get", "class"], "pedestrian", 8, "path", 5, 5]
                    ],
                    "line-color": ["match", ["get", "type"], "sidewalk", "hsl(38, 35%, 80%)", "crossing", "hsl(38, 35%, 80%)", "hsl(38, 28%, 70%)"]
                },
                "source-layer": "road",
                'showButton': true
            },
            {
                "layout": {
                    "line-join": "round"
                },
                "filter": ["all", ["==", "$type", "LineString"],
                    ["all", ["!=", "type", "service:parking_aisle"],
                        ["==", "structure", "tunnel"],
                        ["in", "class", "link", "motorway", "motorway_link", "primary", "secondary", "service", "street", "street_limited", "tertiary", "track", "trunk"]
                    ]
                ],
                "type": "line",
                "source": "composite",
                "id": "MB Tunnel",
                "paint": {
                    "line-width": ["interpolate", ["exponential", 1.5],
                        ["zoom"], 5, ["match", ["get", "class"], "motorway", 0.5, "trunk", 0.5, "primary", 0.5, "secondary", 0.01, "tertiary", 0.01, "street", 0, "street_limited", 0, "motorway_link", 0, "service", 0, "track", 0, "link", 0, 0], 12, ["match", ["get", "class"], "motorway", 3, "trunk", 3, "primary", 3, "secondary", 2, "tertiary", 2, "street", 0.5, "street_limited", 0.5, "motorway_link", 0.5, "service", 0, "track", 0, "link", 0, 0], 18, ["match", ["get", "class"], "motorway", 30, "trunk", 30, "primary", 30, "secondary", 24, "tertiary", 24, "street", 12, "street_limited", 12, "motorway_link", 12, "service", 10, "track", 10, "link", 10, 10]
                    ],
                    "line-color": ["match", ["get", "class"], "street", "hsl(38, 100%, 98%)", "street_limited", "hsl(38, 100%, 98%)", "service", "hsl(38, 100%, 98%)", "track", "hsl(38, 100%, 98%)", "link", "hsl(38, 100%, 98%)", "hsl(0, 0%, 100%)"],
                    "line-dasharray": [0.2, 0.2]
                },
                "source-layer": "road",
                'showButton': true
            },
            {
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "filter": ["all", ["==", "$type", "LineString"],
                    ["all", ["!=", "type", "service:parking_aisle"],
                        ["!in", "structure", "bridge", "tunnel"],
                        ["in", "class", "link", "motorway", "motorway_link", "primary", "secondary", "service", "street", "street_limited", "tertiary", "track", "trunk"]
                    ]
                ],
                "type": "line",
                "source": "composite",
                "id": "MB Road",
                "paint": {
                    "line-width": ["interpolate", ["exponential", 1.5],
                        ["zoom"], 5, ["match", ["get", "class"], "motorway", 0.5, "trunk", 0.5, "primary", 0.5, "secondary", 0.01, "tertiary", 0.01, "street", 0, "street_limited", 0, "motorway_link", 0, "service", 0, "track", 0, "link", 0, 0], 12, ["match", ["get", "class"], "motorway", 3, "trunk", 3, "primary", 3, "secondary", 2, "tertiary", 2, "street", 0.5, "street_limited", 0.5, "motorway_link", 0.5, "service", 0, "track", 0, "link", 0, 0], 18, ["match", ["get", "class"], "motorway", 30, "trunk", 30, "primary", 30, "secondary", 24, "tertiary", 24, "street", 12, "street_limited", 12, "motorway_link", 12, "service", 10, "track", 10, "link", 10, 10]
                    ],
                    "line-color": ["match", ["get", "class"], "street", "hsl(38, 100%, 98%)", "street_limited", "hsl(38, 100%, 98%)", "service", "hsl(38, 100%, 98%)", "track", "hsl(38, 100%, 98%)", "link", "hsl(38, 100%, 98%)", "hsl(0, 0%, 100%)"]
                },
                "source-layer": "road",
                'showButton': true
            },
            {
                "layout": {
                    "line-join": "round"
                },
                "filter": ["all", ["==", "$type", "LineString"],
                    ["all", ["!=", "type", "service:parking_aisle"],
                        ["==", "structure", "bridge"],
                        ["in", "class", "link", "motorway", "motorway_link", "primary", "secondary", "service", "street", "street_limited", "tertiary", "track", "trunk"]
                    ]
                ],
                "type": "line",
                "source": "composite",
                "id": "MB Bridge-case",
                "paint": {
                    "line-width": ["interpolate", ["exponential", 1.5],
                        ["zoom"], 10, 1, 16, 2
                    ],
                    "line-color": "hsl(38, 48%, 86%)",
                    "line-gap-width": ["interpolate", ["exponential", 1.5],
                        ["zoom"], 5, ["match", ["get", "class"], "motorway", 0.5, "trunk", 0.5, "primary", 0.5, "secondary", 0.01, "tertiary", 0.01, "street", 0, "street_limited", 0, "motorway_link", 0, "service", 0, "track", 0, "link", 0, 0], 12, ["match", ["get", "class"], "motorway", 3, "trunk", 3, "primary", 3, "secondary", 2, "tertiary", 2, "street", 0.5, "street_limited", 0.5, "motorway_link", 0.5, "service", 0, "track", 0, "link", 0, 0], 18, ["match", ["get", "class"], "motorway", 30, "trunk", 30, "primary", 30, "secondary", 24, "tertiary", 24, "street", 12, "street_limited", 12, "motorway_link", 12, "service", 10, "track", 10, "link", 10, 10]
                    ]
                },
                "source-layer": "road",
                'showButton': true
            },
            {
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "filter": ["all", ["==", "$type", "LineString"],
                    ["all", ["!=", "type", "service:parking_aisle"],
                        ["==", "structure", "bridge"],
                        ["in", "class", "link", "motorway", "motorway_link", "primary", "secondary", "service", "street", "street_limited", "tertiary", "track", "trunk"]
                    ]
                ],
                "type": "line",
                "source": "composite",
                "id": "MB Bridge",
                "paint": {
                    "line-width": ["interpolate", ["exponential", 1.5],
                        ["zoom"], 5, ["match", ["get", "class"], "motorway", 0.5, "trunk", 0.5, "primary", 0.5, "secondary", 0.01, "tertiary", 0.01, "street", 0, "street_limited", 0, "motorway_link", 0, "service", 0, "track", 0, "link", 0, 0], 12, ["match", ["get", "class"], "motorway", 3, "trunk", 3, "primary", 3, "secondary", 2, "tertiary", 2, "street", 0.5, "street_limited", 0.5, "motorway_link", 0.5, "service", 0, "track", 0, "link", 0, 0], 18, ["match", ["get", "class"], "motorway", 30, "trunk", 30, "primary", 30, "secondary", 24, "tertiary", 24, "street", 12, "street_limited", 12, "motorway_link", 12, "service", 10, "track", 10, "link", 10, 10]
                    ],
                    "line-color": ["match", ["get", "class"], "street", "hsl(38, 100%, 98%)", "street_limited", "hsl(38, 100%, 98%)", "service", "hsl(38, 100%, 98%)", "track", "hsl(38, 100%, 98%)", "link", "hsl(38, 100%, 98%)", "hsl(0, 0%, 100%)"]
                },
                "source-layer": "road",
                'showButton': true
            },


            {
                'id': 'HRUS Fill Colors',
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
                            ['high','#A7B9D7'],
                            ['medium','#FED98E'],
                            ['low', '#EDAA5F'],
                            ["",'#000000'],
                        ]
                    },
                    'fill-opacity': ['case',
                        ['boolean', ['feature-state', 'hover'], false],
                        0.1,
                            .3
                    ]
                },
                'showButton': true
            },
            {
                "minzoom": 8,
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "filter": ["all", ["==", "$type", "LineString"],
                    ["in", "class", "canal", "river"]
                ],
                "type": "line",
                "source": "composite",
                "id": "MB Waterway",
                "paint": {
                    "line-color": "hsl(205, 76%, 70%)",
                    "line-width": ["interpolate", ["exponential", 1.3],
                        ["zoom"], 8.5, 0.1, 20, 8
                    ],
                    "line-opacity": ["interpolate", ["linear"],
                        ["zoom"], 8, 0, 8.5, 1
                    ]
                },
                "source-layer": "waterway",
                'showButton': true
            },
            {
                "id": "MB Water",
                "type": "fill",
                "source": "composite",
                "source-layer": "water",
                "layout": {},
                "paint": {
                    "fill-color": ["interpolate", ["linear"],
                        ["zoom"], 5, "hsl(205, 76%, 67%)", 7, "hsl(205, 76%, 70%)"
                    ]
                },
                'showButton': true
            },

            {
                'id': 'HRUS Outlines',
                'type': 'line',
                'source': 'HRU',
                'source-layer': 'hrus',
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'line-color': {
                        'property': 'value',
                        'type': 'categorical',
                        'stops': [
                            ['high','#A7B9D7'],
                            ['medium','#FED98E'],
                            ['low', '#EDAA5F'],
                            ["",'#000000'],
                        ]
                    },
                    'line-width': 1
                },
                'showButton': true
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
                'showButton': true
            },
            {
                'id': 'Rivers',
                'type': 'line',
                'source': 'basemap',
                'source-layer': 'USA_Rivers_and_Streams',
                'minzoom': 5,
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'line-color': 'rgba(115, 255, 255, 1)'
                },
                'showButton': true
            },
            {
                'id': 'Counties Borders',
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
                'showButton': true
            },
            {
                'id': 'State Borders',
                'type': 'line',
                'source': 'basemap',
                'source-layer': 'states',
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'line-color': 'rgba(218, 234, 240, 1)',
                    'line-dasharray': [
                        2,
                        1.5
                    ]
                },
                'showButton': true
            },
            {
                'id': 'Cities Dots',
                'type': 'circle',
                'source': 'basemap',
                'source-layer': 'Cities_and_Towns_NTAD',
                'minzoom': 6,
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'circle-radius': 4
                },
                'showButton': true
            },
            {
                'id': 'Cities Names',
                'type': 'symbol',
                'source': 'basemap',
                'source-layer': 'Cities_and_Towns_NTAD',
                'minzoom': 6,
                'layout': {
                    'visibility': 'visible',
                    'text-field': '{NAME}',
                    'text-font': [
                        'Roboto Regular'
                    ],
                    'text-size': 12,
                    'symbol-placement': 'point',
                    'text-line-height': 1.2,
                    'text-justify': 'center',
                    'text-anchor': 'bottom',
                    'text-offset': [
                        0,
                        -0.5
                    ]
                },
                'paint': {
                    'text-color': 'rgba(255,255,255, 1)',
                    'text-halo-width': 1,
                    'text-halo-blur': 1,
                    'text-halo-color': 'rgba(0, 0, 0, 0.5)',
                },
                'showButton': true
            }
        ]
    }
};