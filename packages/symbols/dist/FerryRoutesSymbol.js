import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
const ferryRoutesSymbol = new SimpleLineSymbol({
    style: "short-dash",
    color: [88, 128, 202],
    width: "5px",
    cap: "square"
});
export default ferryRoutesSymbol;
