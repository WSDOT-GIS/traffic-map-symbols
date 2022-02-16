// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import Field from "@arcgis/core/layers/support/Field";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import * as layerUtil from "@/utils/layerUtil";
import  symbol  from "@/symbols/TravelTimeSymbol"

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

export const initLayer = async (jsonUrl: string): Promise<FeatureLayer> => {
    layer = await layerUtil.initLayer(jsonUrl, 
        layerId,
        "Travel Times",
        renderer,
        fields,
        "point",
        false,
    );
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "TravelTimesLayer is not ready yet!";
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