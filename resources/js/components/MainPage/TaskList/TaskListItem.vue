<template>
  <li
    class="task-list_item"
    :class="{'completed-task': task.completed}"
    v-on:mouseenter="mouseOnElement"
    v-on:mouseleave="mouseLeaveFromElement"
  >
    <p v-if="!mouseEnter">{{task.description}}</p>
    <div
      v-if="mouseEnter"
      class="task-list_btn-section"
    >
      <button class="material-icons">keyboard_arrow_down</button>
      <!-- Edit button -->
      <button
        class="material-icons"
        v-if="!editMode && !task.completed"
        @click="$emit('edit-task', task.description, task.id)"
      >
        edit
      </button>
      <!-- Complete task button -->
      <button
        class="material-icons"
        v-if="!task.completed"
        @click="$emit('complete-task', task.id)"
      >
        check_circle_outline
      </button>
      <!-- Delete task button -->
      <button
        v-if="!editMode"
        class="material-icons"
        @click="deleteTask(task.id)"
      >
        clear
      </button>
    </div>
  </li>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ["task"],

  data() {
    return {
      mouseEnter: false,
    }
  },

  computed: {
    ...mapState([
      "editMode",
      "isCompleted",
    ]),
  },

  methods: {
    ...mapActions([
      "deleteTask",
    ]),

    mouseOnElement(event) {
      if (!this.mouseEnter) {
        this.mouseEnter = true;
        event.target.style.background = "#27363B"
        event.target.style.boxShadow = "0 0 10px #27363B";
      }
    },

    mouseLeaveFromElement(event) {
      if (this.mouseEnter) {
        this.mouseEnter = false;
        event.target.style.background = null
        event.target.style.boxShadow = null
      }
    },
  },

  mounted() {
  }
}
</script>
