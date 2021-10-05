"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const MountainPassSymbol_1 = tslib_1.__importDefault(require("@/symbols/MountainPassSymbol"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const layerUtil = tslib_1.__importStar(require("@/utils/layerUtil"));
const renderer = new SimpleRenderer_1.default({
    symbol: MountainPassSymbol_1.default
});
const fields = [
    new Field_1.default({ name: "MountainPassId", type: "integer", alias: "MountainPassId" }),
    new Field_1.default({ name: "PassName", type: "string", alias: "PassName", length: 50 }),
    new Field_1.default({
        name: "Elevation", type: "integer", alias: "Elevation"
    }),
    new Field_1.default({ name: "ElevationUnit", type: "string", alias: "ElevationUnit", length: 20 }),
    new Field_1.default({
        name: "TravelAdvisoryAvailable", type: "integer", alias: "TravelAdvisoryAvailable"
    }),
    new Field_1.default({
        name: "Latitude", type: "double", alias: "Latitude"
    }),
    new Field_1.default({
        name: "Longitude", type: "double", alias: "Longitude"
    }),
    new Field_1.default({
        name: "Location", type: "geometry", alias: "Location"
    }),
    new Field_1.default({
        name: "Temperature", type: "integer", alias: "Temperature"
    }),
    new Field_1.default({ name: "TemperatureUnit", type: "string", alias: "TemperatureUnit", length: 10 }),
    new Field_1.default({ name: "Weather", type: "string", alias: "Weather", length: 500 }),
    new Field_1.default({ name: "RoadCondition", type: "string", alias: "RoadCondition", length: 500 }),
    new Field_1.default({ name: "DisplayDate", type: "date", alias: "DisplayDate", length: 8 }),
    new Field_1.default({
        name: "TravelAdvisoryFlag", type: "integer", alias: "TravelAdvisoryFlag"
    }),
    new Field_1.default({ name: "TravelDirection1", type: "string", alias: "TravelDirection1", length: 20 }),
    new Field_1.default({ name: "PublicMessage1", type: "string", alias: "PublicMessage1", length: 300 }),
    new Field_1.default({ name: "TravelDirection2", type: "string", alias: "TravelDirection2", length: 20 }),
    new Field_1.default({ name: "PublicMessage2", type: "string", alias: "PublicMessage2", length: 300 }),
];
let layer;
const initLayer = (jsonUrl) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // let graphics: Graphic[] = [];
    // const config = await getConfig();
    // if (visible) {
    //     graphics = await layerUtil.fetchJsonData(config.mountainPasses);
    // }
    // layer = new FeatureLayer({
    //     id: "mountain-passes-layer",
    //     title: "Mountain Pass Reports",
    //     objectIdField: "MountainPassId",
    //     renderer: mountainPassRenderer,
    //     visible: visible,
    //     fields: fields,
    //     source: graphics,
    //     geometryType: "point",
    //     spatialReference: SpatialReference.WebMercator,
    // });
    // layerUtil.setLayerEvent(layer, config.mountainPasses);
    layer = yield layerUtil.initLayer(jsonUrl, "mountain-passes-layer", "Mountain Pass Reports", renderer, fields, "point", false);
    return layer;
});
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "MountainPassLayer is not ready yet!";
    }
    return layer;
};
// let layer: GeoJSONLayer | undefined;
// export const initLayer = (url: string): GeoJSONLayer => {
//     layer = new GeoJSONLayer({
//         id: "mountain-passes-layer",
//         url: url,
//         title: "Mountain Pass Reports",
//         renderer: mountainPassRenderer,
//         visible: false,
//         fields: fields,
//     });
//     return layer;
// }
// const getLayer = (): GeoJSONLayer => {
//     if (!layer) {
//         throw "MountainPassLayer is not ready yet!";
//     }
//     return layer;
// }
// const FeatureLayer = new GeoJSONLayer({
//     id: "mountain-passes-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/MountainPasses.json",
//     title: "Mountain Passes",
//     renderer: mountainPassRenderer,
//     visible: false
// })
exports.default = getLayer;
//# sourceMappingURL=MountainPassesLayer.js.map