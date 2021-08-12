"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const TravelTimeSymbol_1 = tslib_1.__importDefault(require("@/symbols/TravelTimeSymbol"));
// import WeatherStationInfo from "@/types/WeatherStationsInfo"
// import Graphic from "@arcgis/core/Graphic"
const travelTimesRenderer = new SimpleRenderer_1.default({
    symbol: TravelTimeSymbol_1.default
});
const TravelTimesLayer = new GeoJSONLayer_1.default({
    id: "travel-times-layer",
    url: "https://data.wsdot.wa.gov/travelcenter/TravelTimes.json",
    title: "Travel Times",
    renderer: travelTimesRenderer,
    //popupTemplate: weatherStationsPopup,
    visible: false
});
exports.default = TravelTimesLayer;
//# sourceMappingURL=TravelTimeLayer.js.map