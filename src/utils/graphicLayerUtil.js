//A set of functions to deal with the display of graphics that aren't intended to persist in the map.
import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import { mapView } from "../esri-stuff/esriMap";
import { MyLocationSymbol } from "@/symbols/MyLocationSymbol";
import { getLineFromPointId } from "./featureInfoUtil";
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
export const buildGraphicsByType = (type, data) => {
    let graphic;
    let selectedSymbol;
    let layer;
    let jsonSymbol;
    let newSymbol;
    switch (type) {
        case "coordinates":
            graphic = new Graphic({
                geometry: new Point({
                    longitude: data.longitude,
                    latitude: data.latitude,
                }),
                symbol: MyLocationSymbol
            });
            break;
        case "CIMSymbol":
            layer = data.layer;
            selectedSymbol = new CIMSymbol();
            if (layer.renderer.type == "unique-value") {
                const renderer = layer.renderer;
                const field = renderer.field;
                renderer.uniqueValueInfos.forEach(uniqueValueInfo => {
                    if (uniqueValueInfo.value == data.attributes[field]) {
                        selectedSymbol = uniqueValueInfo.symbol;
                    }
                });
            }
            if (layer.renderer.type == "simple") {
                const renderer = layer.renderer;
                selectedSymbol = renderer.symbol;
            }
            jsonSymbol = selectedSymbol.toJSON();
            jsonSymbol.symbol.symbolLayers[0].size = 30;
            jsonSymbol.symbol.symbolLayers[0].offsetY = 15;
            newSymbol = CIMSymbol.fromJSON(jsonSymbol);
            graphic = new Graphic({
                geometry: data.geometry,
                symbol: newSymbol
            });
            break;
    }
    return graphic;
};
export const addGraphicsByType = (graphicType, graphic) => {
    graphic.attributes = { graphicType: graphicType };
    mapView.graphics.add(graphic);
};
export const displayPointInteractionGraphics = (layer, targetField, targetValue) => {
    layer.visible = true;
    layer.definitionExpression = `${targetField} = '${targetValue}'`;
    getLineFromPointId(targetField, targetValue, layer);
};
export const hidePointInteractionGraphics = (layer) => {
    const targetLayer = layer;
    targetLayer.visible = false;
    if (targetLayer) {
        targetLayer.definitionExpression = "1=0"; //remove line restriction symbol
    }
};
export const removeGraphicsByType = (graphicType) => {
    switch (graphicType) {
        default: {
            const collection = mapView.graphics;
            const graphicsArray = collection.toArray();
            for (let i = 0; i < graphicsArray.length; i++) {
                if (graphicsArray[i].attributes.graphicType == graphicType) {
                    mapView.graphics.remove(graphicsArray[i]);
                }
            }
        }
    }
};
//# sourceMappingURL=graphicLayerUtil.js.map