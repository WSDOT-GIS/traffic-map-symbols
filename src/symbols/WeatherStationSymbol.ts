import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol"
import IconInfo from "@/types/IconInfo"
import {layerListIcons} from "@/symbols/SVGIconDefinitions"
console.log(layerListIcons)

const weatherStationSymbol = new SimpleMarkerSymbol({
    color: [0, 255, 255],
    size: `20px`,
    path: layerListIcons.find(e=>e.title=="Weather Stations")?.path
})
export {weatherStationSymbol}