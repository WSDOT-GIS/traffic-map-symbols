"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const MapImageLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/MapImageLayer"));
let layer;
const initLayer = (url) => {
    layer = new MapImageLayer_1.default({
        id: "esri-reference-layer",
        url: url,
        title: "ESRI Reference",
        visible: true,
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "ESRI Reference is not ready yet!";
    }
    return layer;
};
exports.default = getLayer;
//# sourceMappingURL=EsriReferenceLayer.js.map