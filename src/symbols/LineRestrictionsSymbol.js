define(["require", "exports", "tslib", "@arcgis/core/symbols/SimpleLineSymbol"], function (require, exports, tslib_1, SimpleLineSymbol_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bridgeRestrictionLine = exports.roadRestrictionLine = void 0;
    SimpleLineSymbol_1 = tslib_1.__importDefault(SimpleLineSymbol_1);
    var roadRestrictionLine = new SimpleLineSymbol_1.default({
        style: "solid",
        color: "green",
        width: "2px",
    });
    exports.roadRestrictionLine = roadRestrictionLine;
    var bridgeRestrictionLine = new SimpleLineSymbol_1.default({
        style: "solid",
        color: "orange",
        width: "2px",
    });
    exports.bridgeRestrictionLine = bridgeRestrictionLine;
});
//# sourceMappingURL=LineRestrictionsSymbol.js.map