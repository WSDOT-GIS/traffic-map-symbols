import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import Symbol from "@/symbols/ParkRideSymbol";
import Field from "@arcgis/core/layers/support/Field";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as layerUtil from "@/utils/layerUtil";

const renderer = new SimpleRenderer({ symbol: Symbol });

const fields = [
    new Field({
        name: "OBJECTID",
        alias: "OBJECTID",
        type: "integer"
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
        name: "Approx_Numb_Spaces",
        alias: "Approximate Number Spaces",
        type: "integer"
    }),
    new Field({
        name: "PublishDate",
        alias: "Publish Date",
        type: "date"
    }),
]

let layer: FeatureLayer | undefined;

export const initLayer = async (jsonUrl: string): Promise<FeatureLayer> => {
    layer = await layerUtil.initLayer(jsonUrl, "park-ride-layer", "Park and Rides", renderer, fields, "point", false, true);
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
