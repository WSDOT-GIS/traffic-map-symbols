"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const MapImageLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/MapImageLayer"));
// Proxy created in the Developer portal for the traffic service.
const urlTraffic = "https://utility.arcgis.com/usrsvcs/appservices/ETCCPckiFqxQyUce/rest/services/World/Traffic/MapServer";
// https://developers.arcgis.com/rest/network/api-reference/traffic-service.htm
const layer = new MapImageLayer_1.default({
    url: urlTraffic,
    sublayers: [
        { id: 6, visible: true, title: "Live Traffic Flow" },
    ],
});
exports.default = layer;
//# sourceMappingURL=TrafficLayer.js.map