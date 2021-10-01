"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const ParkRideSymbol_1 = tslib_1.__importDefault(require("@/symbols/ParkRideSymbol"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const renderer = new SimpleRenderer_1.default({ symbol: ParkRideSymbol_1.default });
const fields = [
    new Field_1.default({
        name: "OBJECTID",
        alias: "OBJECTID",
        type: "oid"
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
const initLayer = (url) => {
    layer = new GeoJSONLayer_1.default({
        id: "park-ride-layer",
        url: url,
        title: "Park and Rides",
        renderer: renderer,
        //fields: fields,
        visible: false
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "ParkRideLayer is not ready yet!";
    }
    return layer;
};
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