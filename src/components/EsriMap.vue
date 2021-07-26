<template>
  <div id="esri-map-view"></div>

  <div
    id="map-bottom-left-container"
    class="w3-display-bottomleft w3-container"
  >
    <CoordinatesView />
  </div>
  <div id="map-bottom-right-container" class="w3-display-bottomright">
    <div class="map-bottom-right-container-row flex-row">
      <div class="map-bottom-right-container-column flex-column">
        <BasemapView />
      </div>
      <div class="map-bottom-right-container-column flex-column">
        <MyLocationView />
        <ZoomButtonView />
      </div>
    </div>
  </div>
  <ZoomPopupView
    :Visible="zoomPopupVisible"
    :PositionX="zoomPopupX"
    :PositionY="zoomPopupY"
    :Label="zoomPopupLabel"
    @clicked="zoomMetroEventHandler"
  ></ZoomPopupView>
  <CameraPopupView :MapX="popupX" :MapY="popupY" :Featureset="popupInfo" />
  <!-- <ParkRidePopupView :MapX="popupX" :MapY="popupY" :Info="popupInfo" />
  <PointRestrictionPopupView />
  <LineRestrictionPopupView />
  <MountainPassesPopupView />
  <WeatherStationsPopupView /> -->
  <LeftPaneView />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue";
import { useStore } from "@/store";
import { project } from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import { Geometry } from "@arcgis/core/geometry";
import Graphic from "@arcgis/core/Graphic";
import Layer from "@arcgis/core/layers/Layer";
import Point from "@arcgis/core/geometry/Point";

import { zoomOnClick } from "@/esri-stuff/esriMap";
import { getExtentFromUrl, getBasemapFromUrl } from "@/utils/urlParamUtil";
import ZoomExtentLayer, {
  getFeatureById as getZoomFeatureById,
} from "@/layers/ZoomExtentLayer";
import ExtentInfo from "@/types/ExtentInfo";
import { setLayerFromUrl } from "@/utils/urlParamUtil";
import { adjustCluster } from "@/utils/clusterUtil";
import LayerInfo from "@/types/LayerInfo";
import FeaturesetInfo from "@/types/FeaturesetInfo";
/* Layers for popup */
import ParkRideLayer from "@/layers/ParkRideLayer";
import CameraLayer from "@/layers/CameraLayer";
import PointRestrictionsLayer from "@/layers/PointRestrictionsLayer";
import LineRestrictionsLayer from "@/layers/LineRestrictionsLayer";
import WeatherStationsLayer from "@/layers/WeatherStationsLayer";
import MountainPassLayer from "@/layers/MountainPassesLayer";
/* Components */
import ZoomPopupView from "@/components/ZoomPopupView.vue";
import CameraPopupView from "@/components/CameraPopupView.vue";
// import ParkRidePopupView from "@/components/ParkAndRidePopupView.vue";
// import PointRestrictionPopupView from "@/components/PointRestrictionPopupView.vue";
// import LineRestrictionPopupView from "@/components/LineRestrictionPopupView.vue";
// import MountainPassesPopupView from "@/components/MountainPassesPopupView.vue";
// import WeatherStationsPopupView from "@/components/WeatherStationPopup.vue";
import LeftPaneView from "@/components/LeftPaneView.vue";
import BasemapView from "@/components/BasemapView.vue";
import CoordinatesView from "@/components/CoordinatesView.vue";
import MyLocationView from "@/components/MyLocationView.vue";
import ZoomButtonView from "@/components/ZoomButtonView.vue";

