import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import {ferryRoutesSymbol} from "@/symbols/FerryRoutesSymbol"

const ferryRoutesRenderer = new simpleRenderer({
    symbol: ferryRoutesSymbol
})

let layer: FeatureLayer | undefined;

export const initLayer = (url: string): FeatureLayer => {
    layer = new FeatureLayer({
        id: "ferry-routes-lines-layer",
        url: url,
        title: "ferryRoutes",
        renderer: ferryRoutesRenderer,
        visible: false,
        labelsVisible: false
    });
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "Ferry Routes is not ready yet!";
    }
    return layer;
}

export default getLayer
