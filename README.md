# Water Budget Estimation and Evaluation Project (WBEEP) Visualization
This project produces an interactive, national scale, choropleth map using Hydrologic Resource Units (HRUs) as 
data groupings. A HRU is the smallest spatial unit of the Soil and Water Assessment Tool (SWAT) 
which is widely used to relate farm management practices to effects on surface waters at the
watershed scale. The HRU is not generally defined by physically meaningful boundaries but instead
lumps similar land uses, soils, and slopes within a sub-basin based upon user-defined thresholds. 

This project plots the boundaries of HRUs and colors the interior of each HRU based on calculated 
water data availability values using JavaScript, the Vue framework, and Mapbox-gl to produce a
'zoomable' national level map.



## Project setup
Clone the project. Then run 'npm install' to pull down the required dependencies into the node modules folder 
```
npm install
```

Starting the Vue development server at this point will show a website with headers and footers but no map.

```
npm run serve
```

To get the map working locally several things need to happen.
1) Get the map tiles and add them to the project
2) Check that URLs for the tiles are correct
3) Start run the tile server

### Get the map tiles and add them to the project
One way to get the tiles is take them from storage on AWS.
```
prod-owi-resources/resources/Application/wbeep/geo_tiles
```

### Check that URLs for the tiles are correct
Locally, the tiles for the map will be served by 'tile servers.' These servers will need to know where the
tiles are stored on your machine and will produce a URL that Mapbox-gl can call. When Mapbox-gl calls,
the tile server will serve up the appropriate tiles. 

Please note that Mapbox-gl requires the map tiles to have a full URL, like 'http://localhost:8086/data/basemap.json.'
This is works fine for web based resources but makes using a relative path impossible, which means
that Mapbox-gl will require you to have a different URL for every deployment option. The path Mapbox-gl
uses are found in the style variable of the component creating the map element, such as 'MapBox.vue.'

```
    let style = {
        version: 8,
        sources: {
            basemap: {
                type: "vector",
                url: "http://localhost:8086/data/basemap.json" // here is one URL
            },
            HRU: {
                type: "vector",
                url: "http://localhost:8085/data/new2.json", // here is another

```
In the above example there are two URLs, one for the base map and a second one for the HRUs. Since
there are two URL we will need two tile servers, one to produce each URL. A perfectly good choice for
a tile server is tileserver-gl-light.
https://www.npmjs.com/package/tileserver-gl-light

Follow the instructions on the page and install the tile server globally (use the -g flag)

```
tileserver-gl-light new2.mbtiles -p 8085

```
### Start run the tile server


### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
