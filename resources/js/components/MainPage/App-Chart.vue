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
      this.chartData.datasets[0].data = this.getTasksWithLimits.map(item => +item.timeLimit.format("HH.mm"));
    },

    intervalForTasksLimits() {
      this.getTasksWithLimits.forEach(element => {
        (function(item) {
          setInterval(function test() {
            if (item.timeLimit.format("HH:mm:ss") !== "00:00:00") {
              item.timeLimit = item.timeLimit.clone().subtract(1, "s");
              console.log(item.timeLimit.format("HH:mm:ss"));
            } else {
              clearInterval(test);
            }
          }, 1000)
        })(element);
      })
    },

    // take away this logic after finish work on chart !!!
    generateRandomColor() {
      return "#" + Math.floor(Math.random()*16777215).toString(16);
    },
  },

  watch: {
    limitsWatcher: value => {
      console.log(value);
    }
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

    limitsWatcher() {
      return this.getTasksWithLimits.map(item => item.timeLimit);
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

