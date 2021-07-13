define(["require", "exports", "tslib"], function (require, exports, tslib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getGraphicsInfoById = void 0;
    var getGraphicsInfoById = function (graphic, idName, layer) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var query, theid, response, g, info;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = layer.createQuery();
                    theid = graphic.getObjectId();
                    query.where = idName + " = " + theid;
                    query.outFields = ["*"];
                    return [4 /*yield*/, layer.queryFeatures(query)];
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
    exports.getGraphicsInfoById = getGraphicsInfoById;
    var convert2Info = function (g) {
        var info;
        switch (g.layer.title) {
            case "Weather Stations":
                info = info;
                info = {
                    WeatherStationId: g.attributes.WeatherStationId,
                    WeatherNetworkPriority: g.attributes.WeatherNetworkPriority,
                    WeatherStationCode: g.attributes.WeatherStationCode,
                    WeatherStationDescription: g.attributes.WeatherStationDescription,
                    ElevationFeet: g.attributes.ElevationFeet,
                    ElevationMeters: g.attributes.ElevationMeters,
                    WeatherReportDateTime: g.attributes.WeatherReportDateTime,
                    TemperatureFarhenheit: g.attributes.TemperatureFarhenheit,
                    TemperatureCelcius: g.attributes.TemperatureCelcius,
                    SurfaceTemperature: g.attributes.SurfaceTemperature,
                    MinTemperature: g.attributes.MinTemperature,
                    MaxTemperature: g.attributes.MaxTemperature,
                    DewPoint: g.attributes.DewPoint,
                    WindSpeed: g.attributes.WindSpeed,
                    CardinalCompassDirection: g.attributes.CardinalCompassDirection,
                    BarometricPressure: g.attributes.BarometricPressure,
                    RelativeHumidity: g.attributes.RelativeHumidity,
                    Visibility: g.attributes.Visibility,
                    Latitude: g.attributes.Latitude,
                    Longitude: g.attributes.Longitude,
                    PrecipitationAccumulated: g.attributes.PrecipitationAccumulated,
                    WeatherIconDisplayName: g.attributes.WeatherIconDisplayName,
                    WeatherIconFileName: g.attributes.WeatherIconFileName,
                    Condition: g.attributes.Condition
                };
                break;
            case "Restriction Points":
                info = info;
                info = {
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
                break;
            case "Restriction Lines":
                info = info;
                info = {
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
                break;
            case "Mountain Passes":
                info = info;
                info = {
                    MountainPassId: g.attributes.MountainPassId,
                    PassName: g.attributes.PassName,
                    Elevation: g.attributes.Elevation,
                    ElevationUnit: g.attributes.ElevationUnit,
                    TravelAdvisoryAvailable: g.attributes.TravelAdvisoryAvailable,
                    Latitude: g.attributes.Latitude,
                    Longitude: g.attributes.Longitude,
                    Temperature: g.attributes.Temperature,
                    TemperatureUnit: g.attributes.TemperatureUnit,
                    Weather: g.attributes.Weather,
                    RoadCondition: g.attributes.RoadCondition,
                    DisplayDate: g.attributes.DisplayDate,
                    TravelAdvisoryFlag: g.attributes.TravelAdvisoryFlag,
                    TravelDirection1: g.attributes.TravelDirection1,
                    PublicMessage1: g.attributes.PublicMessage1,
                    TravelDirection2: g.attributes.TravelDirection2,
                    PublicMessage2: g.attributes.PublicMessage2
                };
                break;
            case "Park and Rides":
                info = info;
                info = {
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
                break;
            case "Traffic Cameras":
                info = info;
                info = {
                    id: g.attributes.CameraID,
                    title: g.attributes.CameraTitle,
                    imageURL: g.attributes.ImageURL,
                    srid: g.attributes.WSDOTSRID,
                    milepost: g.attributes.StateRouteMilepost,
                    compassDirection: g.attributes.CompassDirection,
                    location: g.attributes.Location,
                    ownerName: g.attributes.CameraOwnerName,
                    ownerURL: g.attributes.CameraOwnerURL,
                    imageWidth: g.attributes.ImageWidth,
                    imageHeight: g.attributes.ImageHeight
                };
        }
        return info;
    };
});
//# sourceMappingURL=getGraphicsInfoByID.js.map