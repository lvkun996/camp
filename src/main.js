import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.less'

import moment from 'moment'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import plugins from '@/components'

Vue.filter('formatDate', function(value) {
  return Moment(value).format('YYYY-MM-DD HH:mm:ss')
})

Vue.prototype.$moment = moment

moment.locale('zh-cn')

Vue.use(VueQuillEditor)

Vue.use(plugins)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
