"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOutOfExtentLayer = exports.addOutOfExtentLayer = exports.removeHighlight = exports.highlightFeature = exports.bufferByPixels = exports.getIdsFromCluster = exports.getLayer = exports.panMap = exports.checkPannedExtent = exports.toPoint = exports.toScreenXY = exports.getMaxScale = exports.zoomToExtent = exports.zoomToMetroArea = exports.zoomToMax = exports.tryZoomToPointAsync = exports.tryZoomToPoint = exports.refreshLayerData = exports.loadRegionalAlert = exports.loadOperationalLayers = exports.defaultLayerProps = exports.init = exports.mapView = exports.webmap = void 0;
const tslib_1 = require("tslib");
const WebMap_1 = tslib_1.__importDefault(require("@arcgis/core/WebMap"));
const MapView_1 = tslib_1.__importDefault(require("@arcgis/core/views/MapView"));
const Point_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/Point"));
const geometryEngine_1 = require("@arcgis/core/geometry/geometryEngine");
const watchUtils_1 = require("@arcgis/core/core/watchUtils");
const SimpleFillSymbol_1 = tslib_1.__importDefault(require("@arcgis/core/symbols/SimpleFillSymbol"));
const Graphic_1 = tslib_1.__importDefault(require("@arcgis/core/Graphic"));
const GraphicsLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GraphicsLayer"));
const geometryEngine_2 = require("@arcgis/core/geometry/geometryEngine");
// Layers
const TrafficLayer = tslib_1.__importStar(require("@/layers/TrafficLayer"));
const ParkRideLayer = tslib_1.__importStar(require("@/layers/ParkRideLayer"));
const CameraLayer = tslib_1.__importStar(require("@/layers/CameraLayer"));
const PointRestrictionsLayer = tslib_1.__importStar(require("@/layers/PointRestrictionsLayer"));
const LineRestrictionsLayer = tslib_1.__importStar(require("@/layers/LineRestrictionsLayer"));
const RoadAlertsLayer = tslib_1.__importStar(require("@/layers/RoadAlertsLayer"));
const WeatherLayer = tslib_1.__importStar(require("@/layers/WeatherStationsLayer"));
const MountainLayer = tslib_1.__importStar(require("@/layers/MountainPassesLayer"));
// import * as TravelTimesLayer from "@/layers/TravelTimeLayer"
const FireIncidentsLayer = tslib_1.__importStar(require("@/layers/FireIncidentLayer"));
const FirePerimetersLayer = tslib_1.__importStar(require("@/layers/FirePerimeterLayer"));
const MileMakersLayer = tslib_1.__importStar(require("@/layers/MileMarkersLayer"));
const RoadsReferenceLayer = tslib_1.__importStar(require("@/layers/RoadsReferenceLayer"));
const BoundariesPlacesReferenceLayer = tslib_1.__importStar(require("@/layers/BoundariesPlacesReferenceLayer"));
const StateRouteShieldsLayer = tslib_1.__importStar(require("@/layers/StateRouteShields"));
const BorderCrossingsLayer = tslib_1.__importStar(require("@/layers/BorderCrossingsLayer"));
const RegionalAlertLayer = tslib_1.__importStar(require("@/layers/RegionalAlertLayer"));
const RestAreasLayer = tslib_1.__importStar(require("@/layers/RestAreasLayer"));
const FerryRoutesReferenceLayer = tslib_1.__importStar(require("@/layers/ferryRoutesReferenceLayer"));
const LineFerryRoutesLayer = tslib_1.__importStar(require("@/layers/LineFerryRoutesLayer"));
const FerryRoutePointsLayer = tslib_1.__importStar(require("@/layers/PointFerryRoutesLayer"));
//
const extentUtil_1 = require("@/utils/extentUtil");
const ZoomExtentLayer_1 = tslib_1.__importDefault(require("@/layers/ZoomExtentLayer"));
const appConfigUtil_1 = require("@/utils/appConfigUtil");
// import LayerInfo from "@/types/LayerInfo";
const firePerimeterQuery_1 = tslib_1.__importDefault(require("@/utils/firePerimeterQuery"));
const Basemaps_1 = require("@/layers/Basemaps");
const layerUtil = tslib_1.__importStar(require("@/utils/layerUtil"));
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
    // Removed since do not need API Key for now...
    // EsriConfig.apiKey = config.apiKey;
    const trafficLyr = TrafficLayer.initLayer(config.traffic, config.layerRefreshMinute);
    const restAreasLyr = yield RestAreasLayer.initLayer(config.restAreas);
    const parkRideLyr = yield ParkRideLayer.initLayer(config.parkAndRides);
    const weatherLyr = yield WeatherLayer.initLayer(config.weatherStations);
    const mtLyr = yield MountainLayer.initLayer(config.mountainPasses);
    // const travelTimesLyr = await TravelTimesLayer.initLayer(config.travelTimes);
    const lineRestrictionLyr = yield LineRestrictionsLayer.initLayer(config.lineRestrictions);
    const pointRestrictionLyr = yield PointRestrictionsLayer.initLayer(config.pointRestrictions);
    const cameraLyr = yield CameraLayer.initLayer(config.cameras);
    const roadAlertLyrs = yield RoadAlertsLayer.initLayer(config.roadAlerts);
    const fireIncidentLayer = FireIncidentsLayer.initLayer(config.fireIncidents);
    const firePerimeterIDs = yield firePerimeterQuery_1.default(fireIncidentLayer);
    const firePerimetersLayer = FirePerimetersLayer.initLayer(config.firePerimeters, firePerimeterIDs); //Needed to filter fire perimeters to just those within the state
    const mileMarkersLayer = MileMakersLayer.initLayer(config.mileMarkers);
    const esriRoadsReferenceLayer = RoadsReferenceLayer.initLayer(config.esriRoadsReferenceLayer);
    const esriPlacesReferenceLayer = BoundariesPlacesReferenceLayer.initLayer(config.esriPlacesReferenceLayer);
    const stateRouteShieldsLayer = StateRouteShieldsLayer.initLayer(config.stateRouteShieldsLayer);
    const ferryRoutesReferenceLayer = FerryRoutesReferenceLayer.initLayer(config.ferryRoutesReferenceLayer);
    const ferryRouteLinesLayer = LineFerryRoutesLayer.initLayer(config.ferryRouteLines);
    const ferryRoutePointsLayer = FerryRoutePointsLayer.initLayer(config.ferryRoutePoints);
    const borderCrossingsLayer = yield BorderCrossingsLayer.initLayer(config.borderCrossings);
    // The first one in the array will be displayed at the bottom of the map... 
    exports.webmap.addMany([esriRoadsReferenceLayer, esriPlacesReferenceLayer, ferryRoutesReferenceLayer, trafficLyr, stateRouteShieldsLayer,
        firePerimetersLayer, fireIncidentLayer,
        restAreasLyr, parkRideLyr, weatherLyr, mtLyr, /*travelTimesLyr,*/ lineRestrictionLyr,
        pointRestrictionLyr, cameraLyr, roadAlertLyrs.priority, roadAlertLyrs.closure,
        mileMarkersLayer, borderCrossingsLayer, ferryRouteLinesLayer, ferryRoutePointsLayer]);
    // Store the default visibility...
    exports.webmap.layers.forEach((eachLyr) => {
        exports.defaultLayerProps.push({ id: eachLyr.id, visible: eachLyr.visible });
    });
});
exports.loadOperationalLayers = loadOperationalLayers;
/** Load regional alert point and polygon layers separately from the other operation layers. */
const loadRegionalAlert = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const config = yield appConfigUtil_1.getConfig();
    const layers = yield RegionalAlertLayer.initLayer(config.regionalAlerts, config.countyBoundaries, config.regionBoundaries);
    exports.webmap.add(layers.point);
    exports.webmap.add(layers.polygon, 0);
});
exports.loadRegionalAlert = loadRegionalAlert;
/**
 * Reload data for some layers.
 */
