<template>
  <div id="app-top-container" ref="topRef">
    <HeaderView :text="headerText" />
    <AlertView :alert="alert" />
  </div>
  <div id="map-container" :style="{ height: mapHeight }" class="w3-display-container">
    <EsriMap />
  </div>
  <div id="app-bottom-container" ref="bottomRef">
    <AdView :text="adText" />
    <FooterView :text="footerText" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import EsriMap from "./components/EsriMap.vue";
// import BasemapView from "./components/BasemapView.vue";
// import CoordinatesView from "./components/CoordinatesView.vue";
import HeaderView from "./components/HeaderView.vue";
import AlertView from "./components/AlertView.vue";
import AdView from "./components/AdView.vue";
import FooterView from "./components/FooterView.vue";
import Alert from "./types/AlertInfo";
// import MyLocationView from "./components/MyLocationView.vue";
export default defineComponent({
  name: "App",
  components: {
    EsriMap,
    // BasemapView,
    // CoordinatesView,
    HeaderView,
    AlertView,
    AdView,
    FooterView,
    // MyLocationView,
  },
  setup() {
    const headerText = "Place holder for the header";
    const alert = ref<Alert>({
      title: "Tsunami!",
      description: "description",
      x: 1,
      y: 1,
    });
    const adText = "Place holder for the advertisement";
    const footerText = "Place holder for the footer";
    const topRef = ref<HTMLDivElement>();
    const bottomRef = ref<HTMLDivElement>();
    const mapHeight = ref("500px");
    onMounted(() => {
      resizeMapContainer();
    });
    const resizeMapContainer = () => {
      console.log("resizeMapContainer");
      if (topRef.value && bottomRef.value) {
        const h =
          window.innerHeight -
          topRef.value.offsetHeight -
          bottomRef.value.offsetHeight;
        mapHeight.value = h + "px";
      }
    };
    window.addEventListener("resize", resizeMapContainer);
    return {
      headerText,
      alert,
      adText,
      footerText,
      mapHeight,
      topRef,
      bottomRef,
    };
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
hr.horizontal-divider {
  border-top: 1px solid #bbb;
  margin: 1vh 1vw;
}
/* Remove the border when the map is in focus. */
/* .esri-view .esri-view-surface--inset-outline:focus::after {
  outline: none !important;
} */
/* App elements positioning */

#app {
  position: absolute;
  z-index: 0;
}

#map-container {
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%;
  height: 80%;
}

#map-container > * {
  position: absolute;
}
</style>
