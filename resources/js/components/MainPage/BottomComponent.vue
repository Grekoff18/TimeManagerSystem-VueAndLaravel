<template>
  <div class="bottom-block">
    <div class="bottom-block_title">
      <h2>
        History
      </h2>
    </div>
    <div class="bottom-block_main-container">
      <calendar-component/>
      <div class="bottom-block_info-section">
        <span>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis quia ad deleniti voluptates praesentium tempora itaque quod accusamus, vero repellat hic similique dignissimos, ea quas natus necessitatibus modi enim quos.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarComponent from './CalendarComponent.vue';

export default {
  name: "BottomComponent",
  components: {CalendarComponent},
}
</script>

<style scoped>

</style>
