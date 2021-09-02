"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bridgeRestrictionLine = exports.roadRestrictionLine = void 0;
const tslib_1 = require("tslib");
const SimpleLineSymbol_1 = tslib_1.__importDefault(require("@arcgis/core/symbols/SimpleLineSymbol"));
const roadRestrictionLine = new SimpleLineSymbol_1.default({
    style: "solid",
    color: "green",
    width: "5px",
});
exports.roadRestrictionLine = roadRestrictionLine;
const bridgeRestrictionLine = new SimpleLineSymbol_1.default({
    style: "solid",
    color: "orange",
    width: "5px",
});
exports.bridgeRestrictionLine = bridgeRestrictionLine;
//# sourceMappingURL=LineRestrictionsSymbol.js.map