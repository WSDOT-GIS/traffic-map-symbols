"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.centerFeatures = exports.getFeatureById = exports.reloadData = exports.initLayer = void 0;
const tslib_1 = require("tslib");
const FeatureLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/FeatureLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const Graphic_1 = tslib_1.__importDefault(require("@arcgis/core/Graphic"));
const SpatialReference_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/SpatialReference"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const RegionalAlertSymbol_1 = tslib_1.__importDefault(require("@/symbols/RegionalAlertSymbol"));
const Polygon_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/Polygon"));
const AlertAreaLayer_1 = tslib_1.__importStar(require("./AlertAreaLayer"));
const AlertAreaLayer_2 = require("@/layers/AlertAreaLayer");
// Create a symbol for rendering the graphic
const renderer = new SimpleRenderer_1.default({
    symbol: RegionalAlertSymbol_1.default
});
const fields = [
    new Field_1.default({
        name: "EventID",
        alias: "EventID",
        type: "oid"
    }),
    new Field_1.default({
        name: "CriticalEventIndicator",
        type: "integer",
        alias: "CriticalEventIndicator"
    }),
    new Field_1.default({
        name: "IconName",
        type: "string",
        alias: "IconName"
    }),
    new Field_1.default({
        name: "EventPriorityID",
        type: "integer",
        alias: "EventPriorityID"
    }),
    new Field_1.default({
        name: "EventPriorityDescription",
        type: "string",
        alias: "EventPriorityDescription"
    }),
    // County or Region
    new Field_1.default({
        name: "EventCategoryType",
        type: "string",
        alias: "EventCategoryType"
    }),
    new Field_1.default({
        name: "LastModifiedDate",
        type: "date",
        alias: "LastModifiedDate"
    }),
    new Field_1.default({
        name: "DisplayOrder",
        type: "integer",
        alias: "DisplayOrder"
    }),
    new Field_1.default({
        name: "LocationName",
        type: "string",
        alias: "LocationName"
    }),
    new Field_1.default({
        name: "HeadlineMessage",
        type: "string",
        alias: "HeadlineMessage"
    }),
    new Field_1.default({
        name: "ExtendedMessage",
        type: "string",
        alias: "ExtendedMessage"
    }),
    // County or Region ID depending on EventCategoryType.
    new Field_1.default({
        name: "CountyID",
        type: "integer",
        alias: "CountyID"
    }),
    new Field_1.default({
        name: "EventCategoryTypeDescription",
        type: "string",
        alias: "EventCategoryTypeDescription"
    }),
];
let layer;
const initLayer = (alertUrl, countyUrl, regionUrl) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const fetchResults = yield fetchData(alertUrl, countyUrl, regionUrl);
    // // Fetch all alerts from JSON...
    // let response = await fetch(alertUrl);
    // let json = await response.json();
    // // Create graphic out of each alert...
    // const pointGraphics: Graphic[] = [];
    // // Alert area polygons...
    // const polyGraphics: Graphic[] = [];
    // for (const each of json.features) {
    //     // Get region boundary from county or region service...
    //     let where = "";
    //     let nameField = "";
    //     let url = "";
    //     switch (each.attributes.EventCategoryType) {
    //         case "County":
    //             where = "JURDSG";
    //             nameField = "JURLBL";
    //             url = countyUrl;
    //             break;
    //         case "Region":
    //             where = "DistrictNumber";
    //             nameField = "RegionName";
    //             url = regionUrl;
    //             break;
    //         default:
    //             console.error("Invalid EventCategoryType: " + each.attributes.EventCategoryType);
    //             continue;
    //     }
    //     where += `=${each.attributes.CountyID}`;
    //     response = await fetch(
    //         `${url}/query?where=${encodeURIComponent(where)}&outFields=${nameField}&returnGeometry=true&outSR=3857&f=pjson`);
    //     json = await response.json();
    //     // Get centroid and set that as alert's geometry
    //     if (!json.features || json.features.length === 0) {
    //         console.error(`Failed to locate the regional alert: ${each.attributes.EventID}, 
    //         Area Type: ${each.attributes.EventCategoryType}, Area ID: ${each.attributes.CountyID}`);
    //         continue;
    //     }
    //     else {
    //         const areaFeature = json.features[0];
    //         const areaGeom = Polygon.fromJSON(areaFeature.geometry);
    //         areaGeom.spatialReference = SpatialReference.fromJSON(json.spatialReference);
    //         // Add an alert feature...
    //         //each.attributes.ExtendedMessage = "Sit laborum qui sunt nostrud nulla sint laboris ullamco dolore fugiat aute adipisicing ad cupidatat. Deserunt non velit adipisicing in duis et exercitation esse amet consequat pariatur. Qui nulla commodo labore pariatur dolore enim ipsum aute nulla nisi ullamco fugiat et. Lorem ut ea dolore commodo esse quis sunt incididunt. Cillum irure velit occaecat est cupidatat nisi in pariatur sint. Sunt laboris officia ad qui enim do Lorem. Consequat sint aliquip incididunt dolor et nulla consequat aute sint.";
    //         pointGraphics.push(new Graphic({
    //             geometry: areaGeom.centroid,
    //             attributes: each.attributes
    //         }));
    //         // Add the boundary to the Alert Area Layer with EventID
    //         polyGraphics.push(new Graphic({
    //             geometry: areaGeom,
    //             attributes: {
    //                 EventID: each.attributes.EventID,
    //                 Name: areaFeature.attributes[nameField],
    //             }
    //         }));
    //     }
    // }
    layer = new FeatureLayer_1.default({
        id: "regional-alert-layer",
        title: "Regional Alerts",
        source: fetchResults.point,
        fields: fields,
        objectIdField: "EventID",
        geometryType: "point",
        spatialReference: SpatialReference_1.default.WebMercator,
        renderer: renderer,
    });
    // Create the area boundary layer...
    const areaLayer = AlertAreaLayer_2.initLayer(fetchResults.polygon);
    return { point: layer, polygon: areaLayer };
});
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "Regional Alert Layer is not ready yet!";
    }
    return layer;
};
exports.default = getLayer;
const reloadData = (alertUrl, countyUrl, regionUrl) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const fetchResults = yield fetchData(alertUrl, countyUrl, regionUrl);
    const pointLyr = getLayer();
    pointLyr.queryFeatures().then((featureSet) => {
        pointLyr.applyEdits({ deleteFeatures: featureSet.features }).then(() => {
            pointLyr.applyEdits({ addFeatures: fetchResults.point });
        });
    });
    const polyLyr = AlertAreaLayer_1.default();
    polyLyr.queryFeatures().then((featureSet) => {
        polyLyr.applyEdits({ deleteFeatures: featureSet.features }).then(() => {
            polyLyr.applyEdits({ addFeatures: fetchResults.polygon });
        });
    });
});
exports.reloadData = reloadData;
/**
 * Fetch alerts from JSON, fetch boundaries from county or region map services, then create graphics.
 * @param alertUrl
 * @param countyUrl
 * @param regionUrl
 * @returns
 */
