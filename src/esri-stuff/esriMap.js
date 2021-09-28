"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeHighlight = exports.highlightFeature = exports.bufferByPixels = exports.getIdsFromCluster = exports.getLayer = exports.panMap = exports.checkPannedExtent = exports.toPoint = exports.toScreenXY = exports.getMaxScale = exports.zoomToExtent = exports.zoomToMetroArea = exports.zoomToMax = exports.tryZoomToPointAsync = exports.tryZoomToPoint = exports.reloadGeoJsonLayers = exports.loadOperationalLayers = exports.defaultLayerProps = exports.init = exports.mapView = exports.webmap = void 0;
const tslib_1 = require("tslib");
const WebMap_1 = tslib_1.__importDefault(require("@arcgis/core/WebMap"));
const MapView_1 = tslib_1.__importDefault(require("@arcgis/core/views/MapView"));
const Point_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/Point"));
const geometryEngine_1 = require("@arcgis/core/geometry/geometryEngine");
const watchUtils_1 = require("@arcgis/core/core/watchUtils");
const config_1 = tslib_1.__importDefault(require("@arcgis/core/config"));
// Layers
const TrafficLayer_1 = require("@/layers/TrafficLayer");
const ParkRideLayer_1 = require("@/layers/ParkRideLayer");
const CameraLayer_1 = require("@/layers/CameraLayer");
const RestAreasLayer_1 = require("@/layers/RestAreasLayer");
const PointRestrictionsLayer_1 = require("@/layers/PointRestrictionsLayer");
const LineRestrictionsLayer_1 = require("@/layers/LineRestrictionsLayer");
const RoadAlertsLayer_1 = require("@/layers/RoadAlertsLayer");
const RoadAlertsLayer_2 = require("@/layers/RoadAlertsLayer");
const WeatherStationsLayer_1 = require("@/layers/WeatherStationsLayer");
const MountainPassesLayer_1 = require("@/layers/MountainPassesLayer");
const TravelTimeLayer_1 = require("@/layers/TravelTimeLayer");
const FireIncidentLayer_1 = require("@/layers/FireIncidentLayer");
const FirePerimeterLayer_1 = require("@/layers/FirePerimeterLayer");
const MileMarkersLayer_1 = require("@/layers/MileMarkersLayer");
const RoadsReferenceLayer_1 = require("@/layers/RoadsReferenceLayer");
const BoundariesPlacesReferenceLayer_1 = require("@/layers/BoundariesPlacesReferenceLayer");
const StateRouteShields_1 = require("@/layers/StateRouteShields");
const BorderCrossingsLayer_1 = require("@/layers/BorderCrossingsLayer");
const AlertAreaLayer_1 = tslib_1.__importDefault(require("@/layers/AlertAreaLayer"));
const RegionalAlertLayer_1 = require("@/layers/RegionalAlertLayer");
//
const extentUtil_1 = require("@/utils/extentUtil");
const ZoomExtentLayer_1 = tslib_1.__importDefault(require("@/layers/ZoomExtentLayer"));
const appConfigUtil_1 = require("@/utils/appConfigUtil");
const firePerimeterQuery_1 = tslib_1.__importDefault(require("@/utils/firePerimeterQuery"));
const Basemaps_1 = require("@/layers/Basemaps");
const fullExtent = extentUtil_1.getEsriExtent("full");
// Initialize empty map, and load layers later...
exports.webmap = new WebMap_1.default({});
exports.mapView = new MapView_1.default({
    container: "esri-map-view",
    map: exports.webmap,
    extent: fullExtent,
    constraints: {
        rotationEnabled: false,
        // Limit the map navigation. 
        // Note: This still allows navigation beyond the extent, but not infinitely.
        geometry: fullExtent,
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
        // Somehow map does not zoom enough, so set extent again here...
        exports.mapView.extent = fullExtent;
    })
        .catch(error => {
        console.warn("Failed to initialize map. Error: ", error);
    });
};
exports.init = init;
/** Store the default layer visibility. This is used by Saved Map function. */
exports.defaultLayerProps = [];
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
    lineRestrictionLyr.definitionExpression = "1=0"; //hide all features
    const pointRestrictionLyr = PointRestrictionsLayer_1.initLayer(config.pointRestrictions);
    const cameraLyr = CameraLayer_1.initLayer(config.cameras);
    const roadAlertsLyr = RoadAlertsLayer_2.initPriorityLayer(config.roadAlerts);
    const roadClosuresLyr = RoadAlertsLayer_1.initClosureLayer(config.roadAlerts);
    const fireIncidentLayer = FireIncidentLayer_1.initLayer(config.fireIncidents);
    const firePerimeterIDs = yield firePerimeterQuery_1.default(fireIncidentLayer);
    const firePerimetersLayer = FirePerimeterLayer_1.initLayer(config.firePerimeters, firePerimeterIDs); //Needed to filter fire perimeters to just those within the state
    const mileMarkersLayer = MileMarkersLayer_1.initLayer(config.mileMarkers);
    const esriRoadsReferenceLayer = RoadsReferenceLayer_1.initLayer(config.esriRoadsReferenceLayer);
    const esriPlacesReferenceLayer = BoundariesPlacesReferenceLayer_1.initLayer(config.esriPlacesReferenceLayer);
    const stateRouteShieldsLayer = StateRouteShields_1.initLayer(config.stateRouteShieldsLayer);
    const regionalAlertLayer = yield RegionalAlertLayer_1.initLayer(config.regionalAlerts, config.countyBoundaries, config.regionBoundaries);
    // The first one in the array will be displayed at the bottom of the map... 
    const borderCrossingsLayer = BorderCrossingsLayer_1.initLayer(config.borderCrossings);
    exports.webmap.addMany([AlertAreaLayer_1.default(), esriRoadsReferenceLayer, esriPlacesReferenceLayer, trafficLyr, stateRouteShieldsLayer,
        firePerimetersLayer, fireIncidentLayer,
        restAreasLyr, parkRideLyr, weatherLyr, mtLyr, travelTimesLyr, lineRestrictionLyr,
        pointRestrictionLyr, cameraLyr, roadAlertsLyr, roadClosuresLyr,
        mileMarkersLayer, borderCrossingsLayer, regionalAlertLayer]);
    // Store the default visibility...
    exports.webmap.layers.forEach((eachLyr) => {
        exports.defaultLayerProps.push({ id: eachLyr.id, visible: eachLyr.visible });
    });
});
exports.loadOperationalLayers = loadOperationalLayers;
/**
 * Reload GeoJSON layers that are updated frequently.
 */
