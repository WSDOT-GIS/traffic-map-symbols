import LayerInfo, { LayerStatus } from "@/types/LayerInfo";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Graphic from "@arcgis/core/Graphic";
import WebMap from "@arcgis/core/Map";
import { addGraphicsByType, buildGraphicsByType } from "./graphicLayerUtil";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as geomJsonUtils from "@arcgis/core/geometry/support/jsonUtils";
import Renderer from "@arcgis/core/renderers/Renderer";
import Field from "@arcgis/core/layers/support/Field";
import GroupLayerInfo from "@/types/GroupLayerInfo";
import AppConfig from "@/types/AppConfig";
import { fetchJson } from "@/utils/miscUtil";
import { isEsriFeatures } from "@/utils/typeUtil";
import Layer from "@arcgis/core/layers/Layer";
import { simpleClosuresRenderer, directionalClosuresRenderer } from "@/layers/LinearClosuresLayer"
/**
 *  Specify which layers belong together (i.e. should be treated as if they are one layer) 
 *  Layers in each group should have the same visibility and displayed as a single item in the table of contents
 *   - id
 *       
 *      ID for the layer group.
 *   - layers 
 *       
 *      List of layers that belong to each group.
 *       
 *      NOTE: Popup is opened for the first layer in the layers array.
 *   - layers.id
 *       
 *      Layer ID
 *   - layer.uniqueField
 *       
 *      Unique field that is from the source database. Do not use ESRI ID (i.e. OID).
 *   - layer.jsonUrl
 *       
 *      URL of JSON file. Only applicable to those layers that loads JSON at runtime.
 */
const layerGroups: GroupLayerInfo[] = [];
/**
 * Create the layer group list
 * 
 * @param config Application configuration to get the JSON URLs from.
 */
export const createLayerGroupInfos = (config: AppConfig): void => {
    layerGroups.push({ id: "camera", layers: [{ id: "traffic-camera-layer", uniqueField: "CameraID", jsonUrl: config.cameras }] });
    layerGroups.push({
        id: "alert", layers: [
            { id: "road-alerts-layer", uniqueField: "EventID", jsonUrl: config.currentRoadAlertPoint },
            { id: 'ferry-routes-points-layer', uniqueField: "FerryRouteID" },
            { id: 'ferry-routes-lines-layer', uniqueField: "FerryRouteID" },
            { id: 'line-road-alerts-layer', uniqueField: "EventID" }
        ]
    }); // Loaded by default, should not need to load data.
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
    layerGroups.push({ id: "mountain", layers: [{ id: "mountain-passes-layer", uniqueField: "WebPageName", jsonUrl: config.mountainPasses }] });
    layerGroups.push({ id: "weather", layers: [{ id: "weather-stations-layer", uniqueField: "WeatherStationId", jsonUrl: config.weatherStations }] });
    layerGroups.push({ id: "parkride", layers: [{ id: "park-ride-layer", uniqueField: "", jsonUrl: config.parkAndRides }] }); // TODO: need unique field
    layerGroups.push({ id: "restarea", layers: [{ id: "rest-areas-layer", uniqueField: "RestAreaId", jsonUrl: config.restAreas }] });
    layerGroups.push({ id: "milepost", layers: [{ id: "mile-markers", uniqueField: "" }] })
};

/**
 * Gets group layer info for the specified group ID
 * 
 * @param groupId Group ID
 * @returns The group matching the Group ID.
 * @throws {RangeError} Thrown if {@param groupId} is not one of the expected values.
 */
const getGroupLayerInfo = (groupId: string): GroupLayerInfo => {
    const result = layerGroups.find((item) => item.id === groupId);
    if (!result) {
        const ids = layerGroups.map((item) => item.id);
        throw new RangeError(`${groupId} is an invalid feature type. The valid IDs are: ${ids.join(', ')}.`);
    }
    return result;
}

/**
 * Get layer IDs from the layer group ID
 * 
 * @param groupId ID of the layer group
 * @returns array of layer IDs
 */
export const getLayerIds = (groupId: string): string[] => {
    const result = layerGroups.find((item) => {
        return item.id === groupId;
    });
    if (result) {
        return result.layers.map((each) => {
            return each.id;
        });
    } else {
        const ids = layerGroups.map((item) => {
            return item.id;
        })
        throw "Failed to find a layer with the ID, " + groupId + ". The valid IDs are: " + ids.join(", ") + ".";
    }
}

/**
 * Resizes a graphic
 * 
 * @param graphic A graphic
 */
export const resizeFeature = (graphic: Graphic): void => {
    const mapGraphic = buildGraphicsByType("CIMSymbol", graphic)
    addGraphicsByType("selectedGraphic", mapGraphic)
}
/**
 * Set the visibility of the specified layer in the layer list.
 * NOTE: The layer list need to be committed to the state store.
 *
 * @param layer Layer
 * @param layerInfo LayerInfo
 * @param visible visibility: true/false
 * @returns Layer status
 */
