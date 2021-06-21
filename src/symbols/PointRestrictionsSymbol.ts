import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

const roadRestrictionPoint = new SimpleMarkerSymbol({
    style: "circle",
    color:  "green",
    size: "8px",
    outline: {  // autocasts as new SimpleLineSymbol()
        color: [ 0, 0, 0 ],
        width: 1  // points
      }
})
const bridgeRestrictionPoint = new SimpleMarkerSymbol({
    style: "circle",
    color:  "orange",
    size: "8px",
    outline: {  // autocasts as new SimpleLineSymbol()
        color: [ 0, 0, 0 ],
        width: 1  // points
      }
})
export {roadRestrictionPoint, bridgeRestrictionPoint}