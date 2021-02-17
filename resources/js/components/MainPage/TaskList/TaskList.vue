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
        v-if="!$v.inputData.minLength"
        class="error_msg"
      >
        Task must have at least {{$v.inputData.$params.minLength.min}} letters. Now {{inputData.length}}
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
          v-on:edit-task="editTask"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import TaskListItem from "./TaskListItem";
import { mapMutations, mapActions, mapState } from 'vuex'
import { minLength } from 'vuelidate/lib/validators'

export default {
  name: "TaskList",

  components: {TaskListItem},

  data() {
    return {
      inputData: "",
      editableId: "",
    }
  },

  validations: {
    inputData: {
      minLength: minLength(4)
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
    ...mapActions({
      getListTasks: "getAllTasks",
      add: "addTask",
      update: "updateTask",
    }),

    ...mapMutations([
      "changeEditMode",
    ]),

    addTask() { 
      this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      }

      this.add(this.inputData);
      this.inputData = "";
      this.getListTasks();
    },

    editTask(description, id) {
      this.inputData = description;
      this.editableId = id;
      this.changeEditMode();
    },

    updateTask() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      }

      this.update({inputData: this.inputData, id: this.editableId});
      this.inputData = "";
      this.editableId = "";
    },
  },

  created() {
    this.getListTasks();
  }
}
</script>
