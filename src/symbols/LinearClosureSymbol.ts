import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";

const linearClosureSymbol = new SimpleLineSymbol({
    style: "solid",
    color: 'red',
    width: "15px",
    cap:"square"
    
})
const linearCIMClosureSymbol = new CIMSymbol({
  data: {
    type: "CIMSymbolReference",
    symbol: {
      type: "CIMLineSymbol",
      symbolLayers: [
        {
          // white dashed layer at center of the line
          type: "CIMSolidStroke",
          effects: [
            {
              type: "CIMGeometricEffectDashes",
              dashTemplate: [10, 20], // width of dashes and spacing between the dashes
              lineDashEnding: "NoConstraint",
              controlPointEnding: "NoConstraint"
            },
          ],
          enable: true, // must be set to true in order for the symbol layer to be visible
          capStyle: "Butt",
          joinStyle: "Miter",
          width: 5,
          color: [255, 255, 255, 255]
        },
        {
          // black layer that surrounds the dashes
          type: "CIMSolidStroke",
          enable: true,
          capStyle: "Butt",
          joinStyle: "Miter",
          width: 5,
          color: [0,0, 0, 255]
        },
        {
          // black outline around the line symbol
          type: "CIMSolidStroke",
          enable: true,
          capStyle: "Butt",
          joinStyle: "Miter",
          width: 6,
          color: [0, 0, 0, 255]
        }
      ]
    }
  }
})
export { linearClosureSymbol, linearCIMClosureSymbol}