import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer"
import {roadRestrictionPoint, bridgeRestrictionPoint} from "../symbols/PointRestrictionsSymbol"
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";

const pointRestrictionsRenderer = new UniqueValueRenderer({
    field:"TType",
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
const PointRestrictionsLayer = new GeoJSONLayer({
    id: "point-restrictions-layer",
    url: "http://hqtob1webtmdev1/GISData/park-ride.json",
    title: "Restriction Points",
    renderer: pointRestrictionsRenderer,
   // popupTemplate: Popup,
    // featureReduction: clusterConfig
});
export default PointRestrictionsLayer