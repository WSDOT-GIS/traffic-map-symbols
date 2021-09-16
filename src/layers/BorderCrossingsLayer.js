"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const GeoJSONLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/GeoJSONLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const BorderCrossingsSymbol_1 = tslib_1.__importDefault(require("@/symbols/BorderCrossingsSymbol"));
const renderer = new SimpleRenderer_1.default({
    symbol: BorderCrossingsSymbol_1.default
});
/*const fields = [
    new Field({ name: "UniqueId", alias: "UniqueId", type: "string" }),
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
    new Field({ name: "bl_max_axle", alias: "BL Max Axle", type: "double" }),
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
    new Field({ name: "lineMarker", alias: "lineMarker", type: "string"})
]*/
let layer;
const initLayer = (url) => {
    layer = new GeoJSONLayer_1.default({
        id: "border-crossings-layer",
        url: url,
        title: "Border Crossing Points",
        renderer: renderer,
        visible: false,
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "Border Crossings Layer is not ready yet!";
    }
    return layer;
};
// const PointRestrictionsLayer = new GeoJSONLayer({
//     id: "point-restrictions-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/PointRestrictions.json",
//     title: "Restriction Points",
//     renderer: renderer,
//     visible: false,
//     fields: fields
// });
exports.default = getLayer;
//# sourceMappingURL=BorderCrossingsLayer.js.map