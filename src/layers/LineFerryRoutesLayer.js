"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const FeatureLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/FeatureLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const FerryRoutesSymbol_1 = require("@/symbols/FerryRoutesSymbol");
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const ferryRoutesRenderer = new SimpleRenderer_1.default({
    symbol: FerryRoutesSymbol_1.ferryRoutesSymbol
});
let layer;
const fields = [
    new Field_1.default({
        name: "OBJECTID",
        alias: "OBJECTID",
        type: "oid"
    }),
];
const initLayer = (url) => {
    layer = new FeatureLayer_1.default({
        id: "ferry-routes-lines-layer",
        url: url,
        title: "ferryRoutes",
        renderer: ferryRoutesRenderer,
        visible: true,
        labelsVisible: false,
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "Ferry Routes is not ready yet!";
    }
    return layer;
};
exports.default = getLayer;
//# sourceMappingURL=LineFerryRoutesLayer.js.map