import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import Graphic from "@arcgis/core/Graphic";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Field from "@arcgis/core/layers/support/Field";
import Extent from "@arcgis/core/geometry/Extent";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";

import symbol from "@/symbols/RegionalAlertSymbol";
import AlertAreaLayer, { getVisibleCenter, getFeatureById as getAreaById, layerId as areaLayerId } from "./AlertAreaLayer";
import { initLayer as initAreaLayer } from "@/layers/AlertAreaLayer";
import LayerInfo, { LayerStatus } from "@/types/LayerInfo";


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
]

let layer: FeatureLayer | undefined;
export const layerId = "regional-alert-layer";
const layerTitle = "Regional Alerts";

interface AlertFetchResult {
    point: Graphic[];
    polygon: Graphic[];
    errors: string[];
}

export const initLayer = async (alertUrl: string, countyUrl: string, regionUrl: string):
    Promise<LayerInfo[]> => {
    const pointInfo = new LayerInfo(layerId, layerTitle, alertUrl);
    let fetchResults: AlertFetchResult;
    try {
        fetchResults = await fetchData(alertUrl, countyUrl, regionUrl);
        pointInfo.status = fetchResults.errors.length > 0 ? LayerStatus.Failed : LayerStatus.Loaded;
    }
    catch (ex) {
        fetchResults = { point: [], polygon: [], errors: [] };
        console.error(ex);
        pointInfo.status = LayerStatus.Failed;
    }
    try {
        layer = new FeatureLayer({
            id: layerId,
            title: layerTitle,
            source: fetchResults.point,
            fields: fields,
            objectIdField: "EventID",
            geometryType: "point",
            spatialReference: SpatialReference.WebMercator,
            renderer: renderer,
        });
    }
    catch (ex) {
        console.error(ex);
        pointInfo.status = LayerStatus.Failed;
    }
    // Create the area boundary layer...
    const areaInfo = initAreaLayer(fetchResults.polygon);
    areaInfo.status = pointInfo.status;
    return [pointInfo, areaInfo];
}

const getLayer = (): FeatureLayer | undefined => {
    if (!layer) {
        console.error("Regional Alert Layer is not ready yet!");
    }
    return layer;
}

export default getLayer;

export const reloadData = async (alertUrl: string, countyUrl: string, regionUrl: string):
    Promise<LayerInfo[]> => {
    let fetchResults: AlertFetchResult;
    const pointInfo = new LayerInfo(layerId);
    try {
        fetchResults = await fetchData(alertUrl, countyUrl, regionUrl);
        pointInfo.status = fetchResults.errors.length > 0 ? LayerStatus.Failed : LayerStatus.Loaded;
    }
    catch (ex) {
        fetchResults = { point: [], polygon: [], errors: [] };
        console.error(ex);
        pointInfo.status = LayerStatus.Failed;
    }
    const pointLyr = getLayer();
    if (pointLyr) {
        try {
            pointLyr.queryFeatures().then((featureSet) => {
                pointLyr.applyEdits({ deleteFeatures: featureSet.features }).then(() => {
                    pointLyr.applyEdits({ addFeatures: fetchResults.point });
                });
            });
        } catch (ex) {
            console.error(ex);
            pointInfo.status = LayerStatus.Failed;
        }
    }
    const polyLyr = AlertAreaLayer();
    const polyInfo = new LayerInfo(areaLayerId);
    polyInfo.status = pointInfo.status;
    if (polyLyr) {
        try {
            polyLyr.queryFeatures().then((featureSet) => {
                polyLyr.applyEdits({ deleteFeatures: featureSet.features }).then(() => {
                    polyLyr.applyEdits({ addFeatures: fetchResults.polygon });
                });
            });
        } catch (ex) {
            console.error(ex);
            polyInfo.status = LayerStatus.Failed;
        }
    }
    return [pointInfo, polyInfo]
}
/**
 * Fetch alerts from JSON, fetch boundaries from county or region map services, then create graphics.
 * @param alertUrl 
 * @param countyUrl 
 * @param regionUrl 
 * @returns 
 */
const fetchData = async (alertUrl: string, countyUrl: string, regionUrl: string):
    Promise<AlertFetchResult> => {
    // Fetch all alerts from JSON...
    let response = await fetch(alertUrl);
    let json = await response.json();
    // Create graphic out of each alert...
    const pointGraphics: Graphic[] = [];
    // Alert area polygons...
    const polyGraphics: Graphic[] = [];
    // List of locating errors...
    const errors: string[] = [];
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
        response = await fetch(
            `${url}/query?where=${encodeURIComponent(where)}&outFields=${nameField}&returnGeometry=true&outSR=3857&f=pjson`);
        json = await response.json();
        // Get centroid and set that as alert's geometry
        if (!json.features || json.features.length === 0) {
            const err = `Failed to locate the regional alert: ${each.attributes.EventID}, 
            Area Type: ${each.attributes.EventCategoryType}, Area ID: ${each.attributes.CountyID}`;
            errors.push(err);
            console.error(err);
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
    return { point: pointGraphics, polygon: polyGraphics, errors: errors };
}
/**
 * Center the alert icon in the center of the region that is visible.
 * @param mapExtent 
 * If specified, it will only consider the visible part of the polygon.
 */
export const centerFeatures = async (visibleExtent?: Extent): Promise<void> => {
    const layer = getLayer();
    if (!layer) { return; }
    const query = layer.createQuery();
    query.where = "1=1";
    query.returnGeometry = true;
    query.outFields = ["EventID"];
    const result = await layer.queryFeatures(query);
    const updatedFtrs: Graphic[] = [];
    for (let i = 0; i < result.features.length; i++) {
        const feature = result.features[i];
        let newPt: Point | undefined;
        const regionId = feature.attributes["EventID"];
        if (visibleExtent) {
            newPt = await getVisibleCenter(regionId, visibleExtent);
        } else {
            const regionFtr = await getAreaById(regionId);
            if (regionFtr) {
                newPt = (regionFtr.geometry as Polygon).centroid;
            }
        }
        if (newPt) {
            feature.geometry = newPt;
            updatedFtrs.push(feature);
        }
    }
    if (updatedFtrs.length > 0) {
        layer.applyEdits({ updateFeatures: updatedFtrs });
    }
}
