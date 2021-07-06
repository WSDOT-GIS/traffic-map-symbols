<template>
  <HeaderView :text="headerText" />
  <AlertView :alert="alert" />
  
  <div id="map-container" class="w3-row w3-main">
    <BasemapView />
    <CoordinatesView />
    <MyLocationView />
    <!-- <div
      id="map-top-left-container"
      class="
        z1
        w3-collapse
        w3-container
        w3-padding-small
        w3-card
        w3-animate-left
        w3-white
        w3-col
        m3
        l2
      "
    >
      <LayerListView />
      <SavedMapView />
    </div> -->
    <!--LegendVue /-->
    <EsriMap />
  </div>
  <AdView :text="adText" />
  <FooterView :text="footerText" />
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
// import LeftPaneView from "./components/LeftPaneView.vue";
// import LayerListView from "./components/LayerListView.vue";
// import SavedMapView from "./components/SavedMapView.vue";
//import LegendVue from "./components/LegendView.vue";
import MyLocationView from "./components/MyLocationView.vue";
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
    // LeftPaneView,
    // LayerListView,
    // SavedMapView,
    // LegendVue,
    MyLocationView,
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
  width: 100vw;
  height: 100vh;
}

#map-container {
  padding: 0;
  margin: 0;
  height: 70%;
  width: 100%;
  position: relative;
}

#map-container > * {
  position: absolute;
}

#map-top-left-container {
  z-index: 1;
}

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

#basemap-widget-container {
  position: absolute;
  margin-left: 91vw;
  margin-top: 71vh;
  left: 0;
  right: 0;
  text-align: center;
  width: 100px;
  float: left;
  z-index: 1;
}

#legendWidget {
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
}
</style>
