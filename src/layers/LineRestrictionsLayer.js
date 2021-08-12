import { roadRestrictionLine, bridgeRestrictionLine } from "../symbols/LineRestrictionsSymbol";
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
});
const fields = [
    new Field({ name: "state", alias: "State", type: "string" }),
    new Field({ name: "route_nr", alias: "Route Number", type: "string" }),
    new Field({ name: "seq_nr", alias: "Sequence Number", type: "integer" }),
    new Field({ name: "direction", alias: "Direction", type: "string" }),
    new Field({ name: "cardinal_direction", alias: "Cardinal Direction", type: "string" }),
    new Field({ name: "restriction_start_mp", alias: "Restriction Start Milepost", type: "double" }),
    new Field({ name: "restriction_end_mp", alias: "Restriction End Milepost", type: "double" }),
    new Field({ name: "restriction_comment", alias: "Restriction Comment", type: "string" }),
    new Field({ name: "location_name", alias: "Location Name", type: "string" }),
    new Field({ name: "location_description", alias: "Location Desctription", type: "string" }),
    new Field({ name: "date_posted", alias: "Date Posted", type: "date" }),
    new Field({ name: "date_effective", alias: "Date Effective", type: "date" }),
    new Field({ name: "date_expires", alias: "Date Expires", type: "date" }),
    new Field({ name: "restriction_width", alias: "Restriction Width", type: "integer" }),
    new Field({ name: "restriction_height", alias: "Restriction Height", type: "integer" }),
    new Field({ name: "restriction_length", alias: "Restriction Length", type: "integer" }),
    new Field({ name: "restriction_weight", alias: "Restriction Weight", type: "integer" }),
    new Field({ name: "road_veh_type", alias: "Road Vehicle Type", type: "string" }),
    new Field({ name: "commercial_veh_yn", alias: "Commercial Vehicle Type", type: "string" }),
    new Field({ name: "detour_available_yn", alias: "Detour Available", type: "string" }),
    new Field({ name: "permanent_restriction_yn", alias: "Permanent Restriction", type: "string" }),
    new Field({ name: "exceptions_allowed_yn", alias: "Exceptions Allowed", type: "string" }),
    new Field({ name: "warning_yn", alias: "Warning", type: "string" }),
    new Field({ name: "bridge_nr", alias: "Bridge Number", type: "string" }),
    new Field({ name: "max_gvw", alias: "Max Gross Weight", type: "double" }),
    new Field({ name: "bridge_type", alias: "Bridge Type", type: "string" }),
    new Field({ name: "bridge_name", alias: "Bridge Name", type: "string" }),
    new Field({ name: "bl_max_axle", alias: "BL Max Axle", type: "string" }),
    new Field({ name: "cl8_max_axle", alias: "CL8 Max Axle", type: "integer" }),
    new Field({ name: "sa_max_axle", alias: "SA Max Axle", type: "integer" }),
    new Field({ name: "td_max_axle", alias: "TD Max Axle", type: "integer" }),
    new Field({ name: "TType", alias: "Type", type: "string" }),
    new Field({ name: "PostedRestrictionFlag", alias: "Posted Restriction Flag", type: "integer" }),
    new Field({ name: "RecordUpdateDate", alias: "Record Update Date", type: "date" }),
    new Field({ name: "RelatedRouteType", alias: "Related Route Type", type: "string" }),
    new Field({ name: "RelatedRouteQualifier", alias: "Related Route Qualifier", type: "string" }),
    new Field({ name: "AheadBackIndicator", alias: "Ahead Back Indicator", type: "string" }),
    new Field({ name: "ESRI_OID", alias: "OID", type: "integer" }),
];
let layer;
export const initLayer = (url) => {
    layer = new GeoJSONLayer({
        id: "line-restrictions-layer",
        url: url,
        title: "Restriction Lines",
        renderer: lineRestrictionsRenderer,
        visible: false,
        fields: fields
    });
    return layer;
};
const getLayer = () => {
    if (!layer) {
        throw "LineRestrictionLayer is not ready yet!";
    }
    return layer;
};
// const LineRestrictionsLayer = new GeoJSONLayer({
//     id: "line-restrictions-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/LineRestrictions.json",
//     title: "Restriction Lines",
//     renderer: lineRestrictionsRenderer,
//     visible: false,
//     fields: fields
// });
export default getLayer;
//# sourceMappingURL=LineRestrictionsLayer.js.map