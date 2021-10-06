"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const FeatureLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/FeatureLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const AlertSymbol_1 = require("@/symbols/AlertSymbol");
const renderer = new SimpleRenderer_1.default({
    symbol: AlertSymbol_1.alertSymbol
});
let layer;
/*export const initLayer = (url: string): FeatureLayer => {
    layer = new FeatureLayer({
        id: "ferry-routes-points-layer",
        url: url,
        title: "ferryRoutesPoints",
        renderer: ferryRoutesPointsRenderer,
        visible: true,
        labelsVisible: false
    });
    console.log(layer)
    return layer;
}*/
const fields = [
    new Field_1.default({
        name: "OBJECTID",
        type: "oid",
        alias: "OBJECTID",
    }),
    new Field_1.default({
        name: "Owner",
        type: "string",
        alias: "Owner",
    }),
    new Field_1.default({
        name: "SR",
        type: "string",
        alias: "State Route",
    }),
    new Field_1.default({
        name: "Display",
        type: "string",
        alias: "Display",
    }),
    new Field_1.default({
        name: "FerryRouteID",
        type: "integer",
        alias: "Route ID",
    }),
    new Field_1.default({
        name: "START_X",
        type: "double",
        alias: "Start X",
    }),
    new Field_1.default({
        name: "START_Y",
        type: "double",
        alias: "START Y",
    }),
    new Field_1.default({
        name: "Display",
        type: "string",
        alias: "Display",
    }),
];
const initLayer = (url) => {
    layer = new FeatureLayer_1.default({
        id: "ferry-routes-points-layer",
        url: url,
        title: "ferryRoutesPoints",
        //fields: fields,
        renderer: renderer,
        visible: true,
        labelsVisible: false
    });
    console.log(layer.id + " was initialized.");
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "Ferry Point Layer is not ready yet!";
    }
    return layer;
};
exports.default = getLayer;
//# sourceMappingURL=PointFerryRoutesLayer.js.map