export const setLayerVisibility = async (layer: Layer, layerInfo: LayerInfo, visible: boolean): Promise<LayerStatus> => {
    let outStatus = layerInfo.status;
    if (layer.visible === visible) { return outStatus; }
    else { layer.visible = visible }
    if (visible && layerInfo.status !== LayerStatus.Loaded && layerInfo.isJson() && layerInfo.url) {
        try {
            const info = await reloadData(layerInfo.url, layer as FeatureLayer);
            outStatus = info ? info.status : layerInfo.status;
        } catch (ex) {
            outStatus = LayerStatus.Failed;
        }
    }
    return outStatus;
}
/**
 * Get a feature from the layer group.
 *
 * @param uniqueValue 
 * Value from the unique field specified in the layerGroups.
 * @param groupId 
 * ID of the layer group (type). If the specified group has more than one layer, query is done against the first layer only.
 * @param map ESRI map object
 * @returns Graphic or nothing
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
    if (field.type == 'string') {
        if ((uniqueValue as string).split("-").length > 0 && fLayer.title == "Mountain Pass Reports") {
            const uniqueValues = (uniqueValue as string).split("-").map((value) => {
                if (value == "to" || value == "To") {
                    return "to"
                }
                else {
                    const properCase = (value[0].toLocaleUpperCase()) + (value.substring(1).toLocaleLowerCase())
                    return (properCase)
                }
            })
            query.where += `'${(uniqueValues.join('-'))}'`;
        }
        else {
            query.where += `'${uniqueValue}'`
        }
    }
    else if (field.type == 'date') {
        query.where += `'${uniqueValue}'`
    }
    else {
        query.where += uniqueValue
    }
    query.outFields = [fLayer.objectIdField, groupInfo.layers[0].uniqueField]
    const response = await fLayer.queryFeatures(query);
    if (response.features.length > 0) {
        return response.features[0];
    }
}

/**
 * Initialize a feature layer
 * 
 * @param layerId Layer ID
 * @param layerTitle Title
 * @param renderer Renderer
 * @param fields Array of field
 * @param geometryType geometry type
 * @param visible default visibility
 * @param graphics (Optional) Array of graphics to load
 * @param definitionExpression Selection expression.
 * @returns Promise<FeatureLayer>
 */
export const initLayer = async (layerId: string, layerTitle: string,
    renderer: Renderer, fields: Field[], geometryType: "point" | "multipoint" | "polyline" | "polygon",
    visible: boolean, graphics?: Graphic[], definitionExpression?: string): Promise<FeatureLayer> => {
    // Create Graphics from JSON...
    if (!graphics) {
        graphics = [];
    }
    if (!definitionExpression) {
        definitionExpression = '1=1'
    }
    //let graphics: Graphic[] = [];
    // if (visible) {
    //     graphics = await fetchJsonData(jsonUrl);
    // }
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
        definitionExpression: definitionExpression,
        copyright: undefined
    });
    return layer;
}

// Keep track of what is loading, so prevent loading the same layer at the same time.
let loadManager: { id: string, promise: Promise<LayerStatus | undefined> }[] = [];

/**
 * Reloads the data for a layer from the JSON URL.
 * 
 * @param jsonUrl URL of JSON data
 * @param layer A feature Layer
 * @returns Either a {@link LayerInfo} or undefined.
 */
export const reloadData = async (jsonUrl: string, layer: FeatureLayer | undefined): Promise<LayerInfo | undefined> => {
    if (!layer) { return; }
    const reload = async (jsonUrl: string, layer: FeatureLayer): Promise<LayerStatus | undefined> => {
        if (!layer.visible) { return; }
        let status: LayerStatus;
        // Fetch all features from JSON...
        try {
            const graphics = await fetchJsonData(jsonUrl);
            if (graphics.length > 0) {
                await replaceFeatures(layer, graphics);
            }
            status = LayerStatus.Loaded;
        } catch (ex) {
            console.error(ex);
            status = LayerStatus.Failed;
        }
        return status;
    }
    // Check if the layer is already being loaded currently or not...
    const runningProc = loadManager.find(x => x.id === layer.id);
    if (runningProc) {
        // Loading is in progress already, so wait until that finishes.
        await runningProc.promise;
    }
    // Start loading.
    const promise = reload(jsonUrl, layer);
    loadManager.push({ id: layer.id, promise: promise });
    const status = await promise;
    loadManager = loadManager.filter(x => x.id !== layer.id);
    if (status) {
        const info = new LayerInfo(layer.id);
        info.status = status;
        return info;
    }
}

/**
 * Replaces the features in a feature layer.
 * 
 * @param layer A feature layer
 * @param newFeatures The new features that will replace the current ones.
 */
export const replaceFeatures = async (layer: FeatureLayer, newFeatures: Graphic[]): Promise<void> => {
    // Delete existing features...
    const fs = await layer.queryFeatures();
    await layer.applyEdits({ deleteFeatures: fs.features });
    // Load features...
    await layer.applyEdits({ addFeatures: newFeatures });
    layer.refresh();
}

/**
 * Fetches JSON data and converts them to graphics.
 * 
 * @param jsonUrl URL for a JSON file
 * @returns An array of {@link Graphic} objects.
 * @throws {TypeError} Thrown if the JSON is not in Esri features format.
 */
export const fetchJsonData = async (jsonUrl: string): Promise<Graphic[]> => {
    // Fetch all features from JSON...
    const json = await fetchJson(jsonUrl);
    if (!isEsriFeatures(json)) {
        throw new TypeError("Invalid JSON format. It is not ESRI Features JSON.")
    }
    const sr = SpatialReference.fromJSON(json.spatialReference);
    // Create graphic out of each feature...
    const graphics: Graphic[] = [];
    for (const each of json.features) {
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

/**
 * Updates scale dependent rendering.
 * 
 * @param layer layer
 * @param scale scale
 */
export const updateScaleDependentRendering = (layer: FeatureLayer, scale: number) => {
    if (layer.title == "Linear Closures Lines") {
        //console.log("update linear closures renderer")
        //console.log(scale)
        if (scale <= 37000) {
            layer.renderer = directionalClosuresRenderer
        }
        else {
            layer.renderer = simpleClosuresRenderer
        }
    }
}

