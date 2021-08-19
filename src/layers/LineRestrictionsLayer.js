"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const LineRestrictionsSymbol_1 = require("../symbols/LineRestrictionsSymbol");
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const UniqueValueRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/UniqueValueRenderer"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const lineRestrictionsRenderer = new UniqueValueRenderer_1.default({
    field: "TType",
    uniqueValueInfos: [{
            // All features with value of "North" will be blue
            value: "R",
            symbol: LineRestrictionsSymbol_1.roadRestrictionLine
        }, {
            // All features with value of "East" will be green
            value: "B",
            symbol: LineRestrictionsSymbol_1.bridgeRestrictionLine
        }],
    defaultSymbol: LineRestrictionsSymbol_1.bridgeRestrictionLine
});
const fields = [
    new Field_1.default({ name: "state", alias: "State", type: "string" }),
    new Field_1.default({ name: "route_nr", alias: "Route Number", type: "string" }),
    new Field_1.default({ name: "seq_nr", alias: "Sequence Number", type: "integer" }),
    new Field_1.default({ name: "direction", alias: "Direction", type: "string" }),
    new Field_1.default({ name: "cardinal_direction", alias: "Cardinal Direction", type: "string" }),
    new Field_1.default({ name: "restriction_start_mp", alias: "Restriction Start Milepost", type: "double" }),
    new Field_1.default({ name: "restriction_end_mp", alias: "Restriction End Milepost", type: "double" }),
    new Field_1.default({ name: "restriction_comment", alias: "Restriction Comment", type: "string" }),
    new Field_1.default({ name: "location_name", alias: "Location Name", type: "string" }),
    new Field_1.default({ name: "location_description", alias: "Location Desctription", type: "string" }),
    new Field_1.default({ name: "date_posted", alias: "Date Posted", type: "date" }),
    new Field_1.default({ name: "date_effective", alias: "Date Effective", type: "date" }),
    new Field_1.default({ name: "date_expires", alias: "Date Expires", type: "date" }),
    new Field_1.default({ name: "restriction_width", alias: "Restriction Width", type: "integer" }),
    new Field_1.default({ name: "restriction_height", alias: "Restriction Height", type: "integer" }),
    new Field_1.default({ name: "restriction_length", alias: "Restriction Length", type: "integer" }),
    new Field_1.default({ name: "restriction_weight", alias: "Restriction Weight", type: "integer" }),
    new Field_1.default({ name: "road_veh_type", alias: "Road Vehicle Type", type: "string" }),
    new Field_1.default({ name: "commercial_veh_yn", alias: "Commercial Vehicle Type", type: "string" }),
    new Field_1.default({ name: "detour_available_yn", alias: "Detour Available", type: "string" }),
    new Field_1.default({ name: "permanent_restriction_yn", alias: "Permanent Restriction", type: "string" }),
    new Field_1.default({ name: "exceptions_allowed_yn", alias: "Exceptions Allowed", type: "string" }),
    new Field_1.default({ name: "warning_yn", alias: "Warning", type: "string" }),
    new Field_1.default({ name: "bridge_nr", alias: "Bridge Number", type: "string" }),
    new Field_1.default({ name: "max_gvw", alias: "Max Gross Weight", type: "double" }),
    new Field_1.default({ name: "bridge_type", alias: "Bridge Type", type: "string" }),
    new Field_1.default({ name: "bridge_name", alias: "Bridge Name", type: "string" }),
    new Field_1.default({ name: "bl_max_axle", alias: "BL Max Axle", type: "string" }),
    new Field_1.default({ name: "cl8_max_axle", alias: "CL8 Max Axle", type: "integer" }),
    new Field_1.default({ name: "sa_max_axle", alias: "SA Max Axle", type: "integer" }),
    new Field_1.default({ name: "td_max_axle", alias: "TD Max Axle", type: "integer" }),
    new Field_1.default({ name: "TType", alias: "Type", type: "string" }),
    new Field_1.default({ name: "PostedRestrictionFlag", alias: "Posted Restriction Flag", type: "integer" }),
    new Field_1.default({ name: "RecordUpdateDate", alias: "Record Update Date", type: "date" }),
    new Field_1.default({ name: "RelatedRouteType", alias: "Related Route Type", type: "string" }),
    new Field_1.default({ name: "RelatedRouteQualifier", alias: "Related Route Qualifier", type: "string" }),
    new Field_1.default({ name: "AheadBackIndicator", alias: "Ahead Back Indicator", type: "string" }),
    new Field_1.default({ name: "ESRI_OID", alias: "OID", type: "integer" }),
];
let layer;
const initLayer = (url) => {
    layer = new GeoJSONLayer_1.default({
        id: "line-restrictions-layer",
        url: url,
        title: "Restriction Lines",
        renderer: lineRestrictionsRenderer,
        visible: false,
        fields: fields
    });
    return layer;
};
exports.initLayer = initLayer;
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
exports.default = getLayer;
//# sourceMappingURL=LineRestrictionsLayer.js.map