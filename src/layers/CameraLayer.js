"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCluster = exports.toggleCluster = exports.initLayer = void 0;
const tslib_1 = require("tslib");
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const CameraSymbol_1 = tslib_1.__importDefault(require("@/symbols/CameraSymbol"));
const clusterUtil_1 = require("@/utils/clusterUtil");
const layerUtil = tslib_1.__importStar(require("@/utils/layerUtil"));
const renderer = new SimpleRenderer_1.default({ symbol: CameraSymbol_1.default });
const fields = [
    new Field_1.default({
        name: "CameraID",
        alias: "Camera ID",
        type: "integer"
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
let layer;
const initLayer = (jsonUrl) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    layer = yield layerUtil.initLayer(jsonUrl, "traffic-camera-layer", "Cameras", renderer, fields, "point", false);
    layer.featureReduction = clusterUtil_1.clusterConfig;
    return layer;
});
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "CameraLayer is not ready yet!";
    }
    return layer;
};
exports.default = getLayer;
/*** Helper functions **************/
// Watch scale change...
const toggleCluster = (newScale, oldScale) => {
    if (!layer) {
        return;
    }
    // Turn off clustering at max scale...
    if (newScale > clusterUtil_1.clusterMaxScale && oldScale < clusterUtil_1.clusterMaxScale) {
        layer.featureReduction = clusterUtil_1.clusterConfig;
    }
    else if (newScale < clusterUtil_1.clusterMaxScale && oldScale > clusterUtil_1.clusterMaxScale) {
        layer.set("featureReduction", undefined);
    }
};
exports.toggleCluster = toggleCluster;
const setCluster = (scale) => {
    if (!layer) {
        return;
    }
    if (layer.featureReduction) {
        layer.set("featureReduction", undefined);
    }
    const cluster = scale > clusterUtil_1.clusterMaxScale ? clusterUtil_1.clusterConfig : undefined;
    layer.set("featureReduction", cluster);
};
exports.setCluster = setCluster;
//# sourceMappingURL=CameraLayer.js.map