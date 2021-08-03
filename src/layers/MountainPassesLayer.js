import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import mountainPassSymbol from "@/symbols/MountainPassSymbol";
// import MountainPassesInfo from "@/types/MountainPassesInfo";
// import Graphic from "@arcgis/core/Graphic";
const mountainPassRenderer = new simpleRenderer({
    symbol: mountainPassSymbol
});
const FeatureLayer = new GeoJSONLayer({
    id: "mountain-passes-layer",
    url: "http://hqtob1webtmdev1/GISData/MountainPasses.json",
    title: "Mountain Passes",
    renderer: mountainPassRenderer,
    visible: false
});
export default FeatureLayer;
//# sourceMappingURL=MountainPassesLayer.js.map