"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCluster = exports.toggleCluster = exports.initLayer = void 0;
const tslib_1 = require("tslib");
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const CameraSymbol_1 = tslib_1.__importDefault(require("@/symbols/CameraSymbol"));
const clusterUtil_1 = require("@/utils/clusterUtil");
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// import Point from "@arcgis/core/geometry/Point";
// import SpatialReference from "@arcgis/core/geometry/SpatialReference";
// import { geographicToWebMercator } from "@arcgis/core/geometry/support/webMercatorUtils";
// import Graphic from "@arcgis/core/Graphic";
const renderer = new SimpleRenderer_1.default({ symbol: CameraSymbol_1.default });
const fields = [
    new Field_1.default({
        name: "CameraID",
        alias: "Camera ID",
        type: "oid"
    }),
    new Field_1.default({
        name: "CameraTitle",
        alias: "Camera Title",
        type: "string"
    }),
    new Field_1.default({
        name: "ImageURL",
        alias: "Image URL",
        type: "string"
    }),
    new Field_1.default({
        name: "WSDOTSRID",
        alias: "SR",
        type: "string"
    }),
    new Field_1.default({
        name: "StateRouteMilepost",
        alias: "Milepost",
        type: "single"
    }),
    new Field_1.default({
        name: "CompassDirection",
        alias: "Compass Direction",
        type: "string"
    }),
    new Field_1.default({
        name: "Location",
        alias: "Location",
        type: "string"
    }),
    new Field_1.default({
        name: "CameraOwnerName",
        alias: "Owner",
        type: "string"
    }),
    new Field_1.default({
        name: "CameraOwnerURL",
        alias: "Owner URL",
        type: "string"
    }),
    new Field_1.default({
        name: "ImageWidth",
        alias: "Image Width",
        type: "integer"
    }),
    new Field_1.default({
        name: "ImageHeight",
        alias: "Image Height",
        type: "integer"
    }),
];
let layer;
const initLayer = (url) => {
    layer = new GeoJSONLayer_1.default({
        id: "traffic-camera-layer",
        url: url,
        title: "Cameras",
        renderer: renderer,
        featureReduction: clusterUtil_1.clusterConfig,
        fields: fields,
        visible: false,
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "CameraLayer is not ready yet!";
    }
    return layer;
};
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
exports.default = getLayer;
/*** Helper functions **************/
// Watch scale change...
const toggleCluster = (newScale, oldScale) => {
    if (!layer) {
        return;
    }
    // Turn off clustering at max scale...
    if (newScale > clusterUtil_1.clusterMaxScale && oldScale < clusterUtil_1.clusterMaxScale) {
        layer.featureReduction = clusterUtil_1.clusterConfig;
        //console.log("Turn on cluster: " + clusterConfig.clusterRadius + " scale: " + oldScale + " > " + newScale);
    }
    else if (newScale < clusterUtil_1.clusterMaxScale && oldScale > clusterUtil_1.clusterMaxScale) {
        layer.set("featureReduction", undefined);
        //console.log("Turn off cluster: " + clusterConfig.clusterRadius + " scale: " + oldScale + " > " + newScale);
    }
};
exports.toggleCluster = toggleCluster;
const setCluster = (scale) => {
    if (!layer) {
        return;
    }
    if (layer.featureReduction) {
        layer.set("featureReduction", undefined);
    }
    const cluster = scale > clusterUtil_1.clusterMaxScale ? clusterUtil_1.clusterConfig : undefined;
    layer.set("featureReduction", cluster);
};
exports.setCluster = setCluster;
//# sourceMappingURL=CameraLayer.js.map