define(["require", "exports", "tslib", "@arcgis/core/symbols/SimpleMarkerSymbol"], function (require, exports, tslib_1, SimpleMarkerSymbol_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bridgeRestrictionPoint = exports.roadRestrictionPoint = void 0;
    SimpleMarkerSymbol_1 = tslib_1.__importDefault(SimpleMarkerSymbol_1);
    var roadRestrictionPoint = new SimpleMarkerSymbol_1.default({
        style: "circle",
        color: "green",
        size: "8px",
        outline: {
            color: [0, 0, 0],
            width: 1 // points
        }
    });
    exports.roadRestrictionPoint = roadRestrictionPoint;
    var bridgeRestrictionPoint = new SimpleMarkerSymbol_1.default({
        style: "circle",
        color: "orange",
        size: "8px",
        outline: {
            color: [0, 0, 0],
            width: 1 // points
        }
    });
    exports.bridgeRestrictionPoint = bridgeRestrictionPoint;
});
//# sourceMappingURL=PointRestrictionsSymbol.js.map