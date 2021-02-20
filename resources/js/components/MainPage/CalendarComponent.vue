<template>
  <div class="calendar">
    <div class="calendar_title">
      <h5>
        {{this.moment().format("MMMM")}}/{{this.moment().format("YYYY")}}
      </h5>
    </div>
    <ul class="calendar_week-names">
      <li
        v-for="(weekName, indx) in weekNamesArray"
        :key="indx"
      >
        {{weekName.format("ddd")}}
      </li>
    </ul>
    <ul class="calendar_structure">
      <li
        v-for="(dayItem, indx) in daysArray"
        :key="indx"
        class="calendar_items"
        :class="{
          'weekend-day': dayItem.day() === 6 || dayItem.day() === 0,
          'today': dayItem.date() === today,
        }"
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
      today: this.moment().date(),
    }
  },

  computed: {
    getFirstDayForCalendar() {
      return this.firstDayInMonth.clone().subtract(1, "day");
    },

    getFirstDayInWeekForCalendar() {
      return this.firstDayInWeek.clone().subtract(1, "day");
    },

    weekNamesArray() {
      return [...Array(7)].map(() => this.getFirstDayInWeekForCalendar.add(1, "day").clone());
    },

    daysArray() {
      return [...Array(42)].map(() => this.getFirstDayForCalendar.add(1, "day").clone());
    }, 

    firstDayInMonth() {
      return this.moment().startOf("month").startOf("week");
    },

    lastDayInMonth() {
      return this.moment().endOf("month").endOf("week");
    },

    firstDayInWeek() {
      return this.moment().startOf("week")
    },
  },

  methods: {
    
  },

  mounted() {
    console.log(typeof this.today);
  }
}
</script>


