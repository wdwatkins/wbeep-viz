import Vue from 'vue'
import App from './App.vue'
import uswds from 'uswds'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faWater } from '@fortawesome/free-solid-svg-icons'

// social icons
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faFlickr } from '@fortawesome/free-brands-svg-icons'
import { faYoutubeSquare } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

Vue.component('font-awesome-icon', FontAwesomeIcon)

library.add(faInfo)
library.add(faLayerGroup)
library.add(faTimes)
library.add(faThumbsUp)
library.add(faThumbsDown)
library.add(faMinus)
library.add(faPlus)
library.add(faWater)

// social icons
library.add(faTwitterSquare)
library.add(faFacebookSquare)
library.add(faGithub)
library.add(faFlickr)
library.add(faYoutubeSquare)
library.add(faInstagram)

Vue.config.productionTip = false
Vue.use(uswds)

new Vue({
  render: h => h(App),
}).$mount('#app')
