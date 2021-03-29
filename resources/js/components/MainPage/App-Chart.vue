<template>
  <div class="chart-container">
    <div class="chart-container_chart" style="position: relative; width: 70%;">
      <doughnut-chart
        v-if="loaded"
        :chart-data="datacollection"
        :options="options"
        ref="chart"
      />
      <app-digital-clock
        :radius="chartRadius"
        :chartWidth="chartWidth"
        :chartHeight="chartHeight"
      />
    </div>
  </div>
</template>

<script>
import DoughnutChart from "../../charts/Doughnut";
import { mapActions, mapState } from 'vuex';
import AppDigitalClock from "../MainPage/App-Digital-Clock";

export default  {
  components: {DoughnutChart, AppDigitalClock},
  data() {
    return {
      loaded: false,
      chartRadius: 0,
      chartWidth: 0,
      chartHeight: 0,
      targetInfo: {},
      datacollection: null,
      infoChart: [],
      options: {
        tooltips: {
          enabled: false,
        },

        onClick: (arr, target) => {
          if (target.length > 0) {
            let numberForTooltip = String(this.infoChart[target[0]._index]);
            this.targetInfo = {
              taskNumber: target[0]._index,
              taskTimeLimit: this.moment(numberForTooltip, "H.mmss").format("HH:mm:ss")
            };
            this.$emit("hover-on-chart-element", this.targetInfo);
          }
        },

        legend: {
          display: false,
        }
      },
    }
  },
  methods: {
    ...mapActions([
      "GET_ALL_TASKS",
      "UPDATE_ALL"
    ]),

    fillChartData() {
      this.datacollection = {
        labels: this.getTasksWithLimits.map((item, index) => `Task №${index}`),
        datasets: [
          {
            label: 'Data One',
            backgroundColor: [...Array(this.getTasksWithLimits.length)].map(() => this.generateRandomColor(2)),
            data: this.infoChart,
            borderWidth: 2,
            borderColor: "black",
            hoverBorderWidth: 4,
          }
        ]
      }
    },

    intervalForTasksLimits() {
      let t = this;
      this.getTasksWithLimits.forEach((element, index) => {
        (function(item) {
          setInterval(function test() {
            if (item.format("HH:mm:ss") !== "00:00:00") {
              item = item.subtract(1, "s");
              t.infoChart[index] = +item.format("H.mmss")
              t.fillChartData();
            } else {
              clearInterval(test);
            }
          }, 1000)
        })(element.timeLimit);
      })
    },

    // take away this logic after finish work on chart !!!
    generateRandomColor(max) {
      let colorArr = ["#FF4081", "#18FFFF"];
      // return "#" + Math.floor(Math.random()*16777215).toString(16);
      return colorArr[Math.floor(Math.random() * Math.floor(max))];
    },
  },

  computed:{
    ...mapState([
      "TASK_LIST",
    ]),

    getDataLength() {
      return this.infoChart.length;
    },

    getTasksWithLimits() {
      return this.TASK_LIST
        .filter(el => el.time_to_complete !== null && el.time_to_complete != "00:00:00" && el.completed !== 1)
        .map(item => {
          return {
            fullTaskData: item,
            timeLimit: this.moment(item.time_to_complete, "HH:mm:ss")
          }
        })
    },
  },

  async mounted () {
    this.loaded = false
    try {
      await this.GET_ALL_TASKS()
        .then(() => {
          this.intervalForTasksLimits();
          this.fillChartData();
      });
      this.loaded = true;
    } catch (e) {
      console.error(e)
    }
  },

  created() {
    window.addEventListener('beforeunload', () => {
      this.UPDATE_ALL(this.getTasksWithLimits.map(element => {
        return {
          id: element.fullTaskData.id,
          limit: element.timeLimit.format("HH:mm:ss")
        }
      }))
    }, false)
    // if (this.$refs.chart !== undefined) {
    //   this.chartRadius = this.$refs.chart._data._chart.innerRadius;
    // }
    // Take away this logic in future !!!!
    // this.chartRadius = 90;
    // this.chartWidth  = 500;
    // this.chartHeight = 500;
  },

  /**
   * 1. In beforeUpdate hook we can create updating table with task description an him time limit
   *
   */

  beforeUpdate() {
    // Remake this logic in future !!!
    if (this.$refs.chart !== undefined) {
      this.chartWidth  = this.$refs.chart._data._chart.width;
      this.chartHeight = this.$refs.chart._data._chart.height;
      this.chartRadius = this.$refs.chart._data._chart.innerRadius;
    }
  }
  // beforeDestroy cleaning memory cache !!!
}
</script>

<style lang="sass">
  .chart-container
    width: 100%
    display: flex
    flex-direction: column
    align-items: center

  #doughnut-chart
    z-index: 1000
    position: relative

</style>

