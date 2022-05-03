// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import Field from "@arcgis/core/layers/support/Field";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import * as layerUtil from "@/utils/layerUtil";
import symbol from "@/symbols/TravelTimeSymbol"
import LayerInfo, { LayerStatus } from "@/types/LayerInfo";

const renderer = new SimpleRenderer({
    symbol: symbol
})

const fields = [
    new Field({
        "name": "CurrentTime",
        "type": "integer",
        "alias": "CurrentTime"
    }),
    new Field({
        "name": "AverageTime",
        "type": "integer",
        "alias": "AverageTime"
    }),
    new Field({
        "name": "Title",
        "type": "string",
        "alias": "Title",
    }),
    new Field({
        "name": "TimeUpdated",
        "type": "date",
        "alias": "TimeUpdated",
    }),
    new Field({
        "name": "HOVCurrentTime",
        "type": "integer",
        "alias": "HOVCurrentTime"
    }),
]

let layer: FeatureLayer | undefined;
export const layerId = "travel-times-layer";
const layerTitle = "Travel Times";

/**
 * @param jsonUrl
 */
export const initLayer = async (jsonUrl: string): Promise<LayerInfo> => {
    const layerInfo = new LayerInfo(layerId, layerTitle, jsonUrl);
    try {
        layer = await layerUtil.initLayer(
            layerId,
            layerTitle,
            renderer,
            fields,
            "point",
            false
        );
    } catch (ex) {
        console.error(ex);
        layer = undefined;
        layerInfo.status = LayerStatus.Failed
    }
    return layerInfo;
}

/**
 *
 */
const getLayer = (): FeatureLayer | undefined => {
    if (!layer) {
        console.error("TravelTimesLayer is not ready yet!");
    }
    return layer;
}

// let layer: GeoJSONLayer | undefined;

// export const initLayer = (url: string): GeoJSONLayer => {
//     layer = new GeoJSONLayer({
//         id: "travel-times-layer",
//         url: url,
//         title: "Travel Times",
//         renderer: travelTimesRenderer,
//         visible: false,
//         objectIdField:"TravelTimesID"
//     });
//     return layer;
// }

// const getLayer = (): GeoJSONLayer => {
//     if (!layer) {
//         throw "TravelTimesLayer is not ready yet!";
//     }
//     return layer;
// }

export default getLayer