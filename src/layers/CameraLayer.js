define(["require", "exports", "tslib", "@arcgis/core/renderers/SimpleRenderer", "@arcgis/core/layers/GeoJSONLayer", "@/symbols/CameraSymbol", "@/popup-templates/CameraPopup", "@/utils/layerUtil"], function (require, exports, tslib_1, SimpleRenderer_1, GeoJSONLayer_1, CameraSymbol_1, CameraPopup_1, layerUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    SimpleRenderer_1 = tslib_1.__importDefault(SimpleRenderer_1);
    GeoJSONLayer_1 = tslib_1.__importDefault(GeoJSONLayer_1);
    CameraSymbol_1 = tslib_1.__importDefault(CameraSymbol_1);
    CameraPopup_1 = tslib_1.__importDefault(CameraPopup_1);
    var clusterConfig = layerUtil_1.generateClusterConfig("Cameras", "camera", "#000000");
    var renderer = new SimpleRenderer_1.default({ symbol: CameraSymbol_1.default });
    var layer = new GeoJSONLayer_1.default({
        url: "/data/camera.geojson",
        title: "Traffic Cameras",
        renderer: renderer,
        popupTemplate: CameraPopup_1.default,
        featureReduction: clusterConfig
    });
    exports.default = layer;
});
//# sourceMappingURL=CameraLayer.js.map