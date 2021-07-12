define(["require", "exports", "tslib", "@arcgis/core/renderers/UniqueValueRenderer", "../symbols/PointRestrictionsSymbol", "@arcgis/core/layers/GeoJSONLayer", "@arcgis/core/renderers/SimpleRenderer", "@/symbols/ParkRideSymbol"], function (require, exports, tslib_1, UniqueValueRenderer_1, PointRestrictionsSymbol_1, GeoJSONLayer_1, SimpleRenderer_1, ParkRideSymbol_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getPointRestrictionInfoById = void 0;
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
    });
    exports.default = PointRestrictionsLayer;
    var getPointRestrictionInfoById = function (id) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var query, response, g, info;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(id);
                    query = PointRestrictionsLayer.createQuery();
                    query.where = "ESRI_OID = " + id;
                    query.outFields = ["*"];
                    return [4 /*yield*/, PointRestrictionsLayer.queryFeatures(query)];
                case 1:
                    response = _a.sent();
                    g = response.features[0];
                    if (g) {
                        info = convert2Info(g);
                        return [2 /*return*/, info];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    exports.getPointRestrictionInfoById = getPointRestrictionInfoById;
    var convert2Info = function (g) {
        var info = {
            UniqueId: g.attributes.UniqueId,
            state: g.attributes.state,
            route_nr: g.attributes.route_nr,
            seq_nr: g.attributes.seq_nr,
            direction: g.attributes.direction,
            cardinal_direction: g.attributes.cardinal_direction,
            restriction_start_mp: g.attributes.restriction_start_mp,
            restriction_end_mp: g.attributes.restriction_end_mp,
            restriction_comment: g.attributes.restriction_comment,
            location_name: g.attributes.location_name,
            location_description: g.attributes.location_description,
            date_posted: g.attributes.date_posted,
            date_effective: g.attributes.date_effective,
            date_expires: g.attributes.date_expires,
            restriction_width: g.attributes.restriction_width,
            restriction_height: g.attributes.restriction_height,
            restriction_length: g.attributes.restriction_length,
            restriction_weight: g.attributes.restriction_weight,
            road_veh_type: g.attributes.road_veh_type,
            commercial_veh_yn: g.attributes.commercial_veh_yn,
            detour_available_yn: g.attributes.detour_available_yn,
            permanent_restriction_yn: g.attributes.permanent_restriction_yn,
            exceptions_allowed_yn: g.attributes.exceptions_allowed_yn,
            warning_yn: g.attributes.warning_yn,
            bridge_nr: g.attributes.bridge_nr,
            max_gvw: g.attributes.max_gvw,
            bridge_type: g.attributes.bridge_type,
            bridge_name: g.attributes.bridge_name,
            bl_max_axle: g.attributes.bl_max_axle,
            cl8_max_axle: g.attributes.cl8_max_axle,
            sa_max_axle: g.attributes.sa_max_axle,
            td_max_axle: g.attributes.td_max_axle,
            TType: g.attributes.TType,
            PostedRestrictionFlag: g.attributes.PostedRestrictionFlag,
            RecordUpdateDate: g.attributes.RecordUpdateDate,
            RelatedRouteType: g.attributes.RelatedRouteType,
            RelatedRouteQualifier: g.attributes.RelatedRouteQualifier,
            AheadBackIndicator: g.attributes.AheadBackIndicator,
            ESRI_OID: g.attributes.ESRI_OID
        };
        return info;
    };
});
//# sourceMappingURL=PointRestrictionsLayer.js.map