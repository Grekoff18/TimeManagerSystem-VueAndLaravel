<template>
  <div class="calendar">
      <ul class="calendar_title">
        <li>Hello world</li>
      </ul>
      <ul class="calendar_days-names">
      
      </ul>
      <ul class="calendar_structure">
        <li
          v-for="(dayItem, indx) in daysArray"
          :key="indx"
          class="calendar-items"
          :class="{'weekend-day': dayItem.day() === 6 || dayItem.day() === 0}"
        >
          <p class="day">
            {{dayItem.format("D")}}
          </p>
        </li>
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
      return this.firstDayInMonth.clone().subtract(1, "day");
    },

    daysArray() {
      return [...Array(42)].map(() => this.day.add(1, "day").clone());
    }, 

    weekendDay() {
      
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
    console.log(this.dayItem);
  }
}
</script>