"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeatureInfoByUniqueField = exports.getLineFromPointRestriction = exports.getFeatureInfosByIds = exports.getFeatureInfoById = exports.getGraphicsInfoById = void 0;
const tslib_1 = require("tslib");
const projection_1 = require("@arcgis/core/geometry/projection");
const SpatialReference_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/SpatialReference"));
const getGraphicsInfoById = (graphic, layer) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const query = layer.createQuery();
    const idName = layer.objectIdField;
    const theid = graphic.getObjectId();
    query.where = `${idName} = ${theid}`;
    query.outFields = ["*"];
    const response = yield layer.queryFeatures(query);
    const g = response.features[0];
    if (g) {
        const info = convert2Info(g);
        return info;
    }
});
exports.getGraphicsInfoById = getGraphicsInfoById;
const getFeatureInfoById = (id, layer) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const query = layer.createQuery();
    const idName = layer.objectIdField;
    query.where = `${idName} = ${id}`;
    query.outFields = ["*"];
    const response = yield layer.queryFeatures(query);
    const g = response.features[0];
    if (g) {
        const info = convert2Info(g);
        return info;
    }
});
exports.getFeatureInfoById = getFeatureInfoById;
const getFeatureInfosByIds = (ids, layer) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const query = layer.createQuery();
    const idName = layer.objectIdField;
    query.where = `${idName} IN ( ${ids.join(",")})`;
    query.outFields = ["*"];
    const response = yield layer.queryFeatures(query);
    const infos = response.features.map(convert2Info);
    return infos;
});
exports.getFeatureInfosByIds = getFeatureInfosByIds;
const getLineFromPointRestriction = (fieldName, value, layer) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const query = layer.createQuery();
    // const field = layer.getField(fieldName);
    query.where = `${fieldName} = '${value}'`;
    query.returnGeometry = true;
    const response = yield layer.queryFeatures(query);
    return response;
});
exports.getLineFromPointRestriction = getLineFromPointRestriction;
const getFeatureInfoByUniqueField = (fieldName, value, layer) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const query = layer.createQuery();
    const field = layer.getField(fieldName);
    query.where = `${fieldName} = `;
    if (field.type == "string" || field.type == "date") {
        query.where += `'${value}'`;
    }
    else {
        query.where += value;
    }
    query.outFields = ["*"];
    const response = yield layer.queryFeatures(query);
    const g = response.features[0];
    if (g) {
        const info = convert2Info(g);
        return info;
    }
});
exports.getFeatureInfoByUniqueField = getFeatureInfoByUniqueField;
const convert2Info = (g) => {
    let mapPoint;
    // Get the mid/center point...
    switch (g.geometry.type) {
        case "point": {
            mapPoint = g.geometry;
            break;
        }
        case "polygon": {
            const polygon = g.geometry;
            mapPoint = polygon.centroid;
            break;
        }
        default: {
            const ext = g.geometry.extent;
            mapPoint = ext.center;
            break;
        }
    }
    // Project to the map coordinate. Without doing this lat/long get passed.
    const projPt = projection_1.project(mapPoint, SpatialReference_1.default.WebMercator);
    const info = {
        layerId: g.layer.id,
        attributes: g.attributes,
        id: g.getObjectId(),
        mapPoint: { x: projPt.x, y: projPt.y },
    };
    return info;
};
//# sourceMappingURL=featureInfoUtil.js.map