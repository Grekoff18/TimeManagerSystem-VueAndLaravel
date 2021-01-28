<template>
	<div class="app_body">
		<FirstBlockComponent/>
    <SecondBlockComponent/>
	</div>
</template>

<script>
import FirstBlockComponent from "./components/MainPage/FirstBlockComponent";
import SecondBlockComponent from "./components/MainPage/SecondBlockComponent";

export default {
  name: "App",
  components: {
    FirstBlockComponent,
    SecondBlockComponent
  },
  data() {
    return {
        name: "test name",
    }
  }
}
</script>

