define(["require", "exports", "tslib", "@arcgis/core/renderers/SimpleRenderer", "@arcgis/core/layers/GeoJSONLayer", "@arcgis/core/layers/support/Field", "@/symbols/CameraSymbol", "@/utils/clusterUtil"], function (require, exports, tslib_1, SimpleRenderer_1, GeoJSONLayer_1, Field_1, CameraSymbol_1, clusterUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCameraInfosFromCluster = exports.getCameraInfoById = exports.toggleCluster = void 0;
    SimpleRenderer_1 = tslib_1.__importDefault(SimpleRenderer_1);
    GeoJSONLayer_1 = tslib_1.__importDefault(GeoJSONLayer_1);
    Field_1 = tslib_1.__importDefault(Field_1);
    CameraSymbol_1 = tslib_1.__importDefault(CameraSymbol_1);
    // const clusterConfig = generateClusterConfig("Cameras", "camera", "#fff", clusterSymbol);
    var renderer = new SimpleRenderer_1.default({ symbol: CameraSymbol_1.default });
    var fields = [
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
    var layer = new GeoJSONLayer_1.default({
        id: "traffic-camera-layer",
        url: "https://data.wsdot.wa.gov/travelcenter/ camera.json",
        title: "Traffic Cameras",
        renderer: renderer,
        featureReduction: clusterUtil_1.clusterConfig,
        fields: fields
    });
    exports.default = layer;
    /*** Helper functions **************/
    // Watch scale change...
    var toggleCluster = function (newScale, oldScale, maxScale) {
        console.log("toggleCluster scale: " + newScale);
        // Turn off clustering at max scale...
        if (newScale > maxScale && oldScale < maxScale) {
            layer.featureReduction = clusterUtil_1.clusterConfig;
            console.log("Turn on cluster: " + clusterUtil_1.clusterConfig.clusterRadius + " scale: " + oldScale + " > " + newScale);
        }
        if (identical) {
            console.log("All points are located on the same spot!");
            doReturn = true;
        }
        else {
            console.log("Points are not identical.");
        }
    }
    if (doReturn) {
        const ids = result.features.map((feature) => { return feature.attributes.CameraID; });
        const features = await getCameraInfosByIds(ids);
        return features;
    }
};
// Get Info objects...
const getCameraInfosByIds = async (ids) => {
    const query = layer.createQuery();
    query.where = "CameraID IN (" + ids.join(",") + ")";
    query.outFields = outFields;
    const response = await layer.queryFeatures(query);
    const infos = response.features.map(convert2Info);
    return infos;
};
// Convert esri graphic object to a simple custom object since esri object is not compatible with Vue...
const convert2Info = (g) => {
    const info = {
        id: g.attributes.CameraID,
        title: g.getAttribute("CameraTitle"),
        imageURL: g.attributes.ImageURL,
        srid: g.attributes.WSDOTSRID,
        milepost: g.attributes.StateRouteMilepost,
        compassDirection: g.attributes.CompassDirection,
        location: g.attributes.Location,
        ownerName: g.attributes.CameraOwnerName,
        ownerURL: g.attributes.CameraOwnerURL,
        imageWidth: g.attributes.ImageWidth,
        imageHeight: g.attributes.ImageHeight
    };
    return info;
};
//# sourceMappingURL=CameraLayer.js.map