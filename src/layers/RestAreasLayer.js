import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import symbol from "@/symbols/RestAreasSymbol";
// import WeatherStationInfo from "@/types/WeatherStationsInfo"
// import Graphic from "@arcgis/core/Graphic"
const restAreasRenderer = new simpleRenderer({
    symbol: symbol
});
const RestAreasLayer = new GeoJSONLayer({
    id: "rest-areas-layer",
    url: "http://hqtob1webtmdev1/GISData/RestAreas.json",
    title: "Rest Areas",
    renderer: restAreasRenderer,
    //popupTemplate: weatherStationsPopup,
    visible: false
});
export default RestAreasLayer;
//# sourceMappingURL=RestAreasLayer.js.map