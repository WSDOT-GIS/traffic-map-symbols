import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
// Proxy created in the Developer portal for the traffic service.
const urlTraffic = "https://utility.arcgis.com/usrsvcs/appservices/ETCCPckiFqxQyUce/rest/services/World/Traffic/MapServer";
// https://developers.arcgis.com/rest/network/api-reference/traffic-service.htm
const layer = new MapImageLayer({
    url: urlTraffic,
    sublayers: [
        { id: 6, visible: true, title: "Live Traffic Flow" },
    ],
});
export default layer;
//# sourceMappingURL=TrafficLayer.js.map