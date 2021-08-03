import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import symbol from "@/symbols/AlertSymbol";
const roadAlertsRenderer = new simpleRenderer({
    symbol: symbol
});
const RoadAlertsLayer = new GeoJSONLayer({
    id: "road-alerts-layer",
    url: "http://hqtob1webtmdev1/GISData/RoadAlerts.json",
    title: "Travel Alerts",
    renderer: roadAlertsRenderer,
    visible: false
});
export default RoadAlertsLayer;
//# sourceMappingURL=RoadAlertLayer.js.map