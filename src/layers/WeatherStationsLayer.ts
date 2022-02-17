import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import weatherStationSymbol from "@/symbols/WeatherStationSymbol"
import Field from "@arcgis/core/layers/support/Field";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import * as layerUtil from "@/utils/layerUtil";
import MapView from "@arcgis/core/views/MapView";

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
    new Field({
        "name": "TemperatureFarhenheit",
        "type": "string",
        "alias": "TemperatureFarhenheit",
    }),
    new Field({
        "name": "TemperatureCelcius",
        "type": "string",
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

export const initLayer = async (jsonUrl: string, view: MapView): Promise<FeatureLayer | undefined> => {
    try {
        layer = await layerUtil.initLayer(jsonUrl,
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
    }
    return layer;
}

const getLayer = (): FeatureLayer | undefined => {
    if (!layer) {
        console.error("WeatherStationsLayer is not ready yet!");
    }
    return layer;
}

export default getLayer