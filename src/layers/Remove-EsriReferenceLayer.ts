import MapImageLayer from "@arcgis/core/layers/MapImageLayer";

let layer: MapImageLayer | undefined;


export const initLayer = (url: string): MapImageLayer => {
    layer = new MapImageLayer({
        id: "esri-reference-layer",
        url: url,
        title: "ESRI Reference",
        visible: true,
    });
    return layer;
}


const getLayer = (): MapImageLayer => {
    if (!layer) {
        throw "ESRI Reference is not ready yet!";
    }
    return layer;
}

export default getLayer