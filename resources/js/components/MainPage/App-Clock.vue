<template>
  <div class="canvas-clock_container">
    <canvas id="canvas" width="300" height="300" ref="canvasClock"></canvas>
  </div>
</template>
<script>
export default {
  props: ["radius"],

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
    }
  },

  methods: {
    drawClock() {
      this.ctx.strokeStyle = '#00ffff';
      this.ctx.lineWidth = 17;
      this.ctx.shadowBlur= 15;
      this.ctx.shadowColor = '#00ffff'

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
      this.ctx.fillStyle = "#27363B";
      // this.ctx.fillStyle = 'rgba(00 ,00 , 00, 1)';
      this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
      //Hours
      this.ctx.beginPath();
      this.ctx.arc(
        this.canvas.clientWidth / 2,
        this.canvas.clientHeight / 2,
        this.radius - 5,
        this.degToRad(270),
        this.degToRad((hours*30)-90)
      );
      this.ctx.stroke();
      //Minutes
      this.ctx.beginPath();
      this.ctx.arc(this.canvas.clientWidth / 2,
        this.canvas.clientHeight / 2,
        this.radius - 35,
        this.degToRad(270),
        this.degToRad((smoothmin*6)-90)
      );
      this.ctx.stroke();
      //Seconds
      this.ctx.beginPath();
      this.ctx.arc(this.canvas.clientWidth / 2,
        this.canvas.clientHeight / 2,
        this.radius - 65,
        this.degToRad(270),
        this.degToRad((smoothsec*6)-90)
      );
      this.ctx.stroke();
    }
  },

  watch: {
    radius() {
      console.log(this.radius);
    }
  },

  mounted() {
    setTimeout(() => {
      console.log(this.radius);
      this.drawClock();
    }, 1000);
  },
}
</script>
<style lang="sass">
  .canvas-clock_container
    width: 100%
    text-align: center
</style>