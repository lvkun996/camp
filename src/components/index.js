import breadcrumb from './breadcrumb.vue'
import Card from './card.vue'
import Steps from './steps.vue'
import Pagination from './pagination'
export default {
  install (Vue) {
    Vue.component('breadcrumb', breadcrumb)
    Vue.component('Card', Card)
    Vue.component('Steps', Steps)
    Vue.component('Pagination', Pagination)
  }
}
