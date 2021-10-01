"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const LineRestrictionsSymbol_1 = require("../symbols/LineRestrictionsSymbol");
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const UniqueValueRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/UniqueValueRenderer"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const lineRestrictionsRenderer = new UniqueValueRenderer_1.default({
    field: "TType",
    uniqueValueInfos: [{
            // All features with value of "North" will be blue
            value: "R",
            symbol: LineRestrictionsSymbol_1.roadRestrictionLine
        }, {
            // All features with value of "East" will be green
            value: "B",
            symbol: LineRestrictionsSymbol_1.bridgeRestrictionLine
        }],
    defaultSymbol: LineRestrictionsSymbol_1.bridgeRestrictionLine
});
const fields = [
    new Field_1.default({ name: "UniqueId", alias: "UniqueId", type: "string" }),
    new Field_1.default({ name: "route_nr", alias: "Route Number", type: "string" }),
    new Field_1.default({ name: "cardinal_direction", alias: "Cardinal Direction", type: "string" }),
    new Field_1.default({ name: "restriction_comment", alias: "Restriction Comment", type: "string" }),
    new Field_1.default({ name: "date_effective", alias: "Date Effective", type: "date" }),
    new Field_1.default({ name: "bridge_name", alias: "Bridge Name", type: "string" }),
    new Field_1.default({ name: "TType", alias: "Type", type: "string" }),
    new Field_1.default({ name: "RecordUpdateDate", alias: "Record Update Date", type: "date" }),
    new Field_1.default({ name: "lineMarker", alias: "lineMarker", type: "string" })
];
let layer;
const initLayer = (url) => {
    layer = new GeoJSONLayer_1.default({
        id: "line-restrictions-layer",
        url: url,
        title: "Restriction Lines",
        renderer: lineRestrictionsRenderer,
        visible: false,
        fields: fields
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
//# sourceMappingURL=LineRestrictionsLayer.js.map