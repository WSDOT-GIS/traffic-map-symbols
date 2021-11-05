"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const RestAreasSymbol_1 = tslib_1.__importDefault(require("@/symbols/RestAreasSymbol"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const layerUtil = tslib_1.__importStar(require("@/utils/layerUtil"));
const renderer = new SimpleRenderer_1.default({
    symbol: RestAreasSymbol_1.default
});
const fields = [
    new Field_1.default({
        name: "RestAreaName",
        alias: "RestAreaName",
        type: "string"
    }),
    new Field_1.default({
        name: "LocationName",
        alias: "LocationName",
        type: "string"
    }),
    new Field_1.default({
        name: "Amenties",
        alias: "Amenties",
        type: "string"
    }),
];
let layer;
const initLayer = (jsonUrl) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    layer = yield layerUtil.initLayer(jsonUrl, "rest-areas-layer", "Rest Areas", renderer, fields, "point", false);
    return layer;
});
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "Rest Area Layer is not ready yet!";
    }
    return layer;
};
// let layer: GeoJSONLayer | undefined;
// export const initLayer = (url: string): GeoJSONLayer => {
//     layer = new GeoJSONLayer({
//         id: "rest-areas-layer",
//         url: url,
//         title: "Rest Areas",
//         renderer: restAreasRenderer,
//         visible: false
//     });
//     return layer;
// }
// const getLayer = (): GeoJSONLayer => {
//     if (!layer) {
//         throw "Layer is not ready yet!";
//     }
//     return layer;
// }
exports.default = getLayer;
//# sourceMappingURL=RestAreasLayer.js.map