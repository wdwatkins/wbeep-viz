import Vue from 'vue'
import App from './App.vue'
import uswds from 'uswds'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'

library.add(faLayerGroup)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(uswds)

new Vue({
  render: h => h(App),
}).$mount('#app')
