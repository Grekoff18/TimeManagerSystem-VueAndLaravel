<template>
  <div class="left-side-container_task-block">
    <div class="task-list-title">
      <h3>TaskList</h3>
    </div>
    <div class="info-btn material-icons">
      error_outline
    </div>
    <div class="add-task">
      <div class="add-task_field">
        <input type="text" name="added_task" placeholder="Type your task here">
        <button type="button" class="task_btn material-icons">add_task</button>
      </div>
    </div>
    <div class="task-list">
      <ul>
        <li>
          <p>Task 1</p>
          <div class="task-list_btn-section">
            <button class="material-icons">keyboard_arrow_down</button>
            <button class="material-icons">edit</button>
            <button class="material-icons">clear</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
name: "TaskList"
}
</script>

<style scoped>

</style>
