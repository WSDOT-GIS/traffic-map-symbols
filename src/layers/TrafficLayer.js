import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
let layer;
export const initLayer = (url, refreshMinute) => {
    layer = new MapImageLayer({
        id: "traffic-flow-layer",
        url: url,
        sublayers: [
            { id: 6, visible: true, title: "Live Traffic Flow" }, // live traffic
            // { id: 2, visible: false }, // incidents overview: critical and major incidents
            // { id: 4, visible: true }, // incidents detail: critical, major, minor as well as low impact incidents
        ],
        refreshInterval: refreshMinute,
    });
    return layer;
};
const getLayer = () => {
    if (!layer) {
        throw "TrafficLayer is not ready yet!";
    }
    return layer;
};
// Proxy created in the Developer portal for the traffic service.
// Using ERJ's configured proxy service.  Rate limit set to 100000/s to prevent 429 errors. 
// const urlTraffic =
//     "https://utility.arcgis.com/usrsvcs/appservices/G9CkczziK8rxtWpL/rest/services/World/Traffic/MapServer";
// https://developers.arcgis.com/rest/network/api-reference/traffic-service.htm
// const layer = new MapImageLayer({
//     id: "traffic-flow-layer",
//     url: urlTraffic,
//     sublayers: [
//         { id: 6, visible: true, title: "Live Traffic Flow" }, // live traffic
//         // { id: 2, visible: false }, // incidents overview: critical and major incidents
//         // { id: 4, visible: true }, // incidents detail: critical, major, minor as well as low impact incidents
//     ],
// });
export default getLayer;
//# sourceMappingURL=TrafficLayer.js.map