<template>
	<div class="first">
    <div class="first_header">
      <div class="first_header-title">
        <h2>TimeSpy</h2>
      </div>
    </div>
    <div class="first_task-block">
      <div class="info_btn material-icons">
        error_outline
      </div>
      <div class="fields-section">
        <div class="input_section">
          <input type="text" placeholder="Type your task here">
          <button type="button" class="task_btn material-icons">add_task</button>
        </div>
        <div class="select_section">
          <select name="" id="">
            <option value=""></option>
          </select>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
	export default {
		name: "firstBlockComponent",
		data() {
			return {

			}
		}
	}
</script>
