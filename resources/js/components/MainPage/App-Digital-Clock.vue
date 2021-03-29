<template>
  <div class="canvas-clock_container">
    <canvas id="canvas" ref="canvasClock"></canvas>
  </div>
</template>
<script>
export default {
  props: ["radius", "chartWidth", "chartHeight"],

  data() {
    return {

    }
  },

  computed: {
    canvas() {
      return this.$refs.canvasClock;
    },

    ctx() {
      if (canvas.getContext) {
        return canvas.getContext("2d");
      }
    },
  },

  watch: {
    chartWidth() {
      this.ctx.canvas.width = this.chartWidth;
      this.ctx.canvas.height = this.chartHeight;
      this.drawClock();
    },
  },

  methods: {
    drawClock() {
      /**
       * 1. Made dynamic color rendering width random color funciton
       */
      this.ctx.strokeStyle = '#00ffff';
      this.ctx.lineWidth = 15;
      this.ctx.shadowBlur= 15;
      this.ctx.shadowColor = '#00ffff';
      this.ctx.fillStyle = "#27363B";

      setInterval(this.renderTime, 40);
    },

    degToRad(degree) {
      const factor = Math.PI/180;
      return degree*factor;
    },

    renderTime() {
      let hours       = this.moment().hour();
      let minute      = this.moment().minute();
      let second      = this.moment().second();
      let millisecond = this.moment().millisecond();
      let smoothsec   = second+(millisecond/1000);
      let smoothmin   = minute+(smoothsec/60);

      //Background
      // gradient = ctx.createRadialGradient(250, 250, 5, 250, 250, 300);
      // gradient.addColorStop(0, "#03303a");
      // gradient.addColorStop(1, "black");
      // this.ctx.fillStyle = 'rgba(00 ,00 , 00, 1)';
      this.ctx.fillRect(0, 0, this.chartWidth, this.chartHeight);
      //Hours
      this.ctx.beginPath();
      this.ctx.arc(
        this.canvas.width / 2,
        this.canvas.height / 2,
        (this.radius - 20) > 0 ? this.radius - 20 : false,
        this.degToRad(270),
        this.degToRad((hours*30)-90)
      );
      this.ctx.stroke();
      //Minutes
      this.ctx.beginPath();
      this.ctx.arc(
        this.canvas.width / 2,
        this.canvas.height / 2,
        (this.radius - 50) > 0 ? this.radius - 50 : false,
        this.degToRad(270),
        this.degToRad((smoothmin*6)-90)
      );
      this.ctx.stroke();
      //Seconds
      this.ctx.beginPath();
      this.ctx.arc(
        this.canvas.width / 2,
        this.canvas.height / 2,
        (this.radius - 80) > 0 ? this.radius - 80 : false,
        this.degToRad(270),
        this.degToRad((smoothsec*6)-90)
      );
      this.ctx.stroke();
    }
  },

  mounted() {
    setTimeout(() => {
      this.drawClock();
    }, 1000);
  },
}
</script>
<style lang="sass">
  .canvas-clock_container
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    display: flex
    align-items: center
    justify-content: center

</style>
