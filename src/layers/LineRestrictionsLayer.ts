import { roadRestrictionLine, bridgeRestrictionLine } from "../symbols/LineRestrictionsSymbol"
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import restrictionsPopup from "@/popup-templates/RestrictionsPopup"
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer"
const lineRestrictionsRenderer = new UniqueValueRenderer({
    field: "TType",
    uniqueValueInfos: [{
        // All features with value of "North" will be blue
        value: "R",
        symbol: roadRestrictionLine
    }, {
        // All features with value of "East" will be green
        value: "B",
        symbol: bridgeRestrictionLine
    }],
    defaultSymbol: bridgeRestrictionLine
})
/*const lineRestrictionsRenderer = new SimpleRenderer({
    symbol:roadRestrictionLine
})*/
const LineRestrictionsLayer = new GeoJSONLayer({
    id: "line-restrictions-layer",
    url: "http://hqtob1webtmdev1/GISData/LineRestrictions.json",
    title: "Restriction Lines",
    renderer: lineRestrictionsRenderer,
    popupTemplate: restrictionsPopup,
    visible: false
})
export default LineRestrictionsLayer