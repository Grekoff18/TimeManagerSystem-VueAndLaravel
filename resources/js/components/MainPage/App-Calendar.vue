<template>
  <div class="calendar">
    <div class="calendar_title">
      <h5>
        {{this.getDateByFormat("MMMM")}}/{{this.getDateByFormat("YYYY")}}
      </h5>
    </div>
    <ul class="calendar_week-names">
      <li
        v-for="name in weekNamesArray"
        :key="name.fullDate"
      >
        {{name.dayShorName}}
      </li>
    </ul>
    <ul class="calendar_structure">
      <li
        v-for="day in daysArray"
        :key="day.fullDate"
        @click="$emit('daySelected', day)"
        class="calendar_items"
        :class="{
          'weekend-day':  day.weekDay === 6 || day.weekDay === 0,
          'today':        day.fullDate === getDateByFormat('YYYY-MM-DD'),
        }"
      >
        <p class="day">{{day.monthDay}}</p>
        <template v-for="(workingDay, index) in daysWithTasks">
          <span
            v-if="day.fullDate === workingDay"
            :key="index"
            class="more-info-label"
          >
            Has Task
          </span>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "AppCalendar",
  data() {
    return {
      daysArray: [],
      weekNamesArray: [],
    }
  },

  computed: {
    ...mapState([
      "TASK_LIST"
    ]),

    firstDayInWeek() {
      return this.moment().startOf("week").clone().subtract(1, "day");
    },

    firstDayInMonth() {
      return this.moment().startOf("month").startOf("week").clone().subtract(1, "day");
    },

    daysWithTasks() {
      return _.uniq(this.TASK_LIST.map(element => element.created_at.split("T")[0]))
    },
  },

  methods: {
    ...mapActions([
      "GET_ALL_TASKS"
    ]),

    fillDataArray(arr, count, from) {
      arr = [...Array(count)].map(() => from.add(1, "day").clone()).map(el => {
        return {
          fullDate:    el.format("YYYY-MM-DD"),
          monthDay:    el.format("DD"),
          weekDay:     el.day(),
          dayShorName: el.format("ddd")
        }
      })
      return arr;
    },

    getDateByFormat(format) {
      return this.moment().format(format);
    }
  },

  mounted() {
    this.daysArray = this.fillDataArray([], 42, this.firstDayInMonth); 
    this.weekNamesArray = this.fillDataArray([], 7, this.firstDayInWeek);
  }
}
</script>


