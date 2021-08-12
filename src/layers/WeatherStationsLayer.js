import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import { weatherStationSymbol } from "@/symbols/WeatherStationSymbol";
const weatherStationRenderer = new simpleRenderer({
    symbol: weatherStationSymbol
});
let layer;
export const initLayer = (url) => {
    layer = new GeoJSONLayer({
        id: "weather-stations-layer",
        url: url,
        title: "Weather Stations",
        renderer: weatherStationRenderer,
        visible: false
    });
    return layer;
};
const getLayer = () => {
    if (!layer) {
        throw "WeatherStationsLayer is not ready yet!";
    }
    return layer;
};
// const WeatherStationsLayer = new GeoJSONLayer({
//     id: "weather-stations-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/WeatherStations.json",
//     title: "Weather Stations",
//     renderer: weatherStationRenderer,
//     visible: false
// })
export default getLayer;
//# sourceMappingURL=WeatherStationsLayer.js.map