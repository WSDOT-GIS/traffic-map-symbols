<template>
  <div id="map_view"></div>
  <ZoomPopupView
    :Visible="zoomPopupVisible"
    :PositionX="zoomPopupX"
    :PositionY="zoomPopupY"
    :Label="zoomPopupLabel"
    :ClickHandler="zoomOnClick"
  ></ZoomPopupView>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue";
import { useStore } from "@/store";
import { project } from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import { Geometry } from "@arcgis/core/geometry";

import { getExtentFromUrl, getBasemapFromUrl } from "@/utils/urlParamUtil";
import ZoomExtentLayer from "@/layers/ZoomExtentLayer";
import { getFeatureById } from "@/layers/ZoomExtentLayer";
import ZoomPopupView from "@/components/ZoomPopupView.vue";
import ExtentInfo from "@/types/ExtentInfo";
import Extent from "@arcgis/core/geometry/Extent";

export default defineComponent({
  components: { ZoomPopupView },
  setup() {
    const store = useStore();
    let zoomPopupVisible = ref(false);
    let zoomPopupX = ref(0);
    let zoomPopupY = ref(0);
    let zoomPopupLabel = ref("");
    let zoomExtentInfo = reactive({
      xmin: 0,
      xmax: 0,
      ymin: 0,
      ymax: 0,
    } as ExtentInfo);
    const zoomOnClick = () => {
      store.commit("setCurrentExtent", zoomExtentInfo);
    };
    onMounted(async () => {
      const esriMap = await import("../esri-stuff/esriMap");
      const mapDiv = document.getElementById("map_view") as HTMLDivElement;
      esriMap.init(mapDiv);
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
      console.log("EsriMap setLayerList");
      //#endregion
      // Add quick zoom boxes around metro areas...
      esriMap.webmap.add(ZoomExtentLayer);
      // Set basemap based on URL query parameter...
      const basemapInfo = getBasemapFromUrl();
      store.commit("setBasemap", basemapInfo.name);
      // Track pointer location...
      esriMap.mapView.on("pointer-move", (event) => {
        // Update current poitner x/y in the store...
        console.log("pointer move event");
        let pt = esriMap.mapView.toMap({ x: event.x, y: event.y });
        store.commit("setPointerX", pt.longitude);
        store.commit("setPointerY", pt.latitude);
        // Check if pointer is over one of the zoom extents...
        const opts = {
          include: [ZoomExtentLayer],
        };
        esriMap.mapView.hitTest(event, opts).then(function (response) {
          // check if a feature is returned from the zoom layer...
          if (response.results.length) {
            zoomPopupVisible.value = true;
            const zoomGraphic = response.results[0].graphic;
            // Set popup properties...
            const id = zoomGraphic.attributes["ObjectID"];
            getFeatureById(id).then((response) => {
              const geom = project(
                response.geometry,
                SpatialReference.WebMercator
              ) as Geometry;
              const extent = geom.extent;
              zoomExtentInfo.xmin = extent.xmin;
              zoomExtentInfo.xmax = extent.xmax;
              zoomExtentInfo.ymin = extent.ymin;
              zoomExtentInfo.ymax = extent.ymax;
              console.log("Extent Info - " + JSON.stringify(zoomExtentInfo));
              zoomPopupLabel.value = response.attributes.Label;
            });
            zoomPopupX.value = event.x;
            zoomPopupY.value = event.y;
            mapDiv.style.cursor = "zoom-in";
            mapDiv.addEventListener("click", zoomOnClick);
          } else {
            // Resume normal map operation...
            zoomPopupVisible.value = false;
            mapDiv.style.cursor = "auto";
            mapDiv.removeEventListener("click", zoomOnClick);
          }
        });
      });

      esriMap.mapView.watch("extent", (newValue, oldValue) => {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          store.commit("setCurrentExtent", newValue);
          const extent = newValue as Extent;
          console.log("View height: " + extent.height);
        }
      });
      // Set extent based on the URL query parameter...
      esriMap.mapView.extent = getExtentFromUrl();

      // Set up zoom event handler for zoom extent box...
      const zoomToPopupFeature = () => {
        var extent = esriMap.mapView.popup.selectedFeature.geometry.extent;
        store.commit("setCurrentExtent", extent);
      };

      esriMap.mapView.popup.on("trigger-action", (event) => {
        if (event.action.id === "zoom-to-popup-feature") {
          zoomToPopupFeature();
        }
      });
    });
    return {
      zoomPopupVisible,
      zoomPopupX,
      zoomPopupY,
      zoomPopupLabel,
      zoomExtentInfo,
      zoomOnClick,
    };
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
