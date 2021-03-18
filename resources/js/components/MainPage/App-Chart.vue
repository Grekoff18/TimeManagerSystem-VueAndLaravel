<template>
  <div>
    <doughnut-chart
      v-if="loaded"
      :chart-data="datacollection"
    />   
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
      datacollection: null,
      infoChart: [],
    }
  },

  methods: {
    ...mapActions([
      "GET_ALL_TASKS",
    ]),

    fillChartData() {
      this.datacollection = {
        labels: this.TASK_LIST.map(item => item.description),
        datasets: [
          {
            label: 'Data One',
            backgroundColor: [...Array(this.getTasksWithLimits.length)].map(() => this.generateRandomColor()),
            data: this.infoChart
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
    generateRandomColor() {
      return "#" + Math.floor(Math.random()*16777215).toString(16);
    },
  },

  watch: {
    
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
          // this.getTasksWithLimits.map(element => {
          //   let t = this
          //   setInterval(function testInterval() {
          //     if (element.timeLimit.format("HH:mm:ss") !== "00:00:00") {
          //       t.fillChartData();
          //     } else {
          //       clearInterval(testInterval);
          //     }
          //   }, 1000);
          // })
      });
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

