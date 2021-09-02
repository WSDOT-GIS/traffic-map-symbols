import FeaturesetInfo from "@/types/FeaturesetInfo";
import LayerInfo from "@/types/LayerInfo";
import Graphic from "@arcgis/core/Graphic";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import WebMap from "@arcgis/core/WebMap";

// Mapping between layer groups (type in URL query param) and layer IDs...
// Note: Popup is opened for the first layer in the layerIds array.
const layerGroups = [
    { id: "camera", layerIds: ["traffic-camera-layer"], uniqueField: "CameraID" },
    { id: "alert", layerIds: ["road-alerts-layer"], uniqueField: "EventID" },
    { id: "restriction", layerIds: ["point-restrictions-layer", "line-restrictions-layer"], uniqueField: "UniqueId" },
    { id: "fire", layerIds: ["fire-incidents-layer", "fire-perimeters-layer"], uniqueField: "" },
    { id: "time", layerIds: ["travel-times-layer"], uniqueField: "" },
    { id: "mountain", layerIds: ["mountain-passes-layer"], uniqueField: "" },
    { id: "weather", layerIds: ["weather-stations-layer"], uniqueField: "" },
    { id: "parkride", layerIds: ["park-ride-layer"], uniqueField: "" },
    { id: "restarea", layerIds: ["rest-areas-layer"], uniqueField: "" }
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

export const setLayerVisibility = (id: string, visible: boolean, layerList: LayerInfo[]): void => {
    const result = layerList.find((item) => {
        return item.id === id;
    });
    if (result) {
        result.visible = visible;
    }
}

export const getFeature = async (uniqueValue: number | string, groupId: string, map: WebMap): Promise<Graphic | undefined> => {
    const fieldName = getUniqueField(groupId);
    const layerIds = getLayerIds(groupId);
    const layer = map.findLayerById(layerIds[0]);
    if (layer.type !== "geojson") {
        throw layer.type + " is not supported.";
    }
    const gLayer = layer as GeoJSONLayer;
    const query = gLayer.createQuery();
    const field = gLayer.getField(fieldName);
    query.where = `${fieldName} = `;
    if (field.type in ["string", "date"]) {
        query.where += `'${uniqueValue}'`
    } else {
        query.where += uniqueValue
    }
    query.outFields = [gLayer.objectIdField]
    const response = await gLayer.queryFeatures(query);
    if (response.features.length > 0) {
        return response.features[0];
    }
}