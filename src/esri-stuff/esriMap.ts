import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import { geodesicBuffer } from "@arcgis/core/geometry/geometryEngine";
import { whenTrue } from "@arcgis/core/core/watchUtils";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Layer from "@arcgis/core/layers/Layer";
import EsriConfig from "@arcgis/core/config"
import Graphic from "@arcgis/core/Graphic";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
// Layers
import { initLayer as initTrafficLayer } from "@/layers/TrafficLayer";
import { initLayer as initParkRideLayer } from "@/layers/ParkRideLayer";
import { initLayer as initCameraLayer, setCluster } from "@/layers/CameraLayer";
import { initLayer as initRestAreaLayer } from "@/layers/RestAreasLayer";
import { initLayer as initPointRestrictionsLayer } from "@/layers/PointRestrictionsLayer";
import { initLayer as initLineRestrictionsLayer } from "@/layers/LineRestrictionsLayer";
import { initLayer as initRoadAlertsLayer } from "@/layers/RoadAlertsLayer";
import { initLayer as initWeatherLayer } from "@/layers/WeatherStationsLayer";
import { initLayer as initMountainLayer } from "@/layers/MountainPassesLayer";
import { initLayer as initTravelTimesLayer } from "@/layers/TravelTimeLayer"
//
import ExtentInfo from "@/types/ExtentInfo";
import { convert2EsriExtent, getEsriExtent } from "@/utils/extentUtil";
import ZoomExtentLayer from "@/layers/ZoomExtentLayer";
import FeatureInfo from "@/types/FeatureInfo";
import { getConfig } from "@/utils/appConfigUtil";
import LayerInfo from "@/types/LayerInfo";

