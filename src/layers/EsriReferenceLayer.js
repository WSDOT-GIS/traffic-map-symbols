import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
let layer;
export const initLayer = (url) => {
    layer = new MapImageLayer({
        id: "esri-reference-layer",
        url: url,
        title: "ESRI Reference",
        visible: true,
    });
    return layer;
};
const getLayer = () => {
    if (!layer) {
        throw "ESRI Reference is not ready yet!";
    }
    return layer;
};
export default getLayer;
//# sourceMappingURL=EsriReferenceLayer.js.map