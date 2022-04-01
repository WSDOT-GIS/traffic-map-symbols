import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";

const lineAlertSymbol = new SimpleLineSymbol({
    style: "solid",
    color: [255, 255, 0,.7],
    width: "15px",
    cap:"square"
    
})
export { lineAlertSymbol}