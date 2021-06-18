define(["require", "exports", "tslib", "@arcgis/core/renderers/UniqueValueRenderer", "../symbols/PointRestrictionsSymbol", "@arcgis/core/layers/GeoJSONLayer"], function (require, exports, tslib_1, UniqueValueRenderer_1, PointRestrictionsSymbol_1, GeoJSONLayer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    UniqueValueRenderer_1 = tslib_1.__importDefault(UniqueValueRenderer_1);
    GeoJSONLayer_1 = tslib_1.__importDefault(GeoJSONLayer_1);
    var pointRestrictionsRenderer = new UniqueValueRenderer_1.default({
        field: "TType",
        uniqueValueInfos: [{
                // All features with value of "North" will be blue
                value: "R",
                symbol: PointRestrictionsSymbol_1.roadRestrictionPoint
            }, {
                // All features with value of "East" will be green
                value: "B",
                symbol: PointRestrictionsSymbol_1.bridgeRestrictionPoint
            }]
    });
    var PointRestrictionsLayer = new GeoJSONLayer_1.default({
        id: "point-restrictions-layer",
        url: "http://hqtob1webtmdev1/GISData/park-ride.geojson",
        title: "Restriction Points",
        renderer: pointRestrictionsRenderer,
    });
    exports.default = PointRestrictionsLayer;
});
//# sourceMappingURL=PointRestrictionsLayer.js.map