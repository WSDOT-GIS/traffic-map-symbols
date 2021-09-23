import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import Graphic from "@arcgis/core/Graphic";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Field from "@arcgis/core/layers/support/Field";
import symbol from "@/symbols/RegionalAlertSymbol";
import Extent from "@arcgis/core/geometry/Extent";

import { getVisibleArea, getFeatureById as getRegionById } from "./RegionLayer";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";



// Create a symbol for rendering the graphic
const renderer = new SimpleRenderer({
    symbol: symbol
});

const graphics = [
    {
        geometry: {
            type: "point",
            x: -13702665.8094,
            y: 5842751.806699999,
            spatialReference: { wkid: 102100 }
        },
        attributes: {
            "EventID": 345431,
            "EventCategoryID": 66,
            "EventCategoryName": "Special Event",
            "EventCategoryDescription": "Special Event",
            "LastModifiedDate": 1632307479000,
            "IconName": "31.gif",
            "EventPriorityID": 1,
            "Road": "Statewide",
            "HeadlineMessage": "This is a test event, please disregard.",
            "ExtendedMessage": "300 Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accums",
            "LocationName": "Cowlitz",
            "RegionID": 1,
        }
    },
    {
        geometry: {
            type: "point",
            x: -13028821.178,
            y: 5984498.009000003,
            spatialReference: { wkid: 102100 }
        },
        attributes: {
            "EventID": 345432,
            "EventCategoryID": 66,
            "EventCategoryName": "Special Event",
            "EventCategoryDescription": "Special Event",
            "LastModifiedDate": 1632307479000,
            "IconName": "31.gif",
            "EventPriorityID": 1,
            "Road": "Statewide",
            "HeadlineMessage": "This is a test event, please disregard.",
            "ExtendedMessage": "",
            "LocationName": "Whitman County",
            "RegionID": 2,
        }
    },
    {
        geometry: {
            type: "point",
            x: -13668141.8455,
            y: 5968533.173699997,
            spatialReference: { wkid: 102100 }
        },
        attributes: {
            "EventID": 345433,
            "EventCategoryID": 66,
            "EventCategoryName": "Special Event",
            "EventCategoryDescription": "Special Event",
            "LastModifiedDate": 1632307479000,
            "IconName": "31.gif",
            "EventPriorityID": 1,
            "Road": "Statewide",
            "HeadlineMessage": "This is a test event, please disregard.",
            "ExtendedMessage": "2000 Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accumsan finibus at nascetur. Quam aptent porta penatibus ullamcorper a quis curabitur class quisque netus tempor eget, lacus ut etiam sollicitudin vulputate nullam purus hac mollis mattis egestas tortor, orci dictumst consequat lorem efficitur duis gravida non pharetra faucibus euismod. Viverra consectetur himenaeos magna laoreet nunc interdum nam, faucibus nascetur dolor pretium amet urna nisi, arcu integer penatibus pulvinar convallis parturient. Accumsan sit hendrerit leo dapibus varius congue bibendum vestibulum, amet ornare suspendisse lectus a parturient semper euismod, eros eleifend aenean erat venenatis vel molestie. Dapibus pulvinar magna torquent blandit nulla curae ut accumsan, phasellus natoque tortor gravida sit diam tempor, hendrerit penatibus sagittis mollis vitae vestibulum rhoncus. Quisque in magnis eleifend dui erat viverra ullamcorper, vivamus ligula commodo ex sagittis dis mattis vel, facilisi vulputate dignissim interdum adipiscing leo. Lorem ipsum dolor sit amet consectetur adipiscing, elit nibh facilisi mauris montes, feugiat dictum ante ad et. Habitasse facilisis venenatis hac hendrerit senectus leo convallis viverra pellentesque, montes congue nec efficitur lobortis himenaeos vel condimentum, torquent libero velit in accumsan finibus at nascetur. Quam aptent porta penatibus ullamcorper a quis curabitur class quisque netus tempor eget, lacus ut etiam sollicitudin vulputate nullam purus hac mollis mattis egestas tortor, orci dictumst consequat lorem efficitur duis gravida non pharetra faucibus euismod. Viverra consectetur himenaeos magna laoreet nunc interdum nam, faucibus nascetur dolor pretium amet urna nisi, arcu integer penatibus pulvinar convalliss",
            "LocationName": "Thuston",
            "RegionID": 3,
        }
    },
]

const fields = [
    new Field({
        name: "EventID",
        alias: "EventID",
        type: "oid"
    }),
    new Field({
        name: "RegionID",
        type: "integer",
        alias: "RegionID"
    }),
    new Field({
        name: "EventCategoryID",
        type: "integer",
        alias: "EventCategoryID"
    }),
    new Field({
        name: "EventCategoryName",
        type: "string",
        alias: "EventCategoryName"
    }),
    new Field({
        name: "EventCategoryDescription",
        type: "string",
        alias: "EventCategoryDescription"
    }),
    new Field({
        name: "LastModifiedDate",
        type: "date",
        alias: "LastModifiedDate"
    }),
    new Field({
        name: "EventPriorityID",
        type: "integer",
        alias: "EventPriorityID"
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
    }),//"IconName"
    new Field({
        name: "IconName",
        type: "string",
        alias: "IconName"
    }),
]

let layer: FeatureLayer | undefined;

export const initLayer = (url: string): FeatureLayer => {
    layer = new FeatureLayer({
        id: "regional-alert-layer",
        title: "Regional Alerts",
        fields: fields,
        objectIdField: "EventID",
        geometryType: "point",
        spatialReference: SpatialReference.WebMercator,
        renderer: renderer,
        source: graphics,
        refreshInterval: 5,
    });
    centerFeatures();
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "Regional Alert Layer is not ready yet!";
    }
    return layer;
}

export default getLayer

export const getFeatureById = async (id: number): Promise<Graphic> => {
    const layer = getLayer();
    const query = layer.createQuery();
    query.where = "EventID =" + id;
    query.outFields = ["EventID", "Label", "Note"];
    const response = await layer.queryFeatures(query);
    return response.features[0];
}
/**
 * Center the alert icon in the center of the region that is visible.
 * @param mapExtent 
 * If not specified, it will place icon at the centroid.
 */
export const centerFeatures = async (mapExtent?: Extent): Promise<void> => {
    const layer = getLayer();
    const query = layer.createQuery();
    query.where = "1 = 1";
    query.returnGeometry = true;
    query.outFields = ["EventID", "RegionID"];
    const result = await layer.queryFeatures(query);
    const updatedFtrs: Graphic[] = [];
    for (let i = 0; i < result.features.length; i++) {
        const feature = result.features[i];
        let newPt: Point | undefined;
        const regionId = feature.getAttribute("RegionID");
        if (mapExtent) {
            const visibleArea = await getVisibleArea(regionId, mapExtent);
            newPt = visibleArea?.centroid;
        } else {
            const regionFtr = await getRegionById(regionId)
            newPt = (regionFtr.geometry as Polygon).centroid;
        }
        if (newPt) {
            feature.geometry = newPt;
            updatedFtrs.push(feature);
        } 
    }
    console.log("Update count: " + updatedFtrs.length);
    const editResult = await layer.applyEdits({ updateFeatures: updatedFtrs });
    console.log(JSON.stringify(editResult));
}
