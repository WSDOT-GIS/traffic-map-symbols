import TileLayer from "@arcgis/core/layers/TileLayer";
let layer;
export const initLayer = (url) => {
    layer = new TileLayer({
        id: "ferry-routes-reference-layer",
        url: url,
        title: "Ferry Routes Reference",
        visible: false,
    });
    return layer;
};
const getLayer = () => {
    if (!layer) {
        throw "Ferry Routes Reference is not ready yet!";
    }
    return layer;
};
export default getLayer;
//# sourceMappingURL=ferryRoutesReferenceLayer.js.map