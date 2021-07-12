define(["require", "exports", "tslib", "@arcgis/core/WebMap", "@arcgis/core/views/MapView", "@arcgis/core/geometry/Point", "@arcgis/core/core/watchUtils", "@arcgis/core/geometry/SpatialReference", "@/layers/TrafficLayer", "@/layers/ParkRideLayer", "@/layers/CameraLayer", "@/layers/PointRestrictionsLayer", "@/layers/LineRestrictionsLayer", "@/layers/WeatherStationsLayer", "@/utils/extentUtil", "@/layers/ZoomExtentLayer"], function (require, exports, tslib_1, WebMap_1, MapView_1, Point_1, watchUtils_1, SpatialReference_1, TrafficLayer_1, ParkRideLayer_1, CameraLayer_1, PointRestrictionsLayer_1, LineRestrictionsLayer_1, WeatherStationsLayer_1, extentUtil_1, ZoomExtentLayer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLayer = exports.toScreenXY = exports.zoomOnClick = exports.tryZoomToPoint = exports.init = exports.mapView = exports.webmap = void 0;
    WebMap_1 = tslib_1.__importDefault(WebMap_1);
    MapView_1 = tslib_1.__importDefault(MapView_1);
    Point_1 = tslib_1.__importDefault(Point_1);
    SpatialReference_1 = tslib_1.__importDefault(SpatialReference_1);
    TrafficLayer_1 = tslib_1.__importDefault(TrafficLayer_1);
    ParkRideLayer_1 = tslib_1.__importDefault(ParkRideLayer_1);
    CameraLayer_1 = tslib_1.__importDefault(CameraLayer_1);
    PointRestrictionsLayer_1 = tslib_1.__importDefault(PointRestrictionsLayer_1);
    LineRestrictionsLayer_1 = tslib_1.__importDefault(LineRestrictionsLayer_1);
    WeatherStationsLayer_1 = tslib_1.__importDefault(WeatherStationsLayer_1);
    ZoomExtentLayer_1 = tslib_1.__importDefault(ZoomExtentLayer_1);
    // What is this used for?
    //EsriConfig.apiKey = "AAPKe21082c738fb4109b735927e25b79af5ytyQa1mQmL2NrH3i0u_AptcnZJvkusIlaLc7gZOI9zszvKJfAwkWJB5zUzP6-V73";
    exports.webmap = new WebMap_1.default({
        layers: [TrafficLayer_1.default, ParkRideLayer_1.default, CameraLayer_1.default, PointRestrictionsLayer_1.default, LineRestrictionsLayer_1.default, WeatherStationsLayer_1.default],
    });
    exports.mapView = new MapView_1.default({
        container: "esri-map-view",
        map: exports.webmap,
    });
    exports.mapView.on("click", (function () {
        exports.mapView.graphics.removeAll();
    }));
    // Zoom buttons are replaced with the custom Vue components.
    exports.mapView.ui.remove("zoom");
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
    var tryZoomToPoint = function (point, numLevels) {
        var isSuccess = true;
        if (!numLevels) {
            numLevels = 1;
        }
        exports.mapView.center = point;
        var orgLevel = exports.mapView.zoom;
        exports.mapView.zoom = exports.mapView.zoom += numLevels;
        // Tried goTo() as well, but it is a bit jumpy...
        // esriMap.mapView.goTo({
        //   target: cameraGraphic,
        //   zoom: esriMap.mapView.zoom += 1
        // }, {
        //   duration: 1000,
        //   easing: "ease-out"
        // });
        if (exports.mapView.zoom === orgLevel) {
            console.log("Cannot zoom in any more.");
            isSuccess = false;
        }
        return isSuccess;
    };
    exports.tryZoomToPoint = tryZoomToPoint;
    var zoomOnClick = function (extentInfo) {
        var extent = extentUtil_1.convert2EsriExtent(extentInfo);
        exports.mapView.extent = extent;
        ZoomExtentLayer_1.default.visible = false;
        // Remember the scale zoomed into so it can detect when map is zoomed out.
        var zoomExtentLayerMaxScale = exports.mapView.scale;
        // Set watch to make the layer visible again when user zoomed out.
        var watchHandle = watchUtils_1.whenTrue(exports.mapView, "stationary", function () {
            if (exports.mapView.scale > zoomExtentLayerMaxScale) {
                ZoomExtentLayer_1.default.visible = true;
                // Watch is no longer needed.
                watchHandle.remove();
            }
        });
    };
    exports.zoomOnClick = zoomOnClick;
    var toScreenXY = function (mapX, mapY) {
        var pt = new Point_1.default({ x: mapX, y: mapY, spatialReference: SpatialReference_1.default.WebMercator });
        var screenPt = exports.mapView.toScreen(pt);
        return { x: screenPt.x, y: screenPt.y };
    };
    exports.toScreenXY = toScreenXY;
    var getLayer = function (id) {
        return exports.webmap.findLayerById(id);
    };
    exports.getLayer = getLayer;
});
//# sourceMappingURL=esriMap.js.map