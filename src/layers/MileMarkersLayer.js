"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const VectorTileLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/VectorTileLayer"));
let layer;
const initLayer = (url) => {
    layer = new VectorTileLayer_1.default({
        id: "mile-markers",
        url: url,
        title: "Mile Markers",
        visible: false,
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "MileMarkers is not ready yet!";
    }
    return layer;
};
exports.default = getLayer;
//# sourceMappingURL=MileMarkersLayer.js.map