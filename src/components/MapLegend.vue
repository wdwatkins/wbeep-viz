<template>
<div id="legend">
  <div id="map_legend_container" class="map-overlay expandedLegend">
    <div id="legendTitleInfoContainer">
      <p>{{ legendTitle }}</p>
      <div class="legendButton">
        <a id="legendInfoButton" class="legendIcon">
          <font-awesome-icon icon="info" />
        </a>
        <a id="legendMinus" class="legendIcon">
          <font-awesome-icon icon="minus" />
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
            <div id="florida" class="state">
              <floridaSVG id="floridaSVG" class="statesvg" />
            </div>
            <div id="arizona" class="state">
              <arizonaSVG id="arizonaSVG" class="statesvg" />
            </div>
          </div>
          <p>Then below are incorrect and correct interpretations</p>
          <div id="interpretations">
            <div id="incorrect" class="interpretation">
              <div class="interpretationIcon">
                <font-awesome-icon icon="thumbs-down" />
              </div>
              <div class="interpretationText">Florida has less water than Arizona.</div>
            </div>
            <div id="correct" class="interpretation">
              <div class="interpretationIcon">
                <font-awesome-icon icon="thumbs-up" />
              </div>
              <div
                class="interpretationText"
              >Florida is usually wetter than it is today, whereas Arizona is usually drier than it is today.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="collapsedLegend">
      <span>Legend</span>
      <div class="legendButton">
        <a id="legendPlus" class="legendIcon">
          <font-awesome-icon icon="plus" />
        </a>
      </div>
    </div>
</div>
</template>

<script>
import mapStyles from "../assets/mapStyles/mapStyles";
import floridaSVG from "../images/states/florida.svg";
import arizonaSVG from "../images/states/arizona.svg";

export default {
  name: "MapLegend",
  components: {
    floridaSVG,
    arizonaSVG
  },
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
          let styleSheetColorStops =
            styleLayers[index].paint["fill-color"].stops;
          let styleSheetColorLabel = null;
          for (let index = 0; index < styleSheetColorStops.length; index++) {
            // Make a label for the blank and missing data
            if (styleSheetColorStops[index][0] === "") {
              styleSheetColorLabel = "no data";
            } else {
              styleSheetColorLabel = styleSheetColorStops[index][0];
            }
            legendColorValues.push(styleSheetColorStops[index][1]);
            styleSheetCategories.push(styleSheetColorLabel);
          }
        }
      }

      let legend = this.legend;
      legend = document.getElementById("map_legend_container");
      let florida = document.getElementById("floridaSVG");
      let arizona = document.getElementById("arizonaSVG");
      florida.style.fill = legendColorValues[0];
      arizona.style.fill = legendColorValues[4];

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
$background: rgba(255, 255, 255, 0.9);
$borderRadius: 5px;
$fontSizeMobile: 0.8em;
$fontSizeDesktop: 0.9em;
#legend {
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

#map_legend_container{
  display: none;
}

#collapsedLegend{
  width: 105px;
  background: $background;
  height: 30px;
  line-height: 30px;
  padding: 0 0 0 10px;
  border-radius: $borderRadius;
  border: $border;
  position: relative;
}

#legendTitleInfoContainer {
  position: relative;
  margin: 0 0 5px 0;
  border-bottom: $border;

  p {
    padding: 0 0 0 10px;
  }
}

.legendButton {
  width: auto;
  height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
}

.legendIcon {
  display: block;
  width: 30px;
  height: 30px;
  text-align: center;
  outline: none;
  border-left: $border;
  cursor: pointer;

  &:active {
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
  max-width: 280px;
  position: absolute;
  left: 0;
  bottom: 40px;
  padding: 5px 10px;
  display: none;

  p {
    line-height: 1.1em;
    font-size: $fontSizeMobile;
    padding: 0;
  }

  .example {
    margin: 0 0 5px 0;
    font-weight: bold;
    font-size: $fontSizeMobile;
  }
}

#exitlegendModal {
  text-align: right;

  svg {
    &:hover {
      cursor: pointer;
    }
  }
}

#states {
  min-height: 10px;
  margin: 10px 0;
  display: flex;
  align-content: space-between;
}

.state {
  flex: 1;
  height: 80px;
}

#florida {
  margin-right: 10px;
}

.statesvg {
  height: 100%;
  width: 100%;
  display: block;
  margin: auto;
}

#interpretations {
  margin: 10px 0;
  font-size: $fontSizeMobile;

  #incorrect {
    margin: 0 0 15px 0;

    .interpretationIcon {
      color: #e54b4b;
    }
  }

  #correct {
    .interpretationIcon {
      color: #b9d7a7;
    }
  }

  .interpretation {
    display: flex;

    .interpretationIcon {
      width: 25px;
      height: 25px;
      margin: 0 5px 0 0;

      svg {
        width: 25px;
        height: 25px;
      }
    }

    .interpretationText {
      flex: 1;
    }
  }
}

@media screen and (min-width: 600px) {

  #map_legend_container{
    display: block;
  }
  #collapsedLegend{
    display: none;
  }
  #legendModal {
    p {
      font-size: $fontSizeDesktop;
    }
    .example {
      font-size: $fontSizeDesktop;
    }
  }
  #interpretations {
    font-size: $fontSizeDesktop;
  }

  .state {
    height: 100px;
  }
}
</style>
