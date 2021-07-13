import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Graphic from "@arcgis/core/Graphic";
import Symbol from "@/symbols/ParkRideSymbol";
import { mapView } from "@/esri-stuff/esriMap";
import Field from "@arcgis/core/layers/support/Field";
import ParkRideInfo from "@/types/ParkRideInfo";
//import { generateClusterConfig } from "@/utils/layerUtil";

//const clusterConfig = generateClusterConfig("Park & Rides", "park & ride", "#065535");

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

const layer = new GeoJSONLayer({
    id: "park-ride-layer",
    url: "http://hqtob1webtmdev1/GISData/ParkAndRides.json",
    title: "Park and Rides",
    renderer: renderer,
    fields: fields,
    visible: false
});

export default layer
