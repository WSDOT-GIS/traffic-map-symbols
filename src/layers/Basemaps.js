define(["require", "exports", "tslib", "@arcgis/core/Basemap", "@arcgis/core/layers/TileLayer"], function (require, exports, tslib_1, Basemap_1, TileLayer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateBasemapName = exports.toggleBasemapInfo = exports.getBasemapInfo = exports.getDefaultBasemapInfo = void 0;
    Basemap_1 = tslib_1.__importDefault(Basemap_1);
    TileLayer_1 = tslib_1.__importDefault(TileLayer_1);
    var getDefaultBasemapInfo = function () { return basemaps[0]; };
    exports.getDefaultBasemapInfo = getDefaultBasemapInfo;
    var urlBasemap = 
    //"https://data.wsdot.wa.gov/arcgis/rest/services/Shared/WebBaseMapWebMercator/MapServer";
    "https://tiles.arcgis.com/tiles/IYrj3otxNjPsrTRD/arcgis/rest/services/TravelCenterBasemapTileTest/MapServer";
    // Array of basemaps. The first one is the default.
    var basemaps = [
        {
            name: "wsdot",
            basemap: new Basemap_1.default({
                baseLayers: [
                    new TileLayer_1.default({
                        url: urlBasemap,
                    }),
                ],
                title: "WSDOT Basemap",
                id: "wsdot-basemap",
            })
        }, {
            name: "satellite",
            basemap: Basemap_1.default.fromId("arcgis-imagery")
        }
    ];
    var getBasemapInfo = function (name) {
        var results = basemaps.filter(function (x) {
            return x.name == name;
        });
        if (results.length > 0) {
            return results[0];
        }
        else {
            return exports.getDefaultBasemapInfo();
        }
    };
    exports.getBasemapInfo = getBasemapInfo;
    // Select the next basemap info in the array.
    var toggleBasemapInfo = function (currentName) {
        var idx = -1;
        for (var i = 0; i < basemaps.length; i++) {
            if (basemaps[i].name == currentName) {
                idx = i;
                break;
            }
        }
        if (idx >= -1 && idx < basemaps.length - 1) {
            return basemaps[idx + 1];
        }
        else {
            return basemaps[0];
        }
    };
    exports.toggleBasemapInfo = toggleBasemapInfo;
    // Make sure the base map name is valid...
    var validateBasemapName = function (name) {
        var result = basemaps.filter(function (item) {
            return item.name === name;
        });
        return result.length > 0;
    };
    exports.validateBasemapName = validateBasemapName;
});
//# sourceMappingURL=Basemaps.js.map