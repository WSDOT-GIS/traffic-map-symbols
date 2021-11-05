"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const layerUtil = tslib_1.__importStar(require("@/utils/layerUtil"));
const TravelTimeSymbol_1 = tslib_1.__importDefault(require("@/symbols/TravelTimeSymbol"));
const renderer = new SimpleRenderer_1.default({
    symbol: TravelTimeSymbol_1.default
});
const fields = [
    new Field_1.default({
        "name": "CurrentTime",
        "type": "integer",
        "alias": "CurrentTime"
    }),
    new Field_1.default({
        "name": "AverageTime",
        "type": "integer",
        "alias": "AverageTime"
    }),
    new Field_1.default({
        "name": "Title",
        "type": "string",
        "alias": "Title",
    }),
    new Field_1.default({
        "name": "TimeUpdated",
        "type": "date",
        "alias": "TimeUpdated",
    }),
    new Field_1.default({
        "name": "HOVCurrentTime",
        "type": "integer",
        "alias": "HOVCurrentTime"
    }),
];
let layer;
const initLayer = (jsonUrl) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    layer = yield layerUtil.initLayer(jsonUrl, "travel-times-layer", "Travel Times", renderer, fields, "point", false);
    return layer;
});
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "TravelTimesLayer is not ready yet!";
    }
    return layer;
};
// let layer: GeoJSONLayer | undefined;
// export const initLayer = (url: string): GeoJSONLayer => {
//     layer = new GeoJSONLayer({
//         id: "travel-times-layer",
//         url: url,
//         title: "Travel Times",
//         renderer: travelTimesRenderer,
//         visible: false,
//         objectIdField:"TravelTimesID"
//     });
//     return layer;
// }
// const getLayer = (): GeoJSONLayer => {
//     if (!layer) {
//         throw "TravelTimesLayer is not ready yet!";
//     }
//     return layer;
// }
exports.default = getLayer;
//# sourceMappingURL=TravelTimeLayer.js.map