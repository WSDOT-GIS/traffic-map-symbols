import { roadRestrictionLine, bridgeRestrictionLine } from "../symbols/LineRestrictionsSymbol"
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import Field from "@arcgis/core/layers/support/Field";

const lineRestrictionsRenderer = new UniqueValueRenderer({
    field: "TType",
    uniqueValueInfos: [{
        // All features with value of "North" will be blue
        value: "R",
        symbol: roadRestrictionLine
    }, {
        // All features with value of "East" will be green
        value: "B",
        symbol: bridgeRestrictionLine
    }],
    defaultSymbol: bridgeRestrictionLine
})

const fields = [
    new Field({ name: "UniqueId", alias: "UniqueId", type: "string" }),
    new Field({ name: "route_nr", alias: "Route Number", type: "string" }),
    new Field({ name: "cardinal_direction", alias: "Cardinal Direction", type: "string" }),
    new Field({ name: "restriction_comment", alias: "Restriction Comment", type: "string" }),
    new Field({ name: "date_effective", alias: "Date Effective", type: "date" }),
    new Field({ name: "bridge_name", alias: "Bridge Name", type: "string" }),
    new Field({ name: "TType", alias: "Type", type: "string" }),
    new Field({ name: "RecordUpdateDate", alias: "Record Update Date", type: "date" }),
    new Field({ name: "lineMarker", alias: "lineMarker", type: "string"})
]

let layer: GeoJSONLayer | undefined;

export const initLayer = (url: string): GeoJSONLayer => {
    layer = new GeoJSONLayer({
        id: "line-restrictions-layer",
        url: url,
        title: "Restriction Lines",
        renderer: lineRestrictionsRenderer,
        visible: false,
        fields: fields
    });
    return layer;
}

const getLayer = (): GeoJSONLayer => {
    if (!layer) {
        throw "LineRestrictionLayer is not ready yet!";
    }
    return layer;
}

// const LineRestrictionsLayer = new GeoJSONLayer({
//     id: "line-restrictions-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/LineRestrictions.json",
//     title: "Restriction Lines",
//     renderer: lineRestrictionsRenderer,
//     visible: false,
//     fields: fields
// });

export default getLayer
