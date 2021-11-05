"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const TileLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/TileLayer"));
let layer;
const initLayer = (url) => {
    layer = new TileLayer_1.default({
        id: "state-route-shields-layer",
        url: url,
        title: "State Route Shields",
        visible: true,
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "State Route Shields is not ready yet!";
    }
    return layer;
};
exports.default = getLayer;
//# sourceMappingURL=StateRouteShields.js.map