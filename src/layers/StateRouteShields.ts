import TileLayer from "@arcgis/core/layers/TileLayer";

let layer: TileLayer | undefined;
export const layerId = "state-route-shields-layer";

export const initLayer = (url: string): TileLayer => {
    layer = new TileLayer({
        id: layerId,
        url: url,
        title: "State Route Shields",
        visible: true,
    });
    return layer;
}

const getLayer = (): TileLayer => {
    if (!layer) {
        throw "State Route Shields is not ready yet!";
    }
    return layer;
}

export default getLayer