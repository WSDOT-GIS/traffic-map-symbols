"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleCluster = exports.initLayer = void 0;
const tslib_1 = require("tslib");
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const CameraSymbol_1 = tslib_1.__importDefault(require("@/symbols/CameraSymbol"));
const clusterUtil_1 = require("@/utils/clusterUtil");
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
        title: "Traffic Cameras",
        renderer: renderer,
        featureReduction: clusterUtil_1.clusterConfig,
        fields: fields,
        visible: false
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
// const layer = new GeoJSONLayer({
//     id: "traffic-camera-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/Cameras.json",
//     title: "Traffic Cameras",
//     renderer: renderer,
//     featureReduction: clusterConfig,
//     fields: fields,
//     visible: false
// });
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
//# sourceMappingURL=CameraLayer.js.map