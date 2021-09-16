import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import firePerimeterSymbol from "@/symbols/FirePerimeterSymbol"
import fireIncidentLayer from "@/layers/FireIncidentLayer"
import Field from "@arcgis/core/layers/support/Field"
import Polygon from "@arcgis/core/geometry/Polygon"
import Extent from "@arcgis/core/geometry/Extent"
import Layer from "@arcgis/core/layers/Layer"
import SpatialReference from "@arcgis/core/geometry/SpatialReference"
import { mapView, webmap } from "@/esri-stuff/esriMap"
import Graphic from "@arcgis/core/Graphic"

const firePerimeterRenderer = new simpleRenderer({
    symbol: firePerimeterSymbol
})
let layer: FeatureLayer | undefined;
export const initLayer = (url: string, firePerimeterIDs: string): FeatureLayer => {
    layer = new FeatureLayer({
        id: "fire-perimeters-layer",
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
