<template>
  <header id="app-top-container" ref="topRef">
    <HeaderView :text="headerText" />
    <AlertView :alert="alert" />
  </header>
  <main>
    <div
      id="map-container"
      :style="{ height: mapHeight }"
      class="w3-display-container"
    >
      <EsriMap />
    </div>
  </main>
  <footer id="app-bottom-container" ref="bottomRef">
    <AdView :text="adText" />
    <FooterView :text="footerText" />
  </footer>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import EsriMap from "./components/EsriMap.vue";
import HeaderView from "./components/HeaderView.vue";
import AlertView from "./components/AlertView.vue";
import AdView from "./components/AdView.vue";
import FooterView from "./components/FooterView.vue";
import Alert from "./types/AlertInfo";
export default defineComponent({
  name: "App",
  components: {
    EsriMap,
    HeaderView,
    AlertView,
    AdView,
    FooterView,
  },
  setup() {
    const headerText = "Placeholder for the header";
    const alert = ref<Alert>({
      title: "Tsunami!",
      description: "description",
      x: 1,
      y: 1,
    });
    const adText = "Placeholder for the advertisement";
    const footerText = "Placeholder for the footer";
    const topRef = ref<HTMLDivElement>();
    const bottomRef = ref<HTMLDivElement>();
    const mapHeight = ref("500px");
    onMounted(() => {
      resizeMapContainer();
    });
    // Make map fill the all remaining screen...
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  /** Got these from internal website */
  line-height: 1.6;
  font-family: "Lato", sans-serif;
  font-weight: 400;
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
  overflow: hidden;
}

#map-container > * {
  position: absolute;
}
</style>
