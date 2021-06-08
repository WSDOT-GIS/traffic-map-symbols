define(["require", "exports", "tslib", "@arcgis/core/WebMap", "@arcgis/core/views/MapView", "@/utils/extentUtil", "@/layers/Basemaps", "@/layers/TrafficLayer", "@/layers/ParkRideLayer", "@/layers/CameraLayer"], function (require, exports, tslib_1, WebMap_1, MapView_1, extentUtil_1, Basemaps_1, TrafficLayer_1, ParkRideLayer_1, CameraLayer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.init = exports.mapView = exports.webmap = void 0;
    WebMap_1 = tslib_1.__importDefault(WebMap_1);
    MapView_1 = tslib_1.__importDefault(MapView_1);
    TrafficLayer_1 = tslib_1.__importDefault(TrafficLayer_1);
    ParkRideLayer_1 = tslib_1.__importDefault(ParkRideLayer_1);
    CameraLayer_1 = tslib_1.__importDefault(CameraLayer_1);
    // What is this used for?
    //EsriConfig.apiKey = "AAPKe21082c738fb4109b735927e25b79af5ytyQa1mQmL2NrH3i0u_AptcnZJvkusIlaLc7gZOI9zszvKJfAwkWJB5zUzP6-V73";
    exports.webmap = new WebMap_1.default({
        basemap: Basemaps_1.wsdotBasemap,
        layers: [TrafficLayer_1.default, ParkRideLayer_1.default, CameraLayer_1.default],
    });
    exports.mapView = new MapView_1.default({
        container: "map_view",
        map: exports.webmap,
        // extent: {
        //     ymax: 6316025.98739708,
        //     xmin: -13911155.7073957,
        //     xmax: -12984203.1967109,
        //     ymin: 5704865.77272526,
        //     spatialReference: { wkid: 102100 },
        // },
    });
    exports.mapView.extent = extentUtil_1.GetEsriExtent("full");
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
    var init = function (container) {
        exports.mapView.container = container;
        exports.mapView.when()
            .then(function (_) {
            console.log("Map is ready.");
        })
            .catch(function (error) {
            console.warn("Failed to initialize map. Error: ", error);
        });
    };
    exports.init = init;
});
//# sourceMappingURL=esriMap.js.map