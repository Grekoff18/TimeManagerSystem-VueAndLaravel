<template>
  <div>
    <doughnut-chart
      v-if="loaded"
      :chartdata="chartData"
      :options="options"
    />   
  </div>
</template>

<script>
import DoughnutChart from "../../charts/Doughnut";
import { mapMutations, mapActions, mapState } from 'vuex';

export default  {
  components: {DoughnutChart},

  data() {
    return {
      loaded: false,
      testArr: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "data",
            backgroundColor: [],
            data: [],
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
    }
  },

  methods: {
    ...mapActions([
      "GET_ALL_TASKS",
    ]),

    fillChartData() {
      this.chartData.labels = this.TASK_LIST.map(item => item.description);
      this.chartData.datasets[0].backgroundColor = [...Array(this.getTasksWithLimits.length)].map(() => this.generateRandomColor());
      // this.chartData.datasets[0].data = this.getTasksWithLimits.map(item => +item.timeLimit.format("HH.mm"));
    },

    intervalForTasksLimits() {
      let dataWhatINeed = this;
      this.getTasksWithLimits.forEach((element, index) => {
        (function(item) {
          setInterval(function test() {
            if (item.format("HH:mm:ss") !== "00:00:00") {
              item = item.subtract(1, "s");
              dataWhatINeed.chartData.datasets[0].data[index] = +item.format("H.ms"); 
              console.log(dataWhatINeed.chartData.datasets[0].data);
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

  computed:{
    ...mapState([
      "TASK_LIST",
    ]),

    getDataLength() {
      return this.chartData.datasets[0].data.length;
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

    getInfoAboutLimits() {
      return this.getTasksWithLimits.map(el => el.timeLimit);
    }
  },

  async mounted () {
    this.loaded = false
    try {
      await this.GET_ALL_TASKS()
        .then(() => { 
          this.fillChartData();
          console.log(this.getTasksWithLimits);
          this.intervalForTasksLimits();
          // this.getTasksWithLimits.map((element, indx) => {
          //   let t = this
          //   setInterval(function testInterval() {
          //     if (element.timeLimit.format("HH:mm:ss") !== "00:00:00") {
          //       // 
          //       t.chartData.datasets[0].data[indx] = +element.timeLimit.format("H.ms"); 
          //       console.log(t.chartData.datasets[0].data);
          //     } else {
          //       clearInterval(testInterval);
          //     }
          //   }, 1000)
          // })
      });
      this.loaded = true
    } catch (e) {
      console.error(e)
    }

    console.log(this.generateRandomColor());
    console.log(this.getDataLength);
  }
}
</script>

