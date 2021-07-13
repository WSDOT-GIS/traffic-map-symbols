define(["require", "exports", "tslib", "../symbols/LineRestrictionsSymbol", "@arcgis/core/layers/GeoJSONLayer", "@arcgis/core/renderers/UniqueValueRenderer"], function (require, exports, tslib_1, LineRestrictionsSymbol_1, GeoJSONLayer_1, UniqueValueRenderer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GeoJSONLayer_1 = tslib_1.__importDefault(GeoJSONLayer_1);
    UniqueValueRenderer_1 = tslib_1.__importDefault(UniqueValueRenderer_1);
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
            }],
        defaultSymbol: LineRestrictionsSymbol_1.bridgeRestrictionLine
    });
    /*const lineRestrictionsRenderer = new SimpleRenderer({
        symbol:roadRestrictionLine
    })*/
    var LineRestrictionsLayer = new GeoJSONLayer_1.default({
        id: "line-restrictions-layer",
        url: "http://hqtob1webtmdev1/GISData/LineRestrictions.json",
        title: "Restriction Lines",
        renderer: lineRestrictionsRenderer,
        visible: false
        //popupTemplate: restrictionsPopup,
        // featureReduction: clusterConfig
    });
    exports.default = LineRestrictionsLayer;
});
//# sourceMappingURL=LineRestrictionsLayer.js.map