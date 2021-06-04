define(["require", "exports", "tslib", "@arcgis/core/layers/MapImageLayer"], function (require, exports, tslib_1, MapImageLayer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MapImageLayer_1 = tslib_1.__importDefault(MapImageLayer_1);
    // Proxy created in the Developer portal for the traffic service.
    var urlTraffic = "https://utility.arcgis.com/usrsvcs/appservices/ETCCPckiFqxQyUce/rest/services/World/Traffic/MapServer";
    // https://developers.arcgis.com/rest/network/api-reference/traffic-service.htm
    var layer = new MapImageLayer_1.default({
        url: urlTraffic,
        sublayers: [
            { id: 6, visible: true, title: "Live Traffic Flow" }, // live traffic
            // { id: 2, visible: false }, // incidents overview: critical and major incidents
            // { id: 4, visible: true }, // incidents detail: critical, major, minor as well as low impact incidents
        ],
    });
    exports.default = layer;
});
//# sourceMappingURL=TrafficLayer.js.map