"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bridgeRestrictionPoint = exports.roadRestrictionPoint = void 0;
const tslib_1 = require("tslib");
const SimpleMarkerSymbol_1 = tslib_1.__importDefault(require("@arcgis/core/symbols/SimpleMarkerSymbol"));
const roadRestrictionPoint = new SimpleMarkerSymbol_1.default({
    style: "circle",
    color: "green",
    size: "8px",
    outline: {
        color: [0, 0, 0],
        width: 1 // points
    }
});
exports.roadRestrictionPoint = roadRestrictionPoint;
const bridgeRestrictionPoint = new SimpleMarkerSymbol_1.default({
    style: "circle",
    color: "orange",
    size: "8px",
    outline: {
        color: [0, 0, 0],
        width: 1 // points
    }
});
exports.bridgeRestrictionPoint = bridgeRestrictionPoint;
//# sourceMappingURL=PointRestrictionsSymbol.js.map