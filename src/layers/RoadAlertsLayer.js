"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initClosureLayer = exports.initPriorityLayer = void 0;
const tslib_1 = require("tslib");
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const UniqueValueRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/UniqueValueRenderer"));
const AlertSymbol_1 = require("@/symbols/AlertSymbol");
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const roadAlertsPriorityRenderer = new UniqueValueRenderer_1.default({
    field: "EventPriorityID",
    uniqueValueInfos: [
        {
            label: "HIGHEST IMPACT",
            value: 1,
            symbol: AlertSymbol_1.alertSymbolHighest
        },
        {
            label: "HIGH IMPACT",
            value: 2,
            symbol: AlertSymbol_1.alertSymbolHigh
        },
        {
            label: "MODERATE IMPACT",
            value: 3,
            symbol: AlertSymbol_1.alertSymbolMedium
        },
        {
            label: "LOW IMPACT",
            value: 4,
            symbol: AlertSymbol_1.alertSymbol
        },
        {
            label: "LOWEST IMPACT",
            value: 5,
            symbol: AlertSymbol_1.alertSymbol
        }
    ]
});
const roadAlertsClosureRenderer = new SimpleRenderer_1.default({
    symbol: AlertSymbol_1.roadClosedSymbol,
});
let priorityLayer;
let closureLayer;
const initPriorityLayer = (url) => {
    priorityLayer = new GeoJSONLayer_1.default({
        id: "road-alerts-layer",
        url: url,
        title: "Travel Alerts",
        renderer: roadAlertsPriorityRenderer,
        visible: true,
        definitionExpression: "EventCategoryDescription<>'Closure'"
    });
    return priorityLayer;
};
exports.initPriorityLayer = initPriorityLayer;
const initClosureLayer = (url) => {
    closureLayer = new GeoJSONLayer_1.default({
        id: "road-closures-layer",
        url: url,
        title: "Travel Closure Alerts",
        renderer: roadAlertsClosureRenderer,
        visible: true,
        definitionExpression: "EventCategoryDescription='Closure'"
    });
    return closureLayer;
};
exports.initClosureLayer = initClosureLayer;
const getLayer = (id) => {
    let layerToReturn;
    if (id == "road-alerts-layer") {
        if (!priorityLayer) {
            throw "RoadAlertsLayer is not ready yet!";
        }
        else {
            layerToReturn = priorityLayer;
        }
    }
    if (id == "road-closures-layer") {
        if (!closureLayer) {
            throw "RoadAlertsLayer is not ready yet!";
        }
        else {
            layerToReturn = closureLayer;
        }
    }
    return layerToReturn;
};
// export default RoadAlertsLayer
exports.default = getLayer;
//# sourceMappingURL=RoadAlertsLayer.js.map