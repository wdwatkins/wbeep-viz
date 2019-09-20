<template>
  <div id="map_legend_container" class="map-overlay">
    <div id="legendTitleInfoContainer">
      <p>{{ legendTitle }}</p>
      <div id="legendInfoButton">
        <a id="legendInfo">
          <font-awesome-icon icon="info" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import mapStyles from '../assets/mapStyles/mapStyles';

  export default {
      name: 'MapLegend',
      props: {
          legendTitle: {
              type: String,
              default: 'Add your title for the legend in MapBox.vue or make this blank'
          }
      },
      data() {
          return {
            legend: null
          }
      },
      mounted() {
          this.createLegend()
      },
      methods: {
        createLegend() {
            // get the style layers from the map styles object
            let styleLayers = mapStyles.style.layers;
            let colors = [];
            let layers = [];
            // look through the styles layers to find the one with the Hydrological Response Unit fill colors
            for (let index = 0; index < styleLayers.length; index++) {
                if (styleLayers[index].id === 'HRUs') {
                    // Get the fill color values and names then put them in separate lists
                    let hruColors = styleLayers[index].paint['fill-color'].stops;
                    let hruColorLabel = null;
                    for (let index = 0; index < hruColors.length; index ++) {
                        // Make a label for the blank and missing data
                        if (hruColors[index][0] === '') {
                            hruColorLabel = 'no data';
                        } else {
                            hruColorLabel = hruColors[index][0];
                        }
                        colors.push(hruColors[index][1]);
                        layers.push(hruColorLabel);
                    }
                }
            }

            let legend = this.legend;
            legend = document.getElementById('map_legend_container');

            for (let index = 0; index < layers.length; index++) {
                let layer = layers[index];
                let color = colors[index];
                let item = document.createElement('div');
                let keyContainer = document.createElement('div');
                let textContainer = document.createElement('div');
                let key = document.createElement('span');

                item.style.display = "flex";
                item.style.margin = "0 0 5px 0"
                item.style.padding = "0 10px 0 0";
                key.style.backgroundColor = color;
                key.style.margin = ' 0 5px 0 10px';
                key.style.display = 'inline-block';
                key.style.height = '10px';
                key.style.width = '10px';
                let value = document.createElement('span');
                value.style.fontSize = ".8em";
                value.style.userSelect = "none"
                let highlight = document.createElement('span');
                let text = document.createElement('span');

                highlight.style.color = color;
                highlight.style.fontWeight = "bold";
                highlight.style.textShadow = "1px 1px 0 rgba(0,0,0,.25)"

                let options = {
                  "very high":{
                    category: "Uncommonly Wet",
                    text: " - it's typically drier than it is today in this region"
                  },
                  "medium": {
                    category: "Common",
                    text: " - today is normal for this region"
                  },
                  "very low": {
                    category: "Uncommonly Dry",
                    text: " - its typically wetter than it is today in this region"
                  }
                }

                let fillInContent = function(option){
                  highlight.innerHTML = options[option].category
                  text.innerHTML = options[option].text;
                  value.appendChild(highlight);
                  value.appendChild(text);
                }
                              
                if(layer === "very high"){
                  fillInContent(layer);
                }else if(layer === "medium"){
                  fillInContent(layer);
                }else if(layer === "very low"){
                  fillInContent(layer);
                }else if(layer === "no data"){
                  value.innerHTML = layer;
                }

                keyContainer.appendChild(key);
                textContainer.appendChild(value);
                item.appendChild(keyContainer);
                item.appendChild(textContainer);
                legend.appendChild(item);
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  $border: 1px solid rgb(200,200,200);
  .map-overlay {
    position: absolute;
    z-index:1000;
    bottom: 10px;
    left: 10px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    background: rgba(255, 255, 255, 0.8);
    margin-right: 120px;
    overflow: auto;
    border-radius: 5px;
    border: $border;
    max-width: 280px;

    p{
      margin: 0 5px 0 0;
      line-height: 30px;
      user-select: none;
    }
  }

  #legendTitleInfoContainer{
    position: relative;
    margin: 0 0 5px 0;
    border-bottom: $border;

    p{
      padding: 0 0 0 10px;
    }
  }

  #legendInfoButton{
    width: 30px;
    height:  30px;
    position: absolute;
    top:0;
    right: 0;
    border-left: $border;
  }

  #legendInfo{
    display: block;
    width: 30px;
    height: 30px;
    text-align: center;
    outline: none;
    border-radius: 0 5px 0 0;
    cursor: pointer;
    
    &:hover{
      background: #003366;
      color: #ffffff;
    }

    svg{
      margin: 5px 0 0 0;
      width: 18px;
      height: 18px;
    }
  }

</style>
