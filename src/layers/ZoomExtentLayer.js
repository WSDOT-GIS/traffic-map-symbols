define(["require", "exports", "tslib", "@arcgis/core/layers/FeatureLayer", "@arcgis/core/renderers/SimpleRenderer", "@arcgis/core/symbols/SimpleFillSymbol", "@arcgis/core/geometry/SpatialReference", "@arcgis/core/layers/support/Field"], function (require, exports, tslib_1, FeatureLayer_1, SimpleRenderer_1, SimpleFillSymbol_1, SpatialReference_1, Field_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFeatureById = void 0;
    FeatureLayer_1 = tslib_1.__importDefault(FeatureLayer_1);
    SimpleRenderer_1 = tslib_1.__importDefault(SimpleRenderer_1);
    SimpleFillSymbol_1 = tslib_1.__importDefault(SimpleFillSymbol_1);
    SpatialReference_1 = tslib_1.__importDefault(SpatialReference_1);
    Field_1 = tslib_1.__importDefault(Field_1);
    // Create a symbol for rendering the graphic
    var renderer = new SimpleRenderer_1.default({
        symbol: new SimpleFillSymbol_1.default({
            style: "none",
            outline: {
                width: 2,
                color: "blue"
            }
        })
    });
    var graphics = [
        // Seattle Metro...
        {
            geometry: {
                type: "polygon",
                rings: [[
                        [-13629746.45, 6068530.04],
                        [-13592772.58, 6068530.04],
                        [-13592772.58, 6023828.51],
                        [-13629746.45, 6023828.51],
                        [-13629746.45, 6068530.04]
                    ]],
                spatialReference: { wkid: 102100 }
            },
            attributes: {
                "ObjectID": 1,
                "Label": "Seattle Metro",
                "Note": ""
            }
        },
        // Spokane Metro...
        {
            geometry: {
                type: "polygon",
                rings: [[
                        [-13082872.63, 6039636.67],
                        [-13047688.70, 6039636.67],
                        [-13047688.70, 6077106.34],
                        [-13082872.63, 6077106.34],
                        [-13082872.63, 6039636.67]
                    ]],
                spatialReference: { wkid: 102100 }
            },
            attributes: {
                "ObjectID": 2,
                "Label": "Spokane Metro",
                "Note": ""
            }
        },
        // Vancouver Metro...
        {
            geometry: {
                type: "polygon",
                rings: [[
                        [-13661045.09, 5715999.99],
                        [-13640773.92, 5715999.99],
                        [-13640773.92, 5740346.29],
                        [-13661045.09, 5740346.29],
                        [-13661045.09, 5715999.99]
                    ]],
                spatialReference: { wkid: 102100 }
            },
            attributes: {
                "ObjectID": 3,
                "Label": "Vancouver Metro",
                "Note": ""
            }
        },
    ];
    var layer = new FeatureLayer_1.default({
        id: "zoom-areas",
        title: "Metro Areas",
        fields: [
            new Field_1.default({
                name: "ObjectID",
                alias: "ObjectID",
                type: "oid"
            }),
            new Field_1.default({
                name: "Label",
                type: "string",
                alias: "Label"
            }),
            new Field_1.default({
                name: "Note",
                type: "string",
                alias: "Note"
            })
        ],
        objectIdField: "ObjectID",
        geometryType: "polygon",
        spatialReference: SpatialReference_1.default.WebMercator,
        renderer: renderer,
        source: graphics,
        maxScale: 300000
    });
    exports.default = layer;
    var getFeatureById = function (id) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var query, response;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = layer.createQuery();
                    query.where = "ObjectID =" + id;
                    query.outFields = ["ObjectID", "Label", "Note"];
                    return [4 /*yield*/, layer.queryFeatures(query)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.features[0]];
            }
        });
    }); };
    exports.getFeatureById = getFeatureById;
});
//# sourceMappingURL=ZoomExtentLayer.js.map