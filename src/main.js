import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery';
import _ from "lodash"
import bootbox from "bootbox"
import SysUI_init from "@/tc_javascript/SysUI_init"
import TC_EXE from "@/tc_javascript/TC_EXE"
import "@/tc_javascript/common"
import axios from 'axios'
import VueAxios from 'vue-axios'
import DatePicker from 'vue2-datepicker';
import WaterMark from "@/components/tc_components/watermark.vue";
import Pagination from "@/components/tc_components/pagination.vue";
import DisplayColumn from "@/components/tc_components/display-column-modal.vue";
import 'vue2-datepicker/locale/zh-cn';
import './directive/index.js';
import i18n from '@/common/plugins/vue-i18n'
import '@/tc_javascript/console'

import './icons'
import './assets/font/font.css'
import './app.scss'
import './tc.css'
Vue.component('WaterMark',WaterMark)
Vue.component("Pagination",Pagination)
Vue.component("DisplayColumn",DisplayColumn)

Vue.use(DatePicker)
import App from './App.vue'
Vue.use(VueAxios, axios)
Vue.use(bootbox)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ElementUI)

axios.defaults.headers.common["User-Token"] = sessionStorage["user_token"];

window.axios=axios
window.$ = $
window.jQuery=$
window._ = _
window.bootbox = bootbox
window.TC_EXE = TC_EXE
window.SysUI = SysUI_init($,process.env.VUE_APP_DEV_LARAVEL)

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
