import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import symbol from "@/symbols/RestAreasSymbol";
import Field from "@arcgis/core/layers/support/Field";

import * as layerUtil from "@/utils/layerUtil";
import LayerInfo, { LayerStatus } from "@/types/LayerInfo";

const renderer = new simpleRenderer({
    symbol: symbol
});

const fields = [
    new Field({
        name: "RestAreaName",
        alias: "RestAreaName",
        type: "string"
    }),
    new Field({
        name: "LocationName",
        alias: "LocationName",
        type: "string"
    }),
    new Field({
        name: "Amenties",
        alias: "Amenties",
        type: "string"
    }),
    new Field({
        name: "RestAreaId",
        alias: "RestAreaId",
        type: "integer" // Do not set this to OID. If do, IDs will be changed by API.
    })
]

let layer: FeatureLayer | undefined;
export const layerId = "rest-areas-layer";
const layerTitle = "Rest Areas";

/**
 * @param jsonUrl
 */
export const initLayer = async (jsonUrl: string): Promise<LayerInfo> => {
    const layerInfo = new LayerInfo(layerId, layerTitle, jsonUrl);
    try {
        layer = await layerUtil.initLayer(jsonUrl, layerId, layerTitle, renderer, fields, "point", false);
    }
    catch (ex) {
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
        console.error("Rest Area Layer is not ready yet!");
    }
    return layer;
}

export default getLayer