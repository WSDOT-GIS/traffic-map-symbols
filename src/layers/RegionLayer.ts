import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import Graphic from "@arcgis/core/Graphic";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Field from "@arcgis/core/layers/support/Field";
import Polygon from "@arcgis/core/geometry/Polygon";
import Extent from "@arcgis/core/geometry/Extent";
import { clip } from "@arcgis/core/geometry/geometryEngine";

import { regionGraphics } from "./TestRegions";


// Create a symbol for rendering the graphic
const renderer = new SimpleRenderer({
    symbol: new SimpleFillSymbol({
        style: "solid",
        outline: { color: [142, 9, 0, 1] },
        color: [142, 9, 0, 0.3]
    })
});


const layer = new FeatureLayer({
    id: "region-layer",
    title: "Regions",
    fields: [
        new Field({
            name: "RegionID",
            alias: "RegionID",
            type: "oid"
        }),
        new Field({
            name: "RegionName",
            type: "string",
            alias: "RegionName"
        }),

    ],
    objectIdField: "RegionID",
    geometryType: "polygon",
    spatialReference: SpatialReference.WebMercator,
    renderer: renderer,
    source: regionGraphics,
});

export default layer;

export const getFeatureById = async (id: number): Promise<Graphic> => {
    const query = layer.createQuery();
    query.where = "RegionID = " + id;
    query.outFields = ["*"];
    const response = await layer.queryFeatures(query);
    return response.features[0];
}

export const getVisibleArea = async (id: number, mapExtent: Extent): Promise<Polygon> => {
    const g = await getFeatureById(id);
    return clip(g.geometry, mapExtent) as Polygon;
}

