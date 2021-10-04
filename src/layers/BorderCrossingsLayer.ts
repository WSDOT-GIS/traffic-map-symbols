// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Field from "@arcgis/core/layers/support/Field";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"

import * as layerUtil from "@/utils/layerUtil";
import symbol from "@/symbols/BorderCrossingsSymbol"
const renderer = new simpleRenderer({
    symbol: symbol
})

const fields = [
    new Field({
        "name": "BorderCrossingDescription",
        "type": "string",
        "alias": "BorderCrossingDescription",
    }),
    new Field({
        "name": "WaitTimeText",
        "type": "string",
        "alias": "WaitTimeText",
    })
]

let layer: FeatureLayer | undefined;

export const initLayer = async (jsonUrl: string): Promise<FeatureLayer> => {
    layer = await layerUtil.initLayer(jsonUrl,
        "border-crossings-layer",
        "Border Crossing Points",
        renderer,
        fields,
        "point",
        false,
    );
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "Border Crossings Layer is not ready yet!";
    }
    return layer;
}

// let layer: GeoJSONLayer | undefined;

// export const initLayer = (url: string): GeoJSONLayer => {
//     layer = new GeoJSONLayer({
//         id: "border-crossings-layer",
//         url: url,
//         title: "Border Crossing Points",
//         renderer: renderer,
//         visible: false,
//     });
//     return layer;
// }

// const getLayer = (): GeoJSONLayer => {
//     if (!layer) {
//         throw "Border Crossings Layer is not ready yet!";
//     }
//     return layer;
// }

export default getLayer
