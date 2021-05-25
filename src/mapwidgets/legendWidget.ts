import WebMap from "@arcgis/core/WebMap";
import LegendInfo from "../types/LegendInfo"
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import MapView from "@arcgis/core/views/MapView";
import Basemap from "@arcgis/core/Basemap"
import WsdotBasemap from "@/layers/WsdotBasemap";
import { withScopeId } from "@vue/runtime-core";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
class legendWidget{
    widgetDiv: HTMLElement;
    constructor(webMap:WebMap) {
        this.widgetDiv=document.createElement("div");
        this.widgetDiv.setAttribute("id","legendWidget")
        const legendLayers:LegendInfo[] =[]
        webMap.layers.forEach((layer)=>{
            const mil = layer as MapImageLayer
            console.log(mil.sublayers)
        })
    }
}
export {legendWidget}