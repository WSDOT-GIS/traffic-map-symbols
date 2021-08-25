"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const WeatherStationSymbol_1 = tslib_1.__importDefault(require("@/symbols/WeatherStationSymbol"));
const weatherStationRenderer = new SimpleRenderer_1.default({
    symbol: WeatherStationSymbol_1.default
});
let layer;
const initLayer = (url) => {
    layer = new GeoJSONLayer_1.default({
        id: "weather-stations-layer",
        url: url,
        title: "Weather Stations",
        renderer: weatherStationRenderer,
        visible: false
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "WeatherStationsLayer is not ready yet!";
    }
    return layer;
};
// const WeatherStationsLayer = new GeoJSONLayer({
//     id: "weather-stations-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/WeatherStations.json",
//     title: "Weather Stations",
//     renderer: weatherStationRenderer,
//     visible: false
// })
exports.default = getLayer;
//# sourceMappingURL=WeatherStationsLayer.js.map