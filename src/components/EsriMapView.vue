<script lang="ts">

import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { project } from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import { Geometry } from "@arcgis/core/geometry";
import Graphic from "@arcgis/core/Graphic";
import Layer from "@arcgis/core/layers/Layer";
import Point from "@arcgis/core/geometry/Point";
import Extent from "@arcgis/core/geometry/Extent";
import LayerView from "@arcgis/core/views/layers/LayerView";
import { whenFalseOnce } from "@arcgis/core/core/watchUtils";
import Collection from "@arcgis/core/core/Collection";
import { getConfig } from "@/utils/appConfigUtil";
import { mapView, zoomToMetroArea } from "@/esri-stuff/esriMap";
import {
  getExtentFromUrl,
  getBasemapFromUrl,
  getLayerVisibilityFromUrl,
  getFeatureIdFromUrl,
  getFeatureTypeFromUrl,
} from "@/utils/urlParamUtil";
import { getFeature, updateScaleDependentRendering } from "@/utils/layerUtil";
import {
  removeGraphicsByType,
  hidePointInteractionGraphics,
  displayPointInteractionGraphics,
} from "@/utils/graphicLayerUtil";
import ZoomExtentLayer, { getFeatureById as getZoomFeatureById } from "@/layers/ZoomExtentLayer";
import { clusterMaxScale, getClusterExtent } from "@/utils/clusterUtil";
import LayerInfo from "@/types/LayerInfo";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import XY from "@/types/XY";
import * as alertInfoUtil from "@/utils/alertInfoUtil";
import AlertInfo from "@/types/AlertInfo";
import FerryAlertInfo from "@/types/FerryAlertInfo";
import { getFeatureInfoById } from "@/utils/featureInfoUtil";
/* Basemap */
import { initBasemap } from "@/layers/Basemaps";
/* Layers for popup */
import ParkRideLayer from "@/layers/ParkRideLayer";
import CameraLayer, { toggleCluster } from "@/layers/CameraLayer";
import PointRestrictionsLayer from "@/layers/PointRestrictionsLayer";
import WeatherStationsLayer from "@/layers/WeatherStationsLayer";
import MountainPassesLayer from "@/layers/MountainPassesLayer";
import RoadAlertsLayer from "@/layers/RoadAlertsLayer";
import RoadClosuresLayer from "@/layers/LinearClosuresLayer";
import RestAreasLayer from "@/layers/RestAreasLayer";
import FireIncidentLayer from "@/layers/FireIncidentLayer";
import RoadsReferenceLayer from "@/layers/RoadsReferenceLayer";
import BoundariesPlacesReferenceLayer from "@/layers/BoundariesPlacesReferenceLayer";
import BorderCrossingLayer from "@/layers/BorderCrossingsLayer";
import PointFerryRoutesLayer from "@/layers/PointFerryRoutesLayer";
import RegionalAlertLayer, {
  centerFeatures as centerRegionalAlerts,
  layerId as regionalAlertLayerId,
} from "@/layers/RegionalAlertLayer";
/* Popups */
import ZoomPopupView from "@/components/ZoomPopupView.vue";
import CameraPopup from "@/popups/CameraPopup.vue";
import ParkRidePopup from "@/popups/ParkAndRidePopup.vue";
import PointRestrictionPopup from "@/popups/PointRestrictionPopup.vue";
import MountainPassPopup from "@/popups/MountainPassPopup.vue";
import WeatherStationsPopup from "@/popups/WeatherStationPopup.vue";
import RestAreaPopup from "@/popups/RestAreaPopup.vue";
import RoadAlertPopup from "@/popups/RoadAlertPopup.vue";
import RoadClosurePopup from "@/popups/RoadClosurePopup.vue";
import WildfirePointsPopup from "@/popups/WildfirePointsPopup.vue";
import BorderCrossingPopup from "@/popups/BorderCrossingPopup.vue";
import RegionalAlertPopup from "@/popups/RegionalAlertPopup.vue";
import FerryRoutesPopup from "@/popups/FerryRoutesPopup.vue";
/* Components */
import LeftPaneView from "@/components/LeftPaneView.vue";
import BannerView from "@/components/BannerView.vue";
import BasemapView from "@/components/BasemapView.vue";
import CoordinatesView from "@/components/CoordinatesView.vue";
import MyLocationView from "@/components/MyLocationView.vue";
import ZoomButtonView from "@/components/ZoomButtonView.vue";
import AlertView from "@/components/AlertView.vue";
import AdView from "@/components/AdView.vue";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { hasParentClass } from "@/utils/miscUtil";

