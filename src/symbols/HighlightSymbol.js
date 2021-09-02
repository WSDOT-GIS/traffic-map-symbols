"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const SimpleMarkerSymbol_1 = tslib_1.__importDefault(require("@arcgis/core/symbols/SimpleMarkerSymbol"));
const symbol = new SimpleMarkerSymbol_1.default({
    style: "circle",
    color: [0, 0, 0, 0],
    size: "26px",
    outline: {
        color: "#00ffff",
        width: 2 // points
    }
});
exports.default = symbol;
//# sourceMappingURL=HighlightSymbol.js.map