import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import symbol from "@/symbols/RestAreasSymbol";
import Field from "@arcgis/core/layers/support/Field";

import * as layerUtil from "@/utils/layerUtil";

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
        type: "oid"
    })
]

let layer: FeatureLayer | undefined;
export const layerId = "rest-areas-layer";

export const initLayer = async (jsonUrl: string): Promise<FeatureLayer | undefined> => {
    try {
        layer = await layerUtil.initLayer(jsonUrl, layerId, "Rest Areas", renderer, fields, "point", false, true);
    }
    catch (ex) {
        console.error(ex);
    }
    return layer;
}

const getLayer = (): FeatureLayer | undefined => {
    if (!layer) {
        console.error("Rest Area Layer is not ready yet!");
    }
    return layer;
}

export default getLayer