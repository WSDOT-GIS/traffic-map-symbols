import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
let layer;
export const initLayer = (url) => {
    layer = new MapImageLayer({
        id: "roads-reference-layer",
        url: url,
        title: "ESRI Roads Reference",
        visible: false,
    });
    return layer;
};
const getLayer = () => {
    if (!layer) {
        throw "ESRI Roads Reference is not ready yet!";
    }
    return layer;
};
export default getLayer;
//# sourceMappingURL=RoadsReferenceLayer.js.map