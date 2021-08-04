import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import symbol from "@/symbols/RestAreasSymbol"
// import WeatherStationInfo from "@/types/WeatherStationsInfo"
// import Graphic from "@arcgis/core/Graphic"
const restAreasRenderer = new simpleRenderer({
    symbol: symbol
})
/*const FeatureLayer = ()=>{
    const layer = new GeoJSONLayer({
        id: "rest-areas-layer",
        url: "https://data.wsdot.wa.gov/travelcenter/RestAreas.json",
        title: "Rest Areas",
        renderer: restAreasRenderer,
        //popupTemplate: weatherStationsPopup,
        visible: false
    })
    return layer
}*/
    
const FeatureLayer = new GeoJSONLayer({
    id: "rest-areas-layer",
    url: "https://data.wsdot.wa.gov/travelcenter/RestAreas.json",
    //url: await getURL(),
    title: "Rest Areas",
    renderer: restAreasRenderer,
    //popupTemplate: weatherStationsPopup,
    visible: false
})


export default FeatureLayer