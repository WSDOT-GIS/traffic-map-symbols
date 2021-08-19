"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const MapImageLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/MapImageLayer"));
let layer;
const initLayer = (url) => {
    layer = new MapImageLayer_1.default({
        id: "traffic-flow-layer",
        url: url,
        sublayers: [
            { id: 6, visible: true, title: "Live Traffic Flow" },
        ],
        refreshInterval: 5,
    });
    return layer;
};
exports.initLayer = initLayer;
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
exports.default = getLayer;
//# sourceMappingURL=TrafficLayer.js.map