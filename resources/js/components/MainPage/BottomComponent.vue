<template>
  <div class="bottom-block">
    <div class="bottom-block_main-container">
      <div class="bottom-title">
        <h2>
          History
        </h2>
      </div>
      <calendar-component/>
    </div>
    <div class="bottom-block_bottom-line"></div>
  </div>
</template>

<script>
import CalendarComponent from "./CalendarComponent";

export default {
  name: "BottomComponent",
  components: {CalendarComponent},
}
</script>

<style scoped>

</style>
