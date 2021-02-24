<template>
	<div class="mps-1">
    <div class="top-container">
      <div class="left-side-container">
        <header-banner/>
        <task-list/>
      </div>
      <div class="right-side-container">
        <div class="right-side-container_clock-block"></div>
        <footer-menu/>
      </div>
    </div>
    <div class="bottom-block">
      <div class="bottom-block_title">
        <h2>
          History
        </h2>
      </div>
      <div class="bottom-block_main-container">
        <calendar-component/>
        <div class="bottom-block_info-section">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis quia ad deleniti voluptates praesentium tempora itaque quod accusamus, vero repellat hic similique dignissimos, ea quas natus necessitatibus modi enim quos.
          </p>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import HeaderBanner from "../components/HeaderBanner";
import TaskList from "../components/MainPage/TaskList/TaskList";
import FooterMenu from "../components/FooterMenu";
import CalendarComponent from "../components/MainPage/CalendarComponent";

export default {
  name: "App",
  components: {
    HeaderBanner,
    TaskList,
    FooterMenu,
    CalendarComponent
  },
}
</script>