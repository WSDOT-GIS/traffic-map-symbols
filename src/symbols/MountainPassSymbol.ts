import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import {layerListIcons} from "@/symbols/IconDefinitions"
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
const symbol = new CIMSymbol({
    data:{
        type:"CIMSymbolReference",
        symbol:{
            "type": "CIMPointSymbol",
            "symbolLayers": [
              {
                "type": "CIMVectorMarker",
                "enable": true,
                "anchorPointUnits": "Relative",
                "dominantSizeAxis3D": "Y",
                "size": 15,
                "billboardMode3D": "FaceNearPlane",
                "frame": {
                  "xmin": 0,
                  "ymin": 0,
                  "xmax": 24,
                  "ymax": 24
                },
                "markerGraphics": [
                  {
                    "type": "CIMMarkerGraphic",
                    "geometry": {
                      "rings": [
                        [
                          [
                            17.46,
                            14.08
                          ],
                          [
                            14.1,
                            20.44
                          ],
                          [
                            11.12,
                            14.88
                          ],
                          [
                            11.03,
                            14.71
                          ],
                          [
                            11.64,
                            13.91
                          ],
                          [
                            12.89,
                            15.31
                          ],
                          [
                            13.25,
                            15.47
                          ],
                          [
                            13.26,
                            15.47
                          ],
                          [
                            13.62,
                            15.3
                          ],
                          [
                            16.05,
                            12.43
                          ],
                          [
                            17.46,
                            14.08
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
                  },
                  {
                    "type": "CIMMarkerGraphic",
                    "geometry": {
                      "rings": [
                        [
                          [
                            11.33,
                            9.92
                          ],
                          [
                            7.92,
                            16.37
                          ],
                          [
                            5.28,
                            11.44
                          ],
                          [
                            6.14,
                            10.71
                          ],
                          [
                            7.11,
                            11.8
                          ],
                          [
                            7.46,
                            11.96
                          ],
                          [
                            7.81,
                            11.82
                          ],
                          [
                            9.71,
                            9.92
                          ],
                          [
                            9.75,
                            9.9
                          ],
                          [
                            10.5,
                            9.16
                          ],
                          [
                            11.33,
                            9.92
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
                  },
                  {
                    "type": "CIMMarkerGraphic",
                    "geometry": {
                      "rings": [
                        [
                          [
                            21.29,
                            6.83
                          ],
                          [
                            19.11,
                            10.96
                          ],
                          [
                            19.09,
                            10.99
                          ],
                          [
                            17.75,
                            13.53
                          ],
                          [
                            16.42,
                            11.96
                          ],
                          [
                            16.05,
                            11.79
                          ],
                          [
                            15.69,
                            11.97
                          ],
                          [
                            13.25,
                            14.84
                          ],
                          [
                            11.99,
                            13.44
                          ],
                          [
                            11.62,
                            13.28
                          ],
                          [
                            11.25,
                            13.47
                          ],
                          [
                            10.73,
                            14.15
                          ],
                          [
                            10.23,
                            13.22
                          ],
                          [
                            13.59,
                            6.83
                          ],
                          [
                            21.29,
                            6.83
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
                            153,
                            153,
                            153,
                            255
                          ]
                        }
                      ]
                    }
                  },
                  {
                    "type": "CIMMarkerGraphic",
                    "geometry": {
                      "rings": [
                        [
                          [
                            12.96,
                            6.83
                          ],
                          [
                            11.61,
                            9.39
                          ],
                          [
                            10.83,
                            8.67
                          ],
                          [
                            10.5,
                            8.54
                          ],
                          [
                            10.16,
                            8.68
                          ],
                          [
                            9.37,
                            9.47
                          ],
                          [
                            9.33,
                            9.49
                          ],
                          [
                            7.48,
                            11.34
                          ],
                          [
                            6.51,
                            10.26
                          ],
                          [
                            6.15,
                            10.1
                          ],
                          [
                            5.84,
                            10.21
                          ],
                          [
                            5,
                            10.92
                          ],
                          [
                            2.81,
                            6.83
                          ],
                          [
                            12.96,
                            6.83
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
                            179,
                            179,
                            179,
                            255
                          ]
                        }
                      ]
                    }
                  },
                  {
                    "type": "CIMMarkerGraphic",
                    "geometry": {
                      "rings": [
                        [
                          [
                            13.62,
                            15.3
                          ],
                          [
                            13.26,
                            15.47
                          ],
                          [
                            13.25,
                            15.47
                          ],
                          [
                            12.89,
                            15.31
                          ],
                          [
                            11.64,
                            13.91
                          ],
                          [
                            11.03,
                            14.71
                          ],
                          [
                            11.12,
                            14.88
                          ],
                          [
                            14.1,
                            20.44
                          ],
                          [
                            17.46,
                            14.08
                          ],
                          [
                            16.05,
                            12.43
                          ],
                          [
                            13.62,
                            15.3
                          ]
                        ],
                        [
                          [
                            9.75,
                            9.9
                          ],
                          [
                            9.71,
                            9.92
                          ],
                          [
                            7.81,
                            11.82
                          ],
                          [
                            7.46,
                            11.96
                          ],
                          [
                            7.11,
                            11.8
                          ],
                          [
                            6.14,
                            10.71
                          ],
                          [
                            5.28,
                            11.44
                          ],
                          [
                            7.92,
                            16.37
                          ],
                          [
                            11.33,
                            9.92
                          ],
                          [
                            10.5,
                            9.16
                          ],
                          [
                            9.75,
                            9.9
                          ]
                        ],
                        [
                          [
                            10.23,
                            13.22
                          ],
                          [
                            10.73,
                            14.15
                          ],
                          [
                            11.25,
                            13.47
                          ],
                          [
                            11.62,
                            13.28
                          ],
                          [
                            11.99,
                            13.44
                          ],
                          [
                            13.25,
                            14.84
                          ],
                          [
                            15.69,
                            11.97
                          ],
                          [
                            16.05,
                            11.79
                          ],
                          [
                            16.42,
                            11.96
                          ],
                          [
                            17.75,
                            13.53
                          ],
                          [
                            19.09,
                            10.99
                          ],
                          [
                            19.11,
                            10.96
                          ],
                          [
                            21.29,
                            6.83
                          ],
                          [
                            13.59,
                            6.83
                          ],
                          [
                            10.23,
                            13.22
                          ]
                        ],
                        [
                          [
                            5,
                            10.92
                          ],
                          [
                            5.84,
                            10.21
                          ],
                          [
                            6.15,
                            10.1
                          ],
                          [
                            6.51,
                            10.26
                          ],
                          [
                            7.48,
                            11.34
                          ],
                          [
                            9.33,
                            9.49
                          ],
                          [
                            9.37,
                            9.47
                          ],
                          [
                            10.16,
                            8.68
                          ],
                          [
                            10.5,
                            8.54
                          ],
                          [
                            10.83,
                            8.67
                          ],
                          [
                            11.61,
                            9.39
                          ],
                          [
                            12.96,
                            6.83
                          ],
                          [
                            2.81,
                            6.83
                          ],
                          [
                            5,
                            10.92
                          ]
                        ],
                        [
                          [
                            21.44,
                            6.25
                          ],
                          [
                            21.86,
                            6.49
                          ],
                          [
                            21.87,
                            6.96
                          ],
                          [
                            19.62,
                            11.22
                          ],
                          [
                            19.62,
                            11.23
                          ],
                          [
                            19.6,
                            11.26
                          ],
                          [
                            14.53,
                            20.87
                          ],
                          [
                            14.1,
                            21.12
                          ],
                          [
                            13.67,
                            20.87
                          ],
                          [
                            10.64,
                            15.2
                          ],
                          [
                            10.43,
                            14.82
                          ],
                          [
                            9.91,
                            13.84
                          ],
                          [
                            8.35,
                            16.8
                          ],
                          [
                            8.05,
                            17.04
                          ],
                          [
                            7.92,
                            17.05
                          ],
                          [
                            7.9,
                            17.05
                          ],
                          [
                            7.88,
                            17.05
                          ],
                          [
                            7.87,
                            17.05
                          ],
                          [
                            7.85,
                            17.05
                          ],
                          [
                            7.83,
                            17.05
                          ],
                          [
                            7.82,
                            17.04
                          ],
                          [
                            7.49,
                            16.8
                          ],
                          [
                            6.43,
                            14.82
                          ],
                          [
                            4.65,
                            11.5
                          ],
                          [
                            2.22,
                            6.96
                          ],
                          [
                            2.23,
                            6.49
                          ],
                          [
                            2.65,
                            6.25
                          ],
                          [
                            21.44,
                            6.25
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
                            0,
                            0,
                            255
                          ]
                        }
                      ]
                    }
                  }
                ],
                "scaleSymbolsProportionally": true,
                "respectFrame": true,
                "clippingPath": {
                  "type": "CIMClippingPath",
                  "clippingType": "Intersect",
                  "path": {
                    "rings": [
                      [
                        [
                          0,
                          0
                        ],
                        [
                          24,
                          0
                        ],
                        [
                          24,
                          24
                        ],
                        [
                          0,
                          24
                        ],
                        [
                          0,
                          0
                        ]
                      ]
                    ]
                  }
                }
              }
            ]
          }
    }
})

export default symbol