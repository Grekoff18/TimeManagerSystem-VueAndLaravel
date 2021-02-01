<template>
  <div class="bottom-block">
    <div class="bottom-block_main-container">
      <div class="bottom-title">
        <h2>
          History
        </h2>
      </div>
      <div class="history-table">
        <ul class="history-table_title">
          <li>Hello world</li>
        </ul>
        <ul class="history-table_days-names">
          <li v-for="dayName in daysNames">
            {{dayName}}
          </li>
        </ul>
        <ul class="history-table_structure">
          <li v-for="day in dates">
            {{day.getDate()}}
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom-block_bottom-line">

    </div>
  </div>
</template>

<script>
export default {
  name: "BottomComponent",
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      daysNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    }
  },

  computed: {
    days() {
      return new Date(this.year, this.month, 0).getDate();
    },
    dates() {
      return new Array(this.days).fill(1).map((el, index) => new Date(this.year, this.month - 1, index + 1));
    }
  }
}
</script>

<style scoped>

</style>
