import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import  symbol  from "@/symbols/TravelTimeSymbol"

const travelTimesRenderer = new simpleRenderer({
    symbol: symbol
})

let layer: GeoJSONLayer | undefined;

export const initLayer = (url: string): GeoJSONLayer => {
    layer = new GeoJSONLayer({
        id: "travel-times-layer",
        url: url,
        title: "Travel Times",
        renderer: travelTimesRenderer,
        visible: false,
        objectIdField:"TravelTimesID"
    });
    return layer;
}

const getLayer = (): GeoJSONLayer => {
    if (!layer) {
        throw "TravelTimesLayer is not ready yet!";
    }
    return layer;
}

export default getLayer