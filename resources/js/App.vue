<template>
	<div class="mps-1">
		<LeftSideComponent/>
    <RightSideComponent/>
	</div>
</template>

<script>
import LeftSideComponent from "./components/MainPage/LeftSideComponent";
import RightSideComponent from "./components/MainPage/RightSideComponent";

export default {
  name: "App",
  components: {
    LeftSideComponent,
    RightSideComponent
  },
  data() {
    return {
        name: "test name",
    }
  }
}
</script>

