"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const FeatureLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/FeatureLayer"));
let layer;
const initLayer = (url) => {
    layer = new FeatureLayer_1.default({
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
        throw "LineRestrictionLayer is not ready yet!";
    }
    return layer;
};
// const LineRestrictionsLayer = new GeoJSONLayer({
//     id: "line-restrictions-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/LineRestrictions.json",
//     title: "Restriction Lines",
//     renderer: lineRestrictionsRenderer,
//     visible: false,
//     fields: fields
// });
exports.default = getLayer;
//# sourceMappingURL=MileMarkersLayer.js.map