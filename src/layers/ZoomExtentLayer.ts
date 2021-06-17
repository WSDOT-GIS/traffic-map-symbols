import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import Graphic from "@arcgis/core/Graphic";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Field from "@arcgis/core/layers/support/Field";


// Create a symbol for rendering the graphic
const renderer = new SimpleRenderer({
    symbol: new SimpleFillSymbol({
        style: "none",
        outline: {  // autocasts as new SimpleLineSymbol()
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
]

const layer = new FeatureLayer({
    id: "zoom-areas",
    title: "Metro Areas",
    fields: [
        new Field({
            name: "ObjectID",
            alias: "ObjectID",
            type: "oid"
        }),
        new Field({
            name: "Label",
            type: "string",
            alias: "Label"
        }),
        new Field({
            name: "Note",
            type: "string",
            alias: "Note"
        })
    ],
    objectIdField: "ObjectID",
    geometryType: "polygon",
    spatialReference: SpatialReference.WebMercator,
    renderer: renderer,
    source: graphics,
    maxScale: 300000
});

export default layer;

export const getFeatureById = async (id: number): Promise<Graphic> => {
    const query = layer.createQuery();
    query.where = "ObjectID =" + id;
    query.outFields = ["ObjectID", "Label", "Note"];
    const response = await layer.queryFeatures(query);
    return response.features[0];
}
