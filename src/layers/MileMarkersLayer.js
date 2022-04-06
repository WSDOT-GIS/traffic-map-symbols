import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
let layer;
export const initLayer = (url) => {
    layer = new VectorTileLayer({
        id: "mile-markers",
        url: url,
        title: "Mile Markers",
        visible: false,
    });
    return layer;
};
const getLayer = () => {
    if (!layer) {
        throw "MileMarkers is not ready yet!";
    }
    return layer;
};
export default getLayer;
//# sourceMappingURL=MileMarkersLayer.js.map