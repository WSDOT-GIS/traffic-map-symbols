// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import uniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer"
import { alertSymbol, alertSymbolMedium, alertSymbolHigh, alertSymbolHighest, roadClosedSymbol } from "@/symbols/AlertSymbol"
import Field from "@arcgis/core/layers/support/Field"
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer"

import * as layerUtil from "@/utils/layerUtil";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import SpatialReference from "@arcgis/core/geometry/SpatialReference"
import Graphic from "@arcgis/core/Graphic";

const roadAlertsPriorityRenderer = new uniqueValueRenderer({
    field: "EventPriorityID",
    uniqueValueInfos: [
        {
            label: "HIGHEST IMPACT",
            value: 1,
            symbol: alertSymbolHighest
        },
        {
            label: "HIGH IMPACT",
            value: 2,
            symbol: alertSymbolHigh
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
        {
            label: "LOWEST IMPACT",
            value: 5,
            symbol: alertSymbol
        }

    ]
})

const roadAlertsClosureRenderer = new SimpleRenderer({
    symbol: roadClosedSymbol,
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
]

let priorityLayer: FeatureLayer | undefined;
let closureLayer: FeatureLayer | undefined;
/**
 * Initialize two road alert layers.
 * @param url 
 * Specify this if data should be loaded at start up. Otherwise not necessary.
 * @returns 
 */
export const initLayer = async (url?: string): Promise<{ priority: FeatureLayer, closure: FeatureLayer }> => {
    let pGraphics: Graphic[] = [];
    let cGraphics: Graphic[] = [];
    if (url) {
        const features = await getFeatures(url);
        pGraphics = features.priority;
        cGraphics = features.closure;
    }
    priorityLayer = new FeatureLayer({
        id: "road-alerts-layer",
        title: "Travel Alerts",
        objectIdField: "AppGenId",
        renderer: roadAlertsPriorityRenderer,
        visible: true,
        fields: fields,
        source: pGraphics,
        geometryType: "point",
        spatialReference: SpatialReference.WebMercator,
    });

    closureLayer = new FeatureLayer({
        id: "road-closures-layer",
        title: "Travel Closure Alerts",
        objectIdField: "AppGenId",
        renderer: roadAlertsClosureRenderer,
        visible: true,
        fields: fields,
        source: cGraphics,
        geometryType: "point",
        spatialReference: SpatialReference.WebMercator,
    });
    setLayerEvent(priorityLayer,url as string)
    setLayerEvent(closureLayer,url as string)
    // console.log(JSON.stringify(cGraphics));
    return { priority: priorityLayer, closure: closureLayer };
}

const setLayerEvent = (layer: FeatureLayer, jsonUrl: string): void => {
    layer.watch("visible", (newValue) => {
        if (newValue) {
            reloadData(jsonUrl);
        }
    });
}
const getLayer = (id: string): FeatureLayer => {
    let layerToReturn;
    if (id == "road-alerts-layer") {
        if (!priorityLayer) {
            throw "RoadAlertsLayer is not ready yet!"
        }
        else {
            layerToReturn = priorityLayer
        }
    }
    else if (id == "road-closures-layer") {
        if (!closureLayer) {
            throw "RoadAlertsLayer is not ready yet!"
        }
        else {
            layerToReturn = closureLayer
        }
    }
    else {
        throw `Invalid layer ID, ${id}, was specified.`
    }
    return layerToReturn;
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

// let priorityLayer: GeoJSONLayer | undefined;
// let closureLayer: GeoJSONLayer | undefined;
// export const initPriorityLayer = (url: string): GeoJSONLayer => {
//     priorityLayer = new GeoJSONLayer({
//         id: "road-alerts-layer",
//         url: url,
//         title: "Travel Alerts",
//         renderer: roadAlertsPriorityRenderer,
//         visible: true,
//         fields: fields,
//         definitionExpression: "EventCategoryDescription<>'Closure'"
//     });
//     return priorityLayer;
// }

// export const initClosureLayer = (url: string): GeoJSONLayer => {
//     closureLayer = new GeoJSONLayer({
//         id: "road-closures-layer",
//         url: url,
//         title: "Travel Closure Alerts",
//         renderer: roadAlertsClosureRenderer,
//         visible: true,
//         fields: fields,
//         definitionExpression: "EventCategoryDescription='Closure'"
//     });
//     return closureLayer;
// }
// const getLayer = (id: string): GeoJSONLayer => {
//     let layerToReturn;
//     if (id == "road-alerts-layer") {
//         if (!priorityLayer) {
//             throw "RoadAlertsLayer is not ready yet!"
//         }
//         else {
//             layerToReturn = priorityLayer
//         }
//     }
//     if (id == "road-closures-layer") {
//         if (!closureLayer) {
//             throw "RoadAlertsLayer is not ready yet!"
//         }
//         else {
//             layerToReturn = closureLayer
//         }
//     }
//     return layerToReturn as GeoJSONLayer;
// }



