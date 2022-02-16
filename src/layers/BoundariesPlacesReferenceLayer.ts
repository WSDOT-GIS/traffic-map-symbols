import MapImageLayer from "@arcgis/core/layers/MapImageLayer";

let layer: MapImageLayer | undefined;
export const layerId = "boundaries-places-reference-layer";

export const initLayer = (url: string): MapImageLayer => {
    layer = new MapImageLayer({
        id: layerId,
        url: url,
        title: "ESRI Boundaries and Places Reference",
        visible: false,
    });
    return layer;
}

const getLayer = (): MapImageLayer => {
    if (!layer) {
        throw "ESRI Boundaries and Places Reference is not ready yet!";
    }
    return layer;
}

export default getLayer