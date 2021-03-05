<template>
  <li
    class="task-list_item"
    :class="{'completed-task': task.completed}"
    @click="isOpen = !isOpen"
  >
    <p>{{task.description}}</p>
    <div
      class="task-list_btn-section"
      v-if="isOpen"
    >
      <button class="material-icons">keyboard_arrow_down</button>
      <!-- Edit button -->
      <button
        class="material-icons"
        v-if="!EDIT_MODE && !task.completed"
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
        v-if="!EDIT_MODE"
        class="material-icons"
        @click="$emit('delete-task', task.id)"
      >
        clear
      </button>
    </div>
  </li>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ["task"],

  data() {
    return {
      isOpen: false
    }
  },

  computed: {
    ...mapState([
      "EDIT_MODE",
    ]),
  },
}
</script>
