<template>
    <div id="footerEmailContainer">
        <p>
            Have feedback? Let us know by sending an email to <a href="mailto:gs-w_onhm@usgs.gov">gs-w_onhm@usgs.gov</a>
        </p>
    </div>
</template>
<script>
export default {
    name: "footerEmail"
}
</script>
<style scoped lang="scss">
    #footerEmailContainer{
        padding: 2px 10px;
        text-align: center;

        p{
            margin: 0;
            font-size: .8em;
        }

        a{
            color: #003366;
            text-decoration: none;
            font-weight: bold; 
            white-space: nowrap;
        }
    }
</style>