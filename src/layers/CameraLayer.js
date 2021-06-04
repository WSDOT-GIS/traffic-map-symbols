define(["require", "exports", "tslib", "@arcgis/core/renderers/SimpleRenderer", "@arcgis/core/layers/GeoJSONLayer", "@arcgis/core/layers/support/Field", "@/symbols/CameraSymbol", "@/popup-templates/CameraPopup", "@/utils/layerUtil"], function (require, exports, tslib_1, SimpleRenderer_1, GeoJSONLayer_1, Field_1, CameraSymbol_1, CameraPopup_1, layerUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    SimpleRenderer_1 = tslib_1.__importDefault(SimpleRenderer_1);
    GeoJSONLayer_1 = tslib_1.__importDefault(GeoJSONLayer_1);
    Field_1 = tslib_1.__importDefault(Field_1);
    CameraSymbol_1 = tslib_1.__importDefault(CameraSymbol_1);
    CameraPopup_1 = tslib_1.__importDefault(CameraPopup_1);
    var clusterConfig = layerUtil_1.generateClusterConfig("Cameras", "camera", "#000000");
    var renderer = new SimpleRenderer_1.default({ symbol: CameraSymbol_1.default });
    var fields = [
        new Field_1.default({
            name: "CameraID",
            alias: "Camera ID",
            type: "oid"
        }),
        new Field_1.default({
            name: "CameraTitle",
            alias: "Camera Title",
            type: "string"
        }),
        new Field_1.default({
            name: "ImageURL",
            alias: "Image URL",
            type: "string"
        }),
        new Field_1.default({
            name: "WSDOTSRID",
            alias: "SR",
            type: "string"
        }),
        new Field_1.default({
            name: "StateRouteMilepost",
            alias: "Milepost",
            type: "single"
        }),
        new Field_1.default({
            name: "CompassDirection",
            alias: "Compass Direction",
            type: "string"
        }),
        new Field_1.default({
            name: "Location",
            alias: "Location",
            type: "string"
        }),
        new Field_1.default({
            name: "CameraOwnerName",
            alias: "Owner",
            type: "string"
        }),
        new Field_1.default({
            name: "CameraOwnerURL",
            alias: "Owner URL",
            type: "string"
        }),
        new Field_1.default({
            name: "ImageWidth",
            alias: "Image Width",
            type: "integer"
        }),
        new Field_1.default({
            name: "ImageHeight",
            alias: "Image Height",
            type: "integer"
        }),
    ];
    var layer = new GeoJSONLayer_1.default({
        url: "/data/camera.geojson",
        renderer: renderer,
        popupTemplate: CameraPopup_1.default,
        featureReduction: clusterConfig,
        fields: fields
    });
    exports.default = layer;
});
//# sourceMappingURL=CameraLayer.js.map