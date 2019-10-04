<template>
  <div id="footer">
    <footer class="footer">
      <div class="tmp-container">
        <!-- .footer-wrap -->
        <!-- .footer-doi -->
        <div class="footer-doi">
          <!-- footer nav links -->
          <ul class="menu nav">
            <li class="first leaf menu-links menu-level-1">
              <a href="https://www.doi.gov/privacy">DOI Privacy Policy</a>
            </li>
            <li class="leaf menu-links menu-level-1">
              <a href="https://www.usgs.gov/laws/policies_notices.html">Legal</a>
            </li>
            <li class="leaf menu-links menu-level-1">
              <a href="https://www2.usgs.gov/laws/accessibility.html">Accessibility</a>
            </li>
            <li class="leaf menu-links menu-level-1">
              <a href="https://www.usgs.gov/sitemap.html">Site Map</a>
            </li>
            <li class="last leaf menu-links menu-level-1">
              <a href="https://answers.usgs.gov/">Contact USGS</a>
            </li>
          </ul>
          <!--/ footer nav links -->
        </div>
        <!-- /.footer-doi -->

        <hr>

        <!-- .footer-utl-links -->
        <div class="footer-doi">
          <ul class="menu nav">
            <li class="first leaf menu-links menu-level-1">
              <a href="https://www.doi.gov/">U.S. Department of the Interior</a>
            </li>
            <li class="leaf menu-links menu-level-1">
              <a href="https://www.doioig.gov/">DOI Inspector General</a>
            </li>
            <li class="leaf menu-links menu-level-1">
              <a href="https://www.whitehouse.gov/">White House</a>
            </li>
            <li class="leaf menu-links menu-level-1">
              <a href="https://www.whitehouse.gov/omb/management/egov/">E-gov</a>
            </li>
            <li class="leaf menu-links menu-level-1">
              <a href="https://www.doi.gov/pmb/eeo/no-fear-act">No Fear Act</a>
            </li>
            <li class="last leaf menu-links menu-level-1">
              <a href="https://www2.usgs.gov/foia">FOIA</a>
            </li>
          </ul>
        </div>
        <!-- /.footer-utl-links -->
        <!-- .footer-social-links -->
        <div class="footer-social-links">
          <ul class="social">
            <li class="follow">
              Follow
            </li>
            <li class="twitter">
              <a
                href="https://twitter.com/usgs"
                target="_blank"
              >
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter-square' }" class="social-icon"><span class="only">Twitter</span></font-awesome-icon>
              </a>
            </li>
            <li class="facebook">
              <a
                href="https://facebook.com/usgeologicalsurvey"
                target="_blank"
              >
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook-square' }" class="social-icon"><span class="only">Facebook</span></font-awesome-icon>
                </a>
            </li>
            <li class="github">
              <a
                href="https://github.com/usgs"
                target="_blank"
              >
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'github' }" class="social-icon"><span class="only">GitHub</span></font-awesome-icon>
              </a>
            </li>
            <li class="flickr">
              <a
                href="https://flickr.com/usgeologicalsurvey"
                target="_blank"
              >
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'flickr' }"  class="social-icon"><span class="only">Flickr</span></font-awesome-icon>
              </a>
            </li>
            <li class="youtube">
              <a
                href="http://youtube.com/usgs"
                target="_blank"
              >
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'youtube-square' }" class="social-icon"><span class="only">YouTube</span></font-awesome-icon>
              </a>
            </li>
            <li class="instagram">
              <a
                href="https://instagram.com/usgs"
                target="_blank"
              >
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }" class="social-icon"><span class="only">Instagram</span></font-awesome-icon>
              </a>
            </li>
          </ul>
        </div>
        <!-- /.footer-social-links -->
      </div>
      <!-- /.footer-wrap -->
    </footer>
  </div>
</template>

<script>
    export default {
        name: 'FooterUSGS'
    }
</script>

<style scoped lang="scss">
  @import"../style/usgsHeaderFooter/combinedLoad.css";

  .social-icon {
    color: white;
    height: 24px;
    width: 21px;
  }
  
</style>
