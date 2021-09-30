import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Field from "@arcgis/core/layers/support/Field";

import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import symbol from "@/symbols/BorderCrossingsSymbol"
const renderer = new simpleRenderer({
    symbol: symbol
})
let layer: GeoJSONLayer | undefined;

export const initLayer = (url: string): GeoJSONLayer => {
    layer = new GeoJSONLayer({
        id: "border-crossings-layer",
        url: url,
        title: "Border Crossing Points",
        renderer: renderer,
        visible: false,
    });
    return layer;
}

const getLayer = (): GeoJSONLayer => {
    if (!layer) {
        throw "Border Crossings Layer is not ready yet!";
    }
    return layer;
}
export default getLayer
