"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBasemapName = exports.toggleBasemapInfo = exports.getBasemapInfo = exports.getDefaultBasemapInfo = void 0;
const tslib_1 = require("tslib");
const Basemap_1 = tslib_1.__importDefault(require("@arcgis/core/Basemap"));
const TileLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/TileLayer"));
const getDefaultBasemapInfo = () => { return basemaps[0]; };
exports.getDefaultBasemapInfo = getDefaultBasemapInfo;
const urlBasemap = 
//"https://data.wsdot.wa.gov/arcgis/rest/services/Shared/WebBaseMapWebMercator/MapServer";
//"https://tiles.arcgis.com/tiles/IYrj3otxNjPsrTRD/arcgis/rest/services/TravelCenterBasemapTileTest/MapServer"
"https://tiles.arcgis.com/tiles/IYrj3otxNjPsrTRD/arcgis/rest/services/TravelCenterBasemap/MapServer";
// Array of basemaps. The first one is the default.
const basemaps = [
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
        basemap: Basemap_1.default.fromId("satellite")
    }
];
const getBasemapInfo = (name) => {
    const results = basemaps.filter((x) => {
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
const toggleBasemapInfo = (currentName) => {
    let idx = -1;
    for (let i = 0; i < basemaps.length; i++) {
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
const validateBasemapName = (name) => {
    const result = basemaps.filter((item) => {
        return item.name === name;
    });
    return result.length > 0;
};
exports.validateBasemapName = validateBasemapName;
//# sourceMappingURL=Basemaps.js.map