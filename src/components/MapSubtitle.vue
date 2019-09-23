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
          <p>
            This map shows daily estimates of natural water storage for 110,000 
            regions across the continental U.S. Map shading indicates the natural 
            water storage relative to historical conditions for this time of year.
          </p>
          <a href="#">
            <button>Learn More</button>
          </a>
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
    position: absolute;
    top: 40px;
    right: 0;
    border-radius: 5px;
    border: 1px solid rgb(200,200,200);
    background: rgb(255,255,255);
    background: rgba(255,255,255,.8);
    
    #infoContainer{
      min-height: 20px;
      width: 270px;
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
        width: 318px;
      }
    }
  }
  
  
}
</style>
