"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const ParkRideSymbol_1 = tslib_1.__importDefault(require("@/symbols/ParkRideSymbol"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const layerUtil = tslib_1.__importStar(require("@/utils/layerUtil"));
const renderer = new SimpleRenderer_1.default({ symbol: ParkRideSymbol_1.default });
const fields = [
    new Field_1.default({
        name: "OBJECTID",
        alias: "OBJECTID",
        type: "integer"
    }),
    new Field_1.default({
        name: "Lot_Name",
        alias: "Lot Name",
        type: "string"
    }),
    new Field_1.default({
        name: "CountyName",
        alias: "County Name",
        type: "string"
    }),
    new Field_1.default({
        name: "Street_Location",
        alias: "Street Location",
        type: "string"
    }),
    new Field_1.default({
        name: "Address",
        alias: "Address",
        type: "string"
    }),
    new Field_1.default({
        name: "Approx_Numb_Spaces",
        alias: "Approximate Number Spaces",
        type: "integer"
    }),
    new Field_1.default({
        name: "PublishDate",
        alias: "Publish Date",
        type: "date"
    }),
];
let layer;
const initLayer = (jsonUrl) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    layer = yield layerUtil.initLayer(jsonUrl, "park-ride-layer", "Park and Rides", renderer, fields, "point", false);
    return layer;
});
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "ParkRideLayer is not ready yet!";
    }
    return layer;
};
// let layer: GeoJSONLayer | undefined;
// export const initLayer = (url: string): GeoJSONLayer => {
//     layer = new GeoJSONLayer({
//         id: "park-ride-layer",
//         url: url,
//         title: "Park and Rides",
//         renderer: renderer,
//         fields: fields,
//         visible: false
//     });
//     return layer;
// }
// const getLayer = (): GeoJSONLayer => {
//     if (!layer) {
//         throw "ParkRideLayer is not ready yet!";
//     }
//     return layer;
// }
// const layer = new GeoJSONLayer({
//     id: "park-ride-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/ParkAndRides.json",
//     title: "Park and Rides",
//     renderer: renderer,
//     fields: fields,
//     visible: false
// });
exports.default = getLayer;
//# sourceMappingURL=ParkRideLayer.js.map