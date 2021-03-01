<template>
	<div
    class="right-side-container_footer"
    ref="menu"
  >
    <div class="right-side-container_footer-title">
      <h2 @click="openMenu"> {{menuTitle}} </h2>
    </div>
    <transition-group
      appear
      tag="ul"
      v-if="isOpen"
      class="menu_wrapper"
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <li
        v-for="item in menuItems"
        :key="item.href"
      >
        <router-link :to="item.href"> {{item.title}} </router-link>
      </li>
    </transition-group>
    
  </div> 
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
	name: "FooterMenu",
	data() {
		return {
			isOpen: false,
      menuItems: [],
		}
	},

	computed: {
    ...mapState([
      "menu"
    ]),

		menuTitle() {
			return this.isOpen === false ? "Menu" : "Close";
		}
	},

	methods: {
    ...mapMutations([
      "fillMenu",
    ]),

		openMenu() {
      if (this.isOpen === false) {
        this.isOpen = true;
        this.$refs.menu.style.width = "100%";
        this.$refs.menu.style.height = "100vh";
        setTimeout(() => {
          this.fillMenu(this.menuItems);
        }, 300);
      } else {
        this.menuItems = [];
        setTimeout(() => {
          this.$refs.menu.style.width = null;
          this.$refs.menu.style.height = null;
          this.isOpen = false;
        }, 1000);
      }
		}
	},
}
</script>