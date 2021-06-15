<template>
  <div id="map_view"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "@/store";
import { getExtentFromUrl, getBasemapFromUrl } from "@/utils/urlParamUtil";

export default defineComponent({
  setup() {
    const store = useStore();
    onMounted(async () => {
      const esriMap = await import("../esri-stuff/esriMap");

      //#region register layer list to state
      let layerList: { index: number; title: string; visible: boolean }[] = [];
      esriMap.mapView.map.layers.map((layer, index) => {
        layerList.push({
          index: index,
          title: layer.title,
          visible: layer.visible,
        });
      });
      store.commit("setLayerList", layerList);
      console.log(store.state.layerList);
      //#endregion

      const basemapInfo = getBasemapFromUrl();
      store.commit("setBasemap", basemapInfo.name);

      esriMap.mapView.extent = getExtentFromUrl();

      esriMap.mapView.on("pointer-move", (event) => {
        console.log("pointer move event");
        let pt = esriMap.mapView.toMap({ x: event.x, y: event.y });
        store.commit("setPointerX", pt.longitude);
        store.commit("setPointerY", pt.latitude);
      });

      esriMap.mapView.watch("extent", (newValue, oldValue) => {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          store.commit("setCurrentExtent", newValue);
        }
      });
      const mapDiv = document.getElementById("map_view") as HTMLDivElement;
      esriMap.init(mapDiv);
    });
  },
});
</script>

<style scoped>
@import "https://js.arcgis.com/4.19/@arcgis/core/assets/esri/themes/light/main.css";
#map_view {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>
