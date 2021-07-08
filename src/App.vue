<template>
  <div id="app-top-container" ref="topRef">
    <HeaderView :text="headerText" />
    <AlertView :alert="alert" />
  </div>
  <div id="map-container" :style="{ height: mapHeight }" class="w3-display-container">
    <!-- <BasemapView /> -->
    <!-- <CoordinatesView /> -->
    <!-- <MyLocationView /> -->
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
    const headerText = "This is the header";
    const alert = ref<Alert>({
      title: "Tsunami!",
      description: "description",
      x: 1,
      y: 1,
    });
    const adText = "This is advertisement";
    const footerText = "This is the footer";
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

/* #map-top-left-container {
  z-index: 1;
} */

/* #map-top-left-container {
  position: absolute;
  margin: 1vh 1vw;
  left: 0;
  right: 0;
  width: 150px;
  float: left;
  z-index: 1;
  background-color: #fff;
}  */
/* 
#layerListWidget {
  margin: 0;
  text-align: center;
  width: 100%;
}

#savedMapWidget {
  margin: 0;
  text-align: center;
  width: 100%;
} */

/* #basemap-widget-container {
  position: absolute;
  margin-left: 91vw;
  margin-top: 71vh;
  left: 0;
  right: 0;
  text-align: center;
  width: 100px;
  float: left;
  z-index: 1;
} */

/* #legendWidget {
  position: absolute;
  margin-left: 91vw;
  margin-top: 3vh;
  left: 0;
  right: 0;
  text-align: center;
  width: 100px;
  float: left;
  z-index: 1;
}

#locationWidget {
  position: absolute;
  left: 0px;
  bottom: 30px;
  margin-bottom: 8px;
  text-align: center;
  width: 100px;
  float: left;
  z-index: 1;
  height: 50px;
  width: 50px;
} */
</style>
