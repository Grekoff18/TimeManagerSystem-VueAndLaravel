import VueRouter from 'vue-router';
import Vue from "vue";
import MainPage from "../js/pages/MainPage.vue";

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		component: MainPage,
	}
];

export default new VueRouter({
	mode: "history",
	routes
})