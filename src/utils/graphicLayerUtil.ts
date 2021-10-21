//A set of functions to deal with the display of graphics that aren't intended to persist in the map.

import { roadRestrictionLine, bridgeRestrictionLine } from "@/symbols/LineRestrictionsSymbol";
import Point from "@arcgis/core/geometry/Point";
import Polyline from "@arcgis/core/geometry/Polyline"
import Geometry from "@arcgis/core/geometry/Geometry"
import Graphic from "@arcgis/core/Graphic";
import { webmap, mapView } from "../esri-stuff/esriMap";
import { MyLocationSymbol } from "@/symbols/MyLocationSymbol";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { def } from "@vue/runtime-core/node_modules/@vue/shared";
import { getLineFromPointId } from "./featureInfoUtil";
export const addGraphicsByType = (type: string, featureGeometry: any):void => {
    let graphic;
    switch (type) {
        case "myLocation":
            graphic = new Graphic({
                geometry: new Point({
                    longitude: featureGeometry.longitude,
                    latitude: featureGeometry.latitude,
                }),
                attributes: {
                    graphicType: "myLocation"
                },
                symbol: MyLocationSymbol
            })
            break;
    }
    mapView.graphics.add(graphic as Graphic)
}
export const displayPointInteractionGraphics = (layer: FeatureLayer, targetField: string, targetValue: string | number | undefined): void => {
    layer.visible = true
    layer.definitionExpression = `${targetField} = '${targetValue}'`
    getLineFromPointId(
        targetField,
        targetValue as string,
        layer
    )/*.then((lines) => {// zoom to the graphic after it displays
        mapView
        .goTo(lines.features[0].geometry)
    });*/

}
export const hidePointInteractionGraphics = (layer?: FeatureLayer): void => {
    const targetLayer = layer as FeatureLayer
    targetLayer.visible = false
    if (targetLayer) {
        targetLayer.definitionExpression = "1=0"; //remove line restriction symbol
    }
}
export const removeGraphicsByType = (graphicType: string): void => {
    switch (graphicType) {
        default: {
            const collection = mapView.graphics as __esri.Collection
            const graphicsArray = collection.toArray()
            for (let i = 0; i < graphicsArray.length; i++) {
                if (graphicsArray[i].attributes.graphicType == graphicType) {
                    mapView.graphics.remove(graphicsArray[i])
                }
            }
        }
    }

}
