import MapImageLayer from "@arcgis/core/layers/MapImageLayer";

let layer: MapImageLayer | undefined;

export const initLayer = (url: string): MapImageLayer => {
    layer = new MapImageLayer({
        id: "roads-reference-layer",
        url: url,
        title: "ESRI Roads Reference",
        visible: false,
    });
    return layer;
}

const getLayer = (): MapImageLayer => {
    if (!layer) {
        throw "ESRI Roads Reference is not ready yet!";
    }
    return layer;
}

export default getLayer