define(["require", "exports", "tslib", "@arcgis/core/renderers/UniqueValueRenderer", "../symbols/LineRestrictionsSymbol", "@arcgis/core/layers/GeoJSONLayer"], function (require, exports, tslib_1, UniqueValueRenderer_1, LineRestrictionsSymbol_1, GeoJSONLayer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    UniqueValueRenderer_1 = tslib_1.__importDefault(UniqueValueRenderer_1);
    GeoJSONLayer_1 = tslib_1.__importDefault(GeoJSONLayer_1);
    var lineRestrictionsRenderer = new UniqueValueRenderer_1.default({
        field: "TType",
        uniqueValueInfos: [{
                // All features with value of "North" will be blue
                value: "R",
                symbol: LineRestrictionsSymbol_1.roadRestrictionLine
            }, {
                // All features with value of "East" will be green
                value: "B",
                symbol: LineRestrictionsSymbol_1.bridgeRestrictionLine
            }]
    });
    var LineRestrictionsLayer = new GeoJSONLayer_1.default({
        id: "line-restrictions-layer",
        url: "http://hqtob1webtmdev1/GISData/park-ride.geojson",
        title: "Restriction Lines",
        renderer: lineRestrictionsRenderer,
    });
    exports.default = LineRestrictionsLayer;
});
//# sourceMappingURL=LineRestrictionsLayer.js.map