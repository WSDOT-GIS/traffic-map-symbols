"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const WeatherStationSymbol_1 = require("@/symbols/WeatherStationSymbol");
// import WeatherStationInfo from "@/types/WeatherStationsInfo"
// import Graphic from "@arcgis/core/Graphic"
const weatherStationRenderer = new SimpleRenderer_1.default({
    symbol: WeatherStationSymbol_1.weatherStationSymbol
});
const WeatherStationsLayer = new GeoJSONLayer_1.default({
    id: "weather-stations-layer",
    url: "https://data.wsdot.wa.gov/travelcenter/WeatherStations.json",
    title: "Weather Stations",
    renderer: weatherStationRenderer,
    //popupTemplate: weatherStationsPopup,
    visible: false
});
exports.default = WeatherStationsLayer;
//# sourceMappingURL=WeatherStationsLayer.js.map