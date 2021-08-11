import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Point from "@arcgis/core/geometry/Point";
import { geodesicBuffer } from "@arcgis/core/geometry/geometryEngine";
import { whenTrue } from "@arcgis/core/core/watchUtils";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import EsriConfig from "@arcgis/core/config";
// Layers
import TrafficLayer from "@/layers/TrafficLayer";
import { initLayer as initParkRideLayer } from "@/layers/ParkRideLayer";
import { initLayer as initCameraLayer } from "@/layers/CameraLayer";
import { initLayer as initRestAreaLayer } from "@/layers/RestAreasLayer";
import { initLayer as initPointRestrictionsLayer } from "@/layers/PointRestrictionsLayer";
import { initLayer as initRoadAlertsLayer } from "@/layers/RoadAlertsLayer";
import { initLayer as initLineRestrictionsLayer } from "@/layers/LineRestrictionsLayer";
import { initLayer as initWeatherLayer } from "@/layers/WeatherStationsLayer";
import { initLayer as initMountainLayer } from "@/layers/MountainPassesLayer";
import { convert2EsriExtent, getEsriExtent } from "@/utils/extentUtil";
import ZoomExtentLayer from "@/layers/ZoomExtentLayer";
EsriConfig.apiKey = "AAPKe21082c738fb4109b735927e25b79af5ytyQa1mQmL2NrH3i0u_AptcnZJvkusIlaLc7gZOI9zszvKJfAwkWJB5zUzP6-V73";
export const webmap = new WebMap({
//layers: [TrafficLayer, RestAreasLayer, ParkRideLayer, WeatherStationsLayer, MountainPassLayer, LineRestrictionsLayer, PointRestrictionsLayer, CameraLayer, RoadAlertsLayer],
});
export const mapView = new MapView({
    container: "esri-map-view",
    map: webmap,
    extent: getEsriExtent("full"),
    constraints: {
        rotationEnabled: false // Disables map rotation
    }
});
// Zoom buttons are replaced with the custom Vue components.
mapView.ui.remove("zoom");
export const init = (container) => {
    mapView.container = container;
    mapView.when()
        .then(x => {
        console.log("Map is ready. " + typeof (x));
    })
        .catch(error => {
        console.warn("Failed to initialize map. Error: ", error);
    });
};
export const loadOperationalLayers = async () => {
    const fetchResponse = await fetch("/appconfig.json");
    const config = await fetchResponse.json();
    const restAreasLyr = initRestAreaLayer(config.restAreas);
    const parkRideLyr = initParkRideLayer(config.parkAndRides);
    const weatherLyr = initWeatherLayer(config.weatherStations);
    const mtLyr = initMountainLayer(config.mountainPasses);
    const lineRestrictionLyr = initLineRestrictionsLayer(config.lineRestrictions);
    const pointRestrictionLyr = initPointRestrictionsLayer(config.pointRestrictions);
    const cameraLyr = initCameraLayer(config.cameras);
    const roadAlertsLyr = initRoadAlertsLayer(config.roadAlerts);
    webmap.addMany([TrafficLayer, restAreasLyr, parkRideLyr, weatherLyr, mtLyr, lineRestrictionLyr, pointRestrictionLyr, cameraLyr, roadAlertsLyr]);
};
export const tryZoomToPoint = (point, numLevels) => {
    let isSuccess = true;
    if (!numLevels) {
        numLevels = 1;
    }
    mapView.center = point;
    const orgLevel = mapView.zoom;
    mapView.zoom = mapView.zoom += numLevels;
    if (mapView.zoom === orgLevel) {
        //console.log("Cannot zoom in any more.");
        isSuccess = false;
    }
    return isSuccess;
};
export const tryZoomToPointAsync = async (point, numLevels) => {
    let isSuccess = true;
    if (!numLevels) {
        numLevels = 1;
    }
    const orgLevel = mapView.zoom;
    await mapView.goTo({
        target: point,
        zoom: mapView.zoom += 1
    }, {
        duration: 300,
        easing: "ease-in"
    }).catch((error) => {
        console.error("tryZoomToPointAsync failed: " + error);
    });
    if (mapView.zoom === orgLevel) {
        //console.log("Cannot zoom in any more.");
        isSuccess = false;
    }
    return isSuccess;
};
export const zoomOnClick = (extentInfo) => {
    const extent = convert2EsriExtent(extentInfo);
    mapView.extent = extent;
    ZoomExtentLayer.visible = false;
    // Remember the scale zoomed into so it can detect when map is zoomed out.
    const zoomExtentLayerMaxScale = mapView.scale;
    // Set watch to make the layer visible again when user zoomed out.
    const watchHandle = whenTrue(mapView, "stationary", () => {
        if (mapView.scale > zoomExtentLayerMaxScale) {
            ZoomExtentLayer.visible = true;
            // Watch is no longer needed.
            watchHandle.remove();
        }
    });
};
export const toScreenXY = (mapX, mapY) => {
    const pt = new Point({ x: mapX, y: mapY, spatialReference: SpatialReference.WebMercator });
    const screenPt = mapView.toScreen(pt);
    return { x: screenPt.x, y: screenPt.y };
};
export const panMap = async (shiftX, shiftY) => {
    //console.log("panMap X: " + shiftX + ", Y: " + shiftY);
    const screenCenter = mapView.toScreen(mapView.center);
    const mapCenter = mapView.toMap({
        x: screenCenter.x - shiftX,
        y: screenCenter.y - shiftY,
    });
    await mapView.goTo(mapCenter, {
        duration: 300,
        easing: "ease-in"
    }).catch((error) => {
        const err = "panMap failed: " + error;
        console.error(err);
        return err;
    });
    return "success";
};
export const getLayer = (id) => {
    return webmap.findLayerById(id);
};
/*
NOTE: This function only returns each feature if one of the following coditions is met:
- maxCount is not set
- The number of features is less than the maxCount.
- All the features are at the identical location.
*/
export const getIdsFromCluster = async (clusterGraphic, layer, maxCount) => {
    const lyr = layer;
    if (!lyr) {
        throw "Invalid layer type was specified.";
    }
    const layerView = await mapView.whenLayerView(lyr);
    const query = layerView.createQuery();
    // Object ID of the cluster...
    query.aggregateIds = [clusterGraphic.getObjectId()];
    query.outFields = [lyr.objectIdField];
    const result = await layerView.queryFeatures(query);
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
};
export const bufferByPixels = (distancePixel, screenPoint, mapPoint) => {
    if (!screenPoint && mapPoint) {
        screenPoint = mapView.toScreen(mapPoint);
    }
    if (!mapPoint && screenPoint) {
        mapPoint = mapView.toMap(screenPoint);
    }
    if (screenPoint && mapPoint) {
        const ptShift = mapView.toMap({ x: screenPoint.x + distancePixel, y: screenPoint.y });
        const mapDist = Math.abs(ptShift.x - mapPoint.x);
        // console.log("Map distance: " + mapDist);
        const outBuff = geodesicBuffer(mapPoint, mapDist, "meters");
        return outBuff;
    }
    else {
        throw "Need to specify either screen or map point.";
    }
};
/** Highlight feature */
let highlight;
export const highlightFeature = (featureInfo) => {
    const layer = getLayer(featureInfo.layerId);
    mapView.whenLayerView(layer).then((layerView) => {
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
export const removeHighlight = () => {
    if (highlight) {
        highlight.remove();
    }
};
//# sourceMappingURL=esriMap.js.map