import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import symbol from "@/symbols/AlertSymbol";
const roadAlertsRenderer = new simpleRenderer({
    symbol: symbol
});
let layer;
export const initLayer = (url) => {
    layer = new GeoJSONLayer({
        id: "road-alerts-layer",
        url: url,
        title: "Travel Alerts",
        renderer: roadAlertsRenderer,
        visible: true
    });
    return layer;
};
const getLayer = () => {
    if (!layer) {
        throw "RoadAlertsLayer is not ready yet!";
    }
    return layer;
};
// const RoadAlertsLayer = new GeoJSONLayer({
//     id: "road-alerts-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/RoadAlerts.json",
//     title: "Travel Alerts",
//     renderer: roadAlertsRenderer,
//     visible: true
// })
// export default RoadAlertsLayer
export default getLayer;
//# sourceMappingURL=RoadAlertsLayer.js.map