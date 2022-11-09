import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
const roadRestrictionLine = new SimpleLineSymbol({
    style: "solid",
    color: [204, 32, 156, 0.7],
    width: "15px",
    cap: "square"
});
const bridgeRestrictionLine = new SimpleLineSymbol({
    style: "solid",
    color: [204, 32, 156, 0.7],
    width: "15px",
});
export { roadRestrictionLine, bridgeRestrictionLine };
