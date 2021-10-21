import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import {ferryRoutesSymbol} from "@/symbols/FerryRoutesSymbol"
import Field from "@arcgis/core/layers/support/Field";
import * as layerUtil from "@/utils/layerUtil";

const renderer = new simpleRenderer({
    symbol: ferryRoutesSymbol
})

let layer: FeatureLayer | undefined;

const fields = [
    new Field({
        name: "OBJECTID",
        alias: "OBJECTID",
        type: "oid"
    }),
]

export const initLayer = async (url: string): Promise<FeatureLayer>  => {
    const graphics = await layerUtil.fetchJsonData(url)
    layer = new FeatureLayer({
        id: "ferry-routes-lines-layer",
        url: url,
        title: "ferryRoutes",
        renderer: renderer,
        visible: false,
        labelsVisible: false,
        source: graphics,
        definitionExpression: '1=0'
    });
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "Ferry Routes is not ready yet!";
    }
    console.log(layer)
    return layer;
}

export default getLayer
