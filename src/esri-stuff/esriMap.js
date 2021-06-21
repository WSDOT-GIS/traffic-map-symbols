define(["require", "exports", "tslib", "@arcgis/core/WebMap", "@arcgis/core/views/MapView", "@arcgis/core/layers/MapImageLayer", "@/layers/TrafficLayer", "@/layers/ParkRideLayer", "@/layers/CameraLayer"], function (require, exports, tslib_1, WebMap_1, MapView_1, MapImageLayer_1, TrafficLayer_1, ParkRideLayer_1, CameraLayer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.init = exports.mapView = exports.webmap = void 0;
    WebMap_1 = tslib_1.__importDefault(WebMap_1);
    MapView_1 = tslib_1.__importDefault(MapView_1);
    MapImageLayer_1 = tslib_1.__importDefault(MapImageLayer_1);
    TrafficLayer_1 = tslib_1.__importDefault(TrafficLayer_1);
    ParkRideLayer_1 = tslib_1.__importDefault(ParkRideLayer_1);
    CameraLayer_1 = tslib_1.__importDefault(CameraLayer_1);
    var pointRestrictions = new MapImageLayer_1.default({
        url: "https://hqolymgis30s.wsdot.loc:6443/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/2",
        visible: true,
        title: "Point Restrictions"
    });
    var lineRestrictions = new MapImageLayer_1.default({
        url: "https://hqolymgis30s.wsdot.loc:6443/arcgis/rest/services/TravelCenter/TravelCenter/MapServer/3",
        visible: true,
        title: "Line Restrictions"
    });
    // What is this used for?
    //EsriConfig.apiKey = "AAPKe21082c738fb4109b735927e25b79af5ytyQa1mQmL2NrH3i0u_AptcnZJvkusIlaLc7gZOI9zszvKJfAwkWJB5zUzP6-V73";
    exports.webmap = new WebMap_1.default({
        // basemap: basemapInfo.basemap,
        layers: [TrafficLayer_1.default, ParkRideLayer_1.default, CameraLayer_1.default, pointRestrictions, lineRestrictions],
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