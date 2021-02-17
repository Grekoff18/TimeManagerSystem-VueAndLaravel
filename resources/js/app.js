/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');

window.Vue = require('vue').default;
// Added vuex store
import Vuex from 'vuex';
import storeData from "./store/index";
Vue.use(Vuex);
const store = new Vuex.Store(
  storeData
)
// Added vuelidate
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
// Added animate.css
import "animate.css";
// Added vue-router
import router from "./router.js";
// Added moment js
import moment from 'moment';
Vue.prototype.moment = moment;
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
Vue.component('main-page', require('./views/MainPage.vue').default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const app = new Vue({
    el: '#app',
    store,
    router
});
