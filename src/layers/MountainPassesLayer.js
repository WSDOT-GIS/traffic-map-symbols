define(["require", "exports", "tslib", "@arcgis/core/layers/GeoJSONLayer", "@arcgis/core/renderers/SimpleRenderer", "@/symbols/MountainPassSymbol"], function (require, exports, tslib_1, GeoJSONLayer_1, SimpleRenderer_1, MountainPassSymbol_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getMountainPassesInfoById = void 0;
    GeoJSONLayer_1 = tslib_1.__importDefault(GeoJSONLayer_1);
    SimpleRenderer_1 = tslib_1.__importDefault(SimpleRenderer_1);
    MountainPassSymbol_1 = tslib_1.__importDefault(MountainPassSymbol_1);
    var mountainPassRenderer = new SimpleRenderer_1.default({
        symbol: MountainPassSymbol_1.default
    });
    var MountainPassesLayer = new GeoJSONLayer_1.default({
        id: "mountain-passes-layer",
        url: "https://data.wsdot.wa.gov/travelcenter/ MountainPasses.json",
        title: "Mountain Passes",
        renderer: mountainPassRenderer,
        visible: false
    });
    var getMountainPassesInfoById = function (id) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var query, response, g, info;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(id);
                    query = MountainPassesLayer.createQuery();
                    query.where = "MountainPassId = " + id;
                    query.outFields = ["*"];
                    return [4 /*yield*/, MountainPassesLayer.queryFeatures(query)];
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
    exports.getMountainPassesInfoById = getMountainPassesInfoById;
    var convert2Info = function (g) {
        var info = {
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
        return info;
    };
    exports.default = MountainPassesLayer;
});
//# sourceMappingURL=MountainPassesLayer.js.map