import TileLayer from "@arcgis/core/layers/TileLayer";
let layer;
export const initLayer = (url) => {
    layer = new TileLayer({
        id: "state-route-shields-layer",
        url: url,
        title: "State Route Shields",
        visible: true,
    });
    return layer;
};
const getLayer = () => {
    if (!layer) {
        throw "State Route Shields is not ready yet!";
    }
    return layer;
};
export default getLayer;
//# sourceMappingURL=StateRouteShields.js.map