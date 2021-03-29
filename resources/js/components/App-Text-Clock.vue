<template>
  <div class="text-clock">
    <div class="text-clock_container">
      <div
        class="text-clock_data-section"
        :style="styleObject"
      >
        {{showData}}
      </div>
      <div
        class="text-clock_time-section"
        :style="styleObject"
        :class="{'change-time-font': this.showTooltipInfo === true}"
      >
        {{timeData}}
      </div>
      <div class="show-time-btn">
        <button
          v-if="showCloseBtn"
          @click="showTime"
        >
          Back to clock
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tooltipTaskNumber: {
      type: String,
    },

    tooltipTaskLimit: {
      type: String,
    }
  },
  data() {
    return {
      time: "",
      data: "",
      showTooltipInfo: false,
      showCloseBtn: false,
      timeInterval: null,
    }
  },

  methods: {
    showTime() {
      this.$emit("clear-tooltip-info");
    }
  },

  computed: {
    timeData() {
      return this.showTooltipInfo === false ? this.time : `Time to complete: ${this.tooltipTaskLimit}`;
    },

    showData() {
      return this.showTooltipInfo === false ? this.data : this.tooltipTaskNumber;
    },

    styleObject() {
      return {
        textAlign: this.showTooltipInfo === false ? "center" : "left",
        padding: this.showTooltipInfo === true ? "10px 0" : "0"
      }
    }
  },

  watch: {
    tooltipTaskNumber() {
      if (this.tooltipTaskNumber !== "") {
        this.showTooltipInfo = true;
        this.showCloseBtn = true;
      } else {
        this.showTooltipInfo = false;
        this.showCloseBtn = false;
      }
    },
  },

  created() {
    this.data = this.moment().format("YYYY-MM-DD ddd");
    this.timeInterval = setInterval(() => {
      this.time = this.moment().format("HH:mm:ss");
    }, 1000);
  },

  beforeDestroy() {
    clearInterval(this.timeInterval);
    this.data = null;
    this.time = null;
    this.showTime();
  },
}
</script>

<style lang="sass">
  .text-clock
    width: 100%
    padding: 10px

    &_data-section
      font-size: 15px
      color: #daf6ff
      text-shadow: 0 0 10px #00ffff

    &_time-section
      font-size: 35px
      color: #daf6ff
      text-shadow: 0 0 10px #00ffff

  .show-time-btn
    > button 
        width: 100%
        color: #27363B
        background-color: #daf6ff
        box-shadow: 0 0 10px #00ffff
        padding: 5px 0

  .change-time-font
    font-size: 15px
</style>