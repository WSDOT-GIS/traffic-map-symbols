import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import symbol from "@/symbols/RestAreasSymbol"

const restAreasRenderer = new simpleRenderer({
    symbol: symbol
});

let layer: GeoJSONLayer | undefined;

export const initLayer = (url: string): GeoJSONLayer => {
    layer = new GeoJSONLayer({
        id: "rest-areas-layer",
        url: url,
        title: "Rest Areas",
        renderer: restAreasRenderer,
        visible: false
    });
    return layer;
}

const getLayer = (): GeoJSONLayer => {
    if (!layer) {
        throw "Layer is not ready yet!";
    }
    return layer;
}

// const FeatureLayer = new GeoJSONLayer({
//     id: "rest-areas-layer",
//     url: "https://data.wsdot.wa.gov/travelcenter/RestAreas.json",
//     //url: await getURL(),
//     title: "Rest Areas",
//     renderer: restAreasRenderer,
//     visible: false
// });


export default getLayer