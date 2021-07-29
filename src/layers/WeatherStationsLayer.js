define(["require", "exports", "tslib", "@arcgis/core/layers/GeoJSONLayer", "@arcgis/core/renderers/SimpleRenderer", "@/symbols/WeatherStationSymbol", "@/popup-templates/WeatherStationsPopup"], function (require, exports, tslib_1, GeoJSONLayer_1, SimpleRenderer_1, WeatherStationSymbol_1, WeatherStationsPopup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GeoJSONLayer_1 = tslib_1.__importDefault(GeoJSONLayer_1);
    SimpleRenderer_1 = tslib_1.__importDefault(SimpleRenderer_1);
    WeatherStationsPopup_1 = tslib_1.__importDefault(WeatherStationsPopup_1);
    var weatherStationRenderer = new SimpleRenderer_1.default({
        symbol: WeatherStationSymbol_1.weatherStationSymbol
    });
    var PointRestrictionsLayer = new GeoJSONLayer_1.default({
        id: "weather-stations-layer",
        url: "https://data.wsdot.wa.gov/travelcenter/ WeatherStations.json",
        title: "Weather Stations",
        renderer: weatherStationRenderer,
        popupTemplate: WeatherStationsPopup_1.default,
        visible: false
    });
    exports.default = PointRestrictionsLayer;
});
//# sourceMappingURL=WeatherStationsLayer.js.map