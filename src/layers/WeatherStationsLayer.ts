import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import weatherStationSymbol from "@/symbols/WeatherStationSymbol"

const weatherStationRenderer = new simpleRenderer({
    symbol: weatherStationSymbol
})

let layer: GeoJSONLayer | undefined;

export const initLayer = (url: string): GeoJSONLayer => {
    layer = new GeoJSONLayer({
        id: "weather-stations-layer",
        url: url,
        title: "Weather Stations",
        renderer: weatherStationRenderer,
        visible: false
    });
    return layer;
}

const getLayer = (): GeoJSONLayer => {
    if (!layer) {
        throw "WeatherStationsLayer is not ready yet!";
    }
    return layer;
}

export default getLayer