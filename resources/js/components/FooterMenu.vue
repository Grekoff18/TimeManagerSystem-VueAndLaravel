<template>
	<div class="right-side-container_footer" ref="menu">
    <div class="right-side-container_footer-title">
      <h2 @click="openMenu"> {{menuTitle}} </h2>
    </div>
  </div>
</template>

<script>

export default {
	name: "FooterMenu",
	data() {
		return {
			isOpen: false,
			menuItems: [],
		}
	},

	computed: {
		menuTitle() {
			return this.isOpen === false ? "Menu" : "Close";
		}
	},

	methods: {
		openMenu() {

		}
	},
}
</script>