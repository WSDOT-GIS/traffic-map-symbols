"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const WeatherStationSymbol_1 = tslib_1.__importDefault(require("@/symbols/WeatherStationSymbol"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const layerUtil = tslib_1.__importStar(require("@/utils/layerUtil"));
const renderer = new SimpleRenderer_1.default({
    symbol: WeatherStationSymbol_1.default
});
const fields = [
    new Field_1.default({
        "name": "WeatherStationDescription",
        "type": "string",
        "alias": "WeatherStationDescription",
    }),
    new Field_1.default({
        "name": "WeatherStationId",
        "type": "integer",
        "alias": "WeatherStationId"
    }),
    new Field_1.default({
        "name": "SurfaceTemperature",
        "type": "string",
        "alias": "SurfaceTemperature",
    }),
    new Field_1.default({
        "name": "TemperatureFarhenheit",
        "type": "string",
        "alias": "TemperatureFarhenheit",
    }),
    new Field_1.default({
        "name": "TemperatureCelcius",
        "type": "string",
        "alias": "TemperatureCelcius",
    }),
    new Field_1.default({
        "name": "Visibility",
        "type": "string",
        "alias": "Visibility",
    }),
    new Field_1.default({
        "name": "WindSpeed",
        "type": "string",
        "alias": "WindSpeed",
    }),
    new Field_1.default({
        "name": "NWSZoneId",
        "type": "string",
        "alias": "NWSZoneId",
    }),
    new Field_1.default({
        "name": "CardinalCompassDirection",
        "type": "string",
        "alias": "CardinalCompassDirection",
    }),
    new Field_1.default({
        "name": "WeatherReportDateTime",
        "type": "date",
        "alias": "WeatherReportDateTime",
    }),
    new Field_1.default({
        "name": "WeatherNetworkPriority",
        "type": "double",
        "alias": "WeatherNetworkPriority",
    }),
];
let layer;
const initLayer = (jsonUrl, view) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    layer = yield layerUtil.initLayer(jsonUrl, "weather-stations-layer", "Weather Stations", renderer, fields, "point", false);
    layer.definitionExpression = "WeatherNetworkPriority = 0";
    view.watch("scale", (scale) => {
        // console.log(scale)
        if (scale > 577790.554289) {
            layer.definitionExpression = "WeatherNetworkPriority = 0";
            layer.refresh();
        }
        else {
            layer.definitionExpression = "1=1";
            layer.refresh();
        }
    });
    return layer;
});
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "WeatherStationsLayer is not ready yet!";
    }
    return layer;
};
// let layer: GeoJSONLayer | undefined;
// export const initLayer = (url: string): GeoJSONLayer => {
//     layer = new GeoJSONLayer({
//         id: "weather-stations-layer",
//         url: url,
//         title: "Weather Stations",
//         renderer: weatherStationRenderer,
//         visible: false
//     });
//     return layer;
// }
// const getLayer = (): GeoJSONLayer => {
//     if (!layer) {
//         throw "WeatherStationsLayer is not ready yet!";
//     }
//     return layer;
// }
exports.default = getLayer;
//# sourceMappingURL=WeatherStationsLayer.js.map