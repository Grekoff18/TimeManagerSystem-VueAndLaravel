<template>
  <div class="chart-container">
    <div class="chart-container_chart" style="position: relative; width: 100%;">
      <doughnut-chart
        v-if="loaded"
        :chart-data="datacollection"
        :options="options"
      />
      <span class="chart-container_chart-tooltip-info">
        {{targetInfo}}
      </span>
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
      infoTask: [],
      datacollection: null,
      infoChart: [],
      options: {
        tooltips: {
          enabled: false,
        },

        onHover: (arr, target) => {
          if (target.length > 0) {
            let numberForTooltip = String(this.infoChart[target[0]._index]);
          
            this.targetInfo = `#${target[0]._index} => ${this.moment(numberForTooltip, "H.mmss").format("HH:mm:ss")}`; 
            // this.targetInfo = `${this.datacollection.labels[target[0]._index]} : ${this.infoChart[target[0]._datasetIndex]}%`;

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
              // t.infoChart[index] = (((+item.format("H.ms") / 24.00) * 100) * 10).toFixed(2);
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
  },

  /**
   * 1. In beforeUpdate hook we can create updating table with task description an him time limit 
   * 
   */
  
  beforeUpdate() {
    this.infoTask = this.getTasksWithLimits;
    // console.log("I'm updated");
  }
  // beforeDestroy cleaning memory cache !!!
}
</script>

<style lang="sass">
  .chart-container
    width: 100%
    display: flex
    flex-direction: column

    &_chart-tooltip-info
      position: absolute
      top: 50%
      text-align: center
      width: 100%  
      color: white

  
    

</style>

