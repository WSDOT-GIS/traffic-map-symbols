import { roadRestrictionLine, bridgeRestrictionLine } from "../symbols/LineRestrictionsSymbol"
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import Field from "@arcgis/core/layers/support/Field";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import * as layerUtil from "@/utils/layerUtil";
import LayerInfo, { LayerStatus } from "@/types/LayerInfo";

const renderer = new UniqueValueRenderer({
    field: "TType",
    uniqueValueInfos: [{
        // All features with value of "North" will be blue
        value: "R",
        symbol: roadRestrictionLine
    }, {
        // All features with value of "East" will be green
        value: "B",
        symbol: bridgeRestrictionLine
    }],
    defaultSymbol: bridgeRestrictionLine
})

const fields = [
    new Field({
        "name": "restriction_comment",
        "type": "string",
        "alias": "restriction_comment",
    }),
    new Field({
        "name": "TType",
        "type": "string",
        "alias": "TType",
    }),
    new Field({
        "name": "date_effective",
        "type": "date",
        "alias": "date_effective",
    }),
    new Field({
        "name": "RecordUpdateDate",
        "type": "date",
        "alias": "RecordUpdateDate",
    }),
    new Field({
        "name": "route_nr",
        "type": "string",
        "alias": "route_nr",
    }),
    new Field({
        "name": "bridge_name",
        "type": "string",
        "alias": "bridge_name",
    }),
    new Field({
        "name": "cardinal_direction",
        "type": "string",
        "alias": "cardinal_direction",
    }),
    new Field({
        "name": "UniqueId",
        "type": "string",
        "alias": "UniqueId",
    })
]

let layer: FeatureLayer | undefined;
export const layerId = "line-restrictions-layer";
const layerTitle = "Restriction Lines";

/**
 * Initialize a layer
 * 
 * @param jsonUrl JSON URL
 * @returns Promise<LayerInfo>
 */
export const initLayer = async (jsonUrl: string): Promise<LayerInfo> => {
    const layerInfo = new LayerInfo(layerId, layerTitle, jsonUrl);
    try {
        layer = await layerUtil.initLayer(
            layerId,
            layerTitle,
            renderer,
            fields,
            "polyline",
            false
        );
    }
    catch (ex) {
        console.error(ex);
        layer = undefined;
        layerInfo.status = LayerStatus.Failed
    }
    // hide all features... Show only when the corresponding point was selected.
    if (layer) {
        layer.definitionExpression = "1=0";
    }
    return layerInfo;
}


/**
 *
 */
const getLayer = (): FeatureLayer | undefined => {
    if (!layer) {
        console.error("LineRestrictionLayer is not ready yet!");
    }
    return layer;
}

export default getLayer
