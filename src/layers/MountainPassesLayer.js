define(["require", "exports", "tslib", "@arcgis/core/layers/GeoJSONLayer", "@arcgis/core/renderers/SimpleRenderer", "@/symbols/MountainPassSymbol"], function (require, exports, tslib_1, GeoJSONLayer_1, SimpleRenderer_1, MountainPassSymbol_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GeoJSONLayer_1 = tslib_1.__importDefault(GeoJSONLayer_1);
    SimpleRenderer_1 = tslib_1.__importDefault(SimpleRenderer_1);
    MountainPassSymbol_1 = tslib_1.__importDefault(MountainPassSymbol_1);
    var mountainPassRenderer = new SimpleRenderer_1.default({
        symbol: MountainPassSymbol_1.default
    });
    var MountainPassesLayer = new GeoJSONLayer_1.default({
        id: "mountain-passes-layer",
        url: "https://data.wsdot.wa.gov/travelcenter/ MountainPasses.json",
        title: "Mountain Passes",
        renderer: mountainPassRenderer,
        visible: false
    });
    exports.default = MountainPassesLayer;
});
//# sourceMappingURL=MountainPassesLayer.js.map