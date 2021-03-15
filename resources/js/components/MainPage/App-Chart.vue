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
            backgroundColor: [this.generateRandomColor()],
            data: [20, 30, 20, 20, 10],
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  methods: {
    ...mapActions([
      "GET_ALL_TASKS",
    ]),

    fillChartData() {
      this.chartData.labels = this.TASK_LIST.map(item => item.description);
      this.chartData.datasets[0].backgroundColor = [...Array(this.getDataLength)].map(() => this.generateRandomColor());
      this.chartData.datasets[0].data = this.TASK_LIST.map(item => {
        if (item.time_to_complete !== null && item.time_to_complete !== undefined) {
          item.time_to_complete.replace(":", ".");
        }
      })
    },

    // take away this logic after finish work on chart !!!
    generateRandomColor() {
      return "#" + Math.floor(Math.random()*16777215).toString(16);
    }
  },

  computed:{
    ...mapState([
      "TASK_LIST",
    ]),

    getDataLength() {
      return this.chartData.datasets[0].data.length;
    },

    getListOfLimits() {
      return this.TASK_LIST.map(item => {
        if (typeof item.time_to_complete == "string") {
          item.time_to_complete.replace(":", ".");
        }
      })
    }
  },

  async mounted () {
    this.loaded = false
    try {
      this.GET_ALL_TASKS()
        .then(() => { 
          this.fillChartData();
          console.log(this.chartData);
      });
      this.loaded = true
    } catch (e) {
      console.error(e)
    }

    console.log(this.getListOfLimits);
    console.log(this.generateRandomColor());
    console.log(this.getDataLength);
  }
}
</script>

