// import EsriConfig from "@arcgis/core/config";
import WebMap from "@arcgis/core/WebMap";
// import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
// import Bookmarks from "@arcgis/core/widgets/Bookmarks";
// import Expand from "@arcgis/core/widgets/Expand";
import { whenTrue } from "@arcgis/core/core/watchUtils";

import TrafficLayer from "@/layers/TrafficLayer";
import ParkRideLayer from "@/layers/ParkRideLayer";
import CameraLayer from "@/layers/CameraLayer";
import ZoomExtentLayer from "@/layers/ZoomExtentLayer";
import ExtentInfo from "@/types/ExtentInfo";
import { convert2EsriExtent } from "@/utils/extentUtil";

// What is this used for?
//EsriConfig.apiKey = "AAPKe21082c738fb4109b735927e25b79af5ytyQa1mQmL2NrH3i0u_AptcnZJvkusIlaLc7gZOI9zszvKJfAwkWJB5zUzP6-V73";

export const webmap = new WebMap({
    // basemap: basemapInfo.basemap,
    layers: [TrafficLayer, ParkRideLayer, CameraLayer]
});

export const mapView = new MapView({
    container: "map_view", // https://v3.vuejs.org/api/instance-properties.html
    map: webmap,
});
mapView.ui.move("zoom", "bottom-right");

//mapView.extent = getEsriExtent("full");


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

export const zoomOnClick = (extentInfo: ExtentInfo): void => {
    const extent = convert2EsriExtent(extentInfo);
    mapView.extent = extent;
    ZoomExtentLayer.visible = false;
    const zoomExtentLayerMaxScale = mapView.scale;
    console.log("C:zoomExtentLayerMaxScale = " + zoomExtentLayerMaxScale);
    const watchHandle = whenTrue(mapView, "stationary", () => {
        if (mapView.scale > zoomExtentLayerMaxScale) {
            ZoomExtentLayer.visible = true;
            //zoomExtentLayerMaxScale = -1;
            console.log("C:ZoomExtentLayer.visible = true");
            watchHandle.remove();
            console.log("C:Removed the watch");
        } else {
            console.log("C:stationary = true");
        }
    });
};