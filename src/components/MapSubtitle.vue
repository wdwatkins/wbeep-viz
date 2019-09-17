<template>
  <div id="subtitle">
        <div id="subtitleText">
          <p>An Indicator of Natural Water Storage</p>
        </div>
        <div id="subtitleInforButton">
          <a href="#" class="icon">
            <font-awesome-icon icon="info" />
          </a>
        </div>
      </div>
</template>

<script>
  export default {
      name: 'MapSubtitle',
      props: {
          subTitle: {
              type: String,
              default: 'Add your title for the legend in MapBox.vue or make this blank'
          }
      }
  }
</script>

<style scoped lang="scss">
  #subtitle{
    background:rgb(255,255,255);
    background:rgba(255,255,255,.6);
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    text-align: center;

    p{
      margin: 0;
    }

    #subtitleText{
      flex: 1;
      padding: 0 5px 0 0;
      border-right: 1px solid #000;
    }

    #subtitleInforButton{
      margin: 0 0 0 5px;
      width: 20px;
      

      a{
        color: #000;
        display: block;
        outline: none;
      }
    }
  }
</style>
