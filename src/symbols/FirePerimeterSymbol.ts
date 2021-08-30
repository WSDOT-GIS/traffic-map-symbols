import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
const symbol = new SimpleFillSymbol ({
    color: [ 255, 0, 0, 0.25 ],
    outline: {  // autocasts as new SimpleLineSymbol()
    width: 1,
    color: "red"
    }
})

export default symbol
