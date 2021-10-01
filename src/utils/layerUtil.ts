import LayerInfo from "@/types/LayerInfo";
import Point from "@arcgis/core/geometry/Point";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Graphic from "@arcgis/core/Graphic";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import WebMap from "@arcgis/core/WebMap";
import { geographicToWebMercator } from "@arcgis/core/geometry/support/webMercatorUtils";
import Geometry from "@arcgis/core/geometry/Geometry";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as geomJsonUtils from "@arcgis/core/geometry/support/jsonUtils";

/**  Mapping between layer groups (type in URL query param) and layer IDs...
 *   * id
 *      ID for the layer group (type).
 *   * layerIds 
 *      Popup is opened for the first layer in the layerIds array.
 *   * uniqueField
 *      Unique field that is from the source database. Do not use ESRI ID.
*/
const layerGroups = [
    { id: "camera", layerIds: ["traffic-camera-layer"], uniqueField: "CameraID" },
    { id: "alert", layerIds: ["road-alerts-layer"], uniqueField: "EventID" },
    { id: "restriction", layerIds: ["point-restrictions-layer", "line-restrictions-layer"], uniqueField: "UniqueId" },
    { id: "fire", layerIds: ["fire-incidents-layer", "fire-perimeters-layer"], uniqueField: "UniqueFireIdentifier" },
    { id: "time", layerIds: ["travel-times-layer"], uniqueField: "TravelTimesID" },
    { id: "mountain", layerIds: ["mountain-passes-layer"], uniqueField: "MountainPassId" },
    { id: "weather", layerIds: ["weather-stations-layer"], uniqueField: "WeatherStationId" },
    { id: "parkride", layerIds: ["park-ride-layer"], uniqueField: "" }, // TODO: need unique field
    { id: "restarea", layerIds: ["rest-areas-layer"], uniqueField: "" } // TODO: need unique field
]

export const getLayerIds = (groupId: string): string[] => {
    const result = layerGroups.find((item) => {
        return item.id === groupId;
    });
    if (result) {
        return result.layerIds;
    } else {
        throw "Failed to find layer IDs for " + groupId + ".";
    }
}

export const getUniqueField = (groupId: string): string => {
    const result = layerGroups.find((item) => {
        return item.id === groupId;
    });
    if (result) {
        return result.uniqueField;
    } else {
        throw "Failed to find ID field for " + groupId + ".";
    }
}
/**
 * Set the visibility of the specified layer in the layer list.
 * NOTE: The layer list need to be committed to the state store.
 * @param layerId 
 * @param visible 
 * @param layerList 
 * @returns 
 */
export const setLayerVisibility = (layerId: string, visible: boolean, layerList: LayerInfo[]): LayerInfo[] => {
    const result = layerList.find((item) => {
        return item.id === layerId;
    });
    if (result) {
        result.visible = visible;
    }
    return layerList
}
/**
 * Get a feature from the layer group.
 * @param uniqueValue 
 * Value from the unique field specified in the layerGroups.
 * @param groupId 
 * ID of the layer group (type). If the specified group has more than one layer, query is done against the first layer only.
 * @param map 
 * @returns 
 */
export const getFeature = async (uniqueValue: number | string, groupId: string, map: WebMap): Promise<Graphic | undefined> => {
    const fieldName = getUniqueField(groupId);
    const layerIds = getLayerIds(groupId);
    const layer = map.findLayerById(layerIds[0]);
    // Make sure the layer is loaded. If this is done too early, query does not resolve...
    await layer.when();
    if (layer.type !== "geojson") {
        throw layer.type + " is not supported.";
    }
    const gLayer = layer as GeoJSONLayer;
    const query = gLayer.createQuery();
    const field = gLayer.getField(fieldName);
    query.where = `${fieldName} = `;
    if (["string", "date"].includes(field.type)) {
        query.where += `'${uniqueValue}'`
    } else {
        query.where += uniqueValue
    }
    // console.log(gLayer.id + ", query: " + query.where);
    query.outFields = [gLayer.objectIdField]
    // console.log("querying...")
    const response = await gLayer.queryFeatures(query);
    // console.log("query end...")
    // console.log(JSON.stringify(response));
    if (response.features.length > 0) {
        return response.features[0];
    }
}

export const setLayerEvent = (layer: FeatureLayer, jsonUrl: string): void => {
    layer.watch("visible", (newValue, oldValue, propName, target) => {
        const lyr = target as FeatureLayer;
        if (newValue && lyr.source.length === 0) {
            reloadData(jsonUrl, lyr);
        }
    });
}

export const reloadData = async (jsonUrl: string, layer: FeatureLayer): Promise<void> => {
    // Fetch all features from JSON...
    const graphics = await fetchJsonData(jsonUrl);
    // Replace old with new features...
    await replaceFeatures(layer, graphics);
}

export const replaceFeatures = async (layer: FeatureLayer, newFeatures: Graphic[]): Promise<void> => {
    // Delete existing features...
    let msg = `Refreshed ${layer.id}, feature count before: `;
    const fs = await layer.queryFeatures();
    msg += fs.features.length;
    await layer.applyEdits({ deleteFeatures: fs.features });
    // Load features...
    await layer.applyEdits({ addFeatures: newFeatures });
    const fCount = await layer.queryFeatureCount();
    msg += `, after: ${fCount}`;
    console.log(msg);
    layer.refresh();
}

export const fetchJsonData = async (jsonUrl: string): Promise<Graphic[]> => {
    // Fetch all features from JSON...
    const response = await fetch(jsonUrl);
    const json = await response.json();
    const sr = SpatialReference.fromJSON(json.spatialReference);
    // Create graphic out of each feature...
    const graphics: Graphic[] = [];
    for (const each of json.features) {
        const geom = geomJsonUtils.fromJSON(each.geometry);
        geom.spatialReference = sr;
        graphics.push(new Graphic({
            geometry: geom,
            attributes: each.attributes ? each.attributes : each.properties,
        }));
    }
    return graphics;
}

export const fetchGeoJsonData = async (geojsonUrl: string, layer: GeoJSONLayer): Promise<Graphic[]> => {
    // Fetch all features from JSON...
    const response = await fetch(geojsonUrl);
    const json = await response.json();
    // Create graphic out of each feature...
    const graphics: Graphic[] = [];
    for (const each of json.features) {
        let geom: Geometry;
        if (layer.geometryType === "point") {
            const pt4326 = new Point({
                x: each.geometry.coordinates[0],
                y: each.geometry.coordinates[1],
                spatialReference: SpatialReference.WGS84
            });
            geom = geographicToWebMercator(pt4326);
        }
        else {
            throw "Not implemented yet."
        }
        graphics.push(new Graphic({
            geometry: geom,
            attributes: each.properties,
        }));
    }
    return graphics;
}