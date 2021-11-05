// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Field from "@arcgis/core/layers/support/Field";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import * as layerUtil from "@/utils/layerUtil";
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import symbol from "@/symbols/PointRestrictionsSymbol"
const renderer = new simpleRenderer({
    symbol: symbol
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
    }),
    new Field({
        "name": "lineMarker",
        "type": "string",
        "alias": "lineMarker",
    }),
    new Field({
        "name": "location_description",
        "type": "string",
        "alias": "location_description",
    })
]

let layer: FeatureLayer | undefined;

export const initLayer = async (jsonUrl: string): Promise<FeatureLayer> => {
    layer = await layerUtil.initLayer(jsonUrl,
        "point-restrictions-layer",
        "Restriction Points",
        renderer,
        fields,
        "point",
        false,
    );
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "PointRestrictionLayer is not ready yet!";
    }
    return layer;
}
// let layer: GeoJSONLayer | undefined;

// export const initLayer = (url: string): GeoJSONLayer => {
//     layer = new GeoJSONLayer({
//         id: "point-restrictions-layer",
//         url: url,
//         title: "Restriction Points",
//         renderer: renderer,
//         visible: false,
//         fields: fields
//     });
//     return layer;
// }

// const getLayer = (): GeoJSONLayer => {
//     if (!layer) {
//         throw "PointRestrictionLayer is not ready yet!";
//     }
//     return layer;
// }

export default getLayer
