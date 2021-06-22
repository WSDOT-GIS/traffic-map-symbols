define(["require", "exports", "tslib", "../symbols/LineRestrictionsSymbol", "@arcgis/core/layers/GeoJSONLayer", "@arcgis/core/renderers/SimpleRenderer"], function (require, exports, tslib_1, LineRestrictionsSymbol_1, GeoJSONLayer_1, SimpleRenderer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GeoJSONLayer_1 = tslib_1.__importDefault(GeoJSONLayer_1);
    SimpleRenderer_1 = tslib_1.__importDefault(SimpleRenderer_1);
    /*const lineRestrictionsRenderer = new UniqueValueRenderer({
        field:"TType",
        uniqueValueInfos: [{
            // All features with value of "North" will be blue
            value: "R",
            symbol: roadRestrictionLine
        }, {
            // All features with value of "East" will be green
            value: "B",
            symbol: bridgeRestrictionLine
        }],
        defaultSymbol: bridgeRestrictionLine
    })*/
    var lineRestrictionsRenderer = new SimpleRenderer_1.default({
        symbol: LineRestrictionsSymbol_1.roadRestrictionLine
    });
    var LineRestrictionsLayer = new GeoJSONLayer_1.default({
        id: "line-restrictions-layer",
        url: "http://hqtob1webtmdev1/GISData/LineRestrictions.json",
        title: "Restriction Lines",
        renderer: lineRestrictionsRenderer,
    });
    exports.default = LineRestrictionsLayer;
});
//# sourceMappingURL=LineRestrictionsLayer.js.map