import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import fireIncidentSymbol from "@/symbols/FireIncidentSymbol";
const fireIncidentRenderer = new simpleRenderer({
    symbol: fireIncidentSymbol
});
let layer;
export const initLayer = (url) => {
    layer = new FeatureLayer({
        id: "fire-incidents-layer",
        url: url,
        title: "Fire Incidents",
        renderer: fireIncidentRenderer,
        visible: false,
        definitionExpression: "POOState= 'US-WA'",
        labelsVisible: false
    });
    return layer;
};
const getLayer = () => {
    if (!layer) {
        throw "Fire Incident is not ready yet!";
    }
    return layer;
};
export default getLayer;
//# sourceMappingURL=FireIncidentLayer.js.map