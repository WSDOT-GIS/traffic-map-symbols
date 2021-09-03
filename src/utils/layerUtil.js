"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeature = exports.setLayerVisibility = exports.getUniqueField = exports.getLayerIds = void 0;
const tslib_1 = require("tslib");
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
    { id: "parkride", layerIds: ["park-ride-layer"], uniqueField: "" },
    { id: "restarea", layerIds: ["rest-areas-layer"], uniqueField: "" } // TODO: need unique field
];
const getLayerIds = (groupId) => {
    const result = layerGroups.find((item) => {
        return item.id === groupId;
    });
    if (result) {
        return result.layerIds;
    }
    else {
        throw "Failed to find layer IDs for " + groupId + ".";
    }
};
exports.getLayerIds = getLayerIds;
const getUniqueField = (groupId) => {
    const result = layerGroups.find((item) => {
        return item.id === groupId;
    });
    if (result) {
        return result.uniqueField;
    }
    else {
        throw "Failed to find ID field for " + groupId + ".";
    }
};
exports.getUniqueField = getUniqueField;
/**
 * Set the visibility of the specified layer in the layer list.
 * NOTE: The layer list need to be committed to the state store.
 * @param layerId
 * @param visible
 * @param layerList
 * @returns
 */
const setLayerVisibility = (layerId, visible, layerList) => {
    const result = layerList.find((item) => {
        return item.id === layerId;
    });
    if (result) {
        result.visible = visible;
    }
    return layerList;
};
exports.setLayerVisibility = setLayerVisibility;
/**
 * Get a feature from the layer group.
 * @param uniqueValue
 * Value from the unique field specified in the layerGroups.
 * @param groupId
 * ID of the layer group (type). If the specified group has more than one layer, query is done against the first layer only.
 * @param map
 * @returns
 */
const getFeature = (uniqueValue, groupId, map) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const fieldName = exports.getUniqueField(groupId);
    const layerIds = exports.getLayerIds(groupId);
    const layer = map.findLayerById(layerIds[0]);
    // Make sure the layer is loaded. If this is done too early, query does not resolve...
    yield layer.when();
    if (layer.type !== "geojson") {
        throw layer.type + " is not supported.";
    }
    const gLayer = layer;
    const query = gLayer.createQuery();
    const field = gLayer.getField(fieldName);
    query.where = `${fieldName} = `;
    if (["string", "date"].includes(field.type)) {
        query.where += `'${uniqueValue}'`;
    }
    else {
        query.where += uniqueValue;
    }
    console.log(gLayer.id + ", query: " + query.where);
    query.outFields = [gLayer.objectIdField];
    console.log("querying...");
    const response = yield gLayer.queryFeatures(query);
    console.log("query end...");
    console.log(JSON.stringify(response));
    if (response.features.length > 0) {
        return response.features[0];
    }
});
exports.getFeature = getFeature;
//# sourceMappingURL=layerUtil.js.map