import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import Graphic from "@arcgis/core/Graphic";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Field from "@arcgis/core/layers/support/Field";
import Extent from "@arcgis/core/geometry/Extent";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";

import * as pc from "polygon-clipping";

// Create a symbol for rendering the graphic
const renderer = new SimpleRenderer({
    symbol: new SimpleFillSymbol({
        style: "solid",
        outline: { color: [142, 9, 0, 1] },
        color: [142, 9, 0, 0.3]
    })
});

const fields = [
    new Field({
        name: "AppGenId",
        alias: "AppGenId",
        type: "oid"
    }),
    new Field(
        {
            name: "EventID",
            alias: "EventID",
            type: "integer"
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
        objectIdField: "AppGenId",
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
    query.where = "EventID = " + eventId;
    query.outFields = ["*"];
    const response = await layer.queryFeatures(query);
    return response.features[0];
}
/**
 * Get the center of the visible part of the alert polygon.
 * NOTE: Using polygon-cripping package instead of ESRI to reduce the initial file size.
 *
 * @param eventId 
 * @param visibleExtent 
 * @returns 
 */
export const getVisibleCenter = async (eventId: number, visibleExtent: Extent): Promise<Point> => {
    const g = await getFeatureById(eventId);
    const eventPoly = g.geometry as Polygon;
    const extentVertices: number[][][] = [[
        [visibleExtent.xmin, visibleExtent.ymax],
        [visibleExtent.xmax, visibleExtent.ymax],
        [visibleExtent.xmax, visibleExtent.ymin],
        [visibleExtent.xmin, visibleExtent.ymin],
        [visibleExtent.xmin, visibleExtent.ymax]
    ]];
    const intersection = pc.intersection(eventPoly.rings as pc.Geom, extentVertices as pc.Geom);
    const intPoly = new Polygon({
        rings: intersection[0],
        spatialReference: { wkid: 3857 }
    });
    return intPoly.centroid;
}

