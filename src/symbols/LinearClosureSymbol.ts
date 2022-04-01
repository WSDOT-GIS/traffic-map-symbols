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
                effects: [{
                    type: "CIMGeometricEffectDashes",
                    dashTemplate: [2, 9],
                    lineDashEnding: "FullGap",
                    controlPointEnding: "NoConstraint"
                }],
                enable: true,
                width: 2,
                color: [255, 0, 0, 255]
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
                  },
                  //circle
                  {
                    "type": "CIMVectorMarker",
                    "enable": false,
                    "anchorPointUnits": "Relative",
                    "dominantSizeAxis3D": "Y",
                    "size": 10,
                    "billboardMode3D": "FaceNearPlane",
                    markerPlacement: {
                        // places same size markers along the line
                        type: "CIMMarkerPlacementAlongLineSameSize", 
                        endings: "WithMarkers",
                        placementTemplate: [50] // determines space between each arrow
                     },
                    "frame": {
                      "xmin": -5,
                      "ymin": -5,
                      "xmax": 5,
                      "ymax": 5
                    },
                    "markerGraphics": [
                      {
                        "type": "CIMMarkerGraphic",
                        "geometry": {
                          "rings": [
                            [
                              [
                                0,
                                5
                              ],
                              [
                                0.87,
                                4.92
                              ],
                              [
                                1.71,
                                4.7
                              ],
                              [
                                2.5,
                                4.33
                              ],
                              [
                                3.21,
                                3.83
                              ],
                              [
                                3.83,
                                3.21
                              ],
                              [
                                4.33,
                                2.5
                              ],
                              [
                                4.7,
                                1.71
                              ],
                              [
                                4.92,
                                0.87
                              ],
                              [
                                5,
                                0
                              ],
                              [
                                4.92,
                                -0.87
                              ],
                              [
                                4.7,
                                -1.71
                              ],
                              [
                                4.33,
                                -2.5
                              ],
                              [
                                3.83,
                                -3.21
                              ],
                              [
                                3.21,
                                -3.83
                              ],
                              [
                                2.5,
                                -4.33
                              ],
                              [
                                1.71,
                                -4.7
                              ],
                              [
                                0.87,
                                -4.92
                              ],
                              [
                                0,
                                -5
                              ],
                              [
                                -0.87,
                                -4.92
                              ],
                              [
                                -1.71,
                                -4.7
                              ],
                              [
                                -2.5,
                                -4.33
                              ],
                              [
                                -3.21,
                                -3.83
                              ],
                              [
                                -3.83,
                                -3.21
                              ],
                              [
                                -4.33,
                                -2.5
                              ],
                              [
                                -4.7,
                                -1.71
                              ],
                              [
                                -4.92,
                                -0.87
                              ],
                              [
                                -5,
                                0
                              ],
                              [
                                -4.92,
                                0.87
                              ],
                              [
                                -4.7,
                                1.71
                              ],
                              [
                                -4.33,
                                2.5
                              ],
                              [
                                -3.83,
                                3.21
                              ],
                              [
                                -3.21,
                                3.83
                              ],
                              [
                                -2.5,
                                4.33
                              ],
                              [
                                -1.71,
                                4.7
                              ],
                              [
                                -0.87,
                                4.92
                              ],
                              [
                                0,
                                5
                              ]
                            ]
                          ]
                        },
                        "symbol": {
                          "type": "CIMPolygonSymbol",
                          "symbolLayers": [
                            {
                              "type": "CIMSolidFill",
                              "enable": true,
                              "color": [
                                255,
                                255,
                                255,
                                255
                              ]
                            }
                          ]
                        }
                      }
                    ],
                    "scaleSymbolsProportionally": true,
                    "respectFrame": true
                  },
                  //background fill
                  {
                    "type": "CIMVectorMarker",
                    "enable": true,
                    "anchorPointUnits": "Relative",
                    "dominantSizeAxis3D": "Y",
                    "size": 10,
                    "billboardMode3D": "FaceNearPlane",
                    
                    markerPlacement: {
                        // places same size markers along the line
                        type: "CIMMarkerPlacementAlongLineSameSize", 
                        endings: "WithMarkers",
                        placementTemplate: [50] // determines space between each arrow
                     },
                    "frame": {
                      "xmin": -5,
                      "ymin": -5,
                      "xmax": 5,
                      "ymax": 5
                    },
                    "markerGraphics": [
                      {
                        "type": "CIMMarkerGraphic",
                        "geometry": {
                          "rings": [
                            [
                              [
                                0,
                                5
                              ],
                              [
                                0.87,
                                4.92
                              ],
                              [
                                1.71,
                                4.7
                              ],
                              [
                                2.5,
                                4.33
                              ],
                              [
                                3.21,
                                3.83
                              ],
                              [
                                3.83,
                                3.21
                              ],
                              [
                                4.33,
                                2.5
                              ],
                              [
                                4.7,
                                1.71
                              ],
                              [
                                4.92,
                                0.87
                              ],
                              [
                                5,
                                0
                              ],
                              [
                                4.92,
                                -0.87
                              ],
                              [
                                4.7,
                                -1.71
                              ],
                              [
                                4.33,
                                -2.5
                              ],
                              [
                                3.83,
                                -3.21
                              ],
                              [
                                3.21,
                                -3.83
                              ],
                              [
                                2.5,
                                -4.33
                              ],
                              [
                                1.71,
                                -4.7
                              ],
                              [
                                0.87,
                                -4.92
                              ],
                              [
                                0,
                                -5
                              ],
                              [
                                -0.87,
                                -4.92
                              ],
                              [
                                -1.71,
                                -4.7
                              ],
                              [
                                -2.5,
                                -4.33
                              ],
                              [
                                -3.21,
                                -3.83
                              ],
                              [
                                -3.83,
                                -3.21
                              ],
                              [
                                -4.33,
                                -2.5
                              ],
                              [
                                -4.7,
                                -1.71
                              ],
                              [
                                -4.92,
                                -0.87
                              ],
                              [
                                -5,
                                0
                              ],
                              [
                                -4.92,
                                0.87
                              ],
                              [
                                -4.7,
                                1.71
                              ],
                              [
                                -4.33,
                                2.5
                              ],
                              [
                                -3.83,
                                3.21
                              ],
                              [
                                -3.21,
                                3.83
                              ],
                              [
                                -2.5,
                                4.33
                              ],
                              [
                                -1.71,
                                4.7
                              ],
                              [
                                -0.87,
                                4.92
                              ],
                              [
                                0,
                                5
                              ]
                            ]
                          ]
                        },
                        "symbol": {
                          "type": "CIMPolygonSymbol",
                          "symbolLayers": [
                            {
                              "type": "CIMSolidStroke",
                              "enable": true,
                              "capStyle": "Round",
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
                            },
                            {
                              "type": "CIMSolidFill",
                              "enable": true,
                              "color": [
                                255,
                                255,
                                255,
                                255
                              ]
                            }
                          ]
                        }
                      }
                    ],
                    "scaleSymbolsProportionally": true,
                    "respectFrame": true
                  }
            ]
        }
    }
})
export { linearClosureSymbol, linearCIMClosureSymbol}