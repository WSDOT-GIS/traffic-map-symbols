<template>
  <div id="esri-map-view"></div>
    <AlertView :Alerts="alerts" />
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
  <CameraPopup :MapXY="popupXY" :Featureset="popupFeatureset" />
  <ParkRidePopup :Featureset="popupFeatureset" />
  <LineRestrictionPopup :Featureset="popupFeatureset" />
  <PointRestrictionPopup :Featureset="popupFeatureset" />
  <MountainPassPopup :Featureset="popupFeatureset" />
  <WeatherStationsPopup :Featureset="popupFeatureset" />
  <RestAreaPopup :Featureset="popupFeatureset" />
  <RoadAlertPopup :Featureset="popupFeatureset" />
  <TravelTimesPopup :Featureset="popupFeatureset" />
  <WildfirePointsPopup :Featureset="popupFeatureset" />
  <LeftPaneView />
  <!-- <AdView /> -->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "@/store";
import { project } from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import { Geometry } from "@arcgis/core/geometry";
import Graphic from "@arcgis/core/Graphic";
import Layer from "@arcgis/core/layers/Layer";
import Point from "@arcgis/core/geometry/Point";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Extent from "@arcgis/core/geometry/Extent";

import { getConfig } from "@/utils/appConfigUtil";
import { mapView, zoomToMetroArea } from "@/esri-stuff/esriMap";
import {
  getExtentFromUrl,
  getBasemapFromUrl,
  setVisibleLayersFromUrl,
  getFeatureIdFromUrl,
  getFeatureTypeFromUrl,
} from "@/utils/urlParamUtil";
import { getFeature, setLayerVisibility } from "@/utils/layerUtil";
import ZoomExtentLayer, {
  getFeatureById as getZoomFeatureById,
} from "@/layers/ZoomExtentLayer";
import { clusterMaxScale, getIdsFromCluster } from "@/utils/clusterUtil";
import LayerInfo from "@/types/LayerInfo";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import XY from "@/types/XY";
import { getAlerts } from "@/utils/alertInfoUtil";
import AlertInfo from "@/types/AlertInfo";
import { getFeatureInfoById, getLineFromPointRestriction } from "@/utils/featureInfoUtil";
/* Layers for popup */
import ParkRideLayer from "@/layers/ParkRideLayer";
import CameraLayer, { toggleCluster } from "@/layers/CameraLayer";
import PointRestrictionsLayer from "@/layers/PointRestrictionsLayer";
import LineRestrictionsLayer from "@/layers/LineRestrictionsLayer";
import WeatherStationsLayer from "@/layers/WeatherStationsLayer";
import MountainPassesLayer from "@/layers/MountainPassesLayer";
import RoadAlertsLayer from "@/layers/RoadAlertsLayer";
import TravelTimeLayer from "@/layers/TravelTimeLayer";
import RestAreasLayer from "@/layers/RestAreasLayer";
import FireIncidentLayer from "@/layers/FireIncidentLayer";
import MileMarkersLayer from "@/layers/MileMarkersLayer";
import RoadsReferenceLayer from "@/layers/RoadsReferenceLayer";
import BoundariesPlacesReferenceLayer from "@/layers/BoundariesPlacesReferenceLayer";
// import FirePerimeterLayer from "@/layers/FirePerimeterLayer"
/* Popups */
import ZoomPopupView from "@/components/ZoomPopupView.vue";
import CameraPopup from "@/popups/CameraPopup.vue";
import ParkRidePopup from "@/popups/ParkAndRidePopup.vue";
import PointRestrictionPopup from "@/popups/PointRestrictionPopup.vue";
import LineRestrictionPopup from "@/popups/LineRestrictionPopup.vue";
import MountainPassPopup from "@/popups/MountainPassPopup.vue";
import WeatherStationsPopup from "@/popups/WeatherStationPopup.vue";
import RestAreaPopup from "@/popups/RestAreaPopup.vue";
import RoadAlertPopup from "@/popups/RoadAlertPopup.vue";
import TravelTimesPopup from "@/popups/TravelTimesPopup.vue";
import WildfirePointsPopup from "@/popups/WildfirePointsPopup.vue";
/* Components */
import LeftPaneView from "@/components/LeftPaneView.vue";
import BasemapView from "@/components/BasemapView.vue";
import CoordinatesView from "@/components/CoordinatesView.vue";
import MyLocationView from "@/components/MyLocationView.vue";
import ZoomButtonView from "@/components/ZoomButtonView.vue";
import AlertView from "@/components/AlertView.vue";
// import AdView from "@/components/AdView.vue";

