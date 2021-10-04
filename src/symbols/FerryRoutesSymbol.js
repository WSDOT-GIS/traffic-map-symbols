"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ferryRoutesSymbol = void 0;
const tslib_1 = require("tslib");
const SimpleLineSymbol_1 = tslib_1.__importDefault(require("@arcgis/core/symbols/SimpleLineSymbol"));
const ferryRoutesSymbol = new SimpleLineSymbol_1.default({
    style: "short-dash",
    color: [88, 128, 202],
    width: "5px",
    cap: "square"
});
exports.ferryRoutesSymbol = ferryRoutesSymbol;
//# sourceMappingURL=FerryRoutesSymbol.js.map