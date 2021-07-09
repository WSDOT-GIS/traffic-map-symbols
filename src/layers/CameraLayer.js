define(["require", "exports", "tslib", "@arcgis/core/renderers/SimpleRenderer", "@arcgis/core/layers/GeoJSONLayer", "@arcgis/core/layers/support/Field", "@/symbols/CameraSymbol", "@/symbols/CameraSymbol", "@/utils/layerUtil"], function (require, exports, tslib_1, SimpleRenderer_1, GeoJSONLayer_1, Field_1, CameraSymbol_1, CameraSymbol_2, layerUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCameraInfosFromCluster = exports.getCameraInfoById = void 0;
    SimpleRenderer_1 = tslib_1.__importDefault(SimpleRenderer_1);
    GeoJSONLayer_1 = tslib_1.__importDefault(GeoJSONLayer_1);
    Field_1 = tslib_1.__importDefault(Field_1);
    CameraSymbol_1 = tslib_1.__importDefault(CameraSymbol_1);
    var clusterConfig = layerUtil_1.generateClusterConfig("Cameras", "camera", "#fff", CameraSymbol_2.clusterSymbol);
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
        url: "http://hqtob1webtmdev1/GISData/camera.json",
        title: "Traffic Cameras",
        renderer: renderer,
        featureReduction: clusterConfig,
        fields: fields
    });
    exports.default = layer;
    /*** Helper functions **************/
    var outFields = ["CameraID", "CameraTitle", "ImageURL", "WSDOTSRID", "StateRouteMilepost",
        "CompassDirection", "Location", "CameraOwnerName", "CameraOwnerURL",
        "ImageWidth", "ImageHeight"];
    var getCameraInfoById = function (id) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var query, response, g, info;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = layer.createQuery();
                    query.where = "CameraID = " + id;
                    query.outFields = outFields;
                    return [4 /*yield*/, layer.queryFeatures(query)];
                case 1:
                    response = _a.sent();
                    g = response.features[0];
                    if (g) {
                        info = convert2Info(g);
                        return [2 /*return*/, info];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    exports.getCameraInfoById = getCameraInfoById;
    /*
    NOTE: This function only returns each feature if one of the following coditions is met:
    - maxCount is not set
    - The number of features is less than the maxCount.
    - All the features are at the identical location.
    */
    var getCameraInfosFromCluster = function (clusterGraphic, mapView, maxCount) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var layerView, query, result, doReturn, identical, pt0, i, ids, features;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mapView.whenLayerView(layer)];
                case 1:
                    layerView = _a.sent();
                    query = layerView.createQuery();
                    query.aggregateIds = [clusterGraphic.getObjectId()];
                    query.outFields = outFields;
                    return [4 /*yield*/, layerView.queryFeatures(query)];
                case 2:
                    result = _a.sent();
                    doReturn = false;
                    if (!maxCount || result.features.length <= maxCount) {
                        doReturn = true;
                    }
                    else {
                        identical = true;
                        pt0 = result.features[0].geometry;
                        for (i = 1; i < result.features.length; i++) {
                            identical = pt0.equals(result.features[i].geometry);
                            if (!identical) {
                                break;
                            }
                        }
                        if (identical) {
                            console.log("All points are located on the same spot!");
                            doReturn = true;
                        }
                        else {
                            console.log("Points are not identical.");
                        }
                    }
                    if (!doReturn) return [3 /*break*/, 4];
                    ids = result.features.map(function (feature) { return feature.attributes.CameraID; });
                    return [4 /*yield*/, getCameraInfosByIds(ids)];
                case 3:
                    features = _a.sent();
                    return [2 /*return*/, features];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    exports.getCameraInfosFromCluster = getCameraInfosFromCluster;
    var getCameraInfosByIds = function (ids) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var query, response, infos;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = layer.createQuery();
                    query.where = "CameraID IN (" + ids.join(",") + ")";
                    query.outFields = outFields;
                    return [4 /*yield*/, layer.queryFeatures(query)];
                case 1:
                    response = _a.sent();
                    infos = response.features.map(convert2Info);
                    return [2 /*return*/, infos];
            }
        });
    }); };
    var convert2Info = function (g) {
        var info = {
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
});
//# sourceMappingURL=CameraLayer.js.map