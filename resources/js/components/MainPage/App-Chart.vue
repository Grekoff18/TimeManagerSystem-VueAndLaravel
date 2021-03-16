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
      this.chartData.datasets[0].data = this.chartLimits;
    },

    // take away this logic after finish work on chart !!!
    generateRandomColor() {
      return "#" + Math.floor(Math.random()*16777215).toString(16);
    },

    intervalForTask() {
      this.startItems.map(item => {
        item.subtract(1, "s").clone();
        console.log(item);
        if (item.format("HH:mm:ss") === "00:00:00") {
          clearInterval(this.intervalForTask);
          console.log("end");
        }  
      })
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
      return this.TASK_LIST.filter(el => el.time_to_complete !== null)
    },

    chartLimits() {
      return this.getListOfLimits.map(item => +this.moment(item.time_to_complete, "HH:mm:ss").format("HH.mm"));
    },

    startItems() {
      return this.getListOfLimits.map(el => this.moment(el.time_to_complete, "HH:mm:ss").clone());
    }
  },

  async mounted () {
    this.loaded = false
    try {
      await this.GET_ALL_TASKS()
        .then(() => { 
          this.fillChartData();
          console.log(this.chartData);
          console.log(this.getListOfLimits);
          console.log(this.startItems);
          // setInterval(() => {
          //   this.intervalForTask();
          // }, 1000)
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

