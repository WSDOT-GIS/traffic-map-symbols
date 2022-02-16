import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import firePerimeterSymbol from "@/symbols/FirePerimeterSymbol"

const firePerimeterRenderer = new simpleRenderer({
    symbol: firePerimeterSymbol
})
let layer: FeatureLayer | undefined;
export const layerId = "fire-perimeters-layer";

export const initLayer = (url: string, firePerimeterIDs: string): FeatureLayer => {
    layer = new FeatureLayer({
        id: layerId,
        renderer:firePerimeterRenderer,
        url: url,
        title: "Fire Perimeters",
        visible: false,
        definitionExpression: firePerimeterIDs
    });
    return layer
    
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "Fire Perimeters is not ready yet!";
    }
    return layer;
}

export default getLayer
