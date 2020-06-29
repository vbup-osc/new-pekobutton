import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import i18n from './i18n'
import './registerServiceWorker'
import VueCookies from 'vue-cookies'
import '@mdi/font/css/materialdesignicons.css'
import SoftUI from './components/SoftUI'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueCookies)
Vue.use(SoftUI)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    data: function() {
        return {
            dark: false,
        }
    },
    render: h => h(App)
}).$mount('#app')