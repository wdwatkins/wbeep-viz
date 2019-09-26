<template>
  <div id="subtitle">
    <div id="subtitleText">
      <p>An Indicator of Natural Water Storage</p>
    </div>
    <div id="subtitleInfoButton">
      <a
        id="subtitleIcon"
        href="javascript:void(0);"
        class="icon"
      >
        <font-awesome-icon icon="info" />
      </a>
      <div id="subtitleInfoModal">
        <div id="infoContainer">
          <a
            id="exit"
            href="javascript:void(0);"
            class="icon"
          >
            <font-awesome-icon icon="times" />
          </a>
 
          <h3>About This Map</h3>
          <p>
            This map shows daily estimates of natural water storage for 110,000 
            regions across the continental U.S. Map shading indicates the natural 
            water storage relative to historical conditions for this time of year.
          </p>
          
          <h3>About IWAAs</h3>
          <p>
          The <a href="https://www.usgs.gov/mission-areas/water-resources/science/integrated-water-availability-assessments-iwaas">USGS Integrated Water Availability Assessments (IWAAs)</a>
          are a multi-extent, stakeholder driven, near real-time census and seasonal
          prediction of water availability for both human and ecological uses at
          regional and national extents.
          </p>

          <p>
          The USGS IWAAs combine resources and knowledge gained from previous and
          ongoing USGS efforts such as <a href="https://water.usgs.gov/watercensus/focusarea.html">Focus Area Studies</a>,
          <a href="https://water.usgs.gov/watercensus/groundwater.html">Regional Groundwater Availability Studies</a>,
          <a href="https://water.usgs.gov/watercensus/water-use.html">Water Use estimation</a>,
          <a href="https://water.usgs.gov/watercensus/ecowater.html">Ecological Water Needs</a>,
          and <a href="https://water.usgs.gov/watercensus/streamflow.html">Streamflow estimation</a>,
          in addition to utilizing and providing feedback to the
          <a href="http://water.noaa.gov/about/nwm">National Water Model</a>. The IWAAs
          are designed to provide information to meet the goals of the
          <a href="https://water.usgs.gov/watercensus/index.html">National Water Census</a> as established through the SECURE Water Act.
          </p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapSubtitle"
};
</script>

<style scoped lang="scss">
#subtitle {
  background: rgb(255, 255, 255);
  background: rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  text-align: center;
  border: 1px solid rgb(200, 200, 200);
  width:270px;

  p {
    margin: 0;
    user-select: none;
    font-size:.8em;
  }

  #subtitleText {
    flex: 1;
    line-height: 30px;
    padding: 0 0 0 10px;
  }

  #subtitleInfoButton {
    margin: 0 0 0 10px;
    width: 30px;
    height: 30px;
    position: relative;
    border-left: 1px solid rgb(200,200,200);

    a{
      color: #000;
      outline: none;
    }

    #subtitleIcon{
      display: block;
      height: 100%;
      border-radius: 0 5px 5px 0;

      &:active{
        background: #003366;
        color: #ffffff;
      }
      

      svg{
        width: 18px;
        height: 18px;
        margin: 5px 0 0 0;
      }
    }
  }
  #subtitleInfoModal{
    display: none;
    min-height: 30px;
    height: 40vh;
    overflow: scroll;
    position: absolute;
    top: 40px;
    right: -25px;
    border-radius: 5px;
    border: 1px solid rgb(200,200,200);
    background: rgb(255,255,255);
    background: rgba(255,255,255,.8);
    
    #infoContainer{
      min-height: 20px;
      width: 350px;
      position: relative;
      padding: 25px 10px 0 10px;

      #exit{
        width: 20px;
        height: 20px;
        position: absolute;
        right: 0;
        top: 0;
      }

      p{
        text-align: left;
        margin: 0 0 10px 0;
      }
      
      h3{
        font-size: 1.1em;
        font-weight: bold;
        padding: 0;
        margin: 8px 0;
      }

      button{
        margin: 0 0 10px 0;
        background: #003366;
        color: #ffffff;
        border: none;
        outline: none;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: .9em;
        font-weight: bold;
      }
    }
  }
}

@media screen and (min-width: 600px){
  #subtitle{
    width: 320px;

    p{
      font-size: .9em;
    }
    #subtitleInfoModal{
      #infoContainer{
        width: 350px;
      }
    }
  }
  
  
}
</style>
