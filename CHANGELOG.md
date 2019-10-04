# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
- Changed footer icons to Vue components
- New Map Layers Toggle Functionality
- Water layer above neighboring countires
- Restricted user ability to zoom out past the continental United States
- Added sub-subtitle with date of last available data
- Adjusted mapStyles to have HRU's solid colors
- Legend Toggle functionality
- Min-height for map
- Added footer email
- topNavToggle icon adjustment and mobile adjustment
- Changed URLs to use new tile server
- Map Options layers dynamic toggle functionality first added
- Made Subtitle more mobile friendly
- Edited Legend modal to better fit a mobile experience
- Added vue-svg-loader package
- Added Florida and Arizona SVGS
- Created Legend Modal
- Added new Legend text and legend info button
- Added a stream orders toggle bar so that we can test out which stream orders we want
>>>>>>> 59045ebf3f74c5e8620f4a5cbbe3f4de0bbd312e
- Made subtitle information modal popup
- Made Map Subtitle component
- Added map subtitle and subtitle info button
- Cleaned up mapStyles.json
- Changed map and page title to 'National Integrated Water Availability Assessments'
- Added attribution control for OpenMapTiles layers
- Removed Mapbox street layers and replaced them with OpenMapTiles
- Zoom to bounding box of the U.S.
- Removed City Dots and HRU Outlines
- Added Flexbox fluidity to the layout
- Added Mapbox layers for testing 
- Parameterized git branch/tag in Jenkinsfile
- Refined layer toggle for appearance and mobile compatibility
- Adjusted the minimum zoom level to 3 as well as the default/initial zoom level to 3
- Added Legend
- Added hover effect to HRUs
- Changed to allow tile assets to be pulled from S3
- Added layer toggle for all layers, and added 'showButton' property to mapStyles.js to control display of buttons
- Moved the map styles to a separate mapStyles.js 
- Changed application to use vue-mapbox plugin
- Dotted State lines to show its possible.
- Added Cities to the basemap layers.
- Changed basemap creation so  we have several source layers to avoid loading in all layers multiple times and filtering.  This way we only call the layer we want when we want
- changed layer order so HRU layer is lowest and changed the opacity of that layer 
- added map controls
- Deleted second mbtiles folder
- Fixed the title bar CSS at wide widths, adjusted the page title
- Added basemap mbtiles to the mbtiles directory
- Fixed menu bar title, added more appropriate title to page
- Added appropriate changes to the style variable in the Mapbox.vue to style the map the way I chose to
- Added USWDS components, Added title, removed component not needed

