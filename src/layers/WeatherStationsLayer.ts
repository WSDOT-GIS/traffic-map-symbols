// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import weatherStationSymbol from "@/symbols/WeatherStationSymbol"
import Field from "@arcgis/core/layers/support/Field";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import * as layerUtil from "@/utils/layerUtil";
import { viewHide16 } from "@esri/calcite-ui-icons";
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

export const initLayer = async (jsonUrl: string, view: MapView): Promise<FeatureLayer> => {
    layer = await layerUtil.initLayer(jsonUrl,
        "weather-stations-layer",
        "Weather Stations",
        renderer,
        fields,
        "point",
        false,
        //"WeatherStationId"
    );
    layer.definitionExpression = "WeatherNetworkPriority = 0"
    view.watch("scale",(scale)=>{
        console.log(scale)
        if(scale>577790.554289){
            (layer as FeatureLayer).definitionExpression="WeatherNetworkPriority = 0";
            (layer as FeatureLayer).refresh()
        }
        else{
            (layer as FeatureLayer).definitionExpression="1=1";
            (layer as FeatureLayer).refresh()
        }
    })
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "WeatherStationsLayer is not ready yet!";
    }
    return layer;
}

// let layer: GeoJSONLayer | undefined;

// export const initLayer = (url: string): GeoJSONLayer => {
//     layer = new GeoJSONLayer({
//         id: "weather-stations-layer",
//         url: url,
//         title: "Weather Stations",
//         renderer: weatherStationRenderer,
//         visible: false
//     });
//     return layer;
// }

// const getLayer = (): GeoJSONLayer => {
//     if (!layer) {
//         throw "WeatherStationsLayer is not ready yet!";
//     }
//     return layer;
// }

export default getLayer