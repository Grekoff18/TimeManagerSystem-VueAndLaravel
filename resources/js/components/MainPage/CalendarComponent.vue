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
        class="calendar_items"
        :class="{
          'weekend-day':  day.weekDay === 6 || day.weekDay === 0,
          'today':        day.fullDate === getDateByFormat('YYYY-MM-DD'),
        }"
      >
        <p class="day">
          {{day.monthDay}}
          <!-- !!! -->
          <template v-for="(workingDay, index) in daysWithTasks">
            <p v-if="day.fullDate === workingDay" :key="index">
              Hello world
            </p>
          </template>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
  name: "CalendarComponent",
  data() {
    return {
      daysArray: [],
      weekNamesArray: [],
    }
  },

  computed: {
    ...mapState([
      "taskList"
    ]),

    firstDayInWeek() {
      return this.moment().startOf("week").clone().subtract(1, "day");
    },

    firstDayInMonth() {
      return this.moment().startOf("month").startOf("week").clone().subtract(1, "day");
    },

    daysWithTasks() {
      return _.uniq(this.taskList.map(el => el.created_at.split("T")[0]));
    }
  },

  effects: {
    actions: {
      getAllTasks: {
        after(action, state) {
          return this.taskList;
        }
      }
    }
  },

  methods: {
    ...mapActions([
      "getAllTasks"
    ]),

    ...mapMutations([
      "changeEditMode",
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
    // this.getAllTasks().then(res => this.);
    this.daysArray = this.fillDataArray([], 42, this.firstDayInMonth); 
    this.weekNamesArray = this.fillDataArray([], 7, this.firstDayInWeek);
  }
}
</script>


