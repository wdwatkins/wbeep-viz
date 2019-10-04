export default {
    style: {
        version: 8,
        sources: {
            basemap: {
                type: 'vector',
                'tiles': ['https://maptiles-prod-website.s3-us-west-2.amazonaws.com/misctilesets/usstatecounties/{z}/{x}/{y}.pbf'],
                'minzoom': 2, // setting this to equal the minzoom of main map, real tile extent is 2
                'maxzoom': 10  // setting this to the real tile extent is 10
            },
            HRU: {
                type: 'vector',
                // The following line is used as a reference point for automated builds
                // to insert the correct HRU tile location - do not modify:
                // HRU SOURCE INSERT

                // If you are setting up a local build, you can uncomment the following
                // URL assignment to pull the HRU tiles from S3 so that no local tile
                // server is required:
                // 'tiles': ['http://wbeep-test-website.s3-website-us-west-2.amazonaws.com/tiles/{z}/{x}/{y}.pbf?fresh=true']
                //
                // The following URL is an example of using a local mbtiles file and a
                // tile server.  See the readme for more information:
                // https://github.com/usgs-makerspace/wbeep-viz#start-run-the-tile-server
                // url: 'http://localhost:8085/data/new2.json'
            },
            nhd_streams: {
                type: 'vector',
                'tiles':['http://maptiles-prod-website.s3-us-west-2.amazonaws.com/nhdstreams/{z}/{x}/{y}.pbf'],
                'minzoom': 2, // setting this to equal the minzoom of main map, real tile extent is 0
                'maxzoom': 9  // setting this to equal the maxzoom of main map, real tile extent is 10
            },
            openmaptiles: {
                type: 'vector',
                'tiles': ['https://maptiles-prod-website.s3-us-west-2.amazonaws.com/openmaptiles/baselayers/{z}/{x}/{y}.pbf'],
                'minzoom': 2,
                'maxzoom': 14
            },
            hillshade: {
                type: 'raster',
                'tiles': ['https://maptiles-prod-website.s3-us-west-2.amazonaws.com/openmaptiles/omthillshade/{z}/{x}/{y}.png'],
                'minzoom': 2,
                'maxzoom': 12,
                'tileSize': 256
            }
        },
        'sprite': '',
        'glyphs': 'https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf',
        'layers': [
            {
                'id': 'background',
                'paint': {
                    'background-color': 'hsl(47, 26%, 88%)'
                },
                'type': 'background',
                'showButtonLayerToggle': false
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
                            ['very high','#144873'],
                            ['high','#A7B9D7'],
                            ['medium','#FED98E'],
                            ['low', '#EDAA5F'],
                            ['very low','#CC4C02'],
                            ['','#000000'],
                        ]
                    },
                    'fill-opacity': ['case',
                        ['boolean', ['feature-state', 'hover'], false],
                        0.1,
                        1
                    ]
                },
                'showButtonLayerToggle': false,
                'legendText': {
                    'very high': ['Uncommonly Wet',' \- it\'s typically drier than it is today in this region'],
                    'high': ['',''],
                    'medium': ['Common',' \- today is normal for this region'],
                    'low': ['',''],
                    'very low': ['Uncommonly Dry',' \- it\'s typically wetter than it is today in this region'],
                    'no data': ['','No Data']
                }
            },
            {
                'id': 'hill shade',
                'type': 'raster',
                'source': 'hillshade',
                'layout': {
                    'visibility': 'visible'
                },
                'showButtonLayerToggle': true,
                'showButtonStreamToggle': false,
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['in', 'class', 'minor', 'service']
                ],
                'id': 'road_minor',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': 'hsl(0, 0%, 97%)',
                    'line-width': {
                        'base': 1.55,
                        'stops': [
                            [4, 0.25],
                            [20, 30]
                        ]
                    }
                },
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'minzoom': 13,
                'showButtonLayerToggle': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['in', 'class', 'trunk', 'primary']
                ],
                'id': 'road_trunk_primary',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#fff',
                    'line-width': {
                        'base': 1.4,
                        'stops': [
                            [6, 0.5],
                            [20, 30]
                        ]
                    }
                },
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['in', 'class', 'secondary', 'tertiary']
                ],
                'id': 'road_secondary_tertiary',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#fff',
                    'line-width': {
                        'base': 1.4,
                        'stops': [
                            [6, 0.5],
                            [20, 20]
                        ]
                    }
                },
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['==', 'class', 'motorway']
                ],
                'id': 'road_major_motorway',
                'minzoom': 5,
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': 'hsl(0, 0%, 100%)',
                    'line-offset': 0,
                    'line-width': {
                        'base': 1.4,
                        'stops': [
                            [8, 1],
                            [16, 10]
                        ]
                    }
                },
                'source': 'openmaptiles',
                'source-layer': 'transportation',
                'type': 'line',
                'showButtonLayerToggle': false
            },
            {
                'filter': ['all', ['==', '$type', 'Polygon'],
                    ['==', 'intermittent', 1]
                ],
                'id': 'water_intermittent',
                'paint': {
                    'fill-color': 'hsl(205, 56%, 73%)',
                    'fill-opacity': 0.7
                },
                'source': 'openmaptiles',
                'source-layer': 'water',
                'type': 'fill',
                'layout': {
                    'visibility': 'visible'
                },
                'showButtonLayerToggle': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['==', 'brunnel', 'tunnel']
                ],
                'id': 'waterway-tunnel',
                'paint': {
                    'line-color': 'hsl(205, 56%, 73%)',
                    'line-dasharray': [3, 3],
                    'line-gap-width': {
                        'stops': [
                            [12, 0],
                            [20, 6]
                        ]
                    },
                    'line-opacity': 1,
                    'line-width': {
                        'base': 1.4,
                        'stops': [
                            [8, 1],
                            [20, 2]
                        ]
                    }
                },
                'source': 'openmaptiles',
                'source-layer': 'waterway',
                'type': 'line',
                'layout': {
                    'visibility': 'visible'
                },
                'showButtonLayerToggle': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['!in', 'brunnel', 'tunnel', 'bridge'],
                    ['!=', 'intermittent', 1]
                ],
                'id': 'waterway',
                'paint': {
                    'line-color': 'hsl(205, 56%, 73%)',
                    'line-opacity': 1,
                    'line-width': {
                        'base': 1.4,
                        'stops': [
                            [8, 1],
                            [20, 8]
                        ]
                    }
                },
                'source': 'openmaptiles',
                'source-layer': 'waterway',
                'type': 'line',
                'layout': {
                    'visibility': 'visible'
                },
                'showButtonLayerToggle': false
            },
            {
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['!in', 'brunnel', 'tunnel', 'bridge'],
                    ['==', 'intermittent', 1]
                ],
                'id': 'waterway_intermittent',
                'paint': {
                    'line-color': 'hsl(205, 56%, 73%)',
                    'line-opacity': 1,
                    'line-width': {
                        'base': 1.4,
                        'stops': [
                            [8, 1],
                            [20, 8]
                        ]
                    },
                    'line-dasharray': [2, 1]
                },
                'source': 'openmaptiles',
                'source-layer': 'waterway',
                'type': 'line',
                'layout': {
                    'visibility': 'visible'
                },
                'showButtonLayerToggle': false
            },
            {
                'id': 'stream_order_1',
                'type': 'line',
                'source': 'nhd_streams',
                'source-layer': 'nhdplus_order_1',
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'line-color': 'rgba(115, 255, 255, 1)'
                },
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': true,
            },
            {
                'id': 'stream_order_2',
                'type': 'line',
                'source': 'nhd_streams',
                'source-layer': 'nhdplus_order_2',
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'line-color': 'rgba(115, 255, 255, 1)'
                },
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': true
            },
            {
                'id': 'stream_order_3',
                'type': 'line',
                'source': 'nhd_streams',
                'source-layer': 'nhdplus_order_3',
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'line-color': 'rgba(115, 255, 255, 1)'
                },
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': true
            },
            {
                'id': 'stream_order_4',
                'type': 'line',
                'source': 'nhd_streams',
                'source-layer': 'nhdplus_order_4',
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'line-color': 'rgba(115, 255, 255, 1)'
                },
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': true
            },
            {
                'id': 'stream_order_5',
                'type': 'line',
                'source': 'nhd_streams',
                'source-layer': 'nhdplus_order_5',
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'line-color': 'rgba(115, 255, 255, 1)'
                },
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': true
            },
            {
                'id': 'stream_order_6',
                'type': 'line',
                'source': 'nhd_streams',
                'source-layer': 'nhdplus_order_6',
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'line-color': 'rgba(115, 255, 255, 1)'
                },
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': true
            },
            {
                'id': 'stream_order_7',
                'type': 'line',
                'source': 'nhd_streams',
                'source-layer': 'nhdplus_order_7',
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'line-color': 'rgba(115, 255, 255, 1)'
                },
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': true
            },
            {
                'id': 'stream_order_8',
                'type': 'line',
                'source': 'nhd_streams',
                'source-layer': 'nhdplus_order_8',
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'line-color': 'rgba(115, 255, 255, 1)'
                },
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': true
            },
            {
                'id': 'stream_order_9',
                'type': 'line',
                'source': 'nhd_streams',
                'source-layer': 'nhdplus_order_9',
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'line-color': 'rgba(115, 255, 255, 1)'
                },
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': true
            },
            {
                'id': 'stream_order_minus_9',
                'type': 'line',
                'source': 'nhd_streams',
                'source-layer': 'nhdplus_order_minus_9',
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'line-color': 'rgba(115, 255, 255, 1)'
                },
                'showButtonLayerToggle': false,
                'showButtonStreamToggle': true
            },
            {
                'id': 'Neighboring Countries',
                'type': 'fill',
                'source': 'basemap',
                'minzoom': 2,
                'maxzoom': 24,
                'source-layer': 'neighboringcountry',
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'fill-color': 'rgba(237, 236, 232, 1)'
                },
                'showButtonLayerToggle': false
            },
            {
                'filter': ['all', ['==', '$type', 'Polygon'],
                    ['!=', 'intermittent', 1]
                ],
                'id': 'water',
                'paint': {
                    'fill-color': 'hsl(205, 56%, 73%)'
                },
                'source': 'openmaptiles',
                'source-layer': 'water',
                'type': 'fill',
                'layout': {
                    'visibility': 'visible'
                },
                'showButtonLayerToggle': false
            },
            {
                'id': 'counties',
                'type': 'line',
                'source': 'basemap',
                'source-layer': 'counties',
                'minzoom': 6,
                'maxzoom': 24,
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'line-color': 'rgb(0,0,0)',
                    'line-dasharray': [4, 3]
                },
                'showButtonLayerToggle': false
            },
            {
                'id': 'states',
                'type': 'line',
                'source': 'basemap',
                'source-layer': 'states',
                'minzoom': 2,
                'maxzoom': 24,
                'layout': {
                    'visibility': 'visible',
                },
                'paint': {
                    'line-color': 'rgb(0,0,0)'
                }

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
                'showButtonLayerToggle': true,
                'showButtonStreamToggle': false
            },
            {
                'filter': ['all', ['==', '$type', 'Point'],
                    ['==', 'class', 'city']
                ],
                'id': 'place_label_city',
                'layout': {
                    'text-field': '{name:latin}\n{name:nonlatin}',
                    'text-font': ['Noto Sans Regular'],
                    'text-max-width': 10,
                    'text-size': {
                        'stops': [
                            [3, 12],
                            [8, 16]
                        ]
                    }
                },
                'maxzoom': 16,
                'minzoom': 5,
                'paint': {
                    'text-color': 'hsl(0, 0%, 0%)',
                    'text-halo-blur': 0,
                    'text-halo-color': 'hsla(0, 0%, 100%, 0.75)',
                    'text-halo-width': 2
                },
                'source': 'openmaptiles',
                'source-layer': 'place',
                'type': 'symbol',
                'showButtonLayerToggle': false
            }
        ]
    }
};