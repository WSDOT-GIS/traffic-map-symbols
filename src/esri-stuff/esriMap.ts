// import EsriConfig from "@arcgis/core/config";
import WebMap from "@arcgis/core/WebMap";
// import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
// import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
// import Bookmarks from "@arcgis/core/widgets/Bookmarks";
// import Expand from "@arcgis/core/widgets/Expand";
import Point from "@arcgis/core/geometry/Point";
import { whenTrue } from "@arcgis/core/core/watchUtils";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Layer from "@arcgis/core/layers/Layer";

import TrafficLayer from "@/layers/TrafficLayer";
import ParkRideLayer from "@/layers/ParkRideLayer";
import CameraLayer from "@/layers/CameraLayer";
import PointRestrictionsLayer from "@/layers/PointRestrictionsLayer";
import LineRestrictionsLayer from "@/layers/LineRestrictionsLayer";
import WeatherStationsLayer from "@/layers/WeatherStationsLayer"
import ExtentInfo from "@/types/ExtentInfo";
import { convert2EsriExtent } from "@/utils/extentUtil";
import ZoomExtentLayer from "@/layers/ZoomExtentLayer";
// What is this used for?
//EsriConfig.apiKey = "AAPKe21082c738fb4109b735927e25b79af5ytyQa1mQmL2NrH3i0u_AptcnZJvkusIlaLc7gZOI9zszvKJfAwkWJB5zUzP6-V73";

export const webmap = new WebMap({
    // basemap: basemapInfo.basemap,
    layers: [TrafficLayer, ParkRideLayer, CameraLayer, PointRestrictionsLayer, LineRestrictionsLayer, WeatherStationsLayer],
});

export const mapView = new MapView({
    container: "map_view", // https://v3.vuejs.org/api/instance-properties.html
    map: webmap,
});
mapView.on("click", (() => {
    mapView.graphics.removeAll()
}))
mapView.ui.move("zoom", "bottom-right");

// const bookmarks = new Bookmarks({
//     view: mapView,
//     editingEnabled: true,
// });

// const bookmarkExpand = new Expand({
//     view: mapView,
//     content: bookmarks,
//     expanded: false,
// });

// mapView.ui.add(bookmarkExpand, "top-right");

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

export const zoomToPoint = (point: Point, numLevels?: number): void => {
    if (!numLevels) {
        numLevels = 1;
    }
    mapView.center = point;
    mapView.zoom = mapView.zoom += numLevels;
    // Tried goTo() as well, but it is a bit jumpy...
    // esriMap.mapView.goTo({
    //   target: cameraGraphic,
    //   zoom: esriMap.mapView.zoom += 1
    // }, {
    //   duration: 1000,
    //   easing: "ease-out"
    // });
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

export const getLayer = (id: string): Layer => {
    return webmap.findLayerById(id);
}