const fetchData = (alertUrl, countyUrl, regionUrl) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // Fetch all alerts from JSON...
    let response = yield fetch(alertUrl);
    let json = yield response.json();
    // Create graphic out of each alert...
    const pointGraphics = [];
    // Alert area polygons...
    const polyGraphics = [];
    for (const each of json.features) {
        // Get region boundary from county or region service...
        let where = "";
        let nameField = "";
        let url = "";
        switch (each.attributes.EventCategoryType) {
            case "County":
                where = "JURDSG";
                nameField = "JURLBL";
                url = countyUrl;
                break;
            case "Region":
                where = "DistrictNumber";
                nameField = "RegionName";
                url = regionUrl;
                break;
            default:
                console.error("Invalid EventCategoryType: " + each.attributes.EventCategoryType);
                continue;
        }
        where += `=${each.attributes.CountyID}`;
        response = yield fetch(`${url}/query?where=${encodeURIComponent(where)}&outFields=${nameField}&returnGeometry=true&outSR=3857&f=pjson`);
        json = yield response.json();
        // Get centroid and set that as alert's geometry
        if (!json.features || json.features.length === 0) {
            console.error(`Failed to locate the regional alert: ${each.attributes.EventID}, 
            Area Type: ${each.attributes.EventCategoryType}, Area ID: ${each.attributes.CountyID}`);
            continue;
        }
        else {
            const areaFeature = json.features[0];
            const areaGeom = Polygon_1.default.fromJSON(areaFeature.geometry);
            areaGeom.spatialReference = SpatialReference_1.default.fromJSON(json.spatialReference);
            // Add an alert feature...
            //each.attributes.ExtendedMessage = "Sit laborum qui sunt nostrud nulla sint laboris ullamco dolore fugiat aute adipisicing ad cupidatat. Deserunt non velit adipisicing in duis et exercitation esse amet consequat pariatur. Qui nulla commodo labore pariatur dolore enim ipsum aute nulla nisi ullamco fugiat et. Lorem ut ea dolore commodo esse quis sunt incididunt. Cillum irure velit occaecat est cupidatat nisi in pariatur sint. Sunt laboris officia ad qui enim do Lorem. Consequat sint aliquip incididunt dolor et nulla consequat aute sint.";
            pointGraphics.push(new Graphic_1.default({
                geometry: areaGeom.centroid,
                attributes: each.attributes
            }));
            // Add the boundary to the Alert Area Layer with EventID
            polyGraphics.push(new Graphic_1.default({
                geometry: areaGeom,
                attributes: {
                    EventID: each.attributes.EventID,
                    Name: areaFeature.attributes[nameField],
                }
            }));
        }
    }
    return { point: pointGraphics, polygon: polyGraphics };
});
const getFeatureById = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const layer = getLayer();
    const query = layer.createQuery();
    query.where = layer.objectIdField + " = " + id;
    query.outFields = ["*"];
    const response = yield layer.queryFeatures(query);
    return response.features[0];
});
exports.getFeatureById = getFeatureById;
/**
 * Center the alert icon in the center of the region that is visible.
 * @param mapExtent
 * If specified, it will only consider the visible part of the polygon.
 */
const centerFeatures = (mapExtent) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const layer = getLayer();
    const query = layer.createQuery();
    query.where = "1=1";
    query.returnGeometry = true;
    query.outFields = ["EventID"];
    const result = yield layer.queryFeatures(query);
    const updatedFtrs = [];
    for (let i = 0; i < result.features.length; i++) {
        const feature = result.features[i];
        let newPt;
        const regionId = feature.attributes["EventID"];
        if (mapExtent) {
            const visibleArea = yield AlertAreaLayer_1.getVisibleArea(regionId, mapExtent);
            newPt = visibleArea === null || visibleArea === void 0 ? void 0 : visibleArea.centroid;
        }
        else {
            const regionFtr = yield AlertAreaLayer_1.getFeatureById(regionId);
            newPt = regionFtr.geometry.centroid;
        }
        if (newPt) {
            feature.geometry = newPt;
            updatedFtrs.push(feature);
        }
    }
    yield layer.applyEdits({ updateFeatures: updatedFtrs });
});
exports.centerFeatures = centerFeatures;
//# sourceMappingURL=RegionalAlertLayer.js.map