const refreshLayerData = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const config = yield appConfigUtil_1.getConfig();
    RoadAlertsLayer.reloadData(config.roadAlerts);
    RegionalAlertLayer.reloadData(config.regionalAlerts, config.countyBoundaries, config.regionBoundaries);
    layerUtil.reloadData(config.pointRestrictions, PointRestrictionsLayer.default());
    layerUtil.reloadData(config.lineRestrictions, LineRestrictionsLayer.default());
    // layerUtil.reloadData(config.travelTimes, TravelTimesLayer.default());
    layerUtil.reloadData(config.mountainPasses, MountainLayer.default());
    layerUtil.reloadData(config.weatherStations, WeatherLayer.default());
    layerUtil.reloadData(config.borderCrossings, BorderCrossingsLayer.default());
});
exports.refreshLayerData = refreshLayerData;
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
/*** grey out outside ***/
const outOfExtentLayer = new GraphicsLayer_1.default();
const displayExtent = extentUtil_1.getEsriExtent("full").expand(1.2);
const addOutOfExtentLayer = () => {
    exports.webmap.add(outOfExtentLayer);
};
exports.addOutOfExtentLayer = addOutOfExtentLayer;
const updateOutOfExtentLayer = () => {
    outOfExtentLayer.removeAll();
    const symbol = new SimpleFillSymbol_1.default({
        style: "solid",
        color: [128, 128, 128, 0.5],
        outline: {
            style: "none"
        }
    });
    const diffGeoms = geometryEngine_2.difference(exports.mapView.extent, displayExtent);
    if (Array.isArray(diffGeoms)) {
        for (const each of diffGeoms) {
            const g = new Graphic_1.default({
                geometry: each,
                symbol: symbol,
            });
            outOfExtentLayer.add(g);
        }
    }
    else {
        const g = new Graphic_1.default({
            geometry: diffGeoms,
            symbol: symbol,
        });
        outOfExtentLayer.add(g);
    }
};
exports.updateOutOfExtentLayer = updateOutOfExtentLayer;
//# sourceMappingURL=esriMap.js.map