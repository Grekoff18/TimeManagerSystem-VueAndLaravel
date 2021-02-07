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
      <div
        class="add-task_field"
        :class="{'invalid': $v.description.$error}"
      >
        <input
          type="text"
          name="added_task"
          placeholder="Type your task here"
          v-model.trim="$v.description.$model"
        >
        <button
          type="button"
          class="task_btn material-icons"
          v-if="editMode"
          @click="updateTask"
        >
          done
        </button>
        <button
          v-else
          type="button"
          class="task_btn material-icons"
          @click="addTask"
        >
          add_task
        </button>
      </div> 
      <label
        v-if="!$v.description.minLength"
        class="error_msg"
      >
        Task must have at least {{$v.description.$params.minLength.min}} letters. Now {{description.length}}
      </label>      
    </div>
    <div class="task-list">
      <transition-group
        appear
        name="task"
        tag="ul"
        v-for="(task, indx) in taskList"
        :key="indx"
      >
        <task-list-item
          :key="indx"
          :task="task"
          :editMode="editMode"
          v-on:delete-task="deleteTask"
          v-on:edit-task="editTask"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import TaskListItem from "./TaskListItem";
import { minLength } from 'vuelidate/lib/validators';

export default {
  name: "TaskList",

  components: {TaskListItem},

  data() {
    return {
      description: "",
      taskList: [],
      editMode: false,
      editableId: "",
    }
  },

  validations: {
    description: {
      minLength: minLength(4)
    }
  },

  methods: {
    // Add method for task list
    addTask() { 
      this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      }

      axios.post("/api/task/store", {
        "task": {
          "description": this.description
        },
      })
        .then((res) => {
          this.getListTasks();
          this.description = "";
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
      this.description = description;
      this.editableId = id;
      if (!this.editMode) {
        this.editMode = true;
      }
    },

    // Update method for task
    updateTask() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      }

      axios.patch(`api/task/${this.editableId}`, {
        "task": {
          "description": this.description
        },
      })
        .then((response) => {
          if (response.status === 200) {
            this.description = "";
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