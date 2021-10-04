import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Symbol from "@/symbols/ParkRideSymbol";
import Field from "@arcgis/core/layers/support/Field";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// import SpatialReference from "@arcgis/core/geometry/SpatialReference";
// import Graphic from "@arcgis/core/Graphic";
// import { getConfig } from "@/utils/appConfigUtil";
import * as layerUtil from "@/utils/layerUtil";
// import layer from "./ZoomExtentLayer";

const renderer = new SimpleRenderer({ symbol: Symbol });

const fields = [
    new Field({
        name: "OBJECTID",
        alias: "OBJECTID",
        type: "oid"
    }),
    new Field({
        name: "Lot_Name",
        alias: "Lot Name",
        type: "string"
    }),
    new Field({
        name: "CountyName",
        alias: "County Name",
        type: "string"
    }),
    new Field({
        name: "CityName",
        alias: "City Name",
        type: "string"
    }),
    new Field({
        name: "Street_Location",
        alias: "Street Location",
        type: "string"
    }),
    new Field({
        name: "Address",
        alias: "Address",
        type: "string"
    }),
    new Field({
        name: "ZipCode",
        alias: "Zip Code",
        type: "string"
    }),
    new Field({
        name: "Approx_Numb_Spaces",
        alias: "Approximate Number Spaces",
        type: "integer"
    }),
    new Field({
        name: "PublishDate",
        alias: "Publish Date",
        type: "date"
    }),
    new Field({
        name: "GlobalID",
        alias: "Global ID",
        type: "string"
    })
]

let layer: FeatureLayer | undefined;

export const initLayer = async (jsonUrl: string): Promise<FeatureLayer> => {
    // let graphics: Graphic[] = [];
    // if (visible) {
    //     graphics = await layerUtil.fetchJsonData(jsonUrl);
    // }
    // layer = new FeatureLayer({
    //     id: "park-ride-layer",
    //     title: "Park and Rides",
    //     objectIdField: "OBJECTID",
    //     renderer: renderer,
    //     fields: fields,
    //     visible: visible,
    //     source: graphics,
    //     geometryType: "point",
    //     spatialReference: SpatialReference.WebMercator,
    // });
    // layerUtil.setLayerEvent(layer, jsonUrl);
    layer = await layerUtil.initLayer(jsonUrl, "park-ride-layer", "Park and Rides", "OBJECTID", renderer, fields, "point", false);
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "ParkRideLayer is not ready yet!";
    }
    return layer;
}

// let layer: GeoJSONLayer | undefined;

// export const initLayer = (url: string): GeoJSONLayer => {
//     layer = new GeoJSONLayer({
//         id: "park-ride-layer",
//         url: url,
//         title: "Park and Rides",
//         renderer: renderer,
//         fields: fields,
//         visible: false
//     });
//     return layer;
// }

// const getLayer = (): GeoJSONLayer => {
//     if (!layer) {
//         throw "ParkRideLayer is not ready yet!";
//     }
//     return layer;
// }

// const layer = new GeoJSONLayer({
//     id: "park-ride-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/ParkAndRides.json",
//     title: "Park and Rides",
//     renderer: renderer,
//     fields: fields,
//     visible: false
// });

export default getLayer
