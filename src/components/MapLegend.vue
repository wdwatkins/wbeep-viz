<template>
  <div id="map_legend_container" class="map-overlay">
    <div id="legendTitleInfoContainer">
      <p>{{ legendTitle }}</p>
      <div id="legendInfoButton">
        <a id="legendInfo">
          <font-awesome-icon icon="info" />
        </a>
      </div>
      <div id="legendModal">
        <div id="legendModalContent">
          <div id="exitlegendModal">
            <font-awesome-icon id="legendExit" icon="times" />
          </div>
          <p class="example">Q: Can I compare Florida to Arizona?</p>
          <p class="example">A: Sort Of.</p>
          <p>
            The daily water status is determined based on the water norms of each region.
            So, if the following were statuses for Arizona and Florida.
          </p>
          <div id="states">
            <div id="florida" class="state"></div>
            <div id="arizona" class="state"></div>
          </div>
          <p>Then below are incorrect and correct interpretations</p>
        </div>
        <div id="interpretations">
          <div id="incorrect" class="interpretation">
            <div class="interpretationIcon">
              <font-awesome-icon icon="thumbs-down" />
            </div>
            <div class="interpretationText">
              Florida has less water than Arizona.
            </div>
          </div>
          <div id="correct" class="interpretation">
            <div class="interpretationIcon">
              <font-awesome-icon icon="thumbs-up" />
            </div>
            <div class="interpretationText">
              Florida is usually wetter than it is today, whereas Arizona is usually drier than it is today.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mapStyles from "../assets/mapStyles/mapStyles";

export default {
  name: "MapLegend",
  props: {
    legendTitle: {
      type: String,
      default: "Add your title for the legend in MapBox.vue or make this blank"
    }
  },
  data() {
    return {
      legend: null
    };
  },
  mounted() {
    this.createLegend();
  },
  methods: {
    createLegend() {
      // get the style layers from the map styles object
      let styleLayers = mapStyles.style.layers;
      let legendColorValues = [];
      let styleSheetCategories = [];
      let selectedLayerStyle = null;
      // look through the styles layers to find the one with the Hydrological Response Unit fill colors
      for (let index = 0; index < styleLayers.length; index++) {
        if (styleLayers[index].id === "HRUs") {
          // save the layer style we want, so we can use it later
          selectedLayerStyle = styleLayers[index];
          // Get the fill color values and names then put them in separate lists
          let styleSheetColorStops = styleLayers[index].paint["fill-color"].stops;
          let styleSheetColorLable = null;
          for (let index = 0; index < styleSheetColorStops.length; index++) {
            // Make a label for the blank and missing data
            if (styleSheetColorStops[index][0] === "") {
              styleSheetColorLable = "no data";
            } else {
              styleSheetColorLable = styleSheetColorStops[index][0];
            }
            legendColorValues.push(styleSheetColorStops[index][1]);
            styleSheetCategories.push(styleSheetColorLable);
          }
        }
      }

      let legend = this.legend;
      legend = document.getElementById("map_legend_container");

      for (let index = 0; index < styleSheetCategories.length; index++) {
        let legendMainText = styleSheetCategories[index];
        let color = legendColorValues[index];
        let item = document.createElement("div");
        let keyContainer = document.createElement("div");
        let textContainer = document.createElement("div");
        let key = document.createElement("span");

        item.style.display = "flex";
        item.style.margin = "0 0 5px 0";
        item.style.padding = "0 10px 0 0";
        key.style.backgroundColor = color;
        key.style.margin = " 0 5px 0 10px";
        key.style.display = "inline-block";
        key.style.height = "10px";
        key.style.width = "10px";
        let value = document.createElement("span");
        value.style.fontSize = ".8em";
        value.style.userSelect = "none";
        let highlight = document.createElement("span");
        let text = document.createElement("span");

        highlight.style.color = color;
        highlight.style.fontWeight = "bold";
        highlight.style.textShadow = "1px 1px 0 rgba(0,0,0,.25)";

        highlight.innerHTML = selectedLayerStyle.legendText[legendMainText][0];
        text.innerHTML = selectedLayerStyle.legendText[legendMainText][1];
        value.appendChild(highlight);
        value.appendChild(text);

        keyContainer.appendChild(key);
        textContainer.appendChild(value);
        item.appendChild(keyContainer);
        item.appendChild(textContainer);
        legend.appendChild(item);
      }
    }
  }
};
</script>

<style scoped lang="scss">
$border: 1px solid rgb(200, 200, 200);
$background: rgba(255, 255, 255, 0.8);
$borderRadius: 5px;
.map-overlay {
  position: absolute;
  z-index: 1000;
  bottom: 10px;
  left: 10px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  background: $background;
  margin-right: 120px;
  border-radius: $borderRadius;
  border: $border;
  max-width: 280px;

  p {
    margin: 0 5px 0 0;
    line-height: 30px;
    user-select: none;
  }
}

#legendTitleInfoContainer {
  position: relative;
  margin: 0 0 5px 0;
  border-bottom: $border;

  p {
    padding: 0 0 0 10px;
  }
}

#legendInfoButton {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  border-left: $border;
}

#legendInfo {
  display: block;
  width: 30px;
  height: 30px;
  text-align: center;
  outline: none;
  border-radius: 0 5px 0 0;
  cursor: pointer;

  &:hover {
    background: #003366;
    color: #ffffff;
  }

  svg {
    margin: 5px 0 0 0;
    width: 18px;
    height: 18px;
  }
}

#legendModal {
  background: $background;
  border: $border;
  border-radius: $borderRadius;
  min-height: 100px;
  width: 310px;
  position: absolute;
  left: 290px;
  bottom: 0;
  padding: 5px 10px;
  display: none;

  p {
    line-height: 1.4em;
    font-size: 0.8em;
    padding: 0;
  }

  .example {
    margin: 0 0 5px 0;
    font-weight: bold;
    font-size: 0.9em;
  }
}

#exitlegendModal {
  text-align: right;

  svg{
    &:hover{
      cursor: pointer;
    }
  }
}

#states {
  background: red;
  min-height: 10px;
  margin: 10px 0;
  display: flex;
}

.state {
  flex: 1;
}

#florida {
  background: green;
}

#arizona {
  background: aqua;
}

#interpretations {
  margin: 10px 0;

  #incorrect{
    margin: 0 0 15px 0;

    .interpretationIcon{
      color: #e54b4b;
    }
  }

  #correct{
    .interpretationIcon{
      color: #b9d7a7;
    }
  }

  .interpretation {
    display: flex;

    .interpretationIcon {
      width: 25px;
      height: 25px;
      margin: 0 5px 0 0;

      svg{
        width: 25px;
        height: 25px;
      }
    }

    .interpretationText {
      flex: 1;
    }
  }
}
</style>
