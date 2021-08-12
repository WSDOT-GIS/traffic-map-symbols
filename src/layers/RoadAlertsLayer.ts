import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import symbol from "@/symbols/AlertSymbol"
import Field from "@arcgis/core/layers/support/Field"
const roadAlertsRenderer = new simpleRenderer({
    symbol: symbol
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

let layer: GeoJSONLayer | undefined;

export const initLayer = (url: string): GeoJSONLayer => {
    layer = new GeoJSONLayer({
        id: "road-alerts-layer",
        url: url,
        title: "Travel Alerts",
        renderer: roadAlertsRenderer,
        visible: true,
        fields: fields,
    });
    return layer;
}

const getLayer = (): GeoJSONLayer => {
    if (!layer) {
        throw "RoadAlertsLayer is not ready yet!"
    }
    return layer;
}

// const RoadAlertsLayer = new GeoJSONLayer({
//     id: "road-alerts-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/RoadAlerts.json",
//     title: "Travel Alerts",
//     renderer: roadAlertsRenderer,
//     visible: true
// })

// export default RoadAlertsLayer
export default getLayer;