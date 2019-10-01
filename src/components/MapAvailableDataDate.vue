<template>
  <div id="dataDateContainer">
    <div>Showing Latest Available Data: {{ dataDate }}</div>
  </div>
</template>
<script>
  export default {
      name: "MapAvailableDataDate",
      data() {
          return {
              dataDate: "test"
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

</style>