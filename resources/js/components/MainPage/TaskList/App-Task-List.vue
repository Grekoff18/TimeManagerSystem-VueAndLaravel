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
          v-if="EDIT_MODE"
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
        v-for="(task, indx) in TASK_LIST"
        :key="indx"
        enter-active-class="animate__animated animate__bounceIn"
      >
        <app-task-list-item
          :key="indx"
          :task="task"
          v-on:edit-task="edit($event)"
          v-on:complete-task="complete($event)"
          v-on:delete-task="remove($event)"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
/**
 * 1. ON remove or update or add need to update chart !!!
 */
import AppTaskListItem from "./App-Task-List-Item";
import { mapMutations, mapActions, mapState } from 'vuex'
import { minLength } from 'vuelidate/lib/validators'

export default {
  name: "TaskList",

  components: {AppTaskListItem},

  props: {
    timeLimit: {
      type: [String, Number],
      default: "",
    }
  },

  data() {
    return {
      inputData: "",
      editableId: "",
    }
  },

  // вынести логику 
  validations: {
    inputData: {
      minLength: minLength(4),
    }
  },

  computed:{
    ...mapState([
      "TASK_LIST",
      "EDIT_MODE",
    ]),

    todayDate() {
      return this.moment().format("YYYY-MM-DD");
    },
  },

  watch: {
    timeLimit(newValue, oldValue) {
      if (newValue !== "") {
        this.ADD_TASK({
          inputData: this.inputData,
          timeLimit: newValue === "null" ? null : newValue
        })
          .then(() => {
            this.CHANGE_STATE_TOOLTIP();
            this.inputData = "";
            this.$emit("task-added", this.todayDate);
          });
      } 
    }
  },

  methods: {
    ...mapActions([
      "GET_ALL_TASKS",
      "ADD_TASK",
      "EDIT_TASK",
      "DELETE_TASK",
      "COMPLETE_TASK"
    ]),

    ...mapMutations([
      "CHANGE_EDIT_MODE",
      "CHANGE_STATE_TOOLTIP",
      "FILL_TOOLTIP_TEXT",
    ]),

    add() { 
      // take out validate logic
      this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      }

      this.CHANGE_STATE_TOOLTIP();
      this.FILL_TOOLTIP_TEXT("Do you want to add a time limit on this task ?");
    },

    edit(description, id) {
      this.inputData = description;
      this.editableId = id;
      this.CHANGE_EDIT_MODE();
    },

    update() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return;
      }

      this.EDIT_TASK({inputData: this.inputData, id: this.editableId});
      this.inputData = "";
      this.editableId = "";
    },

    complete(id) {
      this.COMPLETE_TASK(id)
        .then(() => this.$emit("task-completed", this.moment().format("YYYY-MM-DD")));
    },

    remove(id) {
      this.DELETE_TASK(id)
        .then(() => this.$emit("task-removed", this.moment().format("YYYY-MM-DD")));
    },
  },

  // Take away this.moment logic

  created() { 
    this.GET_ALL_TASKS(); 
  } 
}
</script>