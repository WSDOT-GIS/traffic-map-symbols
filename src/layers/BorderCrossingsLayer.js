"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const BorderCrossingsSymbol_1 = tslib_1.__importDefault(require("@/symbols/BorderCrossingsSymbol"));
const renderer = new SimpleRenderer_1.default({
    symbol: BorderCrossingsSymbol_1.default
});
let layer;
const initLayer = (url) => {
    layer = new GeoJSONLayer_1.default({
        id: "border-crossings-layer",
        url: url,
        title: "Border Crossing Points",
        renderer: renderer,
        visible: false,
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "Border Crossings Layer is not ready yet!";
    }
    return layer;
};
exports.default = getLayer;
//# sourceMappingURL=BorderCrossingsLayer.js.map