<template>
	<div class="right-side-container_footer" ref="menu">
    <div class="right-side-container_footer-title">
      <h2 @click="openMenu"> {{menuTitle}} </h2>
    </div>
    <transition-group
    	v-if="isOpen"
    	tag="ul"
    	name="target"
    >
    	<li
    		v-for="(item, index) in menuItem"
    		:key="item.href"
    		:duration="{enter: 4000, leave: 5000}"
    	>
    		<router-link
    		 	:to="item.href"
    		 	class="menu_items"
    		> 
    			{{item.title}}
    		</router-link>
    	</li>
    </transition-group>
  </div>
</template>

<script>

export default {
	name: "FooterMenu",
	data() {
		return {
			menuItem: [
				{title: "About Project", href: "/about"},
				{title: "Donate", href: "/donate"},
				{title: "Pomadoro", href: "/pomadoro"},
				{title: "Contact", href: "/contact"},
			],
			isOpen: false,
			isAnimated: false
		}
	},

	computed: {
		menuTitle() {
			return this.isOpen === false ? "Menu" : "Close";
		}
	},

	methods: {
		openMenu() {
			if (this.isOpen === false) {
				this.isOpen = true;
				this.$refs.menu.style.minHeight = '92.9648241vh';
				this.$refs.menu.style.width = '100%';
				this.isAnimated = true;
			} else {
				this.isOpen = false;
				this.$refs.menu.style.minHeight = null;
				this.$refs.menu.style.width = null;
				this.isAnimated = false;
			}
		},
	},
}
</script>