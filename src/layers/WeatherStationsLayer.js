define(["require", "exports", "tslib", "@arcgis/core/layers/GeoJSONLayer", "@arcgis/core/renderers/SimpleRenderer", "@/symbols/WeatherStationSymbol"], function (require, exports, tslib_1, GeoJSONLayer_1, SimpleRenderer_1, WeatherStationSymbol_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GeoJSONLayer_1 = tslib_1.__importDefault(GeoJSONLayer_1);
    SimpleRenderer_1 = tslib_1.__importDefault(SimpleRenderer_1);
    var weatherStationRenderer = new SimpleRenderer_1.default({
        symbol: WeatherStationSymbol_1.weatherStationSymbol
    });
    var WeatherStationsLayer = new GeoJSONLayer_1.default({
        id: "weather-stations-layer",
        url: "https://data.wsdot.wa.gov/travelcenter/ WeatherStations.json",
        title: "Weather Stations",
        renderer: weatherStationRenderer,
        //popupTemplate: weatherStationsPopup,
        visible: false
    });
    exports.default = WeatherStationsLayer;
});
//# sourceMappingURL=WeatherStationsLayer.js.map