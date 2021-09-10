"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const UniqueValueRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/UniqueValueRenderer"));
const AlertSymbol_1 = require("@/symbols/AlertSymbol");
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const roadAlertsRenderer = new UniqueValueRenderer_1.default({
    field: "EventPriorityID",
    uniqueValueInfos: [
        {
            label: "HIGHEST IMPACT",
            value: 1,
            symbol: AlertSymbol_1.roadClosedSymbol
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
        }
        /*
        {
            label:"LOWEST IMPACT",
            value: 5,
            symbol: alertSymbol
        }
        */
    ]
});
const fields = [
    new Field_1.default({
        name: "EventID", type: "integer", alias: "EventID"
    }),
    new Field_1.default({ name: "EventCategoryDescription", type: "string", alias: "EventCategoryDescription", length: 400 }),
    new Field_1.default({ name: "EventCategoryID", type: "integer", alias: "EventCategoryID" }),
    new Field_1.default({ name: "CriticalEventIndicator", type: "small-integer", alias: "CriticalEventIndicator" }),
    new Field_1.default({ name: "LastModifiedDate", type: "date", alias: "LastModifiedDate" }),
    new Field_1.default({ name: "IconName", type: "string", alias: "IconName", length: 20 }),
    new Field_1.default({ name: "EventPriorityID", type: "integer", alias: "EventPriorityID" }),
    new Field_1.default({ name: "EventPriorityDescription", type: "string", alias: "EventPriorityDescription", length: 150 }),
    new Field_1.default({ name: "Road", type: "string", alias: "Road", length: 50 }),
    new Field_1.default({ name: "RoadDirection", type: "string", alias: "RoadDirection", length: 15 }),
    new Field_1.default({ name: "RoadType", type: "string", alias: "RoadType", length: 1 }),
    new Field_1.default({ name: "Latitude", type: "double", alias: "Latitude" }),
    new Field_1.default({ name: "Longitude", type: "double", alias: "Longitude" }),
    new Field_1.default({ name: "DisplayOrder", type: "integer", alias: "DisplayOrder" }),
    new Field_1.default({ name: "HeadlineMessage", type: "string", alias: "HeadlineMessage", length: 8000 }),
    new Field_1.default({ name: "ExtendedMessage", type: "string", alias: "ExtendedMessage", length: 5000 }),
    new Field_1.default({ name: "LocationName", type: "string", alias: "LocationName", length: 20 }),
    new Field_1.default({ name: "StartSRMP", type: "single", alias: "StartSRMP" }),
    new Field_1.default({ name: "EndSRMP", type: "single", alias: "EndSRMP" }),
    new Field_1.default({ name: "RecurringEvent", type: "integer", alias: "RecurringEvent" }),
    new Field_1.default({
        name: "StartTime", type: "date", alias: "StartTime", length: 8
    }),
    new Field_1.default({
        name: "EndTime", type: "date", alias: "EndTime", length: 8
    }),
    new Field_1.default({ name: "SourceSystemID", type: "integer", alias: "SourceSystemID" }),
    new Field_1.default({ name: "SourceSystemEventID", type: "string", alias: "SourceSystemEventID", length: 50 }),
    new Field_1.default({ name: "TMSOverlap", type: "integer", alias: "TMSOverlap" }),
    new Field_1.default({ name: "RegionID", type: "small-integer", alias: "RegionID" }),
];
let layer;
const initLayer = (url) => {
    layer = new GeoJSONLayer_1.default({
        id: "road-alerts-layer",
        url: url,
        title: "Travel Alerts",
        renderer: roadAlertsRenderer,
        visible: true,
        fields: fields,
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "RoadAlertsLayer is not ready yet!";
    }
    return layer;
};
// export default RoadAlertsLayer
exports.default = getLayer;
//# sourceMappingURL=RoadAlertsLayer.js.map