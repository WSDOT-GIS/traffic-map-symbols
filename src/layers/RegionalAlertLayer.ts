import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import Graphic from "@arcgis/core/Graphic";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Field from "@arcgis/core/layers/support/Field";

const symbol = {
    type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
    style: "square",
    color: "red",
    size: "20px",  // pixels
    outline: {  // autocasts as new SimpleLineSymbol()
        color: [255, 255, 0],
        width: 1  // points
    }
};

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

const layer = new FeatureLayer({
    id: "regional-alert-layer",
    title: "Regional Alerts",
    fields: [
        new Field({
            name: "EventID",
            alias: "EventID",
            type: "oid"
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
    ],
    objectIdField: "EventID",
    geometryType: "point",
    spatialReference: SpatialReference.WebMercator,
    renderer: renderer,
    source: graphics,
});

export default layer;

export const getFeatureById = async (id: number): Promise<Graphic> => {
    const query = layer.createQuery();
    query.where = "EventID =" + id;
    query.outFields = ["EventID", "Label", "Note"];
    const response = await layer.queryFeatures(query);
    return response.features[0];
}
