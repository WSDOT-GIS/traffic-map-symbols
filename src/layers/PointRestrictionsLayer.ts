import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer"
import { roadRestrictionPoint, bridgeRestrictionPoint } from "../symbols/PointRestrictionsSymbol"
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import Symbol from "@/symbols/ParkRideSymbol";
import restrictionsPopup from "@/popup-templates/RestrictionsPopup"
import RestrictionInfo from "@/types/RestrictionInfo";
import Graphic from "@arcgis/core/Graphic";
const pointRestrictionsRenderer = new UniqueValueRenderer({
    field: "TType",
    uniqueValueInfos: [{
        // All features with value of "North" will be blue
        value: "R",
        symbol: roadRestrictionPoint
    }, {
        // All features with value of "East" will be green
        value: "B",
        symbol: bridgeRestrictionPoint
    }]
})
const pointRestrictionsRenderer2 = new SimpleRenderer({
    symbol: Symbol
})
const PointRestrictionsLayer = new GeoJSONLayer({
    id: "point-restrictions-layer",
    url: "https://data.wsdot.wa.gov/travelcenter/PointRestrictions.json",
    title: "Restriction Points",
    renderer: pointRestrictionsRenderer,
    //popupTemplate: restrictionsPopup,
    // featureReduction: clusterConfig
});
export default PointRestrictionsLayer

export const getPointRestrictionInfoById = async (id: number) => {
    console.log(id)
    const query = PointRestrictionsLayer.createQuery();
    query.where = "ESRI_OID = " + id;
    query.outFields = ["*"];
    const response = await PointRestrictionsLayer.queryFeatures(query);
    const g = response.features[0];
    if (g) {
        const info = convert2Info(g);
        return info;
    }
}

const convert2Info = (g: Graphic): RestrictionInfo => {
    const info: RestrictionInfo = {
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
}