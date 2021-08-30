"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const FeatureLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/FeatureLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const FirePerimeterSymbol_1 = tslib_1.__importDefault(require("@/symbols/FirePerimeterSymbol"));
const firePerimeterRenderer = new SimpleRenderer_1.default({
    symbol: FirePerimeterSymbol_1.default
});
let layer;
const initLayer = (url, firePerimeterIDs) => {
    layer = new FeatureLayer_1.default({
        id: "fire-perimeters-layer",
        renderer: firePerimeterRenderer,
        url: url,
        title: "Fire Perimeters",
        visible: false,
        definitionExpression: firePerimeterIDs
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "Fire Perimeters is not ready yet!";
    }
    return layer;
};
exports.default = getLayer;
//# sourceMappingURL=FirePerimeterLayer.js.map