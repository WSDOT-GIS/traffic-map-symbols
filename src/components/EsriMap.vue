<template>
  <div id="esri-map-view"></div>
  <AlertView :Alerts="alerts" />
  <div
    id="map-bottom-left-container"
    class="w3-display-bottomleft w3-container"
  >
    <CoordinatesView />
  </div>
  <div id="map-bottom-center-container" class="w3-display-bottommiddle">
    <AdView />
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
  <BorderCrossingPopup :Featureset="popupFeatureset" />
  <RegionalAlertPopup :Featureset="popupFeatureset" />
  <LeftPaneView />
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
import { removeGraphicsByType } from "@/utils/graphicLayerUtil";
import ZoomExtentLayer, {
  getFeatureById as getZoomFeatureById,
} from "@/layers/ZoomExtentLayer";
import { clusterMaxScale, getClusterExtent } from "@/utils/clusterUtil";
import LayerInfo from "@/types/LayerInfo";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import XY from "@/types/XY";
import { getAlerts } from "@/utils/alertInfoUtil";
import AlertInfo from "@/types/AlertInfo";
import {
  getFeatureInfoById,
  getLineFromPointRestriction,
} from "@/utils/featureInfoUtil";
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
import BorderCrossingLayer from "@/layers/BorderCrossingsLayer";
import RegionalAlertLayer, {
  centerFeatures as centerRegionalAlerts,
} from "@/layers/RegionalAlertLayer";
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
import BorderCrossingPopup from "@/popups/BorderCrossingPopup.vue";
import RegionalAlertPopup from "@/popups/RegionalAlertPopup.vue";
/* Components */
import LeftPaneView from "@/components/LeftPaneView.vue";
import BasemapView from "@/components/BasemapView.vue";
import CoordinatesView from "@/components/CoordinatesView.vue";
import MyLocationView from "@/components/MyLocationView.vue";
import ZoomButtonView from "@/components/ZoomButtonView.vue";
import AlertView from "@/components/AlertView.vue";
import AdView from "@/components/AdView.vue";
import WebMap from "@arcgis/core/WebMap";

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
    BorderCrossingPopup,
    RegionalAlertPopup,
    LeftPaneView,
    BasemapView,
    CoordinatesView,
    MyLocationView,
    ZoomButtonView,
    AlertView,
    AdView,
  },
  setup() {
    const store = useStore();
    // Statewide alerts...
    const alerts = ref<AlertInfo[]>([]);
    getConfig().then((config) => {
      getAlerts(config.stateAlerts).then((result) => {
        // quadrupling one alert for testing...
        // result.push(...result);
        // result.push(...result);
        // result = JSON.parse(JSON.stringify(result));
        // // Testing long text...
        // result[0].ExtendedMessage =
        //   "300 Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accums";
        // result[1].ExtendedMessage =
        //   "2000 Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accumsan finibus at nascetur. Quam aptent porta penatibus ullamcorper a quis curabitur class quisque netus tempor eget, lacus ut etiam sollicitudin vulputate nullam purus hac mollis mattis egestas tortor, orci dictumst consequat lorem efficitur duis gravida non pharetra faucibus euismod. Viverra consectetur himenaeos magna laoreet nunc interdum nam, faucibus nascetur dolor pretium amet urna nisi, arcu integer penatibus pulvinar convallis parturient. Accumsan sit hendrerit leo dapibus varius congue bibendum vestibulum, amet ornare suspendisse lectus a parturient semper euismod, eros eleifend aenean erat venenatis vel molestie. Dapibus pulvinar magna torquent blandit nulla curae ut accumsan, phasellus natoque tortor gravida sit diam tempor, hendrerit penatibus sagittis mollis vitae vestibulum rhoncus. Quisque in magnis eleifend dui erat viverra ullamcorper, vivamus ligula commodo ex sagittis dis mattis vel, facilisi vulputate dignissim interdum adipiscing leo. Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accumsan finibus at nascetur. Quam aptent porta penatibus ullamcorper a quis curabitur class quisque netus tempor eget, lacus ut etiam sollicitudin vulputate nullam purus hac mollis mattis egestas tortor, orci dictumst consequat lorem efficitur duis gravida non pharetra faucibus euismod. Viverra consectetur himenaeos magna laoreet nunc interdum nam, faucibus nascetur dolor pretium amet urna nisi, arcu integer penatibus pulvinar convalliss";
        // result[2].ExtendedMessage = "";
        // result[3].ExtendedMessage =
        //   "5000 Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accumsan finibus at nascetur. Quam aptent porta penatibus ullamcorper a quis curabitur class quisque netus tempor eget, lacus ut etiam sollicitudin vulputate nullam purus hac mollis mattis egestas tortor, orci dictumst consequat lorem efficitur duis gravida non pharetra faucibus euismod. Viverra consectetur himenaeos magna laoreet nunc interdum nam, faucibus nascetur dolor pretium amet urna nisi, arcu integer penatibus pulvinar convallis parturient. Accumsan sit hendrerit leo dapibus varius congue bibendum vestibulum, amet ornare suspendisse lectus a parturient semper euismod, eros eleifend aenean erat venenatis vel molestie. Dapibus pulvinar magna torquent blandit nulla curae ut accumsan, phasellus natoque tortor gravida sit diam tempor, hendrerit penatibus sagittis mollis vitae vestibulum rhoncus. Quisque in magnis eleifend dui erat viverra ullamcorper, vivamus ligula commodo ex sagittis dis mattis vel, facilisi vulputate dignissim interdum adipiscing leo. Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accumsan finibus at nascetur. Quam aptent porta penatibus ullamcorper a quis curabitur class quisque netus tempor eget, lacus ut etiam sollicitudin vulputate nullam purus hac mollis mattis egestas tortor, orci dictumst consequat lorem efficitur duis gravida non pharetra faucibus euismod. Viverra consectetur himenaeos magna laoreet nunc interdum nam, faucibus nascetur dolor pretium amet urna nisi, arcu integer penatibus pulvinar convallis parturient. Accumsan sit hendrerit leo dapibus varius congue bibendum vestibulum, amet ornare suspendisse lectus a parturient semper euismod, eros eleifend aenean erat venenatis vel molestie. Dapibus pulvinar magna torquent blandit nulla curae ut accumsan, phasellus natoque tortor gravida sit diam tempor, hendrerit penatibus sagittis mollis vitae vestibulum rhoncus. Quisque in magnis eleifend dui erat viverra ullamcorper, vivamus ligula commodo ex sagittis dis mattis vel, facilisi vulputate dignissim interdum adipiscing leo. Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accumsan finibus at nascetur. Quam aptent porta penatibus ullamcorper a quis curabitur class quisque netus tempor eget, lacus ut etiam sollicitudin vulputate nullam purus hac mollis mattis egestas tortor, orci dictumst consequat lorem efficitur duis gravida non pharetra faucibus euismod. Viverra consectetur himenaeos magna laoreet nunc interdum nam, faucibus nascetur dolor pretium amet urna nisi, arcu integer penatibus pulvinar convallis parturient. Accumsan sit hendrerit leo dapibus varius congue bibendum vestibulum, amet ornare suspendisse lectus a parturient semper euismod, eros eleifend aenean erat venenatis vel molestie. Dapibus pulvinar magna torquent blandit nulla curae ut accumsan, phasellus natoque tortor gravida sit diam tempor, hendrerit penatibus sagittis mollis vitae vestibulum rhoncus. Quisque in magnis eleifend dui erat viverra ullamcorper, vivamus ligula commodo ex sagittis dis mattis vel, facilisi vulputate dignissim interdum adipiscing leo. Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accumsan finibus at nascetur. Quam aptent porta penatibus ullamcorper a quis curabitur class quisque netus tempor eget, lacus ut etiam sollicitudin vulputate nullam purus hac mollis mattis egestas tortor, orci dictumst consequat lorem efficitur duis gravida non pharetra faucibus euismod. Viverra consectetur himenaeos magna laoreet nunc interdum nam, faucibus nascetur dolor pretium amet urna nisi, arcu integer penatibus pulvinar convallis parturient. Accumsan sit hendrerit leo dapibus varius congue bibendum vestibulum, amet ornare suspendisse lectus a parturient semper euismod, eros eleifend aenean erat venenatis vel molestie. Dapibus pulvinar magna torquent blandit nulla curae ut accumsan, phasellus natoque tortor gravida sit diam tempor, hendrerit penatibus sagittis mollis vitae vestibulum rhoncus. Quisque in magnis eleifend dui erat viverra ullamcorper, vivamus ligula commodo ex sagittis dis mattis ve";
        alerts.value = result;
      });
    });
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
          RoadAlertsLayer("road-closures-layer"),
          RoadAlertsLayer("road-alerts-layer"),
          TravelTimeLayer(),
          FireIncidentLayer(),
          MileMarkersLayer(),
          RoadsReferenceLayer(),
          BoundariesPlacesReferenceLayer(),
          BorderCrossingLayer(),
          RegionalAlertLayer(),
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
            // Operational layer was clicked...
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
            // Pick the top most layer...
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
                layer.id === "traffic-camera-layer" &&
                !layer.featureReduction &&
                esriMap.mapView.scale < clusterMaxScale
              ) {
                // If zoomed more than cluster max scale, and features are still overlapping, then show multiple features...
                const query = layer.createQuery();
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
                getClusterExtent(g, results2Show.layer, esriMap.mapView).then(
                  (clusterExtent) => {
                    esriMap.zoomToExtent(clusterExtent.expand(1.5));
                  }
                );
              } else {
                LineRestrictionsLayer().definitionExpression = "1=0"; //clear lines from restrictions layer
                // Not aggregate...
                const id = g.getObjectId();
                //get lines for restriciton point click
                if (g.layer.title == "Restriction Points") {
                  getFeatureInfoById(id, g.layer as GeoJSONLayer).then(
                    (result) => {
                      // console.log(result?.attributes.lineMarker)
                      if (
                        result?.attributes.lineMarker == "true" ||
                        result?.attributes.lineMarker == "True"
                      ) {
                        LineRestrictionsLayer().definitionExpression = `UniqueId = '${result?.attributes.UniqueId}'`;
                        getLineFromPointRestriction(
                          "UniqueId",
                          result?.attributes.UniqueId as string,
                          LineRestrictionsLayer()
                        ).then((lineSegment) => {
                          const anyLine = lineSegment as any;
                          mapView
                            .goTo(anyLine.features[0].geometry)
                            .then(() => showPopup(results2Show.layer.id, [id]));
                        });
                      } else {
                        showPopup(results2Show.layer.id, [id]);
                      }
                    }
                  );
                } else {
                  showPopup(results2Show.layer.id, [id]);
                }
              }
            }
          } else {
            LineRestrictionsLayer().definitionExpression = "1=0"; //remove line restriction symbol
            removeGraphicsByType("myLocation"); //remove "my location" graphic
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
      // Set basemap based on URL query parameter or display default...
      const basemapInfo = getBasemapFromUrl();
      store.commit("setBasemap", basemapInfo.name);
      // Read config, then load operational layers...
      await esriMap.loadOperationalLayers();
      /* Set layer list here before the rest of the map is ready, so we can show the layer list UI early.
       * Otherwise user will see a map without layer list until everything is ready. */
      store.commit("setLayerList");
      // Load regional alert after the other operations layers have been loaded so it won't slow down the map loading...
      await esriMap.loadRegionalAlert();
      // Update the layer list with regional alert layers.
      store.commit("setLayerList");
      // Set refresh interval for layers...
      const appConfig = await getConfig();
      setInterval(() => {
        esriMap.refreshLayerData();
        //esriMap.reloadGeoJsonLayers(store.state.layerList).then((lyrList) => {
          // esriMap.refreshRegionAlert().then(() => {
          //   store.commit("setLayerList");//, lyrList);
          //   initOperationalLayerEvents(mapDiv, esriMap);
          // });
       //});
        getAlerts(appConfig.stateAlerts).then((result) => {
          alerts.value = result;
        });
      }, appConfig.layerRefreshMinute * 1500); //60000
      // Setup events on the operational layers...
      initOperationalLayerEvents(mapDiv, esriMap);
      // Add quick zoom boxes around metro areas...
      esriMap.webmap.add(ZoomExtentLayer);
      // Gray out areas outside of the display area...
      esriMap.addOutOfExtentLayer();
      // Set layer visibility based on URL query...
      const layerList = setVisibleLayersFromUrl(store.state.layerList);
      store.commit("setLayerList", layerList);
      // Set the initial map size in the state store...
      store.commit("setMapSize", {
        width: mapView.width,
        height: mapView.height,
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

        centerRegionalAlerts(newValue as Extent);
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
        esriMap.updateOutOfExtentLayer();
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
  margin-bottom: 16px;
}

@media screen and (max-width: 900px) {
  #map-bottom-right-container {
    margin-bottom: 66px;
  }
  #map-bottom-left-container {
    margin-bottom: 66px;
  }
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
#map-bottom-center-container {
  margin-bottom: 16px;
}
.esri-zoom {
  display: none;
}
</style>
