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
        :class="{'invalid': $v.inputData.$error}"
      >
        <input
          type="text"
          name="added_task"
          placeholder="Type your task here"
          v-model.trim="$v.inputData.$model"
          v-on:keyup.enter="add"
        >
        <button
          type="button"
          class="task_btn material-icons"
          v-if="editMode"
          @click="update"
        >
          done
        </button>
        <button
          v-else
          type="button"
          class="task_btn material-icons"
          @click="add"
        >
          add_task
        </button>
      </div> 
      <label
        v-if="!$v.inputData.minLength"
        class="error_msg"
      >
        Task must have at least {{$v.inputData.$params.minLength.min}} letters. Now {{inputData.length}}
      </label>     
    </div>
    <div class="task-list">
      <transition-group
        appear
        tag="ul"
        v-for="(task, indx) in taskList"
        :key="indx"
        enter-active-class="animate__animated animate__bounceIn"
      >
        <app-task-list-item
          :key="indx"
          :task="task"
          v-on:edit-task="edit($event)"
          v-on:complete-task="complete($event)"
          v-on:delete-task="removeTask($event)"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import AppTaskListItem from "./App-Task-List-Item";
import { mapMutations, mapActions, mapState } from 'vuex'
import { minLength } from 'vuelidate/lib/validators'

export default {
  name: "TaskList",

  components: {AppTaskListItem},

  data() {
    return {
      inputData: "",
      editableId: "",
    }
  },

  validations: {
    inputData: {
      minLength: minLength(4),
    }
  },

  computed:{
    ...mapState([
      "taskList",
      "editMode",
    ]),

    startDay() {
      return this.moment().startOf("month").startOf("week");
    },

    endDay() {
      return this.moment().endOf("month").endOf("week");
    }
  },

  methods: {
    ...mapActions([
      "getAllTasks",
      "addTask",
      "editTask",
      "deleteTask",
      "completeTask"
    ]),

    ...mapMutations([
      "changeEditMode",
    ]),

    add() { 
      this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      }

      this.addTask(this.inputData)
        .then(() => this.$emit("task-completed", this.moment().format("YYYY-MM-DD")));
      this.inputData = "";
    },

    edit(description, id) {
      this.inputData = description;
      this.editableId = id;
      this.changeEditMode();
    },

    update() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      }

      this.editTask({inputData: this.inputData, id: this.editableId});
      this.inputData = "";
      this.editableId = "";
    },

    complete(id) {
      this.completeTask(id)
        .then(() => this.$emit("task-completed", this.moment().format("YYYY-MM-DD")));
    },

    removeTask(id) {
      this.deleteTask(id)
        .then(() => this.$emit("remove", this.moment().format("YYYY-MM-DD")));
    },
  },

  created() { 
    this.getAllTasks(); 
  } 
}
</script>