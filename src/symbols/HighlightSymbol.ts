import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";


const symbol = new SimpleMarkerSymbol({
    style: "circle",
    color: [0, 0, 0, 0],
    size: "26px",
    outline: {  // autocasts as new SimpleLineSymbol()
        color: "#00ffff",
        width: 2  // points
    }
})

export default symbol;


