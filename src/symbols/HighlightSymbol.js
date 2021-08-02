define(["require", "exports", "tslib", "@arcgis/core/symbols/SimpleMarkerSymbol"], function (require, exports, tslib_1, SimpleMarkerSymbol_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    SimpleMarkerSymbol_1 = tslib_1.__importDefault(SimpleMarkerSymbol_1);
    var symbol = new SimpleMarkerSymbol_1.default({
        style: "circle",
        color: [0, 0, 0, 0],
        size: "26px",
        outline: {
            color: "#00ffff",
            width: 2 // points
        }
    });
    exports.default = symbol;
});
//# sourceMappingURL=HighlightSymbol.js.map