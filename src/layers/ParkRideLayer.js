define(["require", "exports", "tslib", "@arcgis/core/renderers/SimpleRenderer", "@arcgis/core/layers/GeoJSONLayer", "@/symbols/ParkRideSymbol", "@arcgis/core/layers/support/Field"], function (require, exports, tslib_1, SimpleRenderer_1, GeoJSONLayer_1, ParkRideSymbol_1, Field_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    SimpleRenderer_1 = tslib_1.__importDefault(SimpleRenderer_1);
    GeoJSONLayer_1 = tslib_1.__importDefault(GeoJSONLayer_1);
    ParkRideSymbol_1 = tslib_1.__importDefault(ParkRideSymbol_1);
    Field_1 = tslib_1.__importDefault(Field_1);
    //import { generateClusterConfig } from "@/utils/layerUtil";
    //const clusterConfig = generateClusterConfig("Park & Rides", "park & ride", "#065535");
    var renderer = new SimpleRenderer_1.default({ symbol: ParkRideSymbol_1.default });
    var fields = [
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
    var layer = new GeoJSONLayer_1.default({
        id: "park-ride-layer",
        url: "http://hqtob1webtmdev1/GISData/ParkAndRides.json",
        title: "Park and Rides",
        renderer: renderer,
        fields: fields,
        visible: false
    });
    exports.default = layer;
});
//# sourceMappingURL=ParkRideLayer.js.map