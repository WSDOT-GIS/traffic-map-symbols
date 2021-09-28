import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import Graphic from "@arcgis/core/Graphic";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Field from "@arcgis/core/layers/support/Field";
import Polygon from "@arcgis/core/geometry/Polygon";
import Extent from "@arcgis/core/geometry/Extent";
import { clip } from "@arcgis/core/geometry/geometryEngine";


// Create a symbol for rendering the graphic
const renderer = new SimpleRenderer({
    symbol: new SimpleFillSymbol({
        style: "solid",
        outline: { color: [142, 9, 0, 1] },
        color: [142, 9, 0, 0.3]
    })
});

const fields = [
    new Field(
    {
        name: "EventID",
        alias: "EventID",
        type: "oid"
    }),
    new Field({
        name: "Name",
        alias: "Name",
        type: "string",
    }),
];

let layer: FeatureLayer | undefined;

export const initLayer = (features: Graphic[]): FeatureLayer => {
    layer = new FeatureLayer({
        id: "alert-area-layer",
        title: "Alert Areas",
        fields: fields,
        objectIdField: "EventID",
        geometryType: "polygon",
        spatialReference: SpatialReference.WebMercator,
        renderer: renderer,
        source: features,
    });
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "Alert Area Layer is not ready yet!";
    }
    return layer;
}

export default getLayer;

export const getFeatureById = async (eventId: number): Promise<Graphic> => {
    const layer = getLayer();
    const query = layer.createQuery();
    query.where = layer.objectIdField + " = " + eventId;
    query.outFields = ["*"];
    const response = await layer.queryFeatures(query);
    return response.features[0];
}

export const getVisibleArea = async (eventId: number, mapExtent: Extent): Promise<Polygon> => {
    const g = await getFeatureById(eventId);
    return clip(g.geometry, mapExtent) as Polygon;
}

