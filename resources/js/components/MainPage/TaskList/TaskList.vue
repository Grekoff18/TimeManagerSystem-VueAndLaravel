<template>
  <div class="left-side-container_task-block">
    <div class="task-list-title">
      <h3>TaskList</h3>
    </div>
    <div
     class="info-btn material-icons"
    >
      error_outline
    </div>
    <div class="add-task">
      <div class="add-task_field">
        <input
         type="text"
         name="added_task"
         placeholder="Type your task here"
         v-model="taskData.description"
        >
        <button
          type="button"
          class="task_btn material-icons"
          v-if="editMode"
          @click="updateTask"
        >
          check_circle_outline
        </button>
        <button
          v-else
          type="button"
          class="task_btn material-icons"
          @click="addTask(task)"
        >
          add_task
        </button>
      </div>
    </div>
    <div class="task-list">
      <transition-group
        appear
        name="task"
        tag="ul"
        v-for="(task, indx) in taskList"
        :key="indx"
      >
        <TaskListItem
          :key="indx"
          :task="task"
          v-on:delete-task="deleteTask"
          v-on:edit-task="editTask"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import TaskListItem from "./TaskListItem"
export default {
  name: "TaskList",

  components: {TaskListItem},

  data() {
    return {
      taskData: {
        description: ""
      },
      taskList: [],
      editMode: false,
      editableId: "",
    }
  },

  methods: {
    // Add method for task list
    addTask() { 
      axios.post("/api/task/store", {
        "task": this.taskData,
      })
      .then((res) => {
        this.getListTasks();
        this.taskData.description = "";
      })
      .catch((e) => console.log(e));
    },

    // Method for show our tasks 
    getListTasks() {
      axios.get("api/tasks")
        .then((response) => {
          this.taskList = response.data.reverse();
        })
        .catch((e) => console.log(e));
    },

    // Method for deleting our task 
    deleteTask(id) {
      axios.delete(`api/task/${id}`)
        .then(response => {
          if (response.status === 200) {
            this.getListTasks();
          }
        })
        .catch((e) => console.log(e));
    },

    // Edit method for task
    editTask(description, id) {
      this.taskData.description = description;
      this.editableId = id;
      if (!this.editMode) {
        this.editMode = true;
      }
    },

    // Update method for task
    updateTask() {
      axios.patch(`api/task/${this.editableId}`, {
        "task": this.taskData,
      })
      .then((response) => {
        if (response.status === 200) {
          this.taskData.description = "";
          this.editableId = "";
          this.getListTasks();
        }
        if (this.editMode) {
          this.editMode = false;
        }
      })
      .catch((e) => console.log(e));
    }

  },

  created() {
    this.getListTasks();
  }
}
</script>

<style scoped>

</style>