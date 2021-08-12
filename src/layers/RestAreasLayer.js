"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const RestAreasSymbol_1 = tslib_1.__importDefault(require("@/symbols/RestAreasSymbol"));
const restAreasRenderer = new SimpleRenderer_1.default({
    symbol: RestAreasSymbol_1.default
});
let layer;
const initLayer = (url) => {
    layer = new GeoJSONLayer_1.default({
        id: "rest-areas-layer",
        url: url,
        title: "Rest Areas",
        renderer: restAreasRenderer,
        visible: false
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "Layer is not ready yet!";
    }
    return layer;
};
// const FeatureLayer = new GeoJSONLayer({
//     id: "rest-areas-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/RestAreas.json",
//     //url: await getURL(),
//     title: "Rest Areas",
//     renderer: restAreasRenderer,
//     visible: false
// });
exports.default = getLayer;
//# sourceMappingURL=RestAreasLayer.js.map