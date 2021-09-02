"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const MapImageLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/MapImageLayer"));
let layer;
const initLayer = (url) => {
    layer = new MapImageLayer_1.default({
        id: "boundaries-places-reference-layer",
        url: url,
        title: "ESRI Boundaries and Places Reference",
        visible: false,
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "ESRI Boundaries and Places Reference is not ready yet!";
    }
    return layer;
};
exports.default = getLayer;
//# sourceMappingURL=BoundariesPlacesReferenceLayer.js.map