import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import Symbol from "@/symbols/ParkRideSymbol";
import Field from "@arcgis/core/layers/support/Field";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as layerUtil from "@/utils/layerUtil";

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

export const initLayer = async (jsonUrl: string): Promise<FeatureLayer | undefined> => {
    try {
        layer = await layerUtil.initLayer(jsonUrl, layerId, "Park and Rides", renderer, fields, "point", false);
    }
    catch (ex) {
        console.error(ex);
    }
    return layer;
}

const getLayer = (): FeatureLayer | undefined => {
    if (!layer) {
        console.error("ParkRideLayer is not ready yet!");
    }
    return layer;
}

export default getLayer
