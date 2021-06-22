define(["require", "exports", "tslib", "@arcgis/core/renderers/UniqueValueRenderer", "../symbols/PointRestrictionsSymbol", "@arcgis/core/layers/GeoJSONLayer", "@arcgis/core/renderers/SimpleRenderer", "@/symbols/ParkRideSymbol"], function (require, exports, tslib_1, UniqueValueRenderer_1, PointRestrictionsSymbol_1, GeoJSONLayer_1, SimpleRenderer_1, ParkRideSymbol_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    UniqueValueRenderer_1 = tslib_1.__importDefault(UniqueValueRenderer_1);
    GeoJSONLayer_1 = tslib_1.__importDefault(GeoJSONLayer_1);
    SimpleRenderer_1 = tslib_1.__importDefault(SimpleRenderer_1);
    ParkRideSymbol_1 = tslib_1.__importDefault(ParkRideSymbol_1);
    var pointRestrictionsRenderer = new UniqueValueRenderer_1.default({
        field: "TType",
        uniqueValueInfos: [{
                // All features with value of "North" will be blue
                value: "R",
                symbol: PointRestrictionsSymbol_1.roadRestrictionPoint
            }, {
                // All features with value of "East" will be green
                value: "B",
                symbol: PointRestrictionsSymbol_1.bridgeRestrictionPoint
            }]
    });
    var pointRestrictionsRenderer2 = new SimpleRenderer_1.default({
        symbol: ParkRideSymbol_1.default
    });
    var PointRestrictionsLayer = new GeoJSONLayer_1.default({
        id: "point-restrictions-layer",
        url: "http://hqtob1webtmdev1/GISData/PointRestrictions.json",
        title: "Restriction Points",
        renderer: pointRestrictionsRenderer,
        /*fields: [
            new Field({
                name: "UniqueId",
                alias: "ID",
                type: "oid"
            }),
            new Field({
                name: "state",
                alias: "State",
                type: "string"
            }),
            new Field({
                name: "route_nr",
                alias: "Route Number",
                type: "string"
            }),
            new Field({
                name: "seq_nr",
                alias: "Sequence Number",
                type: "string"
            }),
            new Field({
                name: "direction",
                alias: "Direction",
                type: "single"
            }),
            new Field({
                name: "cardinal_direction",
                alias: "Compass Direction",
                type: "string"
            }),
            new Field({
                name: "restriction_start_mp",
                alias: "Start Milepost",
                type: "string"
            }),
            new Field({
                name: "restriction_end_mp",
                alias: "End Milepost",
                type: "string"
            }),
            new Field({
                name: "restriction_comment",
                alias: "Restriction Comment",
                type: "string"
            }),
            new Field({
                name: "location_name",
                alias: "Location Name",
                type: "integer"
            }),
            new Field({
                name: "location_description",
                alias: "Location Description",
                type: "integer"
            }),
            new Field({
                name: "date_posted",
                alias: "date posted",
                type: "date"
            }),
            new Field({
                name: "date_effective",
                alias: "Date Effective",
                type:"date"
            }),
            new Field({
                name: "date_expires",
                alias: "Date Expires",
                type: "date"
            }),
            new Field({
                name: "restriction_width",
                alias: "Restriction Width",
                type: "integer"
            }),
            new Field({
                name: "restriction_height",
                alias: "Restriction Height",
                type: "integer"
            }),
            new Field({
                name: "restriction_length",
                alias: "Restriction Length",
                type: "integer"
            }),
            new Field({
                name: "restriction_weight",
                alias: "Restriction Weight",
                type: "integer"
            }),
            new Field({
                name: "road_veh_type",
                alias: "Vehicle Type",
                type: "string"
            }),
            new Field({
                name: "commercial_veh_yn",
                alias: "Vehicle Vehicle",
                type: "string"
            }),
            new Field({
                name: "detour_available_yn",
                alias: "Detour Available",
                type: "string"
            }),
            new Field({
                name: "permanent_restriction_yn",
                alias: "Permanent Restriction",
                type: "string"
            }),
            new Field({
                name: "exceptions_allowed_yn",
                alias: "Exception Allowed",
                type: "string"
            }),
            new Field({
                name: "warning_yn",
                alias: "Warning",
                type: "string"
            }),
            new Field({
                name: "bridge_nr",
                alias: "Bridge NR",
                type: "string"
            }),
            new Field({
                name: "max_gvw",
                alias: "Max Gross Vehicle Weight",
                type: "integer"
            }),
            new Field({
                name: "bridge_type",
                alias: "Bridge Type",
                type: "string"
            }),
            new Field({
                name: "bridge_name",
                alias: "Bridge Name",
                type: "string"
            }),
            new Field({
                name: "bl_max_axle",
                alias: "BL Max Axle",
                type: "integer"
            }),
            new Field({
                name: "cl8_max_axle",
                alias: "C18 Max Axle",
                type: "integer"
            }),
            new Field({
                name: "sa_max_axle",
                alias: "SA Max Axle",
                type: "integer"
            }),
            new Field({
                name: "td_max_axle",
                alias: "TD Max Axle",
                type: "integer"
            }),
            new Field({
                name: "TType",
                alias: "Restriction Type",
                type: "string"
            }),
            new Field({
                name: "PostedRestrictionFlag",
                alias: "Restriction Flag",
                type: "integer"
            }),
            new Field({
                name: "RecordUpdateDate",
                alias: "Update Date",
                type: "date"
            }),
            new Field({
                name: "RelatedRouteType",
                alias: "Related Route Type",
                type: "string"
            }),
            new Field({
                name: "RelatedRouteQualifier",
                alias: "Related Route Qualifier",
                type: "string"
            }),
            new Field({
                name: "AheadBackIndicator",
                alias: "A/B indicator",
                type: "string"
            }),
            new Field({
                name: "ESRI_OID",
                alias: "ESRI OID",
                type: "integer"
            }),
        ],*/
        popupTemplate: {
            content: [{
                    type: "fields",
                    fieldInfos: [{
                            fieldName: "TType",
                            label: "Type"
                        }, {
                            fieldName: "UniqueId",
                            label: "ID"
                        }]
                }]
        },
    });
    PointRestrictionsLayer.queryFeatures({ where: "1=1" }).then(function (result) {
        console.log(result);
    });
    exports.default = PointRestrictionsLayer;
});
//# sourceMappingURL=PointRestrictionsLayer.js.map