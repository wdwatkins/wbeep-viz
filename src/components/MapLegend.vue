<template>
  <div id='map_legend_container' class='map-overlay'>
    <p>{{ legendTitle }}</p>
  </div>
</template>

<script>
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
            let legend = this.legend;
            legend = document.getElementById('map_legend_container');
            let layers = ['very low', 'low', 'average', 'high', 'very high', 'no data'];
            let colors = ['#CC4C02', '#EDAA5F', '#FED98E', '#A7B9D7', '#144873', '#000000'];

            for (let index = 0; index < layers.length; index++) {
                let layer = layers[index];
                let color = colors[index];
                let item = document.createElement('div');
                let key = document.createElement('span');
                key.className = 'legend-key';
                key.style.backgroundColor = color;

                let value = document.createElement('span');
                value.innerHTML = layer;
                item.appendChild(key);
                item.appendChild(value);
                legend.appendChild(item);
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  #MapLegendDiv {
    background-color: red;
    z-index: 1;
    padding: 10px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    line-height: 18px;
    height: 150px;
    margin-bottom: 40px;
    width: 100px;
  }

  .legend-key {
    display: inline-block;
    border-radius: 20%;
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }
</style>