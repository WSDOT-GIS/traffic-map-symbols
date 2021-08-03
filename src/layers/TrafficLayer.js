import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
// Proxy created in the Developer portal for the traffic service.
const urlTraffic = "https://utility.arcgis.com/usrsvcs/appservices/ETCCPckiFqxQyUce/rest/services/World/Traffic/MapServer";
// https://developers.arcgis.com/rest/network/api-reference/traffic-service.htm
const layer = new MapImageLayer({
    url: urlTraffic,
    sublayers: [
        { id: 6, visible: true, title: "Live Traffic Flow" }, // live traffic
        // { id: 2, visible: false }, // incidents overview: critical and major incidents
        // { id: 4, visible: true }, // incidents detail: critical, major, minor as well as low impact incidents
    ],
});
export default layer;
//# sourceMappingURL=TrafficLayer.js.map