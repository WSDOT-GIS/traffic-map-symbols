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
        "name": "StateRouteID",
        "type": "string",
        "alias": "State Route ID",
    }),
    new Field({
        "name": "WaitTimeText",
        "type": "string",
        "alias": "WaitTimeText",
    }),
    new Field({
        "name": "HTMLTable",
        "type": "string",
        "alias": "HTMLTable",
    }),
    new Field({
        "name": "BorderReadingTime",
        "type": "string",
        "alias": "Border Reading Time",
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

const getLayer = (): FeatureLayer | undefined => {
    if (!layer) {
        console.warn("Border Crossings Layer is not ready yet!");
    }
    return layer;
}

export default getLayer
