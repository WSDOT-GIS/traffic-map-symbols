import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import fireIncidentSymbol from "@/symbols/FireIncidentSymbol"
import Field from "@arcgis/core/layers/support/Field"

const fireIncidentRenderer = new simpleRenderer({
    symbol: fireIncidentSymbol
})

let layer: FeatureLayer | undefined;

export const initLayer = (url: string): FeatureLayer => {
    layer = new FeatureLayer({
        id: "fire-incidents-layer",
        url: url,
        title: "Fire Incidents",
        renderer: fireIncidentRenderer,
        visible: false,
        definitionExpression: "POOState= 'US-WA'"
    });
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "Fire Incident is not ready yet!";
    }
    return layer;
}

export default getLayer
