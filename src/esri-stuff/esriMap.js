"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeHighlight = exports.highlightFeature = exports.bufferByPixels = exports.getIdsFromCluster = exports.getLayer = exports.panMap = exports.toScreenXY = exports.zoomOnClick = exports.tryZoomToPointAsync = exports.tryZoomToPoint = exports.init = exports.mapView = exports.webmap = void 0;
const tslib_1 = require("tslib");
const WebMap_1 = tslib_1.__importDefault(require("@arcgis/core/WebMap"));
const MapView_1 = tslib_1.__importDefault(require("@arcgis/core/views/MapView"));
const Point_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/Point"));
const geometryEngine_1 = require("@arcgis/core/geometry/geometryEngine");
const watchUtils_1 = require("@arcgis/core/core/watchUtils");
const SpatialReference_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/SpatialReference"));
const config_1 = tslib_1.__importDefault(require("@arcgis/core/config"));
const TrafficLayer_1 = tslib_1.__importDefault(require("@/layers/TrafficLayer"));
const ParkRideLayer_1 = tslib_1.__importDefault(require("@/layers/ParkRideLayer"));
const CameraLayer_1 = tslib_1.__importDefault(require("@/layers/CameraLayer"));
const RestAreasLayer_1 = tslib_1.__importDefault(require("@/layers/RestAreasLayer"));
const PointRestrictionsLayer_1 = tslib_1.__importDefault(require("@/layers/PointRestrictionsLayer"));
const RoadAlertLayer_1 = tslib_1.__importDefault(require("@/layers/RoadAlertLayer"));
const LineRestrictionsLayer_1 = tslib_1.__importDefault(require("@/layers/LineRestrictionsLayer"));
const WeatherStationsLayer_1 = tslib_1.__importDefault(require("@/layers/WeatherStationsLayer"));
const MountainPassesLayer_1 = tslib_1.__importDefault(require("@/layers/MountainPassesLayer"));
const extentUtil_1 = require("@/utils/extentUtil");
const ZoomExtentLayer_1 = tslib_1.__importDefault(require("@/layers/ZoomExtentLayer"));
config_1.default.apiKey = "AAPKe21082c738fb4109b735927e25b79af5ytyQa1mQmL2NrH3i0u_AptcnZJvkusIlaLc7gZOI9zszvKJfAwkWJB5zUzP6-V73";
console.log(globalThis.map);
exports.webmap = new WebMap_1.default({
    layers: [TrafficLayer_1.default, RestAreasLayer_1.default, ParkRideLayer_1.default, WeatherStationsLayer_1.default, MountainPassesLayer_1.default, LineRestrictionsLayer_1.default, PointRestrictionsLayer_1.default, CameraLayer_1.default, RoadAlertLayer_1.default],
});
exports.mapView = new MapView_1.default({
    container: "esri-map-view",
    map: exports.webmap,
    constraints: {
        rotationEnabled: false // Disables map rotation
    }
});
// Zoom buttons are replaced with the custom Vue components.
exports.mapView.ui.remove("zoom");
const init = (container) => {
    exports.mapView.container = container;
    exports.mapView.when()
        .then(x => {
        console.log("Map is ready. " + typeof (x));
    })
        .catch(error => {
        console.warn("Failed to initialize map. Error: ", error);
    });
};
exports.init = init;
const tryZoomToPoint = (point, numLevels) => {
    let isSuccess = true;
    if (!numLevels) {
        numLevels = 1;
    }
    exports.mapView.center = point;
    const orgLevel = exports.mapView.zoom;
    exports.mapView.zoom = exports.mapView.zoom += numLevels;
    if (exports.mapView.zoom === orgLevel) {
        //console.log("Cannot zoom in any more.");
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
        //console.log("Cannot zoom in any more.");
        isSuccess = false;
    }
    return isSuccess;
});
exports.tryZoomToPointAsync = tryZoomToPointAsync;
const zoomOnClick = (extentInfo) => {
    const extent = extentUtil_1.convert2EsriExtent(extentInfo);
    exports.mapView.extent = extent;
    ZoomExtentLayer_1.default.visible = false;
    // Remember the scale zoomed into so it can detect when map is zoomed out.
    const zoomExtentLayerMaxScale = exports.mapView.scale;
    // Set watch to make the layer visible again when user zoomed out.
    const watchHandle = watchUtils_1.whenTrue(exports.mapView, "stationary", () => {
        if (exports.mapView.scale > zoomExtentLayerMaxScale) {
            ZoomExtentLayer_1.default.visible = true;
            // Watch is no longer needed.
            watchHandle.remove();
        }
    });
};
exports.zoomOnClick = zoomOnClick;
const toScreenXY = (mapX, mapY) => {
    const pt = new Point_1.default({ x: mapX, y: mapY, spatialReference: SpatialReference_1.default.WebMercator });
    const screenPt = exports.mapView.toScreen(pt);
    return { x: screenPt.x, y: screenPt.y };
};
exports.toScreenXY = toScreenXY;
const panMap = (shiftX, shiftY) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    //console.log("panMap X: " + shiftX + ", Y: " + shiftY);
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
/*
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
            //console.log("All points are located on the same spot!");
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
        // console.log("Map distance: " + mapDist);
        const outBuff = geometryEngine_1.geodesicBuffer(mapPoint, mapDist, "meters");
        return outBuff;
    }
    else {
        throw "Need to specify either screen or map point.";
    }
};
exports.bufferByPixels = bufferByPixels;
let highlight;
const highlightFeature = (featureInfo) => {
    const layer = exports.getLayer(featureInfo.layerId);
    exports.mapView.whenLayerView(layer).then((layerView) => {
        const query = layer.createQuery();
        query.where = `${layer.objectIdField} = ${featureInfo.id}`;
        // query.where = `${idName} IN ( ${ids.join(",")})`;
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