"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchJsonData = exports.replaceFeatures = exports.reloadData = exports.setLayerEvent = exports.initLayer = exports.getFeature = exports.setLayerVisibility = exports.getLayerIds = exports.createLayerGroupInfos = void 0;
const tslib_1 = require("tslib");
const SpatialReference_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/SpatialReference"));
const Graphic_1 = tslib_1.__importDefault(require("@arcgis/core/Graphic"));
const FeatureLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/FeatureLayer"));
const geomJsonUtils = tslib_1.__importStar(require("@arcgis/core/geometry/support/jsonUtils"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const miscUtil_1 = require("@/utils/miscUtil");
const typeUtil_1 = require("@/utils/typeUtil");
/**  Mapping between layer groups (type in URL query param) and layer IDs...
 *   * id
 *      ID for the layer group (type).
 *   * layerIds
 *      Popup is opened for the first layer in the layerIds array.
 *   * uniqueField
 *      Unique field that is from the source database. Do not use ESRI ID.
*/
const layerGroups = [];
const createLayerGroupInfos = (config) => {
    layerGroups.push({ id: "camera", layers: [{ id: "traffic-camera-layer", uniqueField: "CameraID", jsonUrl: config.cameras }] });
    layerGroups.push({ id: "alert", layers: [{ id: "road-alerts-layer", uniqueField: "EventID" }] }); // Loaded by default, should not need to load data.
    layerGroups.push({
        id: "restriction", layers: [
            { id: "point-restrictions-layer", uniqueField: "UniqueId", jsonUrl: config.pointRestrictions },
            { id: "line-restrictions-layer", uniqueField: "UniqueId", jsonUrl: config.lineRestrictions }
        ]
    });
    layerGroups.push({
        id: "fire", layers: [
            { id: "fire-incidents-layer", uniqueField: "UniqueFireIdentifier" },
            { id: "fire-perimeters-layer", uniqueField: "UniqueFireIdentifier" }
        ]
    });
    layerGroups.push({ id: "time", layers: [{ id: "travel-times-layer", uniqueField: "TravelTimesID", jsonUrl: config.travelTimes }] });
    layerGroups.push({ id: "mountain", layers: [{ id: "mountain-passes-layer", uniqueField: "MountainPassId", jsonUrl: config.mountainPasses }] });
    layerGroups.push({ id: "weather", layers: [{ id: "weather-stations-layer", uniqueField: "WeatherStationId", jsonUrl: config.weatherStations }] });
    layerGroups.push({ id: "parkride", layers: [{ id: "park-ride-layer", uniqueField: "", jsonUrl: config.parkAndRides }] }); // TODO: need unique field
    layerGroups.push({ id: "restarea", layers: [{ id: "rest-areas-layer", uniqueField: "", jsonUrl: config.restAreas }] }); // TODO: need unique field
};
exports.createLayerGroupInfos = createLayerGroupInfos;
const getGroupLayerInfo = (groupId) => {
    const result = layerGroups.find((item) => {
        return item.id === groupId;
    });
    if (!result) {
        throw `${groupId} is an invalid group ID (feature type).`;
    }
    return result;
};
const getLayerIds = (groupId) => {
    const result = layerGroups.find((item) => {
        return item.id === groupId;
    });
    if (result) {
        return result.layers.map((each) => {
            return each.id;
        });
    }
    else {
        throw "Failed to find layer IDs for " + groupId + ".";
    }
};
exports.getLayerIds = getLayerIds;
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
    const groupInfo = getGroupLayerInfo(groupId);
    const layer = map.findLayerById(groupInfo.layers[0].id);
    // Make sure the layer is loaded. If this is done too early, query does not resolve...
    yield layer.when();
    if (layer.type !== "feature") {
        throw layer.type + " is not supported.";
    }
    const fLayer = layer;
    fLayer.visible = true;
    const ftrCount = yield fLayer.queryFeatureCount();
    if (groupInfo.layers[0].jsonUrl && ftrCount === 0) {
        yield exports.reloadData(groupInfo.layers[0].jsonUrl, fLayer);
        if (groupInfo.layers.length > 1) {
            for (const eachLyr of groupInfo.layers) {
                if (eachLyr.id === groupInfo.layers[0].id) {
                    continue;
                }
                const fLyr2 = map.findLayerById(eachLyr.id);
                if (eachLyr.jsonUrl) {
                    fLyr2.visible = true;
                    yield exports.reloadData(eachLyr.jsonUrl, fLyr2);
                }
            }
        }
    }
    const query = fLayer.createQuery();
    const field = fLayer.getField(groupInfo.layers[0].uniqueField);
    query.where = `${groupInfo.layers[0].uniqueField} = `;
    if (["string", "date"].includes(field.type)) {
        query.where += `'${uniqueValue}'`;
    }
    else {
        query.where += uniqueValue;
    }
    query.outFields = [fLayer.objectIdField];
    const response = yield fLayer.queryFeatures(query);
    if (response.features.length > 0) {
        return response.features[0];
    }
});
exports.getFeature = getFeature;
const initLayer = (jsonUrl, layerId, layerTitle, renderer, fields, geometryType, visible) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // Create Graphics from JSON...
    let graphics = [];
    if (visible) {
        graphics = yield exports.fetchJsonData(jsonUrl);
    }
    // Do not set the WSDOT unique ID as OID. The app might change them.
    // So create a new system generated field as OID.
    let oidField = "AppGenId";
    const foundOid = fields.find((each) => {
        return each.name === oidField;
    });
    if (foundOid) {
        oidField += 2;
    }
    fields.push(new Field_1.default({
        name: oidField,
        alias: oidField,
        type: "oid"
    }));
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
    const fs = yield layer.queryFeatures();
    yield layer.applyEdits({ deleteFeatures: fs.features });
    // Load features...
    yield layer.applyEdits({ addFeatures: newFeatures });
    layer.refresh();
});
exports.replaceFeatures = replaceFeatures;
const fetchJsonData = (jsonUrl) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // Fetch all features from JSON...
    const json = yield miscUtil_1.fetchJson(jsonUrl);
    //const json = await response.json();
    if (!typeUtil_1.isEsriFeatures(json)) {
        throw "Invalid JSON format. It is not ESRI Features JSON.";
    }
    const sr = SpatialReference_1.default.fromJSON(json.spatialReference);
    // Create graphic out of each feature...
    const graphics = [];
    for (const each of json.features) {
        // console.log(each)
        const geom = geomJsonUtils.fromJSON(each.geometry);
        if (!geom) {
            console.warn("Failed to get geometry. " + JSON.stringify(each));
        }
        else {
            geom.spatialReference = sr;
            graphics.push(new Graphic_1.default({
                geometry: geom,
                attributes: each.attributes,
            }));
        }
    }
    return graphics;
});
exports.fetchJsonData = fetchJsonData;
//# sourceMappingURL=layerUtil.js.map