export default defineComponent({
  components: {
    ZoomPopupView,
    CameraPopup,
    ParkRidePopup,
    PointRestrictionPopup,
    LineRestrictionPopup,
    MountainPassPopup,
    WeatherStationsPopup,
    RestAreaPopup,
    RoadAlertPopup,
    TravelTimesPopup,
    WildfirePointsPopup,
    LeftPaneView,
    BasemapView,
    CoordinatesView,
    MyLocationView,
    ZoomButtonView,
    AlertView,
    // AdView,
  },
  setup() {
    const selectedCursor = ref("");
    const store = useStore();
    // Statewide alerts...
    const alerts = ref<AlertInfo[]>([]);
    getConfig().then((config) => {
      getAlerts(config.stateAlerts).then((result) => {
        alerts.value = result;
        
      })
    })
    // Zoom popup...
    const zoomPopupVisible = ref(false);
    const zoomPopupLabel = ref("");
    const zoomPopupX = ref(0);
    const zoomPopupY = ref(0);
    let zoomExtent: Extent | undefined;
    let mapDiv: HTMLDivElement;
    // Setup event handler for metro zoom...
    let zoomEventIsOn = false;
    const zoomMetroEventHandler = () => {
      if (zoomExtent) {
        zoomToMetroArea(zoomExtent);
        zoomExtent = undefined;
      }
      if (zoomEventIsOn) {
        mapDiv.removeEventListener("click", zoomMetroEventHandler);
        zoomEventIsOn = false;
      }
      zoomPopupVisible.value = false;
      mapDiv.style.cursor = "auto";
    };
    // Feature Popup...
    const popupXY = ref<XY | undefined>();
    const popupFeatureset = ref<FeaturesetInfo>({ layerId: "", ids: [] });
    // Set popup props...
    const showPopup = (layerId: string, ids: number[], pt?: Point) => {
      popupFeatureset.value = { layerId: layerId, ids: ids };
      if (pt) {
        popupXY.value = { x: pt.x, y: pt.y };
      } else {
        popupXY.value = undefined;
      }
    };
    const closePopup = () => {
      popupFeatureset.value = { layerId: "", ids: [] };
      popupXY.value = undefined;
    };
    // Setup events on the operational layers...
    let pointerMoveHandle: { remove: () => void } | undefined;
    let clickHandle: { remove: () => void } | undefined;
    const initOperationalLayerEvents = (
      mapDiv: HTMLDivElement,
      esriMap: typeof import("../esri-stuff/esriMap")
    ) => {
      const opLayerOpts = {
        include: [
          ParkRideLayer(),
          CameraLayer(),
          PointRestrictionsLayer(),
          LineRestrictionsLayer(),
          WeatherStationsLayer(),
          MountainPassesLayer(),
          RestAreasLayer(),
          RoadAlertsLayer(),
          TravelTimeLayer(),
          FireIncidentLayer(),
          MileMarkersLayer(),
          RoadsReferenceLayer(),
          BoundariesPlacesReferenceLayer(),
          ZoomExtentLayer,
        ],
      };
      if (pointerMoveHandle) {
        pointerMoveHandle.remove();
        pointerMoveHandle = undefined;
      }
      pointerMoveHandle = mapView.on(["pointer-move"], (event) => {
        // Change pointer when the cursor is on a feature...
        mapView.hitTest(event, opLayerOpts).then((response) => {
          if (response.results.length > 0) {
            mapDiv.style.cursor = "pointer";
          } else {
            mapDiv.style.cursor = "auto";
          }
        });
      });
      // MapView click event handler for showing popups...
      if (clickHandle) {
        clickHandle.remove();
        clickHandle = undefined;
      }
      clickHandle = esriMap.mapView.on("click", (clickEvent) => {
        if (zoomEventIsOn) {
          return;
        }
        // Check if feature is clicked on...
        esriMap.mapView.hitTest(clickEvent, opLayerOpts).then((response) => {
          if (response.results.length) {
            // Check if metro area layer was clicked on...
            const zoomExtentResult = response.results.filter((each) => {
              return each.graphic.layer === ZoomExtentLayer;
            });
            if (zoomExtentResult.length) {
              zoomToMetroArea(zoomExtentResult[0].graphic.geometry.extent);
              return;
            }
            // Operation layer was clicked...
            const resultsByLayer: {
              info: LayerInfo;
              layer: Layer;
              results: { graphic: Graphic; mapPoint: Point }[];
            }[] = [];
            response.results.forEach((eachResult) => {
              const arrayFound = resultsByLayer.find(
                (eachArray) => eachArray.layer === eachResult.graphic.layer
              );
              if (arrayFound) {
                arrayFound.results.push(eachResult);
              } else {
                const layerInfo = store.state.layerList.find(
                  (layerInfo) => layerInfo.id === eachResult.graphic.layer.id
                );
                if (layerInfo) {
                  resultsByLayer.push({
                    info: layerInfo,
                    layer: eachResult.graphic.layer,
                    results: [eachResult],
                  });
                }
              }
            });
            let maxIdx = 0;
            resultsByLayer.forEach((eachResultSet) => {
              if (eachResultSet.info.index > maxIdx) {
                maxIdx = eachResultSet.info.index;
              }
            });
            const results2Show = resultsByLayer.find(
              (eachResultSet) => eachResultSet.info.index === maxIdx
            );
            if (results2Show) {
              const g = results2Show.results[0].graphic;
              const layer = g.layer as GeoJSONLayer;
              if (
                !layer.featureReduction &&
                esriMap.mapView.scale < clusterMaxScale
              ) {
                // If max scale, and features are still overlapping, then show multiple features...
                const query = CameraLayer().createQuery();
                // Select all features within the set pixels...
                query.geometry = esriMap.bufferByPixels(
                  10,
                  undefined,
                  g.geometry as Point
                );
                layer.queryFeatures(query).then((results) => {
                  const ids = results.features.map((eachFeature) => {
                    return eachFeature.getObjectId();
                  });
                  showPopup(g.layer.id, ids);
                });
              }
              // Deal with cluster...
              else if (g.isAggregate) {
                // Try to get features from the cluster...
                getIdsFromCluster(
                  g,
                  results2Show.layer,
                  esriMap.mapView,
                  3
                ).then((results) => {
                  // Show multiple features if infos are returned...
                  if (results instanceof Array) {
                    showPopup(
                      results2Show.layer.id,
                      results,
                      g.geometry as Point
                    );
                  } else {
                    closePopup();
                    // Zoom to the extent of all features...
                    // Note: expand the extent so it won't zoom too tight.
                    esriMap.zoomToExtent((results as Extent).expand(1.5));
                  }
                });
              } else {
                LineRestrictionsLayer().definitionExpression="1=0"//clear lines from restrictions layer
                // Not aggregate...
                const id = g.getObjectId();
                //get lines for restriciton point click
                if(g.layer.title=="Restriction Points"){
                  getFeatureInfoById(id,g.layer as GeoJSONLayer).then((result)=>{
                    if(result?.attributes.lineMarker=="true"){
                      LineRestrictionsLayer().definitionExpression = `UniqueId = '${result?.attributes.UniqueId}'`
                      getLineFromPointRestriction("UniqueId",result?.attributes.UniqueId as string,LineRestrictionsLayer()).then((lineSegment)=>{
                        const anyLine = lineSegment as any
                        mapView.goTo(anyLine.features[0].geometry).then(()=>
                        showPopup(results2Show.layer.id, [id]))
                      })
                    }
                    else{
                      showPopup(results2Show.layer.id, [id]);
                    }
                  })
                }
                else{
                  showPopup(results2Show.layer.id, [id]);
                }
              }
            }
          } else {
            //No feature exist...
            closePopup();
          }
        });
      });
    };

    onMounted(async () => {
      const esriMap = await import("../esri-stuff/esriMap");
      mapDiv = document.getElementById("esri-map-view") as HTMLDivElement;
      esriMap.init(mapDiv);
      // Read config, then load layers...
      await esriMap.loadOperationalLayers();
      let layerList: LayerInfo[] = [];
      esriMap.mapView.map.layers.map((layer, index) => {
        layerList.push({
          id: layer.id,
          index: index,
          title: layer.title,
          visible: layer.visible,
        });
      });
      // Set layer visibility based on URL query...
      setVisibleLayersFromUrl(layerList);
      store.commit("setLayerList", layerList);
      // Setup events on the operational layers...
      initOperationalLayerEvents(mapDiv, esriMap);
      // set refresh interval for GeoJSON...
      const appConfig = await getConfig();
      setInterval(() => {
        esriMap.reloadGeoJsonLayers(store.state.layerList).then((lyrList) => {
          store.commit("setLayerList", lyrList);
          initOperationalLayerEvents(mapDiv, esriMap);
        });
      }, appConfig.layerRefreshMinute * 60000);
      // Add quick zoom boxes around metro areas...
      esriMap.webmap.add(ZoomExtentLayer);
      // Set basemap based on URL query parameter...
      const basemapInfo = getBasemapFromUrl();
      store.commit("setBasemap", basemapInfo.name);
      // Set the initial map size in the state store...
      store.commit("setMapSize", {
        width: mapView.width,
        height: mapView.height,
      });
      // Pointer move event handler...
      esriMap.mapView.on(["pointer-move"], (event) => {
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
              // Users get lost zooming in too tight, so zoom to larger area...
              zoomExtent = geom.extent;
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
            //mapDiv.style.cursor = "auto";
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
      // Zoom, turn on layer and open popup if specified in URL query parameter...
      const featureType = getFeatureTypeFromUrl();
      const featureId = getFeatureIdFromUrl();
      if (featureType && featureId) {
        // Make sure the map is ready, then search for the feature...
        esriMap.mapView.when().then(() => {
          getFeature(featureId, featureType, esriMap.webmap).then((result) => {
            if (result) {
              if (result.geometry.type !== "point") {
                throw "The parameter, featuretype, only supports point feature type currently.";
              }
              // If the layer is not visible, turn it on...
              if (!result.layer.visible) {
                const layerList = setLayerVisibility(
                  result.layer.id,
                  true,
                  store.state.layerList
                );
                store.commit("setLayerList", layerList);
              }
              // Zoom in...
              esriMap.zoomToMax(result.geometry as Point).then(() => {
                showPopup(result.layer.id, [result.getObjectId()]);
              });
            }
          });
        });
      }
      // Watch scale change...
      esriMap.mapView.watch("scale", (newValue, oldValue) => {
        store.commit("setScale", newValue);
        // Adjust cluster setting based on scale...
        if (oldValue > 0) {
          toggleCluster(newValue, oldValue);
        }
      });
      // Watch map view size...
      esriMap.mapView.on("resize", (event) => {
        store.commit("setMapSize", {
          width: event.width,
          height: event.height,
        });
      });
    });
    return {
      zoomPopupVisible,
      zoomPopupX,
      zoomPopupY,
      zoomPopupLabel,
      zoomMetroEventHandler,
      popupXY,
      popupFeatureset,
      closePopup,
      selectedCursor,
      alerts,
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
  touch-action: none;
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
