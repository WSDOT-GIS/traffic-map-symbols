define(["require", "exports", "tslib", "@arcgis/core/renderers/SimpleRenderer", "@arcgis/core/layers/GeoJSONLayer", "@/symbols/ParkRideSymbol", "@/popup-templates/ParkRidePopup"], function (require, exports, tslib_1, SimpleRenderer_1, GeoJSONLayer_1, ParkRideSymbol_1, ParkRidePopup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    SimpleRenderer_1 = tslib_1.__importDefault(SimpleRenderer_1);
    GeoJSONLayer_1 = tslib_1.__importDefault(GeoJSONLayer_1);
    ParkRideSymbol_1 = tslib_1.__importDefault(ParkRideSymbol_1);
    ParkRidePopup_1 = tslib_1.__importDefault(ParkRidePopup_1);
    var rdrParkRide = new SimpleRenderer_1.default({ symbol: ParkRideSymbol_1.default });
    var layer = new GeoJSONLayer_1.default({
        //   url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
        url: "/data/park-ride.geojson",
        renderer: rdrParkRide,
        popupTemplate: ParkRidePopup_1.default,
    });
    exports.default = layer;
});
//# sourceMappingURL=ParkRideLayer.js.map