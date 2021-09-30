import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Field from "@arcgis/core/layers/support/Field";
import Symbol from "@/symbols/CameraSymbol";

import { clusterConfig, clusterMaxScale } from "@/utils/clusterUtil";
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// import Point from "@arcgis/core/geometry/Point";
// import SpatialReference from "@arcgis/core/geometry/SpatialReference";
// import { geographicToWebMercator } from "@arcgis/core/geometry/support/webMercatorUtils";
// import Graphic from "@arcgis/core/Graphic";

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
        title: "Cameras",
        renderer: renderer,
        featureReduction: clusterConfig,
        fields: fields,
        visible: false,
    });
    return layer;
}

const getLayer = (): GeoJSONLayer => {
    if (!layer) {
        throw "CameraLayer is not ready yet!";
    }
    return layer;
}
/*** create feature layer from GeoJSON */
// let layer2: FeatureLayer | undefined;

// export const initLayer2 = async (url: string): Promise<FeatureLayer> => {
//     // Fetch all alerts from JSON...
//     const response = await fetch(url);
//     const json = await response.json();
//     // Create graphic out of each feature...
//     const graphics: Graphic[] = [];
//     for (const each of json.features) {
//         const ptWgs = new Point({
//             x: each.geometry.coordinates[0],
//             y: each.geometry.coordinates[1],
//             spatialReference: SpatialReference.WGS84
//         });
//         const pt = geographicToWebMercator(ptWgs);
//         graphics.push(new Graphic({
//             geometry: pt,
//             attributes: each.properties,
//         }))
//     }
//     layer2 = new FeatureLayer({
//         id: "traffic-camera-layer",
//         title: "Cameras",
//         source: graphics,
//         fields: fields,
//         objectIdField: "CameraID",
//         geometryType: "point",
//         spatialReference: SpatialReference.WebMercator,
//         renderer: renderer,
//         featureReduction: clusterConfig,
//         visible: false,
//     });
//     return layer2;
// }

// const getLayer2 = (): FeatureLayer => {
//     if (!layer2) {
//         throw "CameraLayer is not ready yet!";
//     }
//     return layer2;
// }

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

export const setCluster = (scale: number): void => {
    if (!layer) { return }
    if (layer.featureReduction) {
        layer.set("featureReduction", undefined);
    }
    const cluster = scale > clusterMaxScale ? clusterConfig : undefined;
    layer.set("featureReduction", cluster);
}


