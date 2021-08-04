import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import { weatherStationSymbol } from "@/symbols/WeatherStationSymbol";
// import WeatherStationInfo from "@/types/WeatherStationsInfo"
// import Graphic from "@arcgis/core/Graphic"
const weatherStationRenderer = new simpleRenderer({
    symbol: weatherStationSymbol
});
const WeatherStationsLayer = new GeoJSONLayer({
    id: "weather-stations-layer",
    url: "https://data.wsdot.wa.gov/travelcenter/WeatherStations.json",
    title: "Weather Stations",
    renderer: weatherStationRenderer,
    //popupTemplate: weatherStationsPopup,
    visible: false
});
export default WeatherStationsLayer;
//# sourceMappingURL=WeatherStationsLayer.js.map