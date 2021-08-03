// import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
// import {layerListIcons} from "@/symbols/IconDefinitions"
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
                "xmax": 18,
                "ymax": 24
              },
              "markerGraphics": [
                {
                  "type": "CIMMarkerGraphic",
                  "geometry": {
                    "rings": [
                      [
                        [
                          15.37,
                          8.42
                        ],
                        [
                          16.49,
                          9.8
                        ],
                        [
                          17.32,
                          11.38
                        ],
                        [
                          17.83,
                          13.08
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
                          11.38
                        ],
                        [
                          1.5,
                          9.8
                        ],
                        [
                          2.62,
                          8.42
                        ],
                        [
                          8.18,
                          0.43
                        ],
                        [
                          8.54,
                          0.12
                        ],
                        [
                          9,
                          0
                        ],
                        [
                          9.46,
                          0.12
                        ],
                        [
                          9.82,
                          0.43
                        ],
                        [
                          15.37,
                          8.42
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
                          174,
                          199,
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
                          9,
                          6.97
                        ],
                        [
                          10.35,
                          7.09
                        ],
                        [
                          11.65,
                          7.44
                        ],
                        [
                          12.87,
                          8.01
                        ],
                        [
                          13.98,
                          8.78
                        ],
                        [
                          14.94,
                          9.74
                        ],
                        [
                          15.71,
                          10.85
                        ],
                        [
                          16.28,
                          12.07
                        ],
                        [
                          16.63,
                          13.37
                        ],
                        [
                          16.75,
                          14.72
                        ],
                        [
                          16.63,
                          16.07
                        ],
                        [
                          16.28,
                          17.37
                        ],
                        [
                          15.71,
                          18.59
                        ],
                        [
                          14.94,
                          19.7
                        ],
                        [
                          13.98,
                          20.66
                        ],
                        [
                          12.87,
                          21.43
                        ],
                        [
                          11.65,
                          22
                        ],
                        [
                          10.35,
                          22.35
                        ],
                        [
                          9,
                          22.47
                        ],
                        [
                          7.65,
                          22.35
                        ],
                        [
                          6.35,
                          22
                        ],
                        [
                          5.13,
                          21.43
                        ],
                        [
                          4.02,
                          20.66
                        ],
                        [
                          3.06,
                          19.7
                        ],
                        [
                          2.29,
                          18.59
                        ],
                        [
                          1.72,
                          17.37
                        ],
                        [
                          1.37,
                          16.07
                        ],
                        [
                          1.25,
                          14.72
                        ],
                        [
                          1.37,
                          13.37
                        ],
                        [
                          1.72,
                          12.07
                        ],
                        [
                          2.29,
                          10.85
                        ],
                        [
                          3.06,
                          9.74
                        ],
                        [
                          4.02,
                          8.78
                        ],
                        [
                          5.13,
                          8.01
                        ],
                        [
                          6.35,
                          7.44
                        ],
                        [
                          7.65,
                          7.09
                        ],
                        [
                          9,
                          6.97
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
                          174,
                          199,
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
                          9,
                          6.97
                        ],
                        [
                          10.35,
                          7.09
                        ],
                        [
                          11.65,
                          7.44
                        ],
                        [
                          12.87,
                          8.01
                        ],
                        [
                          13.98,
                          8.78
                        ],
                        [
                          14.94,
                          9.74
                        ],
                        [
                          15.71,
                          10.85
                        ],
                        [
                          16.28,
                          12.07
                        ],
                        [
                          16.63,
                          13.37
                        ],
                        [
                          16.75,
                          14.72
                        ],
                        [
                          16.63,
                          16.07
                        ],
                        [
                          16.28,
                          17.37
                        ],
                        [
                          15.71,
                          18.59
                        ],
                        [
                          14.94,
                          19.7
                        ],
                        [
                          13.98,
                          20.66
                        ],
                        [
                          12.87,
                          21.43
                        ],
                        [
                          11.65,
                          22
                        ],
                        [
                          10.35,
                          22.35
                        ],
                        [
                          9,
                          22.47
                        ],
                        [
                          7.65,
                          22.35
                        ],
                        [
                          6.35,
                          22
                        ],
                        [
                          5.13,
                          21.43
                        ],
                        [
                          4.02,
                          20.66
                        ],
                        [
                          3.06,
                          19.7
                        ],
                        [
                          2.29,
                          18.59
                        ],
                        [
                          1.72,
                          17.37
                        ],
                        [
                          1.37,
                          16.07
                        ],
                        [
                          1.25,
                          14.72
                        ],
                        [
                          1.37,
                          13.37
                        ],
                        [
                          1.72,
                          12.07
                        ],
                        [
                          2.29,
                          10.85
                        ],
                        [
                          3.06,
                          9.74
                        ],
                        [
                          4.02,
                          8.78
                        ],
                        [
                          5.13,
                          8.01
                        ],
                        [
                          6.35,
                          7.44
                        ],
                        [
                          7.65,
                          7.09
                        ],
                        [
                          9,
                          6.97
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
                        "lineStyle3D": "Strip",
                        "miterLimit": 4,
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
                  "geometry": {
                    "x": 0,
                    "y": 0
                  },
                  "symbol": {
                    "type": "CIMPointSymbol",
                    "symbolLayers": [
                      {
                        "type": "CIMVectorMarker",
                        "enable": true,
                        "anchorPointUnits": "Relative",
                        "dominantSizeAxis3D": "Z",
                        "offsetX": 9,
                        "offsetY": 12,
                        "size": 24,
                        "billboardMode3D": "FaceNearPlane",
                        "frame": {
                          "xmin": 0,
                          "ymin": 0,
                          "xmax": 18,
                          "ymax": 24
                        },
                        "markerGraphics": [
                          {
                            "type": "CIMMarkerGraphic",
                            "geometry": {
                              "x": 0,
                              "y": 0
                            },
                            "symbol": {
                              "type": "CIMPointSymbol",
                              "symbolLayers": [
                                {
                                  "type": "CIMVectorMarker",
                                  "enable": true,
                                  "anchorPointUnits": "Relative",
                                  "dominantSizeAxis3D": "Z",
                                  "offsetX": 9,
                                  "offsetY": 12,
                                  "size": 24,
                                  "billboardMode3D": "FaceNearPlane",
                                  "frame": {
                                    "xmin": 0,
                                    "ymin": 0,
                                    "xmax": 18,
                                    "ymax": 24
                                  },
                                  "markerGraphics": [
                                    {
                                      "type": "CIMMarkerGraphic",
                                      "geometry": {
                                        "rings": [
                                          [
                                            [
                                              11.38,
                                              15.84
                                            ],
                                            [
                                              11.85,
                                              16.32
                                            ],
                                            [
                                              12.02,
                                              19.49
                                            ],
                                            [
                                              11.55,
                                              19.96
                                            ],
                                            [
                                              6.4,
                                              19.96
                                            ],
                                            [
                                              5.93,
                                              19.49
                                            ],
                                            [
                                              6.11,
                                              16.31
                                            ],
                                            [
                                              6.58,
                                              15.84
                                            ],
                                            [
                                              11.38,
                                              15.84
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
                                              10.32,
                                              9.49
                                            ],
                                            [
                                              10.78,
                                              9.95
                                            ],
                                            [
                                              10.78,
                                              9.99
                                            ],
                                            [
                                              10.6,
                                              11.74
                                            ],
                                            [
                                              8.98,
                                              11.26
                                            ],
                                            [
                                              7.38,
                                              11.73
                                            ],
                                            [
                                              7.17,
                                              10
                                            ],
                                            [
                                              7.17,
                                              9.95
                                            ],
                                            [
                                              7.62,
                                              9.49
                                            ],
                                            [
                                              10.32,
                                              9.49
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
                                              6.86,
                                              14.61
                                            ],
                                            [
                                              8.98,
                                              15.04
                                            ],
                                            [
                                              11.1,
                                              14.61
                                            ],
                                            [
                                              8.98,
                                              14.18
                                            ],
                                            [
                                              6.86,
                                              14.61
                                            ]
                                          ],
                                          [
                                            [
                                              10.6,
                                              12.18
                                            ],
                                            [
                                              10.89,
                                              12.4
                                            ],
                                            [
                                              11.15,
                                              12.65
                                            ],
                                            [
                                              11.38,
                                              12.93
                                            ],
                                            [
                                              11.58,
                                              13.23
                                            ],
                                            [
                                              11.73,
                                              13.56
                                            ],
                                            [
                                              11.84,
                                              13.9
                                            ],
                                            [
                                              11.91,
                                              14.26
                                            ],
                                            [
                                              11.94,
                                              14.62
                                            ],
                                            [
                                              11.88,
                                              14.79
                                            ],
                                            [
                                              11.71,
                                              14.94
                                            ],
                                            [
                                              11.43,
                                              15.09
                                            ],
                                            [
                                              11.06,
                                              15.22
                                            ],
                                            [
                                              10.11,
                                              15.4
                                            ],
                                            [
                                              8.98,
                                              15.46
                                            ],
                                            [
                                              7.85,
                                              15.4
                                            ],
                                            [
                                              6.89,
                                              15.21
                                            ],
                                            [
                                              6.52,
                                              15.09
                                            ],
                                            [
                                              6.24,
                                              14.94
                                            ],
                                            [
                                              6.07,
                                              14.79
                                            ],
                                            [
                                              6.01,
                                              14.62
                                            ],
                                            [
                                              6.04,
                                              14.26
                                            ],
                                            [
                                              6.11,
                                              13.9
                                            ],
                                            [
                                              6.22,
                                              13.55
                                            ],
                                            [
                                              6.38,
                                              13.22
                                            ],
                                            [
                                              6.58,
                                              12.92
                                            ],
                                            [
                                              6.82,
                                              12.63
                                            ],
                                            [
                                              7.08,
                                              12.38
                                            ],
                                            [
                                              7.38,
                                              12.17
                                            ],
                                            [
                                              8.98,
                                              11.7
                                            ],
                                            [
                                              10.6,
                                              12.18
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
                                  "clippingPath": {
                                    "type": "CIMClippingPath",
                                    "clippingType": "Intersect",
                                    "path": {
                                      "rings": [
                                        [
                                          [
                                            0,
                                            13.33
                                          ],
                                          [
                                            10.67,
                                            13.33
                                          ],
                                          [
                                            10.67,
                                            24
                                          ],
                                          [
                                            0,
                                            24
                                          ],
                                          [
                                            0,
                                            13.33
                                          ]
                                        ]
                                      ]
                                    }
                                  }
                                }
                              ],
                              "haloSize": 1,
                              "scaleX": 1,
                              "angleAlignment": "Display"
                            }
                          }
                        ],
                        "scaleSymbolsProportionally": true,
                        "respectFrame": true
                      }
                    ],
                    "haloSize": 1,
                    "scaleX": 1,
                    "angleAlignment": "Display"
                  }
                }
              ],
              "scaleSymbolsProportionally": true,
              "offsetY": 7.5,//Half of symbol height
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
                        18,
                        0
                      ],
                      [
                        18,
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