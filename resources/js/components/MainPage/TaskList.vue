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
         @click="addTask"
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
      >
        <li 
          v-for="(task, indx) in taskList"
          :key="indx"

        >
          <p>{{indx + 1}}. {{task["description"]}} </p>
          <div class="task-list_btn-section">
            <button class="material-icons">keyboard_arrow_down</button>
            <button class="material-icons">edit</button>
            <button
             class="material-icons"
             @click="deleteTask(task.id)"
            >
              clear
            </button>
          </div>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  data() {
    return {
      taskData: {
        description: ""
      },
      taskList: [],
    }
  },
  methods: {
    addTask() { 
      axios.post("/api/task/store", {
        "task": this.taskData,
      })
      .then((res) => {
        this.showListTasks();
        this.taskData.description = "";
      })
      .catch((e) => console.log(e));
    },

    showListTasks() {
      axios.get("api/tasks")
        .then((response) => {
          this.taskList = response.data;
        })
        .catch((e) => console.log(e));
    },

    deleteTask(id) {
      axios.delete(`api/task/${id}`)
        .then(response => {
          if (response.status === 200) {
            this.showListTasks();
          }
        })
        .catch((e) => console.log(e));
    }
  },

  created() {
    this.showListTasks();
  }
}
</script>

<style scoped>

</style>
