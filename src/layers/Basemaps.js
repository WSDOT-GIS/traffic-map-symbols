<<<<<<< HEAD
define(["require", "exports", "tslib", "@arcgis/core/Basemap", "@arcgis/core/layers/MapImageLayer"], function (require, exports, tslib_1, Basemap_1, MapImageLayer_1) {
=======
define(["require", "exports", "tslib", "@arcgis/core/Basemap", "@arcgis/core/layers/TileLayer"], function (require, exports, tslib_1, Basemap_1, TileLayer_1) {
>>>>>>> 82846084d7544b71bf2a96e986be3aa7b5929c91
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.satelliteBasemap = exports.wsdotBasemap = void 0;
    Basemap_1 = tslib_1.__importDefault(Basemap_1);
<<<<<<< HEAD
    MapImageLayer_1 = tslib_1.__importDefault(MapImageLayer_1);
    var urlBasemap = "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/WebBaseMapWebMercator/MapServer";
    exports.wsdotBasemap = new Basemap_1.default({
        baseLayers: [
            new MapImageLayer_1.default({
=======
    TileLayer_1 = tslib_1.__importDefault(TileLayer_1);
    var urlBasemap = "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/WebBaseMapWebMercator/MapServer";
    exports.wsdotBasemap = new Basemap_1.default({
        baseLayers: [
            new TileLayer_1.default({
>>>>>>> 82846084d7544b71bf2a96e986be3aa7b5929c91
                url: urlBasemap,
            }),
        ],
        title: "WSDOT Basemap",
        id: "wsdot-basemap",
    });
    exports.satelliteBasemap = Basemap_1.default.fromId("satellite");
});
//# sourceMappingURL=Basemaps.js.map