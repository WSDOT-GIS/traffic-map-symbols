"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeHighlight = exports.highlightFeature = exports.bufferByPixels = exports.getIdsFromCluster = exports.getLayer = exports.panMap = exports.toScreenXY = exports.getMaxScale = exports.zoomToMetroArea = exports.zoomToMax = exports.tryZoomToPointAsync = exports.tryZoomToPoint = exports.reloadGeoJsonLayers = exports.loadOperationalLayers = exports.init = exports.mapView = exports.webmap = void 0;
const tslib_1 = require("tslib");
const WebMap_1 = tslib_1.__importDefault(require("@arcgis/core/WebMap"));
const MapView_1 = tslib_1.__importDefault(require("@arcgis/core/views/MapView"));
const Point_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/Point"));
const geometryEngine_1 = require("@arcgis/core/geometry/geometryEngine");
const watchUtils_1 = require("@arcgis/core/core/watchUtils");
const SpatialReference_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/SpatialReference"));
const config_1 = tslib_1.__importDefault(require("@arcgis/core/config"));
// Layers
const TrafficLayer_1 = require("@/layers/TrafficLayer");
const ParkRideLayer_1 = require("@/layers/ParkRideLayer");
const CameraLayer_1 = require("@/layers/CameraLayer");
const RestAreasLayer_1 = require("@/layers/RestAreasLayer");
const PointRestrictionsLayer_1 = require("@/layers/PointRestrictionsLayer");
const LineRestrictionsLayer_1 = require("@/layers/LineRestrictionsLayer");
const RoadAlertsLayer_1 = require("@/layers/RoadAlertsLayer");
const WeatherStationsLayer_1 = require("@/layers/WeatherStationsLayer");
const MountainPassesLayer_1 = require("@/layers/MountainPassesLayer");
const TravelTimeLayer_1 = require("@/layers/TravelTimeLayer");
const FireIncidentLayer_1 = require("@/layers/FireIncidentLayer");
const FirePerimeterLayer_1 = require("@/layers/FirePerimeterLayer");
const MileMarkersLayer_1 = require("@/layers/MileMarkersLayer");
const RoadsReferenceLayer_1 = require("@/layers/RoadsReferenceLayer");
const BoundariesPlacesReferenceLayer_1 = require("@/layers/BoundariesPlacesReferenceLayer");
//
const extentUtil_1 = require("@/utils/extentUtil");
const ZoomExtentLayer_1 = tslib_1.__importDefault(require("@/layers/ZoomExtentLayer"));
const appConfigUtil_1 = require("@/utils/appConfigUtil");
const firePerimeterQuery_1 = tslib_1.__importDefault(require("@/utils/firePerimeterQuery"));
const Basemaps_1 = require("@/layers/Basemaps");
// Initialize empty map, and load layers later...
exports.webmap = new WebMap_1.default({});
exports.mapView = new MapView_1.default({
    container: "esri-map-view",
    map: exports.webmap,
    extent: extentUtil_1.getEsriExtent("full"),
    constraints: {
        rotationEnabled: false // Disables map rotation
    }
});
// Zoom buttons are replaced with the custom Vue components.
exports.mapView.ui.remove("zoom");
//
const init = (container) => {
    exports.mapView.container = container;
    exports.mapView.when()
        .then(() => {
        console.log("Map is ready.");
    })
        .catch(error => {
        console.warn("Failed to initialize map. Error: ", error);
    });
};
exports.init = init;
/**
 * Get config and get apiKey and URL, then initialize layers and add to map...
 */
const loadOperationalLayers = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const config = yield appConfigUtil_1.getConfig();
    config_1.default.apiKey = config.apiKey;
    const trafficLyr = TrafficLayer_1.initLayer(config.traffic, config.layerRefreshMinute);
    const restAreasLyr = RestAreasLayer_1.initLayer(config.restAreas);
    const parkRideLyr = ParkRideLayer_1.initLayer(config.parkAndRides);
    const weatherLyr = WeatherStationsLayer_1.initLayer(config.weatherStations);
    const mtLyr = MountainPassesLayer_1.initLayer(config.mountainPasses);
    const travelTimesLyr = TravelTimeLayer_1.initLayer(config.travelTimes);
    const lineRestrictionLyr = LineRestrictionsLayer_1.initLayer(config.lineRestrictions);
    const pointRestrictionLyr = PointRestrictionsLayer_1.initLayer(config.pointRestrictions);
    const cameraLyr = CameraLayer_1.initLayer(config.cameras);
    const roadAlertsLyr = RoadAlertsLayer_1.initLayer(config.roadAlerts);
    const fireIncidentLayer = FireIncidentLayer_1.initLayer(config.fireIncidents);
    const firePerimeterIDs = yield firePerimeterQuery_1.default(fireIncidentLayer);
    const firePerimetersLayer = FirePerimeterLayer_1.initLayer(config.firePerimeters, firePerimeterIDs); //Needed to filter fire perimeters to just those within the state
    const mileMarkersLayer = MileMarkersLayer_1.initLayer(config.mileMarkers);
    const mileMarkersOneTenthLayer = MileMarkersLayer_1.initLayer(config.mileMarkersOneTenth);
    const mileMarkersOneMileLayer = MileMarkersLayer_1.initLayer(config.mileMarkersOneMile);
    const mileMarkersFiveMileLayer = MileMarkersLayer_1.initLayer(config.mileMarkersFiveMile);
    const mileMarkersTenMileLayer = MileMarkersLayer_1.initLayer(config.mileMarkersTenMile);
    const esriRoadsReferenceLayer = RoadsReferenceLayer_1.initLayer(config.esriRoadsReferenceLayer);
    const esriPlacesReferenceLayer = BoundariesPlacesReferenceLayer_1.initLayer(config.esriPlacesReferenceLayer);
    exports.webmap.addMany([esriRoadsReferenceLayer, esriPlacesReferenceLayer, trafficLyr, mileMarkersLayer, firePerimetersLayer, fireIncidentLayer,
        restAreasLyr, parkRideLyr, weatherLyr, mtLyr, travelTimesLyr, lineRestrictionLyr,
        pointRestrictionLyr, cameraLyr, roadAlertsLyr]);
});
exports.loadOperationalLayers = loadOperationalLayers;
/**
 * Reload GeoJSON layers that are updated frequently.
 */
