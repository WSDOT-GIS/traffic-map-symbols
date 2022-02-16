import TileLayer from "@arcgis/core/layers/TileLayer";
let layer: TileLayer | undefined;
export const layerId = "ferry-routes-reference-layer";

export const initLayer = (url: string): TileLayer => {
    layer = new TileLayer({
        id: layerId,
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