import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Field from "@arcgis/core/layers/support/Field";

import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import symbol from "@/symbols/PointRestrictionsSymbol"
const renderer = new simpleRenderer({
    symbol: symbol
})

let layer: GeoJSONLayer | undefined;

export const initLayer = (url: string): GeoJSONLayer => {
    layer = new GeoJSONLayer({
        id: "point-restrictions-layer",
        url: url,
        title: "Restriction Points",
        renderer: renderer,
        visible: false,
    });
    return layer;
}

const getLayer = (): GeoJSONLayer => {
    if (!layer) {
        throw "PointRestrictionLayer is not ready yet!";
    }
    return layer;
}

// const PointRestrictionsLayer = new GeoJSONLayer({
//     id: "point-restrictions-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/PointRestrictions.json",
//     title: "Restriction Points",
//     renderer: renderer,
//     visible: false,
//     fields: fields

// });
export default getLayer
