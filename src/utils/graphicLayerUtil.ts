//A set of functions to deal with the display of graphics that aren't intended to persist in the map.

import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import { mapView } from "../esri-stuff/esriMap";
import { MyLocationSymbol } from "@/symbols/MyLocationSymbol";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { getLineFromPointId } from "./featureInfoUtil";
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import Map from "@arcgis/core/Map";
// import layer from "@/layers/ZoomExtentLayer";

/**
 * 
 * @param type The type of data being passed: "coordinates" or "CIMSymbol"
 * @param data The data object
 * @returns A graphic
 */
export const buildGraphicsByType = (type: string, data: any): Graphic => {
    let graphic;
    let selectedSymbol;
    let layer
    let jsonSymbol
    let newSymbol
    switch (type) {
        case "coordinates":
            graphic = new Graphic({
                geometry: new Point({
                    longitude: data.longitude,
                    latitude: data.latitude,
                }),
                symbol: MyLocationSymbol
            })
            break;
        case "CIMSymbol":
            layer = data.layer as FeatureLayer;
            selectedSymbol = new CIMSymbol();
            if (layer.renderer.type == "unique-value") {
                const renderer = layer.renderer as UniqueValueRenderer
                const field = renderer.field
                renderer.uniqueValueInfos.forEach(uniqueValueInfo => {
                    if (uniqueValueInfo.value == data.attributes[field]) {
                        selectedSymbol = uniqueValueInfo.symbol as CIMSymbol
                    }
                });
            }
            if (layer.renderer.type == "simple") {
                const renderer = layer.renderer as SimpleRenderer
                selectedSymbol = renderer.symbol as CIMSymbol
            }
            jsonSymbol = selectedSymbol.toJSON()
            jsonSymbol.symbol.symbolLayers[0].size = 30
            jsonSymbol.symbol.symbolLayers[0].offsetY = 15
            newSymbol = CIMSymbol.fromJSON(jsonSymbol)
            graphic = new Graphic({
                geometry: data.geometry,
                symbol: newSymbol
            });
            break;
    }
    return graphic as Graphic

}
/**
 * @param graphicType
 * @param graphic
 */
export const addGraphicsByType = (graphicType: string, graphic: Graphic): void => {
    graphic.attributes = { graphicType: graphicType }
    mapView.graphics.add(graphic as Graphic)
}
/**
 * @param layerId
 * @param map
 * @param targetField
 * @param targetValue
 */
export const displayPointInteractionGraphics = (layerId: string, map: Map, targetField: string, targetValue: string | number | undefined): void => {
    const layer = map.findLayerById(layerId);
    if (!layer || layer.type != "feature") {
        console.warn(`The specified layer, ${layerId}, is not available or not a feature layer.`);
        return;
    }
    const fLyr = layer as FeatureLayer;
    fLyr.visible = true
    fLyr.definitionExpression = `${targetField} in (${targetValue})`
    fLyr.refresh()
   /* getLineFromPointId(
        targetField,
        targetValue as string,
        fLyr
    )*/
}
/**
 * @param layerId
 * @param map
 */
export const hidePointInteractionGraphics = (layerId: string, map: Map): void => {
    const layer = map.findLayerById(layerId);
    if (!layer || layer.type != "feature") {
        console.warn(`The specified layer, ${layerId}, is not available or not a feature layer.`);
        return;
    }
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
