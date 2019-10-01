<template>
  <div id="dataDateContainer" class="subtitle">
    <div class="subtitleText">
      <p>Showing Latest Available Data: {{ dataDate }}</p>
    </div>
  </div>
</template>
<script>
  export default {
      name: "MapAvailableDataDate",
      data() {
          return {
              dataDate: "unavailable"
          };
      },
      mounted() {
          // Get the date the model data was received and add it to the component data
          fetch('https://wbeep-test-website.s3-us-west-2.amazonaws.com/date/date.txt')
                  .then(response => {
                      if (!response.ok) { throw Error(response.statusText + ' The call to retrieve the model date has failed.') }
                      return response
                  })
                  .then(response => response.text())
                  .then(data => this.dataDate = data);
      }
  }

</script>
<style scoped lang="scss">
  .subtitle {
    background: rgb(255, 255, 255);
    background: rgba(255, 255, 255, 0.7);
    position: absolute;
    top: 43px;
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
      font-size: .75em;
    }

    .subtitleText {
      flex: 1;
      line-height: 25px;
      padding: 0;
    }
  }
</style>