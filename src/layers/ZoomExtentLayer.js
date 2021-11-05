"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeatureByName = exports.getFeatureById = void 0;
const tslib_1 = require("tslib");
const FeatureLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/FeatureLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const SimpleFillSymbol_1 = tslib_1.__importDefault(require("@arcgis/core/symbols/SimpleFillSymbol"));
const SpatialReference_1 = tslib_1.__importDefault(require("@arcgis/core/geometry/SpatialReference"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
// Create a symbol for rendering the graphic
const renderer = new SimpleRenderer_1.default({
    symbol: new SimpleFillSymbol_1.default({
        style: "none",
        outline: {
            width: 2,
            color: "blue"
        }
    })
});
const graphics = [
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
            "Name": "Seattle",
            "Label": "Seattle",
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
            "Name": "Spokane",
            "Label": "Spokane",
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
            "Name": "Vancouver",
            "Label": "Vancouver",
            "Note": ""
        }
    },
];
const layer = new FeatureLayer_1.default({
    id: "zoom-areas-layer",
    title: "Metro Areas",
    fields: [
        new Field_1.default({
            name: "ObjectID",
            alias: "ObjectID",
            type: "oid"
        }),
        new Field_1.default({
            name: "Name",
            alias: "Name",
            type: "string"
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
const getFeatureById = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const query = layer.createQuery();
    query.where = "ObjectID =" + id;
    query.outFields = ["ObjectID", "Name", "Label", "Note"];
    const response = yield layer.queryFeatures(query);
    if (response.features.length === 0) {
        throw "Failed to find the zoom extent with the specified ID: " + id + ".";
    }
    return response.features[0];
});
exports.getFeatureById = getFeatureById;
const getFeatureByName = (name) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const query = layer.createQuery();
    const nameFormatted = name[0].toUpperCase() + name.slice(1).toLowerCase();
    query.where = `Name = '${nameFormatted}'`;
    query.outFields = ["ObjectID", "Name", "Label", "Note"];
    const response = yield layer.queryFeatures(query);
    if (response.features.length === 0) {
        throw "Failed to find the zoom extent with the specified name: '" + name + "'. Please make sure the spelling is correct.";
    }
    return response.features[0];
});
exports.getFeatureByName = getFeatureByName;
//# sourceMappingURL=ZoomExtentLayer.js.map