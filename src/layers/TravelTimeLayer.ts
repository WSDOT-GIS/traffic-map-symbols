import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import  symbol  from "@/symbols/TravelTimeSymbol"
// import WeatherStationInfo from "@/types/WeatherStationsInfo"
// import Graphic from "@arcgis/core/Graphic"
const travelTimesRenderer = new simpleRenderer({
    symbol: symbol
})
const TravelTimesLayer = new GeoJSONLayer({
    id: "travel-times-layer",
    url: "https://data.wsdot.wa.gov/travelcenter/TravelTimes.json",
    title: "Travel Times",
    renderer: travelTimesRenderer,
    //popupTemplate: weatherStationsPopup,
    visible: false
})

export default TravelTimesLayer