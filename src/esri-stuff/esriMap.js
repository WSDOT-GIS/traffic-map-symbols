define(["require", "exports", "tslib", "@arcgis/core/WebMap", "@arcgis/core/views/MapView", "@/layers/TrafficLayer", "@/layers/ParkRideLayer", "@/layers/CameraLayer", "@/layers/PointRestrictionsLayer", "@/layers/LineRestrictionsLayer", "@/layers/WeatherStationsLayer"], function (require, exports, tslib_1, WebMap_1, MapView_1, TrafficLayer_1, ParkRideLayer_1, CameraLayer_1, PointRestrictionsLayer_1, LineRestrictionsLayer_1, WeatherStationsLayer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.init = exports.mapView = exports.webmap = void 0;
    WebMap_1 = tslib_1.__importDefault(WebMap_1);
    MapView_1 = tslib_1.__importDefault(MapView_1);
    TrafficLayer_1 = tslib_1.__importDefault(TrafficLayer_1);
    ParkRideLayer_1 = tslib_1.__importDefault(ParkRideLayer_1);
    CameraLayer_1 = tslib_1.__importDefault(CameraLayer_1);
    PointRestrictionsLayer_1 = tslib_1.__importDefault(PointRestrictionsLayer_1);
    LineRestrictionsLayer_1 = tslib_1.__importDefault(LineRestrictionsLayer_1);
    WeatherStationsLayer_1 = tslib_1.__importDefault(WeatherStationsLayer_1);
    // What is this used for?
    //EsriConfig.apiKey = "AAPKe21082c738fb4109b735927e25b79af5ytyQa1mQmL2NrH3i0u_AptcnZJvkusIlaLc7gZOI9zszvKJfAwkWJB5zUzP6-V73";
    exports.webmap = new WebMap_1.default({
        // basemap: basemapInfo.basemap,
        layers: [TrafficLayer_1.default, ParkRideLayer_1.default, CameraLayer_1.default, PointRestrictionsLayer_1.default, LineRestrictionsLayer_1.default, WeatherStationsLayer_1.default],
    });
    exports.mapView = new MapView_1.default({
        container: "map_view",
        map: exports.webmap,
    });
    exports.mapView.on("click", (function () {
        exports.mapView.graphics.removeAll();
    }));
    exports.mapView.ui.move("zoom", "bottom-right");
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
            .then(function (x) {
            console.log("Map is ready. " + typeof (x));
        })
            .catch(function (error) {
            console.warn("Failed to initialize map. Error: ", error);
        });
    };
    exports.init = init;
});
//# sourceMappingURL=esriMap.js.map