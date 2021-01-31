<template>
	<div class="left-side-container">
    <div class="left-side-container_header">
      <div class="left-side-container_header-title">
        <h2>TimeSpy</h2>
      </div>
    </div>
    <TaskList/>
	</div>
</template>

<script>
import TaskList from "./TaskList"

export default {
  name: "LeftSideComponent",
  components: {TaskList},
  data() {
    return {

    }
  },
}
</script>
