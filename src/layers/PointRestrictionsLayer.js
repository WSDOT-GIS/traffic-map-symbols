"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const layerUtil = tslib_1.__importStar(require("@/utils/layerUtil"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const PointRestrictionsSymbol_1 = tslib_1.__importDefault(require("@/symbols/PointRestrictionsSymbol"));
const renderer = new SimpleRenderer_1.default({
    symbol: PointRestrictionsSymbol_1.default
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
    }),
    new Field_1.default({
        "name": "lineMarker",
        "type": "string",
        "alias": "lineMarker",
    })
];
let layer;
const initLayer = (jsonUrl) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    layer = yield layerUtil.initLayer(jsonUrl, "point-restrictions-layer", "Restriction Points", renderer, fields, "point", false);
    return layer;
});
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "PointRestrictionLayer is not ready yet!";
    }
    return layer;
};
// let layer: GeoJSONLayer | undefined;
// export const initLayer = (url: string): GeoJSONLayer => {
//     layer = new GeoJSONLayer({
//         id: "point-restrictions-layer",
//         url: url,
//         title: "Restriction Points",
//         renderer: renderer,
//         visible: false,
//         fields: fields
//     });
//     return layer;
// }
// const getLayer = (): GeoJSONLayer => {
//     if (!layer) {
//         throw "PointRestrictionLayer is not ready yet!";
//     }
//     return layer;
// }
exports.default = getLayer;
//# sourceMappingURL=PointRestrictionsLayer.js.map