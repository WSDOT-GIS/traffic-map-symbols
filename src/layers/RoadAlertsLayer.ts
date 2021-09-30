import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import uniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer"
import {alertSymbol,alertSymbolMedium,alertSymbolHigh,alertSymbolHighest,roadClosedSymbol} from "@/symbols/AlertSymbol"
import Field from "@arcgis/core/layers/support/Field"
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer"

const roadAlertsPriorityRenderer = new uniqueValueRenderer({
    field:"EventPriorityID",
    uniqueValueInfos: [
        {
            label:"HIGHEST IMPACT",
            value: 1,
            symbol: alertSymbolHighest
        },
        {
            label:"HIGH IMPACT",
            value: 2,
            symbol: alertSymbolHigh
        },
        {
            label:"MODERATE IMPACT",
            value: 3,
            symbol: alertSymbolMedium
        },
        {
            label:"LOW IMPACT",
            value: 4,
            symbol: alertSymbol
        },
        {
            label:"LOWEST IMPACT",
            value: 5,
            symbol: alertSymbol
        }
        
    ]
})

const roadAlertsClosureRenderer = new SimpleRenderer({
    symbol: roadClosedSymbol,
})

let priorityLayer: GeoJSONLayer | undefined;
let closureLayer: GeoJSONLayer | undefined;
export const initPriorityLayer = (url: string): GeoJSONLayer => {
    priorityLayer = new GeoJSONLayer({
        id: "road-alerts-layer",
        url: url,
        title: "Travel Alerts",
        renderer: roadAlertsPriorityRenderer,
        visible: true,
        definitionExpression:"EventCategoryDescription<>'Closure'"
    });
    return priorityLayer;
}
export const initClosureLayer = (url: string): GeoJSONLayer => {
    closureLayer = new GeoJSONLayer({
        id: "road-closures-layer",
        url: url,
        title: "Travel Closure Alerts",
        renderer: roadAlertsClosureRenderer,
        visible: true,
        definitionExpression:"EventCategoryDescription='Closure'"
    });
    return closureLayer;
}
const getLayer = (id:string): GeoJSONLayer => {
    let layerToReturn;
    if(id=="road-alerts-layer"){
        if (!priorityLayer) {
            throw "RoadAlertsLayer is not ready yet!"
        }
        else{
            layerToReturn = priorityLayer
        }
    }
    if(id=="road-closures-layer"){
        if (!closureLayer) {
            throw "RoadAlertsLayer is not ready yet!"
        }
        else{
            layerToReturn = closureLayer
        }
    }
    return layerToReturn as GeoJSONLayer;
}

// export default RoadAlertsLayer
export default getLayer;

