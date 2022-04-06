import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import weatherStationSymbol from "@/symbols/WeatherStationSymbol";
import Field from "@arcgis/core/layers/support/Field";
import * as layerUtil from "@/utils/layerUtil";
const renderer = new SimpleRenderer({
    symbol: weatherStationSymbol
});
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
];
let layer;
export const initLayer = async (jsonUrl, view) => {
    layer = await layerUtil.initLayer(jsonUrl, "weather-stations-layer", "Weather Stations", renderer, fields, "point", false, true);
    layer.definitionExpression = "WeatherNetworkPriority = 0";
    view.watch("scale", (scale) => {
        if (scale > 577790.554289) {
            layer.definitionExpression = "WeatherNetworkPriority = 0";
            layer.refresh();
        }
        else {
            layer.definitionExpression = "1=1";
            layer.refresh();
        }
    });
    return layer;
};
const getLayer = () => {
    if (!layer) {
        throw "WeatherStationsLayer is not ready yet!";
    }
    return layer;
};
export default getLayer;
//# sourceMappingURL=WeatherStationsLayer.js.map