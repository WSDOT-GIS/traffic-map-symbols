import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";

const lineAlertSymbol = new SimpleLineSymbol({
    style: "short-dash",
    color: [88, 128, 202],
    width: "15px",
    cap:"square"
    
})
export { lineAlertSymbol}