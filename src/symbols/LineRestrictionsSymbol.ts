import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";

const roadRestrictionLine = new SimpleLineSymbol({
    style: "solid",
    color: "green",
    width: "5px",
})
const bridgeRestrictionLine = new SimpleLineSymbol({
    style: "solid",
    color: "orange",
    width: "5px",
})
export { roadRestrictionLine, bridgeRestrictionLine }