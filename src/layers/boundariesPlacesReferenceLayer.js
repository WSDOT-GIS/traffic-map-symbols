import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
let layer;
export const initLayer = (url) => {
    layer = new MapImageLayer({
        id: "boundaries-places-reference-layer",
        url: url,
        title: "ESRI Boundaries and Places Reference",
        visible: false,
    });
    return layer;
};
const getLayer = () => {
    if (!layer) {
        throw "ESRI Boundaries and Places Reference is not ready yet!";
    }
    return layer;
};
export default getLayer;
//# sourceMappingURL=BoundariesPlacesReferenceLayer.js.map