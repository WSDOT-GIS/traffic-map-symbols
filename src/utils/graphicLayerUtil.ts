import { roadRestrictionLine,bridgeRestrictionLine } from "@/symbols/LineRestrictionsSymbol";
import Point from "@arcgis/core/geometry/Point";
import Polyline from "@arcgis/core/geometry/Polyline"
import Geometry from "@arcgis/core/geometry/Geometry"
import Graphic from "@arcgis/core/Graphic";
import { webmap, mapView } from "../esri-stuff/esriMap";
import { MyLocationSymbol } from "@/symbols/MyLocationSymbol";
export const addGraphics = (type:string, featureGeometry:any)=>{
    let graphic;
    switch (type){
        case "myLocation":
            graphic=new Graphic({
                geometry:new Point({
                    longitude: featureGeometry.longitude,
                    latitude: featureGeometry.latitude,
                }),
                attributes:{
                    graphicType:"myLocation"
                },
                symbol: MyLocationSymbol
            })
           break;
    }
    //mapView.graphics.add(pointGraphic);
    mapView.graphics.add(graphic as Graphic)
}
export const removeGraphicsByType=(graphicType:string)=>{
    const collection = mapView.graphics as __esri.Collection
    const graphicsArray = collection.toArray()
   for(let i =0;i< graphicsArray.length;i++){
        if( graphicsArray[i].attributes.graphicType == graphicType){
            mapView.graphics.remove( graphicsArray[i])
        }
   }
}
