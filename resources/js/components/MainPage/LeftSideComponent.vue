<template>
	<div class="left-side-container">
    <div class="left-side-container_header">
      <div class="left-side-container_header-title">
        <h2>TimeSpy</h2>
      </div>
    </div>
    <task-list/>
	</div>
</template>

<script>
import TaskList from "./TaskList/TaskList"

export default {
  name: "LeftSideComponent",
  components: {TaskList},
  data() {
    return {

    }
  },
}
</script>
