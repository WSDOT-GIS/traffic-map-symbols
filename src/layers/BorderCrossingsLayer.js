"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const layerUtil = tslib_1.__importStar(require("@/utils/layerUtil"));
const BorderCrossingsSymbol_1 = tslib_1.__importDefault(require("@/symbols/BorderCrossingsSymbol"));
const renderer = new SimpleRenderer_1.default({
    symbol: BorderCrossingsSymbol_1.default
});
const fields = [
    new Field_1.default({
        "name": "BorderCrossingDescription",
        "type": "string",
        "alias": "BorderCrossingDescription",
    }),
    new Field_1.default({
        "name": "WaitTimeText",
        "type": "string",
        "alias": "WaitTimeText",
    }),
    new Field_1.default({
        "name": "HTMLTable",
        "type": "string",
        "alias": "HTMLTable",
    })
];
let layer;
const initLayer = (jsonUrl) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    layer = yield layerUtil.initLayer(jsonUrl, "border-crossings-layer", "Border Crossing Points", renderer, fields, "point", false);
    return layer;
});
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "Border Crossings Layer is not ready yet!";
    }
    return layer;
};
exports.default = getLayer;
//# sourceMappingURL=BorderCrossingsLayer.js.map