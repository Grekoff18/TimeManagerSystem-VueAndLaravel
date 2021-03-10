<template>
<div>
  <apexchart width="500" height="500" type="donut" :options="chartOptions" :series="series"></apexchart>
</div>
</template>

<script>
export default {
  data() {
    return {
      series: [44, 55, 67, 83, 100, 10, 20, 30, 50, 1000, 123, 402],
      chartOptions: {
        radialBar: {
          dataLabels: {
            enabled: false
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                show: false
              }
            }
          }],
          legend: {
            position: 'right',
            offsetY: 0,
            height: 230,
          }
        }
      },
      labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
    }
  }
}
</script>

