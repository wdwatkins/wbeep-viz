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
          console.log('Component has been created!');
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



    p {
      margin: 0;
      user-select: none;
      font-size: .8em;
    }

    .subtitleText {
      flex: 1;
      line-height: 30px;
      padding: 0 0 0 10px;
    }
  }
</style>