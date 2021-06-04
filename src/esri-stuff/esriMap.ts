// import EsriConfig from "@arcgis/core/config";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Expand from "@arcgis/core/widgets/Expand";

import { GetEsriExtent } from "@/utils/extentUtil";
import { wsdotBasemap } from "@/layers/Basemaps";
import TrafficLayer from "@/layers/TrafficLayer";
import ParkRideLayer from "@/layers/ParkRideLayer";
import CameraLayer from "@/layers/CameraLayer";
import Extent from "@arcgis/core/geometry/Extent";

// What is this used for?
//EsriConfig.apiKey = "AAPKe21082c738fb4109b735927e25b79af5ytyQa1mQmL2NrH3i0u_AptcnZJvkusIlaLc7gZOI9zszvKJfAwkWJB5zUzP6-V73";

export const webmap = new WebMap({
    basemap: wsdotBasemap,
    layers: [TrafficLayer, ParkRideLayer, CameraLayer],
});

export const mapView = new MapView({
    container: "map_view", // https://v3.vuejs.org/api/instance-properties.html
    map: webmap,
    // extent: {
    //     ymax: 6316025.98739708,
    //     xmin: -13911155.7073957,
    //     xmax: -12984203.1967109,
    //     ymin: 5704865.77272526,
    //     spatialReference: { wkid: 102100 },
    // },
});

mapView.extent = GetEsriExtent("full");

const bookmarks = new Bookmarks({
    view: mapView,
    editingEnabled: true,
});

const bookmarkExpand = new Expand({
    view: mapView,
    content: bookmarks,
    expanded: false,
});

mapView.ui.add(bookmarkExpand, "top-right");

export const init = (container: HTMLDivElement) => {
    mapView.container = container;
    mapView.when()
        .then(_ => {
            console.log("Map is ready.");
        })
        .catch(error => {
            console.warn("Failed to initialize map. Error: ", error);
        });
};