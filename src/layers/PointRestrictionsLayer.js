"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const PointRestrictionsSymbol_1 = tslib_1.__importDefault(require("@/symbols/PointRestrictionsSymbol"));
const renderer = new SimpleRenderer_1.default({
    symbol: PointRestrictionsSymbol_1.default
});
let layer;
const initLayer = (url) => {
    layer = new GeoJSONLayer_1.default({
        id: "point-restrictions-layer",
        url: url,
        title: "Restriction Points",
        renderer: renderer,
        visible: false,
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "PointRestrictionLayer is not ready yet!";
    }
    return layer;
};
// const PointRestrictionsLayer = new GeoJSONLayer({
//     id: "point-restrictions-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/PointRestrictions.json",
//     title: "Restriction Points",
//     renderer: renderer,
//     visible: false,
//     fields: fields
// });
exports.default = getLayer;
//# sourceMappingURL=PointRestrictionsLayer.js.map