"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const LineRestrictionsSymbol_1 = require("../symbols/LineRestrictionsSymbol");
// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
const UniqueValueRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/UniqueValueRenderer"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const layerUtil = tslib_1.__importStar(require("@/utils/layerUtil"));
const renderer = new UniqueValueRenderer_1.default({
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
    new Field_1.default({
        "name": "restriction_comment",
        "type": "string",
        "alias": "restriction_comment",
    }),
    new Field_1.default({
        "name": "TType",
        "type": "string",
        "alias": "TType",
    }),
    new Field_1.default({
        "name": "date_effective",
        "type": "date",
        "alias": "date_effective",
    }),
    new Field_1.default({
        "name": "RecordUpdateDate",
        "type": "date",
        "alias": "RecordUpdateDate",
    }),
    new Field_1.default({
        "name": "route_nr",
        "type": "string",
        "alias": "route_nr",
    }),
    new Field_1.default({
        "name": "bridge_name",
        "type": "string",
        "alias": "bridge_name",
    }),
    new Field_1.default({
        "name": "cardinal_direction",
        "type": "string",
        "alias": "cardinal_direction",
    }),
    new Field_1.default({
        "name": "UniqueId",
        "type": "string",
        "alias": "UniqueId",
    })
];
let layer;
const initLayer = (jsonUrl) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    layer = yield layerUtil.initLayer(jsonUrl, "line-restrictions-layer", "Restriction Lines", renderer, fields, "polyline", false);
    // hide all features... Show only when the corresponding point was selected.
    layer.definitionExpression = "1=0";
    return layer;
});
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