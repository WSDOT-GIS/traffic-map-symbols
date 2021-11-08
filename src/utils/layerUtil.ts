import LayerInfo from "@/types/LayerInfo";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Graphic from "@arcgis/core/Graphic";
import WebMap from "@arcgis/core/WebMap";
import { addGraphicsByType, buildGraphicsByType, removeGraphicsByType } from "./graphicLayerUtil";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as geomJsonUtils from "@arcgis/core/geometry/support/jsonUtils";
import Renderer from "@arcgis/core/renderers/Renderer";
import Field from "@arcgis/core/layers/support/Field";
import GroupLayerInfo from "@/types/GroupLayerInfo";
import AppConfig from "@/types/AppConfig";
import { fetchJson } from "@/utils/miscUtil";
import { isEsriFeatures } from "@/utils/typeUtil";
import MapView from "@arcgis/core/views/MapView";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
/**  Mapping between layer groups (type in URL query param) and layer IDs...
 *   * id
 *      ID for the layer group (type).
 *   * layerIds 
 *      Popup is opened for the first layer in the layerIds array.
 *   * uniqueField
 *      Unique field that is from the source database. Do not use ESRI ID.
*/

const layerGroups: GroupLayerInfo[] = [];
export const createLayerGroupInfos = (config: AppConfig): void => {
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

const getGroupLayerInfo = (groupId: string): GroupLayerInfo => {
    const result = layerGroups.find((item) => {
        return item.id === groupId;
    });
    if (!result) {
        throw `${groupId} is an invalid group ID (feature type).`
    }
    return result;
}

export const getLayerIds = (groupId: string): string[] => {
    const result = layerGroups.find((item) => {
        return item.id === groupId;
    });
    if (result) {
        return result.layers.map((each) => {
            return each.id;
        });
    } else {
        throw "Failed to find layer IDs for " + groupId + ".";
    }
}

export const resizeFeature = (graphic: Graphic,mapView: MapView):void=>{
    // console.log(graphic)
    const mapGraphic = buildGraphicsByType("CIMSymbol",graphic)
    addGraphicsByType("selectedGraphic",mapGraphic)
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
    const groupInfo = getGroupLayerInfo(groupId);
    const layer = map.findLayerById(groupInfo.layers[0].id);
    // Make sure the layer is loaded. If this is done too early, query does not resolve...
    await layer.when();
    if (layer.type !== "feature") {
        throw layer.type + " is not supported.";
    }
    const fLayer = layer as FeatureLayer;
    fLayer.visible = true;
    const ftrCount = await fLayer.queryFeatureCount();
    if (groupInfo.layers[0].jsonUrl && ftrCount === 0) {
        // console.log("getFeature: " + layer.title)
        await reloadData(groupInfo.layers[0].jsonUrl, fLayer);
        if (groupInfo.layers.length > 1) {
            for (const eachLyr of groupInfo.layers) {
                if (eachLyr.id === groupInfo.layers[0].id) {
                    continue;
                }
                const fLyr2 = map.findLayerById(eachLyr.id) as FeatureLayer;
                if (eachLyr.jsonUrl) {
                    fLyr2.visible = true;
                    await reloadData(eachLyr.jsonUrl, fLyr2);
                }
            }
        }
    }
    const query = fLayer.createQuery();
    const field = fLayer.getField(groupInfo.layers[0].uniqueField);
    query.where = `${groupInfo.layers[0].uniqueField} = `;
    if (["string", "date"].includes(field.type)) {
        query.where += `'${uniqueValue}'`
    } else {
        query.where += uniqueValue
    }
    query.outFields = [fLayer.objectIdField]
    const response = await fLayer.queryFeatures(query);
    if (response.features.length > 0) {
        return response.features[0];
    }
}

export const initLayer = async (jsonUrl: string, layerId: string, layerTitle: string,
    renderer: Renderer, fields: Field[], geometryType: "point" | "multipoint" | "polyline" | "polygon",
    visible: boolean): Promise<FeatureLayer> => {
    // Create Graphics from JSON...
    let graphics: Graphic[] = [];
    if (visible) {
        graphics = await fetchJsonData(jsonUrl);
    }
    // Do not set the WSDOT unique ID as OID. The app might change them.
    // So create a new system generated field as OID.
    let oidField = "AppGenId";
    const foundOid = fields.find((each) => {
        return each.name === oidField;
    })
    if (foundOid) {
        oidField += 2;
    }
    fields.push(new Field({
        name: oidField,
        alias: oidField,
        type: "oid"
    }));
    const layer = new FeatureLayer({
        id: layerId,
        title: layerTitle,
        objectIdField: oidField,
        renderer: renderer,
        fields: fields,
        visible: visible,
        source: graphics,
        geometryType: geometryType,
        spatialReference: SpatialReference.WebMercator,
    });
    // Set event to load layer when it becomes visible...
    if (!visible) {
        setLayerEvent(layer, jsonUrl);
    }
    return layer;
}

export const setLayerEvent = (layer: FeatureLayer, jsonUrl: string): void => {
    layer.watch("visible", (newValue, oldValue, propName, target) => {
        const lyr = target as FeatureLayer;
        if (newValue) {
            // console.log("Became visible: " + layer.title)
            reloadData(jsonUrl, lyr);
        }
    });
}
// Keep track if what is loading, so prevent loading the same layer at the same time.
let loadManager: { id: string, promise: Promise<void> }[] = [];

export const reloadData = async (jsonUrl: string, layer: FeatureLayer): Promise<void> => {
    const reload = async (jsonUrl: string, layer: FeatureLayer): Promise<void> => {
        if (!layer.visible) { return; }
        console.log("failed to return")
        // console.log("Reload data: " + layer.id);
        // Fetch all features from JSON...
        const graphics = await fetchJsonData(jsonUrl);
        // Replace old with new features...
        await replaceFeatures(layer, graphics);
    }
    // Check if the layer is already being loaded currently or not...
    const runningProc = loadManager.find(x => x.id === layer.id);
    if (runningProc) {
        // It is loading currently already, so wait until that finishes.
        await runningProc.promise;
    } else {
        // It is not loading now, so start loading.
        const promise = reload(jsonUrl, layer);
        loadManager.push({id: layer.id, promise: promise});
        await promise;
        loadManager = loadManager.filter(x => x.id !== layer.id);
    }
}

export const replaceFeatures = async (layer: FeatureLayer, newFeatures: Graphic[]): Promise<void> => {
    // Delete existing features...
    const fs = await layer.queryFeatures();
    await layer.applyEdits({ deleteFeatures: fs.features });
    // Load features...
    await layer.applyEdits({ addFeatures: newFeatures });
    layer.refresh();
}

export const fetchJsonData = async (jsonUrl: string): Promise<Graphic[]> => {
    // Fetch all features from JSON...
    const json = await fetchJson(jsonUrl);
    //const json = await response.json();
    if (!isEsriFeatures(json)) {
        throw "Invalid JSON format. It is not ESRI Features JSON."
    }
    const sr = SpatialReference.fromJSON(json.spatialReference);
    // Create graphic out of each feature...
    const graphics: Graphic[] = [];
    for (const each of json.features) {
        // console.log(each)
        const geom = geomJsonUtils.fromJSON(each.geometry);
        if (!geom) {
            console.warn("Failed to get geometry. " + JSON.stringify(each));
        } else {
            geom.spatialReference = sr;
            graphics.push(new Graphic({
                geometry: geom,
                attributes: each.attributes,
            }));
        }
    }
    return graphics;
}
