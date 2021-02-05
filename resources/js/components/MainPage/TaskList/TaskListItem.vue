<template>
  <li 
    class="task-list_item"
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
        @click="$emit('edit-task', task.description, task.id)"
      >
        edit
      </button>
      <!-- Complete task button -->
      <button
        class="material-icons"
      >
        check_circle_outline
      </button>
      <!-- Delete task button -->
      <button
       class="material-icons"
       @click="$emit('delete-task', task.id)"
      >
        clear
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
    }
  },

  data() {
    return {
      editableText: false,
      mouseEnter: false,
      mouseLeave: true,
    }
  },

  computed: {
    
  },

  methods: {
    edit() {
      if (!this.editableText) {
        this.editableText = true;
      }
    },

    mouseOnElement(event) {
      if (!this.mouseEnter) {
        this.mouseEnter = true;
        event.target.style.background = "#27363B"
        event.target.style.boxShadow = "0 0 10px #27363B"
      }
    }, 

    mouseLeaveFromElement() {
      if (this.mouseEnter) {
        this.mouseEnter = false;
        event.target.style.background = null
        event.target.style.boxShadow = null
      }
    }
  }
}
</script>