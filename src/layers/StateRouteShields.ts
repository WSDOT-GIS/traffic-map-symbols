import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer"


let layer: VectorTileLayer | undefined;

export const initLayer = (url: string): VectorTileLayer => {
    layer = new VectorTileLayer({
        id: "state-route-shields-layer",
        url: url,
        title: "State Route Shields",
        visible: true,
    });
    return layer;
}

const getLayer = (): VectorTileLayer => {
    if (!layer) {
        throw "State Route Shields is not ready yet!";
    }
    return layer;
}

export default getLayer