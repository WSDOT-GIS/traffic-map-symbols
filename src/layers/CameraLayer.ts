import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Field from "@arcgis/core/layers/support/Field";
import Symbol from "@/symbols/CameraSymbol";

import { clusterConfig, clusterMaxScale } from "@/utils/clusterUtil";

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
]

let layer: GeoJSONLayer | undefined;

export const initLayer = (url: string): GeoJSONLayer => {
    layer = new GeoJSONLayer({
        id: "traffic-camera-layer",
        url: url,
        title: "Traffic Cameras",
        renderer: renderer,
        featureReduction: clusterConfig,
        fields: fields,
        visible: false
    });
    return layer;
}

const getLayer = (): GeoJSONLayer => {
    if (!layer) {
        throw "CameraLayer is not ready yet!";
    }
    return layer;
}

// const layer = new GeoJSONLayer({
//     id: "traffic-camera-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/Cameras.json",
//     title: "Traffic Cameras",
//     renderer: renderer,
//     featureReduction: clusterConfig,
//     fields: fields,
//     visible: false
// });

export default getLayer

/*** Helper functions **************/
// Watch scale change...
export const toggleCluster = (newScale: number, oldScale: number): void => {
    if (!layer) { return }
    // Turn off clustering at max scale...
    if (newScale > clusterMaxScale && oldScale < clusterMaxScale) {
        layer.featureReduction = clusterConfig;
        //console.log("Turn on cluster: " + clusterConfig.clusterRadius + " scale: " + oldScale + " > " + newScale);
    }
    else if (newScale < clusterMaxScale && oldScale > clusterMaxScale) {
        layer.set("featureReduction", undefined);
        //console.log("Turn off cluster: " + clusterConfig.clusterRadius + " scale: " + oldScale + " > " + newScale);
    }

}


