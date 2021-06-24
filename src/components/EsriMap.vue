<template>
  <div id="map_view"></div>
  <ZoomPopupView
    :Visible="zoomPopupVisible"
    :PositionX="zoomPopupX"
    :PositionY="zoomPopupY"
    :Label="zoomPopupLabel"
    @clicked="zoomMetroEventHandler"
  ></ZoomPopupView>
  <CameraPopupView
    :Visible="cameraPopupVisible"
    :PositionX="cameraPopupX"
    :PositionY="cameraPopupY"
    :CameraInfos="cameraInfos"
    @clicked="cameraPopupEventHandler"
  ></CameraPopupView>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue";
import { useStore } from "@/store";
import { project } from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import { Geometry, Point } from "@arcgis/core/geometry";

import { getExtentFromUrl, getBasemapFromUrl } from "@/utils/urlParamUtil";
import ZoomExtentLayer from "@/layers/ZoomExtentLayer";
import { getFeatureById as getZoomFeatureById } from "@/layers/ZoomExtentLayer";
import ZoomPopupView from "@/components/ZoomPopupView.vue";
import ExtentInfo from "@/types/ExtentInfo";
import { zoomOnClick } from "@/esri-stuff/esriMap";
import { setLayerFromUrl } from "@/utils/urlParamUtil";
import CameraPopupView from "@/components/CameraPopupView.vue";
import CameraLayer from "@/layers/CameraLayer";
import {
  getCameraInfoById,
  getCameraInfosFromCluster,
} from "@/layers/CameraLayer";
import CameraInfo from "@/types/CameraInfo";
import Graphic from "@arcgis/core/Graphic";

export default defineComponent({
  components: { ZoomPopupView, CameraPopupView },
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
    // Cameral popup...
    const cameraPopupVisible = ref(false);
    const cameraInfos = ref<CameraInfo[]>([]);
    const cameraPopupX = ref(0);
    const cameraPopupY = ref(0);
    let cameraGraphic: Graphic;
    const cameraPopupEventHandler = () => {
      cameraPopupVisible.value = false;
    };

    onMounted(async () => {
      const esriMap = await import("../esri-stuff/esriMap");
      mapDiv = document.getElementById("map_view") as HTMLDivElement;
      esriMap.init(mapDiv);
      //#region register layer list to state
      let layerList: { index: number; title: string; visible: boolean }[] = [];
      console.log(esriMap.mapView.map.layers);
      esriMap.mapView.map.layers.map((layer, index) => {
        console.log([layer, index]);
        layerList.push({
          index: index,
          title: layer.title,
          visible: layer.visible,
        });
      });
      // Set layer visibility based on URL query...
      setLayerFromUrl(layerList);
      store.commit("setLayerList", layerList);
      console.log("EsriMap setLayerList");
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
      // Click event handler...
      esriMap.mapView.on("click", (event) => {
        // Check if pointer is over one of the zoom extents...
        const opts = {
          include: [CameraLayer],
        };
        esriMap.mapView.hitTest(event, opts).then((response) => {
          console.log("Click hit test results: " + response.results.length);
          // check if a feature is returned from the zoom layer...
          if (response.results.length) {
            // Show custom popup...
            cameraGraphic = response.results[0].graphic;
            const cameraLoc = esriMap.mapView.toScreen(
              cameraGraphic.geometry as Point
            );
            cameraPopupX.value = cameraLoc.x;
            cameraPopupY.value = cameraLoc.y;
            if (cameraGraphic.isAggregate) {
              console.log(
                "Cluster count: " + cameraGraphic.attributes.cluster_count
              );
              if (cameraGraphic.attributes.cluster_count < 10) {
                // Try to get camera infos from the cluster...
                getCameraInfosFromCluster(cameraGraphic, esriMap.mapView).then(
                  (results) => {
                    // Show multiple pictures if infos are returned...
                    cameraInfos.value = results ? results : [];
                    cameraPopupVisible.value = results ? true : false;
                    if (!results) {
                      // Zoom-in more...
                      esriMap.zoomToPoint(cameraGraphic.geometry as Point);
                    }
                  }
                );
              } else {
                // Too many in a cluster, so click to zoom-in...
                cameraPopupVisible.value = false;
                cameraInfos.value = [];
                esriMap.zoomToPoint(cameraGraphic.geometry as Point);
              }
            } else {
              cameraPopupVisible.value = true;
              const cameraId = cameraGraphic.getObjectId();
              getCameraInfoById(cameraId).then((response) => {
                cameraInfos.value = [];
                if (response) {
                  console.log(response);
                  cameraInfos.value.push(response);
                }
              });
            }
          } else {
            cameraPopupVisible.value = false;
          }
        });
      });
      // Pointer drag event handler...
      let cameraPopupOrgX = 0;
      let cameraPopupOrgY = 0;
      esriMap.mapView.on("drag", (event) => {
        if (event.button === 0) {
          // Update popup position...
          if (cameraPopupVisible.value) {
            if (event.action === "start") {
              cameraPopupOrgX = cameraPopupX.value;
              cameraPopupOrgY = cameraPopupY.value;
            }
            const diffX = event.x - event.origin.x;
            const diffY = event.y - event.origin.y;
            cameraPopupX.value = cameraPopupOrgX + diffX;
            cameraPopupY.value = cameraPopupOrgY + diffY;
            if (event.action === "end") {
              cameraPopupOrgX = 0;
              cameraPopupOrgY = 0;
            }
          }
        }
      });
      // View resize event handler...
      esriMap.mapView.on("resize", () => {
        console.log("resize event");
        if (cameraPopupVisible.value && cameraGraphic) {
          const screenLoc = esriMap.mapView.toScreen(
            cameraGraphic.geometry as Point
          );
          cameraPopupX.value = screenLoc.x;
          cameraPopupY.value = screenLoc.y;
        }
      });
      // Watch scale change...
      esriMap.mapView.watch("scale", (newValue, oldValue) => {
        if (cameraPopupVisible.value) {
          if (cameraPopupVisible.value && cameraGraphic) {
            const screenLoc = esriMap.mapView.toScreen(
              cameraGraphic.geometry as Point
            );
            cameraPopupX.value = screenLoc.x;
            cameraPopupY.value = screenLoc.y;
          }
        }
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
      cameraPopupVisible,
      cameraInfos,
      cameraPopupX,
      cameraPopupY,
      cameraPopupEventHandler,
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
