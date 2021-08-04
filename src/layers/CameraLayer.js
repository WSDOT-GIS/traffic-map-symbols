import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Field from "@arcgis/core/layers/support/Field";
import Symbol from "@/symbols/CameraSymbol";
import { clusterConfig } from "@/utils/clusterUtil";
const renderer = new SimpleRenderer({ symbol: Symbol });
const fields = [
    new Field({
        name: "CameraID",
        alias: "Camera ID",
        type: "oid"
    }),
    new Field({
        name: "CameraTitle",
        alias: "Camera Title",
        type: "string"
    }),
    new Field({
        name: "ImageURL",
        alias: "Image URL",
        type: "string"
    }),
    new Field({
        name: "WSDOTSRID",
        alias: "SR",
        type: "string"
    }),
    new Field({
        name: "StateRouteMilepost",
        alias: "Milepost",
        type: "single"
    }),
    new Field({
        name: "CompassDirection",
        alias: "Compass Direction",
        type: "string"
    }),
    new Field({
        name: "Location",
        alias: "Location",
        type: "string"
    }),
    new Field({
        name: "CameraOwnerName",
        alias: "Owner",
        type: "string"
    }),
    new Field({
        name: "CameraOwnerURL",
        alias: "Owner URL",
        type: "string"
    }),
    new Field({
        name: "ImageWidth",
        alias: "Image Width",
        type: "integer"
    }),
    new Field({
        name: "ImageHeight",
        alias: "Image Height",
        type: "integer"
    }),
];
const layer = new GeoJSONLayer({
    id: "traffic-camera-layer",
    url: "https://data.wsdot.wa.gov/travelcenter/Cameras.json",
    title: "Traffic Cameras",
    renderer: renderer,
    featureReduction: clusterConfig,
    fields: fields
});
export default layer;
/*** Helper functions **************/
// Watch scale change...
export const toggleCluster = (newScale, oldScale, maxScale) => {
    //console.log("toggleCluster scale: " + newScale);
    // Turn off clustering at max scale...
    if (newScale > maxScale && oldScale < maxScale) {
        layer.featureReduction = clusterConfig;
        //console.log("Turn on cluster: " + clusterConfig.clusterRadius + " scale: " + oldScale + " > " + newScale);
    }
    else if (newScale < maxScale && oldScale > maxScale) {
        layer.set("featureReduction", undefined);
        //console.log("Turn off cluster: " + clusterConfig.clusterRadius + " scale: " + oldScale + " > " + newScale);
    }
};
//# sourceMappingURL=CameraLayer.js.map