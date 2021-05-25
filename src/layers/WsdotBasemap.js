define(["require", "exports", "tslib", "@arcgis/core/Basemap", "@arcgis/core/layers/MapImageLayer"], function (require, exports, tslib_1, Basemap_1, MapImageLayer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Basemap_1 = tslib_1.__importDefault(Basemap_1);
    MapImageLayer_1 = tslib_1.__importDefault(MapImageLayer_1);
    var urlBasemap = "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/WebBaseMapWebMercator/MapServer";
    //"https://tiles.arcgis.com/tiles/IYrj3otxNjPsrTRD/arcgis/rest/services/TravelCenterBasemapTileTest/MapServer"
    var basemap = new Basemap_1.default({
        baseLayers: [
            new MapImageLayer_1.default({
                url: urlBasemap,
            }),
        ],
        title: "WSDOT Basemap",
        id: "wsdot-basemap",
    });
    exports.default = basemap;
});
//# sourceMappingURL=WsdotBasemap.js.map