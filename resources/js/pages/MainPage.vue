<template>
	<div class="mps-1">
    <div class="top-container">
      <app-tooltip
        v-if="SHOW_TOOLTIP"
        :tooltip_text="TOOLTIP_TEXT"
        v-on:add-task-with-limit="addTaskWithTimeLimit($event)"
      />
      <div class="left-side-container">
        <app-header/>
        <app-task-list 
          v-on:task-removed="parseInfo($event)"
          v-on:task-added="taskAdded($event)"
          :time-limit="time_limit"
        />
      </div>
      <div class="right-side-container">
        <div class="right-side-container_clock-block">
          <app-radial-bar/>
          <app-clock/>
        </div>
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
                Count of tasks
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
                  {{ getCountOfCompletedTasks }}
                </span>
              </div>
              <div class="uncompleted-count-tasks">
                <span>
                  Uncompleted
                </span>
                <span>
                  {{ getCountOfUncompletedTasks }}
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
import AppHeader    from "../../layout/App-Header";
import AppFooter    from "../../layout/App-Footer";
import AppTaskList  from "../components/MainPage/TaskList/App-Task-List";
import AppCalendar  from "../components/MainPage/App-Calendar";
import AppRadialBar from "../components/MainPage/App-Radial-Bar";
import AppClock     from "../components/MainPage/App-Clock";
import AppTooltip   from '../components/MainPage/App-Tooltip';
import { mapState } from 'vuex';

export default {
  name: "MainPage",

  components: {
    AppHeader,
    AppTaskList,
    AppFooter,
    AppCalendar,
    AppRadialBar,
    AppClock,
    AppTooltip
  },

  data() {
    return {
      selectedDate: "",
      currentArr: [],
      time_limit: "",
    }
  },

  computed: {
    ...mapState([
      "TASK_LIST",
      "SHOW_TOOLTIP",
      "TOOLTIP_TEXT",
    ]),

    getCountOfTask() {
      return this.currentArr.length;
    },

    getCountOfCompletedTasks() {
      return this.currentArr.filter(item => item.completed === 1).length
    },

    getCountOfUncompletedTasks() {
      return this.currentArr.filter(item => item.completed === 0).length;
    }
  },

  methods: {
    parseInfo(dayInfo) {
      if (typeof dayInfo === "object") {
        this.selectedDate = dayInfo.fullDate;
        this.currentArr = this.TASK_LIST.filter(item => item.created_at.split("T")[0] === dayInfo.fullDate);
        console.log("obj");
      } else {
        this.selectedDate = dayInfo;
        this.currentArr = this.TASK_LIST.filter(item => item.created_at.split("T")[0] === dayInfo);
        console.log("str");
      }
    },

    addTaskWithTimeLimit(limit) {
      this.time_limit = limit;
    },

    taskAdded(date) {
      this.time_limit = "";
      this.parseInfo(date);
    }
  },
}
</script>