import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import symbol from "@/symbols/RestAreasSymbol"
// import WeatherStationInfo from "@/types/WeatherStationsInfo"
// import Graphic from "@arcgis/core/Graphic"
const restAreasRenderer = new simpleRenderer({
    symbol: symbol
})
const RestAreasLayer = ()=>{
    const layer = new GeoJSONLayer({
        id: "rest-areas-layer",
        url: "https://data.wsdot.wa.gov/travelcenter/RestAreas.json",
        title: "Rest Areas",
        renderer: restAreasRenderer,
        //popupTemplate: weatherStationsPopup,
        visible: false
    })
    return layer
}
    
/*const RestAreasLayer = new GeoJSONLayer({
    id: "rest-areas-layer",
   // url: "http://hqtob1webtmdev1/GISData/RestAreas.json",
    url: await getURL(),
    title: "Rest Areas",
    renderer: restAreasRenderer,
    //popupTemplate: weatherStationsPopup,
    visible: false
})*/


export default RestAreasLayer