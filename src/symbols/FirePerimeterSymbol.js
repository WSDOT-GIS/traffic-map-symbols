"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const SimpleFillSymbol_1 = tslib_1.__importDefault(require("@arcgis/core/symbols/SimpleFillSymbol"));
const symbol = new SimpleFillSymbol_1.default({
    color: [255, 0, 0, 0.25],
    outline: {
        width: 1,
        color: "red"
    }
});
exports.default = symbol;
//# sourceMappingURL=FirePerimeterSymbol.js.map