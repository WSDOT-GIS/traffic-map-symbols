import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Point from "@arcgis/core/geometry/Point";
import { whenTrue } from "@arcgis/core/core/watchUtils";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Layer from "@arcgis/core/layers/Layer";
import EsriConfig from "@arcgis/core/config"
import Graphic from "@arcgis/core/Graphic";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";

import TrafficLayer from "@/layers/TrafficLayer";
import ParkRideLayer from "@/layers/ParkRideLayer";
import CameraLayer from "@/layers/CameraLayer";
import PointRestrictionsLayer from "@/layers/PointRestrictionsLayer";
import LineRestrictionsLayer from "@/layers/LineRestrictionsLayer";
import WeatherStationsLayer from "@/layers/WeatherStationsLayer";
import MountainPassLayer from "@/layers/MountainPassesLayer";
import ExtentInfo from "@/types/ExtentInfo";
import { convert2EsriExtent } from "@/utils/extentUtil";
import ZoomExtentLayer from "@/layers/ZoomExtentLayer";


EsriConfig.apiKey = "AAPKe21082c738fb4109b735927e25b79af5ytyQa1mQmL2NrH3i0u_AptcnZJvkusIlaLc7gZOI9zszvKJfAwkWJB5zUzP6-V73";

export const webmap = new WebMap({
    layers: [TrafficLayer, ParkRideLayer, CameraLayer, PointRestrictionsLayer, LineRestrictionsLayer, WeatherStationsLayer, MountainPassLayer],
});

export const mapView = new MapView({
    container: "esri-map-view",
    map: webmap,
    constraints: {
        //rotationEnabled: false
    }
});

// Zoom buttons are replaced with the custom Vue components.
mapView.ui.remove("zoom");

export const init = (container: HTMLDivElement): void => {
    mapView.container = container;
    mapView.when()
        .then(x => {
            console.log("Map is ready. " + typeof (x));
        })
        .catch(error => {
            console.warn("Failed to initialize map. Error: ", error);
        });
};

export const tryZoomToPoint = (point: Point, numLevels?: number): boolean => {
    let isSuccess = true;
    if (!numLevels) {
        numLevels = 1;
    }
    mapView.center = point;
    const orgLevel = mapView.zoom;
    mapView.zoom = mapView.zoom += numLevels;
    // Tried goTo() as well, but it is a bit jumpy...
    // esriMap.mapView.goTo({
    //   target: cameraGraphic,
    //   zoom: esriMap.mapView.zoom += 1
    // }, {
    //   duration: 1000,
    //   easing: "ease-out"
    // });
    if (mapView.zoom === orgLevel) {
        console.log("Cannot zoom in any more.");
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

export const panMap = async (shiftX: number, shiftY: number):Promise<any> => {
    console.log("Shift X: " + shiftX + ", Y: " + shiftY);
    const screenCenter = mapView.toScreen(mapView.center);
    console.log(
        "Screen Center X: " + screenCenter.x + ", Y: " + screenCenter.y
    );
    const mapCenter = mapView.toMap({
        x: screenCenter.x + shiftX,
        y: screenCenter.y + shiftY,
    });
    //mapView.center = mapCenter;
    await mapView.goTo(mapCenter, {
        duration: 300,
        easing: "ease-in"
    });
    console.log("Map center X: " + mapCenter.x + ", Y: " + mapCenter.y);
}

export const getLayer = (id: string): Layer => {
    return webmap.findLayerById(id);
}

/* 
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
            console.log("All points are located on the same spot!");
            doReturn = true;
        }
        else { console.log("Points are not identical."); }
    }
    if (doReturn) {
        const ids = result.features.map((feature) => { return feature.attributes[lyr.objectIdField]; })
        return ids;
    }
}
