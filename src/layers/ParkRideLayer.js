define(["require", "exports", "tslib", "@arcgis/core/renderers/SimpleRenderer", "@arcgis/core/layers/GeoJSONLayer", "@/symbols/ParkRideSymbol", "@/popup-templates/ParkRidePopup"], function (require, exports, tslib_1, SimpleRenderer_1, GeoJSONLayer_1, ParkRideSymbol_1, ParkRidePopup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    SimpleRenderer_1 = tslib_1.__importDefault(SimpleRenderer_1);
    GeoJSONLayer_1 = tslib_1.__importDefault(GeoJSONLayer_1);
    ParkRideSymbol_1 = tslib_1.__importDefault(ParkRideSymbol_1);
    ParkRidePopup_1 = tslib_1.__importDefault(ParkRidePopup_1);
    //import { generateClusterConfig } from "@/utils/layerUtil";
    //const clusterConfig = generateClusterConfig("Park & Rides", "park & ride", "#065535");
    var renderer = new SimpleRenderer_1.default({ symbol: ParkRideSymbol_1.default });
    var layer = new GeoJSONLayer_1.default({
        id: "park-ride-layer",
        url: "http://hqtob1webtmdev1/GISData/ParkAndRides.json",
        title: "Park and Rides",
        renderer: renderer,
        popupTemplate: ParkRidePopup_1.default,
        visible: false
    });
    exports.default = layer;
});
//# sourceMappingURL=ParkRideLayer.js.map