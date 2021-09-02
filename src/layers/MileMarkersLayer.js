"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const MapImageLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/MapImageLayer"));
let layer;
const initLayer = (url) => {
    layer = new MapImageLayer_1.default({
        id: "mile-markers-layer",
        url: url,
        title: "Mile Markers",
        visible: true,
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