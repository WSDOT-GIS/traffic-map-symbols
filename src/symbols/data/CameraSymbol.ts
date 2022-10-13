
// import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

// const symbol = new SimpleMarkerSymbol({
//     size: "12px",
//     color: "black",
//     path: "M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"

// });
const symbol: __esri.CIMSymbolProperties = {
    data:
    {
        "type": "CIMSymbolReference",
        "symbol": {
            "type": "CIMPointSymbol",
            "symbolLayers": [
              {
                "type": "CIMVectorMarker",
                "enable": true,
                "size": 24,
                "offsetY": 12,//Half of symbol height
                
                "frame": {
                  "xmin": 0,
                  "ymin": 0,
                  "xmax": 18,
                  "ymax": 24
                },
                "markerGraphics": [
                  {
                    "type": "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                    "geometry": {
                      "rings": [
                        [
                          [
                            15.37,
                            8.43
                          ],
                          [
                            16.49,
                            9.81
                          ],
                          [
                            17.32,
                            11.38
                          ],
                          [
                            17.83,
                            13.09
                          ],
                          [
                            18,
                            14.87
                          ],
                          [
                            17.83,
                            16.65
                          ],
                          [
                            17.32,
                            18.36
                          ],
                          [
                            16.49,
                            19.94
                          ],
                          [
                            15.36,
                            21.33
                          ],
                          [
                            14,
                            22.46
                          ],
                          [
                            12.44,
                            23.31
                          ],
                          [
                            10.76,
                            23.83
                          ],
                          [
                            9,
                            24
                          ],
                          [
                            7.24,
                            23.83
                          ],
                          [
                            5.56,
                            23.31
                          ],
                          [
                            4,
                            22.46
                          ],
                          [
                            2.64,
                            21.33
                          ],
                          [
                            1.51,
                            19.94
                          ],
                          [
                            0.68,
                            18.36
                          ],
                          [
                            0.17,
                            16.65
                          ],
                          [
                            0,
                            14.87
                          ],
                          [
                            0.17,
                            13.09
                          ],
                          [
                            0.68,
                            11.39
                          ],
                          [
                            1.5,
                            9.81
                          ],
                          [
                            2.62,
                            8.43
                          ],
                          [
                            8.18,
                            0.45
                          ],
                          [
                            8.54,
                            0.13
                          ],
                          [
                            9,
                            0.01
                          ],
                          [
                            9.46,
                            0.13
                          ],
                          [
                            9.82,
                            0.45
                          ],
                          [
                            15.37,
                            8.43
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
                            0,
                            123,
                            95,
                            255
                          ]
                        }
                      ]
                    }
                  },
                  {
                    "type": "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                    "geometry": {
                      "rings": [
                        [
                          [
                            9,
                            7.25
                          ],
                          [
                            10.35,
                            7.37
                          ],
                          [
                            11.65,
                            7.72
                          ],
                          [
                            12.87,
                            8.29
                          ],
                          [
                            13.98,
                            9.06
                          ],
                          [
                            14.94,
                            10.02
                          ],
                          [
                            15.71,
                            11.13
                          ],
                          [
                            16.28,
                            12.35
                          ],
                          [
                            16.63,
                            13.65
                          ],
                          [
                            16.75,
                            15
                          ],
                          [
                            16.63,
                            16.35
                          ],
                          [
                            16.28,
                            17.65
                          ],
                          [
                            15.71,
                            18.87
                          ],
                          [
                            14.94,
                            19.98
                          ],
                          [
                            13.98,
                            20.94
                          ],
                          [
                            12.87,
                            21.71
                          ],
                          [
                            11.65,
                            22.28
                          ],
                          [
                            10.35,
                            22.63
                          ],
                          [
                            9,
                            22.75
                          ],
                          [
                            7.65,
                            22.63
                          ],
                          [
                            6.35,
                            22.28
                          ],
                          [
                            5.13,
                            21.71
                          ],
                          [
                            4.02,
                            20.94
                          ],
                          [
                            3.06,
                            19.98
                          ],
                          [
                            2.29,
                            18.87
                          ],
                          [
                            1.72,
                            17.65
                          ],
                          [
                            1.37,
                            16.35
                          ],
                          [
                            1.25,
                            15
                          ],
                          [
                            1.37,
                            13.65
                          ],
                          [
                            1.72,
                            12.35
                          ],
                          [
                            2.29,
                            11.13
                          ],
                          [
                            3.06,
                            10.02
                          ],
                          [
                            4.02,
                            9.06
                          ],
                          [
                            5.13,
                            8.29
                          ],
                          [
                            6.35,
                            7.72
                          ],
                          [
                            7.65,
                            7.37
                          ],
                          [
                            9,
                            7.25
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
                            0,
                            123,
                            95,
                            255
                          ]
                        }
                      ]
                    }
                  },
                  {
                    "type": "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                    "geometry": {
                      "rings": [
                        [
                          [
                            9,
                            7.25
                          ],
                          [
                            10.35,
                            7.37
                          ],
                          [
                            11.65,
                            7.72
                          ],
                          [
                            12.87,
                            8.29
                          ],
                          [
                            13.98,
                            9.06
                          ],
                          [
                            14.94,
                            10.02
                          ],
                          [
                            15.71,
                            11.13
                          ],
                          [
                            16.28,
                            12.35
                          ],
                          [
                            16.63,
                            13.65
                          ],
                          [
                            16.75,
                            15
                          ],
                          [
                            16.63,
                            16.35
                          ],
                          [
                            16.28,
                            17.65
                          ],
                          [
                            15.71,
                            18.87
                          ],
                          [
                            14.94,
                            19.98
                          ],
                          [
                            13.98,
                            20.94
                          ],
                          [
                            12.87,
                            21.71
                          ],
                          [
                            11.65,
                            22.28
                          ],
                          [
                            10.35,
                            22.63
                          ],
                          [
                            9,
                            22.75
                          ],
                          [
                            7.65,
                            22.63
                          ],
                          [
                            6.35,
                            22.28
                          ],
                          [
                            5.13,
                            21.71
                          ],
                          [
                            4.02,
                            20.94
                          ],
                          [
                            3.06,
                            19.98
                          ],
                          [
                            2.29,
                            18.87
                          ],
                          [
                            1.72,
                            17.65
                          ],
                          [
                            1.37,
                            16.35
                          ],
                          [
                            1.25,
                            15
                          ],
                          [
                            1.37,
                            13.65
                          ],
                          [
                            1.72,
                            12.35
                          ],
                          [
                            2.29,
                            11.13
                          ],
                          [
                            3.06,
                            10.02
                          ],
                          [
                            4.02,
                            9.06
                          ],
                          [
                            5.13,
                            8.29
                          ],
                          [
                            6.35,
                            7.72
                          ],
                          [
                            7.65,
                            7.37
                          ],
                          [
                            9,
                            7.25
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
                          "capStyle": "Butt",
                          "joinStyle": "Miter",
                          "width": 0.5,
                          "color": [
                            255,
                            255,
                            255,
                            255
                          ]
                        }
                      ]
                    }
                  },
                  {
                    "type": "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                    "geometry": {
                      "rings": [
                        [
                          [
                            6.33,
                            18.3
                          ],
                          [
                            5.94,
                            18.26
                          ],
                          [
                            5.56,
                            18.15
                          ],
                          [
                            5.22,
                            17.96
                          ],
                          [
                            4.92,
                            17.71
                          ],
                          [
                            4.67,
                            17.41
                          ],
                          [
                            4.48,
                            17.06
                          ],
                          [
                            4.37,
                            16.69
                          ],
                          [
                            4.33,
                            16.3
                          ],
                          [
                            4.33,
                            13.85
                          ],
                          [
                            4.37,
                            13.46
                          ],
                          [
                            4.48,
                            13.09
                          ],
                          [
                            4.67,
                            12.74
                          ],
                          [
                            4.92,
                            12.44
                          ],
                          [
                            5.22,
                            12.19
                          ],
                          [
                            5.57,
                            12
                          ],
                          [
                            5.94,
                            11.89
                          ],
                          [
                            6.33,
                            11.85
                          ],
                          [
                            10.07,
                            11.85
                          ],
                          [
                            10.46,
                            11.89
                          ],
                          [
                            10.83,
                            12
                          ],
                          [
                            11.18,
                            12.19
                          ],
                          [
                            11.48,
                            12.44
                          ],
                          [
                            11.73,
                            12.74
                          ],
                          [
                            11.92,
                            13.08
                          ],
                          [
                            12.03,
                            13.46
                          ],
                          [
                            12.07,
                            13.85
                          ],
                          [
                            12.07,
                            16.3
                          ],
                          [
                            12.03,
                            16.69
                          ],
                          [
                            11.92,
                            17.07
                          ],
                          [
                            11.73,
                            17.41
                          ],
                          [
                            11.49,
                            17.72
                          ],
                          [
                            11.18,
                            17.96
                          ],
                          [
                            10.84,
                            18.15
                          ],
                          [
                            10.46,
                            18.26
                          ],
                          [
                            10.07,
                            18.3
                          ],
                          [
                            6.33,
                            18.3
                          ]
                        ],
                        [
                          [
                            14.33,
                            17.2
                          ],
                          [
                            14.33,
                            13.6
                          ],
                          [
                            14.3,
                            13.42
                          ],
                          [
                            14.2,
                            13.27
                          ],
                          [
                            14.05,
                            13.17
                          ],
                          [
                            13.88,
                            13.14
                          ],
                          [
                            13.7,
                            13.18
                          ],
                          [
                            13.55,
                            13.28
                          ],
                          [
                            12.22,
                            14.61
                          ],
                          [
                            12.12,
                            14.77
                          ],
                          [
                            12.08,
                            14.96
                          ],
                          [
                            12.08,
                            15.84
                          ],
                          [
                            12.12,
                            16.03
                          ],
                          [
                            12.22,
                            16.19
                          ],
                          [
                            13.55,
                            17.52
                          ],
                          [
                            13.7,
                            17.62
                          ],
                          [
                            13.88,
                            17.66
                          ],
                          [
                            14.05,
                            17.63
                          ],
                          [
                            14.2,
                            17.53
                          ],
                          [
                            14.3,
                            17.38
                          ],
                          [
                            14.33,
                            17.2
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
                "respectFrame": true,
              }
            ]
          }
    }
}


// export const clusterSymbol: __esri.CIMSymbolProperties = {
//     data:
//     {
//         "type": "CIMSymbolReference",
//         "symbol": {
//             "type": "CIMPointSymbol",
//             "symbolLayers": [
//                 {
//                     "type": "CIMVectorMarker",
//                     "enable": true,
//                     "anchorPointUnits": "Relative",
//                     "dominantSizeAxis3D": "Y",
//                     "size": 8,
//                     
//                     "frame": {
//                         "xmin": 0,
//                         "ymin": 0,
//                         "xmax": 30,
//                         "ymax": 20
//                     },
//                     "markerGraphics": [
//                         {
//                             "type": "CIMMarkerGraphic",
//                  textString:'',
 //                 primitiveName:'',
//                             "geometry": {
//                                 "rings": [
//                                     [
//                                         [
//                                             21.36,
//                                             1
//                                         ],
//                                         [
//                                             2.64,
//                                             1
//                                         ],
//                                         [
//                                             1.63,
//                                             1.19
//                                         ],
//                                         [
//                                             0.77,
//                                             1.74
//                                         ],
//                                         [
//                                             0.2,
//                                             2.56
//                                         ],
//                                         [
//                                             0,
//                                             3.52
//                                         ],
//                                         [
//                                             0,
//                                             13.48
//                                         ],
//                                         [
//                                             0.2,
//                                             14.44
//                                         ],
//                                         [
//                                             0.77,
//                                             15.26
//                                         ],
//                                         [
//                                             1.63,
//                                             15.81
//                                         ],
//                                         [
//                                             2.64,
//                                             16
//                                         ],
//                                         [
//                                             16.36,
//                                             16
//                                         ],
//                                         [
//                                             17.37,
//                                             15.81
//                                         ],
//                                         [
//                                             18.23,
//                                             15.26
//                                         ],
//                                         [
//                                             18.8,
//                                             14.44
//                                         ],

//                                         [
//                                             19,
//                                             13.48
//                                         ],
//                                         [
//                                             19,
//                                             3.52
//                                         ],
//                                         [
//                                             18.8,
//                                             2.56
//                                         ],
//                                         [
//                                             18.23,
//                                             1.74
//                                         ],
//                                         [
//                                             17.37,
//                                             1.19
//                                         ],
//                                         [
//                                             16.36,
//                                             1
//                                         ]
//                                     ]
//                                 ]
//                             },
//                             "symbol": {
//                                 "type": "CIMPolygonSymbol",
//                                 "symbolLayers": [
//                                     {
//                                         "type": "CIMSolidStroke",
//                                         "enable": true,
//                                         "capStyle": "Round",
//                                         "joinStyle": "Round",
//                                         "lineStyle3D": "Strip",
//                                         "miterLimit": 10,
//                                         "width": 1.5,
//                                         "color": [
//                                             255,
//                                             255,
//                                             255,
//                                             255
//                                         ]
//                                     },
//                                     {
//                                         "type": "CIMSolidFill",
//                                         "enable": true,
//                                         "color": [
//                                             0,
//                                             123,
//                                             95,
//                                             255
//                                         ]
//                                     }
//                                 ]
//                             }
//                         }
//                     ],
//                     "scaleSymbolsProportionally": true,
//                     "respectFrame": true,
//                     "offsetX": 0
//                 },
//                 {
//                     "type": "CIMVectorMarker",
//                     "enable": true,
//                     "anchorPointUnits": "Relative",
//                     "dominantSizeAxis3D": "Y",
//                     "size": 8,
//                     
//                     "frame": {
//                         "xmin": 0,
//                         "ymin": 0,
//                         "xmax": 30,
//                         "ymax": 20
//                     },
//                     "markerGraphics": [
//                         {
//                             "type": "CIMMarkerGraphic",
//                  textString:'',
//                  primitiveName:'',
//                             "geometry": {
//                                 "rings": [
//                                     [
//                                         [
//                                             20,
//                                             11
//                                         ],
//                                         [
//                                             27,
//                                             17
//                                         ],
//                                         [
//                                             30,
//                                             17
//                                         ],
//                                         [
//                                             30,
//                                             0
//                                         ],
//                                         [
//                                             27,
//                                             0
//                                         ],
//                                         [
//                                             20,
//                                             6
//                                         ],
//                                         [
//                                             20,
//                                             11
//                                         ]
//                                     ]
//                                 ]
//                             },
//                             "symbol": {
//                                 "type": "CIMPolygonSymbol",
//                                 "symbolLayers": [
//                                     {
//                                         "type": "CIMSolidStroke",
//                                         "enable": true,
//                                         "capStyle": "Round",
//                                         "joinStyle": "Round",
//                                         "lineStyle3D": "Strip",
//                                         "miterLimit": 10,
//                                         "width": 1.5,
//                                         "color": [
//                                             255,
//                                             255,
//                                             255,
//                                             255
//                                         ]
//                                     },
//                                     {
//                                         "type": "CIMSolidFill",
//                                         "enable": true,
//                                         "color": [
//                                             0,
//                                             123,
//                                             95,
//                                             255
//                                         ]
//                                     }
//                                 ]
//                             }
//                         }
//                     ],
//                     "scaleSymbolsProportionally": true,
//                     "respectFrame": true,
//                     "offsetX": 0,
//                     "rotation": 0,
//                     "offsetY": 0
//                 },
//                 // {
//                 //     "type": "CIMVectorMarker",
//                 //     "enable": true,
//                 //     "anchorPoint": {
//                 //         "x": 0,
//                 //         "y": 0
//                 //     },
//                 //     "anchorPointUnits": "Relative",
//                 //     "dominantSizeAxis3D": "Y",
//                 //     "size": 16,
//                 //     
//                 //     "frame": {
//                 //         "xmin": 0,
//                 //         "ymin": 0,
//                 //         "xmax": 17,
//                 //         "ymax": 17
//                 //     },
//                 //     "markerGraphics": [
//                 //         {
//                 //             "type": "CIMMarkerGraphic",
//                  textString:'',
//                  primitiveName:'',
//                 //             "geometry": {
//                 //                 "rings": [
//                 //                     [
//                 //                         [
//                 //                             8.5,
//                 //                             0
//                 //                         ],
//                 //                         [
//                 //                             7.02,
//                 //                             0.13
//                 //                         ],
//                 //                         [
//                 //                             5.59,
//                 //                             0.51
//                 //                         ],
//                 //                         [
//                 //                             4.25,
//                 //                             1.14
//                 //                         ],
//                 //                         [
//                 //                             3.04,
//                 //                             1.99
//                 //                         ],
//                 //                         [
//                 //                             1.99,
//                 //                             3.04
//                 //                         ],
//                 //                         [
//                 //                             1.14,
//                 //                             4.25
//                 //                         ],
//                 //                         [
//                 //                             0.51,
//                 //                             5.59
//                 //                         ],
//                 //                         [
//                 //                             0.13,
//                 //                             7.02
//                 //                         ],
//                 //                         [
//                 //                             0,
//                 //                             8.5
//                 //                         ],
//                 //                         [
//                 //                             0.13,
//                 //                             9.98
//                 //                         ],
//                 //                         [
//                 //                             0.51,
//                 //                             11.41
//                 //                         ],
//                 //                         [
//                 //                             1.14,
//                 //                             12.75
//                 //                         ],
//                 //                         [
//                 //                             1.99,
//                 //                             13.96
//                 //                         ],
//                 //                         [
//                 //                             3.04,
//                 //                             15.01
//                 //                         ],
//                 //                         [
//                 //                             4.25,
//                 //                             15.86
//                 //                         ],
//                 //                         [
//                 //                             5.59,
//                 //                             16.49
//                 //                         ],
//                 //                         [
//                 //                             7.02,
//                 //                             16.87
//                 //                         ],
//                 //                         [
//                 //                             8.5,
//                 //                             17
//                 //                         ],
//                 //                         [
//                 //                             9.98,
//                 //                             16.87
//                 //                         ],
//                 //                         [
//                 //                             11.41,
//                 //                             16.49
//                 //                         ],
//                 //                         [
//                 //                             12.75,
//                 //                             15.86
//                 //                         ],
//                 //                         [
//                 //                             13.96,
//                 //                             15.01
//                 //                         ],
//                 //                         [
//                 //                             15.01,
//                 //                             13.96
//                 //                         ],
//                 //                         [
//                 //                             15.86,
//                 //                             12.75
//                 //                         ],
//                 //                         [
//                 //                             16.49,
//                 //                             11.41
//                 //                         ],
//                 //                         [
//                 //                             16.87,
//                 //                             9.98
//                 //                         ],
//                 //                         [
//                 //                             17,
//                 //                             8.5
//                 //                         ],
//                 //                         [
//                 //                             16.87,
//                 //                             7.02
//                 //                         ],
//                 //                         [
//                 //                             16.49,
//                 //                             5.59
//                 //                         ],
//                 //                         [
//                 //                             15.86,
//                 //                             4.25
//                 //                         ],
//                 //                         [
//                 //                             15.01,
//                 //                             3.04
//                 //                         ],
//                 //                         [
//                 //                             13.96,
//                 //                             1.99
//                 //                         ],
//                 //                         [
//                 //                             12.75,
//                 //                             1.14
//                 //                         ],
//                 //                         [
//                 //                             11.41,
//                 //                             0.51
//                 //                         ],
//                 //                         [
//                 //                             9.98,
//                 //                             0.13
//                 //                         ],
//                 //                         [
//                 //                             8.5,
//                 //                             0
//                 //                         ]
//                 //                     ]
//                 //                 ]
//                 //             },
//                 //             "symbol": {
//                 //                 "type": "CIMPolygonSymbol",
//                 //                 "symbolLayers": [
//                 //                     {
//                 //                         "type": "CIMSolidStroke",
//                 //                         "enable": true,
//                 //                         "capStyle": "Round",
//                 //                         "joinStyle": "Round",
//                 //                         "lineStyle3D": "Strip",
//                 //                         "miterLimit": 10,
//                 //                         "width": 0,
//                 //                         "color": [
//                 //                             0,
//                 //                             0,
//                 //                             0,
//                 //                             255
//                 //                         ]
//                 //                     },
//                 //                     {
//                 //                         "type": "CIMSolidFill",
//                 //                         "enable": true,
//                 //                         "color": [
//                 //                             114,
//                 //                             160,
//                 //                             193,
//                 //                             255
//                 //                         ]
//                 //                     }
//                 //                 ]
//                 //             }
//                 //         }
//                 //     ],
//                 //     "scaleSymbolsProportionally": true,
//                 //     "respectFrame": true
//                 // }
//             ]
//         }
//     }
// }export default symbol