type LocationFoundEvent = [boolean, "success" | string];


export default defineComponent({
  components: {
    ZoomPopupView,
    CameraPopup,
    ParkRidePopup,
    PointRestrictionPopup,
    MountainPassPopup,
    WeatherStationsPopup,
    RestAreaPopup,
    RoadAlertPopup,
    RoadClosurePopup,
    WildfirePointsPopup,
    BorderCrossingPopup,
    RegionalAlertPopup,
    FerryRoutesPopup,
    LeftPaneView,
    BasemapView,
    CoordinatesView,
    MyLocationView,
    ZoomButtonView,
    AlertView,
    AdView,
    BannerView,
  },
  setup() {
    const mapLoaded = ref<boolean>(false);
    setTimeout(() => {
      mapLoaded.value = true;
    }, 9000);
    const route = useRoute();
    const store = useStore();
    // Statewide alerts...
    const alerts = ref<AlertInfo[]>([]);
    const ferryAlerts = ref<FerryAlertInfo[]>([]);
    const config = getConfig();
    alertInfoUtil.initStateAlerts(config.stateAlerts);
    alertInfoUtil
      .getStateAlerts()
      .then((result) => {
        alerts.value = result;
      })
      .catch((err) => {
        store.commit("addServiceAlert", "Statewide alerts");
        console.error(err);
      });
    alertInfoUtil.initFerryAlerts(config.ferryAlerts);
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
      store.commit("setInitializing", { isInitializing: false });
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
      const lyrs = esriMap.validateLayerList([
        // RoadClosuresLayer(),
        ParkRideLayer(),
        CameraLayer(),
        PointRestrictionsLayer(),
        WeatherStationsLayer(),
        MountainPassesLayer(),
        RestAreasLayer(),
        RoadAlertsLayer(),
        FireIncidentLayer(),
        RoadsReferenceLayer(),
        BoundariesPlacesReferenceLayer(),
        BorderCrossingLayer(),
        RegionalAlertLayer(),
        PointFerryRoutesLayer(),
        ZoomExtentLayer,
      ]);
      const opLayerOpts = {
        include: lyrs,
      };
      if (pointerMoveHandle) {
        pointerMoveHandle.remove();
        pointerMoveHandle = undefined;
      }
      pointerMoveHandle = mapView.on("pointer-move", (event) => {
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
              return each.type === "graphic" && each.graphic.layer === ZoomExtentLayer;
            });
            if (zoomExtentResult.length) {
              const zeResult = zoomExtentResult[0];
              if (zeResult.type === "graphic") {
                zoomToMetroArea(zeResult.graphic.geometry.extent);
              }
              return;
            }
            // Operational layer was clicked...
            const resultsByLayer: {
              info: LayerInfo;
              layer: Layer;
              results: { graphic: Graphic; mapPoint: Point }[];
            }[] = [];


            for (const eachResult of response.results) {
              // Skip results that aren't GraphicHit.
              if (eachResult.type !== "graphic") continue;

              const arrayFound = resultsByLayer.find(
                (eachArray) => eachArray.layer === eachResult.graphic.layer
              );
              if (arrayFound) {
                arrayFound.results.push(eachResult);
              } else {
                const layerInfo = store.getters.getLayerInfo(eachResult.graphic.layer.id);
                if (layerInfo) {
                  resultsByLayer.push({
                    info: layerInfo,
                    layer: eachResult.graphic.layer,
                    results: [eachResult],
                  });
                }
              }
            }
            // Pick the top most layer...
            let maxIdx = 0;
            resultsByLayer.forEach((eachResultSet) => {
              if (eachResultSet.info.index && eachResultSet.info.index > maxIdx) {
                maxIdx = eachResultSet.info.index;
              }
            });
            const results2Show = resultsByLayer.find(
              (eachResultSet) => eachResultSet.info.index === maxIdx
            );
            if (results2Show) {
              const g = results2Show.results[0].graphic;
              const layer = g.layer as FeatureLayer;
              if (
                layer.id === "traffic-camera-layer" &&
                !layer.featureReduction &&
                esriMap.mapView.scale < clusterMaxScale
              ) {
                // If zoomed more than cluster max scale, and features are still overlapping, then show multiple features...
                const query = layer.createQuery();
                // Select all features within the set pixels...
                // query.geometry = esriMap.bufferByPixels(10, undefined, g.geometry as Point);
                query.geometry = g.geometry;
                query.distance = esriMap.pixel2meter(10, undefined, g.geometry as Point);
                query.units = "meters";
                query.spatialRelationship = "intersects";
                layer.queryFeatures(query).then((results) => {
                  const ids = results.features.map((eachFeature) => {
                    return eachFeature.getObjectId();
                  });
                  showPopup(g.layer.id, ids);
                });
              }
              // Deal with cluster...
              else if (g.isAggregate) {
                getClusterExtent(g, results2Show.layer as FeatureLayer, esriMap.mapView).then(
                  (clusterExtent) => {
                    esriMap.zoomToExtent(clusterExtent.expand(1.5));
                  }
                );
              } else {
                const target = (clickEvent.native as PointerEvent).target;
                if (target && target instanceof Element && hasParentClass(target, "alert-content") == false) {
                  hidePointInteractionGraphics("line-restrictions-layer", esriMap.webmap);
                  hidePointInteractionGraphics("ferry-routes-lines-layer", esriMap.webmap);
                  hidePointInteractionGraphics("line-road-alerts-layer", esriMap.webmap);
                }
                // Not aggregate...
                const id = g.getObjectId();
                // get lines for restriction point click
                if (
                  g.layer.id === "point-restrictions-layer" ||
                  g.layer.id === "road-alerts-layer"
                ) {
                  getFeatureInfoById(id, g.layer as FeatureLayer).then((result) => {
                    if (
                      result?.attributes.lineMarker == "true" ||
                      result?.attributes.lineMarker == "True"
                    ) {
                      if (g.layer.id === "point-restrictions-layer") {
                        displayPointInteractionGraphics(
                          "line-restrictions-layer",
                          esriMap.webmap,
                          "UniqueId",
                          `'${result?.attributes.UniqueId}'`
                        );
                      }
                      if (g.layer.id === "road-alerts-layer") {
                        displayPointInteractionGraphics(
                          "line-road-alerts-layer",
                          esriMap.webmap,
                          "EventID",
                          result?.attributes.EventID
                        );
                        showPopup(results2Show.layer.id, [id]);
                      }
                    } else {
                      showPopup(results2Show.layer.id, [id]);
                    }
                  });
                }
                if (g.layer.id === "ferry-routes-points-layer") {
                  // Display line...
                  getFeatureInfoById(id, g.layer as FeatureLayer).then((result) => {
                    displayPointInteractionGraphics(
                      "ferry-routes-lines-layer",
                      esriMap.webmap,
                      "FerryRouteID",
                      `${result?.attributes.FerryRouteID}`
                    );
                    showPopup(g.layer.id, [id]);
                  });
                } else {
                  showPopup(results2Show.layer.id, [id]);
                }
                removeGraphicsByType("selectedGraphic");
              }
            }
          } else {
            const target = (clickEvent.native as PointerEvent).target;
            if (target && target instanceof Element && hasParentClass(target, "alert-content") == false) {
              hidePointInteractionGraphics("line-restrictions-layer", esriMap.webmap);
              hidePointInteractionGraphics("ferry-routes-lines-layer", esriMap.webmap);
              hidePointInteractionGraphics("line-road-alerts-layer", esriMap.webmap);
              removeGraphicsByType("selectedGraphic");
              removeGraphicsByType("myLocation"); //remove "my location" graphic
              //No feature exist...
              closePopup();
            }
          }
        });
      });
    };

    onMounted(async () => {
      const appConfig = getConfig();
      const esriMap = await import("../esri-stuff/esriMap");
      mapDiv = document.getElementById("esri-map-view") as HTMLDivElement;
      esriMap.init(mapDiv);
      store.commit("setMapSize", {
        width: esriMap.mapView.width,
        height: esriMap.mapView.height,
      });
      esriMap.mapView.on("layerview-create-error", (event) => {
        store.commit("addServiceAlert", event.layer.title);
      });
      // Set basemap based on URL query parameter or display default...
      await initBasemap(appConfig.basemap);
      const basemapInfo = getBasemapFromUrl();
      store.commit("setBasemap", basemapInfo.name);
      // Read config, then load operational layers...
      const lyrInfos = await esriMap.loadOperationalLayers();
      store.commit("setLayerInfos", lyrInfos);
      //set watcher to turn off initial loader screen
      const mapLayers = esriMap.getLayers() as Collection<Layer>;
      const vlPromises = [] as Array<Promise<LayerView>>;
      const loadedPromises = [] as Array<Promise<unknown>>;
      const test: string[] = [];
      mapLayers.forEach((layer) => {
        if (
          layer.type == "feature" &&
          layer.id !== "ferry-routes-points-layer" &&
          layer.loadStatus !== "failed"
        ) {
          vlPromises.push(mapView.whenLayerView(layer));
          test.push(layer.title);
        }
      });
      Promise.all(vlPromises).then((layerViews) => {
        layerViews.forEach((layerView) => {
          loadedPromises.push(whenFalseOnce(layerView, "updating"));
        });
        return Promise.all(loadedPromises)
          .then(() => {
            store.commit("setInitializing", {
              isInitializing: false,
            }); /***TODO: use this to wait until non-feature layers are also ready***/
          })
          .catch((err) => {
            console.error(err.message);
          });
      });
      /*Set scale dependent rendering */
      watch(
        () => store.state.scale,
        (scale) => {
          updateScaleDependentRendering(RoadClosuresLayer() as FeatureLayer, scale as number);
        }
      );
      /* Set layer list here before the rest of the map is ready, so we can show the layer list UI early.
       * Otherwise user will see a map without layer list until everything is ready. */
      store.dispatch("updateLayerVisibility");
      // Load regional alert after the other operations layers have been loaded so it won't slow down the map loading...
      const alertLyrInfos = await esriMap.loadRegionalAlert();
      store.commit("setLayerInfos", alertLyrInfos);
      // Store the layer indices in the state store...
      store.dispatch("updateLayerIndices");
      store.dispatch("watchLayers");
      // Set refresh interval for layers & alerts...
      setInterval(() => {
        esriMap
          .refreshLayerData()
          .then((layerInfos) => store.dispatch("updateLayerStatus", layerInfos));
        alertInfoUtil
          .getStateAlerts()
          .then((result) => {
            alerts.value = result;
          })
          .catch((err) => {
            console.error(err);
          });
        alertInfoUtil.reloadFerryAlerts();
      }, appConfig.layerRefreshMinute * 60000); //60000
      // Setup events on the operational layers...
      initOperationalLayerEvents(mapDiv, esriMap);
      // Add quick zoom boxes around metro areas...
      esriMap.webmap.add(ZoomExtentLayer);
      // Gray out areas outside of the display area...
      esriMap.addOutOfExtentLayer();
      // Set layer visibility based on URL query...
      const layerIds = getLayerVisibilityFromUrl(route);
      store.dispatch("updateLayerVisibility", { ids: layerIds.visible, visible: true });
      store.dispatch("updateLayerVisibility", { ids: layerIds.invisible, visible: false });
      // Set the initial map size in the state store...
      store.commit("setMapSize", {
        width: mapView.width,
        height: mapView.height,
      });
      // Set extent based on the URL query parameter...
      esriMap.mapView.extent = await getExtentFromUrl(route);
      // Zoom, turn on layer and open popup if specified in URL query parameter...
      const featureType = getFeatureTypeFromUrl(route);
      const featureId = getFeatureIdFromUrl(route);
      if (featureType && featureId) {
        // Make sure the map is ready, then search for the feature...
        esriMap.mapView
          .when()
          .then(() => {
            getFeature(featureId, featureType, esriMap.webmap).then((result) => {
              if (result) {
                if (result.geometry.type !== "point") {
                  throw "The parameter, featuretype, only supports point feature type currently.";
                } else {
                  if (featureType == "restriction") {
                    displayPointInteractionGraphics(
                      "line-restrictions-layer",
                      esriMap.webmap,
                      "UniqueId",
                      result?.attributes.UniqueId
                    );
                  }
                }
                // If the layer is not visible, turn it on...
                if (!result.layer.visible) {
                  store.dispatch("updateLayerVisibility", {
                    ids: [result.layer.id],
                    visible: true,
                  });
                }
                // Zoom in (zoom level differs depends on the device)...
                let zoomLevel: number;
                if (store.state.mediaSize === "s") {
                  zoomLevel = esriMap.getZoomLevel(-2).level;
                } else {
                  zoomLevel = esriMap.mapView.zoom + 4;
                }
                esriMap.tryZoomToPointAsync(result.geometry as Point, zoomLevel).then(() => {
                  showPopup(result.layer.id, [result.getObjectId()]);
                });
              } else {
                console.error(
                  "Failed to find the feature specified: " + featureType + ", " + featureId
                );
              }
            });
          })
          .catch((error) => {
            if (error.name.includes("webgl")) {
              store.commit("setInitializing", {
                isInitializing: true,
                isLoading: false,
                initializingMessage: "WebGL error",
              });
              console.warn("WebGL error");
            } else {
              console.warn("Failed to initialize map. Error: ", error);
              store.commit("setInitializing", {
                isInitializing: true,
                isLoading: false,
                initializingMessage: "Failed to initialize map. Error: " + error,
              });
            }
          });
      }
      // Pointer move event handler...
      esriMap.mapView.on("pointer-move", (event) => {
        // Update current pointer x/y in the store...
        const pt = esriMap.mapView.toMap({ x: event.x, y: event.y });
        store.commit("setPointerX", pt.longitude);
        store.commit("setPointerY", pt.latitude);
        // Check if pointer is over one of the zoom extents...
        const opts = {
          include: [ZoomExtentLayer],
        };
        esriMap.mapView.hitTest(event, opts).then((response) => {
          // check if a feature is returned from the zoom layer...
          if (response.results.length && response.results[0].type === "graphic") {
            // Show custom popup...
            zoomPopupX.value = event.x;
            zoomPopupY.value = event.y;
            const zoomGraphic = response.results[0].graphic;
            zoomPopupVisible.value = true;
            // Set zoom popup properties...
            const id = zoomGraphic.attributes["ObjectID"];
            getZoomFeatureById(id).then((response) => {
              const geom = project(response.geometry, SpatialReference.WebMercator) as Geometry;
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
        adjustBottomControls();
      });
      // Watch center change...
      esriMap.mapView.watch("center", (newValue) => {
        store.commit("setCenter", { x: newValue.x, y: newValue.y });
      });
      //
      esriMap.mapView.watch("stationary", (newValue) => {
        if (!newValue) {
          return;
        }
        // Center the regional alert icon inside the visible area.
        // Except when the regional alert popup is open.
        if (popupFeatureset.value.layerId !== regionalAlertLayerId) {
          centerRegionalAlerts(esriMap.mapView.extent);
        }
      });
    });
    //
    const bottomRightDiv = ref<HTMLDivElement>();
    const bottomLeftDiv = ref<HTMLDivElement>();
    const bottomCtrDiv = ref<HTMLDivElement>();
    const marginBottomContainer = ref("0 px");
    const adjustBottomControls = (event?: { width: number; height: number }) => {
      let ctrWidth: number;
      let ctrHeight: number;
      if (event) {
        ctrWidth = event.width;
        ctrHeight = event.height;
      } else if (bottomCtrDiv.value) {
        ctrWidth = bottomCtrDiv.value.offsetWidth;
        ctrHeight = bottomCtrDiv.value.offsetHeight;
      } else {
        return;
      }
      if (bottomRightDiv.value && bottomLeftDiv.value && store.state.mapSize.width) {
        if (
          ctrWidth + bottomRightDiv.value.offsetWidth + bottomLeftDiv.value.offsetWidth >
          store.state.mapSize.width
        ) {
          marginBottomContainer.value = ctrHeight + 16 + "px";
        } else {
          marginBottomContainer.value = "16px";
        }
      }
    };

    /**
     * Display error message
     *
     * @param event  - An event
     */
    const displayToast = (event: LocationFoundEvent) => {
      if (event[0] == false) {
        store.dispatch("showError", event[1].toString());
      }
    };
    return {
      bottomRightDiv,
      bottomLeftDiv,
      bottomCtrDiv,
      zoomPopupVisible,
      zoomPopupX,
      zoomPopupY,
      zoomPopupLabel,
      zoomMetroEventHandler,
      popupXY,
      popupFeatureset,
      alerts,
      ferryAlerts,
      adjustBottomControls,
      marginBottomContainer,
      displayToast,
      closePopup,
      store,
    };
  },
});
</script>

<template>
  <div id="esri-map-view"></div>
  <AlertView :Alerts="alerts" />
  <div id="map-bottom-left-container" class="w3-display-bottomleft w3-container" ref="bottomLeftDiv"
    :style="{ marginBottom: marginBottomContainer }">
    <CoordinatesView />
  </div>
  <div id="map-bottom-center-container" class="w3-display-bottommiddle" ref="bottomCtrDiv">
    <AdView @onResize="adjustBottomControls" />
  </div>
  <div id="map-bottom-right-container" class="w3-display-bottomright" ref="bottomRightDiv"
    :style="{ marginBottom: marginBottomContainer }">
    <div class="map-bottom-right-container-row flex-row">
      <div class="map-bottom-right-container-column flex-column">
        <BasemapView />
      </div>
      <div class="map-bottom-right-container-column flex-column">
        <MyLocationView @locationFound="displayToast" />
        <ZoomButtonView />
      </div>
    </div>
  </div>
  <ZoomPopupView :Visible="zoomPopupVisible" :PositionX="zoomPopupX" :PositionY="zoomPopupY" :Label="zoomPopupLabel"
    @clicked="zoomMetroEventHandler"></ZoomPopupView>
  <CameraPopup :MapXY="popupXY" :Featureset="popupFeatureset" />
  <ParkRidePopup :Featureset="popupFeatureset" />
  <PointRestrictionPopup :Featureset="popupFeatureset" />
  <MountainPassPopup :Featureset="popupFeatureset" />
  <WeatherStationsPopup :Featureset="popupFeatureset" />
  <RestAreaPopup :Featureset="popupFeatureset" />
  <RoadAlertPopup :Featureset="popupFeatureset" />
  <RoadClosurePopup :Featureset="popupFeatureset" />
  <WildfirePointsPopup :Featureset="popupFeatureset" />
  <BorderCrossingPopup :Featureset="popupFeatureset" />
  <RegionalAlertPopup :Featureset="popupFeatureset" @close="closePopup" />
  <FerryRoutesPopup :Featureset="popupFeatureset" :Alerts="ferryAlerts" />
  <LeftPaneView />
  <BannerView />
</template>

<style scoped>
@import "https://js.arcgis.com/4.24/@arcgis/core/assets/esri/themes/light/main.css";

#esri-map-view {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  touch-action: none;
  overflow: hidden;
}

#map-bottom-right-container {
  display: inline-flex;
  margin-bottom: 16px;
}

.map-bottom-right-container-row {
  display: flex;
  position: relative;
  width: 100%;
  justify-content: flex-end;
  flex-direction: rtl;
  align-items: flex-end;
  /* move columns to rightmost end of row */
}

.map-bottom-right-container-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

#map-bottom-center-container {
  margin-bottom: 16px;
}

.esri-zoom {
  display: none;
}
</style>
