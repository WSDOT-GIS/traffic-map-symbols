define(["require", "exports", "tslib", "@arcgis/core/Basemap", "@arcgis/core/layers/TileLayer"], function (require, exports, tslib_1, Basemap_1, TileLayer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.satelliteBasemap = exports.wsdotBasemap = void 0;
    Basemap_1 = tslib_1.__importDefault(Basemap_1);
    TileLayer_1 = tslib_1.__importDefault(TileLayer_1);
    var urlBasemap = "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/WebBaseMapWebMercator/MapServer";
    exports.wsdotBasemap = new Basemap_1.default({
        baseLayers: [
            new TileLayer_1.default({
                url: urlBasemap,
            }),
        ],
        title: "WSDOT Basemap",
        id: "wsdot-basemap",
    });
    exports.satelliteBasemap = Basemap_1.default.fromId("satellite");
});
//# sourceMappingURL=Basemaps.js.map