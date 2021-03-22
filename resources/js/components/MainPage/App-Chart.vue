<template>
  <div class="chart-sizer" style="position: relative; width: 50%; height: 30%;">
    <doughnut-chart
      v-if="loaded"
      :chart-data="datacollection"
      :options="options"
    />
    <div class="detail-target-info" @click="test">
      {{targetInfo}}
    </div>
  </div>
</template>

<script>
import DoughnutChart from "../../charts/Doughnut";
import { mapActions, mapState } from 'vuex';

export default  {
  components: {DoughnutChart},
  data() {
    return {
      loaded: false,
      targetInfo: "",
      datacollection: null,
      infoChart: [],
      options: {
        tooltips: {
          enabled: false,
        },

        onHover: (arr, target) => {
          if (target.length > 0) {
            this.targetInfo = `${this.datacollection.labels[target[0]._index]} : ${this.infoChart[target[0]._datasetIndex]}`;
          }
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
        labels: this.TASK_LIST.map(item => item.description),
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
      let dataWhatINeed = this;
      this.getTasksWithLimits.forEach((element, index) => {
        (function(item) {
          setInterval(function test() {
            if (item.format("HH:mm:ss") !== "00:00:00") {
              item = item.subtract(1, "s");
              dataWhatINeed.infoChart[index] = (((+item.format("H.ms") / 24.00) * 100) * 10).toFixed(2);
              dataWhatINeed.fillChartData();
            } else {
              clearInterval(test);
            }
          }, 1000)
        })(element.timeLimit, index);
      })
    },
    // take away this logic after finish work on chart !!!
    generateRandomColor(max) {
      let colorArr = ["#FF4081", "#18FFFF"];
      // return "#" + Math.floor(Math.random()*16777215).toString(16);
      return colorArr[Math.floor(Math.random() * Math.floor(max))];
    },
    test() {
      this.UPDATE_ALL(this.getTasksWithLimits.map(element => ({
        id: element.fullTaskData.id,
        limit: element.timeLimit.format("HH:mm:ss")
      })))
    }
  },
  watch: {
    infoChart(newVal, oldVal) {
      console.log(newVal, oldVal);
    }
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
        .filter(el => el.time_to_complete !== null)
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
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  },

  // beforeDestroy() {
  //   this.UPDATE_ALL(this.getTasksWithLimits.map(element => element.timeLimit.format("HH:mm:ss")));
  // },
  // beforeDestroy cleaning memory cache !!!
}
</script>

