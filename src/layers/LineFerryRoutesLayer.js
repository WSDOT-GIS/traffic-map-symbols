import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import { ferryRoutesSymbol } from "@/symbols/FerryRoutesSymbol";
import * as layerUtil from "@/utils/layerUtil";
const renderer = new simpleRenderer({
    symbol: ferryRoutesSymbol
});
let layer;
// const fields = [
//     new Field({
//         name: "OBJECTID",
//         alias: "OBJECTID",
//         type: "oid"
//     }),
// ]
export const initLayer = async (url) => {
    const graphics = await layerUtil.fetchJsonData(url);
    layer = new FeatureLayer({
        id: "ferry-routes-lines-layer",
        url: url,
        title: "ferryRoutes",
        renderer: renderer,
        visible: false,
        labelsVisible: false,
        source: graphics,
        definitionExpression: '1=0'
    });
    return layer;
};
const getLayer = () => {
    if (!layer) {
        throw "Ferry Routes is not ready yet!";
    }
    return layer;
};
export default getLayer;
//# sourceMappingURL=LineFerryRoutesLayer.js.map