const reloadGeoJsonLayers = (layerList) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const config = yield appConfigUtil_1.getConfig();
    reloadGeoJsonLayer("road-alerts-layer", config.roadAlerts, RoadAlertsLayer_2.initPriorityLayer, layerList);
    reloadGeoJsonLayer("road-closures-layer", config.roadAlerts, RoadAlertsLayer_1.initClosureLayer, layerList);
    reloadGeoJsonLayer("line-restrictions-layer", config.lineRestrictions, LineRestrictionsLayer_1.initLayer, layerList);
    reloadGeoJsonLayer("point-restrictions-layer", config.pointRestrictions, PointRestrictionsLayer_1.initLayer, layerList);
    reloadGeoJsonLayer("mountain-passes-layer", config.mountainPasses, MountainPassesLayer_1.initLayer, layerList);
    reloadGeoJsonLayer("travel-times-layer", config.travelTimes, TravelTimeLayer_1.initLayer, layerList);
    reloadGeoJsonLayer("weather-stations-layer", config.weatherStations, WeatherStationsLayer_1.initLayer, layerList);
    reloadGeoJsonLayer("border-crossings-layer", config.borderCrossings, BorderCrossingsLayer_1.initLayer, layerList);
    /* Camera layer is not updated frequently, but need to be reloaded.
    If not, the cluster label does not show after other layers are refreshed. */
    //reloadGeoJsonLayer("traffic-camera-layer", config.cameras, initCameraLayer, layerList);
    CameraLayer_1.setCluster(exports.mapView.scale);
    return layerList;
});
exports.reloadGeoJsonLayers = reloadGeoJsonLayers;
const reloadGeoJsonLayer = (id, layerUrl, initFunc, layerList) => {
    const lyr = exports.getLayer(id);
    if (lyr.type === "geojson") {
        const oldlyr = lyr;
        const lyrIdx = exports.webmap.layers.indexOf(oldlyr);
        const visible = oldlyr.visible;
        const definitionExpression = oldlyr.definitionExpression;
        // Destroys the layer and remove it from the map...
        lyr.destroy();
        oldlyr.destroy();
        const newLyr = initFunc(layerUrl);
        newLyr.visible = visible;
        newLyr.definitionExpression = definitionExpression;
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
const zoomToExtent = (extent) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield exports.mapView.goTo(extent, {
        duration: 300,
        easing: "ease-in"
    }).catch((error) => {
        console.error("zoomToExtent failed: " + error);
    });
});
exports.zoomToExtent = zoomToExtent;
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
    //const pt = new Point({ x: mapX, y: mapY, spatialReference: SpatialReference.WebMercator });
    const pt = exports.toPoint(mapX, mapY);
    const screenPt = exports.mapView.toScreen(pt);
    return { x: screenPt.x, y: screenPt.y };
};
exports.toScreenXY = toScreenXY;
const toPoint = (mapX, mapY) => {
    const pt = new Point_1.default({ x: mapX, y: mapY, spatialReference: exports.mapView.spatialReference }); //SpatialReference.WebMercator });
    // console.log(JSON.stringify(pt));
    return pt;
};
exports.toPoint = toPoint;
/**
 * Check the new extent after panning against the max extent allowed and report the direction from the extent.
 * @param shiftX
 * @param shiftY
 * @returns
 * First char: vertical direction = i/n/s (inside/north/south)
 * Second char: horizontal direction = i/w/e (inside/west/east)
 */
