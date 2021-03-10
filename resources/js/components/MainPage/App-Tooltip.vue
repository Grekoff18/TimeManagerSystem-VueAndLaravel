<template lang="">
  <div class="app-tooltip">
    <div
      v-if="!chooseLimit"
      class="app-tooltip_question"
    >
      <div class="app-tooltip_question-text">
        {{ tooltip_text }}
      </div>
      <div class="app-tooltip_question-btn_section">
        <button @click="addTimeLimit">Yes</button>
        <button @click="notAddTimeLimit">No</button>
      </div>
    </div>
    <div
      v-if="chooseLimit"
      class="app-tooltip_choose-limit"
    >
      <vue-timepicker
        v-model="timeLimit"
        class="app-tooltip_choose-limit_timepicker"
      />
      <div class="app-tooltip_choose-limit_btn-section">
        <button @click="addTaskWithLimit">yes</button>
        <button @click="addTaskWithoutLimit">no</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
  props: {
    tooltip_text: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      chooseLimit: false,
      timeLimit: ""
    }
  },

  computed: {
    ...mapState([
      "INPUT_DATA",
    ]),
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
      "ADD_TIME_LIMIT",
      "CHANGE_STATE_TOOLTIP",
      "DROP_INPUT_DATA"
    ]),

    addTimeLimit() {
      this.ADD_TIME_LIMIT(true);
      this.chooseLimit = true;
    },

    addTaskWithLimit() {
      this.ADD_TASK({
        inputData: this.INPUT_DATA,
        timeLimit: this.timeLimit
      }).then(() => {
        this.chooseLimit = false;
        this.timeLimit = "";
        this.CHANGE_STATE_TOOLTIP();
        this.$emit("task-added", this.moment().format("YYYY-MM-DD"));
      })
    },

    notAddTimeLimit() {
      this.ADD_TIME_LIMIT(false);
      this.ADD_TASK({
        inputData: this.INPUT_DATA,
        timeLimit: null
      }).then(() => {
        this.CHANGE_STATE_TOOLTIP();
        this.$emit("task-added", this.moment().format("YYYY-MM-DD"));
      })
    },

    addTaskWithoutLimit() {

    }


  }
}
</script>
<style lang="">
  
</style>