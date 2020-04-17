import Vue from 'vue'
import App from './App.vue'
import AtComponents, { Notification, LoadingBar, Dialog, Message } from 'at-ui'
import Vuelidate from "vuelidate";
import router from './router'
import VuePageTransition from 'vue-page-transition'
import store from '@/store'

import 'at-ui-style'

Vue.use(AtComponents)
Vue.use(Vuelidate)
Vue.use(VuePageTransition)

Vue.config.productionTip = false
Vue.prototype.$notify = Notification
Vue.prototype.$loading = LoadingBar
Vue.prototype.$modal = Dialog
Vue.prototype.$message = Message

new Vue({
    router,
    render: h => h(App),
    store,
}).$mount('#app')
