"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const TravelTimeSymbol_1 = tslib_1.__importDefault(require("@/symbols/TravelTimeSymbol"));
const travelTimesRenderer = new SimpleRenderer_1.default({
    symbol: TravelTimeSymbol_1.default
});
let layer;
const initLayer = (url) => {
    layer = new GeoJSONLayer_1.default({
        id: "travel-times-layer",
        url: url,
        title: "Travel Times",
        renderer: travelTimesRenderer,
        visible: false,
        objectIdField: "AverageTime"
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "TravelTimesLayer is not ready yet!";
    }
    return layer;
};
exports.default = getLayer;
//# sourceMappingURL=TravelTimeLayer.js.map