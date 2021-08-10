"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const AlertSymbol_1 = tslib_1.__importDefault(require("@/symbols/AlertSymbol"));
const roadAlertsRenderer = new SimpleRenderer_1.default({
    symbol: AlertSymbol_1.default
});
const RoadAlertsLayer = new GeoJSONLayer_1.default({
    id: "road-alerts-layer",
    url: "https://data.wsdot.wa.gov/travelcenter/RoadAlerts.json",
    title: "Travel Alerts",
    renderer: roadAlertsRenderer,
    visible: true
});
exports.default = RoadAlertsLayer;
//# sourceMappingURL=RoadAlertLayer.js.map