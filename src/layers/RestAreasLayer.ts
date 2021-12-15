// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
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

export const initLayer = async (jsonUrl: string): Promise<FeatureLayer> => {
    layer = await layerUtil.initLayer(jsonUrl, "rest-areas-layer", "Rest Areas", renderer, fields, "point", false, true)
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "Rest Area Layer is not ready yet!";
    }
    return layer;
}

// let layer: GeoJSONLayer | undefined;

// export const initLayer = (url: string): GeoJSONLayer => {
//     layer = new GeoJSONLayer({
//         id: "rest-areas-layer",
//         url: url,
//         title: "Rest Areas",
//         renderer: restAreasRenderer,
//         visible: false
//     });
//     return layer;
// }

// const getLayer = (): GeoJSONLayer => {
//     if (!layer) {
//         throw "Layer is not ready yet!";
//     }
//     return layer;
// }

export default getLayer