export default defineComponent({
  components: {
    ZoomPopupView,
    CameraPopupView,
    // ParkRidePopupView,
    // PointRestrictionPopupView,
    // LineRestrictionPopupView,
    // MountainPassesPopupView,
    // WeatherStationsPopupView,
    LeftPaneView,
    BasemapView,
    CoordinatesView,
    MyLocationView,
    ZoomButtonView,
  },
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
    // Feature Popup...
    const popupX = ref(0);
    const popupY = ref(0);
    const popupInfo = ref<FeaturesetInfo>({ layerTitle: "", ids: [] });
    //
    const showPopup = (layerTitle: string, ids: number[], pt: Point) => {
      popupInfo.value = { layerTitle: layerTitle, ids: ids };
      popupX.value = pt.x;
      popupY.value = pt.y;
    };
    const closePopup = () => {
      popupInfo.value = { layerTitle: "", ids: [] };
      popupX.value = 0;
      popupY.value = 0;
    };

    onMounted(async () => {
      const esriMap = await import("../esri-stuff/esriMap");
      mapDiv = document.getElementById("esri-map-view") as HTMLDivElement;
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
      // Pointer move event handler for showing metro zoom popups...
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

      // MapView click event handler for showing popups...
      esriMap.mapView.on("click", (event) => {
        // Check if feature is clicked on...
        const opts = {
          include: [
            ParkRideLayer,
            CameraLayer,
            PointRestrictionsLayer,
            LineRestrictionsLayer,
            WeatherStationsLayer,
            MountainPassLayer,
          ],
        };
        esriMap.mapView.hitTest(event, opts).then((response) => {
          if (response.results.length) {
            const resultsByLayer: {
              info: LayerInfo;
              layer: Layer;
              results: Graphic[];
            }[] = [];
            response.results.forEach((eachResult) => {
              const arrayFound = resultsByLayer.find(
                (eachArray) => eachArray.layer === eachResult.graphic.layer
              );
              if (arrayFound) {
                arrayFound.results.push(eachResult.graphic);
              } else {
                const layerInfo = store.state.layerList.find(
                  (layerInfo) =>
                    layerInfo.title === eachResult.graphic.layer.title
                );
                if (layerInfo) {
                  resultsByLayer.push({
                    info: layerInfo,
                    layer: eachResult.graphic.layer,
                    results: [eachResult.graphic],
                  });
                }
              }
            });
            let minIdx = 999;
            resultsByLayer.forEach((eachResultSet) => {
              if (eachResultSet.info.index < minIdx) {
                minIdx = eachResultSet.info.index;
              }
            });
            const results2Show = resultsByLayer.find(
              (eachResultSet) => eachResultSet.info.index === minIdx
            );
            if (results2Show) {
              const g = results2Show.results[0];
              const pt = g.geometry as Point;
              // Deal with cluster...
              if (g.isAggregate) {
                if (g.attributes.cluster_count < 10) {
                  // Try to get camera infos from the cluster...
                  esriMap
                    .getIdsFromCluster(g, results2Show.layer, 3)
                    .then((results) => {
                      // Show multiple pictures if infos are returned...
                      results
                        ? showPopup(results2Show.layer.title, results, pt)
                        : closePopup();
                      if (!results) {
                        // Zoom-in more...
                        const zoomResult = esriMap.tryZoomToPoint(
                          g.geometry as Point
                        );
                        if (!zoomResult) {
                          // Cannot zoom in any more, so show everything in cluster...
                          esriMap
                            .getIdsFromCluster(g, results2Show.layer)
                            .then((results) => {
                              results
                                ? showPopup(
                                    results2Show.layer.title,
                                    results,
                                    pt
                                  )
                                : closePopup();
                            });
                        }
                      }
                    });
                } else {
                  // Too many in a cluster, so click to zoom-in...
                  closePopup();
                  esriMap.tryZoomToPoint(g.geometry as Point);
                }
              } else {
                const id = g.getObjectId();
                showPopup(results2Show.layer.title, [id], pt);
              }
            }
          } else {
            //No feature exist...
            closePopup();
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
      //
      esriMap.mapView.watch("scale", (newValue, oldValue) => {
        if (oldValue > 0) {
          adjustCluster(newValue, oldValue);
          //toggleCluster(newValue, oldValue, 19000);
        }
      });
    });
    return {
      zoomPopupVisible,
      zoomPopupX,
      zoomPopupY,
      zoomPopupLabel,
      zoomMetroEventHandler,
      popupX,
      popupY,
      popupInfo,
      closePopup,
    };
  },
});
</script>

<style scoped>
@import "https://js.arcgis.com/4.19/@arcgis/core/assets/esri/themes/light/main.css";
#esri-map-view {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
#map-bottom-right-container {
  display: inline-flex;
  margin: 16px;
}

.map-bottom-right-container-row {
  display: flex;
  position: relative;
  width: 100%;
  justify-content: flex-end;
  flex-direction: rtl;
  align-items: flex-end; /* move columns to rightmost end of row */
}

.map-bottom-right-container-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.esri-zoom {
  display: none;
}
</style>
