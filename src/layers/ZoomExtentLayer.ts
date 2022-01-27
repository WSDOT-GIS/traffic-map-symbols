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
            "Visible": 1
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
            "Visible": 1
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
            "Visible": 1
        }
    },
    // Tacoma Metro...
    {
        geometry: {
            type: "polygon",
            rings: [[
                [-13652280.94, 5964648.36],
                [-13613227.59, 5964648.36],
                [-13613227.59, 5993905.72],
                [-13652280.94, 5993905.72],
                [-13652280.94, 5964648.36]
            ]],
            spatialReference: { wkid: 102100 }
        },
        attributes: {
            "ObjectID": 4,
            "Name": "Tacoma",
            "Label": "Tacoma",
            "Visible": 0
        }
    },
]

const layer = new FeatureLayer({
    id: "zoom-areas-layer",
    title: "Metro Areas",
    fields: [
        new Field({
            name: "ObjectID",
            alias: "ObjectID",
            type: "oid"
        }),
        new Field({
            name: "Name",
            alias: "Name",
            type: "string"
        }),
        new Field({
            name: "Label",
            type: "string",
            alias: "Label"
        }),
        new Field({
            name: "Visible",
            type: "small-integer",
            alias: "Visible"
        })
    ],
    objectIdField: "ObjectID",
    geometryType: "polygon",
    spatialReference: SpatialReference.WebMercator,
    renderer: renderer,
    source: graphics,
    definitionExpression: "Visible = 1",
    maxScale: 300000
});

export default layer;

export const getFeatureById = async (id: number): Promise<Graphic> => {
    const query = layer.createQuery();
    query.where = "ObjectID =" + id;
    query.outFields = ["ObjectID", "Name", "Label", "Visible"];
    const response = await layer.queryFeatures(query);
    if (response.features.length === 0) {
        throw "Failed to find the zoom extent with the specified ID: " + id + ".";
    }
    return response.features[0];
}
/**
 * Get the extent feature by name.
 * Note: Case insenstive
 * @param name Name of the extent area
 */
export const getFeatureByName = async (name: string): Promise<Graphic> => {
    const query = layer.createQuery();
    const nameFormatted = name[0].toUpperCase() + name.slice(1).toLowerCase();
    query.where = `Name = '${nameFormatted}'`;
    query.outFields = ["ObjectID", "Name", "Label", "Visible"];
    const response = await layer.queryFeatures(query);
    if (response.features.length === 0) {
        throw "Failed to find the zoom extent with the specified name: '" + name + "'. Please make sure the spelling is correct.";
    }
    return response.features[0];
}
/**
 * Check to make sure the name is valid. 
 * NOTE: Case insensitive
 * @param name Name of the extent area
 */
export const validateName = (name: string): boolean => {
    const result = graphics.find((item) => {
        return item.attributes.Name.toLowerCase() === name.toLowerCase();
    });
    if (result) {
        return true;
    } else {
        return false;
    }
}
