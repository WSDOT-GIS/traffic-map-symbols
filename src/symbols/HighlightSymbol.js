import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
const symbol = new SimpleMarkerSymbol({
    style: "circle",
    color: [0, 0, 0, 0],
    size: "26px",
    outline: {
        color: "#00ffff",
        width: 2 // points
    }
});
export default symbol;
//# sourceMappingURL=HighlightSymbol.js.map