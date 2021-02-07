<template>
	<div class="mps-1">
    <div class="top-container">
      <left-side-component/>
      <right-side-component/>
    </div>
    <bottom-component/>
	</div>
</template>

<script>
import LeftSideComponent from "./components/MainPage/LeftSideComponent";
import RightSideComponent from "./components/MainPage/RightSideComponent";
import BottomComponent from "./components/MainPage/BottomComponent";

export default {
  name: "App",
  components: {
    LeftSideComponent,
    RightSideComponent,
    BottomComponent,
  },
  data() {
    return {
        name: "test name",
    }
  }
}
</script>

