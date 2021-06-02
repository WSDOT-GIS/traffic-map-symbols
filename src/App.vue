<template>
  <!-- <div class="app"> -->
  <HeaderView :text="headerText" />
  <AlertView :alert="alert" />
  <div id="map_container">
    <BasemapView />
    <CoordinatesView />
    <EsriMap />
  </div>
  <AdView :text="adText" />
  <FooterView :text="footerText" />
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import EsriMap from "./components/EsriMap.vue";
import BasemapView from "./components/BasemapView.vue";
import CoordinatesView from "./components/CoordinatesView.vue";
import HeaderView from "./components/HeaderView.vue";
import AlertView from "./components/AlertView.vue";
import AdView from "./components/AdView.vue";
import FooterView from "./components/FooterView.vue";
import Alert from "./types/AlertInfo";

export default defineComponent({
  name: "App",
  components: {
    EsriMap,
    BasemapView,
    CoordinatesView,
    HeaderView,
    AlertView,
    AdView,
    FooterView,
  },
  setup() {
    const headerText = "This is the header";
    const alert = ref<Alert>({
      title: "Tsunami!",
      description: "description",
      x: 1,
      y: 1,
    });
    const adText = "This is advertisement";
    const footerText = "This is the footer";
    return { headerText, alert, adText, footerText };
  },
});
</script>

<style>
html,
body,
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
#map_container {
  padding: 0;
  margin: 0;
  height: 70%;
  width: 100%;
  position: relative;
}
#map_container > * {
  position: absolute;
}
.left {
  left: 0;
  margin-left: 16px;
}
.right {
  right: 0;
  margin-right: 16px;
}
.top {
  top: 0;
  margin-top: 16px;
}
.bottom {
  bottom: 0;
  margin-bottom: 16px;
}
.ontop {
  z-index: 9;
}
</style>
