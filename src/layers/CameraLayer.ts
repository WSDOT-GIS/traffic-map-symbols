import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import Field from "@arcgis/core/layers/support/Field";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import Symbol from "@/symbols/CameraSymbol";
import { clusterConfig, clusterMaxScale } from "@/utils/clusterUtil";
import * as layerUtil from "@/utils/layerUtil";

const renderer = new SimpleRenderer({ symbol: Symbol });

const fields = [
    new Field({
        name: "CameraID",
        alias: "Camera ID",
        type: "integer"
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

let layer: FeatureLayer | undefined;

export const initLayer = async (jsonUrl: string): Promise<FeatureLayer> => {
    layer = await layerUtil.initLayer(jsonUrl, "traffic-camera-layer", "Cameras", renderer, fields, "point", false);
    layer.featureReduction = clusterConfig;
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "CameraLayer is not ready yet!";
    }
    return layer;
}

export default getLayer

/*** Helper functions **************/
// Watch scale change...
export const toggleCluster = (newScale: number, oldScale: number): void => {
    if (!layer) { return }
    // Turn off clustering at max scale...
    if (newScale > clusterMaxScale && oldScale < clusterMaxScale) {
        layer.featureReduction = clusterConfig;
    }
    else if (newScale < clusterMaxScale && oldScale > clusterMaxScale) {
        layer.set("featureReduction", undefined);
    }
}

export const setCluster = (scale: number): void => {
    if (!layer) { return }
    if (layer.featureReduction) {
        layer.set("featureReduction", undefined);
    }
    const cluster = scale > clusterMaxScale ? clusterConfig : undefined;
    layer.set("featureReduction", cluster);
}