// Initialize empty map, and load layers later...
export const webmap = new WebMap({
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
export const init = (container: HTMLDivElement): void => {
    mapView.container = container;
    mapView.when()
        .then(() => {
            console.log("Map is ready.");
        })
        .catch(error => {
            console.warn("Failed to initialize map. Error: ", error);
        });
};
/**
 * Get config and get apiKey and URL, then initialize layers and add to map...
 */
export const loadOperationalLayers = async (): Promise<void> => {
    const config = await getConfig();
    EsriConfig.apiKey = config.apiKey;
    const trafficLyr = initTrafficLayer(config.traffic, config.layerRefreshMinute);
    const restAreasLyr = initRestAreaLayer(config.restAreas);
    const parkRideLyr = initParkRideLayer(config.parkAndRides);
    const weatherLyr = initWeatherLayer(config.weatherStations);
    const mtLyr = initMountainLayer(config.mountainPasses);
    const travelTimesLyr = initTravelTimesLayer(config.travelTimes)
    const lineRestrictionLyr = initLineRestrictionsLayer(config.lineRestrictions);
    const pointRestrictionLyr = initPointRestrictionsLayer(config.pointRestrictions);
    const cameraLyr = initCameraLayer(config.cameras);
    const roadAlertsLyr = initRoadAlertsLayer(config.roadAlerts)
    webmap.addMany([trafficLyr, restAreasLyr, parkRideLyr, weatherLyr, mtLyr, travelTimesLyr, lineRestrictionLyr,
        pointRestrictionLyr, cameraLyr, roadAlertsLyr]);
}
/**
 * Reload GeoJSON layers that are updated frequently.
 */
export const reloadGeoJsonLayers = async (layerList: LayerInfo[]): Promise<LayerInfo[]> => {
    const config = await getConfig();
    reloadGeoJsonLayer("road-alerts-layer", config.roadAlerts, initRoadAlertsLayer, layerList);
    reloadGeoJsonLayer("line-restrictions-layer", config.lineRestrictions, initLineRestrictionsLayer, layerList);
    reloadGeoJsonLayer("point-restrictions-layer", config.pointRestrictions, initPointRestrictionsLayer, layerList);
    reloadGeoJsonLayer("mountain-passes-layer", config.mountainPasses, initMountainLayer, layerList);
    reloadGeoJsonLayer("travel-times-layer", config.travelTimes, initTravelTimesLayer, layerList);
    reloadGeoJsonLayer("weather-stations-layer", config.weatherStations, initWeatherLayer, layerList);
    /* Camera layer is not updated frequently, but need to be reloaded. 
    If not, the cluster label does not show after other layers are refreshed. */
    reloadGeoJsonLayer("traffic-camera-layer", config.cameras, initCameraLayer, layerList);
    setCluster(mapView.scale);
    return layerList;
}

const reloadGeoJsonLayer = (id: string, layerUrl: string, initFunc: (url: string) => GeoJSONLayer, layerList: LayerInfo[]): void => {
    const lyr = getLayer(id);
    if (lyr.type === "geojson") {
        const lyrIdx = webmap.layers.indexOf(lyr);
        const visible = lyr.visible;
        // Destroys the layer and remove it from the map...
        lyr.destroy();
        const newLyr = initFunc(layerUrl);
        newLyr.visible = visible;
        webmap.add(newLyr, lyrIdx);
        // Update the layer list with the new layer object...
        const lyrInfo = layerList.find((eachInfo) => {
            return eachInfo.id === id;
        })
        if (lyrInfo) {
            lyrInfo.id = newLyr.id;
            lyrInfo.title = newLyr.title;
            lyrInfo.visible = newLyr.visible;
        }
        // console.log(`Reloaded ${lyr.title}`);
    }
    else {
        throw id + " is not a GeoJSON layer."
    }
}

export const tryZoomToPoint = (point: Point, numLevels?: number): boolean => {
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
}

export const tryZoomToPointAsync = async (point: Point, numLevels?: number): Promise<boolean> => {
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
}

export const zoomOnClick = (extentInfo: ExtentInfo): void => {
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

export const toScreenXY = (mapX: number, mapY: number): { x: number, y: number } => {
    const pt = new Point({ x: mapX, y: mapY, spatialReference: SpatialReference.WebMercator });
    const screenPt = mapView.toScreen(pt);
    return { x: screenPt.x, y: screenPt.y };
}

export const panMap = async (shiftX: number, shiftY: number): Promise<string> => {
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
}

export const getLayer = (id: string): Layer => {
    return webmap.findLayerById(id);
}

/**  
NOTE: This function only returns each feature if one of the following coditions is met:
- maxCount is not set 
- The number of features is less than the maxCount.
- All the features are at the identical location.
*/
export const getIdsFromCluster = async (clusterGraphic: Graphic, layer: Layer, maxCount?: number): Promise<number[] | undefined> => {
    const lyr = layer as GeoJSONLayer;
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
        const pt0 = result.features[0].geometry as Point;
        for (let i = 1; i < result.features.length; i++) {
            identical = pt0.equals(result.features[i].geometry as Point)
            if (!identical) { break; }
        }
        if (identical) {
            //console.log("All points are located on the same spot!");
            doReturn = true;
        }
        //else { //console.log("Points are not identical."); }
    }
    if (doReturn) {
        const ids = result.features.map((feature) => { return feature.attributes[lyr.objectIdField]; })
        return ids;
    }
}

export const bufferByPixels = (distancePixel: number, screenPoint?: { x: number, y: number }, mapPoint?: Point): Polygon => {
    if (!screenPoint && mapPoint) {
        screenPoint = mapView.toScreen(mapPoint);
    }
    if (!mapPoint && screenPoint) {
        mapPoint = mapView.toMap(screenPoint);
    }
    if (screenPoint && mapPoint) {
        const ptShift = mapView.toMap({ x: screenPoint.x + distancePixel, y: screenPoint.y });
        const mapDist = Math.abs(ptShift.x - mapPoint.x);
        const outBuff = geodesicBuffer(
            mapPoint,
            mapDist,
            "meters"
        ) as Polygon;
        return outBuff;
    }
    else {
        throw "Need to specify either screen or map point.";
    }

}
/** Highlight feature */
let highlight: __esri.Handle;
export const highlightFeature = (featureInfo: FeatureInfo): void => {
    const layer = getLayer(featureInfo.layerId) as GeoJSONLayer;
    mapView.whenLayerView(layer).then((layerView) => {
        const query = layer.createQuery();
        query.where = `${layer.objectIdField} = ${featureInfo.id}`;
        layer.queryFeatures(query).then((result) => {
            if (highlight) {
                highlight.remove();
            }
            highlight = layerView.highlight(result.features);
        })

    })
}

export const removeHighlight = (): void => {
    if (highlight) {
        highlight.remove();
    }
}
