import uniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer"
import { alertSymbol, alertSymbolMedium, roadClosedSymbol, alertSymbolHighest } from "@/symbols/AlertSymbol"
import Field from "@arcgis/core/layers/support/Field"

import * as layerUtil from "@/utils/layerUtil";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import Graphic from "@arcgis/core/Graphic";

const renderer = new uniqueValueRenderer({
    field: "TravelCenterPriorityId",
    uniqueValueInfos: [
        {
            label: "CLOSURE",
            value: 1,
            symbol: roadClosedSymbol
        },
        {
            label: "HIGH IMPACT",
            value: 2,
            symbol: alertSymbolHighest
        },
        {
            label: "MODERATE IMPACT",
            value: 3,
            symbol: alertSymbolMedium
        },
        {
            label: "LOW IMPACT",
            value: 4,
            symbol: alertSymbol
        },
    ]
})

const fields = [
    new Field({
        name: "AppGenId",
        alias: "AppGenId",
        type: "oid"
    }),
    new Field({
        name: "EventID", type: "integer", alias: "EventID"
    }),
    new Field({ name: "EventCategoryDescription", type: "string", alias: "EventCategoryDescription", length: 400 }),
    new Field({ name: "EventCategoryTypeDescription", type: "string", alias: "EventCategoryTypeDescription", length: 400 }),
    new Field({ name: "EventCategoryID", type: "integer", alias: "EventCategoryID" }),
    new Field({ name: "CriticalEventIndicator", type: "small-integer", alias: "CriticalEventIndicator" }),
    new Field({ name: "LastModifiedDate", type: "date", alias: "LastModifiedDate" }),
    new Field({ name: "IconName", type: "string", alias: "IconName", length: 20 }),
    new Field({ name: "EventPriorityID", type: "integer", alias: "EventPriorityID" }),
    new Field({ name: "EventPriorityDescription", type: "string", alias: "EventPriorityDescription", length: 150 }),
    new Field({ name: "Road", type: "string", alias: "Road", length: 50 }),
    new Field({ name: "RoadDirection", type: "string", alias: "RoadDirection", length: 15 }),
    new Field({ name: "RoadType", type: "string", alias: "RoadType", length: 1 }),
    new Field({ name: "Latitude", type: "double", alias: "Latitude" }),
    new Field({ name: "Longitude", type: "double", alias: "Longitude" }),
    new Field({ name: "DisplayOrder", type: "integer", alias: "DisplayOrder" }),
    new Field({ name: "HeadlineMessage", type: "string", alias: "HeadlineMessage", length: 8000 }),
    new Field({ name: "ExtendedMessage", type: "string", alias: "ExtendedMessage", length: 5000 }),
    new Field({ name: "LocationName", type: "string", alias: "LocationName", length: 20 }),
    new Field({ name: "StartSRMP", type: "single", alias: "StartSRMP" }),
    new Field({ name: "EndSRMP", type: "single", alias: "EndSRMP" }),
    new Field({ name: "RecurringEvent", type: "integer", alias: "RecurringEvent" }),
    new Field({
        name: "StartTime", type: "date", alias: "StartTime", length: 8
    }),
    new Field({
        name: "EndTime", type: "date", alias: "EndTime", length: 8
    }),
    new Field({ name: "SourceSystemID", type: "integer", alias: "SourceSystemID" }),
    new Field({ name: "SourceSystemEventID", type: "string", alias: "SourceSystemEventID", length: 50 }),
    new Field({ name: "TMSOverlap", type: "integer", alias: "TMSOverlap" }),
    new Field({ name: "RegionID", type: "small-integer", alias: "RegionID" }),
    new Field({ name: "TravelCenterPriorityId", type: "small-integer", alias: "TravelCenterPriorityId" }),
]

let priorityLayer: FeatureLayer | undefined;
let closureLayer: FeatureLayer | undefined;
/**
 * Initialize two road alert layers.
 * @param url 
 * Specify this if data should be loaded at start up. Otherwise not necessary.
 * @returns 
 */
let layer: FeatureLayer | undefined;
export const layerId = "road-alerts-layer";

export const initLayer = async (jsonUrl: string): Promise<FeatureLayer | undefined> => {
    try {
        layer = await layerUtil.initLayer(jsonUrl, layerId, "Road Alerts", renderer, fields, "point", true);
        layer.orderBy = [{
            field: "TravelCenterPriorityId",
            order: "ascending"
        }]
    }
    catch (ex) {
        console.error(ex);
    }
    return layer;
}
//**This happens here instead of in the layerutils because of the source distinciton. TODO: fix this**
/** This is fixed now? **/
// const setLayerEvent = (layer: FeatureLayer, jsonUrl: string): void => {
//     layer.watch("visible", (newValue) => {
//         if (newValue) {
//             reloadData(jsonUrl);
//         }
//     });
// }
const getLayer = (): FeatureLayer | undefined => {
    if (!layer) {
        console.error("ParkRideLayer is not ready yet!");
    }
    return layer;
}

// export default RoadAlertsLayer
export default getLayer;

export const reloadData = async (url: string): Promise<void> => {
    const features = await getFeatures(url);
    if (priorityLayer) {
        layerUtil.replaceFeatures(priorityLayer, features.priority);
    }
    if (closureLayer) {
        layerUtil.replaceFeatures(closureLayer, features.closure);
    }
}

const getFeatures = async (url: string): Promise<{ priority: Graphic[], closure: Graphic[] }> => {
    const graphics = await layerUtil.fetchJsonData(url);
    let pGraphics: Graphic[] = [];
    let cGraphics: Graphic[] = [];
    // Priority features...
    pGraphics = graphics.filter((each) => {
        return each.attributes.EventCategoryDescription !== 'Closure'
    });
    // Closure features...
    cGraphics = graphics.filter((each) => {
        return each.attributes.EventCategoryDescription === 'Closure'
    })
    return { priority: pGraphics, closure: cGraphics };
}
