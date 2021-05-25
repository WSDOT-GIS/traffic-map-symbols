import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Basemap from "@arcgis/core/Basemap"
import WsdotBasemap from "@/layers/WsdotBasemap";
import { withScopeId } from "@vue/runtime-core";
class basemapWidget{
    widgetDiv: HTMLElement;
    constructor(webMap:WebMap) {
        this.widgetDiv=document.createElement("div");
        this.widgetDiv.innerHTML="WSDOT"
        this.widgetDiv.setAttribute("class","wsdotBasemap")
        this.widgetDiv.addEventListener("click",handleChangeBasemap)
        function handleChangeBasemap(e:Event){
            changeBasemap(webMap, e)
        }
        function changeBasemap(map:WebMap, widgetDiv:Event){
           // (widgetDiv.target as HTMLElement)!.classList.remove()
            map.basemap.id=="wsdot-basemap"? toggleSattelite():toggleWSDOT()
            function toggleSattelite(){
                map.basemap = "satellite" as any as Basemap
                (widgetDiv.target as HTMLElement)!.setAttribute("class","satelliteBasemap");
                (widgetDiv.target as HTMLElement)!.innerHTML="Satellite"
            }
            function toggleWSDOT(){
                map.basemap = WsdotBasemap as Basemap
                (widgetDiv.target as HTMLElement)!.setAttribute("class","wsdotBasemap");
                (widgetDiv.target as HTMLElement)!.innerHTML="WSDOT"
            }
        }
    }
}
export {basemapWidget}