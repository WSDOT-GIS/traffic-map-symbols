import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer"
import { roadRestrictionPoint, bridgeRestrictionPoint } from "../symbols/PointRestrictionsSymbol"
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import Symbol from "@/symbols/ParkRideSymbol";
import RestrictionInfo from "@/types/RestrictionInfo";
import Graphic from "@arcgis/core/Graphic";
const pointRestrictionsRenderer = new UniqueValueRenderer({
    field: "TType",
    uniqueValueInfos: [{
        // All features with value of "North" will be blue
        value: "R",
        symbol: roadRestrictionPoint
    }, {
        // All features with value of "East" will be green
        value: "B",
        symbol: bridgeRestrictionPoint
    }]
})
const pointRestrictionsRenderer2 = new SimpleRenderer({
    symbol: Symbol
})
const PointRestrictionsLayer = new GeoJSONLayer({
    id: "point-restrictions-layer",
    url: "http://hqtob1webtmdev1/GISData/PointRestrictions.json",
    title: "Restriction Points",
    renderer: pointRestrictionsRenderer,
    //popupTemplate: restrictionsPopup,
    // featureReduction: clusterConfig
});
export default PointRestrictionsLayer