<template>
	<div class="mps-1">
    <div class="top-container">
      <div class="left-side-container">
        <app-header/>
        <app-task-list/>
      </div>
      <div class="right-side-container">
        <div class="right-side-container_clock-block"></div>
        <app-footer/>
      </div>
    </div>
    <div class="bottom-block">
      <div class="bottom-block_title">
        <h2>
          History
        </h2>
      </div>
      <div class="bottom-block_main-container">
        <app-calendar
          v-on:daySelected="parseInfo($event)"
        />
        <div class="bottom-block_info-section">
          <div class="current-day-info">
            <div class="current-day-info_title">
              <h5>
                Detail info for {{ selectedDate }}
              </h5>
            </div>
            <div class="current-day-info_count">
              <span>
                Count
              </span>
              <span>
                {{ getCountOfTask }}
              </span>
            </div>
            <div class="current-day-info_completed">
              <div class="completed-count-tasks">
                <span>
                  Completed
                </span>
                <span>
                  10
                </span>
              </div>
              <div class="uncompleted-count-tasks">
                <span>
                  Uncompleted
                </span>
                <span>
                  4
                </span>
              </div>
            </div>
            <div class="current-day-info_tasks">
              <span>Tasks</span>
              <span>Lyap</span>
              
            </div>
          </div>
          <div class="about-calendar-info">

          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import AppHeader    from "../components/App-Header";
import AppTaskList  from "../components/MainPage/TaskList/App-Task-List";
import AppFooter    from "../components/App-Footer";
import AppCalendar  from "../components/MainPage/App-Calendar";
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
  name: "MainPage",

  components: {
    AppHeader,
    AppTaskList,
    AppFooter,
    AppCalendar
  },

  data() {
    return {
      selectedDate: "",
      countOfTasks: 10,
      currentArr: [],
    }
  },

  computed: {
    ...mapState([
      "taskList"
    ]),

    getCountOfTask() {
      return this.currentArr.length;
    }
  },

  methods: {
    sortedTaskList(date) {
      return this.taskList.filter(item => item.created_at.split("T")[0] === date);
    },

    parseInfo(dayInfo) {
      this.selectedDate = dayInfo.fullDate;
      this.currentArr = this.sortedTaskList(this.selectedDate);
    }
  },

  mounted() {

  }
}
</script>