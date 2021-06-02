<template>
  <div id="map_view"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "@/store";

// What is this used for?
//EsriConfig.apiKey = "AAPKe21082c738fb4109b735927e25b79af5ytyQa1mQmL2NrH3i0u_AptcnZJvkusIlaLc7gZOI9zszvKJfAwkWJB5zUzP6-V73";

export default defineComponent({
  setup() {
    const store = useStore();
    onMounted(async () => {
      const esriMap = await import("../esri-stuff/esriMap");
      esriMap.mapView.on("pointer-move", (event) => {
        console.log("pointer move event");
        let pt = esriMap.mapView.toMap({ x: event.x, y: event.y });
        store.commit("setPointerX", pt.longitude);
        store.commit("setPointerY", pt.latitude);
      });
      const mapDiv = document.getElementById("map_view") as HTMLDivElement;
      esriMap.init(mapDiv);
    });
  },
  
});
</script>

<style scoped>
@import "https://js.arcgis.com/4.19/@arcgis/core/assets/esri/themes/light/main.css";
div#map_view {
    padding: 0;
    margin: 0;
    height: 70%;
    width: 100%;
}


</style>
