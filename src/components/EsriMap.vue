<template>
  <div id="map_view"></div>
  <ZoomPopupView
    :Visible="zoomPopupVisible"
    :PositionX="zoomPopupX"
    :PositionY="zoomPopupY"
    :Label="zoomPopupLabel"
    @clicked="zoomMetroEventHandler"
  ></ZoomPopupView>
  <CameraPopupView />
  <ParkRidePopupView/>
  <PointRestrictionPopupView/>
  <LineRestrictionPopupView/>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue";
import { useStore } from "@/store";
import { project } from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import { Geometry } from "@arcgis/core/geometry";

import { getExtentFromUrl, getBasemapFromUrl } from "@/utils/urlParamUtil";
import ZoomExtentLayer from "@/layers/ZoomExtentLayer";
import { getFeatureById as getZoomFeatureById } from "@/layers/ZoomExtentLayer";
import ZoomPopupView from "@/components/ZoomPopupView.vue";
import ExtentInfo from "@/types/ExtentInfo";
import { zoomOnClick } from "@/esri-stuff/esriMap";
import { setLayerFromUrl } from "@/utils/urlParamUtil";
import CameraPopupView from "@/components/CameraPopupView.vue";
import ParkRidePopupView from "@/components/ParkAndRidePopupView.vue"
import PointRestrictionPopupView from "@/components/PointRestrictionPopupView.vue"
import LineRestrictionPopupView from "@/components/LineRestrictionPopupView.vue"
export default defineComponent({
  components: { ZoomPopupView, CameraPopupView, ParkRidePopupView, PointRestrictionPopupView, LineRestrictionPopupView },
  setup() {
    const store = useStore();
    // Zoom popup...
    const zoomPopupVisible = ref(false);
    const zoomPopupLabel = ref("");
    const zoomPopupX = ref(0);
    const zoomPopupY = ref(0);
    const zoomExtentInfo = reactive({
      xmin: 0,
      xmax: 0,
      ymin: 0,
      ymax: 0,
    } as ExtentInfo);
    let mapDiv: HTMLDivElement;
    // Setup event handler for metro zoom...
    let zoomEventIsOn = false;
    const zoomMetroEventHandler = () => {
      zoomOnClick(zoomExtentInfo);
      if (zoomEventIsOn) {
        mapDiv.removeEventListener("click", zoomMetroEventHandler);
        zoomEventIsOn = false;
      }
      zoomPopupVisible.value = false;
      mapDiv.style.cursor = "auto";
    };

    onMounted(async () => {
      const esriMap = await import("../esri-stuff/esriMap");
      mapDiv = document.getElementById("map_view") as HTMLDivElement;
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
      // Set layer visibility based on URL query...
      setLayerFromUrl(layerList);
      store.commit("setLayerList", layerList);
      //#endregion
      // Add quick zoom boxes around metro areas...
      esriMap.webmap.add(ZoomExtentLayer);
      // Set basemap based on URL query parameter...
      const basemapInfo = getBasemapFromUrl();
      store.commit("setBasemap", basemapInfo.name);
      // Pointer move event handler...
      esriMap.mapView.on("pointer-move", (event) => {
        // Update current poitner x/y in the store...
        let pt = esriMap.mapView.toMap({ x: event.x, y: event.y });
        store.commit("setPointerX", pt.longitude);
        store.commit("setPointerY", pt.latitude);
        // Check if pointer is over one of the zoom extents...
        const opts = {
          include: [ZoomExtentLayer],
        };
        esriMap.mapView.hitTest(event, opts).then((response) => {
          // check if a feature is returned from the zoom layer...
          if (response.results.length) {
            // Show custom popup...
            zoomPopupX.value = event.x;
            zoomPopupY.value = event.y;
            const zoomGraphic = response.results[0].graphic;
            zoomPopupVisible.value = true;
            // Set zoom popup properties...
            const id = zoomGraphic.attributes["ObjectID"];
            getZoomFeatureById(id).then((response) => {
              const geom = project(
                response.geometry,
                SpatialReference.WebMercator
              ) as Geometry;
              const extent = geom.extent;
              zoomExtentInfo.xmin = extent.xmin;
              zoomExtentInfo.xmax = extent.xmax;
              zoomExtentInfo.ymin = extent.ymin;
              zoomExtentInfo.ymax = extent.ymax;
              zoomPopupLabel.value = response.attributes.Label;
            });
            mapDiv.style.cursor = "zoom-in";
            if (!zoomEventIsOn) {
              mapDiv.addEventListener("click", zoomMetroEventHandler);
              zoomEventIsOn = true;
            }
          } else {
            // Resume normal map operation...
            zoomPopupVisible.value = false;
            mapDiv.style.cursor = "auto";
            if (zoomEventIsOn) {
              mapDiv.removeEventListener("click", zoomMetroEventHandler);
              zoomEventIsOn = false;
            }
          }
        });
      });
      // Watch extent change...
      esriMap.mapView.watch("extent", (newValue, oldValue) => {
        // Keep track of map extent in the state store...
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          store.commit("setCurrentExtent", newValue);
        }
      });
      // Set extent based on the URL query parameter...
      esriMap.mapView.extent = getExtentFromUrl();
    });
    return {
      zoomPopupVisible,
      zoomPopupX,
      zoomPopupY,
      zoomPopupLabel,
      zoomMetroEventHandler,
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
