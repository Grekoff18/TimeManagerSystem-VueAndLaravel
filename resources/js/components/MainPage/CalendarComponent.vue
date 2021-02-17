<template>
  <div class="history-table">
      <ul class="history-table_title">
        <li>Hello world</li>
      </ul>
      <ul class="history-table_days-names">
        <li>
          
        </li>
      </ul>
      <ul class="history-table_structure">
        <li></li>
      </ul>
    </div>
</template>
<script>
export default {
  name: "CalendarComponent",
  data() {
    return {
      calendar: [],
    }
  },

  computed: {
    day() {
      return this.firstDayInMonth.clone();
    },

    firstDayInMonth() {
      return this.moment().startOf("month").startOf("week");
    },

    lastDayInMonth() {
      return this.moment().endOf("month").endOf("week");
    },
  },

  methods: {
    fillTheCalendar(chunkSize = 7) {
      do {
        this.calendar.push(this.day.clone());
        this.day.add(1, "day");
      } while (!this.day.isAfter(this.lastDayInMonth));

      _.chunk(this.calendar, chunkSize);
    },
  },

  mounted() {
    this.fillTheCalendar(7);
  }
}
</script>