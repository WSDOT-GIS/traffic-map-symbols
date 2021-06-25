import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import {weatherStationSymbol} from "@/symbols/WeatherStationSymbol"
const weatherStationRenderer = new simpleRenderer({
    symbol: weatherStationSymbol
})
const PointRestrictionsLayer = new GeoJSONLayer({
    id: "weather-stations-layer",
    url: "http://hqtob1webtmdev1/GISData/WeatherStations.json",
    title: "Weather Stations",
    renderer: weatherStationRenderer
})
export default PointRestrictionsLayer