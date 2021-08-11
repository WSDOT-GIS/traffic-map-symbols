import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import symbol from "@/symbols/AlertSymbol"
const roadAlertsRenderer = new simpleRenderer({
    symbol: symbol
})

let layer: GeoJSONLayer | undefined;

export const initLayer = (url: string): GeoJSONLayer => {
    layer = new GeoJSONLayer({
        id: "road-alerts-layer",
        url: url,
        title: "Travel Alerts",
        renderer: roadAlertsRenderer,
        visible: true
    });
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
export default layer;