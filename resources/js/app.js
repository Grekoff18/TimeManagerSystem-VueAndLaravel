require('./bootstrap');  
window.Vue = require('vue').default;

import Vuex          from 'vuex';
import Vuelidate     from 'vuelidate';
import VuexEffects   from "vuex-effects";
import VueApexCharts from 'vue-apexcharts';
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import moment        from 'moment';
import router        from "../router/router";
import storeData     from "./store/index";
import "animate.css";

Vue.use(Vuex);
const store = new Vuex.Store(
  storeData
)

Vue.use(Vuelidate);
Vue.use(VuexEffects(store));
Vue.use(VueApexCharts);
Vue.prototype.moment = moment;
// убрать в константы 
window.moment_global = moment;
moment.updateLocale("en", {week: {dow: 1}});

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
Vue.component('main-page', require('./pages/MainPage.vue').default);
Vue.component('apexchart', VueApexCharts)
Vue.component("vue-timepicker", VueTimepicker);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const app = new Vue({
    el: '#app',
    store,
    router,
});
