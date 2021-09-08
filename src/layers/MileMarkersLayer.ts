import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

let layer: FeatureLayer | undefined;

export const initLayer = (url: string, id: string): FeatureLayer => {
    layer = new FeatureLayer({
        id: id,
        url: url,
        title: "Mile Markers",
        visible: true,
    });
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "MileMarkers is not ready yet!";
    }
    return layer;
}

export default getLayer