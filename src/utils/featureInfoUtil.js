import { project } from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
export const getGraphicsInfoById = async (graphic, layer) => {
    const query = layer.createQuery();
    const idName = layer.objectIdField;
    const theid = graphic.getObjectId();
    query.where = `${idName} = ${theid}`;
    query.outFields = ["*"];
    const response = await layer.queryFeatures(query);
    const g = response.features[0];
    if (g) {
        const info = convert2Info(g);
        return info;
    }
};
export const getFeatureInfoById = async (id, layer) => {
    const query = layer.createQuery();
    const idName = layer.objectIdField;
    query.where = `${idName} = ${id}`;
    query.outFields = ["*"];
    const response = await layer.queryFeatures(query);
    const g = response.features[0];
    if (g) {
        const info = convert2Info(g);
        return info;
    }
};
export const getFeatureInfosByIds = async (ids, layer) => {
    const query = layer.createQuery();
    const idName = layer.objectIdField;
    query.where = `${idName} IN ( ${ids.join(",")})`;
    query.outFields = ["*"];
    const response = await layer.queryFeatures(query);
    const infos = response.features.map(convert2Info);
    return infos;
};
export const getLineFromPointId = async (fieldName, value, layer) => {
    const query = layer.createQuery();
    // const field = layer.getField(fieldName);
    query.where = `${fieldName} = '${value}'`;
    query.returnGeometry = true;
    const response = await layer.queryFeatures(query);
    return response;
};
export const getFeatureInfoByUniqueField = async (fieldName, value, layer) => {
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
    const response = await layer.queryFeatures(query);
    const g = response.features[0];
    if (g) {
        const info = convert2Info(g);
        return info;
    }
};
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
    const projPt = project(mapPoint, SpatialReference.WebMercator);
    const info = {
        layerId: g.layer.id,
        attributes: g.attributes,
        id: g.getObjectId(),
        mapPoint: { x: projPt.x, y: projPt.y },
    };
    return info;
};
//# sourceMappingURL=featureInfoUtil.js.map