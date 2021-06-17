// import EsriConfig from "@arcgis/core/config";
import WebMap from "@arcgis/core/WebMap";
// import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
// import Bookmarks from "@arcgis/core/widgets/Bookmarks";
// import Expand from "@arcgis/core/widgets/Expand";

import TrafficLayer from "@/layers/TrafficLayer";
import ParkRideLayer from "@/layers/ParkRideLayer";
import CameraLayer from "@/layers/CameraLayer";
const pointRestrictions = new MapImageLayer({
    url:"https://hqolymgis30s.wsdot.loc:6443/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/2",
    visible:true,
    title:"Point Restrictions"
})
const lineRestrictions = new MapImageLayer({
    url:"https://hqolymgis30s.wsdot.loc:6443/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/3",
    visible:true,
    title:"Line Restrictions"
})
// What is this used for?
//EsriConfig.apiKey = "AAPKe21082c738fb4109b735927e25b79af5ytyQa1mQmL2NrH3i0u_AptcnZJvkusIlaLc7gZOI9zszvKJfAwkWJB5zUzP6-V73";

export const webmap = new WebMap({
<<<<<<< HEAD
    // basemap: basemapInfo.basemap,
    layers: [TrafficLayer, ParkRideLayer, CameraLayer, pointRestrictions, lineRestrictions],
=======
    layers: [TrafficLayer, ParkRideLayer, CameraLayer]
>>>>>>> 073e1d03a32392513c2dc4c7c6d259ccd444225c
});

export const mapView = new MapView({
    container: "map_view", // https://v3.vuejs.org/api/instance-properties.html
    map: webmap,
});
<<<<<<< HEAD
mapView.on("click",(()=>{
    mapView.graphics.removeAll()
}))
=======
>>>>>>> 073e1d03a32392513c2dc4c7c6d259ccd444225c
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
