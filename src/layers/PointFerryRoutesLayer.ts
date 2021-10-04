import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import {alertSymbol} from "@/symbols/AlertSymbol"

const ferryRoutesPointsRenderer = new simpleRenderer({
    symbol: alertSymbol
})

let layer: FeatureLayer | undefined;

export const initLayer = (url: string): FeatureLayer => {
    layer = new FeatureLayer({
        id: "ferry-routes-points-layer",
        url: url,
        title: "ferryRoutesPoints",
        renderer: ferryRoutesPointsRenderer,
        visible: true,
        labelsVisible: false
    });
    console.log(layer)
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "Ferry Routes Points is not ready yet!";
    }
    return layer;
}

export default getLayer
