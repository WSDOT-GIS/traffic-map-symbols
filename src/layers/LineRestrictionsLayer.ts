import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer"
import {roadRestrictionLine, bridgeRestrictionLine} from "../symbols/LineRestrictionsSymbol"
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";

const lineRestrictionsRenderer = new UniqueValueRenderer({
    field:"TType",
    uniqueValueInfos: [{
        // All features with value of "North" will be blue
        value: "R",
        symbol: roadRestrictionLine
    }, {
        // All features with value of "East" will be green
        value: "B",
        symbol: bridgeRestrictionLine
    }]
})
const LineRestrictionsLayer = new GeoJSONLayer({
    id: "line-restrictions-layer",
    url: "http://hqtob1webtmdev1/GISData/park-ride.json",   //extension needs to be .json.  Server not configure to support .geojson.
    title: "Restriction Lines",
    renderer: lineRestrictionsRenderer,
   // popupTemplate: Popup,
    // featureReduction: clusterConfig
});
export default LineRestrictionsLayer