const reloadGeoJsonLayers = (layerList) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const config = yield appConfigUtil_1.getConfig();
    reloadGeoJsonLayer("road-alerts-layer", config.roadAlerts, RoadAlertsLayer_1.initLayer, layerList);
    reloadGeoJsonLayer("line-restrictions-layer", config.lineRestrictions, LineRestrictionsLayer_1.initLayer, layerList);
    reloadGeoJsonLayer("point-restrictions-layer", config.pointRestrictions, PointRestrictionsLayer_1.initLayer, layerList);
    reloadGeoJsonLayer("mountain-passes-layer", config.mountainPasses, MountainPassesLayer_1.initLayer, layerList);
    reloadGeoJsonLayer("travel-times-layer", config.travelTimes, TravelTimeLayer_1.initLayer, layerList);
    reloadGeoJsonLayer("weather-stations-layer", config.weatherStations, WeatherStationsLayer_1.initLayer, layerList);
    /* Camera layer is not updated frequently, but need to be reloaded.
    If not, the cluster label does not show after other layers are refreshed. */
    reloadGeoJsonLayer("traffic-camera-layer", config.cameras, CameraLayer_1.initLayer, layerList);
    CameraLayer_1.setCluster(exports.mapView.scale);
    return layerList;
});
exports.reloadGeoJsonLayers = reloadGeoJsonLayers;
const reloadGeoJsonLayer = (id, layerUrl, initFunc, layerList) => {
    const lyr = exports.getLayer(id);
    if (lyr.type === "geojson") {
        const lyrIdx = exports.webmap.layers.indexOf(lyr);
        const visible = lyr.visible;
        // Destroys the layer and remove it from the map...
        lyr.destroy();
        const newLyr = initFunc(layerUrl);
        newLyr.visible = visible;
        exports.webmap.add(newLyr, lyrIdx);
        // Update the layer list with the new layer object...
        const lyrInfo = layerList.find((eachInfo) => {
            return eachInfo.id === id;
        });
        if (lyrInfo) {
            lyrInfo.id = newLyr.id;
            lyrInfo.title = newLyr.title;
            lyrInfo.visible = newLyr.visible;
        }
    }
    else {
        throw id + " is not a GeoJSON layer.";
    }
};
const tryZoomToPoint = (point, numLevels) => {
    let isSuccess = true;
    if (!numLevels) {
        numLevels = 1;
    }
    exports.mapView.center = point;
    const orgLevel = exports.mapView.zoom;
    exports.mapView.zoom = exports.mapView.zoom += numLevels;
    if (exports.mapView.zoom === orgLevel) {
        // Cannot zoom in any more.
        isSuccess = false;
    }
    return isSuccess;
};
exports.tryZoomToPoint = tryZoomToPoint;
const tryZoomToPointAsync = (point, numLevels) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let isSuccess = true;
    if (!numLevels) {
        numLevels = 1;
    }
    const orgLevel = exports.mapView.zoom;
    yield exports.mapView.goTo({
        target: point,
        zoom: exports.mapView.zoom += 1
    }, {
        duration: 300,
        easing: "ease-in"
    }).catch((error) => {
        console.error("tryZoomToPointAsync failed: " + error);
    });
    if (exports.mapView.zoom === orgLevel) {
        // Cannot zoom in any more.
        isSuccess = false;
    }
    return isSuccess;
});
exports.tryZoomToPointAsync = tryZoomToPointAsync;
const zoomToMax = (point) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield exports.mapView.goTo({
        target: point,
        scale: exports.getMaxScale()
    }, {
        duration: 300,
        easing: "ease-in"
    }).catch((error) => {
        console.error("zoomToMax failed: " + error);
    });
});
exports.zoomToMax = zoomToMax;
const zoomToMetroArea = (extent) => {
    exports.mapView.extent = extent.expand(2);
    ZoomExtentLayer_1.default.visible = false;
    // Remember the scale zoomed into so it can detect when map is zoomed out.
    const zoomExtentLayerMaxZoom = exports.mapView.zoom;
    // Set watch to make the layer visible again when user zoom out 2+ levels.
    const watchHandle = watchUtils_1.whenTrue(exports.mapView, "stationary", () => {
        // Note: Allow users to zoom out one level without showing the extent box, so they still click on features.
        if (exports.mapView.zoom < zoomExtentLayerMaxZoom - 1) {
            ZoomExtentLayer_1.default.visible = true;
            // Watch is no longer needed.
            watchHandle.remove();
        }
    });
};
exports.zoomToMetroArea = zoomToMetroArea;
let maxScale = 0;
const getMaxScale = () => {
    if (maxScale > 0) {
        return maxScale;
    }
    else {
        const info = Basemaps_1.getBasemapInfo("wsdot");
        const lyr = info.basemap.baseLayers.getItemAt(0);
        const tile = lyr;
        maxScale = tile.maxScale;
        return maxScale;
    }
};
exports.getMaxScale = getMaxScale;
const toScreenXY = (mapX, mapY) => {
    const pt = new Point_1.default({ x: mapX, y: mapY, spatialReference: SpatialReference_1.default.WebMercator });
    const screenPt = exports.mapView.toScreen(pt);
    return { x: screenPt.x, y: screenPt.y };
};
exports.toScreenXY = toScreenXY;
const panMap = (shiftX, shiftY) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const screenCenter = exports.mapView.toScreen(exports.mapView.center);
    const mapCenter = exports.mapView.toMap({
        x: screenCenter.x - shiftX,
        y: screenCenter.y - shiftY,
    });
    yield exports.mapView.goTo(mapCenter, {
        duration: 300,
        easing: "ease-in"
    }).catch((error) => {
        const err = "panMap failed: " + error;
        console.error(err);
        return err;
    });
    return "success";
});
exports.panMap = panMap;
const getLayer = (id) => {
    return exports.webmap.findLayerById(id);
};
exports.getLayer = getLayer;
/**
NOTE: This function only returns each feature if one of the following coditions is met:
- maxCount is not set
- The number of features is less than the maxCount.
- All the features are at the identical location.
*/
const getIdsFromCluster = (clusterGraphic, layer, maxCount) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const lyr = layer;
    if (!lyr) {
        throw "Invalid layer type was specified.";
    }
    const layerView = yield exports.mapView.whenLayerView(lyr);
    const query = layerView.createQuery();
    // Object ID of the cluster...
    query.aggregateIds = [clusterGraphic.getObjectId()];
    query.outFields = [lyr.objectIdField];
    const result = yield layerView.queryFeatures(query);
    let doReturn = false;
    if (!maxCount || result.features.length <= maxCount) {
        doReturn = true;
    }
    else {
        let identical = true;
        const pt0 = result.features[0].geometry;
        for (let i = 1; i < result.features.length; i++) {
            identical = pt0.equals(result.features[i].geometry);
            if (!identical) {
                break;
            }
        }
        if (identical) {
            // All points are located on the same spot!
            doReturn = true;
        }
        //else { //console.log("Points are not identical."); }
    }
    if (doReturn) {
        const ids = result.features.map((feature) => { return feature.attributes[lyr.objectIdField]; });
        return ids;
    }
});
exports.getIdsFromCluster = getIdsFromCluster;
const bufferByPixels = (distancePixel, screenPoint, mapPoint) => {
    if (!screenPoint && mapPoint) {
        screenPoint = exports.mapView.toScreen(mapPoint);
    }
    if (!mapPoint && screenPoint) {
        mapPoint = exports.mapView.toMap(screenPoint);
    }
    if (screenPoint && mapPoint) {
        const ptShift = exports.mapView.toMap({ x: screenPoint.x + distancePixel, y: screenPoint.y });
        const mapDist = Math.abs(ptShift.x - mapPoint.x);
        const outBuff = geometryEngine_1.geodesicBuffer(mapPoint, mapDist, "meters");
        return outBuff;
    }
    else {
        throw "Need to specify either screen or map point.";
    }
};
exports.bufferByPixels = bufferByPixels;
/** Highlight feature */
let highlight;
const highlightFeature = (featureInfo) => {
    const layer = exports.getLayer(featureInfo.layerId);
    exports.mapView.whenLayerView(layer).then((layerView) => {
        const query = layer.createQuery();
        query.where = `${layer.objectIdField} = ${featureInfo.id}`;
        layer.queryFeatures(query).then((result) => {
            if (highlight) {
                highlight.remove();
            }
            highlight = layerView.highlight(result.features);
        });
    });
};
exports.highlightFeature = highlightFeature;
const removeHighlight = () => {
    if (highlight) {
        highlight.remove();
    }
};
exports.removeHighlight = removeHighlight;
//# sourceMappingURL=esriMap.js.map