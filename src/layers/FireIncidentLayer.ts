import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import fireIncidentSymbol from "@/symbols/FireIncidentSymbol"


const fireIncidentRenderer = new simpleRenderer({
    symbol: fireIncidentSymbol
})

let layer: FeatureLayer | undefined;
export const layerId = "fire-incidents-layer";

export const initLayer = (url: string): FeatureLayer | undefined => {
    try {
        layer = new FeatureLayer({
            id: layerId,
            url: url,
            title: "Fire Incidents",
            renderer: fireIncidentRenderer,
            visible: false,
            definitionExpression: "POOState= 'US-WA'",
            labelsVisible: false
        });
    }
    catch (ex) {
        console.error(ex);
        layer = undefined;
    }
    return layer;
}

const getLayer = (): FeatureLayer | undefined => {
    if (!layer) {
        console.error("Fire Incident is not ready yet!");
    }
    return layer;
}

export default getLayer
