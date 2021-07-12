import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Graphic from "@arcgis/core/Graphic";
import Symbol from "@/symbols/ParkRideSymbol";
import Popup from "@/popup-templates/ParkRidePopup";
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
    visible: true
});

export default layer


/*** Helper functions **************/
export const getParkRideInfoById = async (id: number) => {
    const query = layer.createQuery();
    query.where = "OBJECTID = " + id;
    query.outFields = ["*"];
    const response = await layer.queryFeatures(query);
    const g = response.features[0];
    if (g) {
        const info = convert2Info(g);
        return info;
    }
}

const convert2Info = (g: Graphic): ParkRideInfo => {
    const info: ParkRideInfo = {
        Address: g.attributes.Address,
        Approx_Numb_Spaces: g.attributes.Approx_Numb_Spaces,
        CityName: g.attributes.CityName,
        CountyName: g.attributes.CountyName,
        GlobalID: g.attributes.GlobalID,
        Lot_Name: g.attributes.Lot_Name,
        OBJECTID: g.attributes.OBJECTID,
        PublishDate: g.attributes.PublishDate,
        Street_Location: g.attributes.Street_Location,
        ZipCode: g.attributes.ZipCode
    };

    return info;
}