const checkPannedExtent = (shiftX, shiftY) => {
    const topLeft = exports.mapView.toMap({ x: -1 * shiftX, y: -1 * shiftY });
    const bottomRight = exports.mapView.toMap({ x: exports.mapView.width - shiftX, y: exports.mapView.height - shiftY });
    // console.log("Top left...");
    const topLeftDir = extentUtil_1.getOutOfBoundDirection(topLeft, fullExtent);
    // console.log("Bottom right...");
    const bottomRightDir = extentUtil_1.getOutOfBoundDirection(bottomRight, fullExtent);
    // Positive = panning down/south => check the top, otherwise check the bottom...
    let outOfBoundsDir = shiftY > 0 ? topLeftDir[0] : bottomRightDir[0];
    // Positive = panning east/right => check the left, otherwise check the right side...
    outOfBoundsDir += shiftX > 0 ? topLeftDir[1] : bottomRightDir[1];
    // console.log("checkPannedExtent " + outOfBoundsDir);
    return outOfBoundsDir;
};
exports.checkPannedExtent = checkPannedExtent;
/**
 * Pan Map using GoTo()
 * @param shiftX
 * positive = pan east, negative = pan west
 * @param shiftY
 * Positive = pan south, negative = pan north
 * @returns
 * If successful or exception, return true/false. Otherwise return the actual amount pan was panned.
 */
const panMap = (shiftX, shiftY) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // console.log("***Pan Map X:" + shiftX + ", Y:" + shiftY);
    const screenCenter = exports.mapView.toScreen(exports.mapView.center);
    const newCenter = exports.mapView.toMap({
        x: screenCenter.x - shiftX,
        y: screenCenter.y - shiftY,
    });
    const oldCenter = exports.mapView.center;
    let tryCount = 0;
    const diffShift = { x: -1, y: -1 };
    const actualShift = { x: 0, y: 0 };
    try {
        while (tryCount < 4 && (Math.abs(diffShift.x) >= 1 || Math.abs(diffShift.y) >= 1)) {
            // console.log("Try " + tryCount + " pan start");
            tryCount++;
            // GoTo() does not work as expected for various reasons, so try it a few times if not successful.
            try {
                yield exports.mapView.goTo(newCenter, {
                    duration: 300,
                    easing: "ease-in"
                });
            }
            catch (err) {
                console.error("mapView.goTo failed: " + err);
            }
            // console.log("Try " + tryCount + " pan finished");
            // Figure out the amount moved in reality...
            const newScreen = exports.mapView.toScreen(exports.mapView.center);
            const oldScreen = exports.mapView.toScreen(oldCenter);
            // console.log("Try " + tryCount + " converted to screen");
            actualShift.x = oldScreen.x - newScreen.x;
            actualShift.y = oldScreen.y - newScreen.y;
            // console.log("Try " + tryCount + " Actual shift " + JSON.stringify(actualShift));
            diffShift.x = shiftX - actualShift.x;
            diffShift.y = shiftY - actualShift.y;
        }
        if (Math.abs(diffShift.x) < 1 && Math.abs(diffShift.y) < 1) {
            //console.log("panMap: success " + JSON.stringify(diffShift));
            return true;
        }
        else {
            console.log("panMap: fail " + JSON.stringify(diffShift));
            return { actualShift: actualShift };
        }
    }
    catch (err) {
        console.error("panMap failed: " + err);
        return false;
    }
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
    //console.log("layer id: " + featureInfo.layerId);
    const layer = exports.getLayer(featureInfo.layerId);
    //console.log("highlight layer: " + layer.title);
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