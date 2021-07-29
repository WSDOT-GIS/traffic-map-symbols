import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import {weatherStationSymbol} from "@/symbols/WeatherStationSymbol"
import weatherStationsPopup from "@/popup-templates/WeatherStationsPopup"
const weatherStationRenderer = new simpleRenderer({
    symbol: weatherStationSymbol
})
const PointRestrictionsLayer = new GeoJSONLayer({
    id: "weather-stations-layer",
    url: "https://data.wsdot.wa.gov/travelcenter/WeatherStations.json",
    title: "Weather Stations",
    renderer: weatherStationRenderer,
    popupTemplate: weatherStationsPopup,
    visible: false
})
export default PointRestrictionsLayer