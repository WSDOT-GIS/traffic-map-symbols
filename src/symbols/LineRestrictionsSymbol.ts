import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";

const roadRestrictionLine = new SimpleLineSymbol({
    style: "solid",
    color:  "green",
    width: "2px",
})
const bridgeRestrictionLine = new SimpleLineSymbol({
    style: "solid",
    color:  "orange",
    width: "2px",
    
})
export {roadRestrictionLine, bridgeRestrictionLine}