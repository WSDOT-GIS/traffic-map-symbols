import MapImageLayer from "@arcgis/core/layers/MapImageLayer";

let layer: MapImageLayer | undefined;
export const layerId = "roads-reference-layer";

export const initLayer = (url: string): MapImageLayer | undefined => {
    try {
        layer = new MapImageLayer({
            id: layerId,
            url: url,
            title: "ESRI Roads Reference",
            visible: false,
        });
    }
    catch (ex) {
        console.error(ex);
        layer = undefined;
    }
    return layer;
}

const getLayer = (): MapImageLayer | undefined => {
    if (!layer) {
        console.error("ESRI Roads Reference is not ready yet!");
    }
    return layer;
}

export default getLayer