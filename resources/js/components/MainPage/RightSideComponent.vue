<template>
	<div class="right-side-container">
    <div class="right-side-container_clock-block">
    	{{count}}
    </div>
    <footer-menu/>
	</div>
</template>

<script>
import FooterMenu from "../FooterMenu";

export default {
	name: "RightSideComponent",
	components: {FooterMenu},
	data() {
		return {
		}
	},

	computed: {
		count () {
	    return this.$store.state.count
    }
	},

	methods: {
		
	}
}
</script>

