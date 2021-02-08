<template>
	<div class="left-side-container">
    <header-title/>
    <task-list/>
	</div>
</template>

<script>
import HeaderTitle from "../HeaderTitle";
import TaskList from "./TaskList/TaskList";

export default {
  name: "LeftSideComponent",
  components: {TaskList, HeaderTitle},
  data() {
    return {

    }
  },
}
</script>
