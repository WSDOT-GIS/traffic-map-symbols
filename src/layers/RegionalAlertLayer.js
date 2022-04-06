import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import Graphic from "@arcgis/core/Graphic";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Field from "@arcgis/core/layers/support/Field";
import symbol from "@/symbols/RegionalAlertSymbol";
import Polygon from "@arcgis/core/geometry/Polygon";
import AlertAreaLayer, { getVisibleCenter, getFeatureById as getAreaById } from "./AlertAreaLayer";
import { initLayer as initAreaLayer } from "@/layers/AlertAreaLayer";
// Create a symbol for rendering the graphic
const renderer = new SimpleRenderer({
    symbol: symbol
});
const fields = [
    // new Field({
    //     name: "AppGenId", type: "oid", alias: "AppGenId"
    // }),
    new Field({
        name: "EventID",
        alias: "EventID",
        type: "oid"
    }),
    new Field({
        name: "CriticalEventIndicator",
        type: "integer",
        alias: "CriticalEventIndicator"
    }),
    new Field({
        name: "IconName",
        type: "string",
        alias: "IconName"
    }),
    new Field({
        name: "EventPriorityID",
        type: "integer",
        alias: "EventPriorityID"
    }),
    new Field({
        name: "EventPriorityDescription",
        type: "string",
        alias: "EventPriorityDescription"
    }),
    // County or Region
    new Field({
        name: "EventCategoryType",
        type: "string",
        alias: "EventCategoryType"
    }),
    new Field({
        name: "LastModifiedDate",
        type: "date",
        alias: "LastModifiedDate"
    }),
    new Field({
        name: "DisplayOrder",
        type: "integer",
        alias: "DisplayOrder"
    }),
    new Field({
        name: "LocationName",
        type: "string",
        alias: "LocationName"
    }),
    new Field({
        name: "HeadlineMessage",
        type: "string",
        alias: "HeadlineMessage"
    }),
    new Field({
        name: "ExtendedMessage",
        type: "string",
        alias: "ExtendedMessage"
    }),
    // County or Region ID depending on EventCategoryType.
    new Field({
        name: "CountyID",
        type: "integer",
        alias: "CountyID"
    }),
    new Field({
        name: "EventCategoryTypeDescription",
        type: "string",
        alias: "EventCategoryTypeDescription"
    }),
];
let layer;
export const initLayer = async (alertUrl, countyUrl, regionUrl) => {
    const fetchResults = await fetchData(alertUrl, countyUrl, regionUrl);
    layer = new FeatureLayer({
        id: "regional-alert-layer",
        title: "Regional Alerts",
        source: fetchResults.point,
        fields: fields,
        objectIdField: "EventID",
        geometryType: "point",
        spatialReference: SpatialReference.WebMercator,
        renderer: renderer,
    });
    // Create the area boundary layer...
    const areaLayer = initAreaLayer(fetchResults.polygon);
    return { point: layer, polygon: areaLayer };
};
const getLayer = () => {
    if (!layer) {
        throw "Regional Alert Layer is not ready yet!";
    }
    return layer;
};
export default getLayer;
export const reloadData = async (alertUrl, countyUrl, regionUrl) => {
    const fetchResults = await fetchData(alertUrl, countyUrl, regionUrl);
    const pointLyr = getLayer();
    pointLyr.queryFeatures().then((featureSet) => {
        pointLyr.applyEdits({ deleteFeatures: featureSet.features }).then(() => {
            pointLyr.applyEdits({ addFeatures: fetchResults.point });
        });
    });
    const polyLyr = AlertAreaLayer();
    polyLyr.queryFeatures().then((featureSet) => {
        polyLyr.applyEdits({ deleteFeatures: featureSet.features }).then(() => {
            polyLyr.applyEdits({ addFeatures: fetchResults.polygon });
        });
    });
};
/**
 * Fetch alerts from JSON, fetch boundaries from county or region map services, then create graphics.
 * @param alertUrl
 * @param countyUrl
 * @param regionUrl
 * @returns
 */
const fetchData = async (alertUrl, countyUrl, regionUrl) => {
    // Fetch all alerts from JSON...
    let response = await fetch(alertUrl);
    let json = await response.json();
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
        response = await fetch(`${url}/query?where=${encodeURIComponent(where)}&outFields=${nameField}&returnGeometry=true&outSR=3857&f=pjson`);
        json = await response.json();
        // Get centroid and set that as alert's geometry
        if (!json.features || json.features.length === 0) {
            console.error(`Failed to locate the regional alert: ${each.attributes.EventID}, 
            Area Type: ${each.attributes.EventCategoryType}, Area ID: ${each.attributes.CountyID}`);
            continue;
        }
        else {
            const areaFeature = json.features[0];
            const areaGeom = Polygon.fromJSON(areaFeature.geometry);
            areaGeom.spatialReference = SpatialReference.fromJSON(json.spatialReference);
            // Add an alert feature...
            pointGraphics.push(new Graphic({
                geometry: areaGeom.centroid,
                attributes: each.attributes
            }));
            // Add the boundary to the Alert Area Layer with EventID
            polyGraphics.push(new Graphic({
                geometry: areaGeom,
                attributes: {
                    EventID: each.attributes.EventID,
                    Name: areaFeature.attributes[nameField],
                }
            }));
        }
    }
    return { point: pointGraphics, polygon: polyGraphics };
};
// export const getFeatureById = async (id: number): Promise<Graphic> => {
//     const layer = getLayer();
//     const query = layer.createQuery();
//     query.where = layer.objectIdField + " = " + id;
//     query.outFields = ["*"];
//     const response = await layer.queryFeatures(query);
//     return response.features[0];
// }
// const debugX = -13669225.4615;
// const debugY = 5938652.26065;
// let debugCnt = 0;
/**
 * Center the alert icon in the center of the region that is visible.
 * @param mapExtent
 * If specified, it will only consider the visible part of the polygon.
 */
export const centerFeatures = async (visibleExtent) => {
    const layer = getLayer();
    const query = layer.createQuery();
    query.where = "1=1";
    query.returnGeometry = true;
    query.outFields = ["EventID"];
    const result = await layer.queryFeatures(query);
    const updatedFtrs = [];
    for (let i = 0; i < result.features.length; i++) {
        const feature = result.features[i];
        let newPt;
        const regionId = feature.attributes["EventID"];
        if (visibleExtent) {
            newPt = await getVisibleCenter(regionId, visibleExtent);
        }
        else {
            const regionFtr = await getAreaById(regionId);
            newPt = regionFtr.geometry.centroid;
        }
        if (newPt) {
            feature.geometry = newPt;
            updatedFtrs.push(feature);
        }
    }
    if (updatedFtrs.length > 0) {
        layer.applyEdits({ updateFeatures: updatedFtrs });
    }
};
//# sourceMappingURL=RegionalAlertLayer.js.map