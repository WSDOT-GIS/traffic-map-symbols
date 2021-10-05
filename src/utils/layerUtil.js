"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchJsonData = exports.replaceFeatures = exports.reloadData = exports.setLayerEvent = exports.initLayer = exports.getFeature = exports.setLayerVisibility = exports.getUniqueField = exports.getLayerIds = void 0;
const tslib_1 = require("tslib");
// import Point from "@arcgis/core/geometry/Point";
const SpatialReference_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/SpatialReference"));
const Graphic_1 = tslib_1.__importDefault(require("@arcgis/core/Graphic"));
// import { geographicToWebMercator } from "@arcgis/core/geometry/support/webMercatorUtils";
// import Geometry from "@arcgis/core/geometry/Geometry";
const FeatureLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/FeatureLayer"));
const geomJsonUtils = tslib_1.__importStar(require("@arcgis/core/geometry/support/jsonUtils"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
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
    // console.log(gLayer.id + ", query: " + query.where);
    query.outFields = [gLayer.objectIdField];
    // console.log("querying...")
    const response = yield gLayer.queryFeatures(query);
    // console.log("query end...")
    // console.log(JSON.stringify(response));
    if (response.features.length > 0) {
        return response.features[0];
    }
});
exports.getFeature = getFeature;
const initLayer = (jsonUrl, layerId, layerTitle, renderer, fields, geometryType, visible, oidField) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // Create Graphics from JSON...
    let graphics = [];
    if (visible) {
        graphics = yield exports.fetchJsonData(jsonUrl);
    }
    // If the OID field is missing, use the array index as object ID...
    if (!oidField) {
        oidField = "objindex";
        graphics.forEach((each, idx) => {
            each.attributes.push({ objindex: idx });
        });
        fields.push(new Field_1.default({
            name: oidField,
            alias: oidField,
            type: "oid"
        }));
    }
    const layer = new FeatureLayer_1.default({
        id: layerId,
        title: layerTitle,
        objectIdField: oidField,
        renderer: renderer,
        fields: fields,
        visible: visible,
        source: graphics,
        geometryType: geometryType,
        spatialReference: SpatialReference_1.default.WebMercator,
    });
    // Set event to load layer when it becomes visible...
    if (!visible) {
        exports.setLayerEvent(layer, jsonUrl);
    }
    return layer;
});
exports.initLayer = initLayer;
const setLayerEvent = (layer, jsonUrl) => {
    layer.watch("visible", (newValue, oldValue, propName, target) => {
        const lyr = target;
        if (newValue) {
            exports.reloadData(jsonUrl, lyr);
        }
    });
};
exports.setLayerEvent = setLayerEvent;
const reloadData = (jsonUrl, layer) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!layer.visible) {
        return;
    }
    // Fetch all features from JSON...
    const graphics = yield exports.fetchJsonData(jsonUrl);
    // Replace old with new features...
    yield exports.replaceFeatures(layer, graphics);
});
exports.reloadData = reloadData;
const replaceFeatures = (layer, newFeatures) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // Delete existing features...
    let msg = `Refreshed ${layer.id}, feature count before: `;
    const fs = yield layer.queryFeatures();
    msg += fs.features.length;
    yield layer.applyEdits({ deleteFeatures: fs.features });
    // Load features...
    yield layer.applyEdits({ addFeatures: newFeatures });
    const fCount = yield layer.queryFeatureCount();
    msg += `, after: ${fCount}`;
    console.log(msg);
    layer.refresh();
});
exports.replaceFeatures = replaceFeatures;
const fetchJsonData = (jsonUrl) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // Fetch all features from JSON...
    const response = yield fetch(jsonUrl);
    const json = yield response.json();
    const sr = SpatialReference_1.default.fromJSON(json.spatialReference);
    // Create graphic out of each feature...
    const graphics = [];
    for (const each of json.features) {
        console.log(each);
        const geom = geomJsonUtils.fromJSON(each.geometry);
        geom.spatialReference = sr;
        graphics.push(new Graphic_1.default({
            geometry: geom,
            attributes: each.attributes ? each.attributes : each.properties,
        }));
    }
    return graphics;
});
exports.fetchJsonData = fetchJsonData;
// export const fetchGeoJsonData = async (geojsonUrl: string, layer: GeoJSONLayer): Promise<Graphic[]> => {
//     // Fetch all features from JSON...
//     const response = await fetch(geojsonUrl);
//     const json = await response.json();
//     // Create graphic out of each feature...
//     const graphics: Graphic[] = [];
//     for (const each of json.features) {
//         let geom: Geometry;
//         if (layer.geometryType === "point") {
//             const pt4326 = new Point({
//                 x: each.geometry.coordinates[0],
//                 y: each.geometry.coordinates[1],
//                 spatialReference: SpatialReference.WGS84
//             });
//             geom = geographicToWebMercator(pt4326);
//         }
//         else {
//             throw "Not implemented yet."
//         }
//         graphics.push(new Graphic({
//             geometry: geom,
//             attributes: each.properties,
//         }));
//     }
//     return graphics;
// }
//# sourceMappingURL=layerUtil.js.map