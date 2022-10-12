import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import Symbol from "../symbols/ParkRideSymbol";
import Field from "@arcgis/core/layers/support/Field";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as layerUtil from "../utils/layerUtil";
import LayerInfo, { LayerStatus } from "../types/LayerInfo";

const renderer = new SimpleRenderer({ symbol: Symbol });

const fields = [
    new Field({
        name: "OBJECTID",
        alias: "OBJECTID",
        type: "integer"
    }),
    new Field({
        name: "Lot_Name",
        alias: "Lot Name",
        type: "string"
    }),
    new Field({
        name: "CountyName",
        alias: "County Name",
        type: "string"
    }),
    new Field({
        name: "Street_Location",
        alias: "Street Location",
        type: "string"
    }),
    new Field({
        name: "Address",
        alias: "Address",
        type: "string"
    }),
    new Field({
        name: "Approx_Numb_Spaces",
        alias: "Approximate Number Spaces",
        type: "integer"
    }),
    new Field({
        name: "PublishDate",
        alias: "Publish Date",
        type: "date"
    }),
]

let layer: FeatureLayer | undefined;
export const layerId = "park-ride-layer";
const layerTitle = "Park and Rides";
/**
 * Initialize a layer
 * 
 * @param jsonUrl  - JSON URL
 * @returns Promise<LayerInfo>
 */
export const initLayer = async (jsonUrl: string): Promise<LayerInfo> => {
    const layerInfo = new LayerInfo(layerId, layerTitle, jsonUrl);
    try {
        layer = await layerUtil.initLayer(layerId, layerTitle, renderer, fields, "point", false);
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
        console.error("ParkRideLayer is not ready yet!");
    }
    return layer;
}

export default getLayer
