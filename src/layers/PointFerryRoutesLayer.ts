import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import Field from "@arcgis/core/layers/support/Field";
import { alertSymbol } from "@/symbols/AlertSymbol"

const renderer = new simpleRenderer({
    symbol: alertSymbol
})

let layer: FeatureLayer | undefined;

/*export const initLayer = (url: string): FeatureLayer => {
    layer = new FeatureLayer({
        id: "ferry-routes-points-layer",
        url: url,
        title: "ferryRoutesPoints",
        renderer: ferryRoutesPointsRenderer,
        visible: true,
        labelsVisible: false
    });
    console.log(layer)
    return layer;
}*/
const fields = [
    new Field({
        name: "OBJECTID",
        type: "oid",
        alias: "OBJECTID",
    }),
    new Field({
        name: "Owner",
        type: "string",
        alias: "Owner",
    }),
    new Field({
        name: "SR",
        type: "string",
        alias: "State Route",
    }),
    new Field({
        name: "Display",
        type: "string",
        alias: "Display",
    }),
    new Field({
        name: "FerryRouteID",
        type: "integer",
        alias: "Route ID",
    }),
    new Field({
        name: "START_X",
        type: "double",
        alias: "Start X",
    }),
    new Field({
        name: "START_Y",
        type: "double",
        alias: "START Y",
    }),
    new Field({
        name: "Display",
        type: "string",
        alias: "Display",
    }),
    new Field({
        name:"PublishDate",
        type: "date",
        alias: "Last Update Date"
    })
]

export const initLayer = (url: string): FeatureLayer => {
    layer = new FeatureLayer({
        id: "ferry-routes-points-layer",
        url: url,
        title: "ferryRoutesPoints",
        //fields: fields,
        renderer: renderer,
        visible: true,
        labelsVisible: false
    });
    // console.log(layer.id + " was initialized.");
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "Ferry Point Layer is not ready yet!";
    }
    return layer;
}

export default getLayer
