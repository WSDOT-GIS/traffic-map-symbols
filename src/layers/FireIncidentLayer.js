"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const FeatureLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/FeatureLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const FireIncidentSymbol_1 = tslib_1.__importDefault(require("@/symbols/FireIncidentSymbol"));
const fireIncidentRenderer = new SimpleRenderer_1.default({
    symbol: FireIncidentSymbol_1.default
});
let layer;
const initLayer = (url) => {
    layer = new FeatureLayer_1.default({
        id: "fire-incidents-layer",
        url: url,
        title: "Fire Incidents",
        renderer: fireIncidentRenderer,
        visible: false,
        definitionExpression: "POOState= 'US-WA'",
        labelsVisible: false
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "Fire Incident is not ready yet!";
    }
    return layer;
};
exports.default = getLayer;
//# sourceMappingURL=FireIncidentLayer.js.map