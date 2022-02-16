import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";

let layer: VectorTileLayer | undefined;
export const layerId = "mile-markers"; 

export const initLayer = (url: string): VectorTileLayer => {
    layer = new VectorTileLayer({
        id: layerId,
        url: url,
        title: "Mile Markers",
        visible: false,
    });
    return layer;
}

const getLayer = (): VectorTileLayer => {
    if (!layer) {
        throw "MileMarkers is not ready yet!";
    }
    return layer;
}

export default getLayer