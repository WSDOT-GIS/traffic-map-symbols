import { getDefaultBasemapInfo } from "@/layers/Basemaps"
import Graphic from "@arcgis/core/Graphic";
const weatherStationsPopup = {
    title: "<div class='popup_header_text'>Weather Station {WeatherStationCode}</div>",
    outFields:["*"],
    content: myContent,
    fieldInfos: [
        {
            fieldName: "WeatherStationId",
            label: "WeatherStationId",
            type: "oid"
        },{
            fieldName: "WeatherNetworkPriority",
            label: "Weather Network Priority",
            type: "number"
        },{
            fieldName: "WeatherStationCode",
            label: "Weather Station Code",
            type: "string"
        },{
            fieldName: "WeatherStationDescription",
            label: "Weather Station Description",
            type: "string"
        },{
            fieldName: "ElevationFeet",
            label: "Elevation Feet",
            type: "number"
        },{
            fieldName: "ElevationMeters",
            label: "Elevation Meters",
            type: "number"
        },{
            fieldName: "WeatherReportDateTime",
            label: "Weather Report Date Time",
            type: "date"
        },{
            fieldName: "TemperatureFarhenheit",
            label: "Temperature Farhenheit",
            type: "string"
        },{
            fieldName: "TemperatureCelcius",
            label: "Temperature Celcius",
            type: "string"
        },{
            fieldName: "SurfaceTemperature",
            label: "Surface Temperature",
            type: "string"
        },{
            fieldName: "MinTemperature",
            label: "Min Temperature",
            type: "string"
        },{
            fieldName: "MaxTemperature",
            label: "Max Temperature",
            type: "string"
        },{
            fieldName: "DewPoint",
            label: "Dew Point",
            type: "string"
        },{
            fieldName: "WindSpeed",
            label: "Wind Speed",
            type: "string"
        },{
            fieldName: "CardinalCompassDirection",
            label: "Cardinal Compass Direction",
            type: "string"
        },{
            fieldName: "BarometricPressure",
            label: "Barometric Pressure",
            type: "string"
        },{
            fieldName: "RelativeHumidity",
            label: "Relative Humidity",
            type: "string"
        },{
            fieldName: "Visibility",
            label: "Visibility",
            type: "string"
        },{
            fieldName: "Latitude",
            label: "Latitude",
            type: "number"
        },{
            fieldName: "Longitude",
            label: "Longitude",
            type: "number"
        },{
            fieldName: "PrecipitationAccumulated",
            label: "Precipitation Accumulated",
            type: "string"
        },{
            fieldName: "WeatherIconDisplayName",
            label: "Weather Icon Display Name",
            type: "string"
        },{
            fieldName: "WeatherIconFileName",
            label: "Weather Icon File Name",
            type: "string"
        },{
            fieldName: "Condition",
            label: "Condition",
            type: "string"
        }  
    ]
}
function myContent(feature:any) {
    const popupDiv = document.createElement("div");
    const attributesDiv = document.createElement("div");
    attributesDiv.setAttribute("id","attributesDiv")
    attributesDiv.style.display="none"
    const attributesTable = document.createElement("table")
    const attributesTableToggle = document.createElement("button")
    attributesTableToggle.setAttribute("class","sectionToggleButton")
    attributesTableToggle.innerHTML = "Show Attributes"
    attributesTableToggle.addEventListener("click",toggleStationAttributes)
    for(let i=0;i<weatherStationsPopup.fieldInfos.length;i++){
        let value;
        let label;
        if(weatherStationsPopup.fieldInfos[i].fieldName!="WeatherStationCode"){
            if(weatherStationsPopup.fieldInfos[i].type.toString()=="date"){
                value = new Date(feature.graphic.attributes[weatherStationsPopup.fieldInfos[i].fieldName])
            }
            else{
                value = feature.graphic.attributes[weatherStationsPopup.fieldInfos[i].fieldName]
            }
            label = weatherStationsPopup.fieldInfos[i].label
        }
        if(value&&label){
            const attributeRow = document.createElement("tr")
            attributeRow.innerHTML=`
            <td>
                <div style="font-weight: bold;">
                    ${label}    
                </h1>
            </td>
            <td>
                <div>
                    ${value}    
                </div>
            </td>
            `
            attributesTable.appendChild(attributeRow)
        }
    }
    popupDiv.appendChild(attributesTableToggle);
    attributesDiv.appendChild(attributesTable)
    popupDiv.appendChild(attributesDiv)
    function toggleStationAttributes(){
        attributesDiv.style.display=="block"?attributesDiv.style.display="none":attributesDiv.style.display="block"
        attributesDiv.style.display=="none"?attributesTableToggle.innerHTML="Show Attributes":attributesTableToggle.innerHTML="Hide Attributes"
    }
    /*getWeatherGrid(feature.graphic)
    function getWeatherGrid(graphic:any){
        console.log(graphic)
        fetch(
            `http://api.weather.gov/points/${graphic.geometry.latitude},${graphic.geometry.longitude}`
        ).then((results:any)=>{
            return results.json()
            }).then((data)=>{
                console.log(data)
                fetch(`https://api.weather.gov/gridpoints/${data.properties.gridId}/${data.properties.gridX},${data.properties.gridY}/forecast`).then((forecastData)=>{
                    return forecastData.json()
                }).then((forecastDataJson)=>{
                    console.log(forecastDataJson)
                    
                })
            })
        }*/
    return popupDiv;
}
export default weatherStationsPopup