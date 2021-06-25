define(["require", "exports", "tslib", "@arcgis/core/symbols/SimpleMarkerSymbol", "@/symbols/SVGIconDefinitions"], function (require, exports, tslib_1, SimpleMarkerSymbol_1, SVGIconDefinitions_1) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.weatherStationSymbol = void 0;
    SimpleMarkerSymbol_1 = tslib_1.__importDefault(SimpleMarkerSymbol_1);
    console.log(SVGIconDefinitions_1.layerListIcons);
    var weatherStationSymbol = new SimpleMarkerSymbol_1.default({
        color: [0, 255, 255],
        size: "20px",
        path: (_a = SVGIconDefinitions_1.layerListIcons.find(function (e) { return e.title == "Weather Stations"; })) === null || _a === void 0 ? void 0 : _a.path
    });
    exports.weatherStationSymbol = weatherStationSymbol;
});
//# sourceMappingURL=WeatherStationSymbol.js.map