import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import weatherStationSymbol from "../symbols/WeatherStationSymbol"
import Field from "@arcgis/core/layers/support/Field";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import * as layerUtil from "../utils/layerUtil";
import type MapView from "@arcgis/core/views/MapView";
import LayerInfo, { LayerStatus } from "../types/LayerInfo";

const renderer = new SimpleRenderer({
    symbol: weatherStationSymbol
})

const fields = [
    new Field({
        "name": "WeatherStationDescription",
        "type": "string",
        "alias": "WeatherStationDescription",
    }),
    new Field({
        "name": "WeatherStationId",
        "type": "integer",
        "alias": "WeatherStationId"
    }),
    new Field({
        "name": "SurfaceTemperature",
        "type": "string",
        "alias": "SurfaceTemperature",
    }),
    // Disabled spell checking on a few lines, since we can't fix the
    // spelling errors because the things they are referencing are also
    // misspelled.
    new Field({
        // cspell:disable-next-line
        "name": "TemperatureFarhenheit",
        "type": "string",
        // cspell:disable-next-line
        "alias": "TemperatureFarhenheit",
    }),
    new Field({
        // cspell:disable-next-line
        "name": "TemperatureCelcius",
        "type": "string",
        // cspell:disable-next-line
        "alias": "TemperatureCelcius",
    }),
    new Field({
        "name": "Visibility",
        "type": "string",
        "alias": "Visibility",
    }),
    new Field({
        "name": "WindSpeed",
        "type": "string",
        "alias": "WindSpeed",
    }),
    new Field({
        "name": "NWSZoneId",
        "type": "string",
        "alias": "NWSZoneId",
    }),
    new Field({
        "name": "CardinalCompassDirection",
        "type": "string",
        "alias": "CardinalCompassDirection",
    }),
    new Field({
        "name": "WeatherReportDateTime",
        "type": "date",
        "alias": "WeatherReportDateTime",
    }),
    new Field({
        "name": "WeatherNetworkPriority",
        "type": "double",
        "alias": "WeatherNetworkPriority",
    }),
]

let layer: FeatureLayer | undefined;
export const layerId = "weather-stations-layer";
const layerTitle = "Weather Stations";

/**
 * Initialize feature layer
 * 
 * @param jsonUrl  - JSON URL
 * @param view  - MapView
 * @returns LayerInfo
 */
export const initLayer = async (jsonUrl: string, view: MapView): Promise<LayerInfo> => {
    const layerInfo = new LayerInfo(layerId, layerTitle, jsonUrl);
    try {
        layer = await layerUtil.initLayer(
            layerId,
            "Weather Stations",
            renderer,
            fields,
            "point",
            false,
        );
        layer.definitionExpression = "WeatherNetworkPriority = 0"
        view.watch("scale", (scale) => {
            if (scale > 577790.554289) {
                (layer as FeatureLayer).definitionExpression = "WeatherNetworkPriority = 0";
                (layer as FeatureLayer).refresh()
            }
            else {
                (layer as FeatureLayer).definitionExpression = "1=1";
                (layer as FeatureLayer).refresh()
            }
        })
    } catch (ex) {
        console.error(ex);
        layer = undefined;
        layerInfo.status = LayerStatus.Failed
    }
    return layerInfo;
}


/**
 *
 */
const getLayer = (): FeatureLayer | undefined => {
    if (!layer) {
        console.error("WeatherStationsLayer is not ready yet!");
    }
    return layer;
}

export default getLayer