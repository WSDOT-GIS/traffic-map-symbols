import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import uniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer"
import { alertSymbol, alertSymbolMedium, alertSymbolHigh, alertSymbolHighest, roadClosedSymbol } from "@/symbols/AlertSymbol"
import Field from "@arcgis/core/layers/support/Field"
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer"

import { fetchGeoJsonData } from "@/utils/layerUtil";

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

let priorityLayer: GeoJSONLayer | undefined;
let closureLayer: GeoJSONLayer | undefined;
export const initPriorityLayer = (url: string): GeoJSONLayer => {
    priorityLayer = new GeoJSONLayer({
        id: "road-alerts-layer",
        url: url,
        title: "Travel Alerts",
        renderer: roadAlertsPriorityRenderer,
        visible: true,
        fields: fields,
        definitionExpression: "EventCategoryDescription<>'Closure'"
    });
    return priorityLayer;
}

export const initClosureLayer = (url: string): GeoJSONLayer => {
    closureLayer = new GeoJSONLayer({
        id: "road-closures-layer",
        url: url,
        title: "Travel Closure Alerts",
        renderer: roadAlertsClosureRenderer,
        visible: true,
        fields: fields,
        definitionExpression: "EventCategoryDescription='Closure'"
    });
    return closureLayer;
}
const getLayer = (id: string): GeoJSONLayer => {
    let layerToReturn;
    if (id == "road-alerts-layer") {
        if (!priorityLayer) {
            throw "RoadAlertsLayer is not ready yet!"
        }
        else {
            layerToReturn = priorityLayer
        }
    }
    if (id == "road-closures-layer") {
        if (!closureLayer) {
            throw "RoadAlertsLayer is not ready yet!"
        }
        else {
            layerToReturn = closureLayer
        }
    }
    return layerToReturn as GeoJSONLayer;
}

// export default RoadAlertsLayer
export default getLayer;

export const reloadData = (url: string) => {
    fetchGeoJsonData(url, getL)
}

