import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
let layer: TileLayer | undefined;

export const initLayer = (url: string): TileLayer => {
    layer = new TileLayer({
        id: "ferry-routes-reference-layer",
        url: url,
        title: "Ferry Routes Reference",
        visible: false,
    });
    return layer;
}

const getLayer = (): TileLayer => {
    if (!layer) {
        throw "Ferry Routes Reference is not ready yet!";
    }
    return layer;
}

export default getLayer