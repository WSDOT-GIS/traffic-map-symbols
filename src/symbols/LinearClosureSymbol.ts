import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";

const linearClosureSymbol = new SimpleLineSymbol({
    style: "solid",
    color: 'red',
    width: "15px",
    cap:"square"
    
})
const linearCIMClosureSymbol = new CIMSymbol({
    data:{
        type: "CIMSymbolReference",
        symbol: {
            type: "CIMLineSymbol",
            symbolLayers: [
                //line
                {
                type: "CIMSolidStroke",
               /* effects: [{
                    type: "CIMGeometricEffectDashes",
                    dashTemplate: [2, 9],
                    lineDashEnding: "FullGap",
                    controlPointEnding: "NoConstraint"
                }],*/
                enable: true,
                width: 6,
                color: [0, 0, 0, 255]
                },
                //diagonal line
                 {
                    "type": "CIMVectorMarker",
                    "enable": true,
                    "anchorPointUnits": "Relative",
                    "dominantSizeAxis3D": "Y",
                    "rotateClockwise": true,
                    "rotation": 45,
                    "size": 10,
                    "billboardMode3D": "FaceNearPlane",
                    markerPlacement: {
                        // places same size markers along the line
                        type: "CIMMarkerPlacementAlongLineSameSize", 
                        endings: "WithMarkers",
                        placementTemplate: [50] // determines space between each arrow
                     },
                    "frame": {
                      "xmin": -1.5,
                      "ymin": -5,
                      "xmax": 1.5,
                      "ymax": 5
                    },
                    "markerGraphics": [
                        //line for do not enter
                      {
                        "type": "CIMMarkerGraphic",
                        "geometry": {
                          "paths": [
                            [
                              [
                                0,
                                5
                              ],
                              [
                                0,
                                -5
                              ],
                              [
                                5,
                                -5
                              ],
                              [
                                5,
                                5
                              ]
                            ]
                          ]
                        },
                        "symbol": {
                          "type": "CIMLineSymbol",
                          "symbolLayers": [
                            {
                              "type": "CIMSolidStroke",
                              "enable": true,
                              "capStyle": "Butt",
                              "joinStyle": "Round",
                              "lineStyle3D": "Strip",
                              "miterLimit": 4,
                              "width": 2,
                              "color": [
                                255,
                                0,
                                0,
                                255
                              ]
                            }
                          ]
                        }
                      }
                    ],
                    "respectFrame": true
                  }
            ]
        }
    }
})
export { linearClosureSymbol, linearCIMClosureSymbol}