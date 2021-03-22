<template>
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
// create time validation !!!
// remake this with slots !!!

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

  methods: {
    addTimeLimit() {
      this.chooseLimit = true;
    },

    addTaskWithLimit() {
      this.chooseLimit = false;
      this.$emit("add-task-with-limit", this.timeLimit);
    },

    notAddTimeLimit() {
      this.$emit("add-task-with-limit", null);
    },

    addTaskWithoutLimit() {
      this.chooseLimit = false;
    }


  }
}
</script>
<style lang="">

</style>
