"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisibleArea = exports.getFeatureById = exports.initLayer = void 0;
const tslib_1 = require("tslib");
const FeatureLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/FeatureLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const SimpleFillSymbol_1 = tslib_1.__importDefault(require("@arcgis/core/symbols/SimpleFillSymbol"));
const SpatialReference_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/SpatialReference"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const geometryEngine_1 = require("@arcgis/core/geometry/geometryEngine");
// Create a symbol for rendering the graphic
const renderer = new SimpleRenderer_1.default({
    symbol: new SimpleFillSymbol_1.default({
        style: "solid",
        outline: { color: [142, 9, 0, 1] },
        color: [142, 9, 0, 0.3]
    })
});
const fields = [
    new Field_1.default({
        name: "AppGenId",
        alias: "AppGenId",
        type: "oid"
    }),
    new Field_1.default({
        name: "EventID",
        alias: "EventID",
        type: "integer"
    }),
    new Field_1.default({
        name: "Name",
        alias: "Name",
        type: "string",
    }),
];
let layer;
const initLayer = (features) => {
    layer = new FeatureLayer_1.default({
        id: "alert-area-layer",
        title: "Alert Areas",
        fields: fields,
        objectIdField: "AppGenId",
        geometryType: "polygon",
        spatialReference: SpatialReference_1.default.WebMercator,
        renderer: renderer,
        source: features,
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "Alert Area Layer is not ready yet!";
    }
    return layer;
};
exports.default = getLayer;
const getFeatureById = (eventId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const layer = getLayer();
    const query = layer.createQuery();
    query.where = "EventID = " + eventId;
    query.outFields = ["*"];
    const response = yield layer.queryFeatures(query);
    return response.features[0];
});
exports.getFeatureById = getFeatureById;
const getVisibleArea = (eventId, mapExtent) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const g = yield exports.getFeatureById(eventId);
    return geometryEngine_1.clip(g.geometry, mapExtent);
});
exports.getVisibleArea = getVisibleArea;
//# sourceMappingURL=AlertAreaLayer.js.map