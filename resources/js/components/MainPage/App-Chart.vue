<template>
  <div>
    <doughnut-chart
      :chartData="chartData"
      :options="options"
    />   
  </div>
</template>

<script>
import DoughnutChart from "../../charts/DoughnutChart.vue";
import { mapMutations, mapActions, mapState } from 'vuex';

export default  {
  components: {DoughnutChart},

  data() {
    return {
      loaded: false,
      chartData: null,
    }
  },

  computed:{
    ...mapState([
      "TASK_LIST",
    ])
  },

  async mounted () {
    this.loaded = false
    try {
      this.chartdata = this.TASK_LIST.map(el => el.time_to_complete)
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

