"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
// import Graphic from "@arcgis/core/Graphic";
const ParkRideSymbol_1 = tslib_1.__importDefault(require("@/symbols/ParkRideSymbol"));
// import { mapView } from "@/esri-stuff/esriMap";
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
// import ParkRideInfo from "@/types/ParkRideInfo";
//import { generateClusterConfig } from "@/utils/layerUtil";
//const clusterConfig = generateClusterConfig("Park & Rides", "park & ride", "#065535");
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
        name: "CityName",
        alias: "City Name",
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
        name: "ZipCode",
        alias: "Zip Code",
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
    new Field_1.default({
        name: "GlobalID",
        alias: "Global ID",
        type: "string"
    })
];
const layer = new GeoJSONLayer_1.default({
    id: "park-ride-layer",
    url: "http://hqtob1webtmdev1/GISData/ParkAndRides.json",
    title: "Park and Rides",
    renderer: renderer,
    fields: fields,
    visible: false
});
exports.default = layer;
//# sourceMappingURL=ParkRideLayer.js.map