import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import { ferryRoutesSymbol } from "@/symbols/FerryRoutesSymbol"
import * as layerUtil from "@/utils/layerUtil";
import LayerInfo, { LayerStatus } from "@/types/LayerInfo";

const renderer = new simpleRenderer({
    symbol: ferryRoutesSymbol
})

let layer: FeatureLayer | undefined;
export const layerId = "ferry-routes-lines-layer";
const layerTitle = "Ferry Routes"

// const fields = [
//     new Field({
//         name: "OBJECTID",
//         alias: "OBJECTID",
//         type: "oid"
//     }),
// ]


export const initLayer = async (url: string): Promise<LayerInfo> => {
    const layerInfo = new LayerInfo(layerId, layerTitle, url);
    try {
        const graphics = await layerUtil.fetchJsonData(url)
        layer = new FeatureLayer({
            id: layerId,
            url: url,
            title: layerTitle,
            renderer: renderer,
            visible: false,
            labelsVisible: false,
            source: graphics,
            definitionExpression: '1=0'
        });
    }
    catch (ex) {
        console.error(ex);
        layer = undefined;
        layerInfo.status = LayerStatus.Failed;
    }
    return layerInfo;
}


const getLayer = (): FeatureLayer | undefined => {
    if (!layer) {
        console.error("Ferry Routes is not ready yet!");
    }
    return layer;
}

export default getLayer
