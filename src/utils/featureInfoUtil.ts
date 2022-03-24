import Graphic from "@arcgis/core/Graphic";
import FeatureInfo from "@/types/FeatureInfo";
// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import { project } from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import FeatureSet from "@arcgis/core/tasks/support/FeatureSet";
/**
 * @param graphic
 * @param layer
 */
export const getGraphicsInfoById = async (graphic: Graphic, layer: FeatureLayer): Promise<FeatureInfo | undefined> => {
    const query = layer.createQuery();
    const idName = layer.objectIdField;
    const theid = graphic.getObjectId()
    query.where = `${idName} = ${theid}`;
    query.outFields = ["*"];
    const response = await layer.queryFeatures(query);
    const g = response.features[0];
    if (g) {
        const info = convert2Info(g);
        return info;
    }
}

/**
 * @param id
 * @param layer
 */
export const getFeatureInfoById = async (id: number, layer: FeatureLayer): Promise<FeatureInfo | undefined> => {
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
}

/**
 * @param ids
 * @param layer
 */
export const getFeatureInfosByIds = async (ids: number[], layer: FeatureLayer): Promise<FeatureInfo[]> => {
    const query = layer.createQuery();
    const idName = layer.objectIdField;
    query.where = `${idName} IN ( ${ids.join(",")})`;
    query.outFields = ["*"];
    const response = await layer.queryFeatures(query);
    const infos = response.features.map(convert2Info);
    return infos;
}

/**
 * @param fieldName
 * @param value
 * @param layer
 */
export const getLineFromPointId = async (fieldName: string, value: number | string, layer: FeatureLayer): Promise<FeatureSet> => {
    const query = layer.createQuery();
    query.where = `${fieldName} = '${value}'`;
    query.returnGeometry = true
    const response = await layer.queryFeatures(query);
    console.log(response)
    return response
}
/**
 * @param fieldName
 * @param value
 * @param layer
 */
export const getFeatureInfoByUniqueField = async (fieldName: string, value: number | string, layer: FeatureLayer): Promise<FeatureInfo | undefined> => {
    const query = layer.createQuery();
    const field = layer.getField(fieldName);
    query.where = `${fieldName} = `;
    if (field.type == "string" || field.type == "date") {
        query.where += `'${value}'`
    } else {
        query.where += value
    }
    query.outFields = ["*"];
    const response = await layer.queryFeatures(query);
    const g = response.features[0];
    if (g) {
        const info = convert2Info(g);
        return info;
    }
}

const convert2Info = (g: Graphic) => {
    let mapPoint: Point;
    // Get the mid/center point...
    switch (g.geometry.type) {
        case "point": {
            mapPoint = g.geometry as Point;
            break;
        }
        case "polygon": {
            const polygon = g.geometry as Polygon;
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
    const projPt = project(
        mapPoint,
        SpatialReference.WebMercator
    ) as Point;

    const info: FeatureInfo = {
        layerId: g.layer.id,
        attributes: g.attributes,
        id: g.getObjectId(),
        mapPoint: { x: projPt.x, y: projPt.y },
    }
    return info;
}

